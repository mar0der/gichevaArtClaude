'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ArtworkImage from '@/components/ArtworkImage'
import SkeletonLoader from '@/components/SkeletonLoader'
import Lightbox from '@/components/Lightbox'
import { artworks, type Artwork } from '@/data/artworks'

function GalleryContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [filters, setFilters] = useState({
    size: 'all',
    price: 'all',
    medium: 'all',
  })
  const [visibleCount, setVisibleCount] = useState(12)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(0)
  const [cardAspectRatios, setCardAspectRatios] = useState<Record<number, number>>({})

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredArtworks = artworks.filter((artwork) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        artwork.title.toLowerCase().includes(query) ||
        artwork.medium.toLowerCase().includes(query) ||
        artwork.size.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    if (activeFilter === 'available' && !artwork.available) return false
    if (activeFilter === 'sold' && artwork.available) return false
    if (filters.size !== 'all' && artwork.sizeCategory !== filters.size) return false
    if (filters.price !== 'all' && artwork.priceCategory !== filters.price) return false
    if (filters.medium !== 'all' && artwork.medium !== filters.medium) return false

    return true
  })

  const displayedArtworks = filteredArtworks.slice(0, visibleCount)

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12)
      setIsLoadingMore(false)
    }, 600)
  }

  const openLightbox = (index: number) => {
    setSelectedArtworkIndex(index)
    setLightboxOpen(true)
  }

  const goToNext = () => {
    setSelectedArtworkIndex((prev) => (prev < displayedArtworks.length - 1 ? prev + 1 : prev))
  }

  const goToPrevious = () => {
    setSelectedArtworkIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const selectedArtwork: Artwork | undefined = displayedArtworks[selectedArtworkIndex]

  const ratioFromSize = (size: string): number => {
    const match = size.match(/(\d{2,3})\s*x\s*(\d{2,3})/i)
    if (!match) return 4 / 5
    const w = Number(match[1])
    const h = Number(match[2])
    if (!Number.isFinite(w) || !Number.isFinite(h) || h <= 0) return 4 / 5
    return Math.max(0.45, Math.min(1.8, w / h))
  }

  const getCardRatio = (artwork: Artwork): number => cardAspectRatios[artwork.id] ?? ratioFromSize(artwork.size)

  return (
    <>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-6xl md:text-7xl mb-4">Gallery</h1>
            <p className="text-lg text-gray-600 font-light">
              {searchQuery ? `Showing results for "${searchQuery}"` : 'Explore the complete collection of original artworks'}
            </p>
          </div>

          <div className="mb-12 space-y-6 bg-gradient-start p-6 rounded-card">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm font-medium text-gray-700 self-center">Show:</span>
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-motion button-hover ${
                  activeFilter === 'all'
                    ? 'bg-accent text-white shadow-card'
                    : 'bg-white text-primary hover:bg-gradient-end border border-gray-300'
                }`}
              >
                All Works
              </button>
              <button
                onClick={() => setActiveFilter('available')}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-motion button-hover ${
                  activeFilter === 'available'
                    ? 'bg-accent text-white shadow-card'
                    : 'bg-white text-primary hover:bg-gradient-end border border-gray-300'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setActiveFilter('sold')}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-motion button-hover ${
                  activeFilter === 'sold'
                    ? 'bg-accent text-white shadow-card'
                    : 'bg-white text-primary hover:bg-gradient-end border border-gray-300'
                }`}
              >
                Sold
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <select
                value={filters.size}
                onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-button bg-white transition-colors duration-motion"
              >
                <option value="all">Size: All</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>

              <select
                value={filters.price}
                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-button bg-white transition-colors duration-motion"
              >
                <option value="all">Price: All</option>
                <option value="low">Under $500</option>
                <option value="medium">$500-$1000</option>
                <option value="high">Over $1000</option>
              </select>

              <select
                value={filters.medium}
                onChange={(e) => setFilters({ ...filters, medium: e.target.value })}
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-button bg-white transition-colors duration-motion"
              >
                <option value="all">Medium: All</option>
                <option value="Acrylic">Acrylic</option>
                <option value="Mixed Media">Mixed Media</option>
                <option value="Oil">Oil</option>
              </select>
            </div>

            <p className="text-sm text-gray-600 font-medium">
              Showing <span className="text-[#d4a574]">{filteredArtworks.length}</span> of {artworks.length} artworks
            </p>
          </div>

          {isLoading ? (
            <SkeletonLoader type="gallery" />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedArtworks.map((artwork, index) => (
                  <div key={artwork.id} className="group animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <div
                      className="cursor-pointer transform transition-all duration-motion hover:-translate-y-1 group"
                      onClick={() => openLightbox(index)}
                    >
                      <div
                        className="relative bg-gradient-start overflow-hidden rounded-card shadow-card hover:shadow-card-hover transition-all duration-motion card-hover"
                        style={{ aspectRatio: `${getCardRatio(artwork)}` }}
                      >
                        <ArtworkImage
                          slug={artwork.slug}
                          title={artwork.title}
                          variant="thumb"
                          imageIndex={1}
                          width={400}
                          height={500}
                          className="transform transition-transform duration-motion group-hover:scale-110"
                          onImageReady={(width, height) => {
                            if (!width || !height) return
                            const nextRatio = Math.max(0.45, Math.min(1.8, width / height))
                            setCardAspectRatios((prev) => {
                              if (prev[artwork.id] && Math.abs(prev[artwork.id] - nextRatio) < 0.01) return prev
                              return { ...prev, [artwork.id]: nextRatio }
                            })
                          }}
                        />
                        {!artwork.available && (
                          <div className="absolute top-4 right-4 bg-status-error text-white px-3 py-1 text-xs font-medium uppercase tracking-wider rounded">
                            SOLD
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-motion" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-motion">
                          <p className="text-sm font-medium mb-1">{artwork.medium}</p>
                          <p className="text-xs opacity-90">Click to view fullscreen</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-primary group-hover:text-accent transition-colors duration-motion">
                          {artwork.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{artwork.size}</p>
                        <p className="text-lg font-semibold mt-2 text-accent">{artwork.available ? artwork.price : 'Sold'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredArtworks.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xl text-gray-600">No artworks found matching your criteria.</p>
                  <button
                    onClick={() => setFilters({ size: 'all', price: 'all', medium: 'all' })}
                    className="mt-4 text-[#d4a574] hover:text-[#b8935f] font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {displayedArtworks.length < filteredArtworks.length && (
                <div className="text-center mt-20">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="px-10 py-4 bg-gray-900 text-white font-medium tracking-wider hover:bg-[#d4a574] transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingMore ? 'LOADING...' : `LOAD MORE ARTWORKS (${filteredArtworks.length - displayedArtworks.length} remaining)`}
                  </button>
                </div>
              )}

              {selectedArtwork && (
                <Lightbox
                  isOpen={lightboxOpen}
                  onClose={() => setLightboxOpen(false)}
                  artwork={selectedArtwork}
                  onNext={goToNext}
                  onPrevious={goToPrevious}
                  hasNext={selectedArtworkIndex < displayedArtworks.length - 1}
                  hasPrevious={selectedArtworkIndex > 0}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default function Gallery() {
  return (
    <Suspense fallback={<SkeletonLoader type="gallery" />}>
      <GalleryContent />
    </Suspense>
  )
}
