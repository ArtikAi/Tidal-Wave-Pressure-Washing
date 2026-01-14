import { Helmet } from "react-helmet-async";

type Props = {
  /**
   * Optional page URL for a WebPage node; does NOT change the LocalBusiness main URL.
   * Use this when you want page-level schema to reference the business.
   */
  pageUrl?: string;
  /**
   * Optional areaServed list (strings like "Merritt Island, FL").
   * If omitted, we keep the default area served baked in below.
   */
  areaServed?: string[];
};

const SITE_URL = "https://tidalwavepressurecleaning.com";
const BUSINESS_ID = `${SITE_URL}/#localbusiness`;

export default function LocalBusinessJsonLd({ pageUrl, areaServed }: Props) {
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: "Tidal Wave Pressure Cleaning, LLC",
    url: SITE_URL + "/",
    telephone: "+1-321-209-4997",
    email: "tidalwavespressure@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "780 Plantation Road",
      addressLocality: "Merritt Island",
      addressRegion: "FL",
      postalCode: "32940",
      addressCountry: "US",
    },
    // IMPORTANT: keep this real. Do not add generic social platform URLs.
    // sameAs: ["https://facebook.com/yourpage", "https://instagram.com/yourhandle"]
    areaServed:
      areaServed?.length
        ? areaServed
        : [
            "Merritt Island, FL",
            "Cocoa, FL",
            "Cocoa Beach, FL",
            "Cape Canaveral, FL",
            "Rockledge, FL",
            "Satellite Beach, FL",
            "Melbourne, FL",
            "Titusville, FL",
            "Viera, FL",
            "Palm Bay, FL",
          ],
  };

  // Optional: add a WebPage node that references the business, without changing the business identity.
  const webPage =
    pageUrl
      ? {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": pageUrl,
          url: pageUrl,
          isPartOf: { "@id": SITE_URL + "/#website" },
          about: { "@id": BUSINESS_ID },
          primaryImageOfPage: SITE_URL + "/og-image.jpg",
        }
      : null;

  const payload = webPage ? [business, webPage] : business;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(payload)}</script>
    </Helmet>
  );
}
