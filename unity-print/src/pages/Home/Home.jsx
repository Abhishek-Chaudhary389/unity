import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Sparkles,
    Phone,
    Package
} from 'lucide-react'
import unityHeroImg from '../../assets/unity home.png'
import {
    getStoredProducts,
    saveStoredProducts
} from '../../data/productData'
import { getProductsAPI } from '../../services/api'

export default function Home() {
    // 4 Showcase packaging & print items from client's portfolio
    const showcaseItems = [
        {
            id: 1,
            title: 'Custom Food & Cookie Folding Cartons',
            category: 'Food Packaging Cartons',
            tag: 'Food-Grade Certified',
            image: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774632176_Clipboard_03-28-2025_06_wdxm6CVZK.webp?updatedAt=1792774634411',
            description: 'Premium food-grade paperboard folding cartons engineered for bakery, confectionery, and FMCG products. Features vibrant multi-color offset print, food-safe barrier coating, and auto-lock bottom construction.',
            specs: [
                { label: 'MOQ', value: '1,000 pcs' },
                { label: 'Paper Board', value: '300 - 400 GSM FBB / ITC' },
                { label: 'Finishes', value: 'Gloss / Matte UV Coating' },
                { label: 'Structure', value: 'Crash-Lock / Tuck-End' },
            ],
            points: [
                'Food-safe low-migration inks & grease-resistant barrier lining',
                'High-speed auto-lock bottom for quick manual or automated filling',
                'Vibrant photo-realistic Heidelberg 4-color process printing',
            ],
        },
        {
            id: 2,
            title: 'Promotional Flyers, Leaflets & Marketing Prints',
            category: 'Commercial & Promotional Print',
            tag: 'High-Impact Promotional Print',
            image: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774736960_8b926310-88f1-46b5-b10d-bcb3ca84cb12_rnTp_Wu0w.webp?updatedAt=1792774738841',
            description: 'High-resolution promotional flyers, sales pamphlets, and festival marketing inserts. Printed with high-speed offset calibration on imported art paper to make retail offers and seasonal campaigns pop.',
            specs: [
                { label: 'MOQ', value: '1,000 pcs' },
                { label: 'Paper GSM', value: '130 - 250 GSM Art Paper' },
                { label: 'Printing', value: 'Full CMYK Offset Process' },
                { label: 'Sizes', value: 'A4, A5, Flyer / Custom Size' },
            ],
            points: [
                'Crisp high-definition imagery and vivid festival color fidelity',
                'Cost-effective bulk run pricing with fast turnaround delivery',
                'Gloss or silk-matte protective varnish coating options',
            ],
        },
        {
            id: 3,
            title: 'Retail Shelf Packaging & Confectionery Cartons',
            category: 'FMCG Retail Cartons',
            tag: 'Shelf-Ready Retail Cartons',
            image: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792772080690_Clipboard_03-28-2025_01_UzRNQNrvW.webp?updatedAt=1792772083109',
            description: 'Eye-catching branded confectionery and snack retail boxes crafted from premium Cyber XL PAC board. Engineered for maximum shelf appeal, structural rigidity, and seamless unboxing.',
            specs: [
                { label: 'MOQ', value: '1,000 pcs' },
                { label: 'Board Type', value: 'Cyber XL PAC / Virgin Board' },
                { label: 'Embellishment', value: 'Drip Off / Spot UV / Foil' },
                { label: 'Use Case', value: 'Cookies, Snacks & Sweets' },
            ],
            points: [
                'High structural strength protecting delicate cookies & confectionery',
                'Sharp die-cutting with custom window patching options available',
                'Consistent brand colors matching exact packaging guidelines',
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

    const [products, setProducts] = useState([])

    // Load products from cache and backend
    useEffect(() => {
        const local = getStoredProducts()
        if (local && local.length > 0) setProducts(local)

        getProductsAPI().then((apiProds) => {
            if (apiProds && apiProds.length > 0) {
                setProducts(apiProds)
                saveStoredProducts(apiProds)
            }
        }).catch(() => {})
    }, [])

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
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full pt-8 pb-4 sm:py-12 lg:py-24">
                    <div className="max-w-xl space-y-4 sm:space-y-6 text-center sm:text-left mx-auto sm:mx-0">
                        {/* Eyebrow Label */}
                        <p className="text-[11px] sm:text-[13px] font-bold tracking-widest uppercase text-[#b47a36]">
                            QUALITY PRINTING FOR YOUR BUSINESS
                        </p>

                        {/* Main Headline */}
                        <h1 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] leading-[1.12] font-serif font-bold text-[#0c1b33] tracking-tight">
                            {/* Mobile View: 1 single bold, polished hero line */}
                            <span className="sm:hidden text-[clamp(18.5px,5.8vw,26px)] font-serif font-extrabold text-[#0c1b33] tracking-[-0.01em] leading-tight block whitespace-nowrap text-center">
                                Design. Print. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b57324] via-[#d48b37] to-[#9e621d]">Grow</span> Your Business.
                            </span>
                            {/* Desktop & Tablet View: 3 lines */}
                            <span className="hidden sm:inline">
                                Design.<br />
                                Print. <span className="text-[#c07a2a]">Grow</span><br />
                                Your Business.
                            </span>
                        </h1>

                        {/* Subtitle Paragraph */}
                        <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-md mx-auto sm:mx-0 text-center sm:text-left">
                            Your trusted B2B printing partner for all business stationery and promotional
                            printing needs. High quality, timely delivery and bulk order support.
                        </p>

                        {/* Desktop CTA Buttons (Visible on desktop) */}
                        <div className="hidden lg:flex flex-wrap items-center gap-3.5 pt-1">
                            <Link
                                to="/order"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-[#0c1b33] hover:bg-[#182b4a] text-white shadow-sm hover:shadow-md transition-all"
                            >
                                <span>Order Now</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                to="/product"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#8c5e26] bg-white hover:bg-slate-50 border border-[#cca679] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                            >
                                <Package className="w-4 h-4 text-[#8c5e26]" />
                                <span>Product</span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Hero Packaging Image + Buttons Below (Visible on mobile/tablet) */}
                    <div className="lg:hidden mt-6 flex flex-col items-center justify-center w-full">
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

                        {/* Mobile CTA Buttons (Directly below photo) */}
                        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-5 pb-2">
                            <Link
                                to="/order"
                                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-[#0c1b33] hover:bg-[#182b4a] text-white shadow-sm hover:shadow-md transition-all"
                            >
                                <span>Order Now</span>
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Link>

                            <Link
                                to="/product"
                                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#8c5e26] bg-white hover:bg-slate-50 border border-[#cca679] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                            >
                                <Package className="w-3.5 h-3.5 text-[#8c5e26]" />
                                <span>Product</span>
                            </Link>
                        </div>
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
                            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-slate-200 group flex items-center justify-center">
                                {/* Ambient backdrop blurred layer so any image shape fits beautifully */}
                                <img
                                    src={activeItem.image}
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                                />
                                <img
                                    key={activeItem.id}
                                    src={activeItem.image}
                                    alt={activeItem.title}
                                    className="relative z-1 max-w-full max-h-full object-contain transition-all duration-700 ease-out transform group-hover:scale-102 drop-shadow-md"
                                />


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

                            {/* Thumbnail Row of Photos for Direct Clicking */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
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
                                    href="tel:+919860455398"
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                                    <span>+91 98604 55398</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ================= 3. FEATURED PRODUCTS (3 ITEMS + SEE MORE) ================= */}
            <section className="bg-white border-t border-slate-200/80 py-14 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Top Header */}
                    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-50 text-[#b47a36] border border-amber-200/70 mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>FEATURED PACKAGING PRODUCTS</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0c1b33] tracking-tight">
                            Explore Our Packaging Range
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-lg mx-auto">
                            High-precision offset printing, luxury rigid boxes, corrugated cartons, and custom packaging manufactured to your exact dieline specifications.
                        </p>
                    </div>

                    {/* 3 Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {products.slice(0, 3).map((prod) => (
                            <div
                                key={prod.id}
                                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-sky-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Image with Tag & MOQ Badges (Zero Cropping - No Top or Side Cut) */}
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100/90 flex items-center justify-center">
                                        {/* Ambient blur backdrop layer */}
                                        <img
                                            src={prod.image}
                                            alt=""
                                            aria-hidden="true"
                                            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
                                        />
                                        {/* Main uncropped image */}
                                        <img
                                            src={prod.image}
                                            alt={prod.title}
                                            className="relative z-1 max-w-full max-h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                                        />
                                        <div className="absolute z-2 top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-slate-800 shadow-2xs border border-slate-100">
                                            {prod.categoryName || 'Packaging'}
                                        </div>
                                        {prod.isFeatured && (
                                            <div className="absolute z-2 top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 bg-amber-400 text-slate-900 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-2xs">
                                                Featured
                                            </div>
                                        )}
                                        <div className="absolute z-2 bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 bg-black/75 backdrop-blur-md text-white px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold">
                                            MOQ: {prod.moq}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 sm:p-6">
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1 mb-1.5 sm:mb-2">
                                            {prod.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                                            {prod.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Card Footer Buttons */}
                                <div className="p-3 sm:p-5 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                                    <Link
                                        to={`/order?product=${encodeURIComponent(prod.title)}`}
                                        className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 text-center rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0c1b33] hover:bg-[#182b4a] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <span>Order</span>
                                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </Link>
                                    <a
                                        href={`https://wa.me/919860455398?text=Hi%20Unity%20Print%20Pack,%20I%20am%20interested%20in%20${encodeURIComponent(prod.title)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors text-center"
                                        title="Inquire on WhatsApp"
                                    >
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* See More Products CTA Button */}
                    <div className="mt-10 sm:mt-14 text-center">
                        <Link
                            to="/product"
                            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#0c1b33] hover:bg-[#182b4a] shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                        >
                            <span>See More Products</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
