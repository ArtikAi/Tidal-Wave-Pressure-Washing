import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getLocationBySlug, locations } from '../data/locations';
import { getAllServices, getServiceUrl } from '../data/services';
import AreasWeServe from '../components/AreasWeServe';
import LocalBusinessJsonLd from '../seo/LocalBusinessJsonLd';
import { buildDescription, buildTitle, canonicalFor, defaultOgImage } from '../seo/seo';
import NotFoundPage from './NotFoundPage';

function formatList(items: string[]) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

export default function LocationDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? '';
  const location = getLocationBySlug(slug);

  if (!location) {
    return <NotFoundPage />;
  }

  const services = getAllServices();
  const primaryServiceCards = location.primaryServices
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
    .filter(Boolean);

  const nearbyLocations =
    location.nearby?.map((nearbySlug) => locations.find((loc) => loc.slug === nearbySlug)).filter(Boolean) ??
    locations.filter((loc) => loc.slug !== location.slug).slice(0, 5);

  const primaryServiceNames = primaryServiceCards.map((service) => service?.title ?? '').filter(Boolean);
  const landmarksSummary = location.landmarks.slice(0, 5);
  const additionalParagraphs = [
    `We frequently clean near ${formatList(landmarksSummary)}. Boardwalks, docks, and shaded sidewalks in these areas collect salt spray, pollen, and foot traffic residue quickly, so we match detergents and pressure to protect finishes while restoring traction.`,
    `${location.drivingNotes} Most visits here include ${formatList(primaryServiceNames)} so curb lines, entries, and outdoor living spaces all look consistent from the street to the backyard.`,
    `We are actively gathering photos and reviews to highlight ${location.localProofPlaceholder}`
  ];

  const title = buildTitle(`Pressure Washing in ${location.name}, FL`);

  const description = buildDescription(
    `Pressure washing and soft washing in ${location.name}, FL. House washing, driveways, patios, pavers, fences, and commercial cleanings. Free quote.`
  );

  const canonical = canonicalFor(`/locations/${location.slug}`);

  // Add this near where you compute canonical (before the JSX):
  const areaNames = [`${location.name}, FL`];

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

      <LocalBusinessJsonLd pageUrl={canonical} areaServed={areaNames} />

      <Header />

      <main className="pt-28 bg-white">
        <section className="bg-blue-50 py-12 border-b border-blue-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold">Service Area</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Pressure Washing in {location.name}, FL</h1>
            <p className="text-lg text-gray-700 max-w-3xl">{location.uniqueIntro}</p>
            <div className="flex flex-wrap gap-3">
              {location.landmarks.map((landmark) => (
                <span
                  key={landmark}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-white text-blue-700 font-semibold shadow-sm border border-blue-100"
                >
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 grid lg:grid-cols-[1.2fr,1fr] gap-10">
            <div className="space-y-5 text-gray-700 leading-relaxed">
              <p>{location.uniqueIntro}</p>
              {location.detailSections?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {additionalParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Neighborhoods we frequent</h2>
                <p className="text-gray-700">
                  We schedule routes to reduce travel time and arrive when surfaces dry fastest. Recent visits include{' '}
                  {location.neighborhoods?.length ? formatList(location.neighborhoods) : `${location.name} neighborhoods`}
                  .
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Popular services in {location.name}</h3>
                <div className="space-y-3">
                  {primaryServiceCards.map(
                    (service) =>
                      service && (
                        <Link
                          key={service.slug}
                          to={getServiceUrl(service.slug)}
                          className="block border border-blue-100 rounded-xl p-4 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-lg font-semibold text-gray-900">{service.title}</div>
                              <div className="text-sm text-gray-700">{service.shortDesc}</div>
                            </div>
                            <span className="text-blue-700 font-semibold ml-4">&rarr;</span>
                          </div>
                        </Link>
                      )
                  )}
                </div>
              </div>

              <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-md space-y-3">
                <h3 className="text-xl font-semibold">Get a fast quote</h3>
                <p className="text-blue-50">
                  Share the surfaces, stains, and timing you need. We will confirm availability for {location.name} and
                  nearby areas and schedule when drying conditions are best.
                </p>
                <ul className="space-y-2 text-blue-50">
                  <li>Walkthrough to flag sensitive landscaping, fixtures, and finishes.</li>
                  <li>Surface-matched detergents that rinse clean near water, sand, or heavy traffic.</li>
                  <li>Flexible scheduling to work around guests, tenants, or school pickups.</li>
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-5 py-3 rounded-full bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
                >
                  Request a visit
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Nearby service areas</h2>
            <div className="flex flex-wrap gap-3">
              {nearbyLocations.map(
                (loc) =>
                  loc && (
                    <Link
                      key={loc.slug}
                      to={`/locations/${loc.slug}`}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 text-gray-800 hover:border-blue-400 hover:text-blue-700 transition-colors"
                    >
                      {loc.name}
                    </Link>
                  )
              )}
              <Link
                to="/locations"
                className="inline-flex items-center px-4 py-2 rounded-full border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
              >
                View all areas
              </Link>
            </div>
          </div>
        </section>

        <AreasWeServe
          headline="Areas we serve around this city"
          description="See more Space Coast and Orlando stops we group with this route. If you need a different neighborhood, tell us and we will coordinate timing."
          limit={6}
        />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
