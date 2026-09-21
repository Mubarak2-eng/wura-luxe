import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'

const collectionImages = {
  edp: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=85',
  edt: 'https://images.unsplash.com/photo-1607006483224-bc2d5b65d636?w=800&q=85',
  oil: 'https://images.unsplash.com/photo-1621243804936-775306a8f2e3?w=800&q=85',
  mist: 'https://images.unsplash.com/photo-1563170351-be54b573ab31?w=800&q=85',
  candle: 'https://images.unsplash.com/photo-1603905219403-0dbe4b64a5c1?w=800&q=85',
  gift: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=800&q=85',
}

export default function FeaturedCollections() {
  const cols = categories.filter((c) => c.id !== 'all')

  return (
    <section className="section-pad py-24 radiant-bg">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="eyebrow">Browse</span>
        <h2 className="font-playfair text-5xl lg:text-6xl text-cream mt-4 mb-5">
          Our <span className="gold-text italic">Collections</span>
        </h2>
        <div className="gold-divider" />
      </div>

      {/* Mosaic grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[200px] lg:auto-rows-[220px]">
        {cols.map((cat, i) => {
          // Make first item span 2 rows, second span 2 cols on large screens
          const isFeature = i === 0
          const isWide = i === 1
          return (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className={`group relative overflow-hidden ${
                isFeature ? 'row-span-2 col-span-1' : ''
              } ${isWide ? 'md:col-span-2' : ''}`}
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${collectionImages[cat.id]}')` }}
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(to top, rgba(201,168,76,0.25), transparent)' }}
              />

              {/* Gold border reveal on hover */}
              <div
                className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-all duration-500"
                style={{ boxShadow: '0 0 0 0 rgba(201,168,76,0)' }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs text-gold tracking-[0.3em] uppercase mb-1 font-medium">
                  {cat.description}
                </p>
                <h3 className="font-playfair text-xl lg:text-2xl text-cream group-hover:text-gold transition-colors duration-300">
                  {cat.label}
                </h3>
                {/* Animated underline */}
                <div className="mt-2 h-px w-0 group-hover:w-10 transition-all duration-500 ease-out"
                  style={{ background: 'linear-gradient(90deg, #c9a84c, transparent)' }}
                />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
