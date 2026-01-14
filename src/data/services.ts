export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  bullets: string[];
  category: 'Pressure Washing' | 'Soft Washing' | 'Commercial';
  imageAlt: string;
  primaryKeywords: string[];
};

export const services: Service[] = [
  {
    slug: 'driveway-cleaning',
    title: 'Driveway Cleaning',
    shortDesc:
      'Cut through tire tracks, rust blooms, and algae slicks on concrete or paver driveways for safer parking and sharper curb appeal.',
    longDesc:
      'Driveways take the brunt of vehicle drips, irrigation overspray, and salt film carried by coastal breezes. We pretreat rust, battery acid spots, and oil stains before running balanced surface cleaners that prevent zebra striping. Edge rinses chase water away from garage thresholds and planter beds so sand and detergents do not linger. Families appreciate the improved traction for bare feet and strollers, while realtors lean on this service to make listing photos pop the same day.',
    bullets: [
      'Commercial-grade surface cleaners keep pressure even',
      'Rust, oil, and tannin pre-treatments included',
      'Careful rinses at curbing, pavers, and garage transitions',
      'Safe for sealed or unsealed concrete and brick pavers',
      'Post-treatment for stubborn organic spots when needed',
      'Flexible scheduling to clear cars and garage access'
    ],
    category: 'Pressure Washing',
    imageAlt: 'Clean concrete driveway with bright curbing after pressure washing',
    primaryKeywords: [
      'driveway pressure washing',
      'concrete cleaning',
      'rust removal driveway',
      'paver driveway cleaning',
      'tire mark removal'
    ]
  },
  {
    slug: 'walkway-cleaning',
    title: 'Walkway Cleaning',
    shortDesc:
      'Remove slick algae and tracked-in dirt from sidewalks, entry paths, and courtyard walkways so guests and tenants can walk safely.',
    longDesc:
      'Sidewalks and entry paths collect leaf tannins, chewing gum, and mildew that quickly turn slick in Florida humidity. We section off walkways, use low-splash surface cleaners, and treat joints so sand and weeds stay contained. Steps, curbs, and wheelchair ramps get extra passes to reduce slip hazards around schools, storefronts, and neighborhood mail kiosks. Evening and early-morning appointments keep foot traffic clear while surfaces dry.',
    bullets: [
      'Surface cleaning tuned for concrete, pavers, and curbing',
      'Spot treatment for gum, leaf tannins, and irrigation stains',
      'Detailing on stairs, ramps, and landings for safety',
      'No harsh bleach smells near doors or landscaping',
      'Cones and signage available for shared sidewalks',
      'Great paired with driveway or porch cleaning'
    ],
    category: 'Pressure Washing',
    imageAlt: 'Brightened sidewalk and entry path after walkway pressure washing',
    primaryKeywords: [
      'sidewalk cleaning',
      'walkway pressure washing',
      'slip hazard removal',
      'entry path cleaning',
      'curb cleaning service'
    ]
  },
  {
    slug: 'patio-cleaning',
    title: 'Patio Cleaning',
    shortDesc:
      'Refresh pool decks, lanais, and outdoor rooms by rinsing away pollen, sand, and mildew with plant-safe detergents.',
    longDesc:
      'Patios and pool decks see sunscreen drips, rust from furniture, and mildew that creeps across grout lines. We start with a low-pressure rinse, apply biodegradable detergents that are safe near pools and pets, and agitate cage frames, screen tracks, and coping. Surface cleaners keep spray contained so nearby furniture and planters stay clean. After the rinse, drains and weep holes are checked to prevent puddling, leaving outdoor spaces guest-ready again.',
    bullets: [
      'Pool-safe detergents and careful cage cleaning',
      'Removes mildew film on pavers and textured decks',
      'Targets furniture rust rings and leaf stains',
      'Hand-detailing on screen tracks and enclosure frames',
      'Balanced pressure to protect grout and sealed pavers',
      'Ideal before gatherings or seasonal openings'
    ],
    category: 'Pressure Washing',
    imageAlt: 'Clean patio pavers and pool deck after professional washing',
    primaryKeywords: [
      'patio cleaning',
      'pool deck pressure washing',
      'lanai cleaning',
      'screen enclosure cleaning',
      'rust ring removal'
    ]
  },
  {
    slug: 'porch-cleaning',
    title: 'Porch Cleaning',
    shortDesc:
      'Entry porches and breezeways get cobweb removal, gentle detergents, and careful rinses to welcome visitors without streaks.',
    longDesc:
      'Front porches set the tone for a property, but ceiling fans, railings, and posts gather dust and spider webs fast. We dust and rinse high corners, brush railings, and use low-pressure washes on painted ceilings and soffits to avoid peeling. Concrete or brick landings are pretreated for tannins and rust from planters, and stair risers receive detailed rinses so they dry evenly. This visit pairs well with walkway cleaning to present a tidy front entry from street to door.',
    bullets: [
      'Cobweb and wasp nest removal around lights and corners',
      'Low-pressure washing for painted ceilings and trim',
      'Railings, columns, and doors brushed then rinsed',
      'Stain treatment on steps, landings, and threshold areas',
      'Optional deodorizing rinse for enclosed breezeways',
      'Protects nearby plants and doormats from overspray'
    ],
    category: 'Pressure Washing',
    imageAlt: 'Freshly cleaned front porch with bright steps and railings',
    primaryKeywords: [
      'porch cleaning',
      'front entry washing',
      'breezeway cleaning',
      'stoop pressure washing',
      'cobweb removal service'
    ]
  },
  {
    slug: 'house-washing',
    title: 'House Washing',
    shortDesc:
      'Soft wash siding, stucco, and trim to remove algae, salt film, and cobwebs without stressing paint, caulk, or windows.',
    longDesc:
      'Homes along the Space Coast collect salt spray, pollen, and spider webs that cling to stucco, vinyl, and Hardie board. Our metered soft-wash mix is applied at low pressure, allowed to dwell, and gently rinsed from soffits to the foundation. Window trims, gutters, and light fixtures are brushed so streaks do not return as the surface dries. Landscaping is pre-wet and post-rinsed, and we keep oxidation in mind around older paint so finishes stay intact.',
    bullets: [
      'Low-pressure soft wash protects paint and seals',
      'Pre-wet and post-rinse landscaping and glass',
      'Includes soffits, gutters, window trim, and light fixtures',
      'Targets salt film near the river or ocean breezes',
      'Great before painting, HOA checks, or listing photos',
      'Safe around screen enclosures and patio doors'
    ],
    category: 'Soft Washing',
    imageAlt: 'Technician soft washing a light-colored home exterior',
    primaryKeywords: [
      'house washing',
      'soft wash siding',
      'stucco cleaning',
      'salt spray removal',
      'exterior home washing'
    ]
  },
  {
    slug: 'fence-cleaning',
    title: 'Fence Cleaning',
    shortDesc:
      'Brighten wood, vinyl, and composite fencing with material-matched detergents and gentle rinses that prep for sealing or painting.',
    longDesc:
      'Fences fade quickly from sprinkler minerals, clay, and algae. We pre-rinse to knock down debris, apply the right detergent for wood, vinyl, or composite panels, and rinse at low pressure to avoid gouging or feathering. Posts, caps, and gates are brushed so lines look even from the street. If you plan to stain or paint, we leave the surface clean and ready to accept coatings evenly.',
    bullets: [
      'Material-specific detergents for wood, vinyl, and composite',
      'Low-pressure rinses prevent grain damage',
      'Removes irrigation rust and clay splatter',
      'Gate hardware and caps detailed by hand',
      'Preps surfaces for sealing or staining',
      'Optional algae maintenance plans for waterfront fences'
    ],
    category: 'Soft Washing',
    imageAlt: 'Clean white vinyl fence with even color after washing',
    primaryKeywords: [
      'fence cleaning',
      'vinyl fence washing',
      'wood fence soft wash',
      'fence algae removal',
      'fence prep for staining'
    ]
  },
  {
    slug: 'commercial-pressure-washing',
    title: 'Commercial Pressure Washing',
    shortDesc:
      'Keep storefronts, HOA amenities, and multi-building campuses clean with scheduled pressure washing that respects tenants and guests.',
    longDesc:
      'Retail pads, restaurants, and office campuses need predictable cleaning that does not interrupt business. We plan routes around parking lots and breezeways, pretreat gum and oil near entrances, and use signage to keep guests moving safely. Dumpster pads and loading zones are degreased without pushing water where it should not go. For HOAs and condos, we batch buildings and amenities so sidewalks, pool decks, and fencing stay on the same maintenance cycle with minimal noise.',
    bullets: [
      'After-hours or early-morning scheduling available',
      'Gum, oil, and food grease pre-treatment included',
      'Surface cleaners control overspray near storefronts',
      'Recurring maintenance plans for HOAs and retail pads',
      'Cones and signage for tenant and guest safety',
      'Flexible scope: breezeways, dumpster pads, monuments'
    ],
    category: 'Commercial',
    imageAlt: 'Clean commercial sidewalk and storefront after pressure washing',
    primaryKeywords: [
      'commercial pressure washing',
      'storefront cleaning',
      'HOA pressure washing',
      'sidewalk cleaning service',
      'restaurant pad cleaning'
    ]
  }
];

export const legacyAliases: Record<string, string> = {
  'driveways-walkways': 'driveway-cleaning',
  'patios-porches': 'patio-cleaning',
  'commercial-exteriors': 'commercial-pressure-washing',
  'fence-washing': 'fence-cleaning',
  '#driveways-walkways': 'driveway-cleaning',
  '#driveway-cleaning': 'driveway-cleaning',
  '#walkway-cleaning': 'walkway-cleaning',
  '#patios-porches': 'patio-cleaning',
  '#porch-cleaning': 'porch-cleaning',
  '#commercial-exteriors': 'commercial-pressure-washing',
  '#commercial-pressure-washing': 'commercial-pressure-washing',
  '#fence-washing': 'fence-cleaning',
  '#house-washing': 'house-washing'
};

export function normalizeServiceSlug(inputSlug?: string | null) {
  const raw = (inputSlug ?? '').toLowerCase().replace(/^\/services\//, '');
  const trimmed = raw.startsWith('#') ? raw.slice(1) : raw;
  const canonical = legacyAliases[trimmed] ?? trimmed;
  const exists = services.some((service) => service.slug === canonical);
  return exists ? canonical : null;
}

export function getServiceBySlug(slug: string | null | undefined) {
  const normalized = normalizeServiceSlug(slug);
  if (!normalized) {
    return null;
  }
  return services.find((service) => service.slug === normalized) ?? null;
}

export function getAllServices() {
  return services;
}

export function getServiceUrl(slug: string) {
  const normalized = normalizeServiceSlug(slug);
  return normalized ? `/services/${normalized}` : '/services';
}

export function getRelatedServices(slug: string, limit = 4) {
  const canonical = normalizeServiceSlug(slug);
  const filtered = canonical ? services.filter((service) => service.slug !== canonical) : services;
  return limit ? filtered.slice(0, limit) : filtered;
}
