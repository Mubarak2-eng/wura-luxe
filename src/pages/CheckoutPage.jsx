import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import {
  useCartStore,
  getCartSubtotal,
  getCartDiscount,
  getCartTotal,
} from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { formatPrice, generateOrderNumber } from '../utils/helpers'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT',
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
  const [savedItems, setSavedItems] = useState([])

  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName) e.firstName = 'First name is required'
    if (!form.lastName) e.lastName = 'Last name is required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone) e.phone = 'Phone number is required'
    if (!form.address) e.address = 'Address is required'
    if (!form.city) e.city = 'City is required'
    if (!form.state) e.state = 'State is required'
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
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    const num = generateOrderNumber()
    setOrderNumber(num)
    setSavedItems([...items])
    saveOrder?.({
      orderNumber: num,
      items: [...items],
      total: tot,
      address: form,
      date: new Date().toISOString(),
      status: 'Confirmed',
    })
    clearCart()
    setOrderPlaced(true)
    setLoading(false)
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="section-pad py-20 text-center">
        <h2 className="font-playfair text-3xl text-cream mb-4">Your cart is empty</h2>
        <Button as={Link} to="/shop">Shop Now</Button>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="section-pad py-20 flex flex-col items-center text-center max-w-lg mx-auto">
        <CheckCircle className="w-20 h-20 text-gold mb-6" />
        <h1 className="font-playfair text-4xl text-cream mb-3">Order Confirmed!</h1>
        <p className="text-gold font-medium mb-2">{orderNumber}</p>
        <p className="text-cream-muted leading-relaxed mb-8">
          Thank you for your order! We'll send a confirmation to{' '}
          <strong className="text-cream">{form.email}</strong> and our team will
          reach out via WhatsApp to arrange payment and delivery. 🌸
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button as={Link} to="/shop">Continue Shopping</Button>
          {user && (
            <Button as={Link} to="/account/orders" variant="outline">View Orders</Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="section-pad py-12">
      <h1 className="font-playfair text-4xl text-cream mb-2">Checkout</h1>
      <div className="w-16 h-px bg-gold mb-10" />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Shipping form */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="luxury-card p-6">
              <h2 className="font-playfair text-2xl text-cream mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} placeholder="Adaeze" />
                <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} placeholder="Okonkwo" />
                <Input label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="adaeze@email.com" containerClassName="sm:col-span-2" />
                <Input label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+234 800 000 0000" containerClassName="sm:col-span-2" />
                <Input label="Delivery Address" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="123 Victoria Island" containerClassName="sm:col-span-2" />
                <Input label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} placeholder="Lagos" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-cream-soft tracking-wide">State</label>
                  <select name="state" value={form.state} onChange={handleChange} className="w-full bg-dark-secondary border border-dark-border text-cream px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors">
                    <option value="">Select state</option>
                    {nigerianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <p className="text-xs text-red-400">{errors.state}</p>}
                </div>
              </div>
            </div>

            <div className="luxury-card p-6">
              <h2 className="font-playfair text-2xl text-cream mb-4">Payment</h2>
              <div className="bg-gold/5 border border-gold/20 p-4 flex items-center gap-3">
                <span className="text-2xl">🏦</span>
                <div>
                  <p className="text-cream text-sm font-medium">Bank Transfer / Paystack</p>
                  <p className="text-cream-muted text-xs mt-0.5">
                    Our team will contact you via WhatsApp with payment details after your order is confirmed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="luxury-card p-6 h-fit sticky top-24">
            <h2 className="font-playfair text-2xl text-cream mb-6">Your Order</h2>
            <div className="flex flex-col gap-3 mb-6">
              {items.map((item) => (
                <div key={item.key} className="flex justify-between text-sm">
                  <span className="text-cream-muted truncate mr-2">
                    {item.name} ({item.volume}) ×{item.quantity}
                  </span>
                  <span className="text-cream shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dark-border pt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-cream-muted">
                <span>Subtotal</span><span>{formatPrice(sub)}</span>
              </div>
              {disc > 0 && (
                <div className="flex justify-between text-gold">
                  <span>Discount</span><span>-{formatPrice(disc)}</span>
                </div>
              )}
              <div className="flex justify-between text-cream-muted">
                <span>Shipping</span><span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-cream font-semibold text-base pt-2 border-t border-dark-border">
                <span>Total</span><span className="text-gold">{formatPrice(tot)}</span>
              </div>
            </div>
            <Button type="submit" fullWidth size="lg" loading={loading} className="mt-6">
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
