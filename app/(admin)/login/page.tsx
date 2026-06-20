'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (res?.ok) {
      router.push('/dashboard')
    } else {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-carve-forest flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-semibold tracking-[0.15em] text-carve-champagne mb-1">
            CARVE
          </h1>
          <p className="font-display italic text-carve-gold">Admin Portal</p>
        </div>

        <div className="bg-carve-ivory rounded-sm p-8 shadow-gold">
          <h2 className="font-display text-2xl text-carve-charcoal mb-6">Sign In</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm font-body text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body text-xs tracking-widest uppercase text-carve-mink mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@carve.pk"
                required
                className="w-full bg-carve-smoke border border-carve-champagne text-carve-charcoal placeholder-carve-champagne/50 px-4 py-3 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm"
              />
            </div>

            <div>
              <label className="block font-body text-xs tracking-widest uppercase text-carve-mink mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-carve-smoke border border-carve-champagne text-carve-charcoal placeholder-carve-champagne/50 px-4 py-3 pr-10 text-sm font-body focus:outline-none focus:border-carve-gold rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-carve-mink hover:text-carve-charcoal"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
              Sign In
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
