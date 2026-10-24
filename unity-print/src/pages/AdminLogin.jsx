import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
    ShieldCheck,
    Lock,
    Mail,
    Eye,
    EyeOff,
    ArrowRight,
    AlertCircle,
    CheckCircle2,
    Sparkles,
    ExternalLink,
    Loader2
} from 'lucide-react'
import { loginAdminAPI } from '../services/api'

export default function AdminLogin() {
    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // If user is already logged in, redirect straight to /admin
    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (token) {
            navigate('/admin', { replace: true })
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')

        if (!email.trim() || !password) {
            setErrorMessage('Please enter both email and password.')
            return
        }

        setIsLoading(true)

        try {
            await loginAdminAPI(email.trim(), password)
            // Redirect to previous requested page or /admin
            const destination = location.state?.from?.pathname || '/admin'
            navigate(destination, { replace: true })
        } catch (err) {
            console.error('Admin login error:', err)
            setErrorMessage(
                err.message || 'Invalid email or password. Please verify your credentials.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    // Convenient one-click autofill helper for the default admin credentials
    const handleAutofillDefault = () => {
        setEmail('admin@unityprint.com')
        setPassword('admin123')
        setErrorMessage('')
    }

    return (
        <div className="min-h-screen w-full bg-[#070f1e] text-slate-100 flex flex-col justify-between relative overflow-hidden select-none font-sans">
            {/* Ambient background glow accents */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Minimal Bar */}
            <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105">
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
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
                        <span className="font-black text-lg tracking-tight text-white">
                            UNITY
                        </span>
                        <span className="font-bold text-[9px] tracking-widest uppercase text-sky-400 mt-0.5">
                            PRINT PACK SOLUTIONS
                        </span>
                    </div>
                </Link>

                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                    <span>Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </Link>
            </header>

            {/* Central Login Card */}
            <main className="relative z-10 max-w-md w-full mx-auto px-4 py-8">
                <div className="bg-[#0c1a30]/85 backdrop-blur-xl rounded-3xl p-7 sm:p-10 border border-slate-700/60 shadow-2xl shadow-black/60 relative">
                    {/* Header Badge & Title */}
                    <div className="text-center mb-7">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-rose-500/25">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Admin Portal Login
                        </h1>
                        <p className="text-xs text-slate-400 mt-1.5">
                            Sign in to manage catalog products, gallery, and client orders.
                        </p>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                        <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
                            <span className="leading-relaxed">{errorMessage}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                Admin Email
                            </label>
                            <div className="relative flex items-center">
                                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="admin@unityprint.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                                    Password
                                </label>
                            </div>
                            <div className="relative flex items-center">
                                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-400 shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Signing In...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In to Admin Portal</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Quick Demo Autofill Helper */}
                    <div className="mt-6 pt-5 border-t border-slate-800 text-center">
                        <button
                            type="button"
                            onClick={handleAutofillDefault}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800/80 border border-slate-800 transition-all cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Autofill Default Credentials</span>
                        </button>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-6 text-xs text-slate-500">
                    Protected Admin Portal • Unity Print Pack Solutions
                </div>
            </main>

            {/* Bottom spacer */}
            <div className="h-6" />
        </div>
    )
}
