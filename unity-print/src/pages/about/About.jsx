import React from 'react'
import { Link } from 'react-router-dom'
import {
    ShieldCheck,
    Award,
    Recycle,
    Sparkles,
    CheckCircle2,
    Printer,
    Package,
    Users,
    Settings,
    Lightbulb,
    Handshake,
    HeartHandshake,
    ArrowRight,
    Phone,
    Check,
    Cpu,
    Compass,
    Target
} from 'lucide-react'
import unityHeroImg from '../../assets/unity home.png'

export default function About() {
    // 5 Team Badges from Slide 2
    const teamBadges = [
        { label: 'Skilled Team', icon: Users },
        { label: 'Advanced Processes', icon: Settings },
        { label: 'Consistent Quality', icon: ShieldCheck },
        { label: 'Innovative Solutions', icon: Lightbulb },
        { label: 'Long-Term Partnerships', icon: Handshake },
    ]

    // 4 Team Pillars from Slide 2
    const teamPillars = [
        {
            title: 'Leadership & Industry Expertise',
            desc: 'Our leadership team brings extensive industry experience and a strong understanding of modern printing and packaging requirements. With a customer-first approach, we continuously strive to improve our Processes, Capabilities, and Service Standards.'
        },
        {
            title: 'Production & Quality',
            desc: 'Our production team focuses on precision, consistency, and efficiency at every stage of manufacturing. From material selection and printing to finishing and final inspection, we follow stringent quality standards to ensure every product meets the required specifications and delivers reliable performance.'
        },
        {
            title: 'Design & Custom Solutions',
            desc: 'We understand that every brand has unique requirements. Our team works closely with customers to provide customized printing and packaging solutions that combine attractive design, functional performance, and cost efficiency.'
        },
        {
            title: 'Sales & Customer Support',
            desc: 'Our sales and customer support team ensures a smooth experience from enquiry to final delivery. We provide professional guidance, timely communication, production coordination, and responsive support to build long-term relationships with our clients.'
        }
    ]

    // 9 Core Products & Solutions from Slide 3
    const solutionList = [
        'Mono Cartons & Folding Cartons',
        'Printed Packaging Materials',
        'Customized Boxes',
        'Commercial & Promotional Printing',
        'Visiting Cards & Corporate Stationery',
        'Paper & Foil Laminates',
        'Holographic Film & Paper Laminates',
        'Printed Materials for Industrial Applications',
        'Customized Packaging Solutions'
    ]

    // 4 Trust & Excellence Badges from Slide 3
    const solutionBadges = [
        { label: 'PRINT EXCELLENCE', icon: Printer },
        { label: 'QUALITY PACKAGING', icon: Package },
        { label: 'SUSTAINABLE SOLUTIONS', icon: Recycle },
        { label: 'YOUR TRUST OUR PRIORITY', icon: HeartHandshake },
    ]

    // 3 Corporate Pillars from Slide 3
    const corporatePillars = [
        {
            title: 'Our Vision',
            icon: Compass,
            desc: 'To be a trusted and innovative printing & packaging partner, delivering high-quality, sustainable and value-driven solutions to customers across diverse industries.'
        },
        {
            title: 'Our Mission',
            icon: Target,
            desc: 'To combine experience, technology and innovation to deliver precision-engineered printing and packaging solutions that consistently exceed customer expectations.'
        },
        {
            title: 'Our Commitment',
            icon: Award,
            desc: "At Unity Print Pack Solutions, we don't just provide Printing and Packaging Materials. We create solutions that strengthen brands, enhance presentation and deliver dependable quality."
        }
    ]

    // Key Stats
    const stats = [
        { number: '45+', label: 'Years Of Industry Expertise', sub: 'Trusted Legacy' },
        { number: '10M+', label: 'Packaging Units Shipped', sub: 'Across India' },
        { number: 'German', label: 'Precision Machinery', sub: 'State-of-the-Art Tech' },
        { number: '500+', label: 'Active Brand Partners', sub: 'D2C, Retail & Corporates' },
    ]

    return (
        <div className="bg-white min-h-screen text-slate-800">
            {/* ========================================================= */}
            {/* 1. SLIDE 1: INTRODUCTION SECTION                          */}
            {/* ========================================================= */}
            <section className="relative overflow-hidden bg-white text-slate-800 py-12 sm:py-16 lg:py-20 border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        {/* Left Content */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Slide 1 Tag */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-sky-50 text-[#006e98] border border-sky-200/80">
                                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                                <span>INTRODUCTION</span>
                            </div>

                            {/* Slide 1 Headline */}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0c1b33] leading-tight">
                                A Strong Printing & Packaging Partner
                            </h1>

                            {/* Slide 1 Exact Text */}
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                                At <span className="font-semibold text-slate-900">Unity Print Pack Solutions</span>, your all-in-one solution for high-quality printing and packaging. With over <span className="font-bold text-[#b47a36]">45 years of expertise</span> in the industry, we have become a trusted partner for Customer. From visiting cards to mono cartons, corrugated boxes, printed labels to catalogues and brochures, Flyers, we offer tailored solutions that enhance your brand's presence. Our state-of-the-art <span className="font-semibold text-[#006e98]">German machinery</span> and commitment to excellence allow us to deliver precision and quality at scale, making us the go-to choice for businesses seeking reliable packaging and printing services.
                            </p>

                        </div>

                        {/* Right Visual Card (About P1 Showcase) */}
                        <div className="lg:col-span-5">
                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group transition-all duration-300 hover:shadow-2xl hover:border-sky-300">
                                <div className="relative overflow-hidden bg-white p-2 sm:p-3">
                                    <img
                                        src="https://ik.imagekit.io/vbzl5fzbj/unity_packaging/aboutp1.png"
                                        alt="Unity Print Pack Solutions - About Us"
                                        className="w-full h-auto max-h-[500px] object-contain rounded-xl sm:rounded-2xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                                        loading="eager"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* STATS STRIP                                               */}
            {/* ========================================================= */}
            <section className="bg-white border-b border-slate-200/90 shadow-2xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 text-center transition-all hover:bg-sky-50/50 hover:border-sky-200"
                            >
                                <span className="block text-2xl sm:text-3xl font-extrabold text-[#0c1b33]">
                                    {stat.number}
                                </span>
                                <span className="block text-xs font-bold text-slate-800 mt-1">
                                    {stat.label}
                                </span>
                                <span className="block text-[11px] text-slate-500 mt-0.5">
                                    {stat.sub}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 2. SLIDE 2: OUR TEAM & EXPERTISE SECTION                  */}
            {/* ========================================================= */}
            <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header & Badges Row */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-slate-200">
                        {/* Title & Intro Text */}
                        <div className="max-w-3xl space-y-3">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#006e98] tracking-tight uppercase">
                                OUR TEAM & EXPERTISE
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                At <span className="font-semibold text-slate-900">Unity Print Pack Solutions</span>, our success is driven by a dedicated team of Printing and Packaging professionals committed to delivering quality, precision, and innovative solutions for every project.
                            </p>
                        </div>

                        {/* Slide 2 Motto: Together We Create Better */}
                        <div className="flex-shrink-0 text-left lg:text-right">
                            <div className="inline-block relative">
                                <span className="font-serif italic text-xl sm:text-2xl font-bold text-[#006e98] tracking-tight block">
                                    Together We Create Better
                                </span>
                                <div className="h-1 bg-gradient-to-r from-sky-500 to-yellow-400 rounded-full mt-1 w-full" />
                            </div>
                        </div>
                    </div>

                    {/* 5 Badges from Slide 2 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-8">
                        {teamBadges.map((badge, idx) => {
                            const IconComponent = badge.icon
                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all text-center group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#006e98] text-white flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 leading-tight">
                                        {badge.label}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 4 Pillars with Yellow Vertical Bar `|` (from Slide 2) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {teamPillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-2.5 mb-3">
                                    {/* Yellow Accent Bar from slide */}
                                    <span className="inline-block w-1.5 h-6 bg-[#facc15] rounded-full flex-shrink-0" />
                                    <h3 className="text-base sm:text-lg font-bold text-[#006e98]">
                                        {pillar.title}
                                    </h3>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4 border-l border-slate-100">
                                    {pillar.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========================================================= */}
            {/* 3. SLIDE 3: ADVANCED PACKAGING SOLUTIONS & VISION/MISSION */}
            {/* ========================================================= */}
            <section className="bg-white py-14 sm:py-20 border-t border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header + Slogan + 4 Badges */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
                        {/* Left: Heading with Yellow Bar */}
                        <div className="max-w-2xl space-y-3">
                            <div className="flex items-center gap-2.5">
                                <span className="inline-block w-1.5 h-7 bg-[#facc15] rounded-full" />
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#006e98] tracking-tight">
                                    Advanced Packaging Solutions
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4">
                                With decades of experience across multiple industries, Unity Print Pack Solutions has developed a broad portfolio of packaging and printed product solutions designed to address diverse functional, aesthetic and commercial requirements.
                            </p>
                        </div>

                        {/* Right: Slogan & 4 Badges */}
                        <div className="flex flex-col items-start lg:items-end gap-5">
                            {/* Script Motto */}
                            <div className="text-left lg:text-right">
                                <span className="font-serif italic text-xl sm:text-2xl font-bold text-[#006e98] tracking-tight">
                                    Better Packaging Brighter Brands
                                </span>
                                <div className="h-1 bg-gradient-to-r from-yellow-400 to-sky-500 rounded-full mt-1 w-full" />
                            </div>

                            {/* 4 Badges from Slide 3 */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {solutionBadges.map((badge, idx) => {
                                    const IconComponent = badge.icon
                                    return (
                                        <div
                                            key={idx}
                                            className="flex flex-col items-center justify-center px-3 py-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs text-center min-w-[120px]"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-sky-50 text-[#006e98] flex items-center justify-center mb-1">
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <span className="text-[10px] font-extrabold tracking-wider text-slate-700">
                                                {badge.label}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Products Bullet List + Details Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
                        {/* 9 Core Products from Slide 3 */}
                        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-[#006e98] mb-4">
                                Core Packaging & Print Portfolio
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {solutionList.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                                        <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-2.5 h-2.5" />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Technical detail paragraph from Slide 3 */}
                            <div className="mt-6 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Every solution is developed with a strong emphasis on print quality, structural integrity, accurate reproduction, consistency and application suitability. Our experienced technical and production teams work closely with customers to understand their product, packaging and branding requirements and deliver solutions that balance quality, functionality and commercial viability.
                            </div>
                        </div>

                        {/* Packaging Visual from ImageKit */}
                        <div className="lg:col-span-5">
                            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                                <img
                                    src="https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774736960_8b926310-88f1-46b5-b10d-bcb3ca84cb12_rnTp_Wu0w.webp?updatedAt=1792774738841"
                                    alt="Sustainable and Premium Packaging Solutions"
                                    className="w-full h-72 sm:h-80 object-cover"
                                />
                                <div className="p-4 bg-gradient-to-r from-slate-900 to-[#0c1b33] text-white">
                                    <p className="text-xs font-bold text-[#facc15] uppercase tracking-wider">
                                        Eco-Friendly & Sustainable
                                    </p>
                                    <p className="text-[11px] text-slate-300 mt-0.5">
                                        Sustainable Packaging For A Better Tomorrow
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3 Pillar Cards: Vision, Mission, Commitment (Slide 3) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {corporatePillars.map((pillar, idx) => {
                            const IconComp = pillar.icon
                            return (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-block w-1 h-5 bg-[#facc15] rounded-full" />
                                                <h4 className="text-base sm:text-lg font-bold text-[#006e98]">
                                                    {pillar.title}
                                                </h4>
                                            </div>
                                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#006e98] flex items-center justify-center">
                                                <IconComp className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Slogan Banner from bottom of Slide 3 */}
                    <div className="mt-10 rounded-2xl bg-[#006e98] text-white p-6 sm:p-8 text-center shadow-md">
                        <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
                            Driven by <span className="text-[#facc15]">Quality.</span> Powered by <span className="text-[#facc15]">Precision.</span> Built on <span className="text-[#facc15]">Trust.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 4. CALL TO ACTION BANNER                                  */}
            {/* ========================================================= */}
            <section className="py-14 bg-[#0b1a30] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-yellow-300 border border-white/15">
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
                            <Phone className="w-3.5 h-3.5 text-yellow-400" />
                            <span>Call: +91 8956 055 398</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
