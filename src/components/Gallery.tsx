import React from 'react';
import { Star } from 'lucide-react';

const galleryPairs = [
  {
    before: '/images/before and after/img 1.webp',
    after: '/images/before and after/img 2.webp',
    title: 'Merritt Island Driveway Refresh',
    description: 'Oil stains and tire marks lifted from textured concrete after a surface-safe pressure wash.'
  },
  {
    before: '/images/before and after/img 3.webp',
    after: '/images/before and after/img 4.webp',
    title: 'Orlando Stucco Soft Wash',
    description: 'Soft-wash detergents removed algae streaking from stucco and trim without harming paint.'
  },
  {
    before: '/images/before and after/img 5.webp',
    after: '/images/before and after/img 6.webp',
    title: 'Cocoa Beach Pool Deck Cleaning',
    description: 'Patio pavers cleared of mildew buildup so the pool deck is safer for bare feet.'
  },
  {
    before: '/images/before and after/img 7.webp',
    after: '/images/before and after/img 8.webp',
    title: 'Viera Fence Restoration',
    description: 'Biodegradable detergents brightened composite fencing and rinsed away salt-air residue.'
  }
];

const testimonials = [
  {
    name: 'Samantha R., Viera',
    rating: 5,
    text: 'Dark roof streaks vanished after their soft wash. The crew explained every step and rinsed everything thoroughly.',
    service: 'Roof Cleaning'
  },
  {
    name: 'Mark D., Cocoa Village',
    rating: 5,
    text: 'Sidewalks and storefront look brand new. Scheduling after-hours kept our doors open. Highly recommend.',
    service: 'Commercial Exteriors'
  },
  {
    name: 'Angela P., Orlando',
    rating: 5,
    text: 'They covered my plants, pre-treated stains, and followed up the next day. Outstanding service front to back.',
    service: 'House Washing'
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Proof of <span className="text-blue-600">Surface-Safe Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From Orlando neighborhoods to Cocoa Beach storefronts, see how our pressure and soft washing restore color, safety, and curb appeal.
          </p>
        </div>

        {/* Before/After Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {galleryPairs.map((project) => (
            <figure key={project.title} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={project.before}
                  alt={`${project.title} before cleaning`}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Before
                </div>
              </div>
              <div className="relative">
                <img
                  src={project.after}
                  alt={`${project.title} after cleaning`}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  After
                </div>
              </div>
              <figcaption className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What Space Coast <span className="text-blue-600">Clients Say</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} aria-hidden="true" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <footer>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-blue-600 text-sm">{testimonial.service}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
