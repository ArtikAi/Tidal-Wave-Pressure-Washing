import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Send } from 'lucide-react';
import { appendTrustedScript, sanitizePlainText } from '../utils/security';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!turnstileSiteKey) {
      return;
    }

    appendTrustedScript('https://challenges.cloudflare.com/turnstile/v0/api.js', {
      id: 'turnstile-script',
      dataAttributes: { turnstile: 'true' },
    });
  }, [turnstileSiteKey]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === 'submitting') {
      return;
    }

    setFormStatus('submitting');
    setStatusMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const readValue = (key: string, maxLength = 2000) => {
      const value = formData.get(key);
      return typeof value === 'string' ? sanitizePlainText(value, maxLength) : '';
    };

    const payload = {
      name: readValue('name', 80),
      phone: readValue('phone', 20),
      email: readValue('email', 120),
      address: readValue('address', 200),
      service: readValue('service', 40),
      message: readValue('message', 2000),
      company: readValue('company', 200),
      turnstileToken: readValue('turnstileToken', 2048),
    };

    if (!payload.turnstileToken) {
      setFormStatus('error');
      setStatusMessage('Please complete the security check.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setFormStatus('error');
        setStatusMessage(result?.error || 'Unable to send your request. Please try again.');
        const turnstile = (window as { turnstile?: { reset?: () => void } }).turnstile;
        turnstile?.reset?.();
        return;
      }

      form.reset();
      const turnstile = (window as { turnstile?: { reset?: () => void } }).turnstile;
      turnstile?.reset?.();
      setFormStatus('success');
      setStatusMessage('Thanks! We received your request and will follow up shortly.');
    } catch {
      setFormStatus('error');
      setStatusMessage('Unable to send your request. Please try again.');
      const turnstile = (window as { turnstile?: { reset?: () => void } }).turnstile;
      turnstile?.reset?.();
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 scroll-mt-28 md:scroll-mt-40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get a Fast <span className="text-blue-600">Exterior Cleaning Quote</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your property and preferred timing. We respond the same day with a custom plan for your Orlando or Space Coast home or business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Talk With Our Team</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <a href="tel:+13212094997" className="text-blue-600 hover:underline">(321) 209-4997</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <a href="mailto:tidalwavespressure@gmail.com" className="text-blue-600 hover:underline">tidalwavespressure@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Service Area</div>
                    <p className="text-gray-600">
                      Orlando, Merritt Island, Cocoa, Cocoa Beach, Cape Canaveral, Rockledge, Satellite Beach, Melbourne,
                      Titusville, Viera, Palm Bay
                    </p>
                    <p className="text-gray-500 mt-1">780 Plantation Road, Merritt Island, FL</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Hours</div>
                    <div className="text-gray-600">Open daily, 24 hours</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <ShieldCheck className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Peace of Mind</div>
                    <p className="text-gray-600">Licensed and insured. Eco-friendly detergents with landscape protection on every job.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg space-y-4">
              <h4 className="text-xl font-bold">Ready When You Are</h4>
              <p className="text-blue-50">Schedule recurring cleanings or one-time projects. Same-week appointments available for most properties.</p>
              <a
                href="tel:+13212094997"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
              >
                <Phone size={20} />
                <span>Call Now</span>
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="Tidal Wave Pressure Cleaning service area map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.232000474047!2d-80.68423072360162!3d28.327680275813883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88de104c3b3cbb41%3A0x6c59c779843f38fa!2s780%20Plantation%20Rd%2C%20Merritt%20Island%2C%20FL%2032940!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Quote Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Request My Quote</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Protected by Cloudflare Turnstile. We respond within one business day.
            </p>
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={80}
                    pattern="[A-Za-z][A-Za-z .,'-]{1,79}"
                    title="Use 2-80 characters with letters, spaces, and basic punctuation."
                    autoComplete="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    minLength={7}
                    maxLength={20}
                    pattern="[0-9()+\\- ]{7,20}"
                    title="Use 7-20 characters with digits, spaces, and + ( ) -."
                    autoComplete="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={120}
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  minLength={5}
                  maxLength={200}
                  autoComplete="street-address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Needed *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="house-washing">House washing (soft wash)</option>
                  <option value="driveway-cleaning">Driveway cleaning</option>
                  <option value="walkway-cleaning">Walkway/sidewalk cleaning</option>
                  <option value="patio-cleaning">Patio or pool deck cleaning</option>
                  <option value="porch-cleaning">Porch or breezeway cleaning</option>
                  <option value="fence-cleaning">Fence cleaning</option>
                  <option value="commercial-pressure-washing">Commercial pressure washing</option>
                  <option value="other">Other / not sure</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  minLength={10}
                  maxLength={2000}
                  required
                  placeholder="Share square footage, surfaces, stains, deadlines, or access notes."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {turnstileSiteKey ? (
                <div className="flex justify-center">
                  <div
                    className="cf-turnstile"
                    data-sitekey={turnstileSiteKey}
                    data-response-field-name="turnstileToken"
                  />
                </div>
              ) : (
                <p className="text-sm text-red-600">Turnstile site key is missing.</p>
              )}

              {statusMessage ? (
                <p
                  className={`text-sm ${formStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}
                  role="status"
                  aria-live="polite"
                >
                  {statusMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={formStatus === 'submitting' || !turnstileSiteKey}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Send size={20} />
                <span>{formStatus === 'submitting' ? 'Sending...' : 'Send My Quote Request'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
