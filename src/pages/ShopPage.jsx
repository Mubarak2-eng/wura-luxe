import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  SlidersHorizontal,
  ChevronRight,
  Search,
  X,
  Sparkles,
  Filter,
  Check,
  RotateCcw,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import { categories, scentProfiles } from '../data/categories'
import ProductGrid from '../components/product/ProductGrid'
import { formatPrice } from '../utils/helpers'

const priceRanges = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-20k', label: 'Under ₦20,000', min: 0, max: 20000 },
  { id: '20k-40k', label: '₦20,000 – ₦40,000', min: 20000, max: 40000 },
  { id: '40k-60k', label: '₦40,000 – ₦60,000', min: 40000, max: 60000 },
  { id: 'above-60k', label: '₦60,000 and Above', min: 60000, max: 999999 },
]

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [internalSearch, setInternalSearch] = useState('')
  const [displayCount, setDisplayCount] = useState(12)

  // URL query params
  const categoryParam = searchParams.get('category') || 'all'
  const scentParam = searchParams.get('scent') || 'all'
  const tagParam = searchParams.get('tag') || ''
  const searchParam = searchParams.get('search') || ''
  const priceParam = searchParams.get('price') || 'all'
  const sortParam = searchParams.get('sort') || 'featured'

  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly, setOnSaleOnly] = useState(false)

  // Sync internal search with query param
  useEffect(() => {
    if (searchParam) {
      setInternalSearch(searchParam)
    }
  }, [searchParam])

  // Active Category info
  const currentCategory = categories.find((c) => c.slug === categoryParam)

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products]

    // Search query filter
    const query = (searchParam || internalSearch).toLowerCase().trim()
    if (query) {
      list = list.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(query)
        const subMatch = (p.subtitle || '').toLowerCase().includes(query)
        const scentMatch = (p.scentProfile || '').toLowerCase().includes(query)
        const catMatch = p.category.toLowerCase().includes(query)
        const noteMatch =
          p.notes &&
          [...p.notes.top, ...p.notes.middle, ...p.notes.base].some((n) =>
            n.toLowerCase().includes(query)
          )
        return nameMatch || subMatch || scentMatch || catMatch || noteMatch
      })
    }

    // Category filter
    if (categoryParam !== 'all') {
      list = list.filter((p) => p.category === categoryParam)
    }

    // Scent family filter
    if (scentParam !== 'all') {
      list = list.filter((p) =>
        p.scentProfile?.toLowerCase().includes(scentParam.toLowerCase())
      )
    }

    // Special Tags
    if (tagParam === 'bestsellers') {
      list = list.filter((p) => p.bestSeller)
    } else if (tagParam === 'new-arrivals') {
      list = list.filter((p) => p.isNew)
    } else if (tagParam === 'sale') {
      list = list.filter((p) => p.onSale || (p.originalPrice && p.originalPrice > p.price))
    } else if (tagParam === 'affordable-luxury') {
      list = list.filter((p) => p.price <= 50000)
    }

    // Price range
    const selectedPriceRange = priceRanges.find((r) => r.id === priceParam)
    if (selectedPriceRange && selectedPriceRange.id !== 'all') {
      list = list.filter(
        (p) => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
      )
    }

    // In Stock
    if (inStockOnly) {
      list = list.filter((p) => p.inStock)
    }

    // On Sale Only
    if (onSaleOnly) {
      list = list.filter((p) => p.onSale || (p.originalPrice && p.originalPrice > p.price))
    }

    // Sort
    switch (sortParam) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default: // featured
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return list
  }, [
    categoryParam,
    scentParam,
    tagParam,
    searchParam,
    internalSearch,
    priceParam,
    sortParam,
    inStockOnly,
    onSaleOnly,
  ])

  const updateParam = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (!value || value === 'all') {
        next.delete(key)
      } else {
        next.set(key, value)
      }
      return next
    })
  }

  const handleClearAllFilters = () => {
    setSearchParams({})
    setInternalSearch('')
    setInStockOnly(false)
    setOnSaleOnly(false)
  }

  const hasActiveFilters =
    categoryParam !== 'all' ||
    scentParam !== 'all' ||
    priceParam !== 'all' ||
    Boolean(tagParam) ||
    Boolean(searchParam) ||
    Boolean(internalSearch) ||
    inStockOnly ||
    onSaleOnly

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      {/* ── Breadcrumb Navigation ── */}
      <div className="border-b border-[#E9DED0] bg-[#FCFAF6] py-3.5">
        <div className="section-pad flex items-center gap-2 text-xs text-[#7A726C]">
          <Link to="/" className="hover:text-[#211713] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-[#211713] transition-colors">
            Shop Fragrances
          </Link>
          {categoryParam !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#211713] font-semibold">
                {currentCategory?.name || categoryParam}
              </span>
            </>
          )}
          {scentParam !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#211713] font-semibold">{scentParam}</span>
            </>
          )}
        </div>
      </div>

      {/* ── Header Banner ── */}
      <div className="section-pad pt-10 pb-8 border-b border-[#E9DED0]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9DED0]/60 text-[#211713] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span>AUTHENTIC LUXURY PERFUMERY</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713] mb-3">
            {searchParam
              ? `Results for "${searchParam}"`
              : tagParam === 'bestsellers'
              ? 'The Bestseller Collection'
              : tagParam === 'new-arrivals'
              ? 'New Arrival Fragrance Drops'
              : tagParam === 'sale'
              ? 'Special Offers & Fragrance Sale'
              : currentCategory
              ? currentCategory.name
              : scentParam !== 'all'
              ? `${scentParam} Scent Family`
              : 'All Fragrances'}
          </h1>

          <p className="text-sm sm:text-base text-[#7A726C] font-light leading-relaxed">
            {currentCategory?.description ||
              'Explore authentic designer perfumes, concentrated Arabian attar oils, viral layering duos, and luminous body mists with long-lasting projection.'}
          </p>
        </div>
      </div>

      {/* ── Main Catalog Body ── */}
      <div className="section-pad py-8">
        
        {/* Controls Bar: Search within collection, Filter trigger, Sort dropdown */}
        <div className="bg-white p-4 rounded-xl border border-[#E9DED0] shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search within collection input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#7A726C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={internalSearch}
              onChange={(e) => setInternalSearch(e.target.value)}
              placeholder="Filter by name or note..."
              className="w-full bg-[#FAF6EF] border border-[#E9DED0] rounded-lg pl-9 pr-3 py-2 text-xs text-[#211713] focus:outline-none focus:border-[#C7A66A]"
            />
            {internalSearch && (
              <button
                onClick={() => setInternalSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A726C] hover:text-[#211713]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Count, Mobile Filter Trigger, Sort Select */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <span className="text-xs text-[#7A726C] font-medium hidden sm:inline">
              Showing <strong className="text-[#211713]">{filteredProducts.length}</strong> fragrances
            </span>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden btn-outline-espresso py-2 px-3.5 text-xs rounded flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters ? '• Active' : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7A726C] font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortParam}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="bg-[#FAF6EF] border border-[#E9DED0] rounded-lg px-3 py-2 text-xs font-semibold text-[#211713] focus:outline-none focus:border-[#C7A66A]"
              >
                <option value="featured">Featured Picks</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-[#FCFAF6] rounded-lg border border-[#E9DED0]">
            <span className="text-xs font-semibold text-[#7A726C]">Active Filters:</span>
            {categoryParam !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-white border border-[#E9DED0] px-2.5 py-1 rounded-full text-xs font-medium text-[#211713]">
                Category: {currentCategory?.shortName || categoryParam}
                <button onClick={() => updateParam('category', 'all')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {scentParam !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-white border border-[#E9DED0] px-2.5 py-1 rounded-full text-xs font-medium text-[#211713]">
                Scent: {scentParam}
                <button onClick={() => updateParam('scent', 'all')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceParam !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-white border border-[#E9DED0] px-2.5 py-1 rounded-full text-xs font-medium text-[#211713]">
                Price: {priceRanges.find((r) => r.id === priceParam)?.label}
                <button onClick={() => updateParam('price', 'all')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 bg-white border border-[#E9DED0] px-2.5 py-1 rounded-full text-xs font-medium text-[#211713]">
                In Stock Only
                <button onClick={() => setInStockOnly(false)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {onSaleOnly && (
              <span className="inline-flex items-center gap-1 bg-white border border-[#E9DED0] px-2.5 py-1 rounded-full text-xs font-medium text-[#211713]">
                On Sale Only
                <button onClick={() => setOnSaleOnly(false)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={handleClearAllFilters}
              className="text-xs font-bold text-[#C7A66A] hover:underline ml-auto flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
        )}

        {/* Layout Grid: Desktop Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block bg-white p-6 rounded-xl border border-[#E9DED0] shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DED0]">
              <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[#211713]">
                Filter Catalog
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={handleClearAllFilters}
                  className="text-[11px] font-semibold text-[#C7A66A] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Categories Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#211713] mb-2.5">
                Categories
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => updateParam('category', 'all')}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                    categoryParam === 'all'
                      ? 'bg-[#FAF6EF] font-bold text-[#211713]'
                      : 'text-[#393431] hover:bg-[#FCFAF6]'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[11px] text-[#7A726C]">{products.length}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => updateParam('category', cat.slug)}
                    className={`w-full text-left py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                      categoryParam === cat.slug
                        ? 'bg-[#FAF6EF] font-bold text-[#211713]'
                        : 'text-[#393431] hover:bg-[#FCFAF6]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-[#7A726C]">
                      {products.filter((p) => p.category === cat.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scent Families Filter */}
            <div className="pt-4 border-t border-[#E9DED0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#211713] mb-2.5">
                Scent Family
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => updateParam('scent', 'all')}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
                    scentParam === 'all'
                      ? 'bg-[#FAF6EF] font-bold text-[#211713]'
                      : 'text-[#393431] hover:bg-[#FCFAF6]'
                  }`}
                >
                  All Scent Profiles
                </button>
                {scentProfiles.map((scent) => (
                  <button
                    key={scent.id}
                    onClick={() => updateParam('scent', scent.name)}
                    className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
                      scentParam === scent.name
                        ? 'bg-[#FAF6EF] font-bold text-[#211713]'
                        : 'text-[#393431] hover:bg-[#FCFAF6]'
                    }`}
                  >
                    {scent.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-[#E9DED0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#211713] mb-2.5">
                Price Range
              </h4>
              <div className="space-y-1 text-xs">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => updateParam('price', range.id)}
                    className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
                      priceParam === range.id
                        ? 'bg-[#FAF6EF] font-bold text-[#211713]'
                        : 'text-[#393431] hover:bg-[#FCFAF6]'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability & Offers */}
            <div className="pt-4 border-t border-[#E9DED0] space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#C7A66A]"
                />
                <span className="text-[#211713]">In Stock Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="accent-[#C7A66A]"
                />
                <span className="text-[#211713]">On Sale / Discounted</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-8">
            <ProductGrid
              products={filteredProducts.slice(0, displayCount)}
              emptyTitle="No matching fragrances found"
              emptyMessage="We couldn't find any fragrances matching your current filter selection. Try removing some filters or searching for different notes."
              onResetFilters={handleClearAllFilters}
            />

            {/* Load More Button if more products exist */}
            {filteredProducts.length > displayCount && (
              <div className="text-center pt-6">
                <button
                  onClick={() => setDisplayCount((prev) => prev + 8)}
                  className="btn-espresso px-8 py-3.5 text-xs font-bold"
                >
                  Load More Fragrances ({filteredProducts.length - displayCount} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Slide-Over Bottom Sheet ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#211713]/60 backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl shadow-2xl p-6 overflow-y-auto flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E9DED0]">
                <h3 className="font-serif font-bold text-base text-[#211713]">
                  Filter Fragrances
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-[#7A726C]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-6 flex-1 text-xs">
                {/* Categories */}
                <div>
                  <h4 className="font-bold uppercase text-[#211713] mb-2">Category</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => updateParam('category', 'all')}
                      className={`p-2 rounded border text-left ${
                        categoryParam === 'all'
                          ? 'border-[#211713] bg-[#211713] text-[#FAF6EF]'
                          : 'border-[#E9DED0] bg-[#FAF6EF] text-[#393431]'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateParam('category', cat.slug)}
                        className={`p-2 rounded border text-left truncate ${
                          categoryParam === cat.slug
                            ? 'border-[#211713] bg-[#211713] text-[#FAF6EF]'
                            : 'border-[#E9DED0] bg-[#FAF6EF] text-[#393431]'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scent Families */}
                <div>
                  <h4 className="font-bold uppercase text-[#211713] mb-2">Scent Family</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {scentProfiles.map((scent) => (
                      <button
                        key={scent.id}
                        onClick={() => updateParam('scent', scent.name)}
                        className={`p-2 rounded border text-left truncate ${
                          scentParam === scent.name
                            ? 'border-[#211713] bg-[#211713] text-[#FAF6EF]'
                            : 'border-[#E9DED0] bg-[#FAF6EF] text-[#393431]'
                        }`}
                      >
                        {scent.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-bold uppercase text-[#211713] mb-2">Price Range</h4>
                  <div className="grid grid-cols-1 gap-1.5">
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => updateParam('price', range.id)}
                        className={`p-2 rounded border text-left ${
                          priceParam === range.id
                            ? 'border-[#211713] bg-[#211713] text-[#FAF6EF]'
                            : 'border-[#E9DED0] bg-[#FAF6EF] text-[#393431]'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E9DED0] flex gap-3">
                <button
                  onClick={handleClearAllFilters}
                  className="btn-outline-espresso flex-1 py-3 text-xs"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="btn-espresso flex-1 py-3 text-xs font-bold"
                >
                  Show ({filteredProducts.length}) Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
