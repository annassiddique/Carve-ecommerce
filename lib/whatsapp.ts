export async function sendWhatsAppNotification(params: {
  orderNumber: string
  customerName: string
  total: number
  paymentMethod: string
  city: string
}) {
  const phone = process.env.WHATSAPP_NOTIFY_NUMBER
  const apiKey = process.env.CALLMEBOT_API_KEY
  if (!phone || !apiKey) return

  const method = params.paymentMethod === 'easypaisa' ? 'EasyPaisa' : 'Cash on Delivery'
  const msg = encodeURIComponent(
    `New Order Received!\n` +
    `Order: ${params.orderNumber}\n` +
    `Customer: ${params.customerName}\n` +
    `City: ${params.city}\n` +
    `Total: Rs ${params.total.toLocaleString()}\n` +
    `Payment: ${method}`
  )

  try {
    await fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${msg}&apikey=${apiKey}`)
  } catch (err) {
    console.error('[WhatsApp notify]', err)
  }
}
