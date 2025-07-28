'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import ArtworkImage from './ArtworkImage'

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  artwork: {
    id: number
    title: string
    price: string
    size: string
    medium: string
    available: boolean
  }
  onNext?: () => void
  onPrevious?: () => void
  hasNext?: boolean
  hasPrevious?: boolean
}

export default function Lightbox({
  isOpen,
  onClose,
  artwork,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false
}: LightboxProps) {
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowRight':
        if (hasNext && onNext) onNext()
        break
      case 'ArrowLeft':
        if (hasPrevious && onPrevious) onPrevious()
        break
    }
  }, [isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Artwork lightbox"
    >
      <div className="relative h-full flex items-center justify-center p-4 md:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Close lightbox"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation buttons */}
        {hasPrevious && onPrevious && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white transition-colors bg-black/50 rounded-full hover:bg-black/70"
            aria-label="Previous artwork"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {hasNext && onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white transition-colors bg-black/50 rounded-full hover:bg-black/70"
            aria-label="Next artwork"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Main content */}
        <div 
          className="relative max-w-7xl w-full h-full flex flex-col lg:flex-row items-center gap-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="flex-1 h-full flex items-center justify-center">
            <div className="relative w-full h-full max-h-[80vh] aspect-[4/5]">
              <ArtworkImage
                title={artwork.title}
                width={800}
                height={1000}
                className="rounded-lg overflow-hidden shadow-2xl"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:w-96 bg-white/10 backdrop-blur-md rounded-lg p-8 text-white">
            <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {artwork.title}
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-white/20">
                <span className="text-white/70">Medium</span>
                <span className="font-medium">{artwork.medium}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/20">
                <span className="text-white/70">Size</span>
                <span className="font-medium">{artwork.size}"</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/20">
                <span className="text-white/70">Price</span>
                <span className="text-2xl font-semibold text-[#d4a574]">
                  {artwork.available ? artwork.price : 'SOLD'}
                </span>
              </div>
            </div>

            {artwork.available ? (
              <button className="w-full px-8 py-4 bg-[#d4a574] hover:bg-[#b8935f] text-white font-medium tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl rounded">
                INQUIRE ABOUT THIS PIECE
              </button>
            ) : (
              <div className="text-center py-4 bg-red-500/20 rounded text-red-300 font-medium">
                This artwork has been sold
              </div>
            )}

            <p className="mt-6 text-sm text-white/60 text-center">
              International shipping available
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}