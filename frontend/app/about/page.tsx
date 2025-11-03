import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl mb-4 text-primary">About the Artist</h1>
          <div className="w-24 h-1 bg-accent"></div>
        </div>

        {/* Artist Info */}
        <div className="grid lg:grid-cols-5 gap-12 mb-24">
          <div className="lg:col-span-2">
            <div className="relative w-full overflow-hidden rounded-card shadow-card-hover">
              <Image
                src="/images/radka.jpg"
                alt="Radka Gicheva"
                width={400}
                height={500}
                className="w-full h-auto object-cover object-center"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
          
          <div className="lg:col-span-3 flex flex-col justify-center">
            <h2 className="text-5xl mb-4 text-primary">Radka Gicheva</h2>
            <p className="text-xl text-accent font-medium mb-2">Contemporary Abstract Artist</p>
            <p className="text-lg text-gray-600 mb-8">Based in Bulgaria • Creating since 2004</p>
            
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gradient-start rounded-card transition-all duration-motion hover:shadow-card">
                <p className="text-3xl font-bold text-accent">80+</p>
                <p className="text-sm text-gray-600 mt-1">Original Artworks</p>
              </div>
              <div className="p-4 bg-gradient-start rounded-card transition-all duration-motion hover:shadow-card">
                <p className="text-3xl font-bold text-accent">20+</p>
                <p className="text-sm text-gray-600 mt-1">Years Experience</p>
              </div>
              <div className="p-4 bg-gradient-start rounded-card transition-all duration-motion hover:shadow-card">
                <p className="text-3xl font-bold text-accent">15+</p>
                <p className="text-sm text-gray-600 mt-1">Countries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Biography */}
        <section className="mb-20">
          <h3 className="text-3xl mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Biography</h3>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              Radka Gicheva is a contemporary abstract artist whose vibrant compositions capture the essence of emotion 
              through color and form. Born and raised in Bulgaria, she discovered her passion for art at an early age, 
              spending countless hours exploring the interplay between light, shadow, and pigment.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              With over two decades of dedicated practice, Gicheva has developed a distinctive style that bridges the 
              gap between controlled technique and intuitive expression. Her work primarily features acrylics and mixed 
              media, creating textured surfaces that invite both visual and emotional exploration.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Each canvas becomes a journey of discovery, where layers of paint build upon one another to create depth 
              and movement. Her pieces have found homes in private collections across Europe, the United States, and 
              beyond, resonating with collectors who seek art that speaks to the soul.
            </p>
          </div>
        </section>

        {/* Artist Statement */}
        <section className="mb-20 bg-gray-50 p-12 rounded-lg">
          <h3 className="text-3xl mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Artist Statement</h3>
          <div className="relative">
            <span className="absolute -top-6 -left-6 text-8xl text-[#d4a574] opacity-20" style={{ fontFamily: 'Playfair Display, serif' }}>"</span>
            <blockquote className="text-xl md:text-2xl italic text-gray-700 leading-relaxed font-light">
              My art is a dialogue between chaos and harmony. Each piece begins as an exploration—layers of paint applied 
              intuitively, responding to the energy of the moment. Through this process, I seek to capture emotions that 
              transcend language and connect directly with the viewer's soul. Abstract art allows me to express what words 
              cannot, creating a visual language that speaks to our shared human experience.
            </blockquote>
            <span className="absolute -bottom-6 -right-6 text-8xl text-[#d4a574] opacity-20 rotate-180" style={{ fontFamily: 'Playfair Display, serif' }}>"</span>
          </div>
        </section>

        {/* Process & Technique */}
        <section className="mb-20">
          <h3 className="text-3xl mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Process & Technique</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4 text-[#d4a574]">Mediums</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Acrylic paints for vibrant, lasting color</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Mixed media for textural depth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Canvas and wood panel surfaces</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4 text-[#d4a574]">Approach</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Intuitive layering techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Balance between spontaneity and control</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Exploration of color relationships</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education & Recognition */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Education</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Academy of Fine Arts - Classical Drawing & Painting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Self-directed study in abstract expressionism</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Continuous exploration of contemporary techniques</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Recognition</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Featured artist on Saatchi Art</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>Works in private collections worldwide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#d4a574] mr-3">•</span>
                  <span>International shipping to collectors</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="text-center py-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg text-white">
          <h3 className="text-3xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Follow My Artistic Journey</h3>
          <p className="text-lg mb-8 opacity-90">Stay updated with my latest works and exhibitions</p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://instagram.com/gicheva.art" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-3 bg-[#d4a574] hover:bg-[#b8935f] transition-colors font-medium tracking-wider"
            >
              INSTAGRAM
            </a>
            <a 
              href="#" 
              className="px-8 py-3 border-2 border-white hover:bg-white hover:text-gray-900 transition-all font-medium tracking-wider"
            >
              SAATCHI ART
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
