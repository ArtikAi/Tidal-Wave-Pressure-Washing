export const siteUrl = 'https://tidalwavepressurecleaning.com';
export const defaultOgImage = `${siteUrl}/og-image.jpg`;
export const defaultDescription =
  'Tidal Wave Pressure Cleaning provides driveway cleaning, walkway cleaning, patio and porch washing, fence cleaning, house washing, and commercial exterior cleaning across Orlando, Merritt Island, Cocoa Beach, and the Space Coast.';

export function canonicalFor(path: string) {
  if (path.startsWith('http')) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}

export function buildTitle(title?: string) {
  if (!title) {
    return 'Tidal Wave Pressure Cleaning | Pressure & Soft Washing in Orlando & the Space Coast';
  }
  return `${title} | Tidal Wave Pressure Cleaning`;
}

export function buildDescription(description?: string) {
  return description ?? defaultDescription;
}
