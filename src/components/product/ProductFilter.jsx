import { categories } from '../../data/categories'
import clsx from 'clsx'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
]

export default function ProductFilter({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  productCount,
}) {
  return (
    <div className="flex flex-col gap-6 mb-10">
      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={clsx(
              'px-4 py-2 text-xs tracking-widest uppercase border transition-all duration-200',
              activeCategory === cat.id
                ? 'bg-gold text-dark border-gold font-semibold'
                : 'border-dark-border text-cream-muted hover:border-gold/50 hover:text-gold'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort + count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-cream-muted">
          <span className="text-gold font-medium">{productCount}</span>{' '}
          {productCount === 1 ? 'product' : 'products'}
        </p>

        <div className="flex items-center gap-3">
          <span className="text-sm text-cream-muted hidden sm:block">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-dark-card border border-dark-border text-cream text-sm px-3 py-2 focus:outline-none focus:border-gold transition-colors"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
