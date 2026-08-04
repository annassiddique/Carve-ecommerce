import { config } from 'dotenv'
import { resolve } from 'path'
import { readdirSync } from 'fs'
config({ path: resolve(process.cwd(), '.env.local') })

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const IMAGES_BASE = 'D:\\Project 101\\Projects\\carve\\public\\images\\perfume'

interface PerfumeDef {
  folderPath: string          // relative to IMAGES_BASE
  name: string
  subcategory: 'For Him' | 'For Her' | 'Unisex' | 'Oud Collection'
  price: number
  comparePrice?: number
  description: string
  shortDescription: string
  tags: string[]
  featured: boolean
  inStock: boolean
  stock: number
  attributes: {
    scentFamily: string
    topNotes: string[]
    heartNotes: string[]
    baseNotes: string[]
    size: string
  }
}

const PERFUME_DEFS: PerfumeDef[] = [
  {
    folderPath: 'Armani Code',
    name: 'Armani Code',
    subcategory: 'For Him',
    price: 2999,
    comparePrice: 3500,
    description:
      'A seductive and timeless oriental fragrance crafted for the modern gentleman. Rich leather and tobacco are balanced by a fresh citrus opening and a sensual tonka bean dry-down. Armani Code is the scent of quiet confidence — understated, magnetic, unforgettable.',
    shortDescription: 'Seductive oriental fragrance with leather, tobacco, and warm tonka bean.',
    tags: ['perfume', 'for him', 'oriental', 'woody', 'evening', 'seductive', 'signature'],
    featured: true,
    inStock: true,
    stock: 15,
    attributes: {
      scentFamily: 'Woody',
      topNotes: ['Bergamot', 'Lemon', 'Star Anise'],
      heartNotes: ['Olive Blossom', 'Sage', 'Guaiac Wood'],
      baseNotes: ['Tonka Bean', 'Leather', 'Tobacco'],
      size: '100ml',
    },
  },
  {
    folderPath: 'Coco Mademoiselle',
    name: 'Coco Mademoiselle',
    subcategory: 'For Her',
    price: 2999,
    comparePrice: 3500,
    description:
      'A bold yet feminine fragrance that opens with a burst of fresh citrus before settling into a rich floral heart and a deep, sensual oriental base. Coco Mademoiselle is effortlessly chic — a scent that is both youthful and timeless, free-spirited yet sophisticated.',
    shortDescription: 'Fresh citrus and rose with a sensual patchouli and vetiver dry-down.',
    tags: ['perfume', 'for her', 'floral', 'oriental', 'chic', 'feminine', 'signature'],
    featured: true,
    inStock: true,
    stock: 15,
    attributes: {
      scentFamily: 'Oriental',
      topNotes: ['Orange', 'Bergamot', 'Grapefruit'],
      heartNotes: ['Rose', 'Jasmine', 'Mimosa'],
      baseNotes: ['Patchouli', 'Vetiver', 'White Musk'],
      size: '100ml',
    },
  },
  {
    folderPath: 'Creed Aventus/Square',
    name: 'Creed Aventus',
    subcategory: 'For Him',
    price: 3499,
    comparePrice: 4000,
    description:
      'Inspired by the extraordinary life of a historic emperor, Aventus opens with an invigorating burst of blackcurrant and crisp apple before revealing a sophisticated smoky birch heart. The dry-down is clean, mossy, and deeply masculine — a fragrance that celebrates strength, power, and success.',
    shortDescription: 'Iconic fruity-woody fragrance with smoky birch and clean musk.',
    tags: ['perfume', 'for him', 'fresh', 'woody', 'fruity', 'iconic', 'premium'],
    featured: true,
    inStock: true,
    stock: 12,
    attributes: {
      scentFamily: 'Fresh',
      topNotes: ['Blackcurrant', 'Apple', 'Pineapple', 'Bergamot'],
      heartNotes: ['Birch', 'Jasmine', 'Rose', 'Patchouli'],
      baseNotes: ['Musk', 'Oakmoss', 'Ambergris', 'Vanilla'],
      size: '100ml',
    },
  },
  {
    folderPath: 'Gucci Flora',
    name: 'Gucci Flora',
    subcategory: 'For Her',
    price: 2799,
    comparePrice: 3200,
    description:
      'A delicate and luminous floral fragrance that captures the beauty of a blooming garden in full sunlight. Soft peony and rose shimmer over a fresh citrus opening, while the base settles into a warm, creamy sandalwood. Feminine, radiant, and endlessly romantic.',
    shortDescription: 'Luminous floral bouquet of peony and rose over warm sandalwood.',
    tags: ['perfume', 'for her', 'floral', 'fresh', 'romantic', 'feminine', 'everyday'],
    featured: false,
    inStock: true,
    stock: 18,
    attributes: {
      scentFamily: 'Floral',
      topNotes: ['Citrus', 'Peach', 'Red Berries'],
      heartNotes: ['Peony', 'Rose', 'Osmanthus'],
      baseNotes: ['Sandalwood', 'Patchouli', 'Musk'],
      size: '100ml',
    },
  },
  {
    folderPath: 'Gucci Guilty',
    name: 'Gucci Guilty',
    subcategory: 'For Him',
    price: 2799,
    comparePrice: 3200,
    description:
      'Daring, sensual, and unapologetically bold, Gucci Guilty is a fragrance for those who live without limits. A fresh citrus opening gives way to a complex heart of lavender and geranium, before a base of patchouli and amber creates a warm, lasting impression.',
    shortDescription: 'Bold and sensual with lavender, geranium, and warm amber.',
    tags: ['perfume', 'for him', 'oriental', 'fresh', 'bold', 'sensual', 'evening'],
    featured: false,
    inStock: true,
    stock: 18,
    attributes: {
      scentFamily: 'Oriental',
      topNotes: ['Lemon', 'Pink Pepper', 'Lavender'],
      heartNotes: ['Geranium', 'Lilac', 'Fougère'],
      baseNotes: ['Patchouli', 'Amber', 'Cedar'],
      size: '100ml',
    },
  },
  {
    folderPath: 'Itar/1',
    name: 'Itar Noir',
    subcategory: 'Oud Collection',
    price: 1999,
    comparePrice: 2500,
    description:
      'A rich and meditative oriental itar inspired by ancient Arabic perfumery. Deep oud is blended with dark rose and warming spices, creating a fragrance that is deeply personal and hauntingly beautiful. Wear it close to the skin and let it evolve into something entirely your own.',
    shortDescription: 'Deep oud itar with dark rose and warming oriental spices.',
    tags: ['perfume', 'unisex', 'oud', 'oriental', 'itar', 'arabic', 'premium'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      scentFamily: 'Oriental',
      topNotes: ['Saffron', 'Black Pepper', 'Cardamom'],
      heartNotes: ['Oud', 'Dark Rose', 'Incense'],
      baseNotes: ['Amber', 'Sandalwood', 'Musk'],
      size: '12ml',
    },
  },
  {
    folderPath: 'Itar/2',
    name: 'Itar Rose',
    subcategory: 'Oud Collection',
    price: 1999,
    comparePrice: 2500,
    description:
      'A softer, more luminous itar that centres on the queen of flowers — rose. The Bulgarian rose heart is elevated by a base of white oud and creamy sandalwood, resulting in a fragrance that is elegant, intimate, and deeply romantic. A true expression of traditional Arabic perfumery.',
    shortDescription: 'Luminous Bulgarian rose itar with white oud and sandalwood.',
    tags: ['perfume', 'unisex', 'oud', 'floral', 'itar', 'arabic', 'rose'],
    featured: false,
    inStock: true,
    stock: 20,
    attributes: {
      scentFamily: 'Floral',
      topNotes: ['Rose', 'Bergamot', 'Pink Pepper'],
      heartNotes: ['Bulgarian Rose', 'Jasmine', 'White Oud'],
      baseNotes: ['Sandalwood', 'Musk', 'Vanilla'],
      size: '12ml',
    },
  },
  {
    folderPath: 'Janan Sport',
    name: 'Janan Sport',
    subcategory: 'For Him',
    price: 1799,
    comparePrice: 2200,
    description:
      'Energising and dynamic, Janan Sport is a fresh aquatic fragrance designed for the active man who demands performance from his scent just as he does from himself. A cool marine opening gives way to crisp green notes and a clean, long-lasting woody base — invigorating from morning to night.',
    shortDescription: 'Fresh aquatic fragrance with marine notes and a clean woody base.',
    tags: ['perfume', 'for him', 'fresh', 'aquatic', 'sport', 'everyday', 'citrus'],
    featured: false,
    inStock: true,
    stock: 20,
    attributes: {
      scentFamily: 'Aquatic',
      topNotes: ['Marine Notes', 'Bergamot', 'Citrus'],
      heartNotes: ['Green Apple', 'Spearmint', 'Violet Leaf'],
      baseNotes: ['Cedar', 'Musk', 'Amber'],
      size: '100ml',
    },
  },
  {
    folderPath: 'Office',
    name: 'Office',
    subcategory: 'Unisex',
    price: 2499,
    comparePrice: 2999,
    description:
      'Refined, professional, and effortlessly versatile, Office is a fragrance crafted for those who command respect. A clean aromatic opening of bergamot and white tea evolves into a sophisticated heart of iris and cedar, leaving a polished woody musk that carries beautifully through a long day.',
    shortDescription: 'Clean, professional unisex fragrance with iris, cedar, and white musk.',
    tags: ['perfume', 'unisex', 'fresh', 'woody', 'professional', 'office', 'everyday'],
    featured: false,
    inStock: true,
    stock: 18,
    attributes: {
      scentFamily: 'Fresh',
      topNotes: ['Bergamot', 'White Tea', 'Grapefruit'],
      heartNotes: ['Iris', 'Cedar', 'Violet'],
      baseNotes: ['White Musk', 'Sandalwood', 'Cashmere Wood'],
      size: '100ml',
    },
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function uploadProductImages(def: PerfumeDef): Promise<string[]> {
  const folderPath = resolve(IMAGES_BASE, def.folderPath)
  let files: string[]
  try {
    files = readdirSync(folderPath)
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .sort((a, b) => {
        // Sort numerically where possible
        const aNum = parseInt(a)
        const bNum = parseInt(b)
        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum
        return a.localeCompare(b)
      })
  } catch {
    console.warn(`  ⚠ Could not read folder: ${folderPath}`)
    return []
  }

  const productSlug = slugify(def.name)
  const urls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const localPath = resolve(folderPath, file)
    const publicId = `carve/products/${productSlug}-${i + 1}`
    try {
      const result = await cloudinary.uploader.upload(localPath, {
        public_id: publicId,
        overwrite: true,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      })
      urls.push(result.secure_url)
      console.log(`    ✓ ${file} → ${publicId}`)
    } catch (err) {
      console.warn(`    ✗ Failed: ${file}:`, (err as Error).message?.slice(0, 80))
    }
  }

  return urls
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n═══════════════════════════════════════════')
  console.log('  CARVE — Perfume Seed Script')
  console.log('═══════════════════════════════════════════\n')

  const { connectDB } = await import('../lib/mongodb')
  const { default: Product } = await import('../models/Product')

  console.log('Connecting to MongoDB…')
  await connectDB()
  console.log('Connected.\n')

  let created = 0
  let skipped = 0

  for (const def of PERFUME_DEFS) {
    console.log(`\nProcessing: ${def.name}`)

    // Skip if slug already exists (safe to re-run)
    const slug = slugify(def.name)
    const existing = await Product.findOne({ slug })
    if (existing) {
      console.log(`  → Already exists, skipping.`)
      skipped++
      continue
    }

    const images = await uploadProductImages(def)
    if (images.length === 0) {
      console.warn(`  ⚠ No images uploaded — skipping product.`)
      skipped++
      continue
    }

    await Product.create({
      name: def.name,
      slug,
      category: 'perfume' as const,
      subcategory: def.subcategory,
      price: def.price,
      ...(def.comparePrice !== undefined ? { comparePrice: def.comparePrice } : {}),
      description: def.description,
      shortDescription: def.shortDescription,
      images,
      stock: def.stock,
      inStock: def.inStock,
      featured: def.featured,
      tags: def.tags,
      attributes: def.attributes,
      moodboard: { theme: '', description: '', images: [], keywords: [] },
    })

    console.log(`  ✓ Created "${def.name}" with ${images.length} images (slug: ${slug})`)
    created++
  }

  console.log('\n═══════════════════════════════════════════')
  console.log(`  Done! Created ${created} products, skipped ${skipped}`)
  console.log('═══════════════════════════════════════════\n')
  process.exit(0)
}

main().catch((err) => {
  console.error('\n✗ Seed failed:', err)
  process.exit(1)
})
