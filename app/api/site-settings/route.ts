import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import { revalidateTag } from 'next/cache'
import SiteSettingsModel, { DEFAULT_SITE_SETTINGS } from '@/models/SiteSettings'

export async function GET() {
  try {
    await connectDB()
    const doc = await SiteSettingsModel.findOne({ key: 'default' }).lean()
    if (!doc) return NextResponse.json({ success: true, data: DEFAULT_SITE_SETTINGS })
    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(doc)) })
  } catch (error) {
    console.error('[GET /api/site-settings]', error)
    return NextResponse.json({ success: true, data: DEFAULT_SITE_SETTINGS })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()

    const doc = await SiteSettingsModel.findOneAndUpdate(
      { key: 'default' },
      { $set: body },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    revalidateTag('site-settings', 'max')

    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(doc)) })
  } catch (error) {
    console.error('[PUT /api/site-settings]', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
