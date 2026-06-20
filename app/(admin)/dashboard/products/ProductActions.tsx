'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductActions({ productId }: { productId: string }) {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        toast.success('Product deleted')
        router.refresh()
      } else {
        toast.error('Failed to delete')
      }
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Link href={`/dashboard/products/${productId}`}>
        <button className="p-2 text-carve-mink hover:text-carve-forest hover:bg-carve-smoke rounded-sm transition-colors">
          <Pencil size={14} />
        </button>
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-2 text-carve-mink hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
