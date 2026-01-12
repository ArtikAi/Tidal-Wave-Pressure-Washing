import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#gallery", label: "Gallery" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  const smoothScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      {/* Match Hero container exactly */}
      <div className="max-w-6xl mx-auto px-6 lg:px-0">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between gap-6 py-2 text-sm border-b border-gray-200">
          <div className="flex items-center gap-4 min-w-0">
            <a
              href="tel:+13212094997"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap"
            >
              <Phone size={16} />
              <span>(321) 209-4997</span>
            </a>
            <a
              href="mailto:tidalwavespressure@gmail.com"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors min-w-0"
            >
              <Mail size={16} />
              <span className="truncate">tidalwavespressure@gmail.com</span>
            </a>
          </div>

          {/* Clamp this so it doesn't visually pull the header right */}
          <div className="text-gray-600 text-right truncate max-w-[520px] flex-1 min-w-0">
            Serving Orlando | Brevard County | Merritt Island | Cocoa Beach &amp; nearby
          </div>
        </div>

        {/* Main navigation row */}
        <div className="flex items-center gap-5 lg:gap-4 py-4">
          {/* Left cluster: logo + brand (this fixes the “everything shifted right” feeling) */}
          <a
            href="#home"
            className="flex items-center gap-2 shrink-0"
            onClick={(e) => {
              e.preventDefault();
              smoothScroll("#home");
              setIsMenuOpen(false);
            }}
          >
            <img
              src="/images/other images/logo.png"
              alt="Tidal Wave Pressure Cleaning logo"
              className="h-14 md:h-16 lg:h-20 w-auto object-contain"
              loading="lazy"
            />
            <div className="text-xl lg:text-2xl font-bold text-blue-600 whitespace-nowrap">
              Tidal Wave Pressure Cleaning
            </div>
          </a>

          {/* Desktop nav centered */}
          <nav className="hidden md:flex flex-1 justify-center" aria-label="Primary">
            <div className="flex items-center gap-6 lg:gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScroll(link.href);
                    setIsMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Desktop CTAs pinned right */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="tel:+13212094997"
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Call Now
            </a>
            <a
              href="#contact"
              className="border-2 border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              onClick={(e) => {
                e.preventDefault();
                smoothScroll("#contact");
                setIsMenuOpen(false);
              }}
            >
              Request My Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => setIsMenuOpen((v) => !v)}
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
            isMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"
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
                smoothScroll(link.href);
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
                smoothScroll("#contact");
                setIsMenuOpen(false);
              }}
            >
              Request My Quote
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
