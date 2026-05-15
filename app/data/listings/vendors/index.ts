// app/data/listings/vendors/index.ts
import type { VendorListing } from "../types";

import { PLANNERS } from "./planner.seed";
import { CATERERS } from "./caterer.seed";
import { FLORISTS } from "./florist.seed";
import { PHOTOGRAPHERS } from "./photographer.seed";
import { VIDEOGRAPHERS } from "./videographer.seed";
import { RENTALS } from "./rentals.seed";
import { MUSIC } from "./music.seed";
import { BEAUTY } from "./beauty.seed";
import { OFFICIANTS } from "./officiant.seed";
import { TRANSPORT } from "./transport.seed";
import { STATIONERY } from "./stationery.seed";

export const SEED_VENDORS: VendorListing[] = [
    ...PLANNERS,
    ...CATERERS,
    ...FLORISTS,
    ...PHOTOGRAPHERS,
    ...VIDEOGRAPHERS,
    ...RENTALS,
    ...MUSIC,
    ...BEAUTY,
    ...OFFICIANTS,
    ...TRANSPORT,
    ...STATIONERY,
];
