import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What are the dark streaks on my roof?',
    answer: 'They are gloeocapsa magma bacteria. Our soft-wash process removes it and helps slow regrowth so your roof keeps its color longer.'
  },
  {
    question: 'Pressure washing vs. soft washing?',
    answer: 'Pressure washing uses high PSI for hard surfaces like concrete. Soft washing combines low PSI with detergents for siding, stucco, and roofs to avoid damage.'
  },
  {
    question: 'Do you remove old or set-in stains?',
    answer: 'Yes. We pre-treat with targeted detergents and agitation. Some stains can be permanent, and we set expectations after inspection before starting work.'
  },
  {
    question: 'Do you use harsh chemicals?',
    answer: 'No. We rely on biodegradable detergents, controlled dwell times, and thorough rinsing to protect landscaping, pets, and finishes.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    panelRefs.current.forEach((panel, index) => {
      if (!panel) {
        return;
      }
      const wasOpen = panel.dataset.open === 'true';
      const isOpen = openIndex === index;
      panel.dataset.open = isOpen ? 'true' : 'false';

      if (isOpen) {
        panel.style.visibility = 'visible';
        panel.style.height = `${panel.scrollHeight}px`;
      } else if (wasOpen) {
        if (panel.style.height === 'auto' || !panel.style.height) {
          panel.style.height = `${panel.scrollHeight}px`;
        }
        requestAnimationFrame(() => {
          panel.style.height = '0px';
        });
      } else {
        panel.style.visibility = 'hidden';
        panel.style.height = '0px';
      }
    });
  }, [openIndex]);

  useEffect(() => {
    const panels = panelRefs.current;
    const handlers = panels.map((panel) => {
      if (!panel) {
        return null;
      }
      const handler = (event: TransitionEvent) => {
        if (event.propertyName !== 'height') {
          return;
        }
        const isOpen = panel.dataset.open === 'true';
        if (isOpen) {
          panel.style.height = 'auto';
        } else {
          panel.style.visibility = 'hidden';
        }
      };
      panel.addEventListener('transitionend', handler);
      return handler;
    });

    const handleResize = () => {
      panelRefs.current.forEach((panel, index) => {
        if (!panel || openIndex !== index) {
          return;
        }
        panel.style.height = 'auto';
        const height = panel.scrollHeight;
        panel.style.height = `${height}px`;
        requestAnimationFrame(() => {
          panel.style.height = 'auto';
        });
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      panels.forEach((panel, index) => {
        if (!panel || !handlers[index]) {
          return;
        }
        panel.removeEventListener('transitionend', handlers[index] as EventListener);
      });
      window.removeEventListener('resize', handleResize);
    };
  }, [openIndex]);

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how we protect surfaces, remove buildup, and deliver reliable results across Orlando and the Space Coast.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="bg-white border border-blue-100 rounded-xl shadow-sm">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-6 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-blue-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  className={`overflow-hidden text-gray-600 transition-[height,opacity] duration-300 ease-in-out ${
                    isOpen ? 'px-6 pt-3 pb-4 opacity-100' : 'px-6 pt-0 pb-0 opacity-0'
                  }`}
                >
                  <p className="m-0 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
