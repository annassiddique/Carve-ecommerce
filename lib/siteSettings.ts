import { unstable_cache } from 'next/cache'
import { connectDB } from './mongodb'
import SiteSettingsModel, { DEFAULT_SITE_SETTINGS } from '@/models/SiteSettings'

export type SiteSettings = typeof DEFAULT_SITE_SETTINGS

async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    await connectDB()
    const doc = await SiteSettingsModel.findOne({ key: 'default' }).lean()
    if (!doc) return DEFAULT_SITE_SETTINGS
    const plain = JSON.parse(JSON.stringify(doc))
    // Merge with defaults so any missing fields fall back gracefully
    return {
      announcement: { ...DEFAULT_SITE_SETTINGS.announcement, ...plain.announcement },
      homepage: {
        slides:
          plain.homepage?.slides?.length > 0
            ? plain.homepage.slides
            : DEFAULT_SITE_SETTINGS.homepage.slides,
      },
      contact: { ...DEFAULT_SITE_SETTINGS.contact, ...plain.contact },
      about: { ...DEFAULT_SITE_SETTINGS.about, ...plain.about },
      payment: { ...DEFAULT_SITE_SETTINGS.payment, ...plain.payment },
    }
  } catch {
    return DEFAULT_SITE_SETTINGS
  }
}

export const getSiteSettings = unstable_cache(fetchSiteSettings, ['site-settings'], {
  tags: ['site-settings'],
  revalidate: 300,
})

export const getSiteSettingsFresh = fetchSiteSettings
