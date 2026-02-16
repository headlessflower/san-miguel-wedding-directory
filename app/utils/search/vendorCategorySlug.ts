import type { Locale } from "~/types/i18n";
import { VENDOR_CATEGORIES } from "~/data/taxonomies";
import type { VendorListing } from "~/data/listings.seed";

export function getVendorCategorySlug(
    categoryKey: VendorListing["categoryKey"],
    locale: Locale,
): string {
    const found = VENDOR_CATEGORIES.find((c) => c.key === categoryKey);
    return found ? found.slug[locale] : "";
}
