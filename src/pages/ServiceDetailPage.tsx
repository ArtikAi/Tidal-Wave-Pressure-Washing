import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import AreasWeServe from '../components/AreasWeServe';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { locations } from '../data/locations';
import { getRelatedServices, getServiceBySlug, getServiceUrl, normalizeServiceSlug, type Service } from '../data/services';
import LocalBusinessJsonLd from '../seo/LocalBusinessJsonLd';
import { buildDescription, buildTitle, canonicalFor, defaultOgImage } from '../seo/seo';
import NotFoundPage from './NotFoundPage';

const extraCopy: Record<Service['slug'], string[]> = {
  'driveway-cleaning': [
    'Surface cleaners keep pressure even, so concrete and pavers lift cleanly without striping. We pretreat rust, oil, and battery acid spots, then rinse curbing, garage transitions, and expansion joints so water drains away instead of drying chalky. If you plan to seal the driveway, this prep leaves pores open and ready for coating.',
    'Homes near the river and causeways pick up tire dust and salt film faster. We use post-treatments to slow mildew from creeping back and schedule around your parking needs so cars can move off the pad while we clean.'
  ],
  'walkway-cleaning': [
    'Walkways and entry paths collect gum, leaf tannins, and algae that become slick in the Florida humidity. Low-splash surface cleaners and careful edging keep mulch beds tidy while we clear grime from joints and curbing. Stairs, ramps, and landings get hand-detailing so paint and treads are not gouged.',
    'For schools, HOAs, and retail pads, we offer cones and signage while surfaces dry. Evening or early-morning scheduling keeps foot traffic moving and delivers safer, brighter approaches without interrupting guests or tenants.'
  ],
  'patio-cleaning': [
    'Pool decks, pavers, and lanais see sunscreen drips, rust from furniture, and mildew that creeps toward coping. We start with a rinse to move sand and leaves, apply pool-safe detergents, and brush screen tracks and cage frames before surface cleaning the floor.',
    'Drainage matters on patios. We check weep holes, move water toward drains instead of door thresholds, and avoid harsh mixes that could affect nearby landscaping or pets. If you host often, pairing patio cleaning with porch and walkway service keeps the whole outdoor path guest-ready.'
  ],
  'porch-cleaning': [
    'Front porches set first impressions. We remove cobwebs around lights and soffits, brush railings and columns, and use low pressure on painted ceilings so finish stays intact. Thresholds, steps, and landings are pretreated for planter rust and leaf stains before a gentle rinse.',
    'Breezeways near the coast collect salt crystals; inland porches see pollen buildup under fans. We wipe fixtures, rinse screens without stretching them, and dry sweep to leave entries safe for mail carriers, deliveries, and guests.'
  ],
  'house-washing': [
    'Soft washing keeps paint, stucco, and Hardie board safe while removing algae, salt film, and cobwebs. Landscaping is pre-wet and post-rinsed, gutters and soffits are brushed, and we keep oxidation in mind on older paint to avoid streaks.',
    'If your home sits under oaks or near the river, we tailor dwell times to tackle mildew while protecting windows and trim. Pair house washing with driveway or fence cleaning to refresh curb appeal ahead of HOA inspections or listing photos.'
  ],
  'fence-cleaning': [
    'Vinyl, wood, and composite fencing each need different pressure and detergents. We knock down debris first, apply the right cleaner for your material, and rinse at low pressure to avoid feathering grain or loosening panels. Caps, gates, and hardware are hand-detailed so lines look even from the street.',
    'For customers prepping to stain or paint, this service leaves a clean, receptive surface. Waterfront and irrigation-heavy yards can add light maintenance washes to keep algae and rust from returning as fast.'
  ],
  'commercial-pressure-washing': [
    'Storefronts, breezeways, and dumpster pads collect gum, grease, and oil that scare off customers. We pretreat stains, use surface cleaners to control overspray, and keep noise low for tenants and guests. Cones and signage are available so people know when surfaces are drying.',
    'HOA amenities, pool decks, and monument signs stay on schedule with grouped visits. We plan routes around parking and quiet hours, giving property managers a predictable maintenance plan that keeps entrances looking open-for-business.'
  ]
};

export default function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const requestedSlug = params.slug ?? '';
  const normalizedSlug = normalizeServiceSlug(requestedSlug);

  if (requestedSlug && normalizedSlug && normalizedSlug !== requestedSlug.toLowerCase()) {
    return <Navigate to={getServiceUrl(normalizedSlug)} replace />;
  }

  if (!normalizedSlug) {
    return <NotFoundPage />;
  }

  const service = getServiceBySlug(normalizedSlug);

  if (!service) {
    return <NotFoundPage />;
  }

  // SEO: keep it human (no keyword comma-stuffing).
  const title = buildTitle(`${service.title} in Merritt Island & the Space Coast`);
  const description = buildDescription(
    `${service.shortDesc} Serving Merritt Island, Cocoa, Cocoa Beach, Cape Canaveral, Rockledge, Satellite Beach, Melbourne, Titusville, Viera, and Palm Bay. Get a fast quote today.`
  );
  const canonical = canonicalFor(getServiceUrl(service.slug));
  const areaNames = locations.map((location) => `${location.name}, FL`);
  const related = getRelatedServices(service.slug, 4);

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
        <section className="bg-blue-50 border-b border-blue-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 py-10 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold">Professional Service</p>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-700">
                {service.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {service.title} in Merritt Island &amp; the Space Coast
            </h1>

            <p className="text-lg text-gray-700 max-w-3xl">{service.longDesc}</p>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-blue-700 font-semibold shadow-sm border border-blue-100">
                Merritt Island &amp; Space Coast
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-blue-700 font-semibold shadow-sm border border-blue-100">
                Licensed &amp; Insured
              </span>
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                Request My Quote
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 grid lg:grid-cols-[1.2fr,1fr] gap-10">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              {extraCopy[service.slug]?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">What is included</h2>
                <ul className="space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Great for</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Homes preparing for HOA inspections or sale photos.</li>
                  <li>Seasonal refreshes before guests or rental turnovers.</li>
                  <li>Businesses needing clean entrances and safer walkways.</li>
                  <li>Waterfront properties fighting salt air and humidity buildup.</li>
                </ul>
              </div>

              <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-md space-y-3">
                <h3 className="text-xl font-semibold">Need scheduling flexibility?</h3>
                <p className="text-blue-50">
                  We offer morning, evening, and weekend slots to keep guests, tenants, and family routines on track.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-5 py-3 rounded-full bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
                >
                  Book a walkthrough
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Related services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={getServiceUrl(item.slug)}
                  className="block bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm mb-3">{item.shortDesc}</p>
                  <span className="text-blue-700 font-semibold mt-3 inline-flex items-center">
                    View details
                    <span aria-hidden className="ml-2">
                      &rarr;
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <AreasWeServe
          headline="Service areas for this offering"
          description="We schedule this service daily across the Space Coast. Explore the locations we cover most often or request a visit to your neighborhood."
          limit={9}
        />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
