import { useState } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Sparkles, Send, ShieldCheck } from 'lucide-react'
import { whatsAppChatLink } from '../utils/whatsapp'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success('Your message has been received by our VIP Concierge! 🌸', {
      duration: 4000,
    })
    setForm({ name: '', email: '', phone: '', message: '' })
    setLoading(false)
  }

  return (
    <div className="section-pad py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="cyber-badge mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
          <span>VIP CONCIERGE & INQUIRIES</span>
        </div>
        <h1 className="font-syne text-5xl sm:text-6xl font-black text-white mb-3">
          Connect With <span className="text-liquid-gold">Mama Fragrance</span>
        </h1>
        <p className="font-cinzel text-gold-light italic text-xl">
          "Smell as good as you look!"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
        {/* Left Information */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-gold/30">
            <h3 className="font-syne text-xl font-bold text-white mb-4">
              Direct Scent Advisory
            </h3>
            <p className="text-xs sm:text-sm text-cream-muted leading-relaxed mb-6 font-light">
              Looking for a signature wedding scent, an everyday office powerhouse, or want to order in bulk? Our team is available 7 days a week.
            </p>

            <div className="space-y-4 text-xs sm:text-sm">
              <a
                href={whatsAppChatLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] flex items-center gap-3 hover:bg-[#25D366] hover:text-black transition-all font-bold"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Instant WhatsApp VIP Chat</span>
              </a>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-bright" />
                <div>
                  <div className="text-[10px] text-cream-muted uppercase font-space">Phone Line</div>
                  <a href="tel:+2348000000000" className="text-white font-bold hover:text-gold transition-colors">
                    +234 800 000 0000
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-bright" />
                <div>
                  <div className="text-[10px] text-cream-muted uppercase font-space">Email Dispatch</div>
                  <a href="mailto:hello@mamafragrance.com" className="text-white font-bold hover:text-gold transition-colors">
                    hello@mamafragrance.com
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold-bright" />
                <div>
                  <div className="text-[10px] text-cream-muted uppercase font-space">Fulfillment Hub</div>
                  <div className="text-white font-medium">Lagos, Nigeria (Nationwide Shipping)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-gold/30 shadow-2xl"
          >
            <h3 className="font-syne text-2xl font-black text-white mb-6">
              Send an Inquiry
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-space text-cream-muted uppercase tracking-wider block mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Princess Okonjo"
                  className="w-full bg-[#07070f] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-space text-cream-muted uppercase tracking-wider block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full bg-[#07070f] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-space text-cream-muted uppercase tracking-wider block mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+234 800 000 0000"
                    className="w-full bg-[#07070f] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-space text-cream-muted uppercase tracking-wider block mb-1.5">
                  Message / Scent Inquiries
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what perfumes you are looking for or any questions..."
                  className="w-full bg-[#07070f] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-futuristic w-full py-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
