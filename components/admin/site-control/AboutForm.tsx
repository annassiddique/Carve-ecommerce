'use client'
import { useState } from 'react'
import { FieldRow, TextInput, TextArea } from './FieldRow'
import SaveButton from './SaveButton'
import { ISiteSettingsData } from '@/types'

type Props = { initial: ISiteSettingsData['about'] }

export default function AboutForm({ initial }: Props) {
  const [storyParagraph1, setStoryParagraph1] = useState(initial.storyParagraph1)
  const [storyParagraph2, setStoryParagraph2] = useState(initial.storyParagraph2)
  const [closingTagline, setClosingTagline] = useState(initial.closingTagline)
  const [promiseHeadline, setPromiseHeadline] = useState(initial.promiseHeadline)
  const [promiseIntro, setPromiseIntro] = useState(initial.promiseIntro)
  const [closingStatement, setClosingStatement] = useState(initial.closingStatement)
  const [pillar1Title, setPillar1Title] = useState(initial.pillar1Title)
  const [pillar1Description, setPillar1Description] = useState(initial.pillar1Description)
  const [pillar2Title, setPillar2Title] = useState(initial.pillar2Title)
  const [pillar2Description, setPillar2Description] = useState(initial.pillar2Description)
  const [pillar3Title, setPillar3Title] = useState(initial.pillar3Title)
  const [pillar3Description, setPillar3Description] = useState(initial.pillar3Description)

  const getData = () => ({
    storyParagraph1,
    storyParagraph2,
    closingTagline,
    promiseHeadline,
    promiseIntro,
    closingStatement,
    pillar1Title,
    pillar1Description,
    pillar2Title,
    pillar2Description,
    pillar3Title,
    pillar3Description,
  })

  return (
    <div>
      {/* Our Story section */}
      <div className="bg-carve-ivory border border-carve-champagne rounded-sm px-6 mb-6">
        <div className="py-4 border-b border-carve-champagne">
          <p className="font-display text-lg text-carve-charcoal">Our Story</p>
          <p className="font-body text-xs text-carve-mink mt-0.5">The dark green hero section at the top of the About page</p>
        </div>

        <FieldRow label="Paragraph 1" hint="First paragraph of the brand story">
          <TextArea value={storyParagraph1} onChange={setStoryParagraph1} rows={4} />
        </FieldRow>

        <FieldRow label="Paragraph 2" hint="Second paragraph of the brand story">
          <TextArea value={storyParagraph2} onChange={setStoryParagraph2} rows={4} />
        </FieldRow>

        <FieldRow label="Closing Tagline" hint="The italic gold line at the bottom of the story section">
          <TextInput value={closingTagline} onChange={setClosingTagline} placeholder="Carve your presence." />
        </FieldRow>
      </div>

      {/* CARVE Promise section */}
      <div className="bg-carve-ivory border border-carve-champagne rounded-sm px-6 mb-6">
        <div className="py-4 border-b border-carve-champagne">
          <p className="font-display text-lg text-carve-charcoal">The CARVE Promise</p>
          <p className="font-body text-xs text-carve-mink mt-0.5">The white section below Our Story</p>
        </div>

        <FieldRow label="Section Headline" hint="Large heading above the 3 promise pillars">
          <TextInput value={promiseHeadline} onChange={setPromiseHeadline} placeholder="Luxury, Chosen With Intention" />
        </FieldRow>

        <FieldRow label="Section Intro" hint="Paragraph below the headline, above the 3 cards">
          <TextArea value={promiseIntro} onChange={setPromiseIntro} rows={3} />
        </FieldRow>

        <FieldRow label="Closing Statement" hint="Italic text at the very bottom. Press Enter for a line break.">
          <TextArea value={closingStatement} onChange={setClosingStatement} rows={2} />
        </FieldRow>
      </div>

      {/* 3 Pillars */}
      {[
        { n: 1, title: pillar1Title, setTitle: setPillar1Title, desc: pillar1Description, setDesc: setPillar1Description },
        { n: 2, title: pillar2Title, setTitle: setPillar2Title, desc: pillar2Description, setDesc: setPillar2Description },
        { n: 3, title: pillar3Title, setTitle: setPillar3Title, desc: pillar3Description, setDesc: setPillar3Description },
      ].map(({ n, title, setTitle, desc, setDesc }) => (
        <div key={n} className="bg-carve-ivory border border-carve-champagne rounded-sm px-6 mb-4">
          <div className="py-4 border-b border-carve-champagne">
            <p className="font-display text-lg text-carve-charcoal">Promise Card {n}</p>
          </div>

          <FieldRow label="Title" hint={`Heading for card ${n}`}>
            <TextInput value={title} onChange={setTitle} />
          </FieldRow>

          <FieldRow label="Description" hint="Body text inside the card">
            <TextArea value={desc} onChange={setDesc} rows={3} />
          </FieldRow>
        </div>
      ))}

      <div className="mt-2 flex justify-end">
        <SaveButton section="about" getData={getData} />
      </div>
    </div>
  )
}
