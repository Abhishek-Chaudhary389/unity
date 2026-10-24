import React from 'react'
import { Link } from 'react-router-dom'
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Package,
    MessageSquare,
    Settings
} from 'lucide-react'

export default function Footer() {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/product' },
        { name: 'Client', path: '/client' },
        { name: 'About', path: '/about' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Connect', path: '/connect' },
    ]

    const packagingTypes = [
        'Luxury Rigid & Gift Boxes',
        'Corrugated E-commerce Mailers',
        'Custom Kraft Shopping Bags',
        'Mono Cartons & Folding Boxes',
        'Waterproof Labels & Roll Stickers',
        'Commercial Catalogues & Brochures',
    ]

    return (
        <footer className="bg-[#0b1a30] text-slate-300 pt-10 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main 4-Column Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
                    {/* Column 1 & 2: Brand Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            {/* Geometric 3D CMYK Cube Logo */}
                            <div className="w-9 h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xs" fill="none">
                                    <polygon points="50,12 84,31 50,50 16,31" fill="#0284c7" />
                                    <polygon points="50,12 84,31 67,40 50,31" fill="#00aeef" />
                                    <polygon points="50,12 67,40 50,50 33,40" fill="#ec008c" />
                                    <polygon points="16,31 50,50 50,88 16,69" fill="#0369a1" />
                                    <polygon points="16,31 50,50 33,69 16,50" fill="#00aeef" />
                                    <polygon points="33,69 50,50 50,88 33,69" fill="#1e3a8a" />
                                    <polygon points="50,50 84,31 84,69 50,88" fill="#ec008c" />
                                    <polygon points="50,50 67,69 50,88" fill="#f43f5e" />
                                    <polygon points="67,50 84,31 84,69 67,69" fill="#fff200" />
                                    <polygon points="50,50 84,31 67,50" fill="#f59e0b" />
                                </svg>
                            </div>

                            <div className="flex flex-col leading-none">
                                <span className="font-extrabold text-xl tracking-tight text-white">
                                    UNITY
                                </span>
                                <span className="font-bold text-[9px] tracking-widest uppercase text-sky-400 mt-0.5">
                                    PRINT PACK SOLUTIONS
                                </span>
                            </div>
                        </Link>

                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                            Creative Packaging. Complete Solutions. We specialize in custom luxury rigid boxes, corrugated shipping mailers, retail paper bags, product labels, and Heidelberg offset commercial printing for premier brands across India.
                        </p>

                    </div>

                    {/* Column 3: Quick Navigation */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-xs">
                            {navLinks.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Packaging Solutions */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            Packaging Solutions
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-400">
                            {packagingTypes.map((type, idx) => (
                                <li key={idx}>
                                    <Link
                                        to="/product"
                                        className="hover:text-white transition-colors"
                                    >
                                        {type}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Offices & Contact */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            Offices & Contact
                        </h4>
                        <ul className="space-y-3 text-xs text-slate-400">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                    <strong className="text-slate-300">Corporate:</strong> A11, 304, Saffron, Megapolis, Hinjawadi Phase IV, Pune - 411057
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                    <strong className="text-slate-300">Head Office:</strong> 34, D Wing, Patni Commercial Complex, Washim - 444505
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                                <div className="flex flex-col gap-0.5">
                                    <a href="tel:+919860455398" className="hover:text-white transition-colors font-medium">
                                        Pune: +91 98604 55398
                                    </a>
                                    <a href="tel:+917218362436" className="hover:text-white transition-colors font-medium">
                                        Washim: +91 7218 362 436
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                                <a href="mailto:unityprintpacks@gmail.com" className="hover:text-white transition-colors">
                                    unityprintpacks@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                <a
                                    href="https://wa.me/919860455398?text=Hi%20Unity%20Print%20Pack,%20I%20have%20a%20packaging%20query."
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-emerald-300 text-emerald-400 transition-colors font-semibold"
                                >
                                    WhatsApp: +91 98604 55398
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Admin */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Unity Print Pack Solutions. All rights reserved.</p>
                    <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
                        <Link to="/about" className="hover:text-slate-300 transition-colors">
                            About Us
                        </Link>
                        <Link to="/connect" className="hover:text-slate-300 transition-colors">
                            Contact
                        </Link>
                        <span className="text-slate-700 hidden sm:inline">|</span>
                        <Link
                            to="/admin"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 hover:border-slate-500 transition-all shadow-xs group"
                            title="Admin Management Panel"
                        >
                            <Settings className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Admin Panel</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
