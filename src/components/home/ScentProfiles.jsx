import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, HelpCircle } from 'lucide-react'
import { scentProfiles } from '../../data/categories'
import MotionSection from '../common/MotionSection'
import ScentQuizModal from './ScentQuizModal'

export default function ScentProfiles() {
  const [quizOpen, setQuizOpen] = useState(false)

  return (
    <section className="py-16 sm:py-24 bg-[#FCFAF6] border-y border-[#E9DED0]">
      <div className="section-pad">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <MotionSection>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C7A66A]" />
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C7A66A]">
                SHOP BY OLFACTORY FAMILY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211713]">
              What Do You Want to Smell Like?
            </h2>
            <p className="text-sm sm:text-base text-[#7A726C] font-light mt-1">
              Select your favourite scent profile to find perfumes that match your mood and identity.
            </p>
          </MotionSection>

          {/* Interactive Quiz Trigger */}
          <button
            onClick={() => setQuizOpen(true)}
            className="btn-espresso self-start md:self-auto px-5 py-3 text-xs font-bold rounded flex items-center gap-2 shrink-0 shadow-md"
          >
            <HelpCircle className="w-4 h-4 text-[#C7A66A]" />
            <span>Take Scent Quiz</span>
          </button>
        </div>

        {/* 6 Scent Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scentProfiles.map((profile, idx) => (
            <MotionSection key={profile.id} delay={idx * 0.06}>
              <Link
                to={`/shop?scent=${encodeURIComponent(profile.name)}`}
                className="group relative block bg-white rounded-xl border border-[#E9DED0] hover:border-[#C7A66A] p-6 shadow-sm hover:shadow-luxury transition-all duration-300 overflow-hidden h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#C7A66A] bg-[#FAF6EF] px-2.5 py-1 rounded-full border border-[#E9DED0]">
                      {profile.mood.split(',')[0]}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#7A726C] group-hover:text-[#C7A66A] group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#211713] group-hover:text-[#C7A66A] transition-colors mb-2">
                    {profile.name}
                  </h3>

                  <p className="text-xs text-[#7A726C] leading-relaxed mb-4">
                    {profile.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#FAF6EF]">
                  <p className="text-[11px] text-[#393431]">
                    <strong className="text-[#211713]">Key Accords:</strong> {profile.keyNotes}
                  </p>
                </div>
              </Link>
            </MotionSection>
          ))}
        </div>
      </div>

      <ScentQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </section>
  )
}
