import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import { revalidateTag } from 'next/cache'
import SiteSettingsModel from '@/models/SiteSettings'

const VALID_SECTIONS = ['announcement', 'homepage', 'contact', 'about', 'payment'] as const
type Section = (typeof VALID_SECTIONS)[number]

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { section } = await params

    if (!VALID_SECTIONS.includes(section as Section)) {
      return NextResponse.json({ success: false, error: 'Invalid section' }, { status: 400 })
    }

    await connectDB()
    const body = await req.json()

    const update: Record<string, unknown> = {}
    if (typeof body === 'object' && body !== null) {
      for (const [key, value] of Object.entries(body)) {
        update[`${section}.${key}`] = value
      }
    }

    const doc = await SiteSettingsModel.findOneAndUpdate(
      { key: 'default' },
      { $set: update },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    revalidateTag('site-settings', 'max')

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(doc)) })
  } catch (error) {
    console.error('[PATCH /api/site-settings/[section]]', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
