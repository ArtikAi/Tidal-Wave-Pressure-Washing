import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import About from '../components/About';
import AreasWeServe from '../components/AreasWeServe';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import HashScrollHandler from '../components/HashScrollHandler';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import { getServiceUrl, normalizeServiceSlug } from '../data/services';
import LocalBusinessJsonLd from '../seo/LocalBusinessJsonLd';
import { buildDescription, buildTitle, canonicalFor, defaultOgImage } from '../seo/seo';

function HashRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }
    const hash = location.hash.toLowerCase();
    if (hash === '#services') {
      navigate('/services', { replace: true });
      return;
    }
    if (['#contact', '#faq', '#gallery', '#about'].includes(hash)) {
      return;
    }
    const normalized = normalizeServiceSlug(hash);
    if (normalized) {
      navigate(getServiceUrl(normalized), { replace: true });
    }
  }, [location, navigate]);

  return null;
}

export default function HomePage() {
  const title = buildTitle();
  const description = buildDescription();
  const canonical = canonicalFor('/');

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={defaultOgImage} />
      </Helmet>
      <LocalBusinessJsonLd pageUrl={canonical} />
      <HashRedirectHandler />
      <HashScrollHandler />
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <AreasWeServe showViewAllLink headline="Areas We Serve" />
        <About />
        <Gallery />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
