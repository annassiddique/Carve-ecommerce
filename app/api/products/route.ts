import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { slugify } from '@/lib/utils'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)

    const filter: Record<string, unknown> = {}

    const category = searchParams.get('category')
    if (category && category !== 'all') filter.category = category

    const featured = searchParams.get('featured')
    if (featured === 'true') filter.featured = true

    const search = searchParams.get('search')
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ]
    }

    const subcategory = searchParams.get('subcategory')
    if (subcategory) filter.subcategory = subcategory

    const inStock = searchParams.get('inStock')
    if (inStock === 'true') filter.inStock = true

    const sort = searchParams.get('sort') || 'createdAt_desc'
    const sortMap: Record<string, [string, 1 | -1][]> = {
      price_asc: [['price', 1]],
      price_desc: [['price', -1]],
      newest: [['createdAt', -1]],
      featured: [['featured', -1], ['createdAt', -1]],
      createdAt_desc: [['createdAt', -1]],
    }

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortMap[sort] || [['createdAt', -1]])
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ])

    return NextResponse.json({
      success: true,
      data: products,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('[GET /api/products]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()

    if (!body.slug) {
      let baseSlug = slugify(body.name)
      let slug = baseSlug
      let count = 1
      while (await Product.findOne({ slug })) {
        slug = `${baseSlug}-${count++}`
      }
      body.slug = slug
    }

    const product = await Product.create(body)
    return NextResponse.json({ success: true, data: product }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/products]', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
