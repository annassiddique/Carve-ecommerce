import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

// ─── Upload all 13 unique dummy images to Cloudinary ───────────────────────

const DUMMY_DIR = resolve(process.cwd(), 'public', 'images', 'dumby')

// Maps a short key to { local filename, cloudinary public_id }
const IMAGE_MANIFEST: Record<string, { file: string; id: string }> = {
  // Perfumes
  perf_bw_rock:     { file: '12c2e5780472a13feebb70792d705428.jpg', id: 'carve/products/perf-bw-rock'     },
  perf_dark_water:  { file: '4c11c0dde3924c0455c0f70958c89b24.jpg',  id: 'carve/products/perf-dark-water'  },
  perf_sandy_gold:  { file: '63f91a3c342c3e917332208a7defb9b4.jpg',  id: 'carve/products/perf-sandy-gold'  },
  perf_artvota:     { file: '6b4a3ab4a0b1ebbade284b8c85edfb03.jpg',  id: 'carve/products/perf-artvota'     },
  perf_designix:    { file: 'a68f5f45857a238528901e4fb1bcafb3.jpg',  id: 'carve/products/perf-designix'    },
  perf_aesop_amber: { file: 'b180a42abf419e218295829511feb13f.jpg',  id: 'carve/products/perf-aesop-amber' },
  perf_gentleman:   { file: 'cb4391841d8d2face412adbcad49d30a.jpg',  id: 'carve/products/perf-gentleman'   },
  perf_sunset:      { file: 'ba1111139ddf3a0564b231150f10227d.jpg',  id: 'carve/products/perf-sunset'      },
  perf_amber_oud:   { file: 'pef-3.jpg',                             id: 'carve/products/perf-amber-oud'   },
  // Jewellery
  jewel_ruby_necklace:  { file: '3e3eb603681a9a221c0042028c856d6e.jpg', id: 'carve/products/jewel-ruby-necklace'  },
  jewel_rose_drops:     { file: '8a4c6d74acd5c61e54309936eb3e0d53.jpg', id: 'carve/products/jewel-rose-drops'     },
  jewel_gold_drops:     { file: 'b34d26882db166b55ae19b60c7593eef.jpg', id: 'carve/products/jewel-gold-drops'     },
  jewel_stud_geo:       { file: 'ca52cb9b8a6686bcfca3106a538831c1.jpg', id: 'carve/products/jewel-stud-geo'       },
}

async function uploadImage(key: string): Promise<[string, string]> {
  const { file, id } = IMAGE_MANIFEST[key]
  const localPath = resolve(DUMMY_DIR, file)
  const result = await cloudinary.uploader.upload(localPath, {
    public_id: id,
    overwrite: true,
    resource_type: 'image',
  })
  console.log(`  ✓ ${file}`)
  return [key, result.secure_url]
}

async function uploadAll(): Promise<Record<string, string>> {
  const keys = Object.keys(IMAGE_MANIFEST)
  console.log(`\nUploading ${keys.length} images to Cloudinary…\n`)

  // 4 concurrent uploads
  const urlMap: Record<string, string> = {}
  let idx = 0

  async function worker() {
    while (idx < keys.length) {
      const k = keys[idx++]
      try {
        const [key, url] = await uploadImage(k)
        urlMap[key] = url
      } catch (err) {
        console.warn(`  ✗ Failed to upload ${IMAGE_MANIFEST[k].file}:`, (err as Error).message?.slice(0, 80))
        // Fallback: serve directly from public/ (works in dev and production static)
        urlMap[k] = `/images/dumby/${IMAGE_MANIFEST[k].file}`
      }
    }
  }

  await Promise.all([worker(), worker(), worker(), worker()])
  return urlMap
}

// ─── Build product catalog ─────────────────────────────────────────────────

function buildProducts(u: Record<string, string>) {
  return [

    // ══════════════════════════════════════════
    //   PERFUMES
    // ══════════════════════════════════════════

    {
      name: 'Noir Vetiver',
      slug: 'noir-vetiver',
      category: 'perfume',
      subcategory: 'For Him',
      price: 4500,
      comparePrice: 5500,
      description:
        'Noir Vetiver is a statement for the modern man who carries the night with him. A deep, smoldering blend of Haitian vetiver grounded in sandalwood and blackened leather, crowned with a sharp bite of bergamot. This is confidence in a bottle.',
      shortDescription: 'Deep vetiver, leather, and smoke — for the man who commands every room.',
      images: [u.perf_designix, u.perf_dark_water, u.perf_artvota],
      stock: 25,
      inStock: true,
      featured: true,
      tags: ['luxury', 'woody', 'dark', 'for-him', 'leather'],
      attributes: {
        scentFamily: 'Woody',
        topNotes: ['Bergamot', 'Black Pepper', 'Cardamom'],
        heartNotes: ['Vetiver', 'Leather', 'Tobacco'],
        baseNotes: ['Sandalwood', 'Ambergris', 'Musk'],
        size: '100ml',
      },
      moodboard: {
        theme: 'Dark Luxury',
        description:
          'Step into a dimly lit study lined with leather-bound books. The scent of aged wood and burning amber fills the air. Noir Vetiver is that feeling — powerful, private, unhurried.',
        images: [u.perf_designix, u.perf_dark_water, u.perf_artvota, u.perf_bw_rock, u.perf_gentleman, u.perf_dark_water],
        keywords: ['Opulent', 'Nocturnal', 'Commanding', 'Leather', 'Smoke'],
      },
    },

    {
      name: 'Rose Cipher',
      slug: 'rose-cipher',
      category: 'perfume',
      subcategory: 'For Her',
      price: 3800,
      comparePrice: undefined,
      description:
        'Rose Cipher is a modern floral built for the woman who is both delicate and fierce. Turkish rose absolute at its heart, wrapped in white musk and warmed by a base of vanilla and cedarwood. Wear it like a secret.',
      shortDescription: 'Turkish rose, white musk, and warm vanilla — feminine power bottled.',
      images: [u.perf_sunset, u.perf_sandy_gold, u.perf_aesop_amber],
      stock: 30,
      inStock: true,
      featured: true,
      tags: ['luxury', 'floral', 'rose', 'for-her', 'romantic'],
      attributes: {
        scentFamily: 'Floral',
        topNotes: ['Pink Pepper', 'Lychee', 'Bergamot'],
        heartNotes: ['Turkish Rose', 'Jasmine', 'Peony'],
        baseNotes: ['Vanilla', 'Cedarwood', 'White Musk'],
        size: '50ml',
      },
      moodboard: {
        theme: 'Floral Romance',
        description:
          'A garden in full bloom at golden hour. Silk ribbons, fresh peonies, and the softest evening light. Rose Cipher is love written in scent.',
        images: [u.perf_sunset, u.perf_sandy_gold, u.perf_aesop_amber, u.perf_amber_oud, u.perf_sunset, u.perf_sandy_gold],
        keywords: ['Bloom', 'Silk', 'Candlelight', 'Romantic', 'Feminine'],
      },
    },

    {
      name: 'Amber Accord',
      slug: 'amber-accord',
      category: 'perfume',
      subcategory: 'Unisex',
      price: 5200,
      comparePrice: undefined,
      description:
        'Amber Accord is warmth itself. A rich, resinous blend of golden amber and Omani frankincense balanced by cooling green cardamom. Neither masculine nor feminine — it belongs to those who are simply, completely themselves.',
      shortDescription: 'Golden amber, frankincense, and cardamom. Warmth beyond categories.',
      images: [u.perf_aesop_amber, u.perf_amber_oud, u.perf_sunset],
      stock: 18,
      inStock: true,
      featured: true,
      tags: ['luxury', 'amber', 'oriental', 'unisex', 'warm'],
      attributes: {
        scentFamily: 'Oriental',
        topNotes: ['Cardamom', 'Saffron', 'Bergamot'],
        heartNotes: ['Amber', 'Frankincense', 'Rose'],
        baseNotes: ['Oud', 'Benzoin', 'Musk'],
        size: '100ml',
      },
      moodboard: {
        theme: 'Golden Hour',
        description:
          'A desert at dusk. The sun melts into gold and the air smells of warm resin and spice. Amber Accord is the last light of a perfect day.',
        images: [u.perf_aesop_amber, u.perf_amber_oud, u.perf_sunset, u.perf_sandy_gold, u.perf_aesop_amber, u.perf_amber_oud],
        keywords: ['Golden', 'Warm', 'Desert', 'Resinous', 'Timeless'],
      },
    },

    {
      name: 'Silk Oud',
      slug: 'silk-oud',
      category: 'perfume',
      subcategory: 'Unisex',
      price: 6500,
      comparePrice: 7800,
      description:
        'Silk Oud is the convergence of East and West. Pure Cambodian oud rides on a velvet base of Bulgarian rose and white sandalwood, with the finest saffron threading through. An experience of absolute luxury.',
      shortDescription: 'Cambodian oud, Bulgarian rose, and sandalwood — a signature like no other.',
      images: [u.perf_bw_rock, u.perf_gentleman, u.perf_designix],
      stock: 12,
      inStock: true,
      featured: true,
      tags: ['luxury', 'oud', 'oriental', 'unisex', 'premium', 'saffron'],
      attributes: {
        scentFamily: 'Oriental Woody',
        topNotes: ['Saffron', 'Bergamot', 'Cardamom'],
        heartNotes: ['Oud', 'Bulgarian Rose', 'Jasmine'],
        baseNotes: ['Sandalwood', 'Amber', 'Musk'],
        size: '100ml',
      },
      moodboard: {
        theme: 'Eastern Opulence',
        description:
          'Marble halls, damask drapes, candlelight on gold leaf. Silk Oud is heritage and refinement made liquid.',
        images: [u.perf_bw_rock, u.perf_gentleman, u.perf_designix, u.perf_bw_rock, u.perf_dark_water, u.perf_gentleman],
        keywords: ['Oud', 'Opulent', 'Heritage', 'Gold', 'Saffron'],
      },
    },

    {
      name: 'Aqua Breeze',
      slug: 'aqua-breeze',
      category: 'perfume',
      subcategory: 'For Him',
      price: 3200,
      comparePrice: undefined,
      description:
        'Aqua Breeze captures the first breath of morning sea air. Crisp marine accord meets citrus bergamot and a whisper of cool mint, drying down to a clean, woody base of cedarwood and vetiver. Effortless confidence, every day.',
      shortDescription: 'Marine freshness, bergamot, and cedar — clean confidence for every morning.',
      images: [u.perf_dark_water, u.perf_artvota, u.perf_sandy_gold],
      stock: 40,
      inStock: true,
      featured: false,
      tags: ['fresh', 'aquatic', 'for-him', 'everyday', 'light'],
      attributes: {
        scentFamily: 'Aquatic',
        topNotes: ['Marine Accord', 'Bergamot', 'Mint'],
        heartNotes: ['Lavender', 'Geranium', 'Jasmine'],
        baseNotes: ['Cedarwood', 'Vetiver', 'White Musk'],
        size: '75ml',
      },
      moodboard: {
        theme: 'Morning Coast',
        description:
          'Salt air and open horizons. A clean shirt, sunlight on water. Aqua Breeze is the scent of starting fresh.',
        images: [u.perf_dark_water, u.perf_artvota, u.perf_sandy_gold, u.perf_dark_water, u.perf_artvota, u.perf_sandy_gold],
        keywords: ['Fresh', 'Ocean', 'Morning', 'Clean', 'Energetic'],
      },
    },

    // ══════════════════════════════════════════
    //   JEWELLERY
    // ══════════════════════════════════════════

    {
      name: 'Ruby Pendant Necklace',
      slug: 'ruby-pendant-necklace',
      category: 'jewellery',
      subcategory: 'Necklace',
      price: 4200,
      comparePrice: 5000,
      description:
        'A deep crimson ruby — emerald cut, richly saturated — set in an 18K gold halo of micro-pavé diamonds. Suspended on a fine link chain that drapes the neckline like a whisper. This is jewellery that holds a room.',
      shortDescription: 'Emerald-cut ruby in gold diamond halo on fine link chain. Presence, defined.',
      images: [u.jewel_ruby_necklace, u.jewel_gold_drops, u.jewel_rose_drops],
      stock: 15,
      inStock: true,
      featured: true,
      tags: ['jewellery', 'necklace', 'pendant', 'ruby', 'gold', 'diamonds', 'statement'],
      attributes: {
        material: '18K Gold Plated',
        length: '18 inch chain',
        finish: 'Polished',
        gemstone: 'Ruby, Diamond',
      },
      moodboard: {
        theme: 'Deep Red Opulence',
        description:
          'Dark wood, warm candlelight, a glass of red. The Ruby Pendant Necklace is for evenings that matter.',
        images: [u.jewel_ruby_necklace, u.jewel_gold_drops, u.jewel_rose_drops, u.jewel_ruby_necklace, u.jewel_stud_geo, u.jewel_gold_drops],
        keywords: ['Ruby', 'Crimson', 'Evening', 'Opulent', 'Statement'],
      },
    },

    {
      name: 'Crystal Drop Earrings',
      slug: 'crystal-drop-earrings',
      category: 'jewellery',
      subcategory: 'Earrings',
      price: 2600,
      comparePrice: undefined,
      description:
        'Radiant-cut white crystals framed in a micro-pavé diamond halo, suspended from a pavé-set bar in warm rose gold. Long, luminous, and endlessly flattering — these earrings catch every light source in the room.',
      shortDescription: 'Rose gold pavé bar with radiant crystal drop. Effortless glamour.',
      images: [u.jewel_rose_drops, u.jewel_gold_drops, u.jewel_stud_geo],
      stock: 35,
      inStock: true,
      featured: true,
      tags: ['jewellery', 'earrings', 'crystal', 'rose-gold', 'drop', 'elegant'],
      attributes: {
        material: 'Rose Gold Plated',
        length: '5 cm drop',
        finish: 'Polished',
        gemstone: 'Cubic Zirconia',
      },
      moodboard: {
        theme: 'Rose Gold Dreams',
        description:
          'Blush and champagne, soft bokeh, the warmth of gold-hour light. Crystal Drop Earrings are romance made wearable.',
        images: [u.jewel_rose_drops, u.jewel_gold_drops, u.jewel_stud_geo, u.jewel_rose_drops, u.jewel_gold_drops, u.jewel_ruby_necklace],
        keywords: ['Rose Gold', 'Crystal', 'Romantic', 'Luminous', 'Drop'],
      },
    },

    {
      name: 'Diamond Hoop Earrings',
      slug: 'diamond-hoop-earrings',
      category: 'jewellery',
      subcategory: 'Earrings',
      price: 3800,
      comparePrice: 4500,
      description:
        'Wide gold hoops encrusted in five rows of round brilliant cubic zirconia stones, each one precisely set. A teardrop crystal swings freely from the base, catching light with every movement. These are celebration earrings — they belong at every big moment.',
      shortDescription: 'Five-row pave hoops with suspended teardrop crystal. Statement glamour.',
      images: [u.jewel_gold_drops, u.jewel_rose_drops, u.jewel_ruby_necklace],
      stock: 20,
      inStock: true,
      featured: true,
      tags: ['jewellery', 'earrings', 'gold', 'hoop', 'statement', 'crystals', 'occasion'],
      attributes: {
        material: '18K Gold Plated Brass',
        length: '4 cm drop',
        finish: 'Polished',
        gemstone: 'Cubic Zirconia',
      },
      moodboard: {
        theme: 'Golden Celebration',
        description:
          'Bokeh lights, gold confetti, the feeling of a perfect night. Diamond Hoop Earrings are made for the moments you will remember.',
        images: [u.jewel_gold_drops, u.jewel_rose_drops, u.jewel_ruby_necklace, u.jewel_gold_drops, u.jewel_stud_geo, u.jewel_rose_drops],
        keywords: ['Gold', 'Celebration', 'Glamorous', 'Statement', 'Hoop'],
      },
    },

    {
      name: 'Gold Pavé Stud Set',
      slug: 'gold-pave-stud-set',
      category: 'jewellery',
      subcategory: 'Earrings',
      price: 1800,
      comparePrice: undefined,
      description:
        'A bold, architectural stud earring with a domed top set in micro-pavé white crystals, flowing into a solid geometric gold drop ring. Simultaneously sculptural and wearable — the kind of earring that makes the outfit.',
      shortDescription: 'Crystal pavé dome over geometric gold ring — editorial minimalism.',
      images: [u.jewel_stud_geo, u.jewel_rose_drops, u.jewel_gold_drops],
      stock: 50,
      inStock: true,
      featured: false,
      tags: ['jewellery', 'earrings', 'gold', 'stud', 'geometric', 'minimal', 'everyday'],
      attributes: {
        material: 'Gold Plated Brass',
        length: '2.5 cm',
        finish: 'Polished',
        gemstone: 'Cubic Zirconia',
      },
      moodboard: {
        theme: 'Editorial Gold',
        description:
          'Dark velvet, dried botanicals, an editorial eye. Gold Pavé Stud Set is jewellery that photographs as beautifully as it feels.',
        images: [u.jewel_stud_geo, u.jewel_gold_drops, u.jewel_rose_drops, u.jewel_stud_geo, u.jewel_ruby_necklace, u.jewel_gold_drops],
        keywords: ['Geometric', 'Editorial', 'Gold', 'Minimal', 'Architectural'],
      },
    },

  ]
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  // 1. Upload images
  const urlMap = await uploadAll()

  // 2. Seed database
  console.log('\nConnecting to MongoDB…')
  const { connectDB } = await import('../lib/mongodb')
  const { default: Product } = await import('../models/Product')

  await connectDB()

  const products = buildProducts(urlMap)
  await Product.deleteMany({})
  await Product.insertMany(products)

  const perfumes  = products.filter(p => p.category === 'perfume').length
  const jewellery = products.filter(p => p.category === 'jewellery').length
  console.log(`\n✓ Seeded ${products.length} products — ${perfumes} perfumes · ${jewellery} jewellery\n`)
  process.exit(0)
}

main().catch((err) => {
  console.error('\n✗ Seed failed:', err)
  process.exit(1)
})
