export const dynamic = 'force-dynamic'

import { getSiteSettingsFresh } from '@/lib/siteSettings'
import AnnouncementForm from '@/components/admin/site-control/AnnouncementForm'

export default async function AnnouncementPage() {
  const settings = await getSiteSettingsFresh()

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl text-carve-charcoal">Announcement Bar</h2>
        <p className="font-body text-xs text-carve-mink mt-1">
          A small banner that appears above the navigation bar across the whole site.
          Perfect for promotions, free shipping notices, or seasonal offers.
        </p>
      </div>
      <AnnouncementForm initial={settings.announcement} />
    </div>
  )
}
