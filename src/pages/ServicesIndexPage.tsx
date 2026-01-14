import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AreasWeServe from '../components/AreasWeServe';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Services from '../components/Services';
import LocalBusinessJsonLd from '../seo/LocalBusinessJsonLd';
import { buildDescription, buildTitle, canonicalFor, defaultOgImage } from '../seo/seo';

export default function ServicesIndexPage() {
  const title = buildTitle('Pressure Washing Services in Orlando & the Space Coast');
  const description = buildDescription(
    'Browse driveway cleaning, walkway cleaning, patio and porch cleaning, fence washing, soft wash house washing, and commercial pressure washing across Orlando, Merritt Island, and the Space Coast.'
  );
  const canonical = canonicalFor('/services');

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
      <main className="pt-28">
        <section className="bg-blue-50 py-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold">Exterior Cleaning</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Pressure &amp; Soft Washing Services</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Every service is matched to the surface - calibrated pressure for concrete and pavers, soft washing for
              paint, trim, and fencing, and careful scheduling for commercial pads and breezeways. Choose a service to
              see what is included and how we protect landscaping, pool enclosures, and finishes.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                to="/services/driveway-cleaning"
                className="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-700 font-semibold shadow-sm border border-blue-100 hover:border-blue-300 transition-colors"
              >
                Driveway Cleaning
              </Link>
              <Link
                to="/services/house-washing"
                className="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-700 font-semibold shadow-sm border border-blue-100 hover:border-blue-300 transition-colors"
              >
                House Washing
              </Link>
              <Link
                to="/services/commercial-pressure-washing"
                className="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-700 font-semibold shadow-sm border border-blue-100 hover:border-blue-300 transition-colors"
              >
                Commercial Pressure Washing
              </Link>
            </div>
          </div>
        </section>

        <Services variant="page" />

        <AreasWeServe
          headline="Service areas we cover daily"
          description="We are local to Merritt Island and schedule routes for Cocoa, Cocoa Beach, Cape Canaveral, Rockledge, Satellite Beach, Viera, and Palm Bay so you get reliable arrival windows."
        />

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 grid lg:grid-cols-[1.2fr,1fr] gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready for a same-day quote?</h2>
              <p className="text-lg text-gray-700">
                Tell us about the surface, stains, and access notes. We respond quickly with a plan matched to your home,
                storefront, or community. If you prefer to talk first, call us and we will schedule a quick walkthrough.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Request My Quote
                </Link>
                <a
                  href="tel:+13212094997"
                  className="inline-flex items-center px-6 py-3 rounded-full border-2 border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
                >
                  Call (321) 209-4997
                </a>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What to expect</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Pre-inspection to set expectations around stains, rust, or oxidation.</li>
                <li>Surface-matched detergents and rinse methods that protect paint and plants.</li>
                <li>Flexible scheduling for businesses, HOAs, and seasonal homeowners.</li>
                <li>Licensed, insured, and local to Orlando and the Space Coast.</li>
              </ul>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
