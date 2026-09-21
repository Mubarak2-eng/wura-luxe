import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { User, Package, Heart, LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuthStore()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })
  const [loading, setLoading] = useState(false)

  if (!user) return <Navigate to="/account/login" replace />

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    updateProfile(form)
    toast.success('Profile updated!')
    setLoading(false)
  }

  return (
    <div className="section-pad py-12">
      <h1 className="font-playfair text-4xl text-cream mb-2">My Account</h1>
      <div className="w-16 h-px bg-gold mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar */}
        <aside className="luxury-card p-6 h-fit">
          <div className="flex flex-col items-center text-center gap-3 mb-6 pb-6 border-b border-dark-border">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full border-2 border-gold"
            />
            <div>
              <p className="font-playfair text-cream text-lg">{user.name}</p>
              <p className="text-cream-muted text-xs">{user.email}</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {[
              { to: '/account/profile', icon: User, label: 'Profile' },
              { to: '/account/orders', icon: Package, label: 'My Orders' },
              { to: '/account/wishlist', icon: Heart, label: 'Wishlist' },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-cream-muted hover:text-gold hover:bg-dark-hover transition-colors"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <button
              onClick={() => logout()}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-dark-hover transition-colors mt-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Profile form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="luxury-card p-8">
            <h2 className="font-playfair text-2xl text-cream mb-6">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                containerClassName="sm:col-span-2"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
              />
            </div>
            <Button
              type="submit"
              loading={loading}
              className="mt-6"
            >
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
