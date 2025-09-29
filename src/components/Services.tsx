import React from 'react';
import { Home, Droplets, Sparkles, Leaf, Fence, Building } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Home,
      title: 'House Washing (Soft Wash)',
      description:
        'Low pressure rinses away algae, mildew, and cobwebs while protecting paint, stucco, and trim. Ideal for seasonal refreshes or pre-listing cleanups.',
      features: ['Soft wash 40-80 PSI', 'Protects landscaping', 'Includes soffits & gutters'],
      slug: 'house-washing'
    },
    {
      icon: Droplets,
      title: 'Roof Cleaning (Soft Wash)',
      description:
        'Treats gloeocapsa magma streaks with biodegradable detergents so shingles, tile, and metal roofs regain color and last longer.',
      features: ['Removes black streaks', 'Slows regrowth', 'Low-pressure application'],
      slug: 'roof-cleaning'
    },
    {
      icon: Sparkles,
      title: 'Driveways & Walkways',
      description:
        'Lift dirt, rust, and slippery growth from concrete, pavers, and curbing to improve safety and curb appeal.',
      features: ['Concrete & paver safe', 'Pre-treats stains', 'Commercial-grade surface cleaner'],
      slug: 'driveways-walkways'
    },
    {
      icon: Leaf,
      title: 'Patios & Porches',
      description:
        'Seasonal cleanups clear pollen, cobwebs, and debris from screened lanais, pool decks, and outdoor living areas. Safe for pets and plants.',
      features: ['Screen enclosures', 'Pool decks', 'Outdoor furniture washdown'],
      slug: 'patios-porches'
    },
    {
      icon: Fence,
      title: 'Fence Washing',
      description:
        'Wood, vinyl, and composite fencing get a careful pre-rinse, detergent dwell, and post-rinse matched to the material.',
      features: ['Wood restoration prep', 'Vinyl brightening', 'Composite detailing'],
      slug: 'fence-washing'
    },
    {
      icon: Building,
      title: 'Commercial Exteriors',
      description:
        'Storefronts, sidewalks, HOA amenities, and multi-building schedules available with minimal disruption to guests and tenants.',
      features: ['Retail & office', 'HOA & condo', 'Restaurant pads'],
      slug: 'commercial-exteriors'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional <span className="text-blue-600">Pressure Washing Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Biodegradable detergents and surface-specific methods keep Orlando, Merritt Island, and Space Coast properties spotless for households, HOAs, and local businesses alike.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group hover:bg-white border border-gray-100"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <service.icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={28} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`/services/#${service.slug}`}
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                See services
                <span aria-hidden="true" className="ml-2">&rarr;</span>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-600">
            Not sure which wash is right? We inspect first, then recommend pressure or soft wash matched to the surface.
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Request My Quote
          </a>
        </div>
      </div>
    </section>
  );
}