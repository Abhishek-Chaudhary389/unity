import React, { useState, useEffect } from 'react'
import {
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2
} from 'lucide-react'
import {
    getStoredGalleryPhotos,
    saveStoredGalleryPhotos
} from '../data/galleryData'
import { getGalleryAPI } from '../services/api'

export default function Gallery() {
    const [photos, setPhotos] = useState([])
    const [activeLightboxIndex, setActiveLightboxIndex] = useState(null)

    useEffect(() => {
        const local = getStoredGalleryPhotos()
        if (local && local.length > 0) setPhotos(local)

        getGalleryAPI().then((apiPhotos) => {
            if (apiPhotos && apiPhotos.length > 0) {
                setPhotos(apiPhotos)
                saveStoredGalleryPhotos(apiPhotos)
            }
        }).catch(() => {})
    }, [])

    const openLightbox = (index) => {
        setActiveLightboxIndex(index)
    }

    const closeLightbox = () => {
        setActiveLightboxIndex(null)
    }

    const nextPhoto = (e) => {
        e.stopPropagation()
        if (activeLightboxIndex !== null) {
            setActiveLightboxIndex((activeLightboxIndex + 1) % photos.length)
        }
    }

    const prevPhoto = (e) => {
        e.stopPropagation()
        if (activeLightboxIndex !== null) {
            setActiveLightboxIndex(
                (activeLightboxIndex - 1 + photos.length) % photos.length
            )
        }
    }

    return (
        <div className="bg-[#fcfcfd] min-h-screen text-slate-800 py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with minimal title */}
                <div className="mb-8 pb-5 border-b border-slate-200">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0c1b33] tracking-tight">
                        Gallery
                    </h1>
                </div>

                {/* ================= MASONRY PHOTO GRID (NO CROPPING: ZERO SIDES OR TOP CUT) ================= */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-6">
                    {photos.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => openLightbox(index)}
                            className="break-inside-avoid mb-3 sm:mb-6 group relative rounded-xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            <img
                                src={item.url}
                                alt="Gallery item"
                                className="w-full h-auto block group-hover:scale-103 transition-transform duration-500"
                                loading="lazy"
                            />

                            {/* Minimal hover overlay with view icon */}
                            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="p-2 sm:p-3 bg-white/90 backdrop-blur-md rounded-full text-slate-800 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= LIGHTBOX PREVIEW MODAL ================= */}
            {activeLightboxIndex !== null && (
                <div
                    onClick={closeLightbox}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
                        title="Close preview"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Previous Button */}
                    <button
                        onClick={prevPhoto}
                        className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
                        title="Previous photo"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Active Photo */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center"
                    >
                        <img
                            src={photos[activeLightboxIndex]?.url}
                            alt="Preview"
                            className="max-h-[85vh] max-w-full object-contain rounded-xl"
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextPhoto}
                        className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
                        title="Next photo"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            )}
        </div>
    )
}
