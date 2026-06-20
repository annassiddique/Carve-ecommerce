export interface Collection {
  slug: string
  name: string
  tagline: string
  description: string
  image: string
  video?: string
  productSlugs: string[]
}

export const collections: Collection[] = [
  {
    slug: 'noir-edit',
    name: 'The Noir Edit',
    tagline: 'Dark. Commanding. Unforgettable.',
    description:
      'For those who make an entrance without trying. Deep woods, smoked leather, and the kind of warmth that lingers long after you\'ve left the room. This is fragrance as identity.',
    image: '/images/dumby/a68f5f45857a238528901e4fb1bcafb3.jpg',
    video: '/videos/vid.mp4',
    productSlugs: ['noir-vetiver', 'silk-oud', 'amber-accord'],
  },
  {
    slug: 'gold-bloom',
    name: 'Gold & Bloom',
    tagline: 'Soft. Golden. Magnetic.',
    description:
      'Femininity in its most refined form. Warm florals that bloom into golden skin musks, paired with jewellery that catches every light. For the woman who carries a room without raising her voice.',
    image: '/images/dumby/ba1111139ddf3a0564b231150f10227d.jpg',
    productSlugs: ['rose-cipher', 'cherry-blossom', 'ruby-pendant-necklace', 'crystal-drop-earrings'],
  },
  {
    slug: 'celestial-sparkle',
    name: 'Celestial Sparkle',
    tagline: 'Luminous. Sculptural. Worn.',
    description:
      'Jewellery that does the talking. Each piece in this edit is designed to be noticed — whether you\'re in a boardroom, at a wedding, or simply walking in. Gold, crystal, and intention.',
    image: '/images/dumby/b34d26882db166b55ae19b60c7593eef.jpg',
    productSlugs: ['diamond-hoop-earrings', 'crystal-drop-earrings', 'gold-pave-stud-set', 'ruby-pendant-necklace'],
  },
  {
    slug: 'fresh-slate',
    name: 'Fresh Slate',
    tagline: 'Clean. Alive. Everyday.',
    description:
      'Not every day calls for drama. Sometimes it calls for something crisp, clean, and quietly confident. The Fresh Slate edit is for mornings, for movement, for the person you are at your most natural.',
    image: '/images/dumby/4c11c0dde3924c0455c0f70958c89b24.jpg',
    productSlugs: ['aqua-breeze', 'cherry-blossom', 'gold-pave-stud-set'],
  },
]

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}
