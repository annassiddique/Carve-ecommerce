import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = `CARVE <${process.env.EMAIL_FROM}>`

interface OrderItem {
  name: string
  price: number
  quantity: number
}

interface Customer {
  name: string
  email: string
  phone: string
  address: string
  city: string
}

interface OrderEmailData {
  orderNumber: string
  customer: Customer
  items: OrderItem[]
  subtotal: number
  shippingFee: number
  total: number
  paymentMethod: 'cod' | 'easypaisa'
  screenshotUrl?: string
}

function formatPrice(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

function itemsTable(items: OrderItem[]) {
  return items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e8dfd4;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#4a3728;">${item.name}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e8dfd4;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#4a3728;text-align:center;">${item.quantity}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e8dfd4;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#4a3728;text-align:right;">${formatPrice(item.price * item.quantity)}</td>
      </tr>`
    )
    .join('')
}

function customerConfirmationHtml(data: OrderEmailData): string {
  const paymentNote =
    data.paymentMethod === 'cod'
      ? '<p style="margin:0;color:#8b7355;">Payment will be collected upon delivery.</p>'
      : '<p style="margin:0;color:#8b7355;">Your EasyPaisa screenshot has been received. We will verify and confirm your payment shortly.</p>'

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Order Confirmed</title></head>
<body style="margin:0;padding:0;background:#f5f0eb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:580px;">

        <!-- Header -->
        <tr>
          <td style="background:#1a2e1a;padding:36px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:#b89956;">Carve Your Presence</p>
            <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:300;color:#e8dfd4;letter-spacing:0.05em;">CARVE</h1>
          </td>
        </tr>

        <!-- Gold accent line -->
        <tr><td style="height:3px;background:linear-gradient(90deg,#1a2e1a,#b89956,#1a2e1a);"></td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#b89956;">Order Confirmed</p>
            <h2 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#1a2e1a;">Thank you, ${data.customer.name}.</h2>
            <p style="margin:0 0 24px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.7;color:#8b7355;">
              Your order has been received and is being processed. We&rsquo;ll be in touch soon.
            </p>

            <!-- Order number box -->
            <div style="background:#f5f0eb;border-left:3px solid #b89956;padding:16px 20px;margin-bottom:32px;">
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8b7355;">Order Number</p>
              <p style="margin:4px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#1a2e1a;font-weight:400;">${data.orderNumber}</p>
            </div>

            <!-- Items table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <thead>
                <tr style="background:#f5f0eb;">
                  <th style="padding:10px 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8b7355;text-align:left;font-weight:500;">Item</th>
                  <th style="padding:10px 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8b7355;text-align:center;font-weight:500;">Qty</th>
                  <th style="padding:10px 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8b7355;text-align:right;font-weight:500;">Price</th>
                </tr>
              </thead>
              <tbody>${itemsTable(data.items)}</tbody>
            </table>

            <!-- Totals -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;">Subtotal</td>
                <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;text-align:right;">${formatPrice(data.subtotal)}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;">Shipping</td>
                <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;text-align:right;">${data.shippingFee === 0 ? 'Free' : formatPrice(data.shippingFee)}</td>
              </tr>
              <tr style="border-top:1px solid #e8dfd4;">
                <td style="padding:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#1a2e1a;">Total</td>
                <td style="padding:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#1a2e1a;text-align:right;">${formatPrice(data.total)}</td>
              </tr>
            </table>

            <!-- Payment note -->
            <div style="background:#f5f0eb;padding:16px 20px;margin-bottom:32px;border-radius:2px;">
              <p style="margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b89956;">Payment · ${data.paymentMethod === 'cod' ? 'Cash on Delivery' : 'EasyPaisa'}</p>
              ${paymentNote}
            </div>

            <!-- Delivery address -->
            <div style="margin-bottom:32px;">
              <p style="margin:0 0 8px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b89956;">Delivery Address</p>
              <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:1.7;color:#4a3728;">
                ${data.customer.address}<br/>${data.customer.city}<br/>${data.customer.phone}
              </p>
            </div>

            <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:1.7;color:#8b7355;">
              Questions? Reply to this email or reach us on WhatsApp.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a2e1a;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b89956;">CARVE · Affordable Luxury · Pakistan</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function adminNotificationHtml(data: OrderEmailData): string {
  const paymentRow =
    data.paymentMethod === 'easypaisa' && data.screenshotUrl
      ? `<tr><td style="padding:8px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;vertical-align:top;">Screenshot</td><td style="padding:8px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#1a2e1a;"><a href="${data.screenshotUrl}" style="color:#b89956;">View Screenshot</a></td></tr>`
      : ''

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>New Order</title></head>
<body style="margin:0;padding:0;background:#f5f0eb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:580px;">

        <!-- Header -->
        <tr>
          <td style="background:#1a2e1a;padding:28px 40px;">
            <p style="margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#b89956;">CARVE Admin</p>
            <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:300;color:#e8dfd4;">New Order Received</h1>
          </td>
        </tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,#1a2e1a,#b89956,#1a2e1a);"></td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">

            <!-- Order + amount highlight -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;border-left:3px solid #b89956;padding:0;margin-bottom:28px;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 2px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8b7355;">Order</p>
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#1a2e1a;">${data.orderNumber}</p>
                </td>
                <td style="padding:16px 20px;text-align:right;">
                  <p style="margin:0 0 2px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8b7355;">Total</p>
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#1a2e1a;">${formatPrice(data.total)}</p>
                </td>
              </tr>
            </table>

            <!-- Customer details -->
            <p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b89956;">Customer</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;width:110px;">Name</td><td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#1a2e1a;">${data.customer.name}</td></tr>
              <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;">Email</td><td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#1a2e1a;"><a href="mailto:${data.customer.email}" style="color:#b89956;">${data.customer.email}</a></td></tr>
              <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;">Phone</td><td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#1a2e1a;">${data.customer.phone}</td></tr>
              <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;vertical-align:top;">Address</td><td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#1a2e1a;">${data.customer.address}, ${data.customer.city}</td></tr>
            </table>

            <!-- Payment -->
            <p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b89956;">Payment</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;width:110px;">Method</td><td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#1a2e1a;">${data.paymentMethod === 'cod' ? 'Cash on Delivery' : 'EasyPaisa'}</td></tr>
              ${paymentRow}
            </table>

            <!-- Items -->
            <p style="margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b89956;">Items</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <thead>
                <tr style="background:#f5f0eb;">
                  <th style="padding:8px 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8b7355;text-align:left;font-weight:500;">Item</th>
                  <th style="padding:8px 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8b7355;text-align:center;font-weight:500;">Qty</th>
                  <th style="padding:8px 12px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8b7355;text-align:right;font-weight:500;">Price</th>
                </tr>
              </thead>
              <tbody>${itemsTable(data.items)}</tbody>
            </table>

            <!-- Totals -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;">Subtotal</td>
                <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;text-align:right;">${formatPrice(data.subtotal)}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;">Shipping</td>
                <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b7355;text-align:right;">${data.shippingFee === 0 ? 'Free' : formatPrice(data.shippingFee)}</td>
              </tr>
              <tr style="border-top:1px solid #e8dfd4;">
                <td style="padding:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#1a2e1a;font-weight:400;">Total</td>
                <td style="padding:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#1a2e1a;text-align:right;">${formatPrice(data.total)}</td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a2e1a;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b89956;">CARVE Admin Notification</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ─── Status update email (customer only) ─────────────────────────────────────

interface StatusEmailData {
  orderNumber: string
  customerName: string
  customerEmail: string
  total: number
  orderStatus?: string
  paymentStatus?: string
  paymentMethod?: 'cod' | 'easypaisa'
}

const STATUS_COPY: Record<string, { subject: string; heading: string; body: string; emoji: string }> = {
  confirmed: {
    emoji: '✓',
    subject: 'Order Confirmed',
    heading: 'Your order is confirmed.',
    body: 'Great news — your order has been confirmed and our team is preparing it for dispatch. You\'ll hear from us again once it\'s on its way.',
  },
  processing: {
    emoji: '📦',
    subject: 'Order Being Packed',
    heading: 'We\'re packing your order.',
    body: 'Your order is currently being packed with care. We\'ll notify you as soon as it\'s handed over to the courier.',
  },
  shipped: {
    emoji: '🚚',
    subject: 'Order Shipped',
    heading: 'Your order is on its way.',
    body: 'Your CARVE order has been dispatched and is on its way to you. Expect delivery within 2–4 working days depending on your location.',
  },
  delivered: {
    emoji: '🎁',
    subject: 'Order Delivered',
    heading: 'Your order has been delivered.',
    body: 'We hope you love what you\'ve chosen. If you have any questions or concerns, please don\'t hesitate to reach out. Thank you for choosing CARVE.',
  },
  cancelled: {
    emoji: '✕',
    subject: 'Order Cancelled',
    heading: 'Your order has been cancelled.',
    body: 'Your order has been cancelled. If you believe this is a mistake or have any questions, please contact us immediately and we\'ll be happy to help.',
  },
  payment_approved: {
    emoji: '✓',
    subject: 'Payment Verified',
    heading: 'Payment verified.',
    body: 'Your EasyPaisa payment has been verified and your order is now confirmed. We\'ll get it packed and on its way shortly.',
  },
  payment_rejected: {
    emoji: '✕',
    subject: 'Payment Could Not Be Verified',
    heading: 'We couldn\'t verify your payment.',
    body: 'Unfortunately we were unable to verify your EasyPaisa payment. Please contact us on WhatsApp with your payment screenshot and order number and we\'ll resolve this as quickly as possible.',
  },
}

function statusUpdateHtml(data: StatusEmailData, key: string): string {
  const copy = STATUS_COPY[key]
  if (!copy) return ''

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${copy.subject}</title></head>
<body style="margin:0;padding:0;background:#f5f0eb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:560px;">

        <!-- Header -->
        <tr>
          <td style="background:#1a2e1a;padding:32px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:#b89956;">Carve Your Presence</p>
            <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:300;color:#e8dfd4;letter-spacing:0.05em;">CARVE</h1>
          </td>
        </tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,#1a2e1a,#b89956,#1a2e1a);"></td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">

            <!-- Status badge -->
            <div style="text-align:center;margin-bottom:32px;">
              <div style="display:inline-block;background:#f5f0eb;border:1px solid #e8dfd4;border-radius:50%;width:56px;height:56px;line-height:56px;font-size:22px;text-align:center;">
                ${copy.emoji}
              </div>
            </div>

            <p style="margin:0 0 6px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#b89956;text-align:center;">${copy.subject}</p>
            <h2 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#1a2e1a;text-align:center;">${copy.heading}</h2>

            <p style="margin:0 0 28px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.75;color:#8b7355;">
              Hi ${data.customerName},<br/><br/>
              ${copy.body}
            </p>

            <!-- Order ref box -->
            <div style="background:#f5f0eb;border-left:3px solid #b89956;padding:14px 20px;margin-bottom:32px;">
              <p style="margin:0 0 2px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8b7355;">Order Reference</p>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;color:#1a2e1a;">${data.orderNumber} &nbsp;·&nbsp; ${formatPrice(data.total)}</p>
            </div>

            <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:1.7;color:#8b7355;">
              Questions? Reply to this email or reach us on WhatsApp.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a2e1a;padding:22px 40px;text-align:center;">
            <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#b89956;">CARVE · Affordable Luxury · Pakistan</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendStatusEmail(data: StatusEmailData) {
  const key = data.paymentStatus === 'approved'
    ? 'payment_approved'
    : data.paymentStatus === 'rejected'
    ? 'payment_rejected'
    : data.orderStatus ?? ''

  const copy = STATUS_COPY[key]
  if (!copy) return // no email for statuses we don't cover (e.g. 'pending')

  const html = statusUpdateHtml(data, key)
  if (!html) return

  try {
    await resend.emails.send({
      from: FROM,
      to: data.customerEmail,
      subject: `${copy.subject} · ${data.orderNumber} · CARVE`,
      html,
    })
  } catch (err) {
    console.error('[email] status update email failed:', err)
  }
}

export async function sendOrderEmails(data: OrderEmailData) {
  const [customerResult, adminResult] = await Promise.allSettled([
    // Confirmation to customer
    resend.emails.send({
      from: FROM,
      replyTo: process.env.ADMIN_NOTIFICATION_EMAIL!,
      to: data.customer.email,
      subject: `Your CARVE order is confirmed — ${data.orderNumber}`,
      html: customerConfirmationHtml(data),
    }),
    // Notification to admin
    resend.emails.send({
      from: FROM,
      to: process.env.ADMIN_NOTIFICATION_EMAIL!,
      subject: `New Order · ${data.orderNumber} · ${formatPrice(data.total)}`,
      html: adminNotificationHtml(data),
    }),
  ])

  if (customerResult.status === 'rejected') {
    console.error('[email] customer confirmation failed:', customerResult.reason)
  }
  if (adminResult.status === 'rejected') {
    console.error('[email] admin notification failed:', adminResult.reason)
  }
}
