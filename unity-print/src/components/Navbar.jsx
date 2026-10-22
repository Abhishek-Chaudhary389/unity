import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/product' },
        { name: 'Client', path: '/client' },
        { name: 'About', path: '/about' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Connect', path: '/connect' },
    ]

    return (
        <header className="sticky top-0 z-50 bg-[#0b1a30]/95 backdrop-blur-md border-b border-slate-800/80 shadow-md transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        {/* Geometric 3D CMYK Cube Logo */}
                        <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
                                {/* Top Face */}
                                <polygon points="50,12 84,31 50,50 16,31" fill="#0284c7" />
                                <polygon points="50,12 84,31 67,40 50,31" fill="#00aeef" />
                                <polygon points="50,12 67,40 50,50 33,40" fill="#ec008c" />
                                {/* Left Face */}
                                <polygon points="16,31 50,50 50,88 16,69" fill="#0369a1" />
                                <polygon points="16,31 50,50 33,69 16,50" fill="#00aeef" />
                                <polygon points="33,69 50,50 50,88 33,69" fill="#1e3a8a" />
                                {/* Right Face */}
                                <polygon points="50,50 84,31 84,69 50,88" fill="#ec008c" />
                                <polygon points="50,50 67,69 50,88" fill="#f43f5e" />
                                <polygon points="67,50 84,31 84,69 67,69" fill="#fff200" />
                                <polygon points="50,50 84,31 67,50" fill="#f59e0b" />
                            </svg>
                        </div>

                        <div className="flex flex-col leading-none">
                            <span className="font-black text-xl sm:text-2xl tracking-tight text-white">
                                UNITY
                            </span>
                            <span className="font-bold text-[9.5px] sm:text-[10px] tracking-widest uppercase text-sky-400 mt-1">
                                PRINT PACK SOLUTIONS
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `text-xs sm:text-sm font-semibold transition-colors relative py-1 ${isActive
                                        ? 'text-white font-bold'
                                        : 'text-slate-300 hover:text-white'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {item.name}
                                        {isActive && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 via-amber-400 to-rose-400 rounded-full" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                        <Link
                            to="/order"
                            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all flex items-center gap-1 sm:gap-1.5 shadow-md shadow-amber-500/10"
                        >
                            <span>Order</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 focus:outline-none ml-0.5"
                                aria-label="Toggle navigation"
                            >
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-800 bg-[#0b1a30] shadow-xl animate-fade-in">
                    <div className="px-4 py-2.5 space-y-1">
                        {navLinks.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${isActive
                                        ? 'bg-slate-800/90 text-white font-bold border-l-2 border-amber-400'
                                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        <div className="pt-2 pb-1 space-y-2 border-t border-slate-800/70 mt-2">
                            <Link
                                to="/order"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-2 px-3 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center gap-1.5"
                            >
                                <span>Order</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
