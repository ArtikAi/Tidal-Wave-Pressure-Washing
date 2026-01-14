import { Users, Award, Clock, Shield, Sprout, Sparkles } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Users, label: 'Homeowners & Businesses Served', value: '1,200+' },
    { icon: Clock, label: 'Response Time', value: 'Same Day' },
    { icon: Award, label: 'Years on the Space Coast', value: '12' },
    { icon: Shield, label: '', value: 'Licensed & Insured' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 scroll-mt-28 md:scroll-mt-40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Tidal Wave</span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Tidal Wave Pressure Cleaning serves Orlando and the Space Coast. We clean homes and businesses with surface-safe methods and biodegradable detergents. Each job starts with an inspection, then we choose pressure or soft wash and protect landscaping and finishes.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <Shield className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Method Matched to the Surface</h4>
                  <p className="text-gray-600">
                    We combine soft wash or high-pressure cleaning with prep, dwell time, and rinse plans tailored to siding, porches, concrete, and specialty finishes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Sprout className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Biodegradable Detergents</h4>
                  <p className="text-gray-600">
                    Controlled application and rinsing protect landscaping, marine life, pets, and painted surfaces while still tackling stubborn buildup.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Sparkles className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Inspected, Protected, Guaranteed</h4>
                  <p className="text-gray-600">
                    We flag sensitive areas, cover fixtures, and give honest expectations about stains that may be permanent before the work begins.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Schedule an Inspection
            </a>
          </div>

          <div className="space-y-8">
            <img
              src="/images/other images/beforeandafter.png"
              alt="Before and after pressure washing results"
              className="rounded-2xl shadow-lg w-full max-w-md h-auto mx-auto"
              loading="lazy"
            />

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <stat.icon className="text-blue-600 mx-auto mb-3" size={32} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  {stat.label ? <div className="text-gray-600 text-sm">{stat.label}</div> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
