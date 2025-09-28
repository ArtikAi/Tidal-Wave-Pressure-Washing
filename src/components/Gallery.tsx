import React from 'react';
import { Star } from 'lucide-react';

export default function Gallery() {
  const beforeAfter = [
    {
      before: "https://images.pexels.com/photos/4792038/pexels-photo-4792038.jpeg",
      after: "https://images.pexels.com/photos/4792037/pexels-photo-4792037.jpeg",
      title: "Driveway Transformation"
    },
    {
      before: "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg",
      after: "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg",
      title: "House Exterior Cleaning"
    },
    {
      before: "https://images.pexels.com/photos/3964743/pexels-photo-3964743.jpeg",
      after: "https://images.pexels.com/photos/3964736/pexels-photo-3964736.jpeg",
      title: "Deck Restoration"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing work! My driveway looks brand new. The team was professional, punctual, and reasonably priced.",
      service: "Driveway Cleaning"
    },
    {
      name: "Mike Rodriguez",
      rating: 5,
      text: "CleanPro transformed our restaurant's exterior. Our customers have been complimenting the clean appearance.",
      service: "Commercial Building"
    },
    {
      name: "Emily Chen",
      rating: 5,
      text: "Excellent service from start to finish. They were careful around my landscaping and the results exceeded expectations.",
      service: "House Washing"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See the <span className="text-blue-600">Difference</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our professional pressure washing services deliver dramatic results. See real transformations from our recent projects.
          </p>
        </div>

        {/* Before/After Gallery */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {beforeAfter.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={project.before}
                  alt={`${project.title} - Before`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Before
                </div>
              </div>
              <div className="relative">
                <img
                  src={project.after}
                  alt={`${project.title} - After`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  After
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What Our <span className="text-blue-600">Customers</span> Say
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-blue-600 text-sm">{testimonial.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}