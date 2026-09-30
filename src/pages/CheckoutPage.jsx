import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircle, ShieldCheck, Sparkles, Truck, Lock } from 'lucide-react'
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartTotal,
} from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { formatPrice, generateOrderNumber } from '../utils/helpers'
import { whatsAppOrderLink } from '../utils/whatsapp'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
]

export default function CheckoutPage() {
  const navigate = useNavigate()

  const items = useCartStore((s) => s.items)
  const promoDiscount = useCartStore((s) => s.promoDiscount)
  const shippingCost = useCartStore((s) => s.shippingCost)
  const clearCart = useCartStore((s) => s.clearCart)

  const sub = getCartSubtotal(items)
  const disc = getCartDiscount(items, promoDiscount)
  const tot = getCartTotal(items, promoDiscount, shippingCost)

  const { addOrder: saveOrder, user } = useAuthStore()

  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [savedOrderData, setSavedOrderData] = useState(null)

  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: 'Lagos',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.address.trim()) e.address = 'Delivery address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state) e.state = 'Please select a state'
    return e
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    const num = generateOrderNumber()
    setOrderNumber(num)
    const orderRecord = {
      orderNumber: num,
      items: [...items],
      total: tot,
      address: form,
      date: new Date().toISOString(),
      status: 'Confirmed & Awaiting Dispatch',
    }
    setSavedOrderData(orderRecord)
    saveOrder?.(orderRecord)
    clearCart()
    setOrderPlaced(true)
    setLoading(false)

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#d4af37', '#ffffff'],
      })
    } catch (_) {}

    toast.success('Order Successfully Placed with Mama Fragrance! 👑', {
      duration: 5000,
    })
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="section-pad py-24 text-center">
        <h2 className="font-syne text-3xl text-white mb-2">Your Scent Vault is empty</h2>
        <p className="font-cinzel text-gold-light italic text-lg mb-6">"Smell as good as you look!"</p>
        <Link to="/shop" className="btn-futuristic inline-block px-8 py-3.5 rounded-xl text-xs font-bold">
          Enter The Vault
        </Link>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="section-pad py-24 flex flex-col items-center text-center max-w-xl mx-auto">
        <div className="w-24 h-24 rounded-full bg-gold/15 border-2 border-gold-bright flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
          <CheckCircle className="w-12 h-12 text-gold-bright" />
        </div>
        
        <h1 className="font-syne text-4xl sm:text-5xl font-black text-white mb-2">
          Order Confirmed!
        </h1>
        <p className="font-cinzel text-gold-light italic text-xl mb-4">
          "Smell as good as you look!"
        </p>
        
        <div className="p-4 rounded-2xl glass-panel border border-gold/30 mb-6 w-full text-left font-space text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-cream-muted">ORDER ID:</span>
            <span className="text-gold-bright font-bold">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cream-muted">TOTAL AMOUNT:</span>
            <span className="text-white font-bold">{formatPrice(savedOrderData?.total || tot)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cream-muted">RECIPIENT:</span>
            <span className="text-white font-bold">{form.firstName} {form.lastName}</span>
          </div>
        </div>

        <p className="text-cream-muted text-sm leading-relaxed mb-8 font-light">
          A confirmation dispatch has been sent to <strong className="text-white">{form.email}</strong>. Our VIP concierge team is already preparing your flacons for express delivery.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/shop" className="btn-futuristic px-8 py-3.5 rounded-xl text-xs font-bold">
            Continue Shopping
          </Link>
          <a
            href={whatsAppOrderLink(savedOrderData?.items || [], savedOrderData?.total || tot)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-futuristic-outline px-6 py-3.5 rounded-xl text-xs font-bold"
          >
            Chat With Concierge On WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="section-pad py-16">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="cyber-badge mb-3">
          <Lock className="w-3.5 h-3.5 text-gold-bright" />
          <span>ENCRYPTED SECURE CHECKOUT</span>
        </div>
        <h1 className="font-syne text-4xl sm:text-5xl font-black text-white mb-2">
          Finalize Your <span className="text-liquid-gold">Order</span>
        </h1>
        <p className="font-cinzel text-gold-light italic text-lg">
          "Smell as good as you look!"
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Side */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="glass-panel p-7 sm:p-9 rounded-3xl border border-gold/30">
              <h3 className="font-syne text-xl font-bold text-white mb-6">
                Shipping & Delivery Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-space text-cream-muted uppercase block mb-1.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Princess"
                    className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright"
                  />
                  {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="text-xs font-space text-cream-muted uppercase block mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Okonjo"
                    className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright"
                  />
                  {errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-space text-cream-muted uppercase block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-space text-cream-muted uppercase block mb-1.5">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-space text-cream-muted uppercase block mb-1.5">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Street address, Estate, Apartment..."
                    className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright"
                  />
                  {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="text-xs font-space text-cream-muted uppercase block mb-1.5">City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Ikeja / Lekki / Abuja"
                    className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-cream-muted focus:outline-none focus:border-gold-bright"
                  />
                  {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="text-xs font-space text-cream-muted uppercase block mb-1.5">State</label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-gold-bright"
                  >
                    {nigerianStates.map((s) => (
                      <option key={s} value={s} className="bg-[#0c0c16]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Notice */}
            <div className="glass-panel p-6 rounded-2xl border border-gold/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-gold-bright" />
              </div>
              <div>
                <h4 className="font-syne font-bold text-sm text-white">Payment on Order Confirmation</h4>
                <p className="text-xs text-cream-muted leading-relaxed font-light">
                  Our dispatch coordinator will contact you via WhatsApp / Call with direct instant bank transfer instructions or payment link.
                </p>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-7 rounded-3xl border border-gold/30 sticky top-28 shadow-2xl">
              <h3 className="font-syne text-xl font-bold text-white mb-6">
                Order Review
              </h3>

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.key} className="flex justify-between text-xs font-space">
                    <span className="text-cream-soft truncate mr-2">
                      {item.name} ({item.volume}) × {item.quantity}
                    </span>
                    <span className="text-gold-bright font-bold whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 text-xs font-space text-cream-muted pt-4 border-t border-white/10 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">{formatPrice(sub)}</span>
                </div>
                {disc > 0 && (
                  <div className="flex justify-between text-gold-bright">
                    <span>Discount</span>
                    <span>-{formatPrice(disc)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white font-bold">{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-syne font-black text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-gold-bright">{formatPrice(tot)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-futuristic w-full py-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Place Order ({formatPrice(tot)})</span>
                )}
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
