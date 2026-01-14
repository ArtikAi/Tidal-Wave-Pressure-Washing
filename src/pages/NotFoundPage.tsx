import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold">Page Not Found</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">We could not find that page.</h1>
          <p className="text-lg text-gray-700">
            Try visiting our homepage, explore services, or see the areas we serve across Orlando and the Space Coast.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Go Home
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 rounded-full border-2 border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
