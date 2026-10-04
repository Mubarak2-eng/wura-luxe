import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { X, Sparkles, Check, ArrowRight, RotateCcw, Heart, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../../data/products'
import { formatPrice } from '../../utils/helpers'
import { useCartStore } from '../../store/cartStore'
import toast from 'react-hot-toast'

const quizQuestions = [
  {
    step: 1,
    title: 'What fragrance mood speaks to you most?',
    subtitle: 'Choose your desired olfactory aura for your signature scent.',
    options: [
      { label: 'Fresh, Crisp & Invigorating', scent: 'Fresh & Citrus', desc: 'Bergamot, sea breeze, sparkling citrus & green tea' },
      { label: 'Romantic, Sophisticated & Floral', scent: 'Floral & Romantic', desc: 'Turkish rose, blooming jasmine, peony & lychee' },
      { label: 'Sweet, Delicious & Gourmand', scent: 'Sweet & Gourmand', desc: 'Bourbon vanilla, spun sugar, praline & caramel' },
      { label: 'Dark, Regal & Woody', scent: 'Woody & Earthy', desc: 'Sandalwood, smoky cedar, royal agarwood & vetiver' },
      { label: 'Warm, Magnetic & Spicy Amber', scent: 'Amber & Spicy', desc: 'Amber resin, saffron, dates, cinnamon & nutmeg' },
      { label: 'Pure, Velvet Clean & Musky', scent: 'Clean & Musky', desc: 'White musk, fresh cotton blossom & sheer amber' },
    ],
  },
  {
    step: 2,
    title: 'When do you plan to wear this fragrance?',
    subtitle: 'Select your primary wearing occasion.',
    options: [
      { label: 'Everyday Signature', value: 'everyday', desc: 'Versatile for work, daily outings and compliments' },
      { label: 'Date Nights & Romantic Evenings', value: 'evening', desc: 'Intoxicating, sensual, and intimate projection' },
      { label: 'VIP Events & Celebrations', value: 'luxury', desc: 'High-status sillage, grand weddings and parties' },
      { label: 'Post-Shower & Casual Layering', value: 'casual', desc: 'Effortless all-day body mists and skin oils' },
    ],
  },
  {
    step: 3,
    title: 'What level of projection & longevity do you prefer?',
    subtitle: 'How noticeable should your scent trail be?',
    options: [
      { label: 'Beast-Mode (14–24 Hours)', intensity: 'Beast Mode', desc: 'Command the room and leave a huge scent trail' },
      { label: 'Strong & Radiating (10–14 Hours)', intensity: 'Strong', desc: 'Distinct and noticeable all through your day' },
      { label: 'Moderate & Elegant (8–10 Hours)', intensity: 'Moderate', desc: 'Close, refined, and personal skin aura' },
    ],
  },
]

export default function ScentQuizModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState({
    scent: null,
    occasion: null,
    intensity: null,
  })
  const [matchingResults, setMatchingResults] = useState([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const navigate = useNavigate()

  const handleSelectOption = (key, value) => {
    const updated = { ...answers, [key]: value }
    setAnswers(updated)

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Calculate matches from real products catalog
      calculateMatches(updated)
      setQuizCompleted(true)
    }
  }

  const calculateMatches = (finalAnswers) => {
    let matched = products.filter((p) => {
      // Primary match on scent family
      const matchScent =
        !finalAnswers.scent ||
        p.scentProfile?.toLowerCase().includes(finalAnswers.scent.toLowerCase())
      return matchScent
    })

    // If matches are few, include bestsellers
    if (matched.length === 0) {
      matched = products.filter((p) => p.bestSeller)
    }

    setMatchingResults(matched.slice(0, 3))
  }

  const handleReset = () => {
    setCurrentStep(1)
    setAnswers({ scent: null, occasion: null, intensity: null })
    setMatchingResults([])
    setQuizCompleted(false)
  }

  const handleQuickAdd = (product) => {
    addItem(product, product.volumes[0], 1)
    toast.success(`Added ${product.name} to bag!`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211713]/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FAF6EF] rounded-2xl shadow-2xl border border-[#E9DED0] overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#E9DED0] bg-[#FCFAF6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C7A66A]" />
                <h3 className="font-serif font-bold text-lg text-[#211713]">
                  Find Your Signature Scent Matchmaker
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-[#7A726C] hover:text-[#211713] hover:bg-[#E9DED0]/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              {!quizCompleted ? (
                <div>
                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between text-xs text-[#7A726C] mb-2 font-medium">
                    <span>Question {currentStep} of 3</span>
                    <span>Step {currentStep}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E9DED0] rounded-full mb-6 overflow-hidden">
                    <div
                      className="h-full bg-[#C7A66A] transition-all duration-300 rounded-full"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    />
                  </div>

                  {/* Question Content */}
                  <div className="mb-6">
                    <h4 className="font-serif font-bold text-xl text-[#211713] mb-1">
                      {quizQuestions[currentStep - 1].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#7A726C]">
                      {quizQuestions[currentStep - 1].subtitle}
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {quizQuestions[currentStep - 1].options.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          if (currentStep === 1) handleSelectOption('scent', opt.scent)
                          if (currentStep === 2) handleSelectOption('occasion', opt.value)
                          if (currentStep === 3) handleSelectOption('intensity', opt.intensity)
                        }}
                        className="w-full text-left p-4 rounded-xl border border-[#E9DED0] bg-white hover:border-[#C7A66A] hover:bg-[#FCFAF6] transition-all group flex items-center justify-between"
                      >
                        <div>
                          <p className="font-serif font-bold text-sm text-[#211713] group-hover:text-[#C7A66A] transition-colors">
                            {opt.label}
                          </p>
                          <p className="text-[11px] text-[#7A726C] mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#7A726C] group-hover:text-[#C7A66A] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Matching Recommendations Results */
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold text-[#C7A66A] tracking-wider mb-1">
                      <Sparkles className="w-4 h-4" /> Perfect Olfactory Matches
                    </div>
                    <h4 className="font-serif font-bold text-2xl text-[#211713]">
                      Your Tailored Fragrance Picks
                    </h4>
                    <p className="text-xs text-[#7A726C] mt-1 max-w-md mx-auto">
                      Based on your preference for <strong>{answers.scent}</strong> with{' '}
                      <strong>{answers.intensity || 'long-lasting'}</strong> projection.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {matchingResults.map((product) => (
                      <div
                        key={product.id}
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#E9DED0] hover:border-[#C7A66A] shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg bg-[#FAF6EF] border border-[#E9DED0]"
                          />
                          <div>
                            <span className="text-[9px] uppercase font-bold text-[#C7A66A]">
                              {product.scentProfile}
                            </span>
                            <h5 className="font-serif font-bold text-base text-[#211713]">
                              {product.name}
                            </h5>
                            <p className="text-xs font-bold text-[#211713]">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <Link
                            to={`/product/${product.slug}`}
                            onClick={onClose}
                            className="btn-outline-espresso text-xs py-2 px-3 rounded text-center flex-1 sm:flex-initial"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleQuickAdd(product)}
                            className="btn-espresso text-xs py-2 px-3 rounded flex items-center gap-1 text-center flex-1 sm:flex-initial"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#C7A66A]" /> Add to Bag
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E9DED0]">
                    <button
                      onClick={handleReset}
                      className="text-xs text-[#7A726C] hover:text-[#211713] font-semibold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retake Scent Quiz
                    </button>
                    <button
                      onClick={() => {
                        onClose()
                        navigate(`/shop?scent=${encodeURIComponent(answers.scent)}`)
                      }}
                      className="btn-champagne text-xs px-5 py-2.5"
                    >
                      Explore All {answers.scent} Fragrances
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
