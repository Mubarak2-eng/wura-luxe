import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle,
  MessageCircle,
  MapPin,
  Truck,
  ChevronRight,
  ShoppingBag,
  Phone,
  User,
  FileText,
  Send,
  ChevronDown,
} from 'lucide-react'
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartShipping,
  getCartTotal,
} from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { generateOrderNumber } from '../utils/helpers'
import { whatsAppInvoiceLink } from '../utils/whatsapp'
import toast from 'react-hot-toast'

const WHATSAPP_DISPLAY = '+234 706 416 0841'

const nigerianStates = [
  'Bayelsa',
  'Lagos State',
  'FCT - Abuja',
  'Rivers State',
  'Ogun State',
  'Oyo State',
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Nasarawa',
  'Niger',
  'Plateau',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
]

const deliveryOptions = [
  {
    id: 'standard',
    label: 'Standard Delivery',
    desc: 'Bayelsa / Yenagoa — 1–2 business days',
    price: 2000,
    icon: '🏠',
  },
  {
    id: 'express',
    label: 'Express Delivery',
    desc: 'Same-day or next day (Yenagoa only)',
    price: 4000,
    icon: '⚡',
  },
  {
    id: 'interstate',
    label: 'Nationwide Delivery',
    desc: 'Outside Bayelsa — 2–5 business days',
    price: 5500,
    icon: '🚚',
  },
  {
    id: 'pickup',
    label: 'Store Pickup',
    desc: 'Magnate Plaza, Baybridge Rd, Yenagoa',
    price: 0,
    icon: '🏬',
  },
]

const inputClass =
  'w-full px-4 py-3 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg text-sm text-[#211713] placeholder:text-[#B0A89E] focus:outline-none focus:border-[#C7A66A] focus:ring-1 focus:ring-[#C7A66A]/20 transition-colors'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, promoCode, promoDiscount, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const addOrder = useAuthStore((s) => s.addOrder)

  const [orderNumber] = useState(() => generateOrderNumber())
  const [step, setStep] = useState(1) // 1 = details, 2 = preview invoice, 3 = done
  const [delivery, setDelivery] = useState('standard')
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || 'Bayelsa',
    notes: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  if (items.length === 0 && step !== 3) {
    return (
      <div className="bg-[#FAF6EF] min-h-screen flex items-center justify-center p-8 text-center">
        <div>
          <ShoppingBag className="w-12 h-12 text-[#E9DED0] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#211713] mb-2">Your cart is empty</h2>
          <p className="text-sm text-[#7A726C] mb-6">Add some fragrances before checking out.</p>
          <Link to="/shop" className="btn-espresso px-8 py-3 text-xs font-bold rounded">
            EXPLORE FRAGRANCES
          </Link>
        </div>
      </div>
    )
  }

  const selectedDelivery = deliveryOptions.find((d) => d.id === delivery)
  const subtotal = getCartSubtotal(items)
  const discount = getCartDiscount(items, promoDiscount)
  const shipping = delivery === 'pickup' ? 0 : (selectedDelivery?.price ?? 0)
  const total = Math.max(0, subtotal - discount + shipping)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address) {
      toast.error('Please fill in your name, phone, and delivery address.')
      return
    }
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSendInvoice = () => {
    const link = whatsAppInvoiceLink({
      orderNumber,
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      items,
      subtotal,
      shipping,
      discount,
      total,
      deliveryMethod: selectedDelivery?.label,
    })

    // Save order to auth store
    addOrder?.({
      id: orderNumber,
      createdAt: new Date().toISOString(),
      items: items.map((item) => ({
        name: item.name,
        volume: item.volume,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total,
      status: 'Processing',
      paymentMethod: 'Pay via WhatsApp',
      paymentStatus: 'Pending',
      shippingAddress: `${form.address}, ${form.city}, ${form.state}`,
      timeline: [
        { title: 'Invoice Sent via WhatsApp', time: new Date().toLocaleString('en-NG'), done: true },
        { title: 'Order Confirmed by Store', time: '', done: false },
        { title: 'Dispatched', time: '', done: false },
        { title: 'Delivered', time: '', done: false },
      ],
    })

    clearCart()
    setStep(3)
    window.open(link, '_blank')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── STEP 3: Confirmation ────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="bg-[#FAF6EF] min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-lg w-full text-center space-y-5">
          <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-[#25D366]" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C7A66A] mb-1">Invoice Sent</p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211713] leading-tight">
              Your order is on its way!
            </h1>
          </div>

          <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm p-6 text-left space-y-3 text-sm">
            <div className="flex items-center gap-2 text-[#211713] font-bold font-serif border-b border-[#E9DED0] pb-3 mb-3">
              <FileText className="w-4 h-4 text-[#C7A66A]" />
              <span>Order #{orderNumber}</span>
            </div>
            <div className="flex items-start gap-2 text-[#393431]">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                Your invoice has been opened in WhatsApp ready to send to <strong>{WHATSAPP_DISPLAY}</strong>. Please tap <strong>Send</strong> in WhatsApp if it hasn't sent yet.
              </p>
            </div>
            <div className="flex items-start gap-2 text-[#393431]">
              <Phone className="w-4 h-4 text-[#C7A66A] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                We'll confirm your order and share payment details as soon as we receive your message.
              </p>
            </div>
            <div className="flex items-start gap-2 text-[#393431]">
              <MapPin className="w-4 h-4 text-[#C7A66A] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                <strong>Store:</strong> Magnate Plaza, Baybridge Road, Yenagoa, Bayelsa
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/2347064160841`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 btn-espresso py-3.5 text-xs font-bold rounded flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Open WhatsApp Again
            </a>
            <Link
              to="/shop"
              className="flex-1 btn-outline-espresso py-3.5 text-xs font-bold rounded flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── STEP 2: Invoice Preview ─────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div className="bg-[#FAF6EF] min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-5">

          <div className="text-center mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C7A66A] mb-1">Step 2 of 2</p>
            <h1 className="font-serif text-3xl font-bold text-[#211713]">Review Your Invoice</h1>
            <p className="text-sm text-[#7A726C] mt-1">
              Confirm the details below, then tap <strong>"Send Invoice on WhatsApp"</strong>.
            </p>
          </div>

          {/* Invoice card */}
          <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm overflow-hidden">
            {/* Invoice header */}
            <div className="bg-[#211713] text-[#FAF6EF] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="font-serif text-lg font-bold tracking-wider">MAMA FRAGRANCE</p>
                <p className="text-[10px] tracking-[0.2em] text-[#C7A66A] uppercase mt-0.5">Order Invoice</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-[#E9DED0]/70 uppercase tracking-wider">Reference</p>
                <p className="font-mono text-sm font-bold text-[#C7A66A]">#{orderNumber}</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Customer details */}
              <div className="grid grid-cols-2 gap-4 text-sm border-b border-[#E9DED0] pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#C7A66A] mb-1">Customer</p>
                  <p className="font-semibold text-[#211713]">{form.name}</p>
                  <p className="text-[#7A726C] text-xs">{form.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#C7A66A] mb-1">Delivery To</p>
                  <p className="text-xs text-[#393431] leading-relaxed">
                    {form.address}<br />
                    {form.city}{form.state ? `, ${form.state}` : ''}
                  </p>
                </div>
              </div>

              {/* Delivery method */}
              <div className="flex items-center gap-3 text-sm border-b border-[#E9DED0] pb-5">
                <Truck className="w-4 h-4 text-[#C7A66A] shrink-0" />
                <div>
                  <p className="font-semibold text-[#211713]">{selectedDelivery?.label}</p>
                  <p className="text-xs text-[#7A726C]">{selectedDelivery?.desc}</p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 border-b border-[#E9DED0] pb-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C7A66A]">Items Ordered</p>
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#E9DED0] bg-[#FAF6EF] shrink-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#211713] truncate">{item.name}</p>
                      {item.volume && <p className="text-xs text-[#7A726C]">{item.volume}</p>}
                      <p className="text-xs text-[#7A726C]">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[#211713] shrink-0">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#7A726C]">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({promoCode})</span>
                    <span>−₦{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#7A726C]">
                  <span>Delivery</span>
                  <span>{shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-[#211713] pt-2 border-t border-[#E9DED0]">
                  <span className="font-serif">Total Due</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Notes */}
              {form.notes && (
                <div className="bg-[#FAF6EF] rounded-lg p-3 text-xs text-[#393431] border border-[#E9DED0]">
                  <p className="font-bold text-[#C7A66A] uppercase tracking-wider text-[10px] mb-1">Order Note</p>
                  <p>{form.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* How payment works */}
          <div className="bg-[#FAF6EF] border border-[#E9DED0] rounded-xl p-5 space-y-2">
            <p className="text-xs font-bold text-[#211713] uppercase tracking-wider">How payment works</p>
            <ol className="text-xs text-[#393431] space-y-1.5 list-none">
              <li className="flex items-start gap-2"><span className="font-bold text-[#C7A66A] shrink-0">1.</span> Tap the button below to send this invoice on WhatsApp.</li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#C7A66A] shrink-0">2.</span> We'll confirm your order and send you our account details for transfer.</li>
              <li className="flex items-start gap-2"><span className="font-bold text-[#C7A66A] shrink-0">3.</span> Send your payment proof and we'll dispatch your fragrances immediately.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setStep(1)}
              className="sm:w-auto btn-outline-espresso px-6 py-3.5 text-xs font-bold rounded"
            >
              ← Edit Details
            </button>
            <button
              onClick={handleSendInvoice}
              className="flex-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              SEND INVOICE ON WHATSAPP
            </button>
          </div>

          <p className="text-center text-[11px] text-[#7A726C]">
            Opens WhatsApp with your invoice pre-filled and ready to send to <strong>{WHATSAPP_DISPLAY}</strong>
          </p>
        </div>
      </div>
    )
  }

  // ── STEP 1: Customer Details Form ──────────────────────────────────────────
  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E9DED0]">
        <div className="section-pad py-3 flex items-center gap-2 text-xs text-[#7A726C]">
          <Link to="/cart" className="hover:text-[#211713]">Cart</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#211713] font-semibold">Checkout</span>
          <ChevronRight className="w-3 h-3 text-[#E9DED0]" />
          <span className="text-[#B0A89E]">Invoice Preview</span>
        </div>
      </div>

      <div className="section-pad py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left — Form */}
        <div className="lg:col-span-7">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C7A66A] mb-1">Step 1 of 2</p>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#211713]">Delivery Details</h1>
            <p className="text-sm text-[#7A726C] mt-1">
              Fill in your details below and we'll prepare your WhatsApp invoice.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact */}
            <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <h2 className="font-serif font-bold text-base text-[#211713] flex items-center gap-2">
                <User className="w-4 h-4 text-[#C7A66A]" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#393431] mb-1.5">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#393431] mb-1.5">WhatsApp / Phone *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="+234 800 000 0000" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">Email (optional)</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
              </div>
            </div>

            {/* Delivery address */}
            <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
              <h2 className="font-serif font-bold text-base text-[#211713] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C7A66A]" />
                Delivery Address
              </h2>
              <div>
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">Street Address *</label>
                <input name="address" value={form.address} onChange={handleChange} required className={inputClass} placeholder="House / flat number and street name" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#393431] mb-1.5">City / Town</label>
                  <input name="city" value={form.city} onChange={handleChange} className={inputClass} placeholder="e.g. Yenagoa" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#393431] mb-1.5">State</label>
                  <div className="relative">
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-8`}
                    >
                      {nigerianStates.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0A89E]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery method */}
            <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm p-5 sm:p-6 space-y-3">
              <h2 className="font-serif font-bold text-base text-[#211713] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C7A66A]" />
                Delivery Method
              </h2>
              <div className="space-y-2">
                {deliveryOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      delivery === opt.id
                        ? 'border-[#C7A66A] bg-[#FAF6EF]'
                        : 'border-[#E9DED0] bg-white hover:border-[#C7A66A]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={opt.id}
                      checked={delivery === opt.id}
                      onChange={() => setDelivery(opt.id)}
                      className="accent-[#C7A66A]"
                    />
                    <span className="text-xl">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#211713]">{opt.label}</p>
                      <p className="text-xs text-[#7A726C]">{opt.desc}</p>
                    </div>
                    <span className="text-sm font-bold text-[#211713] shrink-0">
                      {opt.price === 0 ? 'FREE' : `₦${opt.price.toLocaleString()}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm p-5 sm:p-6 space-y-3">
              <h2 className="font-serif font-bold text-base text-[#211713] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C7A66A]" />
                Order Notes <span className="text-xs font-normal text-[#7A726C]">(optional)</span>
              </h2>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Any special instructions, gift message, or fragrance preferences..."
              />
            </div>

            <button
              type="submit"
              className="w-full btn-espresso py-4 text-sm font-bold rounded flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              PREVIEW MY INVOICE
            </button>
          </form>
        </div>

        {/* Right — Order summary */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm p-5 sm:p-6">
            <h2 className="font-serif font-bold text-base text-[#211713] mb-4 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#C7A66A]" />
              Order Summary
            </h2>

            <div className="space-y-3 pb-4 border-b border-[#E9DED0]">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#E9DED0] bg-[#FAF6EF] shrink-0">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#211713] truncate">{item.name}</p>
                    {item.volume && <p className="text-[10px] text-[#7A726C]">{item.volume}</p>}
                    <p className="text-[10px] text-[#7A726C]">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold text-[#211713] shrink-0">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-[#7A726C]">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>−₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[#7A726C]">
                <span>Delivery</span>
                <span>{shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between font-bold text-[#211713] pt-2 border-t border-[#E9DED0]">
                <span className="font-serif">Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp info card */}
          <div className="bg-[#25D366]/5 border border-[#25D366]/20 rounded-2xl p-5 flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
            <div className="text-xs text-[#393431] space-y-1">
              <p className="font-bold text-sm text-[#211713]">Pay via WhatsApp</p>
              <p className="leading-relaxed">
                After reviewing your invoice, you'll send it directly to us on WhatsApp. We'll confirm and share payment details — bank transfer accepted.
              </p>
              <p className="font-semibold text-[#211713] pt-1">📱 {WHATSAPP_DISPLAY}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
