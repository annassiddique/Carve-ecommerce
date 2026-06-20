import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params

    const product = await Product.findOne({
      $or: [{ slug: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    }).lean()

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('[GET /api/products/[id]]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { id } = await params
    const body = await req.json()

    const product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true })

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('[PUT /api/products/[id]]', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { id } = await params
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    console.error('[DELETE /api/products/[id]]', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
