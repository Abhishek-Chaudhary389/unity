import React, { useState, useEffect } from 'react'
import {
    Plus,
    X,
    Upload,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Image as ImageIcon
} from 'lucide-react'
import {
    defaultGalleryPhotos,
    getStoredGalleryPhotos,
    saveStoredGalleryPhotos,
    GALLERY_STORAGE_KEY as STORAGE_KEY
} from '../data/galleryData'
import { getGalleryAPI, createGalleryPhotoAPI, uploadImageAPI } from '../services/api'

export default function Gallery() {
    const [photos, setPhotos] = useState([])
    const [activeLightboxIndex, setActiveLightboxIndex] = useState(null)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [newPhotoUrl, setNewPhotoUrl] = useState('')

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

    const savePhotos = (updatedList) => {
        setPhotos(updatedList)
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList))
        } catch (e) {
            console.error('Failed to save gallery photos', e)
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                const cdnUrl = await uploadImageAPI(file)
                setNewPhotoUrl(cdnUrl)
            } catch (err) {
                console.warn('ImageKit direct upload warning, using local preview:', err.message)
                const reader = new FileReader()
                reader.onloadend = () => {
                    setNewPhotoUrl(reader.result)
                }
                reader.readAsDataURL(file)
            }
        }
    }

    const handleAddPhotoSubmit = (e) => {
        e.preventDefault()
        const newPhotoItem = {
            id: 'photo-' + Date.now(),
            title: 'Packaging Showcase Item',
            category: 'Rigid Boxes',
            url: newPhotoUrl
        }
        const updated = [newPhotoItem, ...photos]
        savePhotos(updated)
        setNewPhotoUrl('')
        setAddModalOpen(false)

        // Save to MongoDB backend
        createGalleryPhotoAPI(newPhotoItem).catch((err) => {
            console.warn('Backend gallery save notice:', err.message)
        })
    }

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
                {/* Header with minimal title and Add Photo button */}
                <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0c1b33] tracking-tight">
                            Gallery
                        </h1>
                    </div>

                    <button
                        onClick={() => setAddModalOpen(true)}
                        className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#0c1b33] hover:bg-[#182b4a] shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Photo</span>
                    </button>
                </div>

                {/* ================= PURE PHOTO GRID (WITHOUT ANY TEXT) ================= */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
                    {photos.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => openLightbox(index)}
                            className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            <img
                                src={item.url}
                                alt="Gallery item"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Minimal hover overlay with view icon */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="p-3 bg-white/90 backdrop-blur-md rounded-full text-slate-800 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <Maximize2 className="w-4 h-4" />
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

            {/* ================= ADD PHOTO MODAL ================= */}
            {addModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                    <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                            <h3 className="text-lg font-bold text-[#0c1b33] flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-sky-600" />
                                <span>Add Photo to Gallery</span>
                            </h3>
                            <button
                                onClick={() => setAddModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                    Photo URL or Upload File
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="url"
                                        placeholder="Paste image web link..."
                                        value={newPhotoUrl}
                                        onChange={(e) => setNewPhotoUrl(e.target.value)}
                                        className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0c1b33]"
                                    />
                                    <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 cursor-pointer flex items-center gap-1 transition-colors">
                                        <Upload className="w-3.5 h-3.5" />
                                        <span>Upload</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Image Preview */}
                            {newPhotoUrl && (
                                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs">
                                    <img
                                        src={newPhotoUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setNewPhotoUrl('')}
                                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0c1b33] hover:bg-[#182b4a] shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Photo</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
