import mongoose, { Schema, Document } from 'mongoose'

export interface IHeroSlide {
  heading: string
  sub: string
  tagline: string
  ctaLabel: string
  ctaHref: string
  desktopImage: string
  mobileImage: string
}

export interface ISiteSettings extends Document {
  key: 'default'
  announcement: {
    enabled: boolean
    text: string
    bgColor: string
    textColor: string
    link: string
  }
  homepage: {
    slides: IHeroSlide[]
  }
  contact: {
    whatsappNumber: string
    whatsappDisplay: string
    email: string
    instagramHandle: string
    instagramUrl: string
    supportText: string
  }
  about: {
    storyParagraph1: string
    storyParagraph2: string
    closingTagline: string
    promiseHeadline: string
    promiseIntro: string
    closingStatement: string
    pillar1Title: string
    pillar1Description: string
    pillar2Title: string
    pillar2Description: string
    pillar3Title: string
    pillar3Description: string
  }
  payment: {
    easypaisaNumber: string
    easypaisaName: string
    freeShippingThreshold: number
  }
  updatedAt: Date
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    heading: { type: String, default: '' },
    sub: { type: String, default: '' },
    tagline: { type: String, default: '' },
    ctaLabel: { type: String, default: '' },
    ctaHref: { type: String, default: '/shop' },
    desktopImage: { type: String, default: '' },
    mobileImage: { type: String, default: '' },
  },
  { _id: false }
)

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, default: 'default', unique: true },
    announcement: {
      enabled: { type: Boolean, default: false },
      text: { type: String, default: '' },
      bgColor: { type: String, default: '#C8A96E' },
      textColor: { type: String, default: '#1A3D2B' },
      link: { type: String, default: '' },
    },
    homepage: {
      slides: { type: [HeroSlideSchema], default: [] },
    },
    contact: {
      whatsappNumber: { type: String, default: '923002278377' },
      whatsappDisplay: { type: String, default: '+92 300 227 8377' },
      email: { type: String, default: 'info@shopcarvepk.com' },
      instagramHandle: { type: String, default: '@wecarveit' },
      instagramUrl: { type: String, default: 'https://www.instagram.com/wecarveit' },
      supportText: { type: String, default: '' },
    },
    about: {
      storyParagraph1: { type: String, default: 'CARVE was created around a simple idea: the fragrance you wear and the jewellery you choose become part of how you express yourself and how you are remembered.' },
      storyParagraph2: { type: String, default: 'By bringing scent and adornment together in one refined space, CARVE makes everyday luxury feel more personal, intentional and within reach.' },
      closingTagline: { type: String, default: 'Carve your presence.' },
      promiseHeadline: { type: String, default: 'Luxury, Chosen With Intention' },
      promiseIntro: { type: String, default: 'At CARVE, we believe luxury should feel personal, polished and within reach. Every fragrance, jewellery piece and gift is curated with attention to quality, appearance and the experience it creates.' },
      closingStatement: { type: String, default: 'Thoughtful selection. Dependable quality. Premium presentation.\nThat is the CARVE Promise.' },
      pillar1Title: { type: String, default: 'Quality You Can Trust' },
      pillar1Description: { type: String, default: 'Our fragrances are chosen for their memorable scent profiles and impressive performance, while our jewellery is selected for its design, finish and ability to elevate a look. Every order is individually inspected before dispatch.' },
      pillar2Title: { type: String, default: 'Premium Presentation' },
      pillar2Description: { type: String, default: 'Each CARVE order is carefully prepared in premium, gift-ready packaging, making it just as special to receive as it is to wear.' },
      pillar3Title: { type: String, default: 'Attentive Service' },
      pillar3Description: { type: String, default: 'We are committed to clear product information, responsive support and a customer experience that feels simple, personal and dependable.' },
    },
    payment: {
      easypaisaNumber: { type: String, default: '' },
      easypaisaName: { type: String, default: 'CARVE' },
      freeShippingThreshold: { type: Number, default: 3000 },
    },
  },
  { timestamps: true }
)

export const DEFAULT_SITE_SETTINGS = {
  announcement: {
    enabled: false,
    text: '',
    bgColor: '#C8A96E',
    textColor: '#1A3D2B',
    link: '',
  },
  homepage: {
    slides: [
      {
        heading: 'Scent. Shine.\nPresence.',
        sub: 'Affordable luxury in scent and adornment.',
        tagline: 'ELEGANT · REFINED · MEMORABLE',
        ctaLabel: 'SHOP PERFUMES',
        ctaHref: '/shop/perfumes',
        desktopImage: '/images/new-banners/Resize%201.png',
        mobileImage: '/images/new-banners/Mobile%20new%20size%20final.png',
      },
      {
        heading: 'Timeless Scents.\nUnforgettable Impressions.',
        sub: 'A fragrance for every mood, every moment.',
        tagline: 'SCENT · SHINE · PRESENCE',
        ctaLabel: 'SHOP PERFUMES',
        ctaHref: '/shop/perfumes',
        desktopImage: '/images/new-banners/Resize%202.png',
        mobileImage: '/images/new-banners/Men%20Perfume%20Mobile.png',
      },
    ],
  },
  contact: {
    whatsappNumber: '923002278377',
    whatsappDisplay: '+92 300 227 8377',
    email: 'info@shopcarvepk.com',
    instagramHandle: '@wecarveit',
    instagramUrl: 'https://www.instagram.com/wecarveit',
    supportText: '',
  },
  about: {
    storyParagraph1: 'CARVE was created around a simple idea: the fragrance you wear and the jewellery you choose become part of how you express yourself and how you are remembered.',
    storyParagraph2: 'By bringing scent and adornment together in one refined space, CARVE makes everyday luxury feel more personal, intentional and within reach.',
    closingTagline: 'Carve your presence.',
    promiseHeadline: 'Luxury, Chosen With Intention',
    promiseIntro: 'At CARVE, we believe luxury should feel personal, polished and within reach. Every fragrance, jewellery piece and gift is curated with attention to quality, appearance and the experience it creates.',
    closingStatement: 'Thoughtful selection. Dependable quality. Premium presentation.\nThat is the CARVE Promise.',
    pillar1Title: 'Quality You Can Trust',
    pillar1Description: 'Our fragrances are chosen for their memorable scent profiles and impressive performance, while our jewellery is selected for its design, finish and ability to elevate a look. Every order is individually inspected before dispatch.',
    pillar2Title: 'Premium Presentation',
    pillar2Description: 'Each CARVE order is carefully prepared in premium, gift-ready packaging, making it just as special to receive as it is to wear.',
    pillar3Title: 'Attentive Service',
    pillar3Description: 'We are committed to clear product information, responsive support and a customer experience that feels simple, personal and dependable.',
  },
  payment: {
    easypaisaNumber: process.env.NEXT_PUBLIC_EASYPAISA_ACCOUNT || '',
    easypaisaName: 'CARVE',
    freeShippingThreshold: 3000,
  },
}

export default mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)
