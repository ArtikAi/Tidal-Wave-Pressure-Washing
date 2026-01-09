# Tidal Wave Pressure Cleaning – Website Refresh Notes

## Highlights
- Updated hero, services, about, gallery, FAQ, and contact copy with brand voice, service areas, and trust badges (gallery now pulls from /public/images/before and after/).
- Added LocalBusiness JSON-LD, per-page meta description, canonical tag, and deferred main bundle for SEO.
- Enhanced accessibility with aria-expanded controls, focus states, descriptive alt text, and lazy-loaded media.
- Upgraded lead-gen flow: detailed contact info, Formspree-ready quote form with honeypot, map embed, and multiple call-to-call CTAs.
- Removed third-party embed snippets from this bundle.

## Replace These Placeholders Before Launch
1. Formspree endpoint: swap `FORM_ID` for your live ID inside the quote form in the compiled bundle (`assets/index-*.js`) and in the source file `src/components/Contact.tsx` if you plan further edits.
2. Social URLs and OG image: adjust the placeholder links/paths in `index.html` and JSON-LD to match your live profiles and sharing image.

## Source of Changes
The production files in this folder were generated from the React source under `src/`. Edit the source components to make future updates, then run `npm run build` to refresh `/updated-site/`.
