export const dynamic = 'force-dynamic'

import { getSiteSettingsFresh } from '@/lib/siteSettings'
import PaymentForm from '@/components/admin/site-control/PaymentForm'

export default async function PaymentPage() {
  const settings = await getSiteSettingsFresh()

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl text-carve-charcoal">Payment & Shipping</h2>
        <p className="font-body text-xs text-carve-mink mt-1">
          Update the EasyPaisa account details shown at checkout, and set the
          free shipping threshold.
        </p>
      </div>
      <PaymentForm initial={settings.payment} />
    </div>
  )
}
