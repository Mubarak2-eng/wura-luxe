import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success('Welcome to the Wura family! 🌸', { duration: 4000 })
    setEmail('')
    setLoading(false)
  }

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%), #090909',
        }}
      />
      {/* Decorative lines */}
      <div className="absolute left-0 right-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}
      />
      <div className="absolute left-0 right-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}
      />

      <div className="relative section-pad max-w-2xl mx-auto text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 mb-6 border border-gold/30 mx-auto"
          style={{ background: 'rgba(201,168,76,0.08)', boxShadow: '0 0 30px rgba(201,168,76,0.15)' }}
        >
          <Sparkles className="w-5 h-5 text-gold" />
        </div>

        <h2 className="font-playfair text-5xl text-cream mb-3">
          Join the <span className="gold-text italic">Wura Circle</span>
        </h2>
        <div className="gold-divider mb-6" />
        <p className="text-cream-muted mb-10 leading-relaxed text-base max-w-md mx-auto">
          Be first to discover new collections, exclusive offers, and fragrance
          secrets. Luxury, delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address…"
            className="flex-1 bg-dark-card border border-dark-border text-cream placeholder-cream-muted px-6 py-4 text-sm focus:outline-none focus:border-gold transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-4 text-dark font-semibold text-sm tracking-widest uppercase btn-gold-glow disabled:opacity-60 whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97a, #c9a84c)' }}
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Subscribe <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <p className="text-xs text-cream-muted mt-5">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  )
}
