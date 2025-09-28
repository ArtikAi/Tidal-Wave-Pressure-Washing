import React from 'react';
import { CheckCircle, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Professional
              <span className="text-blue-600"> Pressure Washing</span>
              <br />Services
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your property with our expert pressure washing services. We restore driveways, sidewalks, decks, and building exteriors to their original beauty.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">Licensed & Insured Professionals</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">Eco-Friendly Cleaning Solutions</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Free Estimate
              </a>
              <a
                href="tel:+15551234567"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-center flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>(555) 123-4567</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4792051/pexels-photo-4792051.jpeg"
              alt="Professional pressure washing service in action"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}