import type { AdCampaign } from "~/types/monetization";

export const SEED_ADS: AdCampaign[] = [
    {
        id: "ad_home_hero_1",
        placement: "home_hero",
        active: true,
        locale: "all",
        weight: 10,
        creative: {
            type: "text",
            title: "Advertise here",
            body: "Reach couples planning weddings in San Miguel de Allende.",
            ctaLabel: "View packages",
            ctaUrl: "/advertise",
            sponsorName: "Your Directory",
        },
    },
];
