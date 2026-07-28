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

const IMAGES_BASE = 'D:\\Project 101\\Projects\\carve\\public\\images\\carve-product-images'

interface ProductDef {
  folderPath: string
  name: string
  subcategory: string
  price: number
  comparePrice?: number
  description: string
  shortDescription: string
  tags: string[]
  featured: boolean
  inStock: boolean
  stock: number
  attributes: Record<string, string | string[]>
}

const PRODUCT_DEFS: ProductDef[] = [
  // ── Bracelets ──────────────────────────────────────────────────────────────
  {
    folderPath: 'Celeste Crystal Link Bracelet',
    name: 'Celeste Crystal Link Bracelet',
    subcategory: 'Bracelets',
    price: 1750,
    comparePrice: 1950,
    description:
      'A statement bracelet combining luminous crystal links, a delicate gold-toned chain, and an elegant interlocking centre motif. Celeste adds a refined touch of sparkle to both formal looks and elevated everyday outfits.',
    shortDescription: 'Crystal link bracelet with an interlocking gold-toned centre motif.',
    tags: ['bracelet', 'jewellery', 'crystal', 'gold', 'everyday', 'statement'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Noir Clover Station Bracelet',
    name: 'Noir Clover Station Bracelet – Rose Gold',
    subcategory: 'Bracelets',
    price: 1950,
    comparePrice: 2150,
    description:
      'A bold yet refined bracelet featuring five polished black clover motifs set against a warm rose-gold-toned chain. Noir adds contrast and character to both minimal outfits and evening looks.',
    shortDescription: 'Five black clover motifs on a warm rose-gold chain.',
    tags: ['bracelet', 'jewellery', 'clover', 'rose gold', 'noir', 'statement'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Rose Gold Tone',
      material: 'Rose-gold-toned alloy',
    },
  },
  {
    folderPath: 'Ivory Clover Station Bracelet',
    name: 'Ivory Clover Station Bracelet',
    subcategory: 'Bracelets',
    price: 1950,
    comparePrice: 2150,
    description:
      'Five luminous ivory clover motifs are set along a delicate gold-toned chain to create an elegant everyday bracelet. Wear it individually for a refined finish or pair it with the matching Ivory Clover Station Necklace.',
    shortDescription: 'Delicate gold-toned bracelet with five ivory pearlescent clover motifs.',
    tags: ['bracelet', 'jewellery', 'clover', 'ivory', 'pearl', 'everyday', 'matching set'],
    featured: false,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Ivory Pearl Clover',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Classic Tennis Bracelet (Thick)',
    name: 'Classic Tennis Bracelet',
    subcategory: 'Bracelets',
    price: 2400,
    comparePrice: 2800,
    description:
      'Timeless and beautifully balanced, the Classic Tennis Bracelet features medium-sized round stones that offer the perfect amount of brilliance. Versatile enough for everyday elegance yet sparkling enough for special occasions, it is the ideal choice for a polished, classic look.',
    shortDescription: 'Timeless continuous-stone tennis bracelet with perfectly balanced brilliance.',
    tags: ['bracelet', 'jewellery', 'tennis', 'classic', 'elegant', 'statement'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Classic Tennis Bracelet (Slim)',
    name: 'Slim Tennis Bracelet',
    subcategory: 'Bracelets',
    price: 2400,
    comparePrice: 2800,
    description:
      'Refined and delicate, the Slim Tennis Bracelet offers the same continuous brilliance as the classic but in a sleeker, more understated silhouette. Ideal for everyday wear and for stacking with other bracelets for a curated wrist.',
    shortDescription: 'Sleek, understated tennis bracelet perfect for stacking.',
    tags: ['bracelet', 'jewellery', 'tennis', 'slim', 'minimal', 'stackable'],
    featured: false,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Classic Tennis Bracelet (Bold)',
    name: 'Bold Tennis Bracelet',
    subcategory: 'Bracelets',
    price: 2400,
    comparePrice: 2800,
    description:
      'Bold and commanding, the Bold Tennis Bracelet features larger, more prominent stones for a dramatic statement. The same continuous setting as the classic — amplified for special occasions and evenings that call for maximum sparkle.',
    shortDescription: 'Larger-stone tennis bracelet for a bold, commanding statement.',
    tags: ['bracelet', 'jewellery', 'tennis', 'bold', 'statement', 'occasion'],
    featured: false,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'The Elegant Heart',
    name: 'The Elegant Heart',
    subcategory: 'Bracelets',
    price: 1750,
    comparePrice: 1950,
    description:
      'Timeless sparkle meets romantic detail in the Elegant Heart Tennis Bracelet. A continuous row of clear stones is finished with a delicate open-heart centrepiece, creating a refined design that feels feminine without being overly ornate. Elegant enough for celebrations yet versatile enough for everyday styling, it can be worn alone as a statement or layered with slimmer bracelets for added brilliance.',
    shortDescription: 'Tennis bracelet with a sparkling open-heart centrepiece.',
    tags: ['bracelet', 'jewellery', 'heart', 'romantic', 'elegant', 'gift', 'tennis'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'The Chandelier Bracelet',
    name: 'Chandelier Crystal Bracelet',
    subcategory: 'Bracelets',
    price: 3500,
    comparePrice: 3700,
    description:
      'Designed for maximum brilliance, the Chandelier Crystal Bracelet features a continuous arrangement of oval clear stones, each framed by a delicate halo of smaller sparkling accents. Its bold, symmetrical design creates an elegant statement that is especially suited to celebrations, formal events and evening wear. Wear it alone as the centrepiece of your look or pair it with minimal jewellery to let its sparkle stand out.',
    shortDescription: 'Oval halo-set stones in a continuous, occasion-ready statement bracelet.',
    tags: ['bracelet', 'jewellery', 'chandelier', 'halo', 'statement', 'occasion', 'formal'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Luna Bracelet',
    name: 'Luna Bracelet',
    subcategory: 'Bracelets',
    price: 3500,
    comparePrice: 3700,
    description:
      'Elegant contrast defines the Luna Halo Bracelet. Warm champagne-toned round stones are framed by sparkling clear halos and alternated with delicate floral crystal links, creating a graceful statement design with a refined vintage-inspired feel. Finished with an adjustable silver-toned chain and a heart charm, Luna is ideal for evening wear, celebrations, and occasions that call for distinctive sparkle.',
    shortDescription: 'Champagne halo stones with floral crystal links and a heart charm.',
    tags: ['bracelet', 'jewellery', 'luna', 'halo', 'champagne', 'vintage', 'occasion'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Silver Tone',
      gemstone: 'Champagne Crystal',
      material: 'Silver-toned alloy',
    },
  },
  {
    folderPath: 'Tulip Bracelet (White)',
    name: 'Tulip Bracelet – Crystal White',
    subcategory: 'Bracelets',
    price: 2200,
    comparePrice: 2600,
    description:
      'Delicate and graceful, the Tulip Vine Bracelet features a flowing gold-toned vine design adorned with luminous oval stones and smaller leaf-shaped accents. The clear stones create a refined, versatile sparkle that complements both everyday outfits and formal occasion wear.',
    shortDescription: 'Botanical vine bracelet with luminous clear oval stones.',
    tags: ['bracelet', 'jewellery', 'tulip', 'vine', 'floral', 'white', 'crystal'],
    featured: false,
    inStock: false,
    stock: 0,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Tulip Bracelet (Multi)',
    name: 'Tulip Bracelet – Blush Multi',
    subcategory: 'Bracelets',
    price: 2200,
    comparePrice: 2600,
    description:
      'Romantic and distinctive, the Tulip Vine Bracelet features a flowing gold-toned vine decorated with oval stones in soft blush, rose and deeper mauve tones. Smaller leaf-shaped accents complete the botanical design, adding warmth and subtle colour to both day and evening looks.',
    shortDescription: 'Botanical vine bracelet in soft blush, rose and mauve tones.',
    tags: ['bracelet', 'jewellery', 'tulip', 'vine', 'floral', 'blush', 'multicolor'],
    featured: false,
    inStock: false,
    stock: 0,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Blush & Rose Crystal',
      material: 'Gold-toned alloy',
    },
  },

  // ── Earrings ───────────────────────────────────────────────────────────────
  {
    folderPath: 'Elara Crystal Leaf Drop Earrings',
    name: 'Elara Silver Crystal Leaf Drop Earrings',
    subcategory: 'Earrings',
    price: 1600,
    comparePrice: undefined,
    description:
      'Elegant drop earrings featuring layered leaf-shaped curves illuminated with fine crystal detailing. Elara offers graceful movement and sophisticated sparkle, making it ideal for formal occasions and evening wear.',
    shortDescription: 'Layered silver crystal leaf drop earrings for formal occasions.',
    tags: ['earrings', 'jewellery', 'drop', 'leaf', 'crystal', 'silver', 'formal'],
    featured: false,
    inStock: false,
    stock: 0,
    attributes: {
      finish: 'Silver Tone',
      gemstone: 'Clear Crystal',
      material: 'Silver-toned alloy',
    },
  },

  // ── Necklaces ──────────────────────────────────────────────────────────────
  {
    folderPath: 'Noir Black Clover Pendant',
    name: 'Noir Black Clover Pendant',
    subcategory: 'Necklaces',
    price: 1750,
    comparePrice: 2000,
    description:
      'A delicate gold-toned necklace finished with a polished black clover pendant. Minimal yet distinctive, Noir is designed for effortless everyday styling and looks especially elegant when layered with finer chains.',
    shortDescription: 'Minimal gold-toned necklace with a polished black clover pendant.',
    tags: ['necklace', 'jewellery', 'clover', 'noir', 'black', 'minimal', 'pendant'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Ivory Clover Station Necklace',
    name: 'Ivory Clover Station Necklace',
    subcategory: 'Necklaces',
    price: 2050,
    comparePrice: 2400,
    description:
      'A delicate gold-toned chain adorned with five luminous ivory clover motifs. Feminine and timeless, this necklace can be worn alone for understated elegance or paired with the matching bracelet for a coordinated look.',
    shortDescription: 'Gold-toned station necklace with five ivory pearlescent clover motifs.',
    tags: ['necklace', 'jewellery', 'clover', 'ivory', 'pearl', 'station', 'matching set'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Ivory Pearl Clover',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Rosé Halo Pendant',
    name: 'Rosé Halo Pendant',
    subcategory: 'Necklaces',
    price: 1999,
    comparePrice: 2400,
    description:
      'A radiant round pendant featuring soft pink stones surrounded by a sparkling clear halo. Rosé brings a feminine touch of colour to occasion wear while remaining delicate enough for everyday styling.',
    shortDescription: 'Round pink-stone pendant with a sparkling clear halo.',
    tags: ['necklace', 'jewellery', 'pendant', 'rose', 'pink', 'halo', 'feminine'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Pink & Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Four-Petal Flower Pendant',
    name: 'Four-Petal Flower Pendant',
    subcategory: 'Necklaces',
    price: 1999,
    comparePrice: 2400,
    description:
      'Inspired by the delicate symmetry of a flower, Fleur features an openwork four-petal pendant accented with shimmering stones. An elegant piece that brings soft sparkle to both eastern and western outfits.',
    shortDescription: 'Openwork four-petal floral pendant with shimmering stone accents.',
    tags: ['necklace', 'jewellery', 'pendant', 'floral', 'flower', 'elegant', 'versatile'],
    featured: false,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Blooming Heart Pendant',
    name: 'Blooming Heart Pendant',
    subcategory: 'Necklaces',
    price: 1999,
    comparePrice: 2400,
    description:
      'A romantic pendant combining a graceful heart outline with a sparkling floral centre. Amour is a feminine statement piece made for celebrations, thoughtful gifting, and elegant evening styling.',
    shortDescription: 'Romantic heart pendant with a sparkling floral crystal centre.',
    tags: ['necklace', 'jewellery', 'pendant', 'heart', 'floral', 'romantic', 'gift'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Fortuna Crystal Clover Necklace',
    name: 'Fortuna Silver Crystal Four-Leaf Clover Necklace',
    subcategory: 'Necklaces',
    price: 1899,
    comparePrice: 2300,
    description:
      'A sparkling four-leaf clover formed from four crystal-covered heart shapes. Finished in a cool silver tone, Fortuna adds a polished touch of brilliance while carrying the symbolic charm of luck and positivity.',
    shortDescription: 'Silver crystal four-leaf clover necklace — a symbol of luck and brilliance.',
    tags: ['necklace', 'jewellery', 'clover', 'silver', 'crystal', 'four-leaf', 'luck'],
    featured: false,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Silver Tone',
      gemstone: 'Clear Crystal',
      material: 'Silver-toned alloy',
    },
  },
  {
    folderPath: 'Aurelia Crystal Cluster Necklace',
    name: 'Aurelia Crystal Cluster Necklace',
    subcategory: 'Necklaces',
    price: 1999,
    comparePrice: 2400,
    description:
      'A delicate round pendant created from a brilliant arrangement of clustered stones. Aurelia offers refined sparkle in a compact silhouette, making it ideal for everyday elegance, dinners, and gifting.',
    shortDescription: 'Round crystal cluster pendant with refined, compact sparkle.',
    tags: ['necklace', 'jewellery', 'pendant', 'cluster', 'crystal', 'everyday', 'gift'],
    featured: false,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
  },
  {
    folderPath: 'Valera V Necklace',
    name: 'Valera V Necklace',
    subcategory: 'Necklaces',
    price: 1999,
    comparePrice: 2400,
    description:
      'Bold in form yet refined in detail, the Valera V Necklace features a sculptural gold-toned V pendant accented with an asymmetrical arrangement of clear stones. Suspended from a polished chain, its modern silhouette adds a confident statement to both minimal everyday looks and elevated evening styling. Wear it alone as a focal piece or layer it with a shorter, delicate chain for a contemporary finish.',
    shortDescription: 'Sculptural gold V-pendant with asymmetrical clear-stone detailing.',
    tags: ['necklace', 'jewellery', 'pendant', 'V-shape', 'statement', 'modern', 'elegant'],
    featured: true,
    inStock: true,
    stock: 20,
    attributes: {
      finish: 'Gold Tone',
      gemstone: 'Clear Crystal',
      material: 'Gold-toned alloy',
    },
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
        // Cover image (4x5) always first
        const aIs4x5 = a.toLowerCase().includes('4x5')
        const bIs4x5 = b.toLowerCase().includes('4x5')
        if (aIs4x5) return -1
        if (bIs4x5) return 1
        return parseInt(a) - parseInt(b)
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
  console.log('  CARVE — Product Seed Script (Full Reset)')
  console.log('═══════════════════════════════════════════\n')

  const { connectDB } = await import('../lib/mongodb')
  const { default: Product } = await import('../models/Product')
  const { slugify: makeSlug } = await import('../lib/utils')

  console.log('Connecting to MongoDB…')
  await connectDB()
  console.log('Connected.\n')

  // Hard reset — delete all existing products
  const deleted = await Product.deleteMany({})
  console.log(`Deleted ${deleted.deletedCount} existing products.\n`)

  let created = 0
  let skipped = 0

  for (const def of PRODUCT_DEFS) {
    console.log(`\nProcessing: ${def.name}`)

    const images = await uploadProductImages(def)
    if (images.length === 0) {
      console.warn(`  ⚠ No images uploaded — skipping product.`)
      skipped++
      continue
    }

    const slug = makeSlug(def.name)

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
      stock: def.stock,
      inStock: def.inStock,
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
