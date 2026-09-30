import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)

    await new Promise((r) => setTimeout(r, 800))
    setSubscribed(true)
    setLoading(false)

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#d4af37', '#ffffff', '#ff9e00'],
      })
    } catch (_) {}

    toast.success('Welcome to the Mama Fragrance VIP Vault! 👑', {
      duration: 4000,
    })
  }

  return (
    <section className="section-pad py-24 relative overflow-hidden">
      <div className="relative glass-panel rounded-3xl p-8 sm:p-14 border border-gold/30 overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
        {/* Glow ambient circle */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-b from-gold/20 via-gold/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="cyber-badge mb-4 mx-auto">
            <Zap className="w-3.5 h-3.5 text-gold-bright" />
            <span>VIP SCENT INSIDERS</span>
          </div>

          <h2 className="font-syne text-4xl sm:text-5xl font-black text-white mb-3">
            Join the <span className="text-liquid-gold">Mama Fragrance</span> Circle
          </h2>

          <p className="font-cinzel text-gold-light italic text-lg mb-4">
            "Smell as good as you look!"
          </p>

          <p className="text-xs sm:text-sm text-cream-muted max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Get instant notifications when rare Arabian stock drops, plus private VIP discounts and bespoke layering formulas delivered straight to your inbox.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-2xl bg-gold/10 border border-gold/40 text-gold-bright flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-6 h-6 text-gold-bright" />
              <span className="font-syne font-bold text-sm">
                You are registered on the VIP Priority Access List!
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for private drops..."
                className="flex-1 bg-[#0a0a14] border border-gold/30 rounded-xl px-5 py-4 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-futuristic px-7 py-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Unlock VIP Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-[11px] text-cream-muted font-space mt-4">
            🔒 No spam. Only authentic drops & private promo codes. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
