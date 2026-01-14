import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getPostBySlug } from '../blog/posts';
import { getAllServices, getServiceUrl } from '../data/services';
import { locations } from '../data/locations';
import { buildDescription, buildTitle, canonicalFor, defaultOgImage } from '../seo/seo';
import NotFoundPage from './NotFoundPage';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? '';
  const post = getPostBySlug(slug);

  if (!post) {
    return <NotFoundPage />;
  }

  const title = buildTitle(post.title);
  const description = buildDescription(post.description);
  const canonical = canonicalFor(`/blog/${post.slug}`);
  const services = getAllServices().slice(0, 3);
  const serviceAreaLinks = locations.slice(0, 6);
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={defaultOgImage} />
      </Helmet>
      <Header />
      <main className="pt-28 bg-white">
        <article className="max-w-4xl mx-auto px-6 lg:px-0 py-12 space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-blue-700 font-semibold uppercase tracking-[0.2em]">Pressure Washing Blog</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{post.title}</h1>
            <div className="text-gray-600 text-sm">
              {formatter.format(new Date(post.date))}
              {post.cityFocus ? ` • Focus: ${post.cityFocus}` : ''}
            </div>
          </div>
          <div className="prose prose-lg max-w-none prose-a:text-blue-700 prose-li:marker:text-blue-600">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>
        </article>

        <section className="max-w-4xl mx-auto px-6 lg:px-0 py-8 grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Related services</h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={getServiceUrl(service.slug)}
                    className="text-blue-700 font-semibold hover:text-blue-800 transition-colors"
                  >
                    {service.title}
                  </Link>
                  <p className="text-sm text-gray-700">{service.shortDesc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Service areas</h2>
            <div className="flex flex-wrap gap-2">
              {serviceAreaLinks.map((location) => (
                <Link
                  key={location.slug}
                  to={`/locations/${location.slug}`}
                  className="px-3 py-1 rounded-full border border-gray-200 text-gray-800 hover:border-blue-400 hover:text-blue-700 transition-colors text-sm"
                >
                  {location.name}
                </Link>
              ))}
              <Link
                to="/locations"
                className="px-3 py-1 rounded-full border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition-colors text-sm"
              >
                View all
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 lg:px-0 pb-12">
          <Link to="/blog" className="text-blue-700 font-semibold hover:text-blue-800 transition-colors">
            ← Back to blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
