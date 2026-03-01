import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArtworkImage from '@/components/ArtworkImage'
import { artworks, getArtworkById } from '@/data/artworks'

export default function ArtworkDetail({ params }: { params: { id: string } }) {
  const artworkId = Number(params.id)
  const artwork = Number.isFinite(artworkId) ? getArtworkById(artworkId) : undefined

  if (!artwork) {
    notFound()
  }

  const currentIndex = artworks.findIndex((item) => item.id === artwork.id)
  const previousArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : null
  const nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : null
  const relatedWorks = artworks.filter((item) => item.id !== artwork.id).slice(0, 3)

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <Link href="/gallery" className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors">
          ← Back to Gallery
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-[4/5] bg-gray-200 overflow-hidden rounded-card shadow-card">
            <ArtworkImage
              slug={artwork.slug}
              title={artwork.title}
              variant="fullsize"
              imageIndex={1}
              width={900}
              height={1100}
              className="h-full"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl font-light mb-6">{artwork.title}</h1>

            <div className="space-y-3 mb-8">
              <p className="text-gray-700">{artwork.medium}</p>
              <p className="text-gray-700">{artwork.size}</p>
              <p className="text-2xl font-medium">{artwork.available ? artwork.price : 'Sold'}</p>
              <p className={artwork.available ? 'text-green-600' : 'text-red-500'}>{artwork.available ? '✓ Available' : 'Sold'}</p>
            </div>

            <div className="space-y-4 mb-8">
              <button className="w-full px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors">
                Inquire About This Piece
              </button>

              {artwork.saatchiLink && (
                <a
                  href={artwork.saatchiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block text-center px-8 py-3 border border-black hover:bg-gray-100 transition-colors"
                >
                  View on Saatchi Art ↗
                </a>
              )}
            </div>
          </div>
        </div>

        <hr className="my-16" />

        <section className="max-w-4xl">
          <h2 className="text-2xl font-light mb-6">About This Artwork</h2>
          <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
        </section>

        <hr className="my-16" />

        <section>
          <h2 className="text-2xl font-light mb-8">Related Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedWorks.map((work) => (
              <Link href={`/artwork/${work.id}`} key={work.id}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-gray-200 mb-4 overflow-hidden rounded-card group-hover:shadow-lg transition-shadow">
                    <ArtworkImage slug={work.slug} title={work.title} variant="thumb" imageIndex={1} width={400} height={500} className="h-full" />
                  </div>
                  <h3 className="font-light group-hover:text-gray-600 transition-colors">{work.title}</h3>
                  <p className="font-medium mt-1">{work.available ? work.price : 'Sold'}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex justify-between mt-16 pt-8 border-t">
          {previousArtwork ? (
            <Link href={`/artwork/${previousArtwork.id}`} className="text-gray-600 hover:text-black transition-colors">
              ← Previous
            </Link>
          ) : (
            <span />
          )}

          {nextArtwork ? (
            <Link href={`/artwork/${nextArtwork.id}`} className="text-gray-600 hover:text-black transition-colors">
              Next →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  )
}
