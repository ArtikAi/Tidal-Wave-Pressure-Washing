import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[auto,1fr] items-center gap-4">
          <div className="flex items-center">
            <img
              src="/images/other images/logo.png"
              alt="Tidal Wave Pressure Cleaning logo"
              className="h-14 w-auto md:h-16 lg:h-18"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col">
            {/* Top bar */}
            <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <a
                  href="tel:+13212094997"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Phone size={16} />
                  <span>(321) 209-4997</span>
                </a>
                <a
                  href="mailto:tidalwavespressure@gmail.com"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Mail size={16} />
                  <span>tidalwavespressure@gmail.com</span>
                </a>
              </div>
              <div className="text-gray-600">
                Serving Orlando | Brevard County | Merritt Island | Cocoa Beach & nearby
              </div>
            </div>

            {/* Main navigation */}
            <div className="flex justify-between items-center py-4">
              <div className="text-2xl font-bold text-blue-600">
                Tidal Wave Pressure Cleaning
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="tel:+13212094997"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Call Now
                </a>
                <a
                  href="#contact"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Request My Quote
                </a>
              </nav>

              {/* Mobile menu button */}
              <button
                className="md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav
              id="mobile-menu"
              className={`md:hidden border-t border-gray-200 transition-all duration-300 ${
                isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
              }`}
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 space-y-3">
                <a
                  href="tel:+13212094997"
                  className="block bg-blue-600 text-white px-6 py-2 rounded-full text-center hover:bg-blue-700 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Call Now
                </a>
                <a
                  href="#contact"
                  className="block border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full text-center hover:bg-blue-600 hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                >
                  Request My Quote
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
