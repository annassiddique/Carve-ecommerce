import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  try {
    const isPublic = req.nextUrl.searchParams.get('public') === 'true'

    if (!isPublic) {
      const session = await getServerSession(authOptions)
      if (!session) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
      }
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: isPublic ? 'carve/payments' : 'carve/products',
            transformation: [{ quality: 'auto', fetch_format: 'auto' }],
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result as { secure_url: string })
          }
        )
        .end(buffer)
    })

    return NextResponse.json({ success: true, data: { url: result.secure_url } })
  } catch (error) {
    console.error('[POST /api/upload]', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
