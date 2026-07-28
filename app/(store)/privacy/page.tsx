import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | CARVE',
  description:
    'Learn how CARVE collects, uses, shares and protects your personal information.',
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

export default function PrivacyPage() {
  return (
    <main className="bg-carve-ivory">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-carve-forest">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-5">
            Legal
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-carve-champagne mb-4">
            Privacy Policy
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
          At CARVE, we value your privacy and are committed to handling your personal information
          responsibly. This Privacy Policy explains how we collect, use, share and protect
          information when you visit www.shopcarvepk.com, place an order or contact us.
        </p>

        <Section title="Information We Collect">
          <p>We may collect information you provide directly to us, including:</p>
          <BulletList
            items={[
              'Your name',
              'Phone number',
              'Email address, where provided',
              'Delivery address',
              'Order details and purchase history',
              'Messages, enquiries and customer-support correspondence',
              'Information provided in connection with a return, exchange, complaint or damaged-order claim',
            ]}
          />
          <p>
            Our website may also automatically receive limited technical information, such as your
            IP address, browser type, device information and basic website activity.
          </p>
        </Section>

        <Section title="How We Use Your Information">
          <p>We may use your information to:</p>
          <BulletList
            items={[
              'Receive, confirm and process your order',
              'Verify your contact and delivery details',
              'Arrange Cash on Delivery',
              'Dispatch and deliver your parcel',
              'Contact you regarding your order or delivery',
              'Respond to enquiries and customer-support requests',
              'Process returns, exchanges, complaints or damaged-order claims',
              'Prevent fraudulent, false or unauthorised orders',
              'Maintain necessary sales and business records',
              'Improve our website, products and customer experience',
              'Send promotional communication where you have agreed to receive it',
            ]}
          />
          <p>You may ask us to stop sending promotional communication at any time.</p>
        </Section>

        <Section title="Cash on Delivery">
          <p>CARVE currently accepts payment through Cash on Delivery.</p>
          <p>
            We do not request, collect or store debit-card or credit-card information through our
            website. The amount payable for your order is collected at the time of delivery.
          </p>
        </Section>

        <Section title="Delivery Through Third-Party Courier Services">
          <p>
            CARVE uses third-party courier services to deliver orders and collect Cash on Delivery
            payments.
          </p>
          <p>
            To fulfil your order, we may share information reasonably required for delivery,
            including:
          </p>
          <BulletList
            items={[
              'Your name',
              'Phone number',
              'Delivery address',
              'Order reference',
              'Parcel details',
              'Cash on Delivery amount',
            ]}
          />
          <p>
            The courier service may contact you to confirm your address, coordinate delivery or
            provide parcel updates.
          </p>
          <p>
            Information processed independently by a courier service may also be subject to that
            service provider's own privacy policy and terms.
          </p>
        </Section>

        <Section title="Sharing Your Information">
          <p>CARVE does not sell or rent your personal information.</p>
          <p>We may share necessary information with:</p>
          <BulletList
            items={[
              'Third-party courier and delivery partners',
              'Website hosting and technical-service providers',
              'Communication platforms used for customer support',
              'Professional advisers, where necessary',
              'Courts, government authorities or law-enforcement bodies where disclosure is legally required',
              'Other parties where necessary to prevent fraud, protect our business or enforce our policies',
            ]}
          />
          <p>Only information reasonably required for the relevant purpose will be shared.</p>
        </Section>

        <Section title="Cookies and Website Technologies">
          <p>Our website may use cookies or similar technologies to:</p>
          <BulletList
            items={[
              'Operate the shopping cart and checkout',
              'Remember basic preferences',
              'Maintain website functionality and security',
              'Understand general website performance',
            ]}
          />
          <p>
            You may restrict or disable cookies through your browser settings. However, certain
            website features may not function correctly as a result.
          </p>
        </Section>

        <Section title="Data Security">
          <p>
            We take reasonable administrative and technical measures to protect personal information
            from unauthorised access, misuse, alteration, loss or disclosure.
          </p>
          <p>
            However, no website, messaging platform, internet transmission or electronic-storage
            system can be guaranteed to be completely secure.
          </p>
          <p>
            Customers should not send passwords, card details or unnecessary sensitive information
            through the website, email, WhatsApp or social media.
          </p>
        </Section>

        <Section title="Information Retention">
          <p>We retain personal information only for as long as reasonably necessary to:</p>
          <BulletList
            items={[
              'Process and document orders',
              'Provide customer support',
              'Resolve returns, exchanges, complaints or disputes',
              'Prevent fraudulent or repeated false orders',
              'Maintain necessary accounting and business records',
              'Meet applicable legal requirements',
            ]}
          />
          <p>
            Information that is no longer reasonably required may be deleted, anonymised or securely
            disposed of where practicable.
          </p>
        </Section>

        <Section title="Your Rights and Choices">
          <p>You may contact CARVE to request:</p>
          <BulletList
            items={[
              'Access to the personal information we hold about you',
              'Correction of inaccurate or incomplete information',
              'Removal from promotional communications',
              'Deletion of information that is no longer reasonably required',
            ]}
          />
          <p>
            We may retain certain information where reasonably necessary for completed transactions,
            accounting records, fraud prevention, disputes, legal obligations or legitimate business
            records.
          </p>
          <p>
            We may request information to verify your identity before processing a privacy-related
            request.
          </p>
        </Section>

        <Section title="WhatsApp, Instagram and Other Platforms">
          <p>
            Customers may communicate with CARVE through third-party platforms such as WhatsApp and
            Instagram.
          </p>
          <p>
            Information submitted through these platforms may also be processed according to their
            respective privacy policies. CARVE does not control the independent operation, security
            or privacy practices of third-party platforms.
          </p>
        </Section>

        <Section title="Third-Party Links">
          <p>Our website may contain links to external websites or services.</p>
          <p>
            CARVE is not responsible for the content, availability, security or privacy practices
            of third-party websites and services. Customers should review the applicable policies
            before providing information to them.
          </p>
        </Section>

        <Section title="Children's Information">
          <p>
            CARVE does not knowingly collect personal information directly from children without the
            involvement of a parent or legal guardian.
          </p>
          <p>Orders placed on behalf of a minor should be completed by an adult.</p>
        </Section>

        <Section title="Changes to This Privacy Policy">
          <p>
            CARVE may update this Privacy Policy when our website features, courier arrangements,
            payment methods, marketing tools, business practices or applicable requirements change.
          </p>
          <p>
            The latest version will be published on this page with its revised effective date.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            For questions, corrections or requests relating to this Privacy Policy, contact:
          </p>
          <div className="bg-white rounded-2xl border border-carve-gold/10 p-6 space-y-2 not-prose">
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
