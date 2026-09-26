import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | CARVE',
  description:
    'Terms and conditions that apply when you visit shopcarvepk.com, place an order or purchase a CARVE product.',
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

export default function TermsPage() {
  return (
    <main className="bg-carve-ivory">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-carve-forest">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-5">
            Legal
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-carve-champagne mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="mx-auto h-px w-14 bg-carve-gold/40 mb-6" />
          <p className="font-body text-xs text-carve-champagne/45">
            Effective Date: 1st August 2026
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">

        <p className="font-body text-sm leading-relaxed text-carve-charcoal/65 mb-14">
          Welcome to CARVE. These Terms &amp; Conditions apply when you visit shopcarvepk.com, place
          an order or purchase a CARVE product. By using the website or submitting an order, you
          agree to these Terms &amp; Conditions, together with our Privacy Policy, Shipping &amp;
          Returns Policy and Jewellery Care Guide.
        </p>

        <Section title="Eligibility">
          <p>
            Orders should be placed by an adult or with the permission and involvement of a parent
            or legal guardian.
          </p>
          <p>
            By placing an order, you confirm that the information you provide is accurate and that
            you are authorised to use the delivery and contact details submitted.
          </p>
        </Section>

        <Section title="Products">
          <p>
            CARVE aims to present product photographs, descriptions, colours, sizes and other
            details as accurately as reasonably possible.
          </p>
          <p>However, slight differences may occur because of:</p>
          <BulletList
            items={[
              'Photography and lighting',
              'Screen and device settings',
              'Manufacturing variations',
              'Differences in product batches',
              'The individual appearance and finish of fashion jewellery',
            ]}
          />
          <p>These minor variations will not necessarily be considered defects.</p>
          <p>
            CARVE jewellery is fashion jewellery unless expressly stated otherwise on the relevant
            product page.
          </p>
          <p>
            CARVE fragrances are independent fragrance impressions inspired by popular scent
            profiles. They are not original designer perfumes, and CARVE is not affiliated with,
            endorsed by or connected to the original designer brands.
          </p>
          <p>
            Fragrance projection and longevity may vary depending on skin type, weather, application
            and storage.
          </p>
        </Section>

        <Section title="Product Availability">
          <p>All products are subject to availability.</p>
          <p>
            Adding an item to your cart or submitting an order does not guarantee that the item is
            reserved or available. Where a product becomes unavailable, CARVE may cancel the
            relevant item or order and will inform you using the contact details provided.
          </p>
        </Section>

        <Section title="Orders and Acceptance">
          <p>
            After submitting an order, you may receive an acknowledgement or confirmation through
            the website, WhatsApp, telephone, email or another available contact method.
          </p>
          <p>
            An automated order acknowledgement does not necessarily mean that the order has been
            accepted.
          </p>
          <p>
            CARVE may verify an order before dispatch. An order is considered accepted once it has
            been confirmed for processing or handed over for delivery.
          </p>
          <p>
            CARVE may refuse or cancel an order where reasonably necessary, including where:
          </p>
          <BulletList
            items={[
              'A product is unavailable',
              'Product or pricing information contains an obvious error',
              'Customer details are incomplete or inaccurate',
              'We are unable to contact or verify the customer',
              'Fraudulent or unauthorised activity is suspected',
              'The delivery location is not serviceable',
              'A customer has repeatedly refused confirmed Cash on Delivery orders',
              'Circumstances outside our reasonable control prevent fulfilment',
            ]}
          />
          <p>
            Where reasonably possible, the customer will be informed if an order is cancelled.
          </p>
        </Section>

        <Section title="Pricing">
          <p>All prices are displayed in Pakistani Rupees unless stated otherwise.</p>
          <p>
            Applicable delivery charges will be shown during checkout or communicated before order
            confirmation.
          </p>
          <p>
            CARVE may update product prices at any time. Price changes will apply to future orders
            and will not normally affect an order that has already been accepted, except where there
            is an obvious pricing or technical error.
          </p>
        </Section>

        <Section title="Cash on Delivery">
          <p>CARVE currently accepts payment through Cash on Delivery.</p>
          <p>
            The full amount due, including any applicable delivery charges, must be paid to the
            authorised courier representative when the parcel is delivered.
          </p>
          <p>
            Customers should not transfer money to an unofficial account or provide card details,
            passwords, PINs or verification codes to anyone claiming to represent CARVE.
          </p>
        </Section>

        <Section title="Delivery Information">
          <p>Customers are responsible for providing:</p>
          <BulletList
            items={[
              'A complete and accurate delivery address',
              'An active phone number',
              'Any directions reasonably required for delivery',
              'A recipient who is available to receive and pay for the parcel',
            ]}
          />
          <p>
            CARVE will not be responsible for delays or failed delivery caused by incomplete or
            incorrect information provided by the customer.
          </p>
          <p>
            Additional delivery charges may apply where a parcel must be sent again because the
            customer was unavailable, refused a confirmed order or provided incorrect delivery
            information.
          </p>
        </Section>

        <Section title="Shipping">
          <p>
            CARVE uses third-party courier services to deliver orders and collect Cash on Delivery
            payments.
          </p>
          <p>
            Estimated delivery periods are provided for guidance and are not guaranteed. Delays may
            occur because of courier operations, weather, public holidays, remote locations,
            security conditions or other circumstances outside CARVE's reasonable control.
          </p>
          <p>
            CARVE will provide reasonable assistance with genuine delivery concerns but does not
            control the courier's daily operations.
          </p>
        </Section>

        <Section title="Damaged, Defective or Incorrect Orders">
          <p>Customers should inspect their parcels promptly after delivery.</p>
          <p>
            We strongly recommend recording a clear and continuous unboxing video beginning before
            the sealed parcel is opened.
          </p>
          <p>
            Any damaged, defective or incorrect order must be reported in accordance with the
            timeframes and evidence requirements stated in our Shipping &amp; Returns Policy.
          </p>
          <p>
            Customers should keep the product, parcel and original packaging until the claim has
            been reviewed.
          </p>
        </Section>

        <Section title="Returns and Exchanges">
          <p>
            Returns, exchanges and refunds are governed by the CARVE Shipping &amp; Returns Policy.
          </p>
          <p>
            Products must not be returned without first contacting CARVE and receiving return
            instructions.
          </p>
          <p>
            Eligibility may depend on the product category, condition, hygiene considerations,
            original packaging and reason for return.
          </p>
          <p>
            Nothing in these Terms &amp; Conditions limits any rights that cannot lawfully be
            excluded under applicable consumer-protection law.
          </p>
        </Section>

        <Section title="Jewellery Care">
          <p>CARVE jewellery requires appropriate care to maintain its appearance.</p>
          <p>
            Exposure to water, perfume, lotion, sanitiser, chemicals, sweat, humidity or improper
            storage may affect the finish over time.
          </p>
          <p>
            Natural changes resulting from wear, environmental exposure or failure to follow the
            Jewellery Care Guide will not ordinarily be treated as manufacturing defects.
          </p>
          <p>
            Customers should review the Jewellery Care Guide before wearing or storing their
            jewellery.
          </p>
        </Section>

        <Section title="Fragrance Use and Storage">
          <p>
            Perfumes should be stored upright in a cool and dry place, away from direct sunlight,
            excessive heat and humidity.
          </p>
          <p>
            Fragrance preference, projection or longevity on an individual's skin will not normally
            qualify as a product defect.
          </p>
          <p>
            Perfumes that have been opened or used are subject to the restrictions stated in the
            Shipping &amp; Returns Policy.
          </p>
        </Section>

        <Section title="Website Information">
          <p>
            CARVE aims to keep website information accurate and updated. However, we do not
            guarantee that the website will always be uninterrupted, error-free or available.
          </p>
          <p>
            We may correct errors, update content, remove products or temporarily restrict website
            access where reasonably necessary.
          </p>
        </Section>

        <Section title="Intellectual Property">
          <p>
            The CARVE name, logo, branding, website design, original photographs, graphics and
            written website content are owned by or licensed to CARVE.
          </p>
          <p>
            They may not be copied, reproduced, republished, altered, distributed or commercially
            used without prior written permission.
          </p>
          <p>
            This clause does not claim ownership of third-party trademarks, fragrance names,
            references or product designs belonging to their respective owners.
          </p>
        </Section>

        <Section title="Acceptable Website Use">
          <p>You must not:</p>
          <BulletList
            items={[
              'Use the website for unlawful or fraudulent purposes',
              'Attempt unauthorised access to the website or its systems',
              'Introduce viruses or harmful software',
              'Interfere with website functionality or security',
              "Submit false orders or another person's information without permission",
              'Copy or commercially exploit CARVE website content without authorisation',
            ]}
          />
          <p>
            CARVE may restrict access or cancel orders associated with misuse, fraud or unlawful
            activity.
          </p>
        </Section>

        <Section title="Limitation of Liability">
          <p>
            Nothing in these Terms &amp; Conditions excludes or limits any liability or consumer
            right that cannot legally be excluded.
          </p>
          <p>
            To the extent permitted by applicable law, CARVE will not be responsible for indirect,
            incidental or business-related losses arising from the use of the website or purchase of
            products.
          </p>
          <p>
            Where CARVE is found liable in connection with a particular order, its liability will
            ordinarily be limited to the amount paid for the affected product, except where
            applicable law requires otherwise.
          </p>
        </Section>

        <Section title="Events Outside Our Control">
          <p>
            CARVE will not be responsible for a delay or failure caused by circumstances outside
            its reasonable control, including courier disruption, severe weather, natural disasters,
            strikes, public restrictions, technical outages or security conditions.
          </p>
          <p>
            CARVE will take reasonable steps to communicate significant delays where possible.
          </p>
        </Section>

        <Section title="Privacy">
          <p>
            Our collection and use of personal information are governed by the CARVE Privacy
            Policy.
          </p>
          <p>
            By submitting an order, you acknowledge that necessary information may be shared with
            third-party courier and service providers for order processing and delivery.
          </p>
        </Section>

        <Section title="Governing Law">
          <p>
            These Terms &amp; Conditions are governed by the applicable laws of Pakistan, including
            any applicable provincial consumer-protection requirements.
          </p>
          <p>Any dispute will be handled by a court or authority with lawful jurisdiction.</p>
        </Section>

        <Section title="Severability">
          <p>
            If any part of these Terms &amp; Conditions is found to be invalid or unenforceable,
            the remaining sections will continue to apply.
          </p>
        </Section>

        <Section title="Changes to These Terms">
          <p>
            CARVE may update these Terms &amp; Conditions when its products, website, payment
            methods, courier arrangements or business practices change.
          </p>
          <p>
            Updates will be published on this page with a revised effective date. Revised terms
            will apply to future website use and orders placed after publication.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>For questions regarding these Terms &amp; Conditions, contact:</p>
          <div className="bg-white rounded-2xl border border-carve-gold/10 p-6 space-y-2">
            <p className="font-display text-lg text-carve-charcoal">CARVE</p>
            <p>Email: <a href="mailto:info@shopcarvepk.com" className="text-carve-gold hover:underline">info@shopcarvepk.com</a></p>
            <p>Website: <span className="text-carve-charcoal/80">www.shopcarvepk.com</span></p>
            <p>Instagram: <span className="text-carve-charcoal/80">@wecarveit</span></p>
            <p>WhatsApp: <a href="https://wa.me/923002278377" className="text-carve-gold hover:underline">+923002278377</a></p>
          </div>
        </Section>

      </div>
    </main>
  )
}
