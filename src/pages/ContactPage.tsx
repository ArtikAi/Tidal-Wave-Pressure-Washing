import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Contact from '../components/Contact';
import LocalBusinessJsonLd from '../seo/LocalBusinessJsonLd';
import { buildDescription, buildTitle, canonicalFor, defaultOgImage } from '../seo/seo';

export default function ContactPage() {
  const title = buildTitle('Contact & Quotes');
  const description = buildDescription(
    'Request a fast quote for driveway cleaning, house washing, patio cleaning, fence cleaning, or commercial pressure washing across Orlando and the Space Coast.'
  );
  const canonical = canonicalFor('/contact');

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={defaultOgImage} />
      </Helmet>
      <LocalBusinessJsonLd pageUrl={canonical} />
      <Header />
      <main className="pt-28 bg-white">
        <section className="bg-blue-50 py-12 border-b border-blue-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 space-y-3">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold">Get a fast quote</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Contact Tidal Wave Pressure Cleaning</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Tell us about the surfaces you need cleaned, stains you have noticed, and any access notes. We respond
              quickly with a plan tailored to your Space Coast or Orlando property.
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-blue-700">
              <a href="tel:+13212094997" className="inline-flex items-center gap-2 hover:text-blue-800 transition-colors">
                Call (321) 209-4997
              </a>
              <a
                href="mailto:tidalwavespressure@gmail.com"
                className="inline-flex items-center gap-2 hover:text-blue-800 transition-colors"
              >
                tidalwavespressure@gmail.com
              </a>
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
