'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ArtworkImageProps {
  title: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

// Using abstract art images from Unsplash that match the style
const artworkImages: Record<string, string> = {
  'Freedom is Gold': 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80',
  'Awakening': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
  'Feel the Joy': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
  'Chasing Horizons N1': 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80',
  'White Magic': 'https://images.unsplash.com/photo-1552084162-ec07b3f162dc?w=800&q=80',
  'Ancient Secrets': 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?w=800&q=80',
  'Colors of the Wind': 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80',
  'Mysterious Faces N2': 'https://images.unsplash.com/photo-1573096108468-702f6014ef28?w=800&q=80',
  'Soft Power N1': 'https://images.unsplash.com/photo-1575931319181-30cb7b5cf514?w=800&q=80',
  'Coral and Blue': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
  'Interlacement': 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
  'The Wave': 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&q=80',
  'Serenity': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
  'Free Fall': 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
  'Into the Deep': 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=800&q=80',
  'Vanilla Sky': 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800&q=80',
}

// Blur data URL for placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f0f0f0" offset="20%" />
      <stop stop-color="#e0e0e0" offset="50%" />
      <stop stop-color="#f0f0f0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f0f0f0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.5s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const getBlurDataURL = (w: number, h: number) => 
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`

export default function ArtworkImage({ 
  title, 
  width = 400, 
  height = 400, 
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: ArtworkImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  // Get image URL or use a default abstract art image
  const imageUrl = artworkImages[title] || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80'
  
  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 skeleton" aria-hidden="true" />
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500">Failed to load image</p>
          </div>
        </div>
      ) : (
        <Image
          src={imageUrl}
          alt={title}
          width={width}
          height={height}
          sizes={sizes}
          className={`object-cover w-full h-full transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          placeholder="blur"
          blurDataURL={getBlurDataURL(width, height)}
          priority={priority}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
    </div>
  )
}