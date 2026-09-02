import type { Listing, ListingImage, ListingImageType } from "./types";

const GALLERY_TYPES: ListingImageType[] = [
  "hero",
  "exterior",
  "ceremony",
  "reception",
  "detail",
  "detail",
];

/**
 * Gives every listing six predictable image paths. Drop matching JPEG files into
 * the listing's public/images folder and they will appear without another data edit.
 */
export function withGalleryImages<T extends Listing>(listing: T): T {
  const section = listing.type === "venue"
    ? `venues/${listing.slug}`
    : `vendors/${listing.categoryKey}/${listing.slug}`;

  const images: ListingImage[] = GALLERY_TYPES.map((type, index) => {
    const slot = index + 1;
    const existing = listing.images?.[index];

    const listingFolder = `/images/${section}/`;
    const placeholderPath = `${listingFolder}${index === 0 ? "hero" : `gallery-${slot}`}.jpg`;
    const existingPath = existing?.src?.startsWith(listingFolder)
      ? existing.src
      : placeholderPath;

    return {
      ...existing,
      type,
      src: existingPath,
      alt: existing?.alt ?? {
        en: `${listing.name.en} gallery image ${slot}`,
        es: `Imagen ${slot} de la galería de ${listing.name.es}`,
      },
    };
  });

  return { ...listing, images };
}
