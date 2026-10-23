import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    LayoutDashboard,
    Package,
    Image as ImageIcon,
    Building2,
    Sparkles,
    Plus,
    Trash2,
    Edit3,
    Save,
    X,
    Upload,
    Clock,
    ShieldCheck,
    CheckCircle2,
    Activity,
    RotateCcw,
    Eye,
    ArrowRight,
    Search,
    Filter,
    ExternalLink,
    ChevronDown,
    Menu,
    Maximize2,
    Layers,
    Crown,
    MessageSquare,
    AlertCircle
} from 'lucide-react'
import {
    getStoredProducts,
    saveStoredProducts,
    resetToDefaultProducts,
    productCategories
} from '../data/productData'
import {
    getStoredGalleryPhotos,
    saveStoredGalleryPhotos,
    resetToDefaultGalleryPhotos
} from '../data/galleryData'
import {
    getStoredClients,
    saveStoredClients,
    resetToDefaultClients
} from '../data/clientData'
import {
    getProductsAPI,
    createProductAPI,
    updateProductAPI,
    deleteProductAPI,
    getGalleryAPI,
    createGalleryPhotoAPI,
    deleteGalleryPhotoAPI,
    getClientsAPI,
    createClientAPI,
    updateClientAPI,
    deleteClientAPI,
    checkBackendHealth
} from '../services/api'

export default function Admin() {
    // Current Active Tab: 'dashboard' | 'products' | 'gallery' | 'clients'
    const [activeTab, setActiveTab] = useState('dashboard')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [backendStatus, setBackendStatus] = useState({ connected: false, checked: false })

    // ================= STATE FOR COLLECTIONS =================
    const [products, setProducts] = useState([])
    const [galleryPhotos, setGalleryPhotos] = useState([])
    const [clients, setClients] = useState([])

    // Load initial data from localStorage and fetch from Node/MongoDB Backend
    useEffect(() => {
        setProducts(getStoredProducts())
        setGalleryPhotos(getStoredGalleryPhotos())
        setClients(getStoredClients())

        // Check backend server connection
        checkBackendHealth().then((res) => {
            setBackendStatus({
                connected: res.success,
                dbConnected: res.databaseConnected,
                imageKitConnected: res.imageKitConnected,
                checked: true
            })
        })

        // Fetch live data from MongoDB
        getProductsAPI().then((apiProds) => {
            if (apiProds && apiProds.length > 0) {
                setProducts(apiProds)
                saveStoredProducts(apiProds)
            }
        }).catch(() => {})

        getGalleryAPI().then((apiPhotos) => {
            if (apiPhotos && apiPhotos.length > 0) {
                setGalleryPhotos(apiPhotos)
                saveStoredGalleryPhotos(apiPhotos)
            }
        }).catch(() => {})

        getClientsAPI().then((apiClients) => {
            if (apiClients && apiClients.length > 0) {
                setClients(apiClients)
                saveStoredClients(apiClients)
            }
        }).catch(() => {})
    }, [])

    const showToast = (msg) => {
        setToastMessage(msg)
        setTimeout(() => setToastMessage(''), 3500)
    }

    // ================= 1. PRODUCTS MANAGEMENT STATE =================
    const [editingProductId, setEditingProductId] = useState(null)
    const [productSearch, setProductSearch] = useState('')
    const [productCategoryFilter, setProductCategoryFilter] = useState('all')
    const [productForm, setProductForm] = useState({
        title: '',
        category: 'rigid',
        moq: '500 pcs',
        image: '',
        specs: '',
        finishes: 'Gold Foil Stamping, Spot UV',
        description: '',
        isFeatured: false
    })

    const handleProductImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProductForm((prev) => ({ ...prev, image: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveProduct = (e) => {
        e.preventDefault()
        if (!productForm.title || !productForm.image) {
            alert('Please provide at least a Product Title and an Image URL/Upload.')
            return
        }

        const catObj = productCategories.find((c) => c.id === productForm.category)
        const categoryName = catObj ? catObj.name : 'Rigid Boxes'

        const finishesArray = Array.isArray(productForm.finishes)
            ? productForm.finishes
            : productForm.finishes
                ? productForm.finishes.split(',').map((f) => f.trim()).filter(Boolean)
                : []

        let updatedList
        if (editingProductId) {
            updatedList = products.map((p) =>
                p.id === editingProductId
                    ? {
                        ...p,
                        ...productForm,
                        categoryName,
                        finishes: finishesArray
                    }
                    : p
            )
            updateProductAPI(editingProductId, {
                ...productForm,
                categoryName,
                finishes: finishesArray
            }).catch((err) => console.warn('Product update backend notice:', err.message))
            showToast(`Product "${productForm.title}" updated successfully!`)
        } else {
            const newProd = {
                id: `prod-${Date.now()}`,
                ...productForm,
                categoryName,
                finishes: finishesArray
            }
            updatedList = [newProd, ...products]
            createProductAPI({
                ...productForm,
                categoryName,
                finishes: finishesArray
            }).catch((err) => console.warn('Product create backend notice:', err.message))
            showToast(`New Product "${productForm.title}" added to catalog!`)
        }

        setProducts(updatedList)
        saveStoredProducts(updatedList)
        resetProductForm()
    }

    const handleEditProduct = (prod) => {
        setEditingProductId(prod.id)
        setProductForm({
            title: prod.title || '',
            category: prod.category || 'rigid',
            moq: prod.moq || '500 pcs',
            image: prod.image || '',
            specs: prod.specs || '',
            finishes: Array.isArray(prod.finishes) ? prod.finishes.join(', ') : prod.finishes || '',
            description: prod.description || '',
            isFeatured: !!prod.isFeatured
        })
        setActiveTab('products')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const updated = products.filter((p) => p.id !== id)
            setProducts(updated)
            saveStoredProducts(updated)
            deleteProductAPI(id).catch((err) => console.warn('Product delete backend notice:', err.message))
            if (editingProductId === id) resetProductForm()
            showToast('Product removed from catalog.')
        }
    }

    const resetProductForm = () => {
        setEditingProductId(null)
        setProductForm({
            title: '',
            category: 'rigid',
            moq: '500 pcs',
            image: '',
            specs: '',
            finishes: 'Gold Foil Stamping, Spot UV',
            description: '',
            isFeatured: false
        })
    }

    // ================= 2. GALLERY MANAGEMENT STATE =================
    const [galleryForm, setGalleryForm] = useState({
        title: '',
        category: 'Rigid Boxes',
        url: ''
    })
    const [selectedLightboxPhoto, setSelectedLightboxPhoto] = useState(null)

    const handleGalleryImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setGalleryForm((prev) => ({ ...prev, url: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddGalleryPhoto = (e) => {
        e.preventDefault()
        if (!galleryForm.url) {
            alert('Please provide an image URL or upload a file for the gallery photo.')
            return
        }

        const newPhoto = {
            id: `photo-${Date.now()}`,
            title: galleryForm.title || 'Packaging Showcase Item',
            category: galleryForm.category || 'Rigid Boxes',
            url: galleryForm.url
        }

        const updated = [newPhoto, ...galleryPhotos]
        setGalleryPhotos(updated)
        saveStoredGalleryPhotos(updated)
        createGalleryPhotoAPI(newPhoto).catch((err) => console.warn('Gallery create backend notice:', err.message))
        setGalleryForm({ title: '', category: 'Rigid Boxes', url: '' })
        showToast('Photo uploaded to Gallery showcase!')
    }

    const handleDeleteGalleryPhoto = (id) => {
        if (window.confirm('Are you sure you want to delete this gallery photo?')) {
            const updated = galleryPhotos.filter((p) => p.id !== id)
            setGalleryPhotos(updated)
            saveStoredGalleryPhotos(updated)
            deleteGalleryPhotoAPI(id).catch((err) => console.warn('Gallery delete backend notice:', err.message))
            showToast('Photo removed from Gallery.')
        }
    }

    // ================= 3. CLIENT MANAGEMENT STATE =================
    const [editingClientId, setEditingClientId] = useState(null)
    const [clientForm, setClientForm] = useState({
        name: '',
        sector: 'Luxury Food & Sweets',
        category: 'food',
        partnershipYears: '5+ Years Partner',
        packagingVolume: '1.0 Million Units / Year',
        packagingImage: '',
        tagline: '',
        description: '',
        testimonial: '',
        reviewer: '',
        reviewerRole: ''
    })

    const handleClientImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setClientForm((prev) => ({ ...prev, packagingImage: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveClient = (e) => {
        e.preventDefault()
        if (!clientForm.name) {
            alert('Please provide at least a Client / Brand Name.')
            return
        }

        // Generate initials and monogram
        const initials = clientForm.name
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase() || 'UP'

        let updatedList
        if (editingClientId) {
            updatedList = clients.map((c) =>
                c.id === editingClientId
                    ? {
                        ...c,
                        ...clientForm,
                        logoText: clientForm.name.toUpperCase(),
                        logoInitial: initials
                    }
                    : c
            )
            updateClientAPI(editingClientId, {
                ...clientForm,
                logoText: clientForm.name.toUpperCase(),
                logoInitial: initials
            }).catch((err) => console.warn('Client update backend notice:', err.message))
            showToast(`Client Partner "${clientForm.name}" updated!`)
        } else {
            const newClient = {
                id: `client-${Date.now()}`,
                ...clientForm,
                logoText: clientForm.name.toUpperCase(),
                logoSub: clientForm.sector.toUpperCase(),
                logoInitial: initials,
                badgeColor: 'from-amber-600 to-yellow-500',
                accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
                deliverables: ['Custom Packaging Boxes', 'Branded Offset Print', 'Quality Inspection']
            }
            updatedList = [newClient, ...clients]
            createClientAPI(newClient).catch((err) => console.warn('Client create backend notice:', err.message))
            showToast(`New Client Partner "${clientForm.name}" added!`)
        }

        setClients(updatedList)
        saveStoredClients(updatedList)
        resetClientForm()
    }

    const handleEditClient = (c) => {
        setEditingClientId(c.id)
        setClientForm({
            name: c.name || '',
            sector: c.sector || 'Luxury Food & Sweets',
            category: c.category || 'food',
            partnershipYears: c.partnershipYears || '5+ Years Partner',
            packagingVolume: c.packagingVolume || '1.0 Million Units / Year',
            packagingImage: c.packagingImage || '',
            tagline: c.tagline || '',
            description: c.description || '',
            testimonial: c.testimonial || '',
            reviewer: c.reviewer || '',
            reviewerRole: c.reviewerRole || ''
        })
        setActiveTab('clients')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDeleteClient = (id) => {
        if (window.confirm('Are you sure you want to delete this client partner?')) {
            const updated = clients.filter((c) => c.id !== id)
            setClients(updated)
            saveStoredClients(updated)
            deleteClientAPI(id).catch((err) => console.warn('Client delete backend notice:', err.message))
            if (editingClientId === id) resetClientForm()
            showToast('Client partner removed.')
        }
    }

    const resetClientForm = () => {
        setEditingClientId(null)
        setClientForm({
            name: '',
            sector: 'Luxury Food & Sweets',
            category: 'food',
            partnershipYears: '5+ Years Partner',
            packagingVolume: '1.0 Million Units / Year',
            packagingImage: '',
            tagline: '',
            description: '',
            testimonial: '',
            reviewer: '',
            reviewerRole: ''
        })
    }

    // Reset everything to defaults
    const handleResetAllDefaults = () => {
        if (window.confirm('Reset all catalog products, gallery photos, and clients back to original factory defaults?')) {
            const p = resetToDefaultProducts()
            const g = resetToDefaultGalleryPhotos()
            const c = resetToDefaultClients()
            setProducts(p)
            setGalleryPhotos(g)
            setClients(c)
            showToast('All collections restored to initial defaults!')
        }
    }

    // Date formatting (e.g. "Tuesday, 20 October 2026")
    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    // Filtered products
    const filteredProducts = products.filter((p) => {
        const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter
        const matchesSearch =
            p.title?.toLowerCase().includes(productSearch.toLowerCase()) ||
            p.categoryName?.toLowerCase().includes(productSearch.toLowerCase()) ||
            p.specs?.toLowerCase().includes(productSearch.toLowerCase())
        return matchesCat && matchesSearch
    })

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex font-sans antialiased selection:bg-rose-500 selection:text-white">
            {/* ================= TOAST NOTIFICATION ================= */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-bold">{toastMessage}</span>
                    <button onClick={() => setToastMessage('')} className="ml-2 text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* ================= LEFT SIDEBAR ================= */}
            {/* Desktop Sidebar & Mobile Drawer */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-5 overflow-y-auto">
                    {/* Brand Logo & Portal Tag */}
                    <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-base tracking-tight text-slate-900">
                                    Unity Print
                                </span>
                            </div>
                            <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                                ADMIN PORTAL
                            </span>
                        </div>
                    </div>

                    {/* Server & DB Status Badge */}
                    <div className="mt-4 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[10px] space-y-1">
                        <div className="flex items-center justify-between font-semibold">
                            <span className="text-slate-500 uppercase tracking-wider">Backend API:</span>
                            <span className={backendStatus.connected ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                                {backendStatus.connected ? "● Running (5000)" : "○ Offline"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between font-semibold">
                            <span className="text-slate-500 uppercase tracking-wider">MongoDB:</span>
                            <span className={backendStatus.dbConnected ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                                {backendStatus.dbConnected ? "● Connected" : "○ Pending Atlas/URI"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between font-semibold">
                            <span className="text-slate-500 uppercase tracking-wider">ImageKit CDN:</span>
                            <span className={backendStatus.imageKitConnected ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                                {backendStatus.imageKitConnected ? "● Connected (Cloud)" : "○ Local"}
                            </span>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="mt-5 space-y-6">
                        <div>
                            <div className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-3 mb-2">
                                MAIN MENU
                            </div>

                            <nav className="space-y-1.5">
                                {/* 1. Dashboard / Hub */}
                                <button
                                    onClick={() => {
                                        setActiveTab('dashboard')
                                        setMobileMenuOpen(false)
                                    }}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === 'dashboard'
                                            ? 'bg-[#fdf2f4] text-[#e11d48] shadow-2xs border border-rose-100'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-[#e11d48]' : 'text-slate-400'}`} />
                                        <span>Dashboard</span>
                                    </div>
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-rose-100/70 text-rose-700">
                                        HUB
                                    </span>
                                </button>

                                {/* 2. Products */}
                                <button
                                    onClick={() => {
                                        setActiveTab('products')
                                        setMobileMenuOpen(false)
                                    }}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === 'products'
                                            ? 'bg-[#fdf2f4] text-[#e11d48] shadow-2xs border border-rose-100'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Package className={`w-4 h-4 ${activeTab === 'products' ? 'text-[#e11d48]' : 'text-slate-400'}`} />
                                        <span>Products</span>
                                    </div>
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                                        {products.length}
                                    </span>
                                </button>

                                {/* 3. Gallery Photos */}
                                <button
                                    onClick={() => {
                                        setActiveTab('gallery')
                                        setMobileMenuOpen(false)
                                    }}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === 'gallery'
                                            ? 'bg-[#fdf2f4] text-[#e11d48] shadow-2xs border border-rose-100'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <ImageIcon className={`w-4 h-4 ${activeTab === 'gallery' ? 'text-[#e11d48]' : 'text-slate-400'}`} />
                                        <span>Gallery Photos</span>
                                    </div>
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                                        {galleryPhotos.length}
                                    </span>
                                </button>

                                {/* 4. Clients */}
                                <button
                                    onClick={() => {
                                        setActiveTab('clients')
                                        setMobileMenuOpen(false)
                                    }}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        activeTab === 'clients'
                                            ? 'bg-[#fdf2f4] text-[#e11d48] shadow-2xs border border-rose-100'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Building2 className={`w-4 h-4 ${activeTab === 'clients' ? 'text-[#e11d48]' : 'text-slate-400'}`} />
                                        <span>Client Partners</span>
                                    </div>
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                                        {clients.length}
                                    </span>
                                </button>
                            </nav>
                        </div>

                        {/* System Preferences */}
                        <div>
                            <div className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase px-3 mb-2">
                                SYSTEM PREFERENCES
                            </div>
                            <nav className="space-y-1.5">
                                <button
                                    onClick={handleResetAllDefaults}
                                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 transition-colors cursor-pointer"
                                    title="Restore sample product, gallery, and client defaults"
                                >
                                    <RotateCcw className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
                                    <span>Reset All Defaults</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom: Terminate Session / Back to Website */}
                <div className="p-4 border-t border-slate-100">
                    <Link
                        to="/"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all shadow-2xs group"
                    >
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                        <span>View Live Website</span>
                    </Link>
                </div>
            </aside>

            {/* Mobile Backdrop */}
            {mobileMenuOpen && (
                <div
                    onClick={() => setMobileMenuOpen(false)}
                    className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden"
                />
            )}

            {/* ================= MAIN CONTENT WRAPPER ================= */}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
                {/* ================= TOP NAVBAR ================= */}
                <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
                    {/* Left: Mobile hamburger & Welcome */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
                            aria-label="Open sidebar"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div>
                            <div className="flex items-center gap-1.5">
                                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                                    <span>Welcome Back, Admin</span>
                                    <ShieldCheck className="w-4 h-4 text-rose-500 inline flex-shrink-0" />
                                </h1>
                            </div>
                            <p className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase mt-0.5">
                                MANAGE YOUR PLATFORM SECURELY
                            </p>
                        </div>
                    </div>

                    {/* Right: Date Badge & Admin Avatar */}
                    <div className="flex items-center gap-3">
                        {/* Live Date Pill */}
                        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-2xs">
                            <Clock className="w-3.5 h-3.5 text-rose-500" />
                            <span>{formattedDate}</span>
                        </div>

                        {/* Profile Pill */}
                        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
                                SA
                            </div>
                            <div className="hidden sm:flex flex-col text-left leading-tight">
                                <span className="text-xs font-bold text-slate-800">Admin Portal</span>
                                <span className="text-[9px] font-extrabold text-slate-400 tracking-wider">
                                    SUPER ADMIN
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ================= PAGE BODY ================= */}
                <main className="p-4 sm:p-8 flex-1 space-y-8 max-w-7xl w-full mx-auto">
                    {/* ================= CENTRAL DATA HUB HEADER ================= */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                                        <span>Central Data Hub</span>
                                        <Activity className="w-6 h-6 text-rose-500 animate-pulse" />
                                    </h2>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                                    Real-time platform catalog, gallery media showcase, and corporate brand partner management.
                                </p>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-rose-50 text-rose-600 border border-rose-200/80 shadow-2xs">
                                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                                    <span>LIVE DATA</span>
                                </div>
                            </div>
                        </div>

                        {/* ================= 4 STAT CARDS ROW ================= */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 pt-6 border-t border-slate-100">
                            {/* Card 1: Total Products */}
                            <div
                                onClick={() => setActiveTab('products')}
                                className="bg-[#eff6ff] border border-blue-100 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-2xs group-hover:scale-105 transition-transform">
                                    <Package className="w-5 h-5" />
                                </div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                                    {products.length}
                                </div>
                                <div className="text-xs font-bold text-blue-600 mt-1">
                                    Total Products
                                </div>
                            </div>

                            {/* Card 2: Gallery Photos */}
                            <div
                                onClick={() => setActiveTab('gallery')}
                                className="bg-[#fff1f2] border border-rose-100 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-2xs group-hover:scale-105 transition-transform">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                                    {galleryPhotos.length}
                                </div>
                                <div className="text-xs font-bold text-rose-600 mt-1">
                                    Active Photos
                                </div>
                            </div>

                            {/* Card 3: Client Partners */}
                            <div
                                onClick={() => setActiveTab('clients')}
                                className="bg-[#fefce8] border border-amber-100 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-600 shadow-2xs group-hover:scale-105 transition-transform">
                                    <Crown className="w-5 h-5" />
                                </div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                                    {clients.length}
                                </div>
                                <div className="text-xs font-bold text-amber-600 mt-1">
                                    Brand Partners
                                </div>
                            </div>

                            {/* Card 4: Platform Sync */}
                            <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-2xs">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                                    100%
                                </div>
                                <div className="text-xs font-bold text-slate-600 mt-1">
                                    Live Sync Status
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= TAB 0: DASHBOARD OVERVIEW ================= */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8">
                            {/* 3 Quick Launch Action Cards */}
                            <div>
                                <h3 className="text-sm font-extrabold tracking-wider uppercase text-slate-400 mb-4 px-1">
                                    QUICK MANAGEMENT ACTIONS
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Action 1: Product Add */}
                                    <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                                        <div>
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-900">
                                                Products Management
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                                Add luxury rigid boxes, corrugated mailers, paper bags, and labels to the customer catalog with MOQ and dieline specs.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                resetProductForm()
                                                setActiveTab('products')
                                            }}
                                            className="mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0c1b33] hover:bg-[#182b4a] shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Add / Manage Products ({products.length})</span>
                                        </button>
                                    </div>

                                    {/* Action 2: Gallery Photo Add */}
                                    <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                                        <div>
                                            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                                                <ImageIcon className="w-6 h-6" />
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-900">
                                                Gallery Media Showcase
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                                Upload high-resolution photography of finished packaging, hot foil stamping closeups, and Heidelberg print runs.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setActiveTab('gallery')}
                                            className="mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Upload Gallery Photo ({galleryPhotos.length})</span>
                                        </button>
                                    </div>

                                    {/* Action 3: Client Section Add */}
                                    <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                                        <div>
                                            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                                                <Building2 className="w-6 h-6" />
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-900">
                                                Client Brand Partners
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                                Highlight prestigious enterprise clients, annual volume, packaging case studies, and corporate executive reviews.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                resetClientForm()
                                                setActiveTab('clients')
                                            }}
                                            className="mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-amber-400 hover:bg-amber-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Add Brand Partner ({clients.length})</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Products Summary Table */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                        <Package className="w-4 h-4 text-blue-600" />
                                        <span>Recent Catalog Products</span>
                                    </h4>
                                    <button
                                        onClick={() => setActiveTab('products')}
                                        className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                                    >
                                        View All ({products.length}) →
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                                                <th className="pb-3 pl-1">Product</th>
                                                <th className="pb-3">Category</th>
                                                <th className="pb-3">MOQ</th>
                                                <th className="pb-3">Specs</th>
                                                <th className="pb-3 pr-1 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {products.slice(0, 5).map((prod) => (
                                                <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                                                    <td className="py-3 pl-1 flex items-center gap-3">
                                                        <img
                                                            src={prod.image}
                                                            alt={prod.title}
                                                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                                                        />
                                                        <span className="font-bold text-slate-800 line-clamp-1">
                                                            {prod.title}
                                                        </span>
                                                    </td>
                                                    <td className="py-3">
                                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                                                            {prod.categoryName || prod.category}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 font-semibold text-slate-600">
                                                        {prod.moq}
                                                    </td>
                                                    <td className="py-3 text-slate-500 max-w-xs truncate">
                                                        {prod.specs || 'Custom Dieline'}
                                                    </td>
                                                    <td className="py-3 pr-1 text-right space-x-2">
                                                        <button
                                                            onClick={() => handleEditProduct(prod)}
                                                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                                            title="Edit Product"
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProduct(prod.id)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                                            title="Delete Product"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= TAB 1: PRODUCTS MANAGEMENT ================= */}
                    {activeTab === 'products' && (
                        <div className="space-y-8">
                            {/* Product Form Card */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <Package className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">
                                                {editingProductId ? 'Edit Product Item' : 'Add New Product to Catalog'}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                All items appear live on the public Product Catalog page.
                                            </p>
                                        </div>
                                    </div>

                                    {editingProductId && (
                                        <button
                                            onClick={resetProductForm}
                                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Cancel Edit</span>
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleSaveProduct} className="mt-6 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Product Title */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Product Title *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={productForm.title}
                                                onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                                                placeholder="e.g. Luxury Velvet Rigid Box"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Product Category *
                                            </label>
                                            <select
                                                value={productForm.category}
                                                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            >
                                                {productCategories
                                                    .filter((c) => c.id !== 'all')
                                                    .map((cat) => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        {/* Minimum Order Quantity (MOQ) */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Minimum Order Quantity (MOQ)
                                            </label>
                                            <input
                                                type="text"
                                                value={productForm.moq}
                                                onChange={(e) => setProductForm({ ...productForm, moq: e.target.value })}
                                                placeholder="e.g. 500 pcs"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Material & Specifications */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Material & Specifications
                                            </label>
                                            <input
                                                type="text"
                                                value={productForm.specs}
                                                onChange={(e) => setProductForm({ ...productForm, specs: e.target.value })}
                                                placeholder="e.g. 2.0mm Greyboard • 157 GSM Art Paper"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Finishes */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Finishes & Treatments (Comma Separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={productForm.finishes}
                                            onChange={(e) => setProductForm({ ...productForm, finishes: e.target.value })}
                                            placeholder="e.g. Gold Foil Stamping, Spot UV, Soft-Touch Matte"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                        />
                                    </div>

                                    {/* Image Upload or Web URL */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Product Image * (File Upload or Direct URL)
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                            <div className="md:col-span-2 space-y-2">
                                                <input
                                                    type="text"
                                                    value={productForm.image}
                                                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                                    placeholder="Paste image URL (https://images.unsplash.com/...)"
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                                />
                                                <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors">
                                                    <Upload className="w-3.5 h-3.5" />
                                                    <span>Or Upload Image from Device</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleProductImageUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>

                                            {/* Preview Thumbnail */}
                                            <div className="flex items-center justify-center">
                                                {productForm.image ? (
                                                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                                                        <img
                                                            src={productForm.image}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setProductForm({ ...productForm, image: '' })}
                                                            className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition-colors"
                                                            title="Clear Image"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 text-[10px] text-center p-2">
                                                        <ImageIcon className="w-5 h-5 mb-1" />
                                                        <span>No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Description & Technical Details
                                        </label>
                                        <textarea
                                            rows="3"
                                            value={productForm.description}
                                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                            placeholder="Detailed technical specifications, flute dimensions, interior cavity linings..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                        />
                                    </div>

                                    {/* Featured Checkbox */}
                                    <div className="flex items-center gap-2.5 pt-1">
                                        <input
                                            type="checkbox"
                                            id="isFeatured"
                                            checked={productForm.isFeatured}
                                            onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <label htmlFor="isFeatured" className="text-xs font-semibold text-slate-700 cursor-pointer">
                                            Mark as Featured Product on Homepage
                                        </label>
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="pt-4 flex items-center gap-3">
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all flex items-center gap-2 cursor-pointer"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>{editingProductId ? 'Update Product' : 'Save & Publish Product'}</span>
                                        </button>

                                        {editingProductId && (
                                            <button
                                                type="button"
                                                onClick={resetProductForm}
                                                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Existing Products List & Search */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <span>Current Catalog Items</span>
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                            {filteredProducts.length}
                                        </span>
                                    </h3>

                                    {/* Search & Filter */}
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="relative">
                                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                                            <input
                                                type="text"
                                                value={productSearch}
                                                onChange={(e) => setProductSearch(e.target.value)}
                                                placeholder="Search products..."
                                                className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white"
                                            />
                                        </div>

                                        <select
                                            value={productCategoryFilter}
                                            onChange={(e) => setProductCategoryFilter(e.target.value)}
                                            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 focus:outline-none"
                                        >
                                            {productCategories.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Products Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                    {filteredProducts.map((p) => (
                                        <div
                                            key={p.id}
                                            className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                                    <img
                                                        src={p.image}
                                                        alt={p.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-xs text-slate-800 shadow-2xs">
                                                        {p.categoryName || p.category}
                                                    </span>
                                                    {p.isFeatured && (
                                                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-2xs">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="p-4 space-y-2">
                                                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                                                        {p.title}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                        {p.description || p.specs}
                                                    </p>
                                                    <div className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5 pt-1">
                                                        <span className="text-slate-400">MOQ:</span>
                                                        <span>{p.moq}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                                                <button
                                                    onClick={() => handleEditProduct(p)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(p.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= TAB 2: GALLERY PHOTOS MANAGEMENT ================= */}
                    {activeTab === 'gallery' && (
                        <div className="space-y-8">
                            {/* Upload Photo Form Card */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                                <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                                        <ImageIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            Upload High-Res Gallery Photo
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Photos added here are instantly shown on the public Gallery page.
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleAddGalleryPhoto} className="mt-6 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Photo Title / Caption */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Photo Caption / Title
                                            </label>
                                            <input
                                                type="text"
                                                value={galleryForm.title}
                                                onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                                                placeholder="e.g. Gold Foil Stamped Rigid Box"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Photo Category / Tag */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Category Tag
                                            </label>
                                            <select
                                                value={galleryForm.category}
                                                onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                                            >
                                                <option value="Rigid Boxes">Rigid Boxes</option>
                                                <option value="Mailers">Corrugated Mailers</option>
                                                <option value="Paper Bags">Paper Bags</option>
                                                <option value="Cartons">Folding Cartons</option>
                                                <option value="Labels">Labels & Stickers</option>
                                                <option value="Print">Commercial Print</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Image Upload or URL */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Photo File Upload or Direct Image URL *
                                        </label>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                                            <div className="md:col-span-2 space-y-2">
                                                <input
                                                    type="text"
                                                    value={galleryForm.url}
                                                    onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })}
                                                    placeholder="Paste image URL (https://images.unsplash.com/...)"
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                                                />
                                                <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer transition-colors border border-rose-200">
                                                    <Upload className="w-3.5 h-3.5 text-rose-600" />
                                                    <span>Upload Photo from Device</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleGalleryImageUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>

                                            {/* Preview Thumbnail */}
                                            <div className="flex items-center justify-center">
                                                {galleryForm.url ? (
                                                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                                                        <img
                                                            src={galleryForm.url}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setGalleryForm({ ...galleryForm, url: '' })}
                                                            className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition-colors"
                                                            title="Clear Image"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/30 flex flex-col items-center justify-center text-rose-400 text-[10px] text-center p-2">
                                                        <Upload className="w-5 h-5 mb-1" />
                                                        <span>Preview will appear here</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-400 shadow-md transition-all flex items-center gap-2 cursor-pointer"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Add Photo to Gallery</span>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Live Gallery Grid */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <span>Current Gallery Showcase</span>
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                                            {galleryPhotos.length} Photos
                                        </span>
                                    </h3>
                                    <Link
                                        to="/gallery"
                                        target="_blank"
                                        className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                                    >
                                        <span>View Live Gallery</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                                    {galleryPhotos.map((photo) => (
                                        <div
                                            key={photo.id}
                                            className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs hover:shadow-lg transition-all"
                                        >
                                            <img
                                                src={photo.url}
                                                alt={photo.title || 'Packaging Showcase'}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handleDeleteGalleryPhoto(photo.id)}
                                                        className="p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-md transition-colors cursor-pointer"
                                                        title="Delete Photo"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                <div>
                                                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-white/90 text-slate-800">
                                                        {photo.category || 'Showcase'}
                                                    </span>
                                                    <p className="text-[11px] font-semibold text-white mt-1 line-clamp-1">
                                                        {photo.title || 'Packaging Photo'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= TAB 3: CLIENT SECTION MANAGEMENT ================= */}
                    {activeTab === 'clients' && (
                        <div className="space-y-8">
                            {/* Client Partner Form Card */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">
                                                {editingClientId ? 'Edit Client Partner' : 'Add New Client / Brand Partner'}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                All clients appear live on the public Clients & Case Studies page.
                                            </p>
                                        </div>
                                    </div>

                                    {editingClientId && (
                                        <button
                                            onClick={resetClientForm}
                                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Cancel Edit</span>
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleSaveClient} className="mt-6 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Client Name */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Client / Brand Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={clientForm.name}
                                                onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                                                placeholder="e.g. Royal Heritage Confectionery"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Industry / Sector */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Industry / Sector *
                                            </label>
                                            <input
                                                type="text"
                                                value={clientForm.sector}
                                                onChange={(e) => setClientForm({ ...clientForm, sector: e.target.value })}
                                                placeholder="e.g. Luxury Food & Sweets"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Industry Category
                                            </label>
                                            <select
                                                value={clientForm.category}
                                                onChange={(e) => setClientForm({ ...clientForm, category: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                                            >
                                                <option value="food">Luxury Food & Sweets</option>
                                                <option value="cosmetics">Cosmetics & Personal Care</option>
                                                <option value="retail">Fashion & Luxury Boutiques</option>
                                                <option value="ecommerce">E-Commerce & Electronics</option>
                                                <option value="luxury">Jewellery & High Luxury</option>
                                                <option value="pharma">Pharma & Healthcare</option>
                                            </select>
                                        </div>

                                        {/* Partnership Duration */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Partnership Duration
                                            </label>
                                            <input
                                                type="text"
                                                value={clientForm.partnershipYears}
                                                onChange={(e) => setClientForm({ ...clientForm, partnershipYears: e.target.value })}
                                                placeholder="e.g. 5+ Years Partner"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Annual Volume */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Annual Packaging Volume
                                            </label>
                                            <input
                                                type="text"
                                                value={clientForm.packagingVolume}
                                                onChange={(e) => setClientForm({ ...clientForm, packagingVolume: e.target.value })}
                                                placeholder="e.g. 1.2 Million Boxes / Year"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                                            />
                                        </div>

                                        {/* Tagline */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Packaging Headline / Tagline
                                            </label>
                                            <input
                                                type="text"
                                                value={clientForm.tagline}
                                                onChange={(e) => setClientForm({ ...clientForm, tagline: e.target.value })}
                                                placeholder="e.g. Premium Festive Sweets & Artisanal Mithai Boxes"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Packaging Showcase Image */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Client Packaging Showcase Image (URL or Upload)
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                                            <div className="md:col-span-2 space-y-2">
                                                <input
                                                    type="text"
                                                    value={clientForm.packagingImage}
                                                    onChange={(e) => setClientForm({ ...clientForm, packagingImage: e.target.value })}
                                                    placeholder="Paste image URL (https://images.unsplash.com/...)"
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                                                />
                                                <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 cursor-pointer transition-colors border border-amber-200">
                                                    <Upload className="w-3.5 h-3.5 text-amber-600" />
                                                    <span>Upload Packaging Image</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleClientImageUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>

                                            {/* Preview Thumbnail */}
                                            <div className="flex items-center justify-center">
                                                {clientForm.packagingImage ? (
                                                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                                                        <img
                                                            src={clientForm.packagingImage}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setClientForm({ ...clientForm, packagingImage: '' })}
                                                            className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/70 text-white hover:bg-rose-600 transition-colors"
                                                            title="Clear Image"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/30 flex flex-col items-center justify-center text-amber-600 text-[10px] text-center p-2">
                                                        <Building2 className="w-5 h-5 mb-1" />
                                                        <span>Image Preview</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Case Study Description
                                        </label>
                                        <textarea
                                            rows="2"
                                            value={clientForm.description}
                                            onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                                            placeholder="Details on paper GSM, dieline fabrication, and solutions delivered..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                                        />
                                    </div>

                                    {/* Testimonial Quote & Reviewer */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Client Testimonial Quote
                                            </label>
                                            <input
                                                type="text"
                                                value={clientForm.testimonial}
                                                onChange={(e) => setClientForm({ ...clientForm, testimonial: e.target.value })}
                                                placeholder="e.g. Unity Print Pack transformed our festive presentation with structural precision."
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Reviewer Name & Role
                                            </label>
                                            <input
                                                type="text"
                                                value={clientForm.reviewer}
                                                onChange={(e) => setClientForm({ ...clientForm, reviewer: e.target.value })}
                                                placeholder="e.g. Vikramaditya Singhania (Head of Packaging)"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-2 flex items-center gap-3">
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-md transition-all flex items-center gap-2 cursor-pointer"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>{editingClientId ? 'Update Client Partner' : 'Save & Publish Client'}</span>
                                        </button>

                                        {editingClientId && (
                                            <button
                                                type="button"
                                                onClick={resetClientForm}
                                                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Existing Clients List */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <span>Current Brand Partners</span>
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                                            {clients.length} Clients
                                        </span>
                                    </h3>
                                    <Link
                                        to="/client"
                                        target="_blank"
                                        className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                                    >
                                        <span>View Live Client Page</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                </div>

                                <div className="space-y-4 mt-6">
                                    {clients.map((client) => (
                                        <div
                                            key={client.id}
                                            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-300/80 transition-all shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                {client.packagingImage ? (
                                                    <img
                                                        src={client.packagingImage}
                                                        alt={client.name}
                                                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white font-extrabold flex items-center justify-center text-lg flex-shrink-0">
                                                        {client.logoInitial || 'UP'}
                                                    </div>
                                                )}

                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h4 className="font-bold text-sm text-slate-900">
                                                            {client.name}
                                                        </h4>
                                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                                                            {client.sector}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 font-semibold">
                                                            • {client.partnershipYears}
                                                        </span>
                                                    </div>

                                                    <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                                                        {client.tagline || client.testimonial || client.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 self-end md:self-center">
                                                <button
                                                    onClick={() => handleEditClient(client)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClient(client.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
