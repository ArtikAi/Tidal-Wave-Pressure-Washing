import { Link } from 'react-router-dom';
import { locations } from '../data/locations';

type AreasWeServeProps = {
  headline?: string;
  description?: string;
  limit?: number;
  showViewAllLink?: boolean;
};

export default function AreasWeServe({
  headline = 'Areas We Serve',
  description = 'From Merritt Island to Palm Bay, we cover the Space Coast with pressure washing and soft washing tuned to each neighborhood.',
  limit,
  showViewAllLink = true
}: AreasWeServeProps) {
  const items = typeof limit === 'number' ? locations.slice(0, limit) : locations;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-0 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{headline}</h2>
            <p className="text-gray-700">{description}</p>
          </div>
          {showViewAllLink && (
            <Link
              to="/locations"
              className="inline-flex items-center px-4 py-2 rounded-full border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
            >
              View all locations
              <span aria-hidden className="ml-2">
                &rarr;
              </span>
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((location) => (
            <div key={location.slug} className="border border-gray-200 rounded-2xl p-6 bg-gray-50 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h3>
              <p className="text-sm text-gray-700 mb-3">{location.uniqueIntro}</p>
              <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-600">
                {location.landmarks.slice(0, 3).map((landmark) => (
                  <span key={landmark} className="px-2 py-1 rounded-full bg-white border border-gray-200">
                    {landmark}
                  </span>
                ))}
              </div>
              <Link
                to={`/locations/${location.slug}`}
                className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors"
              >
                Explore {location.name}
                <span aria-hidden className="ml-2">
                  &rarr;
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
