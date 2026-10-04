import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ChevronDown, ChevronUp, CheckCircle, Clock, Truck, ShoppingBag } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const STATUS_STYLES = {
  Delivered: 'bg-green-50 text-green-700 border-green-200',
  Dispatched: 'bg-blue-50 text-blue-700 border-blue-200',
  Processing: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Cancelled: 'bg-red-50 text-red-700 border-red-200',
  'Out for Delivery': 'bg-purple-50 text-purple-700 border-purple-200',
}

const STATUS_ICONS = {
  Delivered: CheckCircle,
  Dispatched: Truck,
  Processing: Clock,
}

function OrderCard({ order }) {
  const [open, setOpen] = useState(false)
  const Icon = STATUS_ICONS[order.status] || Package
  const statusStyle = STATUS_STYLES[order.status] || 'bg-gray-50 text-gray-700 border-gray-200'

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm overflow-hidden">
      {/* Header row */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#FCFAF6] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FAF6EF] border border-[#E9DED0] flex items-center justify-center">
            <Package className="w-4 h-4 text-[#C7A66A]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#211713]">Order #{order.id}</p>
            <p className="text-[11px] text-[#7A726C]">{orderDate} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${statusStyle}`}>
            <Icon className="w-3 h-3" />
            {order.status}
          </span>
          <span className="text-sm font-bold text-[#211713]">₦{order.total?.toLocaleString()}</span>
          {open ? <ChevronUp className="w-4 h-4 text-[#7A726C]" /> : <ChevronDown className="w-4 h-4 text-[#7A726C]" />}
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-[#E9DED0] px-5 py-5 space-y-5">
          {/* Items */}
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl border border-[#E9DED0] overflow-hidden flex-shrink-0 bg-[#FAF6EF]">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#211713] truncate">{item.name}</p>
                  {item.volume && <p className="text-xs text-[#7A726C]">{item.volume}</p>}
                  <p className="text-xs text-[#7A726C]">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-[#211713]">₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          {order.timeline && order.timeline.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#C7A66A] mb-3">Order Timeline</p>
              <div className="space-y-2">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${step.done ? 'bg-[#C7A66A]' : 'bg-[#E9DED0]'}`}>
                      <div className={`w-2 h-2 rounded-full ${step.done ? 'bg-white' : 'bg-[#B0A89E]'}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${step.done ? 'text-[#211713]' : 'text-[#B0A89E]'}`}>{step.title}</p>
                      {step.time && <p className="text-[10px] text-[#7A726C]">{step.time}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div>
              <p className="text-[#7A726C] mb-0.5">Payment Method</p>
              <p className="font-semibold text-[#211713]">{order.paymentMethod || '—'}</p>
            </div>
            <div>
              <p className="text-[#7A726C] mb-0.5">Payment Status</p>
              <p className="font-semibold text-[#211713]">{order.paymentStatus || '—'}</p>
            </div>
            {order.shippingAddress && (
              <div className="col-span-2">
                <p className="text-[#7A726C] mb-0.5">Delivered to</p>
                <p className="font-semibold text-[#211713]">{order.shippingAddress}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function OrderHistoryPage() {
  const { orders = [], user } = useAuthStore()

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      <div className="bg-white border-b border-[#E9DED0]">
        <div className="section-pad py-3 flex items-center gap-2 text-xs text-[#7A726C]">
          <Link to="/" className="hover:text-[#211713]">Home</Link>
          <span>/</span>
          <Link to="/account/profile" className="hover:text-[#211713]">My Account</Link>
          <span>/</span>
          <span className="text-[#211713] font-semibold">Orders</span>
        </div>
      </div>

      <div className="section-pad py-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-5 h-5 text-[#C7A66A]" />
          <h1 className="font-serif text-2xl font-bold text-[#211713]">Order History</h1>
          {orders.length > 0 && (
            <span className="ml-auto bg-[#FAF6EF] border border-[#E9DED0] px-3 py-1 rounded-full text-xs font-bold text-[#393431]">
              {orders.length} order{orders.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm py-20 text-center">
            <ShoppingBag className="w-10 h-10 text-[#E9DED0] mx-auto mb-4" />
            <p className="font-serif text-lg font-bold text-[#211713] mb-2">No orders yet</p>
            <p className="text-sm text-[#7A726C] mb-6 font-light">Your completed orders will appear here.</p>
            <Link to="/shop" className="btn-espresso px-8 py-3 text-xs font-bold rounded">
              DISCOVER FRAGRANCES
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
