import Link from 'next/link'

export default function ArtworkDetail({ params }: { params: { id: string } }) {
  // TODO: Fetch artwork details based on ID
  const artwork = {
    id: params.id,
    title: 'Freedom is Gold',
    medium: 'Mixed Media on Canvas',
    dimensions: '23.6 W x 35.4 H x 0.8 D inches',
    price: '$1,520',
    available: true,
    description: 'This large gold-accented abstract explores themes of liberation and value through dynamic brushwork and metallic highlights. The piece invites contemplation on what we consider precious in life.',
    saatchiLink: 'https://www.saatchiart.com/art/Painting-Freedom-is-gold/836963/9566733/view'
  }

  const relatedWorks = [
    { id: '2', title: 'Soft Power N1', price: '$1,070' },
    { id: '3', title: 'Colors of the Wind', price: '$1,520' },
    { id: '4', title: 'Capture the Moment', price: '$1,420' },
  ]

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <Link href="/gallery" className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors">
          ← Back to Gallery
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Artwork Image */}
          <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">[Large Artwork Image]</span>
          </div>

          {/* Artwork Details */}
          <div>
            <h1 className="text-3xl font-light mb-6">{artwork.title}</h1>
            
            <div className="space-y-3 mb-8">
              <p className="text-gray-700">{artwork.medium}</p>
              <p className="text-gray-700">{artwork.dimensions}</p>
              <p className="text-2xl font-medium">{artwork.price}</p>
              <p className="text-green-600">✓ Available</p>
            </div>

            <div className="space-y-4 mb-8">
              <button className="w-full px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors">
                Inquire About This Piece
              </button>
              
              <a 
                href={artwork.saatchiLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-block text-center px-8 py-3 border border-black hover:bg-gray-100 transition-colors"
              >
                View on Saatchi Art ↗
              </a>
            </div>
          </div>
        </div>

        <hr className="my-16" />

        {/* About This Artwork */}
        <section className="max-w-4xl">
          <h2 className="text-2xl font-light mb-6">About This Artwork</h2>
          <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
        </section>

        <hr className="my-16" />

        {/* Related Works */}
        <section>
          <h2 className="text-2xl font-light mb-8">Related Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedWorks.map((work) => (
              <Link href={`/artwork/${work.id}`} key={work.id}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-gray-200 mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                    <span className="text-gray-500">[{work.title}]</span>
                  </div>
                  <h3 className="font-light group-hover:text-gray-600 transition-colors">{work.title}</h3>
                  <p className="font-medium mt-1">{work.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t">
          <Link href="/artwork/previous" className="text-gray-600 hover:text-black transition-colors">
            ← Previous
          </Link>
          <Link href="/artwork/next" className="text-gray-600 hover:text-black transition-colors">
            Next →
          </Link>
        </div>
      </div>
    </div>
  )
}