import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../../data/products'
import { formatPrice } from '../../utils/helpers'
import { useCartStore } from '../../store/cartStore'
import toast from 'react-hot-toast'

const popularSearches = [
  'Shiyaaka Gold',
  'Soirée & Cloud Candy',
  'Khamrah Amber',
  'Ashantee Trio',
  'Club Noir',
  'White Musk Attar',
  'Rouge 540 Mist',
  'Yara Rose',
]

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  // Real-time search filter
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const q = query.toLowerCase().trim()
    const filtered = products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q)
      const matchSubtitle = (p.subtitle || '').toLowerCase().includes(q)
      const matchCategory = p.category.toLowerCase().includes(q)
      const matchScent = (p.scentProfile || '').toLowerCase().includes(q)
      const matchNotes =
        p.notes &&
        [...p.notes.top, ...p.notes.middle, ...p.notes.base].some((n) =>
          n.toLowerCase().includes(q)
        )
      return matchName || matchSubtitle || matchCategory || matchScent || matchNotes
    })
    setResults(filtered)
  }, [query])

  const handleSelectProduct = (slug) => {
    onClose()
    navigate(`/product/${slug}`)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onClose()
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleQuickAdd = (e, product) => {
    e.stopPropagation()
    addItem(product, product.volumes[0], 1)
    toast.success(`Added ${product.name} to bag!`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#211713]/60 backdrop-blur-sm">
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FAF6EF] rounded-xl shadow-2xl border border-[#E9DED0] overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3 px-6 py-5 border-b border-[#E9DED0] bg-[#FCFAF6]"
            >
              <Search className="w-5 h-5 text-[#C7A66A] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search perfumes, brands, notes (e.g. vanilla, oud)..."
                className="w-full bg-transparent text-[#211713] placeholder-[#7A726C] text-base focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-[#7A726C] hover:text-[#211713] hover:bg-[#E9DED0]/50"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-xs uppercase tracking-wider font-semibold text-[#7A726C] hover:text-[#211713] ml-2"
              >
                Close
              </button>
            </form>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E9DED0]">
              {query.trim() === '' ? (
                /* Suggested / Trending Searches */
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7A726C]">
                      Popular Searches
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#E9DED0]/60 text-[#393431] hover:bg-[#C7A66A] hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#E9DED0]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7A726C] block mb-3">
                      Browse Scent Families
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { label: 'Fresh & Citrus', scent: 'Fresh & Citrus' },
                        { label: 'Floral & Romantic', scent: 'Floral & Romantic' },
                        { label: 'Sweet & Gourmand', scent: 'Sweet & Gourmand' },
                        { label: 'Woody & Earthy', scent: 'Woody & Earthy' },
                        { label: 'Amber & Spicy', scent: 'Amber & Spicy' },
                        { label: 'Clean & Musky', scent: 'Clean & Musky' },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            onClose()
                            navigate(`/shop?scent=${encodeURIComponent(item.scent)}`)
                          }}
                          className="text-left text-xs font-medium p-2.5 rounded-lg border border-[#E9DED0] hover:border-[#C7A66A] hover:bg-[#FCFAF6] transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length > 0 ? (
                /* Matching Products List */
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7A726C]">
                      {results.length} Product{results.length > 1 ? 's' : ''} Found
                    </span>
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs text-[#C7A66A] hover:underline font-semibold flex items-center gap-1"
                    >
                      View All Results <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {results.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-[#FCFAF6] border border-transparent hover:border-[#E9DED0] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-lg bg-white border border-[#E9DED0]"
                        />
                        <div>
                          <p className="text-[10px] uppercase font-semibold tracking-wider text-[#C7A66A]">
                            {product.subtitle || product.gender}
                          </p>
                          <h4 className="font-serif font-bold text-sm text-[#211713] group-hover:text-[#C7A66A] transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs font-bold text-[#211713] mt-0.5">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="p-2 rounded-lg bg-[#FAF6EF] hover:bg-[#C7A66A] hover:text-white border border-[#E9DED0] text-[#211713] transition-colors"
                          title="Add to bag"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty Results State */
                <div className="text-center py-10">
                  <p className="font-serif text-lg font-bold text-[#211713] mb-1">
                    No matching fragrances found for "{query}"
                  </p>
                  <p className="text-xs text-[#7A726C] max-w-sm mx-auto mb-6">
                    Try searching for specific notes like "vanilla", "rose", "oud", or browse our curated collections.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      navigate('/shop')
                    }}
                    className="btn-champagne text-xs px-5 py-2.5"
                  >
                    Explore All Fragrances
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
