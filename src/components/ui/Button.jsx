import clsx from 'clsx'

const variants = {
  primary:
    'bg-gold text-dark font-semibold hover:bg-gold-light active:bg-gold-dark',
  outline:
    'border border-gold text-gold hover:bg-gold hover:text-dark',
  ghost:
    'text-cream hover:text-gold hover:bg-white/5',
  dark:
    'bg-dark-card border border-dark-border text-cream hover:border-gold/40 hover:text-gold',
  danger:
    'bg-red-900/30 border border-red-800 text-red-400 hover:bg-red-900/50',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
  icon: 'p-2',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  fullWidth = false,
  as: Tag = 'button',
  ...props
}) {
  return (
    <Tag
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-none tracking-wider transition-all duration-200 cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-gold/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading…
        </>
      ) : (
        children
      )}
    </Tag>
  )
}
