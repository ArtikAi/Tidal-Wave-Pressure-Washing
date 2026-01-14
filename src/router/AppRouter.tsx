import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const ServicesIndexPage = lazy(() => import('../pages/ServicesIndexPage'));
const ServiceDetailPage = lazy(() => import('../pages/ServiceDetailPage'));
const LocationsIndexPage = lazy(() => import('../pages/LocationsIndexPage'));
const LocationDetailPage = lazy(() => import('../pages/LocationDetailPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const GalleryPage = lazy(() => import('../pages/GalleryPage'));
const BlogIndexPage = lazy(() => import('../pages/BlogIndexPage'));
const BlogPostPage = lazy(() => import('../pages/BlogPostPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export default function AppRouter() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-700">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesIndexPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/locations" element={<LocationsIndexPage />} />
        <Route path="/locations/:slug" element={<LocationDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
