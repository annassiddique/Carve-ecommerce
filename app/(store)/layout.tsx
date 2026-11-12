import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/store/Navbar'
import Footer from '@/components/store/Footer'
import AnnouncementBar from '@/components/store/AnnouncementBar'
import { getSiteSettings } from '@/lib/siteSettings'

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <>
      <AnnouncementBar settings={settings} />
      <Navbar announcementVisible={settings.announcement.enabled && !!settings.announcement.text} />
      <main>{children}</main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1A3D2B',
            color: '#E8D5B0',
            fontFamily: 'var(--font-jost)',
            fontSize: '13px',
            border: '1px solid #C8A96E',
          },
        }}
      />
    </>
  )
}
