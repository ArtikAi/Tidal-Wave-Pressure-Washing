import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">Tidal Wave Pressure Cleaning</h3>
            <p className="text-gray-300">
              Restore curb appeal with licensed and insured pros using surface-safe methods and biodegradable detergents
              across Orlando and the Space Coast.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <a href="tel:+13212094997" className="hover:text-white transition-colors">
                  (321) 209-4997
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <a href="mailto:tidalwavespressure@gmail.com" className="hover:text-white transition-colors">
                  tidalwavespressure@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5" />
                <span>780 Plantation Road, Merritt Island, FL</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/services/driveway-cleaning" className="hover:text-white transition-colors">
                  Driveway Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/walkway-cleaning" className="hover:text-white transition-colors">
                  Walkway Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/patio-cleaning" className="hover:text-white transition-colors">
                  Patio Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/porch-cleaning" className="hover:text-white transition-colors">
                  Porch Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/house-washing" className="hover:text-white transition-colors">
                  House Washing
                </Link>
              </li>
              <li>
                <Link to="/services/fence-cleaning" className="hover:text-white transition-colors">
                  Fence Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-pressure-washing" className="hover:text-white transition-colors">
                  Commercial Pressure Washing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/locations/merritt-island" className="hover:text-white transition-colors">
                  Merritt Island
                </Link>
              </li>
              <li>
                <Link to="/locations/cocoa" className="hover:text-white transition-colors">
                  Cocoa
                </Link>
              </li>
              <li>
                <Link to="/locations/cocoa-beach" className="hover:text-white transition-colors">
                  Cocoa Beach
                </Link>
              </li>
              <li>
                <Link to="/locations/cape-canaveral" className="hover:text-white transition-colors">
                  Cape Canaveral
                </Link>
              </li>
              <li>
                <Link to="/locations/rockledge" className="hover:text-white transition-colors">
                  Rockledge
                </Link>
              </li>
              <li>
                <Link to="/locations/satellite-beach" className="hover:text-white transition-colors">
                  Satellite Beach
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-white transition-colors font-semibold">
                  View all areas
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-gray-300">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-white transition-colors">
                  Areas We Serve
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="tel:+13212094997" className="hover:text-white transition-colors">
                  Call Now
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-800/60 rounded-2xl p-6 text-gray-300 text-sm space-y-2">
          <p>
            Privacy: We collect form inputs (name, email, phone, address, service type, message) to respond to inquiries.
            We do not sell personal information. Third-party embeds such as maps may set cookies. To request data updates
            or removal, contact tidalwavespressure@gmail.com.
          </p>
          <p>Licensed and insured. Open daily, 24 hours.</p>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
            <p>&copy; {year} Tidal Wave Pressure Cleaning. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/contact" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/#faq" className="hover:text-white transition-colors">
                FAQs
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Schedule Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
