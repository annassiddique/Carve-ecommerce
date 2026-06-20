'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IProduct } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props {
  open: boolean
  onClose: () => void
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const debouncedQuery = useDebounce(query, 300)

  // Auto-focus input when overlay opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Fetch results when debounced query changes
  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(q)}&limit=6`)
      const data = await res.json()
      if (data.success) setResults(data.data)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchResults(debouncedQuery)
  }, [debouncedQuery, fetchResults])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`)
    onClose()
  }

  const handleResultClick = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-carve-forest/97 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Close */}
            <button
              className="pointer-events-auto absolute top-6 right-6 text-carve-champagne/50 hover:text-carve-gold transition-colors"
              onClick={onClose}
            >
              <X size={22} />
            </button>

            {/* Search box — centered vertically only when no results */}
            <div
              className={`pointer-events-auto w-full max-w-2xl px-6 transition-all duration-300 ${
                results.length || (debouncedQuery && !loading)
                  ? 'mt-28'
                  : 'mt-[28vh]'
              }`}
            >
              {/* Eyebrow */}
              <p className="font-body text-[10px] tracking-[0.45em] uppercase text-carve-gold/60 mb-6 text-center">
                Search
              </p>

              {/* Input */}
              <form onSubmit={handleSubmit}>
                <div className="relative border-b-2 border-carve-gold/30 focus-within:border-carve-gold transition-colors duration-300 pb-3 flex items-center gap-4">
                  <Search size={20} className="text-carve-gold/50 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search perfumes, jewellery…"
                    className="flex-1 bg-transparent font-display text-2xl md:text-3xl font-light text-carve-champagne placeholder-carve-champagne/25 outline-none"
                  />
                  {loading && (
                    <Loader2 size={18} className="text-carve-gold/50 animate-spin flex-shrink-0" />
                  )}
                  {query && !loading && (
                    <button
                      type="button"
                      onClick={() => { setQuery(''); setResults([]) }}
                      className="text-carve-champagne/40 hover:text-carve-champagne transition-colors flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </form>

              {/* Results */}
              <AnimatePresence mode="wait">
                {results.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-6 divide-y divide-carve-champagne/10"
                  >
                    {results.map((product) => (
                      <Link
                        key={product._id as string}
                        href={`/product/${product.slug}`}
                        onClick={handleResultClick}
                        className="flex items-center gap-4 py-4 group"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-12 h-12 rounded-sm overflow-hidden flex-shrink-0 bg-carve-champagne/10">
                          {product.images?.[0] && (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-base font-light text-carve-champagne group-hover:text-carve-gold transition-colors truncate">
                            {product.name}
                          </p>
                          <p className="font-body text-xs text-carve-champagne/40 capitalize">
                            {product.category} · {product.subcategory}
                          </p>
                        </div>

                        {/* Price + arrow */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="font-display text-sm text-carve-gold">
                            {formatPrice(product.price)}
                          </span>
                          <ArrowRight
                            size={14}
                            className="text-carve-champagne/30 group-hover:text-carve-gold group-hover:translate-x-0.5 transition-all"
                          />
                        </div>
                      </Link>
                    ))}

                    {/* See all results */}
                    {results.length === 6 && (
                      <Link
                        href={`/shop?search=${encodeURIComponent(query)}`}
                        onClick={handleResultClick}
                        className="flex items-center justify-between py-4 group"
                      >
                        <span className="font-body text-xs tracking-[0.25em] uppercase text-carve-champagne/40 group-hover:text-carve-gold transition-colors">
                          See all results for &ldquo;{query}&rdquo;
                        </span>
                        <ArrowRight size={14} className="text-carve-champagne/30 group-hover:text-carve-gold transition-colors" />
                      </Link>
                    )}
                  </motion.div>
                )}

                {debouncedQuery && !loading && results.length === 0 && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-10 text-center"
                  >
                    <p className="font-display text-lg font-light text-carve-champagne/30">
                      No results for &ldquo;{debouncedQuery}&rdquo;
                    </p>
                    <p className="font-body text-xs text-carve-champagne/20 mt-2">
                      Try a different keyword
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint */}
              {!debouncedQuery && (
                <p className="mt-8 text-center font-body text-[10px] tracking-[0.3em] uppercase text-carve-champagne/20">
                  Press Enter to search · Esc to close
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
