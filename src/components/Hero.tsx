import React from 'react';
import { CheckCircle, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">Restore curb appeal. Clean. Safe. Eco-friendly.</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Tidal Wave Pressure Cleaning keeps Orlando &amp; the Space Coast looking its best.
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Licensed and insured technicians using surface-safe methods and biodegradable detergents. We match every job with the right pressure or soft wash so siding, stucco, roofs, and hardscapes shine again.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {["Surface-safe methods", "Biodegradable detergents", "Local small business", "Flexible scheduling"].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center space-x-3 bg-white/80 backdrop-blur rounded-xl px-4 py-3 shadow-sm"
                >
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700 text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request My Quote
              </a>
              <a
                href="tel:+13212094997"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-center flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Phone size={20} />
                <span>Call (321) 209-4997</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4792051/pexels-photo-4792051.jpeg"
              alt="Technician soft washing a home exterior in Merritt Island"
              className="rounded-2xl shadow-2xl w-full h-auto"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600 font-medium">Open Daily Across the Space Coast</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}