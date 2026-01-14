import React from 'react';
import { Building, Fence, Home, Leaf, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getAllServices, getServiceUrl, type Service } from '../data/services';

type ServicesProps = {
  variant?: 'section' | 'page';
};

const iconMap: Record<Service['slug'], React.ElementType> = {
  'driveway-cleaning': Sparkles,
  'walkway-cleaning': Leaf,
  'patio-cleaning': Home,
  'porch-cleaning': Leaf,
  'house-washing': Home,
  'fence-cleaning': Fence,
  'commercial-pressure-washing': Building
};

const categoryOrder: Service['category'][] = ['Pressure Washing', 'Soft Washing', 'Commercial'];

export default function Services({ variant = 'section' }: ServicesProps) {
  const location = useLocation();
  const services = getAllServices();
  const isPageVariant = variant === 'page';
  const Wrapper: React.ElementType = isPageVariant ? 'div' : 'section';
  const HeadingTag: React.ElementType = 'h2';
  const description =
    'Biodegradable detergents and surface-specific methods keep Orlando, Merritt Island, and Space Coast properties spotless for households, HOAs, and local businesses alike.';

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      event.preventDefault();
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const grouped = services.reduce<Record<Service['category'], Service[]>>(
    (acc, service) => {
      acc[service.category] = acc[service.category] ? [...acc[service.category], service] : [service];
      return acc;
    },
    { 'Pressure Washing': [], 'Soft Washing': [], Commercial: [] }
  );

  const renderCard = (service: Service) => {
    const Icon = iconMap[service.slug] ?? Sparkles;
    return (
      <div
        key={service.slug}
        className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group hover:bg-white border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
            <Icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={26} />
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-700">
            {service.category}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-5 leading-relaxed">{service.shortDesc}</p>

        <ul className="space-y-2 mb-6">
          {service.bullets.slice(0, 3).map((bullet) => (
            <li key={bullet} className="flex items-start text-gray-700">
              <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full mr-3" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <Link
          to={getServiceUrl(service.slug)}
          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          See details
          <span aria-hidden="true" className="ml-2">
            &rarr;
          </span>
        </Link>
      </div>
    );
  };

  return (
    <Wrapper id={isPageVariant ? undefined : 'services'} className="py-20 bg-white scroll-mt-28 md:scroll-mt-40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <HeadingTag className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional <span className="text-blue-600">Pressure Washing Services</span>
          </HeadingTag>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
          {isPageVariant ? (
            <p className="text-gray-700 max-w-2xl mx-auto mt-4">
              Choose a service below to see what is included, how we protect finishes, and where we perform the work
              across Orlando and the Space Coast.
            </p>
          ) : null}
        </div>

        {isPageVariant ? (
          <div className="space-y-10">
            {categoryOrder.map((category) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                  <span className="text-sm text-gray-600">
                    {grouped[category].length} service{grouped[category].length === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{grouped[category].map(renderCard)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map(renderCard)}</div>
        )}

        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-600">
            Not sure which wash is right? We inspect first, then recommend pressure or soft wash matched to the surface.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            onClick={handleContactClick}
          >
            Request My Quote
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
