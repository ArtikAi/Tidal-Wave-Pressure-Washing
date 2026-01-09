import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">Tidal Wave Pressure Cleaning</h3>
            <p className="text-gray-300">
              Restore curb appeal with licensed and insured pros using surface-safe methods and biodegradable detergents across Orlando and the Space Coast.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-4">Core Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#services" className="hover:text-white transition-colors">House Washing (Soft Wash)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Roof Cleaning (Soft Wash)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Driveways & Walkways</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Patios & Porches</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Fence Washing</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Commercial Exteriors</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="tel:+13212094997" className="hover:text-white transition-colors">Call Now</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-gray-300">
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <div className="flex items-center space-x-3">
              <Phone size={16} />
              <a href="tel:+13212094997" className="hover:text-white transition-colors">(321) 209-4997</a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={16} />
              <a href="mailto:tidalwavespressure@gmail.com" className="hover:text-white transition-colors">tidalwavespressure@gmail.com</a>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin size={16} className="mt-0.5" />
              <span>780 Plantation Road, Merritt Island, FL</span>
            </div>
            <div className="pt-3">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                <Phone size={16} />
                <span>Request My Quote</span>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/60 rounded-2xl p-6 text-gray-300 text-sm space-y-2">
          <p>
            Privacy: We collect form inputs (name, email, phone, address, service type, message) to respond to inquiries. We do not sell personal information. Third-party embeds such as maps and chat widgets may set cookies. To request data updates or removal, contact tidalwavespressure@gmail.com.
          </p>
          <p>Licensed and insured. Open daily, 24 hours.</p>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Tidal Wave Pressure Cleaning. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#contact" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQs</a>
              <a href="#contact" className="hover:text-white transition-colors">Schedule Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
