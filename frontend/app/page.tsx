'use client'

import Link from 'next/link'
import ArtworkImage from '@/components/ArtworkImage'
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation'

export default function Home() {
  const featuredWorks = [
    { id: 1, title: 'Freedom is Gold', price: '$1,520', size: '23.6 W x 35.4 H' },
    { id: 2, title: 'Awakening', price: '$1,130', size: '23.6 W x 27.6 H' },
    { id: 3, title: 'Feel the Joy', price: '$1,050', size: '23.6 W x 31.5 H' },
    { id: 4, title: 'Chasing Horizons N1', price: '$650', size: '15.7 W x 23.6 H' },
    { id: 5, title: 'White Magic', price: '$400', size: '11.8 W x 15.7 H' },
    { id: 6, title: 'Ancient Secrets', price: '$670', size: '11.8 W x 15.7 H' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 z-10" />
        <HeroContent />
      </section>

      {/* Quote Section */}
      <QuoteSection />

      {/* Featured Works */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl mb-4">Featured Works</h2>
            <p className="text-lg text-gray-600 font-light">Discover the latest additions to the collection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">
            {featuredWorks.map((work, index) => (
              <FeaturedWorkCard key={work.id} work={work} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/gallery" 
              className="inline-block px-10 py-4 bg-[#d4a574] text-white font-medium tracking-wider hover:bg-[#b8935f] transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              VIEW FULL GALLERY
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h3 className="text-2xl font-bold mb-4 md:mb-0" style={{ fontFamily: 'Playfair Display, serif' }}>
              GICHEVA ART
            </h3>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-[#d4a574] transition-colors">Newsletter</a>
              <a href="https://instagram.com/gicheva.art" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a574] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#d4a574] transition-colors">Saatchi Art</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Radka Gicheva. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

function HeroContent() {
  const { ref: parallaxRef, offset } = useParallax(0.3)
  
  return (
    <div className="relative z-20 text-center animate-fade-in">
      <div 
        ref={parallaxRef}
        style={{ transform: `translateY(${offset}px)` }}
        className="relative w-[500px] h-[500px] mx-auto mb-8 shadow-2xl overflow-hidden group"
      >
        <ArtworkImage 
          title="Colors of the Wind" 
          width={500} 
          height={500} 
          className="transform transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <h1 className="text-5xl md:text-6xl mb-3 tracking-tight">Colors of the Wind</h1>
      <p className="text-lg text-gray-600 mb-8 font-light">23.6 W x 35.4 H • Mixed Media on Canvas</p>
      <div className="animate-bounce">
        <span className="text-[#d4a574] text-sm font-medium tracking-wider">SCROLL TO EXPLORE</span>
      </div>
    </div>
  )
}

function QuoteSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3 })
  
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto text-center">
      <div 
        ref={ref}
        className={`relative transition-all duration-1000 ${
          isInView 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <blockquote className="text-3xl md:text-4xl font-light italic leading-relaxed mb-8 text-gray-800">
          "Abstract art is the language of the soul, expressing what words cannot capture through color and form."
        </blockquote>
        <p className={`text-lg text-[#d4a574] font-medium tracking-wider transition-all duration-1000 delay-300 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}>— RADKA GICHEVA</p>
        <div className="absolute -top-10 -left-10 text-8xl text-gray-100 font-serif">"</div>
        <div className="absolute -bottom-10 -right-10 text-8xl text-gray-100 font-serif rotate-180">"</div>
      </div>
    </section>
  )
}

function FeaturedWorkCard({ work, index }: { work: any, index: number }) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 })
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link 
        href={`/artwork/${work.id}`}
        className="group cursor-pointer block"
      >
      <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-gray-100">
        <ArtworkImage 
          title={work.title} 
          width={400} 
          height={500} 
          className="transform transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-sm font-medium">VIEW DETAILS →</p>
        </div>
      </div>
      <h3 className="text-2xl mb-2 group-hover:text-[#d4a574] transition-colors">{work.title}</h3>
      <p className="text-gray-600 mb-1 font-light">{work.size}</p>
      <p className="text-xl font-semibold text-gray-900">{work.price}</p>
    </Link>
    </div>
  )
}