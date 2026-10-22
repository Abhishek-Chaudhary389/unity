import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
    Package,
    Send,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    Truck,
    Clock,
    PhoneCall,
    ArrowRight,
    MessageSquare
} from 'lucide-react'
import { submitEnquiryAPI } from '../services/api'

export default function Order() {
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
                message: `Inquiring about ${productParam} custom manufacturing and order placement.`
            }))
        } else if (clientProjectParam) {
            setFormData((prev) => ({
                ...prev,
                message: `I saw your packaging work for ${clientProjectParam} and would like to place a similar bespoke packaging order.`
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
        setToastMsg('🎉 Saving your order & opening WhatsApp...')

        // Save order to MongoDB in background
        submitEnquiryAPI(formData).catch((err) => {
            console.warn('Backend enquiry save warning:', err.message)
        })

        // Format message for WhatsApp
        const whatsappNumber = '919860455398'
        const textLines = [
            `*📦 NEW PACKAGING ORDER - UNITY PRINT PACK*`,
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
        <div className="bg-[#f8fafc] min-h-screen text-slate-800 py-10 sm:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Notification Toast */}
                {toastMsg && (
                    <div className="fixed top-20 right-6 z-50 bg-[#0c1b33] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold border border-slate-700 animate-fade-in max-w-md">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span>{toastMsg}</span>
                    </div>
                )}

                {/* ================= HERO HEADER ================= */}
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-amber-50 text-[#b47a36] border border-amber-200/70 mb-3 shadow-2xs">
                        <Package className="w-3.5 h-3.5 text-amber-500" />
                        <span>DIRECT FACTORY ORDER</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0c1b33] tracking-tight">
                        Place Your Packaging Order
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 mt-2.5 max-w-lg mx-auto leading-relaxed">
                        Fill in your details below to initiate custom packaging production. Direct manufacturer pricing with zero middleman margin.
                    </p>
                </div>

                {/* ================= CENTERED ORDER FORM CARD ================= */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/90 shadow-md">
                    {/* Order Steps Header */}
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                        <div>
                            <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">Step 1 of 1</span>
                            <h2 className="text-lg sm:text-xl font-bold text-[#0c1b33]">
                                Packaging Order Details
                            </h2>
                        </div>
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            100% In-House Production
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name & Company Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-slate-50/50"
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
                                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-slate-50/50"
                                />
                            </div>
                        </div>

                        {/* Phone & Quantity Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-slate-50/50"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Estimated Order Quantity (MOQ) *
                                </label>
                                <select
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-white cursor-pointer"
                                >
                                    <option value="500 pcs">500 pcs (Minimum Batch)</option>
                                    <option value="1,000 pcs">1,000 pcs (Standard Run)</option>
                                    <option value="2,500 pcs">2,500 pcs</option>
                                    <option value="5,000 pcs">5,000 pcs</option>
                                    <option value="10,000+ units">10,000+ units (Wholesale Production)</option>
                                </select>
                            </div>
                        </div>

                        {/* Project Details / Custom Instructions */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Order Details & Specifications
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Specify box type (Rigid Box, Corrugated Mailer, Paper Bag), approx dimensions, foil or UV finish requirements, and delivery location..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33] bg-slate-50/50"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitted}
                                className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white bg-[#0c1b33] hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                <MessageSquare className="w-4 h-4 text-emerald-400" />
                                <span>{isSubmitted ? 'Opening WhatsApp...' : 'Submit Packaging Order'}</span>
                            </button>
                        </div>
                    </form>

                    {/* Order Trust Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 mt-8 border-t border-slate-100 text-center">
                        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 py-2.5 px-3 rounded-xl">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>Zero Middlemen Margin</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 py-2.5 px-3 rounded-xl">
                            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span>Free Physical Sample Dummy</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 py-2.5 px-3 rounded-xl">
                            <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                            <span>Pan-India Safe Dispatches</span>
                        </div>
                    </div>
                </div>

                {/* Help text */}
                <div className="text-center mt-6 text-xs text-slate-500">
                    Need factory assistance first?{' '}
                    <Link to="/connect" className="text-sky-600 font-semibold hover:underline">
                        View our factory address and phone numbers
                    </Link>
                </div>
            </div>
        </div>
    )
}
