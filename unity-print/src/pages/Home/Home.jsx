import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    Download,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Sparkles,
    Phone
} from 'lucide-react'
import unityHeroImg from '../../assets/unity home.png'

export default function Home() {
    // 5 Showcase packaging items
    const showcaseItems = [
        {
            id: 1,
            title: 'Luxury Rigid & Magnetic Gift Boxes',
            category: 'Rigid Gift Boxes',
            tag: 'Premium Luxury Range',
            image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop',
            description: 'Handcrafted with high-density Kappa greyboard wrapped in imported art paper. Features concealed magnetic flap closures, sharp 90-degree V-groove structural edges, and precision laser-cut velvet EVA foam inserts.',
            specs: [
                { label: 'MOQ', value: '500 pcs' },
                { label: 'Board Thickness', value: '1.5mm - 3.0mm' },
                { label: 'Finishes', value: 'Gold Foil, Spot UV, Soft-Touch' },
                { label: 'Closure', value: 'Magnetic / Shoulder Neck' },
            ],
            points: [
                'Laser-cut custom velvet EVA foam & satin lining inserts',
                'Hot metallic foil stamping in Gold, Rose-Gold & Silver',
                'Ideal for jewelry, perfumes, electronics & corporate gifting',
            ],
        },
        {
            id: 2,
            title: 'Custom Corrugated Shipping Mailers',
            category: 'Mailer Cartons',
            tag: 'D2C E-Commerce Favorite',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
            description: 'Heavy-duty 3-ply and 5-ply fluted corrugated cartons engineered for maximum crush resistance and unforgettable unboxing moments. Supports high-resolution full-color printing inside and out.',
            specs: [
                { label: 'MOQ', value: '500 pcs' },
                { label: 'Flute Types', value: 'E-Flute / B-Flute' },
                { label: 'Printing', value: 'CMYK Inside-Out Print' },
                { label: 'Feature', value: 'Self-Locking & Tear-Strip' },
            ],
            points: [
                'Drop-test certified for pan-India courier safety',
                'Self-locking dust flaps for quick assembly without tape',
                '100% recyclable, biodegradable kraft corrugated board',
            ],
        },
        {
            id: 3,
            title: 'Eco-Friendly Kraft & Retail Paper Bags',
            category: 'Retail Paper Bags',
            tag: '100% Biodegradable',
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop',
            description: 'Sustainable virgin brown and bleached white kraft paper shopping bags with reinforced bottom cardboards and turn-over tops. Finished with premium twisted paper, braided cotton, or satin ribbon handles.',
            specs: [
                { label: 'MOQ', value: '1,000 pcs' },
                { label: 'Paper GSM', value: '180 - 300 GSM' },
                { label: 'Handles', value: 'Twisted Paper / Cotton Rope' },
                { label: 'Printing', value: 'Pantone Spot & Offset Print' },
            ],
            points: [
                'Heavy-load carrying capacity with reinforced base board',
                'Custom handle options in twisted paper, cotton, or satin ribbon',
                'Boutique foil-stamped or spot color brand monogram',
            ],
        },
        {
            id: 4,
            title: 'Waterproof Product Labels & Roll Stickers',
            category: 'Labels & Stickers',
            tag: 'Precision Die-Cut',
            image: 'https://images.unsplash.com/photo-1608248597359-25081e7d5d78?q=80&w=1200&auto=format&fit=crop',
            description: 'High-definition machine-applicable roll labels and sheet stickers crafted for cosmetics, jars, pharmaceuticals, and food packaging. Resistant to water, oil, freezing temperatures, and surface friction.',
            specs: [
                { label: 'MOQ', value: '1,000 pcs' },
                { label: 'Substrates', value: 'Chrome BOPP, Clear Vinyl, Foil' },
                { label: 'Finish', value: 'Gloss / Matte UV Varnish' },
                { label: 'Application', value: 'Machine & Manual Rolls' },
            ],
            points: [
                'Permanent waterproof & oil-resistant adhesive backing',
                'Cold foil & holographic metallic highlights available',
                'Custom contour kiss-cutting for any jar, bottle, or box shape',
            ],
        },
        {
            id: 5,
            title: 'Corporate Catalogues & Commercial Print',
            category: 'Commercial Print',
            tag: 'Offset Press Precision',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop',
            description: 'High-end multi-page product catalogues, corporate profiles, sales brochures, and annual reports printed with Heidelberg offset presses, strict Pantone calibration, and durable library bindings.',
            specs: [
                { label: 'MOQ', value: '500 pcs' },
                { label: 'Binding', value: 'Perfect Thermal / Saddle Stitch' },
                { label: 'Paper Stocks', value: '170 - 350 GSM Art Card' },
                { label: 'Embellishments', value: 'Scodix 3D UV & Embossing' },
            ],
            points: [
                'Strict spectrophotometer Pantone color consistency',
                'Velvet soft-touch thermal lamination for luxurious hand feel',
                'Custom gatefolds, die-cut covers, and textured finishes',
            ],
        },
    ]

    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [croppedHeroImg, setCroppedHeroImg] = useState(null)

    // Crop the packaging cluster from unity home.png so it is 100% centered on mobile screens
    useEffect(() => {
        const img = new Image()
        img.src = unityHeroImg
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas')
                // The packaging cluster is located from x: 44% to 100%, and y: 15% to 100%
                const sx = img.naturalWidth * 0.44
                const sy = img.naturalHeight * 0.15
                const sWidth = img.naturalWidth * 0.56
                const sHeight = img.naturalHeight * 0.85

                canvas.width = sWidth
                canvas.height = sHeight
                const ctx = canvas.getContext('2d')
                if (ctx) {
                    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight)
                    setCroppedHeroImg(canvas.toDataURL('image/png'))
                }
            } catch (e) {
                console.error('Could not crop hero image on canvas', e)
            }
        }
    }, [])

    // Auto-scroll through the photos every 3.8 seconds
    useEffect(() => {
        if (isPaused) return
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % showcaseItems.length)
        }, 3800)
        return () => clearInterval(timer)
    }, [isPaused, showcaseItems.length])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % showcaseItems.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length)

    const activeItem = showcaseItems[currentSlide]

    return (
        <div className="flex flex-col w-full bg-[#fdfdfd]">
            {/* ================= 1. HERO BANNER ================= */}
            <div className="relative w-full bg-[#fdfdfd] overflow-hidden">
                {/* Desktop Background Hero Image (Visible on desktop) */}
                <div
                    className="hidden lg:block absolute inset-0 bg-no-repeat bg-cover bg-right-top pointer-events-none"
                    style={{ backgroundImage: `url(${unityHeroImg})` }}
                />

                {/* Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 w-full pt-8 pb-4 sm:py-12 lg:py-24">
                    <div className="max-w-xl space-y-4 sm:space-y-6">
                        {/* Eyebrow Label */}
                        <p className="text-[11px] sm:text-[13px] font-bold tracking-widest uppercase text-[#b47a36]">
                            QUALITY PRINTING FOR YOUR BUSINESS
                        </p>

                        {/* Main Headline */}
                        <h1 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] leading-[1.12] font-serif font-bold text-[#0c1b33] tracking-tight">
                            Design.<br />
                            Print. <span className="text-[#c07a2a]">Grow</span><br />
                            Your Business.
                        </h1>

                        {/* Subtitle Paragraph */}
                        <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-md">
                            Your trusted B2B printing partner for all business stationery and promotional
                            printing needs. High quality, timely delivery and bulk order support.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1">
                            <Link
                                to="/order"
                                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-[#0c1b33] hover:bg-[#182b4a] text-white shadow-sm hover:shadow-md transition-all"
                            >
                                <span>Order Now</span>
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Link>

                            <a
                                href="#catalogue"
                                onClick={(e) => {
                                    e.preventDefault()
                                    alert('Catalogue download will be available soon.')
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#8c5e26] bg-white hover:bg-slate-50 border border-[#cca679] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                            >
                                <Download className="w-3.5 h-3.5 text-[#8c5e26]" />
                                <span>Download Catalogue</span>
                            </a>
                        </div>
                    </div>

                    {/* Mobile Hero Packaging Image (100% Centered Packaging Products) */}
                    <div className="lg:hidden mt-6 flex justify-center w-full">
                        {croppedHeroImg ? (
                            <img
                                src={croppedHeroImg}
                                alt="Unity Print Pack Packaging Products"
                                className="w-full max-w-sm sm:max-w-md mx-auto object-contain drop-shadow-sm"
                            />
                        ) : (
                            <div className="w-full max-w-sm sm:max-w-md aspect-[4/3] overflow-hidden flex justify-center items-center">
                                <img
                                    src={unityHeroImg}
                                    alt="Unity Print Pack Packaging Products"
                                    className="w-[220%] max-w-none h-auto -translate-x-[48%]"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ================= 2. AUTO-SCROLLING PACKAGING SHOWCASE ================= */}
            <section className="bg-slate-50/80 border-t border-slate-200/80 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Top Header */}
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-50 text-[#b47a36] border border-amber-200/70 mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>OUR PACKAGING RANGE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0c1b33] tracking-tight">
                            Crafted Packaging & Print Solutions
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Explore our custom structural packaging, luxury finishes, and offset printing capabilities.
                        </p>
                    </div>

                    {/* 2-Column Section: Left Photo Carousel, Right Detailed Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
                        
                        {/* LEFT SIDE: 4-5 Photos Auto-scrolling Carousel */}
                        <div
                            className="lg:col-span-7 flex flex-col gap-3.5"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* Main Active Image Box */}
                            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-slate-200 group">
                                <img
                                    key={activeItem.id}
                                    src={activeItem.image}
                                    alt={activeItem.title}
                                    className="w-full h-full object-cover transition-all duration-700 ease-out transform group-hover:scale-103"
                                />

                                {/* Floating Category Tag */}
                                <div className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/20 flex items-center gap-1.5 shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                    <span>{activeItem.category}</span>
                                </div>

                                {/* Slide Counter Badge */}
                                <div className="absolute top-3.5 right-3.5 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">
                                    {String(currentSlide + 1).padStart(2, '0')} / {String(showcaseItems.length).padStart(2, '0')}
                                </div>

                                {/* Previous Slide Button */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all cursor-pointer opacity-85 hover:opacity-100 hover:scale-105"
                                    aria-label="Previous Slide"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                {/* Next Slide Button */}
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all cursor-pointer opacity-85 hover:opacity-100 hover:scale-105"
                                    aria-label="Next Slide"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                {/* Bottom Auto-Play Progress Indicator */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                    <div
                                        className="h-full bg-gradient-to-r from-amber-400 to-rose-400 transition-all duration-300"
                                        style={{ width: `${((currentSlide + 1) / showcaseItems.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Thumbnail Row of all 5 Photos for Direct Clicking */}
                            <div className="grid grid-cols-5 gap-2 pt-1">
                                {showcaseItems.map((item, idx) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                            currentSlide === idx
                                                ? 'border-[#0c1b33] ring-2 ring-[#0c1b33]/25 scale-102 shadow-xs'
                                                : 'border-transparent opacity-60 hover:opacity-95'
                                        }`}
                                        title={item.title}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {currentSlide === idx && (
                                            <div className="absolute inset-0 bg-[#0c1b33]/15 pointer-events-none" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT SIDE: Written Information About Active Photo */}
                        <div className="lg:col-span-5 space-y-4">
                            {/* Eyebrow Tag */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-[#b47a36] border border-amber-200">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span>{activeItem.tag}</span>
                            </div>

                            {/* Product Title */}
                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0c1b33] tracking-tight leading-snug">
                                {activeItem.title}
                            </h3>

                            {/* Description Paragraph */}
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {activeItem.description}
                            </p>

                            {/* Key Highlights List */}
                            <div className="space-y-2 pt-1">
                                {activeItem.points.map((point, index) => (
                                    <div key={index} className="flex items-start gap-2 text-xs text-slate-700">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                        <span className="leading-snug">{point}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Specifications Grid */}
                            <div className="grid grid-cols-2 gap-2.5 pt-3 pb-2 border-t border-slate-100">
                                {activeItem.specs.map((spec, index) => (
                                    <div key={index} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{spec.label}</p>
                                        <p className="text-xs font-bold text-slate-800 mt-0.5">{spec.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 flex flex-wrap items-center gap-3">
                                <Link
                                    to="/connect"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#0c1b33] hover:bg-[#182b4a] text-white shadow-xs hover:shadow-sm transition-all"
                                >
                                    <span>Inquire For Custom Order</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>

                                <a
                                    href="tel:+918956055398"
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                                    <span>+91 8956 055 398</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
