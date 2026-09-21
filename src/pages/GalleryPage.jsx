import { useState } from 'react'
import { X } from 'lucide-react'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
    alt: 'Oud Royale',
    tag: 'Eau de Parfum',
  },
  {
    src: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    alt: 'Wura Gold',
    tag: 'Signature',
  },
  {
    src: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=800&q=80',
    alt: 'Midnight Bloom',
    tag: 'Dark Floral',
  },
  {
    src: 'https://images.unsplash.com/photo-1621243804936-775306a8f2e3?w=800&q=80',
    alt: 'Black Oud Attar',
    tag: 'Attar',
  },
  {
    src: 'https://images.unsplash.com/photo-1603905219403-0dbe4b64a5c1?w=800&q=80',
    alt: 'Oud & Amber Candle',
    tag: 'Home Fragrance',
  },
  {
    src: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=800&q=80',
    alt: 'Luxury Gift Set',
    tag: 'Gift',
  },
  {
    src: 'https://images.unsplash.com/photo-1556229167-d07a1af7d86f?w=800&q=80',
    alt: "Rose d'Ivoire",
    tag: 'Floral',
  },
  {
    src: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80',
    alt: 'Luxury Perfume',
    tag: 'Collection',
  },
  {
    src: 'https://images.unsplash.com/photo-1563170351-be54b573ab31?w=800&q=80',
    alt: 'Velvet Rose Mist',
    tag: 'Body Mist',
  },
  {
    src: 'https://images.unsplash.com/photo-1610461888750-10bfc601b4a6?w=800&q=80',
    alt: 'Amber Royale',
    tag: 'Attar',
  },
  {
    src: 'https://images.unsplash.com/photo-1604975701397-6365ccbd028a?w=800&q=80',
    alt: 'Rose Garden Candle',
    tag: 'Candle',
  },
  {
    src: 'https://images.unsplash.com/photo-1584553421349-3557471bed79?w=800&q=80',
    alt: 'Fragrance Bottle',
    tag: 'Eau de Parfum',
  },
]

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      {/* Hero */}
      <section className="relative h-52 flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541643600914-78b084683702?w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/20" />
        <div className="relative section-pad pb-10">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
            Visual Stories
          </p>
          <h1 className="font-playfair text-5xl text-cream">Lookbook</h1>
        </div>
      </section>

      <div className="section-pad py-16">
        <div className="text-center mb-12">
          <p className="text-cream-muted max-w-lg mx-auto">
            A curated visual journey through the world of Wura Luxe & Scents —
            where fragrance meets artistry.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="w-full block break-inside-avoid group overflow-hidden relative"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <p className="text-gold text-xs tracking-widest uppercase">
                    {img.tag}
                  </p>
                  <p className="text-cream text-sm font-playfair">{img.alt}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-cream-muted hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={galleryImages[lightbox].src.replace('w=800', 'w=1200')}
            alt={galleryImages[lightbox].alt}
            className="max-w-4xl max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-gold text-xs tracking-widest uppercase">
              {galleryImages[lightbox].tag}
            </p>
            <p className="text-cream font-playfair">
              {galleryImages[lightbox].alt}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
