'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/gallery?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-motion ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-white/80 backdrop-blur-sm py-6'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity duration-motion"
          aria-label="Gicheva Art - Home"
        >
          GICHEVA ART
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-primary hover:text-accent transition-colors duration-motion"
            aria-label="Search artworks"
            aria-expanded={searchOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Navigation Items */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium tracking-wide transition-all duration-motion hover:text-accent ${
                pathname === item.href 
                  ? 'text-accent' 
                  : 'text-primary'
              }`}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-motion ${
                  pathname === item.href ? 'w-full' : 'w-0 hover:w-full'
                }`}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 py-4 animate-fade-in">
          <div className="container mx-auto px-6">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artworks by title, style, or medium..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-button transition-all duration-motion"
                aria-label="Search artworks"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-2 bg-accent text-white rounded-button hover:bg-accent/90 transition-all duration-motion button-hover"
                aria-label="Submit search"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 animate-fade-in">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-lg font-medium transition-colors duration-motion ${
                  pathname === item.href 
                    ? 'text-accent' 
                    : 'text-primary hover:text-accent'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setSearchOpen(true)
                setMobileMenuOpen(false)
              }}
              className="flex items-center gap-2 py-2 text-lg font-medium text-primary hover:text-accent transition-colors duration-motion"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
