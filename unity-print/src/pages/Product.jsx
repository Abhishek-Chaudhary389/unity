import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Package,
    Plus,
    Sparkles,
    ArrowRight,
    Check,
    Layers,
    X,
    Upload,
    Save
} from 'lucide-react'
import {
    getStoredProducts,
    saveStoredProducts,
    productCategories
} from '../data/productData'
import { getProductsAPI, createProductAPI } from '../services/api'

export default function Product() {
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [quickAddModalOpen, setQuickAddModalOpen] = useState(false)

    // Quick Add Form State
    const [newProduct, setNewProduct] = useState({
        title: '',
        category: 'rigid',
        moq: '500 pcs',
        image: '',
        specs: '',
        finishes: 'Gold Foil Stamping, Spot UV',
        description: '',
        isFeatured: false,
    })

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

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewProduct((prev) => ({ ...prev, image: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleQuickAddSubmit = (e) => {
        e.preventDefault()
        if (!newProduct.title || !newProduct.image) {
            alert('Please provide product title and image.')
            return
        }

        const catObj = productCategories.find((c) => c.id === newProduct.category)
        const finishesArr = typeof newProduct.finishes === 'string'
            ? newProduct.finishes.split(',').map((s) => s.trim()).filter(Boolean)
            : newProduct.finishes

        const itemToAdd = {
            id: 'prod-' + Date.now(),
            ...newProduct,
            categoryName: catObj ? catObj.name : 'Packaging',
            finishes: finishesArr.length > 0 ? finishesArr : ['Custom Finish'],
        }

        const updated = [itemToAdd, ...products]
        setProducts(updated)
        saveStoredProducts(updated)
        setQuickAddModalOpen(false)

        // Save to MongoDB backend in background
        createProductAPI(itemToAdd).catch((err) => {
            console.warn('Backend product creation notice:', err.message)
        })
        setNewProduct({
            title: '',
            category: 'rigid',
            moq: '500 pcs',
            image: '',
            specs: '',
            finishes: 'Gold Foil Stamping, Spot UV',
            description: '',
            isFeatured: false,
        })
        alert('🎉 Product added successfully to the catalog!')
    }

    // Filter products by selected category
    const filteredProducts = products.filter((prod) => {
        return selectedCategory === 'all' || prod.category === selectedCategory
    })

    return (
        <div className="bg-[#fdfdfd] min-h-screen text-slate-800 py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
                    <div>
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

                    {/* Add Product Button */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            onClick={() => setQuickAddModalOpen(true)}
                            className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#0c1b33] hover:bg-[#182b4a] shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>+ Add Product</span>
                        </button>
                    </div>
                </div>

                {/* ================= CATEGORY FILTER TABS ================= */}
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs mb-10 space-y-3">
                    {/* Category Filter Pills (Horizontal Buttons) */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                        {productCategories.map((cat) => {
                            const count = cat.id === 'all'
                                ? products.length
                                : products.filter((p) => p.category === cat.id).length
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                                        selectedCategory === cat.id
                                            ? 'bg-[#0c1b33] text-white shadow-xs'
                                            : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                                    }`}
                                >
                                    <span>{cat.name}</span>
                                    <span
                                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                                            selectedCategory === cat.id
                                                ? 'bg-white/20 text-white'
                                                : 'bg-slate-200 text-slate-600'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Results Counter Bar & Reset */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                        <span>
                            Showing <span className="font-bold text-slate-800">{filteredProducts.length}</span> of {products.length} packaging products
                        </span>
                        {selectedCategory !== 'all' && (
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className="text-sky-600 font-bold hover:underline cursor-pointer"
                            >
                                Show All (सभी देखें)
                            </button>
                        )}
                    </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((prod) => (
                            <div
                                key={prod.id}
                                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Image with Tag & MOQ Badges */}
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                                        <img
                                            src={prod.image}
                                            alt={prod.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-800 shadow-2xs border border-slate-100">
                                            {prod.categoryName || 'Packaging'}
                                        </div>
                                        {prod.isFeatured && (
                                            <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-2xs">
                                                Featured
                                            </div>
                                        )}
                                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold">
                                            MOQ: {prod.moq}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-5">
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1 mb-1.5">
                                            {prod.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                                            {prod.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Card Footer Buttons */}
                                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                                    <Link
                                        to={`/order?product=${encodeURIComponent(prod.title)}`}
                                        className="flex-1 py-2 px-3 text-center rounded-xl text-xs font-bold text-white bg-[#0c1b33] hover:bg-[#182b4a] shadow-2xs transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <span>Order</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                    <a
                                        href={`https://wa.me/919860455398?text=Hi%20Unity%20Print%20Pack,%20I%20am%20interested%20in%20${encodeURIComponent(prod.title)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="py-2 px-3 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
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

            {/* ================= QUICK ADD PRODUCT MODAL ================= */}
            {quickAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                    <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                                <div>
                                    <h3 className="text-xl font-bold text-[#0c1b33]">
                                        Add Product to Catalog
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        Quickly add a new packaging product from this panel.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setQuickAddModalOpen(false)}
                                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleQuickAddSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                        Product Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Luxury Velvet Rigid Gift Box"
                                        value={newProduct.title}
                                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                            Category *
                                        </label>
                                        <select
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-white"
                                        >
                                            {productCategories
                                                .filter((c) => c.id !== 'all')
                                                .map((c) => (
                                                    <option key={c.id} value={c.id}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                            MOQ *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. 500 pcs"
                                            value={newProduct.moq}
                                            onChange={(e) => setNewProduct({ ...newProduct, moq: e.target.value })}
                                            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                        Photo URL or Upload File *
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="url"
                                            placeholder="Paste image web link..."
                                            value={newProduct.image}
                                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                            className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33]"
                                        />
                                        <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 cursor-pointer flex items-center gap-1 transition-colors">
                                            <Upload className="w-3.5 h-3.5" />
                                            <span>Upload</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    {/* Preset Sample Photos for Fast Adding */}
                                    <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-500 mb-2">
                                        <span className="font-semibold">Quick Sample Photos:</span>
                                        <button
                                            type="button"
                                            onClick={() => setNewProduct({ ...newProduct, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop' })}
                                            className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer text-[10px]"
                                        >
                                            Rigid Box
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNewProduct({ ...newProduct, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop' })}
                                            className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer text-[10px]"
                                        >
                                            Mailer Box
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNewProduct({ ...newProduct, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop' })}
                                            className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer text-[10px]"
                                        >
                                            Paper Bag
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNewProduct({ ...newProduct, image: 'https://images.unsplash.com/photo-1608248597359-25081e7d5d78?q=80&w=1000&auto=format&fit=crop' })}
                                            className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer text-[10px]"
                                        >
                                            Stickers
                                        </button>
                                    </div>

                                    {newProduct.image && (
                                        <div className="mt-2 h-28 w-full rounded-xl overflow-hidden border border-slate-200">
                                            <img
                                                src={newProduct.image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                        Material Specs
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2.0mm Greyboard • 157 GSM Art Paper"
                                        value={newProduct.specs}
                                        onChange={(e) => setNewProduct({ ...newProduct, specs: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                        Finishes & Embellishments
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Gold Foil, Spot UV, Soft-Touch"
                                        value={newProduct.finishes}
                                        onChange={(e) => setNewProduct({ ...newProduct, finishes: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                        Short Description
                                    </label>
                                    <textarea
                                        rows={2}
                                        placeholder="Brief description of the product..."
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33]"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0c1b33] hover:bg-[#182b4a] shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Add Product to Catalog</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
