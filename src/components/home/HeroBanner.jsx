import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'

const heroSlides = [
  {
    id: 'slide-1',
    subtitle: 'MAMA FRAGRANCE SIGNATURE',
    headline: 'Smell as good as you look.',
    supporting:
      'Your fragrance is more than a finishing touch. It’s your signature, your mood, and the impression you leave behind. Discover scents that speak before you do.',
    primaryBtnText: 'SHOP ALL FRAGRANCES',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'FIND YOUR SIGNATURE SCENT',
    secondaryBtnAction: 'quiz',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600&q=85',
    alt: 'Luxury perfume bottle on warm ivory and champagne pedestal with soft natural shadows',
    theme: 'light',
  },
  {
    id: 'slide-2',
    subtitle: "MEN'S COUTURE COLLECTION",
    headline: 'Leave a lasting impression.',
    supporting:
      'Discover bold, refined, and captivating fragrances for every occasion. Masterfully blended with smoked woods, crisp citrus, and magnetic ambergris.',
    primaryBtnText: "SHOP MEN'S FRAGRANCES",
    primaryBtnLink: '/shop?category=men',
    secondaryBtnText: 'EXPLORE BESTSELLERS',
    secondaryBtnLink: '/shop?tag=bestsellers',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1600&q=85',
    alt: 'Elegant masculine fragrance flacons with dark wood and amber styling',
    theme: 'dark',
  },
  {
    id: 'slide-3',
    subtitle: "WOMEN'S FLORAL & GOURMAND",
    headline: 'Elegance in every note.',
    supporting:
      'From delicate florals to irresistible warm scents, find a fragrance that feels unmistakably you. Indulge in velvety vanilla, sweet spun sugar, and blooming petals.',
    primaryBtnText: "SHOP WOMEN'S FRAGRANCES",
    primaryBtnLink: '/shop?category=women',
    secondaryBtnText: 'DISCOVER BODY MISTS',
    secondaryBtnLink: '/shop?category=mist',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1600&q=85',
    alt: 'Refined perfume flacons with soft flowers and warm editorial lighting',
    theme: 'light',
  },
  {
    id: 'slide-4',
    subtitle: 'THE ART OF GIFTING',
    headline: 'Make every moment memorable.',
    supporting:
      'Thoughtful fragrance gifts for birthdays, celebrations, anniversaries, and the people who matter. Presented in luxury gift boxes with complimentary layering cards.',
    primaryBtnText: 'EXPLORE FRAGRANCE GIFTS',
    primaryBtnLink: '/shop?category=gift',
    secondaryBtnText: 'DISCOVER OIL ATTARS',
    secondaryBtnLink: '/shop?category=oil',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=1600&q=85',
    alt: 'Beautifully packaged perfume bottles with elegant ribbons and luxury gift styling',
    theme: 'light',
  },
]

export default function HeroBanner({ onOpenQuiz }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  // Auto-slide effect with pause on hover
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, 5500)
    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  // Touch swipe handling for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
  }

  const slide = heroSlides[current]

  return (
    <section
      className="relative w-full overflow-hidden bg-[#211713]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Campaigns Carousel"
    >
      {/* ── Slide Background Image Container ── */}
      <div className="relative w-full h-[540px] sm:h-[600px] lg:h-[660px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
            />
            {/* Elegant Atmospheric Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#211713]/90 via-[#211713]/60 to-transparent lg:w-3/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211713]/80 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* ── Slide Content Overlay ── */}
        <div className="relative h-full section-pad flex items-center z-10">
          <div className="max-w-xl lg:max-w-2xl py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + '-content'}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Subtitle Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EF]/15 backdrop-blur-md border border-[#C7A66A]/40 text-[#C7A66A] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
                  <Sparkles className="w-3 h-3" />
                  <span>{slide.subtitle}</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6EF] leading-[1.12] tracking-tight">
                  {slide.headline}
                </h1>

                {/* Supporting Text */}
                <p className="text-[#FAF6EF]/85 text-sm sm:text-base lg:text-lg leading-relaxed font-light max-w-lg">
                  {slide.supporting}
                </p>

                {/* CTA Buttons Group */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <Link
                    to={slide.primaryBtnLink}
                    className="btn-champagne px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold shadow-luxury-lg hover:shadow-gold-glow"
                  >
                    {slide.primaryBtnText}
                  </Link>

                  {slide.secondaryBtnAction === 'quiz' ? (
                    <button
                      onClick={onOpenQuiz}
                      className="btn-outline-espresso bg-white/10 backdrop-blur-md border-[#FAF6EF]/50 text-[#FAF6EF] hover:bg-[#FAF6EF] hover:text-[#211713] px-5 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold transition-all"
                    >
                      {slide.secondaryBtnText}
                    </button>
                  ) : slide.secondaryBtnLink ? (
                    <Link
                      to={slide.secondaryBtnLink}
                      className="btn-outline-espresso bg-white/10 backdrop-blur-md border-[#FAF6EF]/50 text-[#FAF6EF] hover:bg-[#FAF6EF] hover:text-[#211713] px-5 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold transition-all"
                    >
                      {slide.secondaryBtnText}
                    </Link>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Carousel Arrows (Desktop & Tablet) ── */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-[#211713] border border-white/30 flex items-center justify-center transition-all shadow-md hover:scale-105"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-[#211713] border border-white/30 flex items-center justify-center transition-all shadow-md hover:scale-105"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* ── Pagination Indicator Dots ── */}
        <div className="absolute bottom-6 inset-x-0 z-20 flex items-center justify-center gap-2.5">
          {heroSlides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === idx
                  ? 'w-8 bg-[#C7A66A]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
