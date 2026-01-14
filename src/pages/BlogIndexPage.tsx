import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getAllPosts } from '../blog/posts';
import { canonicalFor, defaultOgImage } from '../seo/seo';

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const title = 'Blog | Tidal Wave Pressure Cleaning';
  const description =
    'Guides for driveway cleaning, walkway safety, and soft washing across Orlando, Merritt Island, and the Space Coast.';
  const canonical = canonicalFor('/blog');

  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

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
      <Header />
      <main className="pt-28 bg-white">
        <section className="bg-blue-50 py-12 border-b border-blue-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold">Learning Center</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Pressure Washing Tips &amp; Guides</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Practical advice for keeping driveways, walkways, patios, porches, fences, and storefronts clean between
              professional visits across the Space Coast.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.slug} className="border border-gray-200 rounded-2xl p-6 bg-gray-50 shadow-sm">
                <div className="text-sm text-blue-700 font-semibold">{formatter.format(new Date(post.date))}</div>
                <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
                  <Link to={`/blog/${post.slug}`} className="hover:text-blue-700 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
                  {post.keywords.slice(0, 3).map((keyword) => (
                    <span key={keyword} className="px-2 py-1 rounded-full bg-white border border-gray-200">
                      {keyword}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors"
                >
                  Read post
                  <span aria-hidden className="ml-2">
                    &rarr;
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
