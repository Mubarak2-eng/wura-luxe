import ProductCard from './ProductCard'

export default function ProductGrid({
  products = [],
  className = '',
  emptyTitle = 'No fragrances found',
  emptyMessage = 'Try adjusting your filters or search terms to find what you are looking for.',
  onResetFilters,
}) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#E9DED0] max-w-lg mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-[#FAF6EF] border border-[#E9DED0] flex items-center justify-center mx-auto mb-4 text-[#C7A66A] font-serif text-xl font-bold">
          MF
        </div>
        <h3 className="font-serif text-xl font-bold text-[#211713] mb-2">
          {emptyTitle}
        </h3>
        <p className="text-xs text-[#7A726C] mb-6 leading-relaxed">
          {emptyMessage}
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="btn-espresso text-xs px-6 py-2.5"
          >
            Clear All Filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
