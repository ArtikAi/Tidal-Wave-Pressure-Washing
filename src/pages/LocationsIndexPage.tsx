import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AreasWeServe from '../components/AreasWeServe';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { locations } from '../data/locations';
import { getAllServices, getServiceUrl } from '../data/services';
import LocalBusinessJsonLd from '../seo/LocalBusinessJsonLd';
import { buildDescription, buildTitle, canonicalFor, defaultOgImage } from '../seo/seo';

export default function LocationsIndexPage() {
  const title = buildTitle('Pressure Washing Service Areas');
  const description = buildDescription(
    'See the 10 Space Coast and Orlando-area cities we serve most: Merritt Island, Cocoa, Cocoa Beach, Cape Canaveral, Rockledge, Satellite Beach, Melbourne, Titusville, Viera, and Palm Bay.'
  );
  const canonical = canonicalFor('/locations');
  const services = getAllServices();
  const serviceMap = services.reduce<Record<string, { title: string; slug: string }>>((acc, service) => {
    acc[service.slug] = { title: service.title, slug: service.slug };
    return acc;
  }, {});

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
        <section className="bg-blue-50 py-12 border-b border-blue-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold">Service Areas</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Pressure Washing in Orlando &amp; the Space Coast
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              We run daily routes from Merritt Island to Cocoa, Cocoa Beach, Cape Canaveral, Rockledge, Satellite Beach,
              Melbourne, Titusville, Viera, and Palm Bay. Each city has different conditions - salt spray, oak shade,
              irrigation rust, or heavy foot traffic - so we match soft wash or pressure washing to keep finishes safe.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {locations.map((location) => (
                <Link
                  key={location.slug}
                  to={`/locations/${location.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-700 font-semibold shadow-sm border border-blue-100 hover:border-blue-300 transition-colors"
                >
                  {location.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location) => (
                <div key={location.slug} className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-gray-50">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{location.name}</h2>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-700">
                      {location.primaryServices.length} services
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{location.uniqueIntro}</p>
                  <div className="text-sm text-gray-600 mb-3">
                    <strong className="text-gray-900">Landmarks:</strong> {location.landmarks.slice(0, 4).join(', ')}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {location.primaryServices.map((slug) => {
                      const service = serviceMap[slug];
                      if (!service) return null;
                      return (
                        <Link
                          key={slug}
                          to={getServiceUrl(service.slug)}
                          className="text-blue-700 bg-white border border-blue-100 rounded-full px-3 py-1 text-sm font-semibold hover:border-blue-300 transition-colors"
                        >
                          {service.title}
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    to={`/locations/${location.slug}`}
                    className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors"
                  >
                    See details
                    <span aria-hidden className="ml-2">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AreasWeServe
          headline="Request service in your neighborhood"
          description="If you do not see your area listed, reach out. We often add nearby stops when routing crews through the Space Coast and Orlando."
        />

        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 grid md:grid-cols-[1.2fr,1fr] gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Need a different city?</h2>
              <p className="text-lg text-gray-700">
                We regularly service launches, beachside rentals, HOAs, and storefronts. Tell us about the surface,
                timing, and access details and we will confirm availability or group your visit with an existing route.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Request availability
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center px-6 py-3 rounded-full border-2 border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
                >
                  View all services
                </Link>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Popular combinations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>House washing with driveway and walkway cleaning before listing photos.</li>
                <li>Patio or pool deck cleaning paired with porch detailing for guests.</li>
                <li>Fence cleaning plus house washing to keep HOA notices away.</li>
                <li>Commercial storefront washes scheduled with dumpster pad degreasing.</li>
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
