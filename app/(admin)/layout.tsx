import { Toaster } from 'react-hot-toast'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
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
