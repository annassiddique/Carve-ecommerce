'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-carve-charcoal/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className={`relative bg-carve-ivory w-full ${sizes[size]} rounded-sm shadow-gold z-10`}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-carve-champagne">
                <h2 className="font-display text-xl text-carve-charcoal">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-carve-mink hover:text-carve-charcoal transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
