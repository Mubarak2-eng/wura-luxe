import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { whatsAppChatLink } from '../utils/whatsapp'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Message sent! We'll get back to you within 24 hours 🌸", {
      duration: 5000,
    })
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-52 flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/20" />
        <div className="relative section-pad pb-10">
          <h1 className="font-playfair text-5xl text-cream">Contact Us</h1>
        </div>
      </section>

      <div className="section-pad py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-6xl mx-auto">
          {/* Info */}
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
              Get in Touch
            </p>
            <h2 className="font-playfair text-4xl text-cream mb-6 leading-tight">
              We'd Love to{' '}
              <span className="italic text-gold">Hear From You</span>
            </h2>
            <p className="text-cream-muted leading-relaxed mb-10">
              Whether you have a question about our fragrances, need help
              choosing a scent, want to place a bulk order, or just want to say
              hello — we're here for you.
            </p>

            <div className="flex flex-col gap-6 mb-10">
              {[
                {
                  icon: MapPin,
                  label: 'Visit Us',
                  value: 'Lagos, Nigeria',
                },
                {
                  icon: Phone,
                  label: 'Call / WhatsApp',
                  value: '+234 800 000 0000',
                  href: 'tel:+2348000000000',
                },
                {
                  icon: Mail,
                  label: 'Email Us',
                  value: 'hello@wuraluxe.com',
                  href: 'mailto:hello@wuraluxe.com',
                },
                {
                  icon: Clock,
                  label: 'Business Hours',
                  value: 'Monday – Saturday, 9am – 6pm WAT',
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-cream-muted tracking-widest uppercase">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-cream hover:text-gold transition-colors text-sm mt-0.5 block"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-cream text-sm mt-0.5">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsAppChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 border border-[#25D366] text-[#25D366] text-sm font-semibold hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with us on WhatsApp
            </a>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="luxury-card p-8">
            <h3 className="font-playfair text-2xl text-cream mb-6">
              Send a Message
            </h3>
            <div className="flex flex-col gap-4">
              <Input
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Adaeze Okonkwo"
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="adaeze@email.com"
                required
              />
              <Input
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Product enquiry…"
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-cream-soft tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us how we can help…"
                  className="w-full bg-dark-secondary border border-dark-border text-cream placeholder-cream-muted px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>
              <Button type="submit" loading={loading} fullWidth size="lg">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
