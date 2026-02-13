// app/composables/useListings.ts
import type { VenueListing, VendorListing } from "~/data/listings.seed";
import { SEED_VENUES, SEED_VENDORS } from "~/data/listings.seed";

export function useListings() {
  function getVenues(): VenueListing[] {
    return SEED_VENUES;
  }

  function getVenueBySlug(slug: string): VenueListing | undefined {
    return SEED_VENUES.find((v) => v.slug === slug);
  }

  function getVendorsByCategoryKey(
    categoryKey: VendorListing["categoryKey"],
  ): VendorListing[] {
    return SEED_VENDORS.filter((v) => v.categoryKey === categoryKey);
  }

  function getVendorByCategoryKeyAndSlug(
    categoryKey: VendorListing["categoryKey"],
    slug: string,
  ): VendorListing | undefined {
    return SEED_VENDORS.find(
      (v) => v.categoryKey === categoryKey && v.slug === slug,
    );
  }

  return {
    getVenues,
    getVenueBySlug,
    getVendorsByCategoryKey,
    getVendorByCategoryKeyAndSlug,
  };
}
