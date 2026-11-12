'use client'
import { useState } from 'react'
import { FieldRow, TextInput, TextArea } from './FieldRow'
import SaveButton from './SaveButton'
import { ISiteSettingsData } from '@/types'

type Props = { initial: ISiteSettingsData['contact'] }

export default function ContactForm({ initial }: Props) {
  const [whatsappNumber, setWhatsappNumber] = useState(initial.whatsappNumber)
  const [whatsappDisplay, setWhatsappDisplay] = useState(initial.whatsappDisplay)
  const [email, setEmail] = useState(initial.email)
  const [instagramHandle, setInstagramHandle] = useState(initial.instagramHandle)
  const [instagramUrl, setInstagramUrl] = useState(initial.instagramUrl)
  const [supportText, setSupportText] = useState(initial.supportText)

  const getData = () => ({
    whatsappNumber,
    whatsappDisplay,
    email,
    instagramHandle,
    instagramUrl,
    supportText,
  })

  return (
    <div>
      <div className="bg-carve-ivory border border-carve-champagne rounded-sm px-6 mb-6">
        <div className="py-4 border-b border-carve-champagne">
          <p className="font-display text-lg text-carve-charcoal">WhatsApp</p>
        </div>

        <FieldRow
          label="Phone Number"
          hint="Raw number used for the wa.me link. No spaces or dashes. Start with country code e.g. 923001234567"
        >
          <TextInput
            value={whatsappNumber}
            onChange={setWhatsappNumber}
            placeholder="923002278377"
          />
        </FieldRow>

        <FieldRow
          label="Display Text"
          hint="Formatted number shown to customers on the contact page"
        >
          <TextInput
            value={whatsappDisplay}
            onChange={setWhatsappDisplay}
            placeholder="+92 300 227 8377"
          />
        </FieldRow>
      </div>

      <div className="bg-carve-ivory border border-carve-champagne rounded-sm px-6 mb-6">
        <div className="py-4 border-b border-carve-champagne">
          <p className="font-display text-lg text-carve-charcoal">Email</p>
        </div>

        <FieldRow label="Email Address" hint="Shown and linked on the contact page">
          <TextInput
            value={email}
            onChange={setEmail}
            placeholder="info@shopcarvepk.com"
            type="email"
          />
        </FieldRow>
      </div>

      <div className="bg-carve-ivory border border-carve-champagne rounded-sm px-6 mb-6">
        <div className="py-4 border-b border-carve-champagne">
          <p className="font-display text-lg text-carve-charcoal">Instagram</p>
        </div>

        <FieldRow label="Handle" hint="Your Instagram handle shown to customers e.g. @wecarveit">
          <TextInput
            value={instagramHandle}
            onChange={setInstagramHandle}
            placeholder="@wecarveit"
          />
        </FieldRow>

        <FieldRow label="Profile URL" hint="Full URL to your Instagram profile">
          <TextInput
            value={instagramUrl}
            onChange={setInstagramUrl}
            placeholder="https://www.instagram.com/wecarveit"
          />
        </FieldRow>
      </div>

      <div className="bg-carve-ivory border border-carve-champagne rounded-sm px-6 mb-6">
        <div className="py-4 border-b border-carve-champagne">
          <p className="font-display text-lg text-carve-charcoal">Order Support Note</p>
        </div>

        <FieldRow
          label="Custom Note"
          hint="Optional extra text shown in the Order Support box. Leave empty to hide."
        >
          <TextArea
            value={supportText}
            onChange={setSupportText}
            rows={3}
            placeholder="e.g. For fastest support, always message us on WhatsApp."
          />
        </FieldRow>
      </div>

      <div className="mt-2 flex justify-end">
        <SaveButton section="contact" getData={getData} />
      </div>
    </div>
  )
}
