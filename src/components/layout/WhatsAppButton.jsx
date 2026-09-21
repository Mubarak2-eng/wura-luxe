import { MessageCircle } from 'lucide-react'
import { whatsAppChatLink } from '../../utils/whatsapp'

export default function WhatsAppButton() {
  return (
    <a
      href={whatsAppChatLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
    >
      {/* Tooltip */}
      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-dark-card border border-dark-border text-cream text-xs px-3 py-2 whitespace-nowrap shadow-lg">
        Chat with us!
      </span>
      {/* Button */}
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-200">
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </div>
    </a>
  )
}
