import { useState } from 'react'
import { X, Sparkles, ShieldCheck, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const galleryImages = [
  {
    src: '/images/products/shiyaaka-gold.jpg',
    alt: 'Shiyaaka Luxury Gold — Khadlaj Pyramid Gold Flacon',
    tag: 'Live In-Stock',
    category: 'Eau de Parfum',
    slug: 'shiyaaka-luxury-gold',
    realStock: true,
  },
  {
    src: '/images/products/soiree-cloud-candy.jpg',
    alt: 'Soirée & Cloud Candy Layering Combo — The Compliment Duo',
    tag: 'Live In-Stock',
    category: 'Viral Layering Set',
    slug: 'soiree-cloud-candy-layering-combo',
    realStock: true,
  },
  {
    src: '/images/products/ashantee-trio.jpg',
    alt: 'Ashantee Prestige Flacon Trio (Intense, Floral, Far Away)',
    tag: 'Live In-Stock',
    category: 'Collector Trio',
    slug: 'ashantee-prestige-trio',
    realStock: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=85',
    alt: 'Khamrah Amber Royale Niche Elixir',
    tag: 'Gourmand Classic',
    category: 'Eau de Parfum',
    slug: 'khamrah-amber-royale',
  },
  {
    src: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=85',
    alt: 'Club Noir Intense Beast Mode Sillage',
    tag: 'Chypre Beast',
    category: 'Men Fragrance',
    slug: 'club-noir-intense-man',
  },
  {
    src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=85',
    alt: 'Yara Rose Marshmallow Sweet Scent',
    tag: 'Feminine Sweet',
    category: 'Eau de Parfum',
    slug: 'yara-rose-marshmallow',
  },
  {
    src: 'https://images.unsplash.com/photo-1621243804936-775306a8f2e3?w=800&q=85',
    alt: 'Black Afgano Concentrated Attar',
    tag: 'Pure Oil Extrait',
    category: 'Attars & Oils',
    slug: 'black-afgano-pure-attar',
  },
  {
    src: 'https://images.unsplash.com/photo-1603905219403-0dbe4b64a5c1?w=800&q=85',
    alt: 'Oud Palace Crystal Scented Candle',
    tag: 'Home Luxury',
    category: 'Candles',
    slug: 'oud-palace-crystal-candle',
  },
  {
    src: 'https://images.unsplash.com/photo-1563170351-be54b573ab31?w=800&q=85',
    alt: 'Rouge 540 Scent Body Elixir Mist',
    tag: 'Fine Mist',
    category: 'Body Mists',
    slug: 'rouge-540-body-mist',
  },
]

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="section-pad py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="cyber-badge mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-bright" />
          <span>VERIFIED PHYSICAL STOCKS</span>
        </div>
        <h1 className="font-syne text-5xl sm:text-6xl font-black text-white mb-3">
          Stock <span className="text-liquid-gold">Lookbook</span>
        </h1>
        <p className="font-cinzel text-gold-light italic text-xl">
          "Smell as good as you look!"
        </p>
        <p className="text-sm text-cream-muted max-w-lg mx-auto mt-3 font-light">
          High-resolution unboxing shots and authentic flacon previews directly from our inventory vault.
        </p>
      </div>

      {/* Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="glass-panel p-4 rounded-3xl border border-gold/20 hover:border-gold shadow-xl group cursor-pointer"
            onClick={() => setLightbox(i)}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black mb-4">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

              {/* Tag */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-gold/40 px-3 py-1 rounded-full text-[10px] font-space font-extrabold uppercase text-gold-bright">
                {img.tag}
              </div>

              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/70 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-space text-gold uppercase tracking-wider block">
                  {img.category}
                </span>
                <h3 className="font-syne font-bold text-white text-sm group-hover:text-gold-bright transition-colors line-clamp-1">
                  {img.alt}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gold transition-colors p-2 rounded-full bg-white/10"
              onClick={() => setLightbox(null)}
            >
              <X className="w-7 h-7" />
            </button>

            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].alt}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl border border-gold/40 shadow-2xl"
              />
              <div className="text-center mt-4">
                <span className="text-xs text-gold-bright font-space font-bold uppercase tracking-widest block mb-1">
                  {galleryImages[lightbox].tag}
                </span>
                <h3 className="font-syne text-xl text-white font-bold">
                  {galleryImages[lightbox].alt}
                </h3>
                {galleryImages[lightbox].slug && (
                  <Link
                    to={`/product/${galleryImages[lightbox].slug}`}
                    className="btn-futuristic inline-block mt-3 px-6 py-2.5 rounded-xl text-xs font-bold"
                  >
                    Inspect In Vault
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
