import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(form)
    if (result.success) {
      toast.success('Welcome back! 🌸')
      navigate('/')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center section-pad py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex flex-col items-center mb-8">
            <span className="font-playfair text-3xl font-bold text-gold">
              Wura Luxe
            </span>
            <span className="text-[10px] tracking-[0.3em] text-cream-muted uppercase">
              &amp; Scents
            </span>
          </Link>
          <h1 className="font-playfair text-3xl text-cream mb-2">
            Welcome Back
          </h1>
          <p className="text-cream-muted text-sm">
            Sign in to your account to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="luxury-card p-8 flex flex-col gap-5"
        >
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="adaeze@email.com"
            required
          />
          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 bottom-3 text-cream-muted hover:text-gold transition-colors"
            >
              {showPass ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            loading={isLoading}
            fullWidth
            size="lg"
            className="mt-2"
          >
            Sign In
          </Button>

          <p className="text-center text-sm text-cream-muted">
            Don't have an account?{' '}
            <Link
              to="/account/signup"
              className="text-gold hover:text-gold-light transition-colors"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
