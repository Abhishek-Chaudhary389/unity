import React from 'react'
import { Link } from 'react-router-dom'
import {
    ShieldCheck,
    Award,
    Recycle,
    Sparkles,
    CheckCircle2,
    Factory,
    Printer,
    Layers,
    Clock,
    ArrowRight,
    Phone,
    Package
} from 'lucide-react'
import unityHeroImg from '../../assets/unity home.png'

export default function About() {
    const stats = [
        { number: '10M+', label: 'Packaging Units Shipped', sub: 'Across India' },
        { number: '500+', label: 'Active Brand Partners', sub: 'D2C, Retail & Corporates' },
        { number: '12+', label: 'Years Of Excellence', sub: 'In Packaging & Print' },
        { number: '99.8%', label: 'On-Time Dispatch Rate', sub: 'Pan-India Logistics' },
    ]

    const corePillars = [
        {
            icon: Factory,
            title: 'Direct Factory Manufacturing',
            description: 'We operate our own state-of-the-art manufacturing facility, eliminating broker markups to provide you with competitive, transparent factory-direct pricing.',
            badge: 'Cost Efficient',
        },
        {
            icon: ShieldCheck,
            title: 'ISO 9001:2015 Quality Standards',
            description: 'Every production lot undergoes rigorous spectrophotometer color calibration, crease resistance tests, and transit drop-tests before dispatch.',
            badge: 'Certified',
        },
        {
            icon: Recycle,
            title: '100% Sustainable & Recyclable',
            description: 'Committed to environmental responsibility with FSC-certified virgin kraft boards, biodegradable soy-based inks, and water-based adhesives.',
            badge: 'Eco-Friendly',
        },
        {
            icon: Sparkles,
            title: 'In-House 3D Dieline Prototyping',
            description: 'Our packaging structural engineers create custom dieline templates and physical prototypes within 48 hours for flawless fit and unboxing delight.',
            badge: 'Rapid Turnaround',
        },
    ]

    const capabilities = [
        {
            title: 'Multi-Color Offset Printing',
            spec: 'Heidelberg & Komori Speedmaster Presses',
            desc: 'Ultra-high-definition dot reproduction with in-line aqueous and UV coating for high-volume orders.',
        },
        {
            title: 'Automated Rigid Box Assembly',
            spec: 'Robotic Positioning & Case Makers',
            desc: 'Millimeter-accurate 90-degree V-groove corners, magnetic flap closures, and bubble-free wrap finishing.',
        },
        {
            title: 'Precision Die-Cutting & Embossing',
            spec: 'Automatic Platen Die-Cutters',
            desc: 'Sharp creasing, intricate silhouette window cuts, and 3D multi-level embossing / debossing.',
        },
        {
            title: 'Premium Surface Finishes',
            spec: 'Post-Press Embellishment Suite',
            desc: 'Hot metallic foil stamping in gold, rose-gold, silver, velvet soft-touch lamination, and raised spot UV.',
        },
    ]

    return (
        <div className="bg-[#fdfdfd] min-h-screen text-slate-800">
            {/* ================= HERO HEADER ================= */}
            <section className="relative bg-gradient-to-b from-slate-100 via-white to-[#fdfdfd] pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-amber-50 text-[#b47a36] border border-amber-200/70 mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>ABOUT UNITY PRINT PACK SOLUTIONS</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0c1b33] tracking-tight leading-[1.15]">
                        Pioneering Excellence in Creative Packaging & High-Precision Print
                    </h1>

                    <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
                        We are India’s premier custom packaging and commercial offset printing manufacturer, empowering modern brands to craft unforgettable unboxing experiences with industrial manufacturing power.
                    </p>
                </div>
            </section>

            {/* ================= STORY & STATS SECTION ================= */}
            <section className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left: Text Story */}
                    <div className="lg:col-span-6 space-y-5">
                        <p className="text-xs font-bold tracking-wider uppercase text-sky-600">
                            OUR JOURNEY & EXPERTISE
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0c1b33] tracking-tight">
                            From Design Concept to Flawless Pan-India Delivery
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            At <span className="font-semibold text-slate-900">Unity Print Pack Solutions</span>, we believe that packaging is the very first tactile handshake between your brand and your customer. It protects your valuable products, communicates brand values, and creates genuine customer delight.
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            With over a decade of printing and structural manufacturing expertise, we operate a fully integrated facility spanning automated pre-press CTP, high-speed multi-color offset presses, robotic rigid box lines, and computer-controlled die-cutting machinery.
                        </p>

                        {/* Bullet Highlights */}
                        <div className="space-y-2.5 pt-2">
                            {[
                                'End-to-end structural dieline and 3D visual mockup support',
                                'Direct manufacturer rates with zero middleman commissions',
                                'High-volume scalability with flexible minimum order quantities',
                                'Strict Pantone color fidelity with spectrophotometer checks',
                            ].map((point, index) => (
                                <div key={index} className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Featured Photo Card */}
                    <div className="lg:col-span-6">
                        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group bg-slate-900">
                            <img
                                src={unityHeroImg}
                                alt="Unity Print Pack Packaging Facility & Products"
                                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-102"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <p className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                                    UNITY PRINT PACK SOLUTIONS
                                </p>
                                <p className="text-[11px] text-slate-200 mt-0.5">
                                    Creative Packaging. Complete Solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4 Key Statistics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-14 pt-10 border-t border-slate-200">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow text-center"
                        >
                            <span className="block text-2xl sm:text-3xl font-extrabold text-[#0c1b33]">
                                {stat.number}
                            </span>
                            <span className="block text-xs font-bold text-slate-800 mt-1">
                                {stat.label}
                            </span>
                            <span className="block text-[11px] text-slate-400 mt-0.5">
                                {stat.sub}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= CORE PILLARS / WHY CHOOSE US ================= */}
            <section className="bg-slate-50/80 py-16 border-t border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <p className="text-xs font-bold tracking-widest uppercase text-[#b47a36]">
                            WHY INDUSTRY LEADERS CHOOSE US
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0c1b33] mt-1">
                            Engineered For Precision, Speed & Reliability
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {corePillars.map((pillar, idx) => {
                            const IconComponent = pillar.icon
                            return (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
                                                {pillar.badge}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-bold text-[#0c1b33] mb-2">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ================= INFRASTRUCTURE & MACHINERY ================= */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-xs font-bold tracking-widest uppercase text-sky-600">
                        PRODUCTION INFRASTRUCTURE
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0c1b33] mt-1">
                        High-End Presses & Finishing Technologies
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Equipped with industry-leading machinery to guarantee razor-sharp print registration and clean folds.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {capabilities.map((cap, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all"
                        >
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#b47a36] flex items-center justify-center font-bold text-xs mb-3">
                                0{idx + 1}
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 mb-1">{cap.title}</h3>
                            <p className="text-[11px] font-semibold text-sky-600 mb-2">{cap.spec}</p>
                            <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= CTA BANNER ================= */}
            <section className="py-14 bg-[#0b1a30] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15">
                        ✨ Start Your Packaging Project
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight">
                        Looking for Custom Sample Boxes or Direct Factory Quotes?
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                        Share your product dimensions or packaging requirements with our structural engineering team. We provide dielines, 3D mockups, and cost estimates within 2 to 4 hours.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            to="/connect"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-500 to-rose-500 hover:from-sky-600 hover:to-rose-600 text-white shadow-md transition-all"
                        >
                            <span>Connect With Our Team</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="tel:+918956055398"
                            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                        >
                            <Phone className="w-3.5 h-3.5 text-amber-400" />
                            <span>Call: +91 8956 055 398</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
