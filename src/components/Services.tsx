import React from 'react';
import { Home, Building, Car, Droplets, Shield, Sparkles } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Home,
      title: 'Residential Cleaning',
      description: 'House washing, driveway cleaning, deck restoration, and patio power washing for homeowners.',
      features: ['House Exterior', 'Driveways & Walkways', 'Decks & Patios', 'Pool Areas']
    },
    {
      icon: Building,
      title: 'Commercial Services',
      description: 'Professional building washing, parking lot cleaning, and storefront maintenance for businesses.',
      features: ['Building Exteriors', 'Parking Lots', 'Storefronts', 'Loading Docks']
    },
    {
      icon: Car,
      title: 'Fleet & Equipment',
      description: 'Heavy-duty cleaning for vehicles, equipment, and industrial machinery with specialized techniques.',
      features: ['Vehicle Fleets', 'Heavy Equipment', 'Industrial Cleaning', 'Graffiti Removal']
    },
    {
      icon: Droplets,
      title: 'Soft Washing',
      description: 'Gentle cleaning solutions for delicate surfaces like roofs, siding, and painted surfaces.',
      features: ['Roof Cleaning', 'Vinyl Siding', 'Stucco Surfaces', 'Painted Areas']
    },
    {
      icon: Shield,
      title: 'Surface Protection',
      description: 'Protective treatments and sealants to maintain and extend the life of cleaned surfaces.',
      features: ['Sealant Application', 'Protective Coatings', 'Maintenance Plans', 'Surface Restoration']
    },
    {
      icon: Sparkles,
      title: 'Specialty Cleaning',
      description: 'Specialized services for unique cleaning challenges and hard-to-reach areas.',
      features: ['High-Rise Buildings', 'Historic Properties', 'Solar Panel Cleaning', 'Playground Equipment']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive pressure washing and soft washing services for residential and commercial properties throughout the metro area.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group hover:bg-white border border-gray-100"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <service.icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={28} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Request Service Quote
          </a>
        </div>
      </div>
    </section>
  );
}