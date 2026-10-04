import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return
    setLoading(true)
    try {
      const result = await login({ email: form.email, password: form.password })
      if (result?.success) {
        toast.success('Welcome back!')
        navigate('/account/profile')
      } else {
        toast.error('Invalid email or password.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = () => {
    setForm({ email: 'demo@mamafragrance.com', password: 'demo1234' })
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">

        {/* Brand mark */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1.5 group">
            <Sparkles className="w-4 h-4 text-[#C7A66A]" />
            <span className="font-serif font-bold text-xl tracking-widest text-[#211713]">
              MAMA FRAGRANCE
            </span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#211713] mt-5 mb-1">Welcome back</h1>
          <p className="text-sm text-[#7A726C] font-light">Sign in to your account to continue</p>
        </div>

        <div className="bg-white border border-[#E9DED0] rounded-2xl shadow-sm p-7 sm:p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-xs font-semibold text-[#393431] mb-1.5">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg text-sm text-[#211713] placeholder:text-[#B0A89E] focus:outline-none focus:border-[#C7A66A] focus:ring-1 focus:ring-[#C7A66A]/20 transition-colors"
                placeholder="you@example.com"
              />
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
                  autoComplete="current-password"
                  className="w-full px-4 py-3 bg-[#FAF6EF] border border-[#E9DED0] rounded-lg text-sm text-[#211713] placeholder:text-[#B0A89E] focus:outline-none focus:border-[#C7A66A] focus:ring-1 focus:ring-[#C7A66A]/20 transition-colors pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0A89E] hover:text-[#C7A66A] transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-espresso py-3.5 text-sm font-bold rounded disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'SIGN IN'}
            </button>
          </form>

          {/* Demo credentials helper */}
          <div className="rounded-lg border border-[#C7A66A]/40 bg-[#C7A66A]/5 p-3.5">
            <p className="text-xs text-[#393431] font-semibold mb-1">Demo account available</p>
            <p className="text-[11px] text-[#7A726C] mb-2">
              Email: <span className="font-mono text-[#211713]">demo@mamafragrance.com</span><br />
              Password: <span className="font-mono text-[#211713]">demo1234</span>
            </p>
            <button
              onClick={fillDemo}
              className="text-[11px] font-semibold text-[#C7A66A] hover:underline"
            >
              Fill demo credentials →
            </button>
          </div>

          <p className="text-center text-sm text-[#7A726C]">
            Don't have an account?{' '}
            <Link to="/account/signup" className="font-semibold text-[#211713] hover:text-[#C7A66A] transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
