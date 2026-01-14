import { useEffect, useRef } from 'react';
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
    name: 'Star Salon Spa',
    rating: 5,
    text: "Best company I've hired in Brevard county. They were very professional and punctual. Riet the owner went above and beyond to meet our expectations. I would highly recommend Tidal Wave pressure cleaning for your next gig. Also, it is great to know that they are fully licensed and insured. This is a plus for their customers! Thank you, Riet",
    service: 'Fence Cleaning'
  },
  {
    name: 'Sarah Belmont',
    rating: 5,
    text: 'They did an amazing job pressure washing my house, driveway, and sidewalk! It all looks brand new. They were very responsive and easy to contact. The quote they gave me was the best in the area. I am so appreciative, thank you Tidal Wave Pressure Cleaning!',
    service: 'Sidewalk Cleaning'
  },
  {
    name: 'Isaiah Croll',
    rating: 5,
    text: 'Tyler with Tidal Wave Pressure Washing was awesome to work with! Super easy to talk to, straight to the point, and quick. He got us on his schedule within two days and had our whole house and driveway done in about two hours. -- highly recommend!',
    service: 'Power/pressure washing'
  }
];

export default function Gallery() {
  const beforeAfterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = beforeAfterRef.current;
    if (!container) {
      return;
    }

    const isProd = import.meta.env.PROD;
    const logInfo = (message: string, details?: unknown) => {
      if (!isProd) {
        return;
      }
      if (details !== undefined) {
        console.info(`[Sitecam Embed] ${message}`, details);
        return;
      }
      console.info(`[Sitecam Embed] ${message}`);
    };
    const logWarn = (message: string, details?: unknown) => {
      if (!isProd) {
        return;
      }
      if (details !== undefined) {
        console.warn(`[Sitecam Embed] ${message}`, details);
        return;
      }
      console.warn(`[Sitecam Embed] ${message}`);
    };
    let successLogTimeout: number | undefined;

    const existingScript = container.querySelector(
      'script[src="https://sitecam.io/embed/before-after-embed.js"]'
    );
    if (existingScript) {
      logInfo('Embed script already present.');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sitecam.io/embed/before-after-embed.js';
    script.setAttribute('data-comparison-id', '9MwU9oqU');
    script.async = true;
    script.addEventListener('load', () => {
      logInfo('Embed script loaded.');
      successLogTimeout = window.setTimeout(() => {
        const embeddedRoot =
          container.querySelector('.sitecam-embed') ||
          container.querySelector('iframe[src*="sitecam"]');
        if (embeddedRoot) {
          logInfo('Embed rendered.');
        }
      }, 750);
    });
    script.addEventListener('error', (event) => {
      logWarn('Embed script failed to load. Check CSP or network.', event);
    });
    container.appendChild(script);
    logInfo('Embed script injected.');

    const cleanupExtraEmbeds = () => {
      const iframes = document.querySelectorAll('iframe[src*="sitecam"]');
      iframes.forEach((iframe) => {
        if (container.contains(iframe)) {
          return;
        }
        iframe.remove();
      });
    };

    const applyEmbedSizing = () => {
      const iframes = Array.from(container.querySelectorAll('iframe'));
      if (iframes.length === 0) {
        return;
      }
      iframes.forEach((iframe) => {
        iframe.style.width = '100%';
        iframe.style.maxWidth = '1200px';
        iframe.style.height = '520px';
        iframe.style.display = 'block';
      });
      cleanupExtraEmbeds();
    };

    const observer = new MutationObserver(applyEmbedSizing);
    observer.observe(container, { childList: true, subtree: true });
    applyEmbedSizing();
    cleanupExtraEmbeds();

    return () => {
      observer.disconnect();
      if (successLogTimeout) {
        window.clearTimeout(successLogTimeout);
      }
    };
  }, []);

  return (
    <section id="gallery" className="py-20 bg-white scroll-mt-28 md:scroll-mt-40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Proof of <span className="text-blue-600">Surface-Safe Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From Orlando neighborhoods to Cocoa Beach storefronts, see how our pressure and soft washing restore color, safety, and curb appeal.
          </p>
        </div>

        <div className="relative mb-12 w-full overflow-hidden isolate" style={{ zIndex: 1 }}>
          <div ref={beforeAfterRef} style={{ minHeight: 520 }} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-white"
            style={{ transform: 'translateY(12px)' }}
          />
        </div>
        <style>
          {`
            #gallery {
              --sitecam-max-width: 1200px;
            }
            #gallery .sitecam-embed,
            #gallery .sitecam-embed iframe,
            #gallery iframe[src*="sitecam"] {
              width: 100% !important;
              max-width: var(--sitecam-max-width) !important;
              height: 520px !important;
              display: block !important;
              margin: 0 auto !important;
              position: relative !important;
              z-index: 1 !important;
            }
          `}
        </style>

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
