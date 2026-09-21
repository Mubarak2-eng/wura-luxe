import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Fuse from 'fuse.js'
import { products } from '../data/products'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilter from '../components/product/ProductFilter'

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || 'all'
  )
  const [sortBy, setSortBy] = useState('featured')
  const searchQuery = searchParams.get('search') || ''

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = [...products]

    // Search
    if (searchQuery) {
      const fuse = new Fuse(list, {
        keys: ['name', 'description', 'fragranceFamily', 'category'],
        threshold: 0.4,
      })
      list = fuse.search(searchQuery).map((r) => r.item)
    }

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew))
        break
      default: // featured
        list = list.filter((p) => p.featured).concat(list.filter((p) => !p.featured))
    }

    return list
  }, [activeCategory, sortBy, searchQuery])

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (cat === 'all') next.delete('category')
      else next.set('category', cat)
      return next
    })
  }

  return (
    <div className="section-pad py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
          Our Store
        </p>
        <h1 className="font-playfair text-4xl lg:text-5xl text-cream mb-2">
          {searchQuery ? `Results for "${searchQuery}"` : 'All Fragrances'}
        </h1>
        <div className="w-16 h-px bg-gold" />
      </div>

      <ProductFilter
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
        productCount={filtered.length}
      />

      <ProductGrid products={filtered} />
    </div>
  )
}
