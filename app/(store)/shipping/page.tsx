import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping & Returns | CARVE',
  description:
    'Shipping information, delivery times, order changes, returns and exchange policy for CARVE orders across Pakistan.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-2xl text-carve-charcoal mb-4">{title}</h2>
      <div className="h-px bg-carve-gold/25 mb-6" />
      <div className="font-body text-sm leading-relaxed text-carve-charcoal/65 space-y-3">
        {children}
      </div>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-4">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-carve-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ShippingPage() {
  return (
    <main className="bg-carve-ivory">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-carve-forest">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-5">
            Policies
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-carve-champagne mb-6">
            Shipping &amp; Returns
          </h1>
          <div className="mx-auto h-px w-14 bg-carve-gold/40" />
          <p className="mt-8 font-body text-sm leading-relaxed text-carve-champagne/60 max-w-xl mx-auto">
            We want every CARVE order to reach you safely, beautifully presented and exactly as
            expected. Please review the information below before placing your order.
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">

        <Section title="Shipping Across Pakistan">
          <p>CARVE delivers to serviceable locations across Pakistan.</p>
          <p>
            Shipping charges, where applicable, will be displayed at checkout before your order is
            confirmed. Any complimentary-shipping offer will be subject to the conditions shown on
            the website at the time of purchase.
          </p>
        </Section>

        <Section title="Delivery Time">
          <p>
            Orders are usually delivered within 3 to 7 working days after confirmation. Delivery to
            remote locations may take longer.
          </p>
          <p>
            Delivery times are estimates and may be affected by public holidays, weather, courier
            operations or circumstances beyond our control.
          </p>
        </Section>

        <Section title="Order Confirmation">
          <p>
            Please provide a complete delivery address and an active phone number when placing your
            order.
          </p>
          <p>
            CARVE may contact you to confirm your order before dispatch. Orders may be delayed or
            cancelled if we are unable to verify the information provided.
          </p>
        </Section>

        <Section title="Changes and Cancellations">
          <p>Contact us as soon as possible if you need to change or cancel an order.</p>
          <p>
            Changes or cancellations can only be accommodated before the order has been processed or
            dispatched. Once an order has been handed over to the courier, it cannot be cancelled.
          </p>
        </Section>

        <Section title="Damaged, Defective or Incorrect Orders">
          <p>
            Please inspect your order immediately after delivery. We strongly recommend recording a
            clear, continuous unboxing video from the moment you begin opening the sealed parcel.
          </p>
          <p>
            If your order arrives damaged, defective or incorrect, contact CARVE within 24 hours of
            delivery and provide:
          </p>
          <BulletList
            items={[
              'Your order number',
              'The complete unboxing video',
              'Clear photographs of the product and packaging',
            ]}
          />
          <p>
            Please keep the product and all original packaging until the claim has been reviewed.
          </p>
          <p>
            Once the issue has been verified, CARVE will arrange a replacement, exchange or refund,
            depending on the circumstances and product availability.
          </p>
          <p className="text-carve-charcoal/45 text-xs">
            Claims submitted after 24 hours or without sufficient evidence may not be accepted.
          </p>
        </Section>

        <Section title="Jewellery Exchanges">
          <p>
            Jewellery may be eligible for a one-time exchange within 3 days of delivery, provided
            that it is:
          </p>
          <BulletList
            items={[
              'Unworn and unused',
              'In its original condition',
              'Returned with its original packaging',
              'Free from perfume, marks, scratches or damage',
            ]}
          />
          <p>
            The customer will be responsible for return and redelivery charges where the product
            delivered was correct and free from defects.
          </p>
          <p>
            For hygiene reasons, earrings cannot be returned or exchanged unless they arrive
            damaged, defective or incorrect.
          </p>
        </Section>

        <Section title="Perfume Returns and Exchanges">
          <p>
            Perfumes cannot be returned or exchanged once opened, sprayed or removed from their
            original sealed condition.
          </p>
          <p>
            A perfume will only be eligible for replacement, exchange or refund if it arrives
            damaged, leaking, defective or different from the product ordered.
          </p>
          <p>
            Personal fragrance preference, projection or longevity on an individual's skin will not
            qualify as a product defect, as fragrance performance may vary according to skin type,
            weather, application and storage.
          </p>
        </Section>

        <Section title="Items Not Eligible for Return or Exchange">
          <p>Returns or exchanges will not be accepted for:</p>
          <BulletList
            items={[
              'Products damaged through use or improper care',
              'Opened or used perfumes',
              'Worn jewellery',
              'Earrings, except where faulty or incorrect',
              'Sale or clearance items',
              'Gift cards',
              'Customised or personalised orders',
              'Products returned without their original packaging',
            ]}
          />
        </Section>

        <Section title="Return Approval">
          <p>
            Please do not send a product back without first contacting CARVE and receiving return
            instructions.
          </p>
          <p>
            Unauthorised returns may not be accepted. Returned products will be inspected before an
            exchange or refund is approved.
          </p>
        </Section>

        <Section title="Refunds">
          <p>
            Where a refund is approved, it will be processed within 7 to 10 working days after the
            returned product has been received and inspected.
          </p>
          <p>
            Original delivery charges and return shipping costs are non-refundable unless the order
            was damaged, defective or incorrect.
          </p>
        </Section>

      </div>
    </main>
  )
}
