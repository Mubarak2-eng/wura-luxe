import { Star } from 'lucide-react'
import clsx from 'clsx'

export default function StarRating({
  rating = 0,
  max = 5,
  size = 'sm',
  showCount = false,
  count = 0,
}) {
  const starSizes = { sm: 'w-3.5 h-3.5', md: 'w-5 h-5', lg: 'w-6 h-6' }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating)
          const partial = !filled && i < rating
          return (
            <Star
              key={i}
              className={clsx(
                starSizes[size],
                filled
                  ? 'text-gold fill-gold'
                  : partial
                  ? 'text-gold fill-gold/50'
                  : 'text-dark-border fill-dark-border'
              )}
            />
          )
        })}
      </div>
      {showCount && (
        <span className="text-xs text-cream-muted">
          {rating.toFixed(1)} ({count})
        </span>
      )}
    </div>
  )
}
