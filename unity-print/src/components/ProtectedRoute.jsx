import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getMeAPI, logoutAdmin } from '../services/api'
import { ShieldCheck, Loader2 } from 'lucide-react'

export default function ProtectedRoute({ children }) {
    const location = useLocation()
    const token = localStorage.getItem('adminToken')
    const [isVerifying, setIsVerifying] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(!!token)

    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false)
            setIsVerifying(false)
            return
        }

        // Verify session token with backend API
        getMeAPI()
            .then((admin) => {
                if (admin) {
                    localStorage.setItem('adminUser', JSON.stringify(admin))
                    setIsAuthenticated(true)
                }
            })
            .catch((err) => {
                // If token is invalid or expired, clear session
                const errMsg = err?.message?.toLowerCase() || ''
                if (errMsg.includes('expired') || errMsg.includes('invalid') || errMsg.includes('authorized') || errMsg.includes('token') || errMsg.includes('401')) {
                    logoutAdmin()
                    setIsAuthenticated(false)
                }
                // If backend is offline or network fails, keep cached token so admin isn't locked out offline
            })
            .finally(() => {
                setIsVerifying(false)
            })
    }, [token])

    // No token or invalid auth -> redirect to Admin Login
    if (!token || !isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />
    }

    // Checking authentication state
    if (isVerifying) {
        return (
            <div className="min-h-screen bg-[#081325] flex flex-col items-center justify-center text-white px-4">
                <div className="flex flex-col items-center gap-4 bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col items-center text-center gap-1.5">
                        <span className="text-sm font-bold text-white tracking-wide">
                            Unity Admin Portal
                        </span>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-500" />
                            <span>Verifying security credentials...</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return children
}
