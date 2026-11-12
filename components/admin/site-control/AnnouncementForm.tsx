'use client'
import { useState } from 'react'
import { FieldRow, TextInput } from './FieldRow'
import SaveButton from './SaveButton'
import { ISiteSettingsData } from '@/types'

type Props = { initial: ISiteSettingsData['announcement'] }

export default function AnnouncementForm({ initial }: Props) {
  const [enabled, setEnabled] = useState(initial.enabled)
  const [text, setText] = useState(initial.text)
  const [bgColor, setBgColor] = useState(initial.bgColor)
  const [textColor, setTextColor] = useState(initial.textColor)
  const [link, setLink] = useState(initial.link)

  const getData = () => ({ enabled, text, bgColor, textColor, link })

  return (
    <div>
      {/* Live preview */}
      {enabled && text && (
        <div
          className="w-full text-center text-xs tracking-[0.2em] uppercase py-2.5 font-body rounded-sm mb-6"
          style={{ background: bgColor, color: textColor }}
        >
          {link ? (
            <span className="underline underline-offset-2">{text} →</span>
          ) : (
            <span>{text}</span>
          )}
        </div>
      )}
      {(!enabled || !text) && (
        <div className="w-full text-center text-xs tracking-widest uppercase py-2.5 font-body rounded-sm mb-6 bg-carve-champagne/30 text-carve-mink border border-dashed border-carve-champagne">
          Preview will appear here when enabled with text
        </div>
      )}

      <div className="bg-carve-ivory border border-carve-champagne rounded-sm px-6">
        <FieldRow label="Enable Bar" hint="Toggles the bar on/off across the whole site instantly">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setEnabled(!enabled)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                enabled ? 'bg-carve-forest' : 'bg-carve-champagne'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
            <span className="font-body text-sm text-carve-charcoal">
              {enabled ? 'Visible on site' : 'Hidden from site'}
            </span>
          </label>
        </FieldRow>

        <FieldRow label="Bar Text" hint="The message shown to customers. Keep it short and punchy.">
          <TextInput
            value={text}
            onChange={setText}
            placeholder="e.g. Free delivery on orders over PKR 2,000!"
          />
        </FieldRow>

        <FieldRow label="Background Colour" hint="Pick a background colour for the bar">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-carve-champagne"
            />
            <TextInput
              value={bgColor}
              onChange={setBgColor}
              placeholder="#C8A96E"
              className="w-32"
            />
          </div>
        </FieldRow>

        <FieldRow label="Text Colour" hint="Pick a colour for the bar text">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-carve-champagne"
            />
            <TextInput
              value={textColor}
              onChange={setTextColor}
              placeholder="#1A3D2B"
              className="w-32"
            />
          </div>
        </FieldRow>

        <FieldRow label="Link (optional)" hint="If set, the bar text becomes a clickable link. Leave empty for no link.">
          <TextInput
            value={link}
            onChange={setLink}
            placeholder="e.g. /shop/perfumes or leave empty"
          />
        </FieldRow>
      </div>

      <div className="mt-6 flex justify-end">
        <SaveButton section="announcement" getData={getData} />
      </div>
    </div>
  )
}
