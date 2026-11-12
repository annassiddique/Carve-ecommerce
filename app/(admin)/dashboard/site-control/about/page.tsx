export const dynamic = 'force-dynamic'

import { getSiteSettingsFresh } from '@/lib/siteSettings'
import AboutForm from '@/components/admin/site-control/AboutForm'

export default async function AboutPage() {
  const settings = await getSiteSettingsFresh()

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl text-carve-charcoal">About Page</h2>
        <p className="font-body text-xs text-carve-mink mt-1">
          Edit the brand story, the CARVE Promise headline and the three promise pillars
          shown on the About page.
        </p>
      </div>
      <AboutForm initial={settings.about} />
    </div>
  )
}
