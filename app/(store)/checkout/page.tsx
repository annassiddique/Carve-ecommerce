import { getSiteSettings } from '@/lib/siteSettings'
import CheckoutClient from './CheckoutClient'

export default async function CheckoutPage() {
  const settings = await getSiteSettings()

  return (
    <CheckoutClient
      contact={settings.contact}
      payment={settings.payment}
    />
  )
}
