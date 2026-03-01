import Image from 'next/image'

const ABOUT_PARAGRAPHS = [
  'Born on the 1st of June in the vibrant city of Plovdiv, Bulgaria (EU), my connection to art was kindled at an early age. I recall picking up the paintbrush as a young child of five or even earlier, and since then, my passion for painting has been unwavering.',
  'In May 2017, I became a proud member of the Dubai International Art Centre, marking a significant milestone in my artistic journey. Over the years, I have explored various subjects, from enchanting landscapes and tranquil still life to blooming flowers and spirited animals. However, it is through abstract art that I have found the most authentic expression of my inner world.',
  'My artistic portfolio boasts a variety of group exhibitions, live art events, and workshops in diverse locations including Dubai, Ras Al-Khaimah, Sharjah, and my home country, Bulgaria.',
  'Abstract painting is the style that resonates most with my personality. I use this form and mixed media art as a conduit to express my love for shapes, colors, and to communicate my unique vision as an artist. My paintings are intuitive creations, birthed from several layers of paint, each adding depth and complexity to the piece.',
  'Acrylic paints, inks, and both soft and oil pastels are my preferred mediums. To create captivating textures and achieve a rich, interesting interplay of effects in my paintings, I incorporate recycling materials, fabrics, and everyday household items. This practice not only helps breathe new life into discarded materials but also adds a unique dimension to each painting.',
  'Each of my creations is original, handmade, and carries its own distinct personality. To ensure longevity, all of my paintings are signed on the front and back, and are meticulously finished with two coats of varnish. This enhances the intensity, transparency, and luminosity of colors, offering an immersive visual experience while protecting the integrity of the artwork.',
]

const EDUCATION_ITEMS = [
  '1990 - present - Self lessons',
  '2003-2006 - Art lessons in Studio Chaushev, Old Town, Plovdiv, Bulgaria',
  '2005-2010 - Master in Geodesy in UACEG, Sofia, Bulgaria',
  '2017-2020 - Oil classes at Dubai International Art Centre, Dubai, UAE',
  '2019 - Abstract and mixed media classes at Dubai International Art Centre',
]

const EXHIBITIONS_ITEMS = [
  'Feb 2025 - Solo exhibition "Artist in Residence" at La Brocante furniture store, Al Quoz, Dubai, UAE',
  'Feb 2025 - Group exhibition organized by Artezaar at More Cafe, Dubai World Trade Centre, One Central, Dubai, UAE',
  'Sept 2024 - #Iampeace, Global Peace Conference group exhibition at Etisalat Academy Auditorium, Muhaisnah, Dubai, UAE',
  'June 2024 - "Summer Hues" online exhibition organized by Artezaar, Dubai, UAE',
  'May 2024 - "Blossom and Brushstrokes: A Summer Exhibit" online exhibition organized by Artezaar, Dubai, UAE',
  'Oct 2023 - Global Expressions: A Fusion of Cultures in Art, organized by Dubai International Art Centre and Embassy of India, Abu Dhabi, UAE',
  'Sept 2023 - "The Showroom by DIPR", Anantara Downtown Hotel, Dubai, UAE',
  'Aug 2023 - "Collectible Creation Exhibition" online exhibition organized by Artezaar, Dubai, UAE',
  'June 2023 - "Summer Hues" group exhibition at Bedia Art Gallery, Dubai, UAE',
  'Mar 2022 - Artist in Residence at La Brocante DXB, Dubai, UAE',
  'Dec 2021 - "Empower" group exhibition at Raw Coffee Company, Dubai, UAE',
  'Nov 2021 - Solo art exhibition at Pottery Barn, Dubai Mall, Dubai, UAE',
  'Nov 2021 - "Indradhanush" group exhibition and walk art organized by The Paint Brush Art Community at Consulate General of India, Dubai, UAE',
  'Sept 2021 - "On Reflection" group exhibition at Raw Coffee Company, Dubai, UAE',
  'Jun 2021 - 66th Students and Members Exhibition at Gallery 76, Dubai International Art Centre, Dubai, UAE',
  'Apr 2021 - "World Art Dubai" at World Trade Centre, Dubai, UAE',
  'Mar 2021 - Modista Exhibition at Swissotel Al Murooj, Dubai, UAE',
  'Mar 2021 - "Choose to Challenge" International Womens Day exhibition organized by Funun Arts at Novotel World Trade Centre, Dubai, UAE',
  'Jan 2021 - Art Festival and Market Day at Dubai International Art Centre, Dubai, UAE',
  'Dec 2020 - Solo exhibition with Arte Market Dubai, UAE',
  'Apr-May 2020 - Salam Ramadan 2 virtual art exhibition organized by Funun Arts, Dubai, UAE',
  'Mar-Apr 2020 - "Live Limitless" group exhibition by Funun Arts celebrating International Womens Day 2020, Dubai, UAE',
  'Dec 2019-Jan 2020 - "Year End Sale Exhibition", Art Smiley Exhibition, DoubleTree by Hilton, Business Bay, Dubai, UAE',
  'Nov-Dec 2019 - "Year of Tolerance 2019", Art Smiley Exhibition, DoubleTree by Hilton, Business Bay, Dubai, UAE',
  'Nov 2019 - 64th Members Art Exhibition at Gallery 76, Dubai International Art Centre, Dubai, UAE',
  'Mar 2019 - Art Week (16-23 March) at Gallery 76, Dubai International Art Centre, Dubai, UAE',
  'Nov 2018 - 63rd Members Art Exhibition at Gallery 76, Dubai International Art Centre, Dubai, UAE',
  'Jul 2018 - Summer Exhibition at Gallery 76, Dubai International Art Centre, Dubai, UAE',
  'May 2018 - Students Exhibition at Gallery 76, Dubai International Art Centre, Dubai, UAE',
  'Nov 2017 - 62nd Members Art Exhibition at Gallery 76, Dubai International Art Centre, Dubai, UAE',
  'Jul 2017 - Summer Exhibition at Gallery 76, Dubai International Art Centre, Dubai, UAE',
  'Jun 2017 - Celebrating Ramadan at Gallery 76, Dubai International Art Centre, Dubai, UAE',
]

const RECOGNITION_AWARDS = [
  'DIAC Merit Award - 62nd Members Art Exhibition (November 2017), Gallery 76, Dubai International Art Centre, Dubai, UAE',
  'DIAC Merit Award - 64th Members Art Exhibition (November 2019), Gallery 76, Dubai International Art Centre, Dubai, UAE',
]

const RECOGNITION_MEMBERSHIP_EVENTS = [
  'Since May 2017 - Member of Dubai International Art Centre, Dubai, UAE',
  '28 Dec 2019 - Live art with theme "Christmas" at Sheraton Sharjah Beach Resort & Spa, organized by Art4You Gallery',
  '17 Jan 2020 - Live Art Event with theme "Hope" at Dubai Creek Park, organized by Art4You Gallery and The Paint Brush Community',
  '14 Feb 2020 - Live Art Event "Be Mine Valentine" (Family Love) at Cassells Hotel, Al Barsha, Dubai, UAE, organized by Art4You Gallery',
  '21 Feb 2020 - Live Art Event organized by Art Noor, Funun Arts and Art4You Gallery, Fine Arts Festival, Ras Al Khaimah, UAE (Theme: Connected Communities)',
  '26 Dec 2020 - Live Art Event "Time to Hope & be Joyful", organized by Funun Arts Group at Novotel DWTC, Dubai, UAE',
]

export default function About() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-24 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="relative w-full overflow-hidden rounded-card shadow-card-hover">
              <Image
                src="/images/radka-artist.webp"
                alt="Radka Gicheva"
                width={400}
                height={500}
                className="h-auto w-full object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-3">
            <h2 className="mb-4 text-5xl text-primary">Radka Gicheva</h2>
            <p className="mb-2 text-xl font-medium text-accent">Contemporary Abstract Artist</p>
            <p className="mb-8 text-lg text-gray-600">Joined Saatchi Art in 2015 - Dubai, UAE</p>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="rounded-card bg-gradient-start p-4 transition-all duration-motion hover:shadow-card">
                <p className="text-3xl font-bold text-accent">95</p>
                <p className="mt-1 text-sm text-gray-600">Artworks Listed</p>
              </div>
              <div className="rounded-card bg-gradient-start p-4 transition-all duration-motion hover:shadow-card">
                <p className="text-3xl font-bold text-accent">220</p>
                <p className="mt-1 text-sm text-gray-600">Saatchi Followers</p>
              </div>
              <div className="rounded-card bg-gradient-start p-4 transition-all duration-motion hover:shadow-card">
                <p className="text-3xl font-bold text-accent">2015</p>
                <p className="mt-1 text-sm text-gray-600">Joined Year</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-20">
          <h3 className="mb-8 text-3xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            About
          </h3>
          <div className="prose prose-lg max-w-none">
            {ABOUT_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph} className="mb-6 text-lg leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-20 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Education
            </h3>
            <ul className="space-y-3 text-gray-700">
              {EDUCATION_ITEMS.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="mr-3 text-[#d4a574]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Recognition
            </h3>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Awards</p>
            <ul className="mb-6 space-y-3 text-gray-700">
              {RECOGNITION_AWARDS.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="mr-3 text-[#d4a574]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Membership & Live Events</p>
            <ul className="space-y-3 text-gray-700">
              {RECOGNITION_MEMBERSHIP_EVENTS.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="mr-3 text-[#d4a574]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-20 rounded-lg bg-gray-50 p-12">
          <h3 className="mb-8 text-3xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            Exhibitions
          </h3>
          <ul className="space-y-3 text-gray-700">
            {EXHIBITIONS_ITEMS.map((item) => (
              <li key={item} className="flex items-start">
                <span className="mr-3 text-[#d4a574]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-gray-500">
            Source: 
            <a
              href="https://www.saatchiart.com/radkagicheva"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 underline decoration-accent underline-offset-4"
            >
              Saatchi Art artist profile
            </a>
          </p>
        </section>

        <section className="rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 py-16 text-center text-white">
          <h3 className="mb-6 text-3xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            Follow My Artistic Journey
          </h3>
          <p className="mb-8 text-lg opacity-90">Stay updated with my latest works and exhibitions</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://instagram.com/gicheva.art"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d4a574] px-8 py-3 font-medium tracking-wider transition-colors hover:bg-[#b8935f]"
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.saatchiart.com/radkagicheva"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white px-8 py-3 font-medium tracking-wider transition-all hover:bg-white hover:text-gray-900"
            >
              SAATCHI ART
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
