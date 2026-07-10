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

const IMAGES_BASE = 'D:\\Project 101\\Projects\\carveimages'

// ─── Product definitions ────────────────────────────────────────────────────

interface ProductDef {
  folderPath: string   // relative to IMAGES_BASE
  name: string
  subcategory: string
  price: number
  comparePrice?: number
  description: string
  shortDescription: string
  tags: string[]
  featured: boolean
  attributes: Record<string, string | string[]>
}

const PRODUCT_DEFS: ProductDef[] = [
  // ── Bracelets ──────────────────────────────────────────────────────────────
  {
    folderPath: 'Bracelets\\Luna Bracelet',
    name: 'Luna Bracelet',
    subcategory: 'Bracelets',
    price: 2800,
    comparePrice: 3500,
    description:
      'The Luna Bracelet is a celestial piece inspired by the quiet glow of moonlight. Delicate stones set in a refined silhouette that captures the essence of evening elegance. Lightweight enough for all-day wear, luminous enough for every special occasion.',
    shortDescription: 'Celestial bracelet with moonlit radiance — elegant for every occasion.',
    tags: ['bracelet', 'jewellery', 'elegant', 'celestial', 'everyday'],
    featured: true,
    attributes: { finish: 'Silver Tone', gemstone: 'Cubic Zirconia' },
  },
  {
    folderPath: 'Bracelets\\The Chandelier',
    name: 'The Chandelier Bracelet',
    subcategory: 'Bracelets',
    price: 3200,
    comparePrice: 4000,
    description:
      'The Chandelier Bracelet commands attention with its dramatic layered design. Inspired by grand ballroom chandeliers, each element drapes and catches the light beautifully. A statement piece for those who dress with intention and leave a lasting impression.',
    shortDescription: 'Dramatic layered bracelet inspired by ballroom chandeliers.',
    tags: ['bracelet', 'jewellery', 'statement', 'chandelier', 'dramatic'],
    featured: true,
    attributes: { finish: 'Gold Tone', gemstone: 'Crystal' },
  },
  {
    folderPath: 'Bracelets\\The Elegant Heart',
    name: 'The Elegant Heart',
    subcategory: 'Bracelets',
    price: 2500,
    comparePrice: 3200,
    description:
      'The Elegant Heart is a romantic bracelet that speaks the language of love without saying a word. A delicate heart motif set in sparkling stones — timeless in form, effortlessly wearable. Gift it, or wear it for yourself.',
    shortDescription: 'Romantic heart bracelet — timeless, delicate, and utterly wearable.',
    tags: ['bracelet', 'jewellery', 'heart', 'romantic', 'gift'],
    featured: false,
    attributes: { finish: 'Rose Gold Tone', gemstone: 'Cubic Zirconia' },
  },
  {
    folderPath: 'Bracelets\\The Tennis Bracelet',
    name: 'The Tennis Bracelet',
    subcategory: 'Bracelets',
    price: 3500,
    comparePrice: 4500,
    description:
      'A classic reimagined. The Tennis Bracelet features a continuous line of individually set stones that catch every angle of light. Refined, versatile, and undeniably elegant — the piece every jewellery collection deserves.',
    shortDescription: 'Classic continuous-stone bracelet — refined elegance that catches every light.',
    tags: ['bracelet', 'jewellery', 'tennis', 'classic', 'elegant', 'diamonds'],
    featured: true,
    attributes: { finish: 'Silver Tone', gemstone: 'Cubic Zirconia' },
  },
  {
    folderPath: 'Bracelets\\The Tennis Bracelet (2)',
    name: 'The Tennis Bracelet II',
    subcategory: 'Bracelets',
    price: 3500,
    comparePrice: 4500,
    description:
      'The second edition of our iconic Tennis Bracelet, featuring a subtly different stone arrangement for a fresh take on a timeless silhouette. The same continuous brilliance — a distinct new character.',
    shortDescription: 'Second edition tennis bracelet — the same brilliance, a fresh perspective.',
    tags: ['bracelet', 'jewellery', 'tennis', 'classic', 'elegant'],
    featured: false,
    attributes: { finish: 'Gold Tone', gemstone: 'Cubic Zirconia' },
  },
  {
    folderPath: 'Bracelets\\The Tennis Bracelet (3)',
    name: 'The Tennis Bracelet III',
    subcategory: 'Bracelets',
    price: 3500,
    comparePrice: 4500,
    description:
      'The third edition of the Tennis Bracelet pushes the design further — a bolder setting, a richer gleam. Each variation in this series stands on its own while sharing the unmistakable CARVE standard of brilliance.',
    shortDescription: 'Third edition tennis bracelet — bolder setting, richer gleam.',
    tags: ['bracelet', 'jewellery', 'tennis', 'bold', 'statement'],
    featured: false,
    attributes: { finish: 'Silver & Gold Tone', gemstone: 'Cubic Zirconia' },
  },
  {
    folderPath: 'Bracelets\\The Tulip Bracelet (Multi)',
    name: 'The Tulip Bracelet – Multi Color',
    subcategory: 'Bracelets',
    price: 2200,
    comparePrice: 2800,
    description:
      'Inspired by a field of tulips in full bloom, this bracelet brings together a vivid array of coloured stones in a playful yet refined composition. Light, joyful, and utterly wearable — it is spring on your wrist.',
    shortDescription: 'Floral-inspired bracelet with vivid multi-color stones — spring on your wrist.',
    tags: ['bracelet', 'jewellery', 'floral', 'colorful', 'tulip', 'spring'],
    featured: false,
    attributes: { finish: 'Gold Tone', gemstone: 'Multi-color Crystals' },
  },
  {
    folderPath: 'Bracelets\\The Tulip Bracelet (White)',
    name: 'The Tulip Bracelet – White',
    subcategory: 'Bracelets',
    price: 2200,
    comparePrice: 2800,
    description:
      'The white edition of the Tulip Bracelet strips back colour to let the form speak. Pure, clean stones set in a floral-inspired silhouette — an understated piece that pairs effortlessly with everything from silk blouses to casual ensembles.',
    shortDescription: 'White edition floral bracelet — pure, clean, and effortlessly versatile.',
    tags: ['bracelet', 'jewellery', 'floral', 'white', 'tulip', 'minimal'],
    featured: false,
    attributes: { finish: 'Silver Tone', gemstone: 'White Crystal' },
  },

  // ── Earrings ───────────────────────────────────────────────────────────────
  {
    folderPath: 'Earings\\Frost Studs',
    name: 'Frost Studs',
    subcategory: 'Earrings',
    price: 1800,
    comparePrice: 2200,
    description:
      'Frost Studs are the quiet confidence of a winter morning — cool, composed, and brilliant. Precisely cut stones set close to the ear in a clean, minimal silhouette. The kind of earrings you reach for without thinking, because they always work.',
    shortDescription: 'Cool, minimal stud earrings with crisp-cut stones — effortlessly classic.',
    tags: ['earrings', 'jewellery', 'studs', 'minimal', 'everyday', 'cool'],
    featured: true,
    attributes: { finish: 'Silver Tone', gemstone: 'Cubic Zirconia' },
  },
  {
    folderPath: 'Earings\\Stella Earings',
    name: 'Stella Earrings',
    subcategory: 'Earrings',
    price: 2000,
    comparePrice: 2500,
    description:
      'Named after the stars, Stella Earrings radiate a quiet luminosity. A compact starburst of hand-set stones catches light from every direction, creating a subtle sparkle that elevates any look. From morning coffee to evening out — Stella goes everywhere.',
    shortDescription: 'Star-inspired earrings with all-direction sparkle — for every hour of your day.',
    tags: ['earrings', 'jewellery', 'stellar', 'star', 'sparkle', 'elegant'],
    featured: false,
    attributes: { finish: 'Gold Tone', gemstone: 'Cubic Zirconia' },
  },

  // ── Necklaces ──────────────────────────────────────────────────────────────
  {
    folderPath: 'Necklace\\Valera V Necklace',
    name: 'Valera V Necklace',
    subcategory: 'Necklaces',
    price: 3000,
    comparePrice: 3800,
    description:
      'The Valera V Necklace is architectural elegance at its finest. A precisely formed V-shaped pendant of stone-set metal rests at the décolletage, framing the neckline with intention. Minimal in form, maximal in impact — the kind of necklace that changes an outfit.',
    shortDescription: 'Stone-set V-pendant necklace — architectural elegance that frames the neckline.',
    tags: ['necklace', 'jewellery', 'pendant', 'V-shape', 'elegant', 'statement'],
    featured: true,
    attributes: { finish: 'Gold Tone', gemstone: 'Cubic Zirconia', length: '45 cm chain' },
  },

  // ── Rings ──────────────────────────────────────────────────────────────────
  {
    folderPath: 'Rings\\Product 9',
    name: 'Carve Ring No. 9',
    subcategory: 'Rings',
    price: 2500,
    comparePrice: undefined,
    description:
      'A statement ring with unmistakable presence. Precisely set stones arranged in a bold, wearable composition that sits beautifully on the hand. CARVE Ring No. 9 is for those who believe accessories should make a point.',
    shortDescription: 'Bold statement ring with precisely set stones — made to be noticed.',
    tags: ['ring', 'jewellery', 'statement', 'bold'],
    featured: false,
    attributes: { finish: 'Gold Tone', gemstone: 'Cubic Zirconia' },
  },
]

// ─── Image upload ────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function uploadProductImages(def: ProductDef): Promise<string[]> {
  const folderPath = resolve(IMAGES_BASE, def.folderPath)
  let files: string[]
  try {
    files = readdirSync(folderPath)
      .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .sort((a, b) => {
        const numA = parseInt(a)
        const numB = parseInt(b)
        return numA - numB
      })
  } catch {
    console.warn(`  ⚠ Could not read folder: ${folderPath}`)
    return []
  }

  const productSlug = slugify(def.name)
  const urls: string[] = []

  for (const file of files) {
    const localPath = resolve(folderPath, file)
    const imageIndex = files.indexOf(file) + 1
    const publicId = `carve/products/${productSlug}-${imageIndex}`
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
  console.log('  CARVE — Product Seed Script')
  console.log('═══════════════════════════════════════════\n')

  const { connectDB } = await import('../lib/mongodb')
  const { default: Product } = await import('../models/Product')
  const { slugify: makeSlug } = await import('../lib/utils')

  console.log('Connecting to MongoDB…')
  await connectDB()
  console.log('Connected.\n')

  let created = 0
  let skipped = 0

  for (const def of PRODUCT_DEFS) {
    console.log(`\nProcessing: ${def.name}`)

    // Upload images
    const images = await uploadProductImages(def)
    if (images.length === 0) {
      console.warn(`  ⚠ No images uploaded — skipping product.`)
      skipped++
      continue
    }

    // Build slug
    let baseSlug = makeSlug(def.name)
    let slug = baseSlug
    let count = 1
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`
    }

    const productData = {
      name: def.name,
      slug,
      category: 'jewellery' as const,
      subcategory: def.subcategory,
      price: def.price,
      ...(def.comparePrice !== undefined ? { comparePrice: def.comparePrice } : {}),
      description: def.description,
      shortDescription: def.shortDescription,
      images,
      stock: 20,
      inStock: true,
      featured: def.featured,
      tags: def.tags,
      attributes: def.attributes,
      moodboard: { theme: '', description: '', images: [], keywords: [] },
    }

    await Product.create(productData)
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
