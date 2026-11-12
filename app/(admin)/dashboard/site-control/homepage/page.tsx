export const dynamic = 'force-dynamic'

import { getSiteSettingsFresh } from '@/lib/siteSettings'
import HomepageForm from '@/components/admin/site-control/HomepageForm'

export default async function HomepagePage() {
  const settings = await getSiteSettingsFresh()

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl text-carve-charcoal">Homepage Banners</h2>
        <p className="font-body text-xs text-carve-mink mt-1">
          Edit the two hero slides shown in the homepage carousel. You can change the text,
          buttons, and upload new images for both desktop and mobile.
        </p>
      </div>
      <HomepageForm initial={settings.homepage} />
    </div>
  )
}
