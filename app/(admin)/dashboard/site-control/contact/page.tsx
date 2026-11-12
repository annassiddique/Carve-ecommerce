export const dynamic = 'force-dynamic'

import { getSiteSettingsFresh } from '@/lib/siteSettings'
import ContactForm from '@/components/admin/site-control/ContactForm'

export default async function ContactPage() {
  const settings = await getSiteSettingsFresh()

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl text-carve-charcoal">Contact Information</h2>
        <p className="font-body text-xs text-carve-mink mt-1">
          Update the WhatsApp number, email, and Instagram details shown on the Contact page
          and used across checkout.
        </p>
      </div>
      <ContactForm initial={settings.contact} />
    </div>
  )
}
