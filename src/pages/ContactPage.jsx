import { useState } from 'react'
import { MessageCircle, Mail, Clock, ChevronDown, Send, CheckCircle } from 'lucide-react'
import MotionSection from '../components/common/MotionSection'

const faqs = [
  {
    q: 'Are your fragrances authentic?',
    a: 'Yes. All fragrances sold on Mama Fragrance are authentic. We source directly from verified suppliers and authorized distributors. Each product is sealed and shipped to you as received.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery within Lagos takes 1–2 business days. Deliveries outside Lagos typically take 2–4 business days, depending on your location and our courier partner.',
  },
  {
    q: 'What is your returns and exchange policy?',
    a: 'We accept returns or exchanges on unopened, sealed products within 7 days of delivery. Once a fragrance bottle has been opened or used, we are unable to accept returns due to hygiene and authenticity reasons.',
  },
  {
    q: 'Can I get free delivery?',
    a: 'Yes. Orders totalling ₦50,000 or more qualify for free standard delivery within Lagos. Express delivery and interstate orders are charged separately regardless of order value.',
  },
  {
    q: 'Do you ship outside Nigeria?',
    a: 'We currently serve customers across Nigeria. International shipping is not available at this time. Please check back or contact us for updates.',
  },
  {
    q: 'How can I track my order?',
    a: 'Once your order is dispatched, you will receive a tracking number and courier details via WhatsApp or email. You can also check your order status in your account dashboard.',
  },
  {
    q: 'Can I pay on delivery?',
    a: 'Cash on delivery (COD) is available for selected locations within Lagos. For interstate orders, full payment is required upfront via bank transfer or card.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept debit/credit cards (via Paystack), direct bank transfers, and cash on delivery for eligible Lagos orders.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E9DED0] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between px-5 py-4 hover:bg-[#FCFAF6] transition-colors"
      >
        <span className="text-sm font-semibold text-[#211713]">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#C7A66A] transition-transform flex-shrink-0 ml-4 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-[#393431] leading-relaxed font-light border-t border-[#E9DED0] pt-4 bg-white">
          {a}
        </div>
      )}
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">

      {/* ── Hero Banner ── */}
      <section className="bg-[#211713] text-[#FAF6EF] py-16 sm:py-20 text-center">
        <div className="section-pad space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A]">
            WE'RE HERE TO HELP
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#FAF6EF]">
            Get in Touch
          </h1>
          <p className="text-sm text-[#E9DED0]/80 font-light max-w-lg mx-auto">
            Questions about a fragrance, your order, or just need guidance finding the perfect scent? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Contact Cards + Form ── */}
      <section className="section-pad py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left — Contact channels */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#211713] mb-1">How to Reach Us</h2>
            <p className="text-sm text-[#7A726C] font-light">
              The quickest way to reach us is via WhatsApp. We typically respond within minutes during business hours.
            </p>

            <a
              href="https://wa.me/2347064160841"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 p-5 bg-white border border-[#E9DED0] rounded-xl hover:border-[#C7A66A] hover:shadow-luxury transition-all group"
            >
              <div className="w-10 h-10 bg-[#25D366]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#211713] group-hover:text-[#C7A66A] transition-colors">WhatsApp</p>
                <p className="text-xs text-[#7A726C] mt-0.5">Chat with us directly — fast responses</p>
                <p className="text-xs text-[#C7A66A] font-semibold mt-1">+234 706 416 0841</p>
              </div>
            </a>

            <a
              href="mailto:hello@mamafragrance.com"
              className="flex items-start gap-4 p-5 bg-white border border-[#E9DED0] rounded-xl hover:border-[#C7A66A] hover:shadow-luxury transition-all group"
            >
              <div className="w-10 h-10 bg-[#FAF6EF] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#E9DED0]">
                <Mail className="w-5 h-5 text-[#C7A66A]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#211713] group-hover:text-[#C7A66A] transition-colors">Email</p>
                <p className="text-xs text-[#7A726C] mt-0.5">We reply within 24–48 business hours</p>
                <p className="text-xs text-[#C7A66A] font-semibold mt-1">hello@mamafragrance.com</p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-5 bg-white border border-[#E9DED0] rounded-xl">
              <div className="w-10 h-10 bg-[#FAF6EF] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#E9DED0]">
                <Clock className="w-5 h-5 text-[#C7A66A]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#211713]">Business Hours</p>
                <p className="text-xs text-[#7A726C] mt-1 leading-relaxed">
                  Monday – Saturday<br />
                  9:00 AM – 6:00 PM WAT
                </p>
              </div>
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="lg:col-span-2">
            <MotionSection>
              <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm p-6 sm:p-8">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#C7A66A]/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-[#C7A66A]" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#211713]">Message Received</h3>
                    <p className="text-sm text-[#7A726C] font-light max-w-sm mx-auto">
                      Thank you for reaching out, {form.name.split(' ')[0]}. We'll get back to you within 24 hours. For faster help, send us a WhatsApp message.
                    </p>
                    <a
                      href="https://wa.me/2347064160841"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 btn-espresso px-8 py-3 text-xs font-bold rounded"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl font-bold text-[#211713] mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#393431] mb-1.5">Full Name *</label>
                          <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg text-sm text-[#211713] placeholder:text-[#B0A89E] focus:outline-none focus:border-[#C7A66A] focus:ring-1 focus:ring-[#C7A66A]/20 transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#393431] mb-1.5">Email Address *</label>
                          <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg text-sm text-[#211713] placeholder:text-[#B0A89E] focus:outline-none focus:border-[#C7A66A] focus:ring-1 focus:ring-[#C7A66A]/20 transition-colors"
                            placeholder="you@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#393431] mb-1.5">Phone Number</label>
                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg text-sm text-[#211713] placeholder:text-[#B0A89E] focus:outline-none focus:border-[#C7A66A] focus:ring-1 focus:ring-[#C7A66A]/20 transition-colors"
                            placeholder="+234..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#393431] mb-1.5">Subject</label>
                          <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg text-sm text-[#211713] focus:outline-none focus:border-[#C7A66A] focus:ring-1 focus:ring-[#C7A66A]/20 transition-colors"
                          >
                            <option value="">Select a topic</option>
                            <option value="order">Order Enquiry</option>
                            <option value="scent">Fragrance Recommendation</option>
                            <option value="return">Return / Exchange</option>
                            <option value="wholesale">Wholesale / Bulk Order</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#393431] mb-1.5">Your Message *</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg text-sm text-[#211713] placeholder:text-[#B0A89E] focus:outline-none focus:border-[#C7A66A] focus:ring-1 focus:ring-[#C7A66A]/20 transition-colors resize-none"
                          placeholder="How can we help you today?"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-espresso px-8 py-3.5 text-xs font-bold rounded inline-flex items-center gap-2 disabled:opacity-70"
                      >
                        {loading ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                              <path d="M12 2a10 10 0 0 1 10 10" />
                            </svg>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>SEND MESSAGE</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="section-pad py-12 sm:py-16 border-t border-[#E9DED0]">
        <MotionSection className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A] block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#211713]">
              Common Questions
            </h2>
            <p className="text-sm text-[#7A726C] font-light mt-2">
              Answers to questions we hear most often from our customers.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </MotionSection>
      </section>
    </div>
  )
}
