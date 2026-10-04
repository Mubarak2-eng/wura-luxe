import { useState } from 'react'
import { Mail, Sparkles, Check, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import MotionSection from '../common/MotionSection'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [preference, setPreference] = useState('all')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    setIsSubmitting(false)
    setIsSubscribed(true)
    toast.success('Welcome to Mama Fragrance Club! Use code MAMA10 for 10% off.')
  }

  return (
    <section className="py-16 sm:py-24 bg-[#211713] text-[#FAF6EF] border-t border-[#31231D]">
      <div className="section-pad">
        <MotionSection className="max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EF]/10 border border-[#C7A66A]/40 text-[#C7A66A] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE VIP SCENT CIRCLE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#FAF6EF]">
            A Little Fragrance in Your Inbox.
          </h2>

          <p className="text-sm sm:text-base text-[#E9DED0]/90 font-light max-w-xl mx-auto leading-relaxed">
            Be the first to discover new arrivals, fragrance favourites, and special offers from Mama Fragrance. Plus, enjoy 10% off your first order.
          </p>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#7A726C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full bg-white text-[#211713] placeholder-[#7A726C] border border-[#E9DED0] rounded-lg pl-10 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#C7A66A]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-champagne px-6 py-3 text-xs font-bold rounded shrink-0 shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'Subscribing...'
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Preference pills */}
                <div className="flex items-center justify-center gap-4 text-xs text-[#E9DED0]/75">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="pref"
                      checked={preference === 'all'}
                      onChange={() => setPreference('all')}
                      className="accent-[#C7A66A]"
                    />
                    <span>All Scent News</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="pref"
                      checked={preference === 'women'}
                      onChange={() => setPreference('women')}
                      className="accent-[#C7A66A]"
                    />
                    <span>Women's Edits</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="pref"
                      checked={preference === 'men'}
                      onChange={() => setPreference('men')}
                      className="accent-[#C7A66A]"
                    />
                    <span>Men's Edits</span>
                  </label>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#FAF6EF] text-[#211713] p-6 rounded-2xl max-w-md mx-auto shadow-2xl border border-[#C7A66A]"
              >
                <div className="w-12 h-12 bg-[#211713] text-[#C7A66A] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#211713] mb-1">
                  You're in the Circle!
                </h4>
                <p className="text-xs text-[#7A726C] mb-4">
                  Your 10% welcome coupon has been activated for your next order:
                </p>
                <div className="bg-[#FAF6EF] border-2 border-dashed border-[#C7A66A] p-3 rounded-lg flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#211713]">MAMA10</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7A66A]">
                    10% Off Applied
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </MotionSection>
      </div>
    </section>
  )
}
