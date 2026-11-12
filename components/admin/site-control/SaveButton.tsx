'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface SaveButtonProps {
  section: string
  getData: () => Record<string, unknown>
  label?: string
}

export default function SaveButton({ section, getData, label = 'Save Changes' }: SaveButtonProps) {
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/site-settings/${section}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getData()),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Saved successfully!')
      } else {
        toast.error('Failed to save. Please try again.')
      }
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="flex items-center gap-2 bg-carve-forest text-carve-ivory font-body text-xs tracking-widest uppercase px-6 py-3 rounded-sm hover:bg-carve-sage transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {saving ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-carve-ivory/30 border-t-carve-ivory rounded-full animate-spin" />
          Saving…
        </>
      ) : (
        label
      )}
    </button>
  )
}
