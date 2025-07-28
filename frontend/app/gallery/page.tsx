'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ArtworkImage from '@/components/ArtworkImage'
import SkeletonLoader from '@/components/SkeletonLoader'
import Lightbox from '@/components/Lightbox'

export default function Gallery() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [filters, setFilters] = useState({
    size: 'all',
    price: 'all',
    medium: 'all'
  })
  const [visibleCount, setVisibleCount] = useState(12)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(0)

  // Simulate loading delay
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const artworks = [
    { id: 1, title: 'Mysterious Faces N2', price: '$2,380', size: '23.6 x 27.6', sizeCategory: 'large', priceCategory: 'high', medium: 'Mixed Media', available: true },
    { id: 2, title: 'Soft Power N1', price: '$1,070', size: '23.6 x 35.4', sizeCategory: 'large', priceCategory: 'high', medium: 'Mixed Media', available: true },
    { id: 3, title: 'Coral and Blue', price: '$510', size: '19.7 x 19.7', sizeCategory: 'medium', priceCategory: 'medium', medium: 'Mixed Media', available: true },
    { id: 4, title: 'Interlacement', price: '$550', size: '15.7 x 23.6', sizeCategory: 'medium', priceCategory: 'medium', medium: 'Acrylic', available: true },
    { id: 5, title: 'The Wave', price: '$380', size: '23.6 x 11.8', sizeCategory: 'medium', priceCategory: 'low', medium: 'Acrylic', available: true },
    { id: 6, title: 'Serenity', price: 'Sold', size: '11.8 x 15.7', sizeCategory: 'small', priceCategory: 'low', medium: 'Acrylic', available: false },
    { id: 7, title: 'Free Fall', price: '$410', size: '15.7 x 15.7', sizeCategory: 'medium', priceCategory: 'low', medium: 'Acrylic', available: true },
    { id: 8, title: 'Into the Deep', price: '$550', size: '15.7 x 23.6', sizeCategory: 'medium', priceCategory: 'medium', medium: 'Acrylic', available: true },
    { id: 9, title: 'Vanilla Sky', price: '$280', size: '7.9 x 11.8', sizeCategory: 'small', priceCategory: 'low', medium: 'Acrylic', available: true },
    { id: 10, title: 'Freedom is Gold', price: '$1,520', size: '23.6 x 35.4', sizeCategory: 'large', priceCategory: 'high', medium: 'Mixed Media', available: true },
    { id: 11, title: 'Awakening', price: '$1,130', size: '23.6 x 27.6', sizeCategory: 'large', priceCategory: 'high', medium: 'Mixed Media', available: true },
    { id: 12, title: 'Feel the Joy', price: '$1,050', size: '23.6 x 31.5', sizeCategory: 'large', priceCategory: 'high', medium: 'Mixed Media', available: true },
  ]

  const filteredArtworks = artworks.filter(artwork => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = 
        artwork.title.toLowerCase().includes(query) ||
        artwork.medium.toLowerCase().includes(query) ||
        artwork.size.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }
    
    // Other filters
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
    // Simulate API call
    setTimeout(() => {
      setVisibleCount(prev => prev + 8)
      setIsLoadingMore(false)
    }, 800)
  }

  const openLightbox = (index: number) => {
    setSelectedArtworkIndex(index)
    setLightboxOpen(true)
  }

  const goToNext = () => {
    setSelectedArtworkIndex(prev => 
      prev < displayedArtworks.length - 1 ? prev + 1 : prev
    )
  }

  const goToPrevious = () => {
    setSelectedArtworkIndex(prev => prev > 0 ? prev - 1 : prev)
  }

  return (
    <>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-6xl md:text-7xl mb-4">Gallery</h1>
            <p className="text-lg text-gray-600 font-light">
              {searchQuery 
                ? `Showing results for "${searchQuery}"` 
                : 'Explore the complete collection of original artworks'
              }
            </p>
          </div>
          
          {/* Filters */}
          <div className="mb-12 space-y-6 bg-gray-50 p-6 rounded-lg">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm font-medium text-gray-700 self-center">Show:</span>
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all ${
                  activeFilter === 'all' 
                    ? 'bg-[#d4a574] text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                All Works
              </button>
              <button 
                onClick={() => setActiveFilter('available')}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all ${
                  activeFilter === 'available' 
                    ? 'bg-[#d4a574] text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Available
              </button>
              <button 
                onClick={() => setActiveFilter('sold')}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all ${
                  activeFilter === 'sold' 
                    ? 'bg-[#d4a574] text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Sold
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select 
                value={filters.size}
                onChange={(e) => setFilters({...filters, size: e.target.value})}
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:border-[#d4a574] focus:outline-none transition-colors"
              >
                <option value="all">Size: All</option>
                <option value="small">Small (under 12")</option>
                <option value="medium">Medium (12"-24")</option>
                <option value="large">Large (over 24")</option>
              </select>
              
              <select 
                value={filters.price}
                onChange={(e) => setFilters({...filters, price: e.target.value})}
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:border-[#d4a574] focus:outline-none transition-colors"
              >
                <option value="all">Price: All</option>
                <option value="low">Under $500</option>
                <option value="medium">$500-$1000</option>
                <option value="high">Over $1000</option>
              </select>
              
              <select 
                value={filters.medium}
                onChange={(e) => setFilters({...filters, medium: e.target.value})}
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:border-[#d4a574] focus:outline-none transition-colors"
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

          {/* Gallery Grid */}
          {isLoading ? (
            <SkeletonLoader type="gallery" />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedArtworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div 
                  className="cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <ArtworkImage 
                      title={artwork.title} 
                      width={400} 
                      height={500} 
                      className="transform transition-transform duration-700 group-hover:scale-110"
                    />
                    {!artwork.available && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
                        SOLD
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium mb-1">{artwork.medium}</p>
                      <p className="text-xs opacity-90">Click to view fullscreen</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#d4a574] transition-colors">{artwork.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{artwork.size}"</p>
                    <p className="text-lg font-semibold mt-2 text-gray-900">{artwork.price}</p>
                  </div>
                </div>
              </div>
                ))}
              </div>

              {filteredArtworks.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xl text-gray-600">No artworks found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setActiveFilter('all')
                      setFilters({ size: 'all', price: 'all', medium: 'all' })
                    }}
                    className="mt-4 text-[#d4a574] hover:text-[#b8935f] font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Load More */}
              {displayedArtworks.length < filteredArtworks.length && (
                <div className="text-center mt-20">
                  <button 
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="px-10 py-4 bg-gray-900 text-white font-medium tracking-wider hover:bg-[#d4a574] transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingMore ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        LOADING...
                      </span>
                    ) : (
                      `LOAD MORE ARTWORKS (${filteredArtworks.length - displayedArtworks.length} remaining)`
                    )}
                  </button>
                </div>
              )}

              {/* Lightbox */}
              <Lightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                artwork={displayedArtworks[selectedArtworkIndex] || displayedArtworks[0]}
                onNext={goToNext}
                onPrevious={goToPrevious}
                hasNext={selectedArtworkIndex < displayedArtworks.length - 1}
                hasPrevious={selectedArtworkIndex > 0}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}