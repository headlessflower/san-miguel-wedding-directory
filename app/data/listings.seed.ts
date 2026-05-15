// app/data/listings.seed.ts
export * from "./listings/types";

import { SEED_VENUES } from "./listings/venues.seed";
import { SEED_VENDORS } from "./listings/vendors";

export { SEED_VENUES, SEED_VENDORS };

if (import.meta.dev) {
  const ids = new Set<string>();

  for (const x of [...SEED_VENUES, ...SEED_VENDORS]) {
    if (!x.id) console.warn("[seed] missing id:", x);
    else if (ids.has(x.id)) console.warn("[seed] duplicate id:", x.id);
    else ids.add(x.id);
  }
}
