import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Building2,
    Sparkles,
    ArrowRight,
    Star,
    Award,
    ShieldCheck,
    PhoneCall
} from 'lucide-react'
import { getStoredClients, saveStoredClients } from '../data/clientData'
import { getClientsAPI } from '../services/api'

export default function Client() {
    const [clients, setClients] = useState([])

    useEffect(() => {
        const local = getStoredClients()
        if (local && local.length > 0) setClients(local)

        getClientsAPI().then((apiClients) => {
            if (apiClients && apiClients.length > 0) {
                setClients(apiClients)
                saveStoredClients(apiClients)
            }
        }).catch(() => {})
    }, [])

    return (
        <div className="bg-[#fcfcfd] min-h-screen text-slate-800 py-10 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ================= PAGE HERO HEADER ================= */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-sky-50 text-sky-800 border border-sky-200/70 mb-3 shadow-2xs">
                        <Award className="w-3.5 h-3.5 text-sky-600" />
                        <span>ESTEEMED CLIENTS & BRAND PARTNERS</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0c1b33] tracking-tight">
                        Brands That Trust Unity Print Pack
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 mt-3 max-w-2xl mx-auto leading-relaxed">
                        From iconic confectionery houses and luxury jewellery ateliers to high-growth D2C brands, explore how we engineer custom packaging, rigid boxes, and commercial printing solutions tailored to each partner.
                    </p>

                    {/* Trust Proof Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-slate-200/80">
                        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                            <div className="text-2xl font-serif font-bold text-[#0c1b33]">150+</div>
                            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Corporate Clients</div>
                        </div>
                        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                            <div className="text-2xl font-serif font-bold text-[#0c1b33]">15M+</div>
                            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Boxes & Bags Made</div>
                        </div>
                        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                            <div className="text-2xl font-serif font-bold text-[#0c1b33]">99.8%</div>
                            <div className="text-[11px] font-medium text-slate-500 mt-0.5">On-Time Dispatch</div>
                        </div>
                        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                            <div className="text-2xl font-serif font-bold text-[#0c1b33]">10+</div>
                            <div className="text-[11px] font-medium text-slate-500 mt-0.5">Industry Sectors</div>
                        </div>
                    </div>
                </div>

                {/* ================= CLIENT SHOWCASE LIST (LEFT-RIGHT SEEN) ================= */}
                <div className="space-y-8 sm:space-y-12">
                    {clients.map((client, idx) => {
                        const isEven = idx % 2 === 1

                        return (
                            <div
                                key={client.id}
                                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            >
                                <div
                                    className={`flex flex-col ${
                                        isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                                    } items-stretch`}
                                >
                                    {/* ================= SIDE 1: CLIENT LOGO & BRAND CARD ================= */}
                                    <div className="w-full md:w-5/12 lg:w-4/12 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200/70 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/80 relative overflow-hidden">
                                        {/* Subtle Decorative Geometric Pattern */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                                        {/* Top Badges */}
                                        <div className="flex items-center justify-between gap-2 mb-6">
                                            <span
                                                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${client.accentBg}`}
                                            >
                                                {client.sector}
                                            </span>
                                            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                                <span>Verified Client</span>
                                            </span>
                                        </div>

                                        {/* Main Brand Logo Emblem Box */}
                                        <div className="my-auto py-4">
                                            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/80 flex flex-col items-center text-center transition-transform group-hover:scale-[1.02] duration-300">
                                                {/* Visual Monogram Logo Shield */}
                                                <div
                                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${client.badgeColor} text-white flex items-center justify-center font-serif text-2xl font-extrabold shadow-md mb-3`}
                                                >
                                                    {client.logoInitial}
                                                </div>

                                                {/* Formal Client Logo Typography */}
                                                <h3 className="text-lg sm:text-xl font-serif font-extrabold text-slate-900 tracking-wider">
                                                    {client.logoText}
                                                </h3>
                                                <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400 mt-1">
                                                    {client.logoSub}
                                                </span>
                                            </div>

                                            {/* Packaging Sample Preview Photo */}
                                            <div className="mt-4 rounded-xl overflow-hidden aspect-[16/9] border border-slate-200/80 shadow-2xs relative">
                                                <img
                                                    src={client.packagingImage}
                                                    alt={client.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                                                    <span className="text-[10px] font-bold text-white tracking-wide">
                                                        Custom Manufactured Packaging
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Key Metrics Footer */}
                                        <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 mt-4">
                                            <span className="font-semibold text-slate-700">
                                                {client.partnershipYears}
                                            </span>
                                            <span className="text-slate-400">•</span>
                                            <span className="font-semibold text-sky-700">
                                                {client.packagingVolume}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ================= SIDE 2: COMPANY NAME & FULL DESCRIPTION ================= */}
                                    <div className="w-full md:w-7/12 lg:w-8/12 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                                        {/* Company Name Header */}
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-sky-600 flex-shrink-0" />
                                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0c1b33]">
                                                {client.name}
                                            </h2>
                                        </div>

                                        {/* Tagline */}
                                        <p className="text-sm sm:text-base font-semibold text-sky-700 mb-2">
                                            {client.tagline}
                                        </p>

                                        {/* Big Centered Rating Stars (बीच में) */}
                                        <div className="flex items-center justify-center gap-2 my-4 py-2 border-y border-slate-100">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-400 text-amber-400 drop-shadow-2xs" />
                                            ))}
                                        </div>

                                        {/* Detailed Description (Bigger Size) */}
                                        <div className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                                            <p>{client.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* ================= BOTTOM PARTNERSHIP CTA ================= */}
                <div className="mt-16 sm:mt-24 rounded-3xl bg-gradient-to-br from-[#0c1b33] via-[#13233f] to-[#1c335a] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-white/10 text-amber-300 border border-white/20 mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>PARTNER WITH UNITY PRINT PACK</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                            Ready to Elevate Your Brand's Packaging?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                            Join 150+ successful consumer brands, retail boutiques, and corporate enterprises. From initial dieline engineering and sample prototyping to wholesale press runs, we deliver excellence.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-6">
                            <Link
                                to="/connect"
                                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-[#0c1b33] bg-white hover:bg-slate-100 shadow-md transition-all flex items-center gap-2"
                            >
                                <span>Get Custom Manufacturing Quote</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href="tel:+919860455398"
                                className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2"
                            >
                                <PhoneCall className="w-4 h-4 text-emerald-400" />
                                <span>Call: +91 98604 55398</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
