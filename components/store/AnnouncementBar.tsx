import Link from 'next/link'
import { SiteSettings } from '@/lib/siteSettings'

type Props = { settings: SiteSettings }

export default function AnnouncementBar({ settings }: Props) {
  const { enabled, text, bgColor, textColor, link } = settings.announcement
  if (!enabled || !text) return null

  return (
    <div
      className="w-full text-center font-body text-xs tracking-[0.2em] uppercase py-2.5 relative z-50"
      style={{ background: bgColor, color: textColor }}
    >
      {link ? (
        <Link href={link} className="hover:underline underline-offset-2">
          {text}
        </Link>
      ) : (
        <span>{text}</span>
      )}
    </div>
  )
}
