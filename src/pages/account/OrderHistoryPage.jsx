import { Link, Navigate } from 'react-router-dom'
import { Package, ChevronRight } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { formatPrice, formatDate } from '../../utils/helpers'
import Button from '../../components/ui/Button'

const statusColors = {
  Confirmed: 'text-emerald-400 bg-emerald-900/30 border-emerald-800',
  Processing: 'text-gold bg-gold/10 border-gold/30',
  Shipped: 'text-blue-400 bg-blue-900/30 border-blue-800',
  Delivered: 'text-cream-muted bg-dark-card border-dark-border',
}

export default function OrderHistoryPage() {
  const { user, orders } = useAuthStore()

  if (!user) return <Navigate to="/account/login" replace />

  return (
    <div className="section-pad py-12">
      <h1 className="font-playfair text-4xl text-cream mb-2">My Orders</h1>
      <div className="w-16 h-px bg-gold mb-10" />

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Package className="w-16 h-16 text-dark-border mb-5" />
          <h2 className="font-playfair text-2xl text-cream mb-2">
            No orders yet
          </h2>
          <p className="text-cream-muted mb-8 max-w-sm">
            Your order history will appear here once you make your first purchase.
          </p>
          <Button as={Link} to="/shop">
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-3xl">
          {orders.map((order) => (
            <div key={order.orderNumber} className="luxury-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-cream font-medium">{order.orderNumber}</p>
                  <p className="text-cream-muted text-xs mt-0.5">
                    {formatDate(order.date)}
                  </p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 border ${
                    statusColors[order.status] || statusColors.Confirmed
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                {order.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-cream-muted">
                      {item.name} ({item.volume}) ×{item.quantity}
                    </span>
                    <span className="text-cream">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-dark-border">
                <span className="text-sm text-cream-muted">Total</span>
                <span className="text-gold font-semibold">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
