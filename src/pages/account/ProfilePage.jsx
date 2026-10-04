import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, MapPin, Edit2, Save, X, Package, Heart, LogOut, ShoppingBag } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

const NAV = [
  { label: 'Profile', icon: User, href: '/account/profile' },
  { label: 'Orders', icon: Package, href: '/account/orders' },
  { label: 'Wishlist', icon: Heart, href: '/account/wishlist' },
]

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, updateProfile, logout } = useAuthStore()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
  })

  if (!user) {
    navigate('/account/login')
    return null
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSave = () => {
    updateProfile(form)
    setEditing(false)
    toast.success('Profile updated!')
  }

  const handleLogout = () => {
    logout()
    toast.success('You have been signed out.')
    navigate('/')
  }

  const inputClass =
    'w-full px-4 py-2.5 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg text-sm text-[#211713] focus:outline-none focus:border-[#C7A66A] focus:ring-1 focus:ring-[#C7A66A]/20 transition-colors disabled:bg-[#F0EBE4] disabled:text-[#B0A89E]'

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      {/* Top nav */}
      <div className="bg-white border-b border-[#E9DED0]">
        <div className="section-pad py-3 flex items-center gap-2 text-xs text-[#7A726C]">
          <Link to="/" className="hover:text-[#211713]">Home</Link>
          <span>/</span>
          <span className="text-[#211713] font-semibold">My Account</span>
        </div>
      </div>

      <div className="section-pad py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-[#E9DED0] rounded-2xl p-5 text-center mb-4 shadow-sm">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
              className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-[#E9DED0] object-cover"
            />
            <p className="font-serif font-bold text-[#211713]">{user.name}</p>
            <p className="text-xs text-[#7A726C] mt-0.5 truncate">{user.email}</p>
          </div>

          <nav className="bg-white border border-[#E9DED0] rounded-2xl overflow-hidden shadow-sm">
            {NAV.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                to={href}
                className={`flex items-center gap-3 px-5 py-3.5 text-sm font-semibold border-b border-[#F0EBE4] last:border-0 transition-colors ${
                  href === '/account/profile'
                    ? 'bg-[#FAF6EF] text-[#C7A66A]'
                    : 'text-[#393431] hover:text-[#211713] hover:bg-[#FAF6EF]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Personal info */}
          <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E9DED0]">
              <div className="flex items-center gap-2 text-[#211713]">
                <User className="w-4 h-4 text-[#C7A66A]" />
                <h2 className="font-serif font-bold text-lg">Personal Information</h2>
              </div>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#C7A66A] hover:text-[#211713] transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-1 text-xs font-semibold text-[#7A726C] hover:text-[#393431] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 text-xs font-semibold text-[#C7A66A] hover:text-[#211713] transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} disabled={!editing} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} disabled={!editing} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} disabled={!editing} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">State</label>
                <input name="state" value={form.state} onChange={handleChange} disabled={!editing} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-[#E9DED0] text-[#211713]">
              <MapPin className="w-4 h-4 text-[#C7A66A]" />
              <h2 className="font-serif font-bold text-lg">Default Delivery Address</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">Street Address</label>
                <input name="address" value={form.address} onChange={handleChange} disabled={!editing} className={inputClass} placeholder="Enter your street address" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">City</label>
                <input name="city" value={form.city} onChange={handleChange} disabled={!editing} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">State</label>
                <input name="state" value={form.state} onChange={handleChange} disabled={!editing} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/account/orders" className="bg-white border border-[#E9DED0] rounded-2xl p-5 shadow-sm hover:shadow-luxury hover:border-[#C7A66A] transition-all group flex items-center gap-4">
              <div className="w-10 h-10 bg-[#FAF6EF] rounded-xl flex items-center justify-center border border-[#E9DED0] group-hover:border-[#C7A66A]">
                <ShoppingBag className="w-5 h-5 text-[#C7A66A]" />
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-[#211713]">My Orders</p>
                <p className="text-xs text-[#7A726C]">View & track orders</p>
              </div>
            </Link>
            <Link to="/account/wishlist" className="bg-white border border-[#E9DED0] rounded-2xl p-5 shadow-sm hover:shadow-luxury hover:border-[#C7A66A] transition-all group flex items-center gap-4">
              <div className="w-10 h-10 bg-[#FAF6EF] rounded-xl flex items-center justify-center border border-[#E9DED0] group-hover:border-[#C7A66A]">
                <Heart className="w-5 h-5 text-[#C7A66A]" />
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-[#211713]">Wishlist</p>
                <p className="text-xs text-[#7A726C]">Saved fragrances</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
