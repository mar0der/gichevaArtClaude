export type SizeCategory = 'small' | 'medium' | 'large'
export type PriceCategory = 'low' | 'medium' | 'high'

export interface Artwork {
  id: number
  slug: string
  title: string
  medium: string
  size: string
  sizeCategory: SizeCategory
  price: string
  priceCategory: PriceCategory
  available: boolean
  description: string
  saatchiLink?: string
  featured?: boolean
}

const ARTWORK_SLUGS = [
  'abstract-n',
  'abstract-n11',
  'abstract-n21',
  'abstract-n23-my-soul-60x60cm',
  'abstract-n25-30x20cm',
  'abstract-n9-on-paper',
  'abstract-thoughts-n7',
  'ancient-secrets',
  'arabian-beauty-80x80-cm',
  'arabian-treasures-40x30cm',
  'awakening-70x60-cm',
  'butterflies',
  'capture-the-moment-90x60-cm',
  'chocolate-waves-n1-30x70-cm',
  'closer-to-my-heart',
  'colorful-desert',
  'colors-of-the-wind',
  'coral-and-blue',
  'dare-to-dream-42x30-cm',
  'desert-vibes-42x30cm',
  'euphory-30x42cm',
  'exergy-project',
  'face-30x20cm',
  'feel-the-joy-80x60-cm',
  'flowers-in-a-vase-30x20cm',
  'free-fall-40x40cm',
  'freedom-is-gold',
  'from-my-heart',
  'golden-desire',
  'gracefully-40x30-cm',
  'hidden-emotions-part-1',
  'hidden-emotions-part-2',
  'hope-70x50cm-acrylic',
  'illusions-in-blue-part-1',
  'illusions-in-blue-part-2',
  'illusions-in-blue-part-3',
  'imaginary-flowers-n1',
  'imaginary-flowers-n2',
  'inner-space-30x21-cm',
  'interlacement',
  'into-the-deep-60x40-cm',
  'light-in-the-darkness-80x80-cm',
  'mixosso-n1',
  'mixosso-n2',
  'monochrome-code-150x100-cm',
  'mysterious-faces-70x60cm',
  'mysterious-faces-n2-70x60cm',
  'seeking-the-path-30x42-cm',
  'serenity-40x30cm',
  'simplicity-30x70-cm',
  'soft-power-n1',
  'soft-power-n2',
  'stay-connected',
  'the-giraffe-40x30cm-acrylic-2020',
  'the-wave-triptych',
  'trees',
  'tryptich-abstract',
  'unicorn-power',
  'vanilla-sky-30x20-cm',
  'waves-300x100-cm',
  'white-magic',
  'zebra-30x20',
] as const

const OVERRIDES: Record<string, Partial<Artwork>> = {
  'freedom-is-gold': {
    title: 'Freedom is Gold',
    price: '$1,520',
    priceCategory: 'high',
    medium: 'Mixed Media',
    featured: true,
  },
  'awakening-70x60-cm': {
    title: 'Awakening',
    price: '$1,130',
    priceCategory: 'high',
    medium: 'Mixed Media',
    featured: true,
  },
  'feel-the-joy-80x60-cm': {
    title: 'Feel the Joy',
    price: '$1,050',
    priceCategory: 'high',
    medium: 'Mixed Media',
    featured: true,
  },
  'white-magic': {
    title: 'White Magic',
    price: '$400',
    priceCategory: 'low',
    medium: 'Acrylic',
    featured: true,
  },
  'ancient-secrets': {
    title: 'Ancient Secrets',
    price: '$670',
    priceCategory: 'medium',
    medium: 'Mixed Media',
    featured: true,
  },
  'colors-of-the-wind': {
    title: 'Colors of the Wind',
    price: '$1,520',
    priceCategory: 'high',
    medium: 'Mixed Media',
    featured: true,
  },
  'mysterious-faces-n2-70x60cm': {
    title: 'Mysterious Faces N2',
    price: '$2,380',
    priceCategory: 'high',
  },
  'soft-power-n1': {
    title: 'Soft Power N1',
    price: '$1,070',
    priceCategory: 'high',
  },
  'coral-and-blue': {
    title: 'Coral and Blue',
    price: '$510',
    priceCategory: 'medium',
  },
  'interlacement': {
    title: 'Interlacement',
    price: '$550',
    priceCategory: 'medium',
    medium: 'Acrylic',
  },
  'the-wave-triptych': {
    title: 'The Wave',
    price: '$380',
    priceCategory: 'low',
    medium: 'Acrylic',
  },
  'serenity-40x30cm': {
    title: 'Serenity',
    price: 'Sold',
    available: false,
    priceCategory: 'low',
    medium: 'Acrylic',
  },
  'free-fall-40x40cm': {
    title: 'Free Fall',
    price: '$410',
    priceCategory: 'low',
    medium: 'Acrylic',
  },
  'into-the-deep-60x40-cm': {
    title: 'Into the Deep',
    price: '$550',
    priceCategory: 'medium',
    medium: 'Acrylic',
  },
  'vanilla-sky-30x20-cm': {
    title: 'Vanilla Sky',
    price: '$280',
    priceCategory: 'low',
    medium: 'Acrylic',
  },
}

function titleFromSlug(slug: string): string {
  return slug
    .replace(/\b\d+x\d+\w*\b/gi, '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function inferMedium(slug: string): string {
  if (slug.includes('acrylic')) return 'Acrylic'
  if (slug.includes('oil')) return 'Oil'
  return 'Mixed Media'
}

function parseSize(slug: string): string {
  const match = slug.match(/(\d{2,3})x(\d{2,3})/)
  if (!match) return 'Variable Size'
  return `${match[1]} x ${match[2]} cm`
}

function parseSizeCategory(slug: string): SizeCategory {
  const match = slug.match(/(\d{2,3})x(\d{2,3})/)
  if (!match) return 'medium'

  const a = Number(match[1])
  const b = Number(match[2])
  const max = Math.max(a, b)

  if (max <= 30) return 'small'
  if (max <= 70) return 'medium'
  return 'large'
}

const DEFAULT_DESCRIPTION =
  'Original artwork from the Radka Gicheva collection. Contact for availability, pricing details, and international shipping information.'

export const artworks: Artwork[] = ARTWORK_SLUGS.map((slug, idx) => {
  const base: Artwork = {
    id: idx + 1,
    slug,
    title: titleFromSlug(slug),
    medium: inferMedium(slug),
    size: parseSize(slug),
    sizeCategory: parseSizeCategory(slug),
    price: 'Price on Request',
    priceCategory: 'medium',
    available: true,
    description: DEFAULT_DESCRIPTION,
  }

  return { ...base, ...OVERRIDES[slug] }
})

export const featuredArtworks = artworks.filter((artwork) => artwork.featured).slice(0, 6)

export const artworksById = new Map<number, Artwork>(artworks.map((artwork) => [artwork.id, artwork]))
export const artworksBySlug = new Map<string, Artwork>(artworks.map((artwork) => [artwork.slug, artwork]))

export function getArtworkById(id: number): Artwork | undefined {
  return artworksById.get(id)
}
