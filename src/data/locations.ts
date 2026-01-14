import type { Service } from './services';

export type Location = {
  slug: string;
  name: string;
  uniqueIntro: string;
  landmarks: string[];
  primaryServices: Service['slug'][];
  drivingNotes: string;
  localProofPlaceholder: string;
  neighborhoods?: string[];
  nearby?: string[];
  detailSections?: string[];
};

export const locations: Location[] = [
  {
    slug: 'merritt-island',
    name: 'Merritt Island',
    uniqueIntro:
      'Salt spray from the Banana and Indian Rivers sticks to stucco, docks, and screened lanais faster than inland areas. On Merritt Island we tailor soft washing to waterfront paint and railings, pretreat rust from irrigation that pulls minerals out of well water, and rinse cage frames so pool decks stay bright. Afternoon storms and launch schedules shape our timing, helping concrete and pavers dry fast before humidity rolls back in. Canals funnel wind that dries detergents quickly, so we adjust dwell time on the fly to keep coverage even. Many homes mix stucco, Hardie board, and dock materials, so we keep overspray off lifts, PVC railings, and boat hardware while we work.',
    landmarks: [
      'Banana River',
      'Indian River Lagoon',
      'NASA Causeway',
      'Kelly Park',
      'Sykes Creek',
      'Harbortown Marina',
      'Audubon Rd boat ramps',
      'Merritt Square area'
    ],
    primaryServices: [
      'house-washing',
      'driveway-cleaning',
      'walkway-cleaning',
      'patio-cleaning',
      'fence-cleaning',
      'commercial-pressure-washing'
    ],
    drivingNotes: 'Based on the island, we can reach Tropical Trail, Sykes Creek, and Newfound Harbor routes quickly between launches.',
    localProofPlaceholder: 'Add before/after of riverfront dock pilings and Banana River lanai screens.',
    neighborhoods: ['South Tropical Trail', 'Newfound Harbor', 'Harbor Oaks', 'Waterway Manor', 'Sykes Creek'],
    nearby: ['cocoa', 'cocoa-beach', 'cape-canaveral', 'rockledge'],
    detailSections: [
      'Waterfront lots see algae bloom faster where breeze and boat traffic mix. We pre-wet plants near seawalls, cover boat lifts and electrical outlets, and meter detergents so runoff is safe around dock pilings. Screened pool cages often need brush work in the track and kick plates; we handle those by hand so rollers still glide after the rinse.',
      'Driveways and walkways near SR-520 and the Causeway pick up tire dust and launch-day traffic. Balanced surface cleaners prevent lines on stamped concrete and pavers, and post-treatments keep rust blooms and tannins from coming back quickly. For homes tucked under oak canopy, we focus on mildew creeping across shade sides and gutters that overflow with leaves.',
      'Many Merritt Island homes have mixed surfaces - stucco, Hardie board, brick columns, and vinyl fencing. Soft washing keeps oxidation in check on older paint while protecting window seals. If you are prepping for appraisal or a quick sale, a single visit covering house, driveway, and pool deck can make marketing photos look fresh without repainting.'
    ]
  },
  {
    slug: 'cocoa',
    name: 'Cocoa',
    uniqueIntro:
      'Historic Cocoa Village, tree-lined streets, and river breezes create a mix of shade mildew and salt residue. Brick walkways and older masonry need lower pressure, while newer plazas off SR-520 see gum and foot traffic that need commercial-grade surface cleaning. We time visits around Riverfront Park events so storefronts and porches stay dry before crowds arrive. Homes along Indian River Drive pick up salt film and pollen at the same time, so we pair soft washing with careful window rinsing. North Cocoa neighborhoods with well water often have rust on curbing that benefits from pretreatment before a full wash.',
    landmarks: [
      'Historic Cocoa Village',
      'Riverfront Park',
      'SR-520 Causeway',
      'Cocoa Riverwalk',
      'Brevard Museum of History & Natural Science',
      'Taylor Park',
      'Cocoa Village Marina'
    ],
    primaryServices: [
      'house-washing',
      'walkway-cleaning',
      'driveway-cleaning',
      'porch-cleaning',
      'patio-cleaning',
      'fence-cleaning',
      'commercial-pressure-washing'
    ],
    drivingNotes: 'Just across the causeway, we group Cocoa stops with Merritt Island and Rockledge routes to keep response times short.',
    localProofPlaceholder: 'Add photos of brick sidewalk gum removal near Cocoa Village storefronts.',
    neighborhoods: ['Cocoa Village', 'Port St. John', 'Canaveral Groves', 'Indian River Drive'],
    nearby: ['merritt-island', 'rockledge', 'cocoa-beach'],
    detailSections: [
      'Cocoa\'s oak canopy drops pollen and tannins that stain brick and concrete. We start with a controlled rinse, then apply detergents that loosen organics without pushing water into storefront thresholds. Hand-brushing around porch posts and railings keeps paint intact on the town\'s older homes and shops.',
      'Along the river, salt film settles on siding and window mullions. Soft washing clears it without etching glass or leaving drip marks on pastel paint. For homeowners on Indian River Drive, we often pair house washing with fence and driveway cleaning so the river-facing and street-facing sides match.',
      'Commercial pads around the Village and U.S. 1 benefit from after-hours cleaning. We pretreat gum, food spills, and oil near entrances, cone off damp areas, and keep noise low for residents above shops. HOA entrances nearby get the same treatment with monument signs and curbing rinsed for a uniform look.'
    ]
  },
  {
    slug: 'cocoa-beach',
    name: 'Cocoa Beach',
    uniqueIntro:
      'Oceanfront humidity, sea turtle-safe lighting, and heavy rental turnover define Cocoa Beach cleanings. Salt spray sticks to rails and sliders, while sandy foot traffic grinds into walkways and pool decks. We use ocean-safe detergents, soft wash pastel stucco, and schedule after check-out times so vacation guests arrive to bright, dry entrances. Upper-floor balconies need gentle rinses that respect neighboring units, while ground-floor patios need sand moved away from slider tracks. Driftwood tones and pastel paints are popular here, so our mixes stay mild to avoid chalking delicate finishes.',
    landmarks: [
      'Cocoa Beach Pier',
      'Minutemen Causeway',
      'Shepard Park',
      'Lori Wilson Park',
      'Ron Jon Surf Shop',
      'Thousand Islands Conservation Area',
      'Downtown Cocoa Beach'
    ],
    primaryServices: [
      'house-washing',
      'patio-cleaning',
      'walkway-cleaning',
      'driveway-cleaning',
      'porch-cleaning',
      'commercial-pressure-washing'
    ],
    drivingNotes: 'From Merritt Island we access the Minutemen Causeway quickly, keeping beachside schedules tight between turnovers.',
    localProofPlaceholder: 'Add soft wash example from an oceanfront balcony and pool deck combo clean.',
    neighborhoods: ['Snug Harbor', 'Sunset Drive', 'Ridgewood', 'Ocean Woods'],
    nearby: ['cape-canaveral', 'merritt-island', 'satellite-beach'],
    detailSections: [
      'Beach sand and sunscreen leave slick film on pool decks and entry stairs. We pretreat rust from metal furniture, keep detergents away from open water, and rinse railings and screen panels until they dry clear. Drift marks on stucco are addressed with low-pressure mixes that will not disturb paint near turtle-friendly lighting.',
      'Rental managers appreciate predictable timing. We schedule immediately after check-out, cordon off damp walkways, and leave signage so cleaners and guests know when surfaces are safe. Balconies, sliders, and balcony ceilings get gentle brushing to remove salt crystals that corrode fixtures.',
      'For commercial spots near the Pier and downtown, gum and food spills show up daily. Surface cleaners control overspray on narrow sidewalks, and we post-rinse storefront glass to avoid spotting. Many businesses pair these visits with dumpster pad degreasing to keep odors down in the coastal heat.'
    ]
  },
  {
    slug: 'cape-canaveral',
    name: 'Cape Canaveral',
    uniqueIntro:
      'Condo balconies, cruise day traffic, and salt-heavy air make Cape Canaveral unique. Aluminum rails and painted stucco oxidize fast, so we lean on soft washing for exteriors and detailed rinses on breezeways. Surface cleaners tackle parking pads and walkways between port schedules so guests and crews can move safely. Many complexes stack breezeways above ground-floor patios, so we manage runoff carefully to avoid streaking. Monument signs and security gates at the port need low-splash cleaning that keeps sensors and cameras protected.',
    landmarks: [
      'Port Canaveral',
      'Jetty Park',
      'Manatee Sanctuary Park',
      'Cape Canaveral Lighthouse',
      'Exploration Tower area',
      'Oceanfront condos along Ridgewood',
      'SR-528 Beachline entrance'
    ],
    primaryServices: [
      'house-washing',
      'walkway-cleaning',
      'driveway-cleaning',
      'porch-cleaning',
      'patio-cleaning',
      'commercial-pressure-washing'
    ],
    drivingNotes: 'We stage around port cruise days, leaving early from Merritt Island to beat boarding traffic and keep arrivals smooth.',
    localProofPlaceholder: 'Add breezeway and stairwell cleaning example from a Cape Canaveral condo.',
    neighborhoods: ['Ridgewood Ave corridor', 'Port condos', 'Harbor Heights'],
    nearby: ['cocoa-beach', 'merritt-island', 'cocoa'],
    detailSections: [
      'Cruise day parking lots see constant tire dust and oil spots. We degrease high-traffic lanes, rinse curbing toward drains, and avoid pushing water into elevator lobbies. Breezeways and stairwells are brushed and soft washed to avoid streaks on painted ceilings.',
      'Ocean air oxidizes railings and balcony ceilings. Our soft-wash mix is dialed back for aluminum and coated metals, followed by a gentle rinse that protects gaskets and sliders. Ground-level patios get extra rinsing to move sand away from door tracks and pool gates.',
      'HOA boards often schedule grouped visits - parking decks, dumpster pads, and monument signs all in one. We provide cones and post-clean notices so residents know when surfaces will be slick. For small homes tucked between complexes, we pair house washing with fence and walkway cleaning to keep curb appeal consistent on narrow lots.'
    ]
  },
  {
    slug: 'rockledge',
    name: 'Rockledge',
    uniqueIntro:
      'Rockledge combines shaded golf course communities with busy commercial corridors along Fiske and Murrell. Irrigation stains, clay splash, and oak pollen show up quickly on driveways and fences. We balance pressure on concrete and pavers, soft wash stucco near lakes, and keep curbs and cart paths tidy for HOA standards. Many homes back up to fairways or ponds, so we watch runoff while still clearing algae at waterlines. Commercial pads near Interstate 95 see tire dust and oil that need regular degreasing to stay presentable.',
    landmarks: [
      'Rockledge Country Club',
      'River Way',
      'Barnes Boulevard corridor',
      'Fiske Boulevard',
      'Anderson Stormwater Park',
      'Florida Ave riverfront',
      'Golfview neighborhoods'
    ],
    primaryServices: [
      'driveway-cleaning',
      'walkway-cleaning',
      'house-washing',
      'fence-cleaning',
      'porch-cleaning',
      'patio-cleaning',
      'commercial-pressure-washing'
    ],
    drivingNotes: 'Minutes from our Merritt Island base, Rockledge routes are grouped with Cocoa and Viera to minimize travel time.',
    localProofPlaceholder: 'Add driveway and cart path cleaning proof from a Rockledge golf community.',
    neighborhoods: ['River Way', 'Ventura at Turtle Creek', 'Chelsea Park', 'Sonoma', 'Ashwood Lakes'],
    nearby: ['viera', 'cocoa', 'merritt-island'],
    detailSections: [
      'Clay-rich soil splashes onto garage doors and lower stucco during rains. We rinse first, apply detergents to lift the orange tint, and finish with a controlled wash so water drains toward the street without streaking. For homes along ponds, we avoid pushing runoff into the shoreline.',
      'Fences and screened porches near fairways collect grass clippings and mildew. Low-pressure washing keeps screens tight and prepares wood or vinyl for sealing. Driveways often have cart tire marks; surface cleaners even out pressure to remove them without scarring joints.',
      'Commercial plazas along Fiske and Barnes need consistent curb appeal. We handle sidewalks, dumpster pads, and monument signs together, scheduling off-peak hours so restaurants and offices stay accessible. Multi-tenant centers appreciate recurring plans to keep gum and oil from building back up.'
    ]
  },
  {
    slug: 'satellite-beach',
    name: 'Satellite Beach',
    uniqueIntro:
      'Barrier island breezes, sea oats, and military traffic define Satellite Beach. Salt film settles on windows fast, and dunes mean sand drifts across driveways and porches. Soft washing protects coastal paint while our surface cleaners keep spray low to avoid nearby turtle-friendly lighting and landscaping. Afternoon storms can blow spray back onto freshly cleaned glass, so we work with the forecast to leave surfaces dry before evening sea breezes. Homes tucked between A1A and South Patrick often need both street-side and dune-side entries cleaned in one visit.',
    landmarks: [
      'Hightower Beach Park',
      'Pelican Beach Park',
      'Patrick Space Force Base gates',
      'South Patrick Drive corridor',
      'Satellite High area',
      'DeSoto Parkway parks',
      'Canova Beach vicinity'
    ],
    primaryServices: [
      'house-washing',
      'walkway-cleaning',
      'driveway-cleaning',
      'porch-cleaning',
      'patio-cleaning',
      'fence-cleaning'
    ],
    drivingNotes: 'We plan Satellite Beach stops between Cocoa Beach and Melbourne routes, timing work around afternoon sea breezes.',
    localProofPlaceholder: 'Add dune-side porch cleaning and soft wash proof from a South Patrick Drive home.',
    neighborhoods: ['Ocean Spray Estates', 'Emerald Seas', 'Waterway Estates', 'Montecito'],
    nearby: ['cocoa-beach', 'melbourne', 'viera', 'palm-bay'],
    detailSections: [
      'Coastal humidity feeds algae on soffits, garage doors, and fences. We use soft-wash mixes that rinse clean without bleaching nearby dunes or plantings. Porch ceilings and fans get brushed so salt crystals do not corrode hardware.',
      'Sand drifts onto driveways and walkways. Before washing, we clear loose grit, then run surface cleaners with splash guards to keep water off dune crossovers and mulch. Stairs and landings near beach accesses receive extra passes to cut slip hazards.',
      'Many homes mix stucco and Hardie board with aluminum railings. We meter pressure to avoid oxidation streaks on older paint while still removing salt film. For military families on tight timelines, we bundle house, driveway, and patio cleaning into one efficient visit.'
    ]
  },
  {
    slug: 'melbourne',
    name: 'Melbourne',
    uniqueIntro:
      'From Downtown Melbourne to Eau Gallie and Melbourne Beach, properties see a blend of river moisture and inland pollen. Brick streets, shaded oaks, and river breezes mean mildew creeps up quickly, while coastal sections fight salt spray. We switch between soft wash and pressure washing based on each surface so historic homes and new builds both stay bright. Arts district storefronts need gentle care around murals and signage, while beachside decks require sand cleared before washing. Long driveways in Suntree and Lake Washington hold shade longer, so we pace cleaning to give surfaces time to dry.',
    landmarks: [
      'Historic Downtown Melbourne',
      'Eau Gallie Arts District',
      'Melbourne Causeway',
      'Ballard Park',
      'Wickham Park',
      'Melbourne Beach Pier',
      'Crane Creek'
    ],
    primaryServices: [
      'house-washing',
      'driveway-cleaning',
      'walkway-cleaning',
      'porch-cleaning',
      'patio-cleaning',
      'fence-cleaning',
      'commercial-pressure-washing'
    ],
    drivingNotes: 'We route Melbourne stops after Satellite Beach or Viera, keeping travel from Merritt Island efficient for same-day quotes.',
    localProofPlaceholder: 'Add before/after from a brick-front downtown storefront and a Melbourne Beach deck.',
    neighborhoods: ['Eau Gallie', 'Suntree', 'Harbor City', 'Downtown Melbourne', 'Melbourne Beach'],
    nearby: ['viera', 'satellite-beach', 'palm-bay'],
    detailSections: [
      'Historic storefronts need gentle care. We brush trim and signage, use low pressure on brick and tabby finishes, and rinse toward drains to protect pedestrians. For riverfront homes, we manage salt film on railings and sliders while keeping detergents away from seawalls.',
      'Suntree and Lake Washington areas have long driveways shaded by oaks. Surface cleaners even out algae removal, and we pre-treat rust from well water. Fence and patio cleanings help keep HOA standards intact without stripping stain or paint.',
      'Melbourne Beach decks, porches, and walkways face constant wind and sand. We clear grit first, then wash with plant-safe detergents to keep dunes protected. Pairing porch cleaning with walkway and driveway work keeps rentals and primary homes guest-ready.'
    ]
  },
  {
    slug: 'titusville',
    name: 'Titusville',
    uniqueIntro:
      'Titusville looks across the river at launch pads, so soot, ash, and salt mix on siding and porch ceilings. Older block homes and newer builds in Mims need different approaches - soft wash for paint and trim, pressure washing for concrete pads and long driveways. We schedule around launch windows and afternoon storms to give surfaces time to dry. Long riverfront porches collect bug debris and pollen, so we brush before washing to keep streaks away. Downtown storefronts near Space View Park need gum removal and low-noise cleaning during event days.',
    landmarks: [
      'Canaveral National Seashore access',
      'A. Max Brewer Bridge',
      'Space View Park',
      'Indian River Lagoon',
      'Downtown Titusville',
      'Great Outdoors RV Resort nearby',
      'Fox Lake Park'
    ],
    primaryServices: [
      'house-washing',
      'driveway-cleaning',
      'walkway-cleaning',
      'fence-cleaning',
      'porch-cleaning',
      'patio-cleaning',
      'commercial-pressure-washing'
    ],
    drivingNotes: 'We head north from Merritt Island early to avoid bridge backups, grouping Titusville visits with Mims and Port St. John.',
    localProofPlaceholder: 'Add launch-day soot cleanup example from a Titusville riverfront porch.',
    neighborhoods: ['Indian River City', 'La Cita', 'Mims', 'Harrison Street corridor'],
    nearby: ['merritt-island', 'cocoa', 'rockledge'],
    detailSections: [
      'Launch residue and road dust settle on river-facing walls. Soft washing with controlled dwell time breaks down soot without forcing water into block seams or attic vents. We brush window frames and railings so they dry clear instead of streaked.',
      'Long driveways off SR-46 and Carpenter Road often show tire marks and clay. Surface cleaners handle the length evenly, and we direct rinse water toward swales. Fence cleaning keeps white vinyl bright despite sprinkler rust and road film.',
      'Downtown shops and restaurants rely on clean sidewalks before events at Space View Park. We offer early-morning cleanings with gum removal and oil pretreatments, plus cones so foot traffic stays safe before doors open.'
    ]
  },
  {
    slug: 'viera',
    name: 'Viera',
    uniqueIntro:
      'Planned communities in Viera have strict HOA standards and mix stucco, stone, and painted trim. Irrigation rust and reclaimed water stains are common, and shaded walkways collect mildew. We tailor soft washing to protect decorative accents while keeping driveways, pavers, and fences uniform across cul-de-sacs. Many homes back to lakes or golf fairways, so we manage runoff while still brightening curbing and entries. Clubhouse areas often need grouped cleanings to keep playgrounds, monuments, and pool decks on the same schedule.',
    landmarks: [
      'The Avenue Viera',
      'USSSA Space Coast Complex',
      'Duran Golf Club',
      'Viera Wetlands',
      'Addison Village',
      'Pineda Causeway access',
      'Brevard Zoo nearby'
    ],
    primaryServices: [
      'house-washing',
      'driveway-cleaning',
      'walkway-cleaning',
      'patio-cleaning',
      'porch-cleaning',
      'fence-cleaning'
    ],
    drivingNotes: 'We combine Viera stops with Rockledge and Suntree so HOA routes stay on schedule without extra drive time from Merritt Island.',
    localProofPlaceholder: 'Add Addison Village driveway and soffit cleaning example for HOA compliance.',
    neighborhoods: ['Addison Village', 'Suntree', 'Trasona', 'Arrivas Village', 'Capron Ridge'],
    nearby: ['rockledge', 'melbourne', 'palm-bay'],
    detailSections: [
      'HOA notices often target curb lines and driveway stains. We pretreat irrigation rust, use surface cleaners to avoid striping on pavers, and rinse gutters and soffits so paint stays bright without oxidation streaks.',
      'Many Viera homes have fenced backyards and screened lanais. Fence cleaning with material-matched detergents keeps vinyl bright, and patio washing makes outdoor kitchens and seating areas ready for guests. Soft washing siding protects decorative stone bands and trim.',
      'Clubhouse and park walkways see constant foot traffic. We schedule off-peak hours, set cones, and keep splash low around playgrounds and entry monuments so residents can keep using the spaces while areas dry.'
    ]
  },
  {
    slug: 'palm-bay',
    name: 'Palm Bay',
    uniqueIntro:
      'Palm Bay properties range from canal homes to large lots off Babcock and Malabar. Iron-rich well water leaves orange streaks, and sandy soil splashes onto stucco during storms. We mix rust removal with pressure washing for driveways and walkways, then soft wash siding and porches so paint and trim stay intact. Many homes have long setbacks from the road, so we plan hose runs and water access before starting. Pool decks and patios tucked behind the house get plant-safe detergents so landscaping stays healthy in the heat.',
    landmarks: [
      'Turkey Creek Sanctuary',
      'Palm Bay Regional Park',
      'Malabar Road corridor',
      'Goode Park boat ramps',
      'Port Malabar',
      'Castaway Point Park',
      'St. Johns Heritage Parkway'
    ],
    primaryServices: [
      'driveway-cleaning',
      'walkway-cleaning',
      'house-washing',
      'porch-cleaning',
      'patio-cleaning',
      'fence-cleaning',
      'commercial-pressure-washing'
    ],
    drivingNotes: 'We plan Palm Bay with Melbourne and Grant routes, leaving Merritt Island early to cover larger lots and long driveways in one visit.',
    localProofPlaceholder: 'Add rust removal and driveway cleaning example from a Malabar Road home.',
    neighborhoods: ['Port Malabar', 'Turkey Creek area', 'Lockmar', 'Malabar Heights'],
    nearby: ['melbourne', 'viera', 'satellite-beach'],
    detailSections: [
      'Irrigation and well water leave orange streaks on walls, curbing, and fences. We apply targeted rust removers before soft washing, then rinse carefully so landscaping stays protected. Long driveways and sidewalk sections are cleaned in passes to keep pressure even across expansion joints.',
      'Canal and creek homes battle humidity and bugs along screened porches. We brush tracks and frames, rinse screens without stretching them, and keep detergents mild near water. Porches and patios often get paired with fence cleaning so backyards feel reset.',
      'Commercial pads along Malabar Road need slip-free sidewalks. We remove gum, oil spots, and food spills, using signage to keep customers moving safely while surfaces dry. Retailers often bundle dumpster pad degreasing with front walkway cleaning for consistent results.'
    ]
  }
];

export function getLocationBySlug(slug: string) {
  const key = slug?.toLowerCase() ?? '';
  return locations.find((location) => location.slug === key) ?? null;
}

export function getLocationUrl(location: Location) {
  return `/locations/${location.slug}`;
}
