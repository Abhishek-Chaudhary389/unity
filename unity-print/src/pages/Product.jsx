import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Package,
    Sparkles,
    ArrowRight
} from 'lucide-react'
import {
    getStoredProducts,
    saveStoredProducts
} from '../data/productData'
import { getProductsAPI } from '../services/api'

export default function Product() {
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')

    useEffect(() => {
        // Load initial cached products
        const local = getStoredProducts()
        if (local && local.length > 0) setProducts(local)

        // Fetch latest live products from MongoDB backend
        getProductsAPI().then((apiProds) => {
            if (apiProds && apiProds.length > 0) {
                setProducts(apiProds)
                saveStoredProducts(apiProds)
            }
        }).catch(() => {})
    }, [])

    // Filter products by selected category
    const filteredProducts = products.filter((prod) => {
        return selectedCategory === 'all' || prod.category === selectedCategory
    })

    return (
        <div className="bg-[#fdfdfd] min-h-screen text-slate-800 py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section Header */}
                <div className="mb-10 pb-6 border-b border-slate-200">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-amber-50 text-[#b47a36] border border-amber-200/70 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>PACKAGING & PRINT CATALOG</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0c1b33] tracking-tight">
                        Custom Packaging Products
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl">
                        High-precision offset printing, luxury rigid boxes, corrugated shipping mailers, and retail paper bags manufactured to your custom dieline specifications.
                    </p>
                </div>

                {/* ================= PRODUCT CARDS GRID ================= */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs max-w-lg mx-auto">
                        <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-800">No Packaging Products Found</h3>
                        <p className="text-xs text-slate-500 mt-1 mb-5">
                            Try adjusting your filter selection.
                        </p>
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#0c1b33] text-white hover:bg-[#182b4a] transition-all cursor-pointer"
                        >
                            View All Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {filteredProducts.map((prod) => (
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

                                    {/* Card Content - Enlarged Spacing & Typography */}
                                    <div className="p-3.5 sm:p-6">
                                        <h3 className="text-sm sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1 mb-1.5 sm:mb-2">
                                            {prod.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                                            {prod.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Card Footer Buttons - Enlarged and comfortable */}
                                <div className="p-3 sm:p-5 bg-slate-50/90 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
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
                )}
            </div>
        </div>
    )
}
