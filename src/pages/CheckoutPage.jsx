import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Truck,
  Lock,
  CreditCard,
  Building2,
  Phone,
  ChevronRight,
  ArrowRight,
  HelpCircle,
} from 'lucide-react'
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartShipping,
  getCartTotal,
  FREE_SHIPPING_THRESHOLD,
} from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { formatPrice, generateOrderNumber } from '../utils/helpers'
import { whatsAppOrderLink } from '../utils/whatsapp'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

const nigerianStates = [
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
  'Bayelsa',
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
  'Ondo',
  'Osun',
  'Plateau',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
]

const deliveryOptions = [
  {
    id: 'lagos-standard',
    title: 'Standard Lagos Delivery',
    time: '1–2 Business Days',
    price: 3000,
    forLagos: true,
  },
  {
    id: 'lagos-express',
    title: 'Express Same-Day Lagos Delivery',
    time: 'Delivered in 4–8 Hours',
    price: 5000,
    forLagos: true,
  },
  {
    id: 'interstate-courier',
    title: 'Nationwide Interstate Courier',
    time: '2–4 Business Days (Abuja, PH, Ibadan, etc.)',
    price: 6000,
    forLagos: false,
  },
]

export default function CheckoutPage() {
  const navigate = useNavigate()

  const { items, promoDiscount, clearCart } = useCartStore()
  const { addOrder: saveOrder, user } = useAuthStore()

  const [deliveryMethod, setDeliveryMethod] = useState('lagos-standard')
  const [paymentMethod, setPaymentMethod] = useState('paystack') // 'paystack' | 'bank-transfer' | 'cod'

  // Selected delivery option
  const activeDeliveryOption =
    deliveryOptions.find((d) => d.id === deliveryMethod) || deliveryOptions[0]
  const baseShippingCost = activeDeliveryOption.price

  const subtotal = getCartSubtotal(items)
  const discount = getCartDiscount(items, promoDiscount)
  const shipping = getCartShipping(items, baseShippingCost)
  const total = getCartTotal(items, promoDiscount, baseShippingCost)

  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [savedOrderData, setSavedOrderData] = useState(null)
  const [showPaystackModal, setShowPaystackModal] = useState(false)

  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || 'Lagos State',
    orderNotes: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.address.trim()) e.address = 'Street address is required'
    if (!form.city.trim()) e.city = 'City/Area is required'
    if (!form.state) e.state = 'Please select a state'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    // Auto update delivery method based on state
    if (name === 'state') {
      if (value === 'Lagos State') {
        setDeliveryMethod('lagos-standard')
      } else {
        setDeliveryMethod('interstate-courier')
      }
    }
  }

  const handleProcessOrder = async (isPaid = false) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))

    const num = generateOrderNumber()
    setOrderNumber(num)

    const orderRecord = {
      id: num,
      orderNumber: num,
      items: [...items],
      subtotal,
      discount,
      shipping,
      total,
      address: `${form.address}, ${form.city}, ${form.state}`,
      customer: form,
      paymentMethod:
        paymentMethod === 'paystack'
          ? 'Paystack Online (Card/USSD/Transfer)'
          : paymentMethod === 'bank-transfer'
          ? 'Direct Bank Transfer'
          : 'Payment on Delivery (Lagos)',
      paymentStatus: isPaid || paymentMethod === 'paystack' ? 'Paid' : 'Pending Verification',
      status: 'Processing',
      createdAt: new Date().toISOString(),
      timeline: [
        { title: 'Order Confirmed', time: 'Just now', done: true },
        { title: 'Preparing Fragrance Packaging', time: 'Pending', done: false },
        { title: 'Courier Dispatch', time: 'Pending', done: false },
        { title: 'Delivered', time: 'Pending', done: false },
      ],
    }

    setSavedOrderData(orderRecord)
    saveOrder(orderRecord)
    clearCart()
    setOrderPlaced(true)
    setLoading(false)
    setShowPaystackModal(false)

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#C7A66A', '#211713', '#E9DED0'],
      })
    } catch (_) {}

    toast.success('Order Successfully Placed with Mama Fragrance!')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      toast.error('Please fill in all required shipping details')
      return
    }

    if (paymentMethod === 'paystack') {
      // Trigger Paystack flow
      setShowPaystackModal(true)
    } else {
      handleProcessOrder(false)
    }
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="section-pad py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#211713] mb-2">
          Your fragrance bag is empty
        </h2>
        <p className="text-sm text-[#7A726C] mb-6">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link to="/shop" className="btn-espresso px-8 py-3.5 text-xs font-bold rounded">
          Browse Perfume Vault
        </Link>
      </div>
    )
  }

  // ── Successful Order Screen ──
  if (orderPlaced) {
    return (
      <div className="section-pad py-16 sm:py-24 max-w-2xl mx-auto">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E9DED0] shadow-luxury text-center space-y-6">
          
          <div className="w-20 h-20 rounded-full bg-[#FAF6EF] border-2 border-[#C7A66A] flex items-center justify-center mx-auto text-[#C7A66A]">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A] block mb-1">
              THANK YOU FOR YOUR ORDER
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211713]">
              Order Confirmed!
            </h1>
            <p className="font-serif italic text-base text-[#C7A66A] mt-1">
              “Smell as good as you look.”
            </p>
          </div>

          {/* Receipt Details Card */}
          <div className="bg-[#FCFAF6] p-6 rounded-xl border border-[#E9DED0] text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-[#E9DED0] pb-2">
              <span className="text-[#7A726C]">Tracking ID:</span>
              <strong className="font-mono text-sm text-[#211713]">{orderNumber}</strong>
            </div>
            <div className="flex justify-between border-b border-[#E9DED0] pb-2">
              <span className="text-[#7A726C]">Recipient Name:</span>
              <strong className="text-[#211713]">{form.firstName} {form.lastName}</strong>
            </div>
            <div className="flex justify-between border-b border-[#E9DED0] pb-2">
              <span className="text-[#7A726C]">Delivery Address:</span>
              <span className="text-[#211713] font-medium text-right max-w-xs truncate">
                {form.address}, {form.city}, {form.state}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#E9DED0] pb-2">
              <span className="text-[#7A726C]">Payment Method:</span>
              <strong className="text-[#211713]">{savedOrderData?.paymentMethod}</strong>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span>Total Amount Paid / Payable:</span>
              <span className="text-[#211713]">{formatPrice(savedOrderData?.total || total)}</span>
            </div>
          </div>

          {/* Bank Transfer Instructions if Selected */}
          {paymentMethod === 'bank-transfer' && (
            <div className="bg-[#FAF6EF] p-5 rounded-xl border border-[#C7A66A]/50 text-left text-xs space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#211713]">
                Mama Fragrance Official Bank Details
              </h4>
              <p className="text-[#7A726C]">
                Please transfer <strong>{formatPrice(savedOrderData?.total || total)}</strong> to:
              </p>
              <div className="space-y-1 font-mono text-[#211713] bg-white p-3 rounded border border-[#E9DED0]">
                <p><strong>Bank:</strong> GTBank / Providus Bank</p>
                <p><strong>Account Name:</strong> Mama Fragrance Scents Nig Ltd</p>
                <p><strong>Account Number:</strong> 0123456789</p>
                <p><strong>Payment Reference:</strong> {orderNumber}</p>
              </div>
            </div>
          )}

          <p className="text-xs text-[#7A726C] leading-relaxed max-w-md mx-auto">
            A confirmation receipt has been sent to <strong>{form.email}</strong>. Our team is carefully packing your authentic fragrance flacons for fast dispatch.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/shop" className="btn-espresso px-8 py-3.5 text-xs font-bold rounded">
              Continue Shopping
            </Link>
            <a
              href={whatsAppOrderLink(savedOrderData?.items || [], savedOrderData?.total || total)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-champagne px-6 py-3.5 text-xs font-bold rounded flex items-center justify-center gap-2"
            >
              <span>Confirm on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      
      {/* Breadcrumb */}
      <div className="border-b border-[#E9DED0] bg-[#FCFAF6] py-3.5">
        <div className="section-pad flex items-center gap-2 text-xs text-[#7A726C]">
          <Link to="/" className="hover:text-[#211713] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/cart" className="hover:text-[#211713] transition-colors">
            Bag
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#211713] font-semibold">Secure Checkout</span>
        </div>
      </div>

      <div className="section-pad py-10 sm:py-14">
        
        {/* Page Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C7A66A] mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>256-BIT ENCRYPTED CHECKOUT</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713]">
            Delivery &amp; Payment
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* ── Left: Shipping & Payment Form (8 cols) ── */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* 1. Customer Information Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E9DED0] shadow-sm space-y-6">
                <h3 className="font-serif text-lg font-bold text-[#211713] pb-3 border-b border-[#E9DED0]">
                  1. Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#211713] block mb-1">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Amina"
                      className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-lg p-3 text-xs text-[#211713] focus:outline-none focus:border-[#C7A66A]"
                    />
                    {errors.firstName && <p className="text-[11px] text-red-500 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#211713] block mb-1">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Adeleke"
                      className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-lg p-3 text-xs text-[#211713] focus:outline-none focus:border-[#C7A66A]"
                    />
                    {errors.lastName && <p className="text-[11px] text-red-500 mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#211713] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-lg p-3 text-xs text-[#211713] focus:outline-none focus:border-[#C7A66A]"
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#211713] block mb-1">
                      Phone Number (WhatsApp Active) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="080 1234 5678"
                      className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-lg p-3 text-xs text-[#211713] focus:outline-none focus:border-[#C7A66A]"
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* 2. Delivery Address Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E9DED0] shadow-sm space-y-6">
                <h3 className="font-serif text-lg font-bold text-[#211713] pb-3 border-b border-[#E9DED0]">
                  2. Delivery Address (Nigeria)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[#211713] block mb-1">
                      Street Address &amp; House Number *
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="e.g. 14 Admiralty Way, Flat 3B"
                      className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-lg p-3 text-xs text-[#211713] focus:outline-none focus:border-[#C7A66A]"
                    />
                    {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#211713] block mb-1">
                      State *
                    </label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-lg p-3 text-xs text-[#211713] focus:outline-none focus:border-[#C7A66A]"
                    >
                      {nigerianStates.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#211713] block mb-1">
                      City / Area / LGA *
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="e.g. Lekki Phase 1 / Ikeja"
                      className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-lg p-3 text-xs text-[#211713] focus:outline-none focus:border-[#C7A66A]"
                    />
                    {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[#211713] block mb-1">
                      Order Notes / Delivery Directions (Optional)
                    </label>
                    <textarea
                      name="orderNotes"
                      rows={2}
                      value={form.orderNotes}
                      onChange={handleChange}
                      placeholder="e.g. Call when outside the estate gate or gift message..."
                      className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-lg p-3 text-xs text-[#211713] focus:outline-none focus:border-[#C7A66A]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Delivery Method Selection */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E9DED0] shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#211713] pb-3 border-b border-[#E9DED0]">
                  3. Select Delivery Method
                </h3>

                <div className="space-y-3">
                  {deliveryOptions.map((opt) => {
                    const isFree = subtotal >= FREE_SHIPPING_THRESHOLD && opt.id === 'lagos-standard'
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          deliveryMethod === opt.id
                            ? 'border-[#211713] bg-[#FCFAF6] ring-1 ring-[#211713]'
                            : 'border-[#E9DED0] hover:border-[#C7A66A]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === opt.id}
                            onChange={() => setDeliveryMethod(opt.id)}
                            className="accent-[#211713]"
                          />
                          <div>
                            <p className="font-serif font-bold text-sm text-[#211713]">
                              {opt.title}
                            </p>
                            <p className="text-[11px] text-[#7A726C]">{opt.time}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-xs text-[#211713]">
                            {isFree ? <strong className="text-green-700">FREE</strong> : formatPrice(opt.price)}
                          </span>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* 4. Payment Method Selection */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E9DED0] shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#211713] pb-3 border-b border-[#E9DED0]">
                  4. Payment Method
                </h3>

                <div className="space-y-3 text-xs">
                  {/* Option 1: Paystack */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'paystack'
                        ? 'border-[#211713] bg-[#FCFAF6] ring-1 ring-[#211713]'
                        : 'border-[#E9DED0] hover:border-[#C7A66A]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'paystack'}
                      onChange={() => setPaymentMethod('paystack')}
                      className="accent-[#211713] mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-serif text-[#211713]">
                          Paystack Online Payment (Recommended)
                        </strong>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#C7A66A]">
                          <span>Cards</span> • <span>USSD</span> • <span>Bank Transfer</span>
                        </div>
                      </div>
                      <p className="text-[#7A726C] mt-1 leading-relaxed">
                        Instant, secure card payment, direct bank transfer, or USSD code powered by Paystack.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Direct Bank Transfer */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'bank-transfer'
                        ? 'border-[#211713] bg-[#FCFAF6] ring-1 ring-[#211713]'
                        : 'border-[#E9DED0] hover:border-[#C7A66A]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank-transfer'}
                      onChange={() => setPaymentMethod('bank-transfer')}
                      className="accent-[#211713] mt-0.5"
                    />
                    <div className="flex-1">
                      <strong className="text-sm font-serif text-[#211713] block">
                        Direct Bank Transfer (Manual Confirmation)
                      </strong>
                      <p className="text-[#7A726C] mt-1 leading-relaxed">
                        Transfer directly to Mama Fragrance's GTBank/Providus account upon placing the order.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Pay on Delivery (Lagos only) */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#211713] bg-[#FCFAF6] ring-1 ring-[#211713]'
                        : 'border-[#E9DED0] hover:border-[#C7A66A]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#211713] mt-0.5"
                    />
                    <div className="flex-1">
                      <strong className="text-sm font-serif text-[#211713] block">
                        Pay on Delivery (Verified Lagos Addresses Only)
                      </strong>
                      <p className="text-[#7A726C] mt-1 leading-relaxed">
                        Pay via POS card swipe or cash to the courier upon delivery in Lagos.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* ── Right: Order Summary Sticky (4 cols) ── */}
            <div className="lg:col-span-4">
              <div className="bg-white p-7 rounded-2xl border border-[#E9DED0] shadow-luxury sticky top-28 space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#211713] pb-4 border-b border-[#E9DED0]">
                  Order Summary
                </h3>

                {/* Items Mini List */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.key} className="flex justify-between text-xs gap-2">
                      <div className="truncate">
                        <span className="font-medium text-[#211713]">{item.name}</span>
                        <span className="text-[#7A726C] block text-[10px]">
                          {item.volume} × {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-[#211713] whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2.5 text-xs text-[#393431] pt-4 border-t border-[#E9DED0]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#211713]">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#C7A66A] font-semibold">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery ({activeDeliveryOption.title})</span>
                    <span>
                      {shipping === 0 ? (
                        <strong className="text-green-700">FREE</strong>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#211713] pt-3 border-t border-[#E9DED0]">
                    <span>Total Payable</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-espresso py-4 text-xs font-bold rounded shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Processing Order...'
                  ) : (
                    <>
                      <span>Complete Order ({formatPrice(total)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#7A726C]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C7A66A]" />
                  <span>Guaranteed Original &amp; Sealed Scents</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ── Interactive Paystack Simulation / Gateway Modal ── */}
      {showPaystackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211713]/75 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-[#E9DED0] overflow-hidden">
            {/* Paystack Header */}
            <div className="bg-[#0BA4DB] text-white p-5 text-center relative">
              <span className="text-[10px] uppercase font-bold tracking-widest block opacity-90">
                PAYSTACK SECURE CHECKOUT
              </span>
              <h3 className="font-sans font-bold text-xl mt-1">
                {formatPrice(total)}
              </h3>
              <p className="text-xs opacity-90 mt-0.5">
                Mama Fragrance (Nigeria)
              </p>
              <button
                onClick={() => setShowPaystackModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-lg bg-[#FAF6EF] border border-[#E9DED0] text-[#393431]">
                <p><strong>Paying as:</strong> {form.email}</p>
                <p><strong>Recipient:</strong> {form.firstName} {form.lastName}</p>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-[#211713] block">Test Card Number</label>
                <input
                  readOnly
                  value="4084 0840 8408 4084 (Test Visa)"
                  className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded p-2.5 text-xs text-[#211713] font-mono"
                />
              </div>

              <button
                onClick={() => handleProcessOrder(true)}
                disabled={loading}
                className="w-full py-3.5 bg-[#0BA4DB] hover:bg-[#098bb9] text-white font-bold text-xs rounded-lg shadow-md transition-colors"
              >
                {loading ? 'Verifying Transaction...' : `Simulate Successful Payment of ${formatPrice(total)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
