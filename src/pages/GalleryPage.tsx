import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import LocalBusinessJsonLd from '../seo/LocalBusinessJsonLd';
import { buildDescription, buildTitle, canonicalFor, defaultOgImage } from '../seo/seo';

export default function GalleryPage() {
  const title = buildTitle('Before & After Gallery');
  const description = buildDescription(
    'See driveway, walkway, patio, porch, fence, and commercial pressure washing results across Orlando, Merritt Island, Cocoa Beach, and nearby cities.'
  );
  const canonical = canonicalFor('/gallery');

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
            <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold">Proof of results</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Before &amp; After Gallery</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Explore recent driveway, walkway, patio, porch, fence, and commercial cleanings. Each project uses
              surface-specific methods to keep paint, pavers, and landscaping protected.
            </p>
          </div>
        </section>
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
