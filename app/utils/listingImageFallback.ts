const FALLBACK_IMAGE = "/images/gallery-placeholder.svg";

type CardImage = {
  src: string;
  alt?: Partial<Record<"en" | "es", string>>;
  type?: string;
};

export function getListingCardImage(listing: { images?: CardImage[] } | null | undefined) {
  const images = listing?.images ?? [];
  return images.find((image) => image?.src && image.type === "hero")
    ?? images.find((image) => Boolean(image?.src))
    ?? null;
}

export function useListingImageFallback(event: Event) {
  const image = event.currentTarget as HTMLImageElement | null;
  if (!image || image.dataset.fallbackApplied === "true") return;

  image.dataset.fallbackApplied = "true";
  image.src = FALLBACK_IMAGE;
}
