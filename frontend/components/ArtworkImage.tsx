'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

interface ArtworkImageProps {
  slug: string
  title?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  variant?: 'thumb' | 'fullsize'
  imageIndex?: number
  onImageReady?: (width: number, height: number) => void
}

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
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

const getBlurDataURL = (w: number, h: number) => `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`

function getImagePath(slug: string, variant: 'thumb' | 'fullsize', imageIndex: number, ext: 'webp' | 'jpg') {
  const id = String(Math.max(1, imageIndex)).padStart(3, '0')
  return `/images/artworks/${slug}/${variant}/${id}.${ext}`
}

export default function ArtworkImage({
  slug,
  title,
  width = 400,
  height = 400,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  variant = 'thumb',
  imageIndex = 1,
  onImageReady,
}: ArtworkImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [format, setFormat] = useState<'webp' | 'jpg'>('webp')

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setFormat('webp')
  }, [slug, variant, imageIndex])

  const imageUrl = useMemo(
    () => getImagePath(slug, variant, imageIndex, format),
    [slug, variant, imageIndex, format]
  )

  const altText = title || slug.replace(/-/g, ' ')

  return (
    <div className={`relative overflow-hidden bg-gradient-start ${className}`}>
      {isLoading && <div className="absolute inset-0 skeleton" aria-hidden="true" />}

      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-end">
          <div className="text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-500">Failed to load image</p>
          </div>
        </div>
      ) : (
        <Image
          src={imageUrl}
          alt={altText}
          width={width}
          height={height}
          sizes={sizes}
          className={`object-cover w-full h-full transition-opacity duration-motion ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          placeholder="blur"
          blurDataURL={getBlurDataURL(width, height)}
          priority={priority}
          onLoadingComplete={(img) => {
            setIsLoading(false)
            onImageReady?.(img.naturalWidth, img.naturalHeight)
          }}
          onError={() => {
            if (format === 'webp') {
              setFormat('jpg')
              setIsLoading(true)
              return
            }
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
    </div>
  )
}
