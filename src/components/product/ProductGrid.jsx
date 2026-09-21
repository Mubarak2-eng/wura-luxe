import ProductCard from './ProductCard'
import { PackageSearch } from 'lucide-react'

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageSearch className="w-16 h-16 text-dark-border mb-4" />
        <h3 className="font-playfair text-2xl text-cream mb-2">
          No products found
        </h3>
        <p className="text-cream-muted text-sm max-w-sm">
          Try adjusting your filters or search term to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
