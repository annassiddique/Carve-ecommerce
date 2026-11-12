'use client'
import { useState } from 'react'
import { FieldRow, TextInput } from './FieldRow'
import SaveButton from './SaveButton'
import { ISiteSettingsData } from '@/types'

type Props = { initial: ISiteSettingsData['payment'] }

export default function PaymentForm({ initial }: Props) {
  const [easypaisaNumber, setEasypaisaNumber] = useState(initial.easypaisaNumber)
  const [easypaisaName, setEasypaisaName] = useState(initial.easypaisaName)
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    String(initial.freeShippingThreshold)
  )

  const getData = () => ({
    easypaisaNumber,
    easypaisaName,
    freeShippingThreshold: Number(freeShippingThreshold) || 3000,
  })

  return (
    <div>
      <div className="bg-carve-ivory border border-carve-champagne rounded-sm px-6 mb-6">
        <div className="py-4 border-b border-carve-champagne">
          <p className="font-display text-lg text-carve-charcoal">EasyPaisa Account</p>
          <p className="font-body text-xs text-carve-mink mt-0.5">Shown to customers who choose EasyPaisa at checkout</p>
        </div>

        <FieldRow label="Account Number" hint="The EasyPaisa mobile account number customers send money to">
          <TextInput
            value={easypaisaNumber}
            onChange={setEasypaisaNumber}
            placeholder="03XX-XXXXXXX"
          />
        </FieldRow>

        <FieldRow label="Account Name" hint="Name of the account holder, shown at checkout">
          <TextInput
            value={easypaisaName}
            onChange={setEasypaisaName}
            placeholder="CARVE"
          />
        </FieldRow>
      </div>

      <div className="bg-carve-ivory border border-carve-champagne rounded-sm px-6 mb-6">
        <div className="py-4 border-b border-carve-champagne">
          <p className="font-display text-lg text-carve-charcoal">Shipping</p>
        </div>

        <FieldRow
          label="Free Shipping Threshold"
          hint="Orders at or above this amount get free shipping. Set to 0 to always charge shipping."
        >
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-carve-mink">PKR</span>
            <input
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(e.target.value)}
              min={0}
              className="w-32 bg-carve-smoke border border-carve-champagne text-carve-charcoal px-4 py-2.5 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm"
            />
          </div>
          <p className="font-body text-xs text-carve-mink mt-2">
            Currently: orders under PKR {Number(freeShippingThreshold).toLocaleString()} pay PKR 200 shipping
          </p>
        </FieldRow>
      </div>

      <div className="mt-2 flex justify-end">
        <SaveButton section="payment" getData={getData} />
      </div>
    </div>
  )
}
