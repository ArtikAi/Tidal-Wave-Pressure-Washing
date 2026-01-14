export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  keywords: string[];
  cityFocus?: string;
  body: string;
};

export const posts: BlogPost[] = [
  {
    slug: 'prepping-driveway-pressure-wash-merritt-island',
    title: 'How to Prep Your Driveway for Pressure Washing on Merritt Island',
    date: '2026-01-05',
    description:
      'Simple steps homeowners can take before a driveway cleaning so the crew can work faster and keep landscaping protected.',
    keywords: ['driveway cleaning', 'pressure washing', 'Merritt Island', 'rust removal', 'surface prep'],
    cityFocus: 'Merritt Island',
    body: `## Clear the surface before the crew arrives

Move vehicles, planters, and basketball hoops so the entire driveway is open. If you have sprinkler heads along the edge, mark them with flags so the technician can avoid them when running the surface cleaner.

## Point out stains that need special attention

Battery acid drips, fertilizer spills, and rust blooms need targeted pretreatments. Show the crew where they are so they can start pretreating while setting up. If you recently used fertilizer, give it a quick rinse so granules do not etch while we work.

## Protect what matters nearby

On Merritt Island, many driveways sit close to the river or lush landscaping. A light rinse on nearby plants and moving delicate pots or decor a few feet back keeps them safe while detergents do their job. If you have freshly sealed pavers, let the crew know so they can adjust pressure.

## Plan parking and drying time

Surface cleaners push water and detergents toward the street. Park cars away from the flow path and give the driveway an hour or two to dry before pulling back in. In humid afternoons, a small fan in the garage doorway helps dry the transition where tires rest.

## Combine services for better curb appeal

Driveways often look best when paired with walkway and porch cleaning. If launch traffic and salt spray have left residue on your front entry, adding a porch rinse keeps the whole approach bright for guests and deliveries.`
  },
  {
    slug: 'soft-wash-vs-pressure-wash-space-coast',
    title: 'Soft Wash vs Pressure Wash: Choosing the Right Method on the Space Coast',
    date: '2025-12-18',
    description:
      'Both methods have a place. Here is how we decide between soft washing and pressure washing for coastal homes and businesses.',
    keywords: ['soft wash', 'pressure wash', 'Space Coast', 'house washing', 'patio cleaning'],
    body: `### When soft washing wins

Soft washing relies on low pressure and detergents to break down algae and salt film. We use it on painted stucco, Hardie board, vinyl fencing, porch ceilings, and screened enclosures. Near Cocoa Beach and Satellite Beach, salt spray can corrode fixtures; a gentle rinse avoids forcing water behind trim or into sliders.

### When pressure washing is the right call

Concrete, pavers, and curbing benefit from measured pressure and surface cleaners. Driveway cleaning, walkway brightening, and patio refreshes all use higher flow to lift stains. On commercial pads in Cape Canaveral, we pair pressure washing with degreasers to tackle gum and food spills.

### It is usually a blend

Many properties need both in one visit. A Merritt Island home might get a soft-wash house rinse, pressure-washed driveway, and fence cleaning with mild pressure. The goal is always the same: remove buildup without creating stripes, etching, or oxidation streaks.

### Questions to ask your provider

- Will you adjust pressure for different surfaces in one visit?
- How do you protect plants, paint, and hardware?
- Do you pretreat rust, oil, or tannin stains before using the surface cleaner?
- What does the post-rinse look like near pool decks or docks?

Clear answers keep your property safe while getting the clean you expect.`
  },
  {
    slug: 'hoa-walkway-safety-checklist',
    title: 'HOA Walkway Safety Checklist Before Inspections',
    date: '2025-12-05',
    description:
      'A quick inspection routine HOAs can use to keep common-area walkways looking good and safe before annual reviews.',
    keywords: ['HOA', 'walkway cleaning', 'sidewalk safety', 'commercial pressure washing'],
    cityFocus: 'Viera',
    body: `### Look for slick spots first

Shade from oak trees and irrigation overspray create algae slicks. Walk the route in the morning when dew makes hazards easier to see. Mark slippery sections so the cleaning crew can treat them before running the surface cleaner.

### Check transitions and ramps

ADA ramps, curb cuts, and stair landings gather sand and gum. These are high-liability zones, so request extra passes and post-clean cones. Ask your contractor to use low-splash guards near playgrounds and lobby doors.

### Inspect curbing and monuments

Rust from irrigation and mildew on painted monuments can make an otherwise clean entrance look neglected. Gentle detergents remove discoloration without stripping paint, and a quick rinse on nearby landscaping keeps plants healthy.

### Plan the schedule

Evening or early-morning cleanings keep residents and guests moving. For Viera and Rockledge communities, grouping driveways, walkways, and porch entries on the same day produces a consistent finish and cuts down on repeat mobilizations.

### Keep communication simple

Send residents a short notice with the cleaning window, request that cars move off common pads, and remind pet owners about wet surfaces. Clear communication plus a focused cleaning plan keeps inspections smooth and keeps neighbors happy.`
  }
];

export function getPostBySlug(slug: string) {
  const key = slug?.toLowerCase() ?? '';
  return posts.find((post) => post.slug === key) ?? null;
}

export function getAllPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
