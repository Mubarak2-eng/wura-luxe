import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const navigate = useNavigate()
  const signup = useAuthStore((s) => s.signup)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      const result = await signup({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        password: form.password,
      })
      if (result?.success) {
        toast.success('Account created! Welcome to Mama Fragrance.')
        navigate('/account/profile')
      } else {
        toast.error('An account with this email already exists.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg text-sm text-[#211713] placeholder:text-[#B0A89E] focus:outline-none focus:border-[#C7A66A] focus:ring-1 focus:ring-[#C7A66A]/20 transition-colors'

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1.5 group">
            <Sparkles className="w-4 h-4 text-[#C7A66A]" />
            <span className="font-serif font-bold text-xl tracking-widest text-[#211713]">
              MAMA FRAGRANCE
            </span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#211713] mt-5 mb-1">Create an Account</h1>
          <p className="text-sm text-[#7A726C] font-light">Join Mama Fragrance for exclusive access and order tracking.</p>
        </div>

        <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm p-7 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required className={inputClass} placeholder="Ada" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#393431] mb-1.5">Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required className={inputClass} placeholder="Okonkwo" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#393431] mb-1.5">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" className={inputClass} placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#393431] mb-1.5">Phone Number</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+234 800 0000 000" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#393431] mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className={`${inputClass} pr-10`}
                  placeholder="Min. 8 characters"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0A89E] hover:text-[#C7A66A] transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#393431] mb-1.5">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Re-enter password"
              />
            </div>

            <p className="text-[11px] text-[#7A726C] leading-relaxed">
              By creating an account you agree to our{' '}
              <Link to="/contact" className="underline text-[#211713]">Terms & Conditions</Link>{' '}
              and{' '}
              <Link to="/contact" className="underline text-[#211713]">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-espresso py-3.5 text-sm font-bold rounded disabled:opacity-70"
            >
              {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="text-center text-sm text-[#7A726C] mt-5">
            Already have an account?{' '}
            <Link to="/account/login" className="font-semibold text-[#211713] hover:text-[#C7A66A] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
