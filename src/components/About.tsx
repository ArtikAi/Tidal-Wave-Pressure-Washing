import React from 'react';
import { Users, Award, Clock, Shield } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Users, label: 'Satisfied Customers', value: '500+' },
    { icon: Award, label: 'Years Experience', value: '10+' },
    { icon: Clock, label: 'Projects Completed', value: '1000+' },
    { icon: Shield, label: 'Guarantee', value: '100%' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-600">CleanPro</span>?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              With over a decade of experience in professional pressure washing, we've built our reputation on delivering exceptional results and outstanding customer service.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <Shield className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Licensed & Insured</h4>
                  <p className="text-gray-600">Fully licensed professionals with comprehensive insurance coverage for your peace of mind.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Award className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h4>
                  <p className="text-gray-600">We stand behind our work with a 100% satisfaction guarantee on all services.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Users className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Expert Team</h4>
                  <p className="text-gray-600">Our trained technicians use the latest equipment and eco-friendly cleaning solutions.</p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors font-semibold"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started Today
            </a>
          </div>

          <div className="space-y-8">
            <img
              src="https://images.pexels.com/photos/3964736/pexels-photo-3964736.jpeg"
              alt="Professional pressure washing team"
              className="rounded-2xl shadow-lg w-full h-auto"
            />
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <stat.icon className="text-blue-600 mx-auto mb-3" size={32} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}