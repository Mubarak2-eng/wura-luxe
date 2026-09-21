import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup, isLoading } = useAuthStore()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
    }
  }

  const validate = () => {
    const e = {}
    if (!form.name) e.name = 'Full name is required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    const result = await signup(form)
    if (result.success) {
      toast.success('Welcome to the Wura family! 🌸')
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
            Create Your Account
          </h1>
          <p className="text-cream-muted text-sm">
            Join the Wura circle and enjoy exclusive benefits
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="luxury-card p-8 flex flex-col gap-5"
        >
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Adaeze Okonkwo"
            error={errors.name}
            required
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="adaeze@email.com"
            error={errors.email}
            required
          />
          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              error={errors.password}
              hint="Must be at least 6 characters"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 bottom-3 text-cream-muted hover:text-gold transition-colors"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <Input
            label="Confirm Password"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.confirm}
            required
          />

          <Button
            type="submit"
            loading={isLoading}
            fullWidth
            size="lg"
            className="mt-2"
          >
            Create Account
          </Button>

          <p className="text-center text-sm text-cream-muted">
            Already have an account?{' '}
            <Link
              to="/account/login"
              className="text-gold hover:text-gold-light transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
