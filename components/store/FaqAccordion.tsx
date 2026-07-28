'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string | React.ReactNode
}

interface FaqSection {
  title: string
  items: FaqItem[]
}

const sections: FaqSection[] = [
  {
    title: 'Products',
    items: [
      {
        question: 'Are CARVE perfumes original designer fragrances?',
        answer:
          'CARVE offers independent fragrance impressions inspired by popular and much-loved scent profiles. They are not original designer perfumes, and CARVE is not affiliated with or endorsed by the original brands.',
      },
      {
        question: 'What size are CARVE perfumes?',
        answer: 'Our perfumes are available in 50 ml Eau de Parfum bottles.',
      },
      {
        question: 'How long do CARVE fragrances last?',
        answer:
          'Our fragrances are selected for impressive performance and longevity. However, the experience may vary depending on skin type, weather, application and storage. For better performance, apply fragrance to pulse points such as the wrists and neck, and store the bottle away from direct sunlight and heat.',
      },
      {
        question: 'How can I choose the right fragrance?',
        answer:
          'Each product page includes details about the fragrance profile and its main notes. You may also contact our team for personalised recommendations based on the scents you usually enjoy.',
      },
      {
        question: 'What type of jewellery does CARVE offer?',
        answer:
          'Our current collection consists of artificial fashion jewellery selected for its design, finish and wearability. The material and relevant product details will be mentioned on each product page wherever applicable.',
      },
      {
        question: 'Will CARVE jewellery tarnish?',
        answer:
          'Fashion jewellery may naturally change in appearance over time, particularly when exposed to water, perfume, chemicals, sweat or humidity. Following our Jewellery Care Guide will help preserve its finish and shine for longer.',
      },
      {
        question: 'Can I request a product video before ordering?',
        answer:
          'Yes. You may contact us to request a video of an available product before placing your order.',
      },
    ],
  },
  {
    title: 'Orders and Packaging',
    items: [
      {
        question: 'Is CARVE packaging suitable for gifting?',
        answer:
          'Yes. Every CARVE order is carefully prepared in premium, gift-ready packaging, making it suitable for both personal purchases and special occasions.',
      },
      {
        question: 'Is every product inspected before dispatch?',
        answer:
          'Yes. Each order is individually checked before dispatch to ensure that the product and presentation meet our standards.',
      },
      {
        question: 'Can I change or cancel my order?',
        answer:
          'Contact us as soon as possible after placing your order. Changes or cancellations may only be possible before the order has been processed or dispatched.',
      },
      {
        question: 'How will I know that my order has been confirmed?',
        answer:
          'Once your order is successfully placed, you will receive an order confirmation through the contact details provided during checkout.',
      },
    ],
  },
  {
    title: 'Shipping and Returns',
    items: [
      {
        question: 'Where does CARVE deliver?',
        answer:
          'CARVE currently delivers across Pakistan to serviceable locations.',
      },
      {
        question: 'How long will my order take to arrive?',
        answer:
          'Estimated delivery times depend on your location and will be explained in our Shipping & Returns Policy. Delays may occasionally occur because of public holidays, weather, courier operations or other circumstances outside our control.',
      },
      {
        question: 'What should I do if my order arrives damaged or incorrect?',
        answer: (
          <span>
            Please inspect your order as soon as it is delivered. We strongly recommend recording a
            continuous unboxing video from the moment you begin opening the sealed parcel.
            <br /><br />
            If the product is damaged, defective or incorrect, contact us within 24 hours of delivery
            and provide your order number, the complete unboxing video, and clear photographs of the
            product and packaging. Please keep the original packaging until the issue has been
            resolved. Once the claim has been reviewed and verified, our team will arrange an
            appropriate resolution.
            <br /><br />
            Claims submitted after 24 hours or without sufficient supporting evidence may not be
            accepted.
          </span>
        ),
      },
      {
        question: 'Can jewellery or perfume be returned or exchanged?',
        answer:
          'Return and exchange eligibility depends on the condition of the product and the reason for the request. Please read our Shipping & Returns Policy for the complete terms before placing an order.',
      },
    ],
  },
  {
    title: 'Care and Support',
    items: [
      {
        question: 'How should I care for my jewellery?',
        answer:
          'Keep jewellery away from water, perfume, lotion, hairspray, sanitiser and cleaning products. Store pieces separately and wipe them gently with a soft, dry cloth after wearing. Read the complete Jewellery Care Guide for detailed instructions.',
      },
      {
        question: 'How should I store my perfume?',
        answer:
          'Store perfume upright in a cool, dry place away from direct sunlight, heat and excessive humidity. Avoid leaving it in a car or near a window.',
      },
      {
        question: 'How can I contact CARVE?',
        answer:
          'You can contact us through WhatsApp, email or Instagram. Our current contact details are available on the Contact Us page.',
      },
    ],
  },
]

function AccordionItem({ question, answer }: FaqItem) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-carve-gold/15 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left gap-6 group"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-carve-charcoal group-hover:text-carve-gold transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-carve-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[600px] opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="font-body text-sm leading-relaxed text-carve-charcoal/60">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FaqAccordion() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 space-y-20">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="font-body text-xs tracking-[0.3em] uppercase text-carve-gold mb-8">
            {section.title}
          </h2>
          <div className="bg-white rounded-2xl border border-carve-gold/10 shadow-sm px-8 divide-y-0">
            {section.items.map((item) => (
              <AccordionItem key={item.question} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
