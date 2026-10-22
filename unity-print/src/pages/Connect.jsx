import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageSquare,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    Truck,
    Layers,
    FileText,
    Building,
    PhoneCall
} from 'lucide-react'
import { submitEnquiryAPI } from '../services/api'

export default function Connect() {
    const location = useLocation()

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        phone: '',
        quantity: '1,000 pcs',
        message: ''
    })

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [toastMsg, setToastMsg] = useState('')

    // Auto pre-fill from query params (e.g. ?product=... or ?clientProject=...)
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const productParam = params.get('product')
        const clientProjectParam = params.get('clientProject')

        if (productParam) {
            setFormData((prev) => ({
                ...prev,
                message: `Inquiring about ${productParam} custom manufacturing and wholesale quotation.`
            }))
        } else if (clientProjectParam) {
            setFormData((prev) => ({
                ...prev,
                message: `I saw your packaging work for ${clientProjectParam} and would like similar bespoke packaging manufactured for our brand.`
            }))
        }
    }, [location.search])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.fullName || !formData.phone) {
            alert('Please fill in your name and phone number.')
            return
        }

        setIsSubmitted(true)
        setToastMsg('🎉 Saving your packaging query & opening WhatsApp...')

        // Save enquiry to MongoDB in background
        submitEnquiryAPI(formData).catch((err) => {
            console.warn('Backend enquiry save warning:', err.message)
        })

        // Format message for WhatsApp
        const whatsappNumber = '919860455398'
        const textLines = [
            `*📦 NEW PACKAGING ORDER QUERY - UNITY PRINT PACK*`,
            ``,
            `👤 *Customer Name:* ${formData.fullName}`,
            formData.companyName ? `🏢 *Company / Brand:* ${formData.companyName}` : null,
            `📞 *Phone / WhatsApp:* ${formData.phone}`,
            `🔢 *Estimated Quantity (MOQ):* ${formData.quantity}`,
            formData.message ? `📝 *Order Details & Specs:* ${formData.message}` : null,
            ``,
            `_Sent from Unity Print Pack Solutions Website_`
        ].filter(Boolean).join('\n')

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textLines)}`

        // Open WhatsApp immediately (reliable with fallback)
        try {
            const win = window.open(whatsappUrl, '_blank')
            if (!win || win.closed || typeof win.closed === 'undefined') {
                window.location.href = whatsappUrl
            }
        } catch (err) {
            window.location.href = whatsappUrl
        }

        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({
                fullName: '',
                companyName: '',
                phone: '',
                quantity: '1,000 pcs',
                message: ''
            })
        }, 3500)
    }

    return (
        <div className="bg-[#fcfcfd] min-h-screen text-slate-800 py-10 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Notification Toast */}
                {toastMsg && (
                    <div className="fixed top-20 right-6 z-50 bg-[#0c1b33] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold border border-slate-700 animate-fade-in max-w-md">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span>{toastMsg}</span>
                    </div>
                )}

                {/* ================= HERO HEADER ================= */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-amber-50 text-[#b47a36] border border-amber-200/70 mb-3 shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>DIRECT FACTORY PACKAGING ORDERS</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0c1b33] tracking-tight">
                        Place Your Packaging Order
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 mt-3 max-w-2xl mx-auto leading-relaxed">
                        Request instant manufacturing orders, custom dieline samples, or connect directly with our offset packaging engineers.
                    </p>
                </div>

                {/* ================= 2-COLUMN LAYOUT ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
                    {/* ================= LEFT COLUMN: CONTACT DETAILS & FACTORY INFO ================= */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Direct Contact Card */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                            <div>
                                <h3 className="text-lg font-serif font-bold text-[#0c1b33]">
                                    Corporate & Head Office
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    Direct manufacturing and packaging solutions with automated rigid box makers, offset printing, and pan-India dispatches.
                                </p>
                            </div>

                            {/* Contact items */}
                            <div className="space-y-4 pt-2">
                                {/* Corporate Office Pune */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0 border border-sky-100">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                            Corporate Office (Pune)
                                        </div>
                                        <div className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                                            A11, 304, Saffron, Megapolis, Hinjawadi Phase IV, Pune - 411057
                                        </div>
                                        <div className="text-xs text-sky-700 font-semibold mt-1">
                                            <a href="tel:+918956055398" className="hover:underline">
                                                📞 +91 8956 055 398
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Head Office Washim */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                                        <Building className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                            Head Office (Washim)
                                        </div>
                                        <div className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                                            34, D Wing, Patni Commercial Complex, Washim - 444505
                                        </div>
                                        <div className="text-xs text-emerald-700 font-semibold mt-1">
                                            <a href="tel:+917218362436" className="hover:underline">
                                                📞 +91 7218 362 436
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0 border border-indigo-100">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                            Email Address
                                        </div>
                                        <div className="text-xs sm:text-sm text-slate-600 mt-0.5">
                                            <a href="mailto:unityprintpacks@gmail.com" className="hover:text-sky-600 font-semibold">
                                                unityprintpacks@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Operating Hours */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 border border-amber-100">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                            Operating Hours
                                        </div>
                                        <div className="text-xs sm:text-sm text-slate-600 mt-0.5">
                                            Monday – Saturday: 9:00 AM – 7:30 PM IST (Sunday Closed)
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Direct WhatsApp Callout */}
                            <div className="pt-4 border-t border-slate-100">
                                <a
                                    href="https://wa.me/919860455398?text=Hi%20Unity%20Print%20Pack,%20I%20want%20to%20discuss%20a%20custom%20packaging%20project."
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    <span>Chat Directly on WhatsApp (+91 98604 55398)</span>
                                </a>
                            </div>
                        </div>

                        {/* Why Partner With Unity Card */}
                        <div className="bg-[#0c1b33] text-white rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                <span>The Unity Manufacturing Guarantee</span>
                            </h4>

                            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                                <li className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <span><strong>Zero Middlemen:</strong> 100% in-house manufacturing from raw paper slitting to final foil stamping.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <span><strong>Free Structural Sample:</strong> Rapid 48-hour physical dieline unprinted white dummy before mass printing.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <span><strong>Pan-India Shipping:</strong> Palletized container dispatches to Mumbai, Delhi, Bengaluru, Hyderabad, and nationwide.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* ================= RIGHT COLUMN: INTERACTIVE INQUIRY FORM ================= */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
                            <div className="mb-6 pb-4 border-b border-slate-100">
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0c1b33]">
                                    Place Your Packaging Order
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Share your packaging specifications below. Our technical estimator will provide detailed pricing and order confirmation within 24 hours.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                {/* Name & Company Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Your Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Abhishek Sharma"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-slate-50/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Company / Brand Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Royal Heritage Foods"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-slate-50/50"
                                        />
                                    </div>
                                </div>

                                {/* Phone & Quantity Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Phone / WhatsApp Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="e.g. +91 98765 43210"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-slate-50/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Estimated Order Quantity (MOQ) *
                                        </label>
                                        <select
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-white cursor-pointer"
                                        >
                                            <option value="500 pcs">500 pcs (Minimum Batch)</option>
                                            <option value="1,000 pcs">1,000 pcs (Standard Run)</option>
                                            <option value="2,500 pcs">2,500 pcs</option>
                                            <option value="5,000 pcs">5,000 pcs</option>
                                            <option value="10,000+ units">10,000+ units (Wholesale Production)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Project Description Textarea */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Project Details / Custom Instructions
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Describe your product, target launch date, special cavity requirements, delivery destination..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-slate-50/50"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitted}
                                        className="w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#0c1b33] hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                    >
                                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                                        <span>{isSubmitted ? 'Opening WhatsApp...' : 'Submit Packaging Order'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
