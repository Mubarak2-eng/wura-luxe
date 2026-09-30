import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Fuse from 'fuse.js'
import { products } from '../data/products'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilter from '../components/product/ProductFilter'
import { Sparkles } from 'lucide-react'

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get('category') || 'all'
  )
  const [sortBy, setSortBy] = useState('featured')
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = [...products]

    if (searchQuery) {
      const fuse = new Fuse(list, {
        keys: ['name', 'description', 'fragranceFamily', 'category', 'subtitle'],
        threshold: 0.4,
      })
      list = fuse.search(searchQuery).map((r) => r.item)
    }

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory)
    }

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
      default:
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
    <div className="section-pad py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="cyber-badge mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
          <span>AUTHENTIC FRAGRANCE VAULT</span>
        </div>
        <h1 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3">
          {searchQuery ? `Search: "${searchQuery}"` : 'The Fragrance Vault'}
        </h1>
        <p className="font-cinzel text-gold-light italic text-lg sm:text-xl">
          "Smell as good as you look!"
        </p>
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
