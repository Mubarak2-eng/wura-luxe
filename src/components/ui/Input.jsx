import clsx from 'clsx'

export default function Input({
  label,
  error,
  hint,
  className = '',
  containerClassName = '',
  ...props
}) {
  return (
    <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-cream-soft tracking-wide">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full bg-dark-secondary border text-cream placeholder-cream-muted px-4 py-3 text-sm',
          'transition-colors duration-200 focus:outline-none focus:ring-1',
          error
            ? 'border-red-700 focus:border-red-500 focus:ring-red-500/30'
            : 'border-dark-border focus:border-gold focus:ring-gold/30',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-cream-muted">{hint}</p>}
    </div>
  )
}
