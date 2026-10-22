import React from 'react'
import { MessageSquare } from 'lucide-react'

export default function WhatsAppQuery() {
    const phoneNumber = '919860455398'
    const defaultMessage = 'Hi Unity Print Pack, I have a custom packaging query.'

    return (
        <aside
            aria-label="WhatsApp Quick Support"
            className="fixed bottom-6 right-6 z-40 flex items-center group pointer-events-auto"
        >
            <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20"
                title="Send WhatsApp Query to +91 98604 55398"
            >
                {/* WhatsApp SVG Icon */}
                <div className="relative flex items-center justify-center">
                    <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white drop-shadow-xs"
                    >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    {/* Ping Animation Indicator */}
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                    </span>
                </div>

                <div className="flex flex-col text-left leading-tight">
                    <span className="text-[10px] font-semibold text-emerald-100 uppercase tracking-wider">
                        Instant Query
                    </span>
                    <span className="text-xs sm:text-sm font-bold tracking-tight">
                        WhatsApp Query
                    </span>
                </div>
            </a>
        </aside>
    )
}
