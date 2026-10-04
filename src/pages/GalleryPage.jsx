import { useState } from 'react'
import { X, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const galleryImages = [
  {
    src: '/images/products/shiyaaka-gold.jpg',
    alt: 'Shiyaaka Luxury Gold — Khadlaj Pyramid Gold Flacon',
    tag: 'Eau de Parfum',
    category: 'Men',
    slug: 'shiyaaka-luxury-gold',
  },
  {
    src: '/images/products/soiree-cloud-candy.jpg',
    alt: 'Soirée & Cloud Candy Layering Duo',
    tag: 'Layering Set',
    category: 'Unisex',
    slug: 'soiree-cloud-candy-layering-combo',
  },
  {
    src: '/images/products/ashantee-trio.jpg',
    alt: 'Ashantee Prestige Flacon Trio',
    tag: 'Gift Collection',
    category: 'Unisex',
    slug: 'ashantee-prestige-trio',
  },
  {
    src: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=85',
    alt: 'Khamrah Amber Royale Niche Elixir',
    tag: 'Gourmand & Oriental',
    category: 'Men',
    slug: 'khamrah-amber-royale',
  },
  {
    src: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=85',
    alt: 'Club Noir Intense — Chypre Beast Mode',
    tag: 'Masculine',
    category: 'Men',
    slug: 'club-noir-intense-man',
  },
  {
    src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=85',
    alt: 'Yara Rose Marshmallow — Sweet Feminine',
    tag: 'Floral Sweet',
    category: 'Women',
    slug: 'yara-rose-marshmallow',
  },
  {
    src: 'https://images.unsplash.com/photo-1621243804936-775306a8f2e3?w=800&q=85',
    alt: 'Black Afgano Concentrated Attar',
    tag: 'Pure Perfume Oil',
    category: 'Unisex',
    slug: 'black-afgano-pure-attar',
  },
  {
    src: 'https://images.unsplash.com/photo-1563170351-be54b573ab31?w=800&q=85',
    alt: 'Rouge 540 Scent Body Elixir Mist',
    tag: 'Body Mist',
    category: 'Women',
    slug: 'rouge-540-body-mist',
  },
  {
    src: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=85',
    alt: 'Editorial Fragrance Campaign — Mama Fragrance',
    tag: 'Campaign Lookbook',
    category: 'Unisex',
    slug: null,
  },
]

const FILTERS = ['All', 'Men', 'Women', 'Unisex']

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null)
  const [filter, setFilter] = useState('All')

  const visible = filter === 'All' ? galleryImages : galleryImages.filter((g) => g.category === filter)

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">

      {/* Hero */}
      <section className="bg-[#211713] text-[#FAF6EF] py-16 sm:py-20 text-center">
        <div className="section-pad space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A]">
            FRAGRANCE LOOKBOOK
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#FAF6EF]">
            The Collection Gallery
          </h1>
          <p className="text-sm text-[#E9DED0]/80 font-light max-w-lg mx-auto">
            A curated visual edit of our favourite fragrances — photographed, bottled, and ready to wear.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="section-pad pt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${
              filter === f
                ? 'bg-[#211713] text-[#FAF6EF] border-[#211713]'
                : 'bg-white text-[#393431] border-[#E9DED0] hover:border-[#C7A66A]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="section-pad pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((img, i) => (
            <motion.div
              key={img.alt}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-[#E9DED0] rounded-2xl overflow-hidden shadow-sm hover:shadow-luxury group cursor-pointer"
              onClick={() => setLightbox(galleryImages.indexOf(img))}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211713]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3 bg-[#211713]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#C7A66A]">
                  {img.tag}
                </div>
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <div className="px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7A66A]">{img.category}</span>
                <h3 className="text-sm font-semibold text-[#211713] mt-0.5 line-clamp-1">{img.alt}</h3>
                {img.slug && (
                  <Link
                    to={`/product/${img.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-semibold text-[#7A726C] hover:text-[#C7A66A] transition-colors mt-1 inline-block"
                  >
                    View product →
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#211713]/97 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 text-[#FAF6EF] hover:text-[#C7A66A] transition-colors p-2 rounded-full bg-white/10"
              onClick={() => setLightbox(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="max-w-2xl w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].alt}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl border border-[#C7A66A]/30 shadow-2xl"
              />
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C7A66A] block mb-1">
                  {galleryImages[lightbox].tag}
                </span>
                <h3 className="font-serif text-lg text-[#FAF6EF] font-bold">
                  {galleryImages[lightbox].alt}
                </h3>
                {galleryImages[lightbox].slug && (
                  <Link
                    to={`/product/${galleryImages[lightbox].slug}`}
                    className="btn-champagne inline-block mt-3 px-6 py-2.5 rounded text-xs font-bold"
                    onClick={() => setLightbox(null)}
                  >
                    VIEW PRODUCT
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
