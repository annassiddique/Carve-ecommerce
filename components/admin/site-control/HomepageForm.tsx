'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { FieldRow, TextInput, TextArea } from './FieldRow'
import SaveButton from './SaveButton'
import { ISiteSettingsData, IHeroSlide } from '@/types'

type Props = { initial: ISiteSettingsData['homepage'] }

function ImageDropZone({
  value,
  type,
  label,
  hint,
  aspectClass,
  sizeHint,
  uploading,
  onUpload,
  onChange,
}: {
  value: string
  type: 'desktop' | 'mobile'
  label: string
  hint: string
  aspectClass: string
  sizeHint: string
  uploading: 'desktop' | 'mobile' | null
  onUpload: (file: File, type: 'desktop' | 'mobile') => void
  onChange: (v: string) => void
}) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const busy = uploading === type

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) onUpload(file, type)
    else if (file) toast.error('Please drop an image file.')
  }

  return (
    <FieldRow label={label} hint={hint}>
      <div className="space-y-3">
        {value && (
          <div className={`relative ${aspectClass} rounded-sm overflow-hidden border border-carve-champagne`}>
            <Image src={value} alt={`${label} preview`} fill className="object-cover" sizes="400px" />
          </div>
        )}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !busy && inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-sm px-4 py-6 cursor-pointer transition-colors ${
            dragging
              ? 'border-carve-gold bg-carve-gold/5'
              : 'border-carve-champagne hover:border-carve-forest bg-carve-smoke'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onUpload(file, type)
              e.target.value = ''
            }}
          />
          {busy ? (
            <>
              <span className="w-4 h-4 border-2 border-carve-mink/30 border-t-carve-mink rounded-full animate-spin" />
              <span className="font-body text-xs text-carve-mink">Uploading…</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-carve-mink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="font-body text-xs text-carve-charcoal tracking-wide">
                {value ? 'Drop to replace or click to browse' : 'Drop image here or click to browse'}
              </span>
              <span className="font-body text-xs text-carve-mink">{sizeHint}</span>
            </>
          )}
        </div>
        {value && (
          <div>
            <p className="font-body text-xs text-carve-mink mb-1">Or paste URL:</p>
            <TextInput value={value} onChange={onChange} placeholder="https://..." />
          </div>
        )}
      </div>
    </FieldRow>
  )
}

function SlideEditor({
  slide,
  index,
  onChange,
}: {
  slide: IHeroSlide
  index: number
  onChange: (updated: IHeroSlide) => void
}) {
  const [uploading, setUploading] = useState<'desktop' | 'mobile' | null>(null)

  const set = (key: keyof IHeroSlide, value: string) =>
    onChange({ ...slide, [key]: value })

  const uploadFile = async (file: File, type: 'desktop' | 'mobile') => {
    setUploading(type)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        set(type === 'desktop' ? 'desktopImage' : 'mobileImage', data.data.url)
        toast.success(`${type === 'desktop' ? 'Desktop' : 'Mobile'} image updated!`)
      } else {
        toast.error('Upload failed.')
      }
    } catch {
      toast.error('Upload failed.')
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="bg-carve-ivory border border-carve-champagne rounded-sm px-6 mb-4">
      <div className="py-4 border-b border-carve-champagne">
        <p className="font-display text-lg text-carve-charcoal">Slide {index + 1}</p>
      </div>

      <FieldRow label="Heading" hint="Main headline. Press Enter for a line break.">
        <TextArea value={slide.heading} onChange={(v) => set('heading', v)} rows={2} placeholder="Timeless Scents.\nUnforgettable Impressions." />
      </FieldRow>

      <FieldRow label="Subtext" hint="Short supporting line below the headline">
        <TextInput value={slide.sub} onChange={(v) => set('sub', v)} placeholder="A fragrance for every mood, every moment." />
      </FieldRow>

      <FieldRow label="Tagline" hint="Small uppercase text — dots between words e.g. SCENT · SHINE · PRESENCE">
        <TextInput value={slide.tagline} onChange={(v) => set('tagline', v)} placeholder="SCENT · SHINE · PRESENCE" />
      </FieldRow>

      <FieldRow label="Button Label" hint="Text on the CTA button">
        <TextInput value={slide.ctaLabel} onChange={(v) => set('ctaLabel', v)} placeholder="SHOP PERFUMES" />
      </FieldRow>

      <FieldRow label="Button Link" hint="Where the button takes the customer">
        <TextInput value={slide.ctaHref} onChange={(v) => set('ctaHref', v)} placeholder="/shop/perfumes" />
      </FieldRow>

      <ImageDropZone
        value={slide.desktopImage}
        type="desktop"
        label="Desktop Image"
        hint="Recommended: landscape, wide. Ideal size 2078×757px"
        aspectClass="w-full h-32"
        sizeHint="Recommended 2078×757px · JPG or PNG"
        uploading={uploading}
        onUpload={uploadFile}
        onChange={(v) => set('desktopImage', v)}
      />

      <ImageDropZone
        value={slide.mobileImage}
        type="mobile"
        label="Mobile Image"
        hint="Recommended: portrait, tall. Ideal size 750×1000px"
        aspectClass="w-32 h-44"
        sizeHint="Recommended 750×1000px · JPG or PNG"
        uploading={uploading}
        onUpload={uploadFile}
        onChange={(v) => set('mobileImage', v)}
      />
    </div>
  )
}

export default function HomepageForm({ initial }: Props) {
  const [slides, setSlides] = useState<IHeroSlide[]>(
    initial.slides.length > 0
      ? initial.slides
      : [
          { heading: '', sub: '', tagline: '', ctaLabel: 'SHOP NOW', ctaHref: '/shop', desktopImage: '', mobileImage: '' },
          { heading: '', sub: '', tagline: '', ctaLabel: 'SHOP NOW', ctaHref: '/shop', desktopImage: '', mobileImage: '' },
        ]
  )

  const updateSlide = (i: number, updated: IHeroSlide) =>
    setSlides((prev) => prev.map((s, idx) => (idx === i ? updated : s)))

  const getData = () => ({ slides })

  return (
    <div>
      <p className="font-body text-sm text-carve-mink mb-6">
        Edit the two hero slides shown on the homepage carousel. Drag and drop images directly onto the zones below, or click to browse.
      </p>

      {slides.map((slide, i) => (
        <SlideEditor key={i} slide={slide} index={i} onChange={(updated) => updateSlide(i, updated)} />
      ))}

      <div className="mt-6 flex justify-end">
        <SaveButton section="homepage" getData={getData} />
      </div>
    </div>
  )
}
