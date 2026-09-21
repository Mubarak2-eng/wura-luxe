import clsx from 'clsx'

const variants = {
  gold: 'bg-gold/20 text-gold border border-gold/30',
  new: 'bg-emerald-900/30 text-emerald-400 border border-emerald-800',
  sale: 'bg-red-900/30 text-red-400 border border-red-800',
  sold: 'bg-dark-border text-cream-muted border border-dark-border',
  category: 'bg-dark-card text-cream-muted border border-dark-border',
}

export default function Badge({ children, variant = 'gold', className = '' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
