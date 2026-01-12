import { CheckCircle, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full pt-28 md:pt-32 pb-16 scroll-mt-28 md:scroll-mt-40"
    >
      {/* Media wrapper: keeps image behavior consistent across screens */}
      <div className="relative w-full overflow-hidden">
        {/* Use an aspect ratio that matches your banner (1296x729 ≈ 16:9) */}
        <div className="relative w-full aspect-[16/9] min-h-[420px] md:min-h-[520px] lg:min-h-[560px]">
          {/* Image */}
          <img
            src="/images/other images/banner.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full">
              <div className="max-w-6xl mx-auto px-6 lg:px-0">
                <div className="max-w-2xl space-y-8 text-left bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl px-8 py-10 shadow-xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-100 font-semibold">
                    Restore curb appeal. Clean. Safe. Eco-friendly.
                  </p>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Orlando &amp; Space Coast Pressure Washing Experts
                  </h1>

                  <p className="text-xl text-blue-100/90 leading-relaxed">
                    Licensed and insured technicians using surface-safe methods and biodegradable detergents. We match every job with the right
                    pressure or soft wash so siding, stucco, roofs, and hardscapes shine again.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {["Surface-safe methods", "Biodegradable detergents", "Local small business", "Flexible scheduling"].map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center space-x-3 bg-white/85 backdrop-blur rounded-xl px-4 py-3 shadow-sm"
                      >
                        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                        <span className="text-gray-800 text-sm font-medium">{badge}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="#contact"
                      className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Request My Quote
                    </a>

                    <a
                      href="tel:+13212094997"
                      className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-700 transition-all duration-300 font-semibold text-center flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    >
                      <Phone size={20} />
                      <span>Call (321) 209-4997</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
