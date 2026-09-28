'use client'
import { useState } from 'react'
import { Download } from 'lucide-react'

export default function ExportOrdersButton() {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders/export')
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `CARVE-Orders-${new Date().toISOString().slice(0, 10)}.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      alert('Export failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-carve-forest text-carve-ivory font-body text-xs tracking-widest uppercase rounded-sm hover:bg-carve-sage transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <Download size={13} />
      {loading ? 'Exporting...' : 'Export Excel'}
    </button>
  )
}
