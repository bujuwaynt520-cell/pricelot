import type { AffiliateProgram, MonetizationPlacement, SponsoredContent } from "@/app/types";

export const defaultAffiliatePrograms: AffiliateProgram[] = [
  {
    id: "broker-standard",
    name: "Top-Rated Forex Broker",
    description: "A trusted broker with transparent spreads, fast execution, and advanced trading tools.",
    affiliateUrl: "https://example.com/affiliate/broker",
    highlights: "Low commissions, educational tools, and 24/7 support for serious traders.",
  },
];

export const placements: MonetizationPlacement[] = [
  "top-banner",
  "sidebar",
  "in-content",
  "footer",
];

export function buildSponsoredContentMetadata(sponsored: SponsoredContent) {
  return {
    title: sponsored.title,
    description: sponsored.description,
    sponsor: sponsored.sponsorName,
    sponsoredContent: true,
    affiliateDisclosure: sponsored.affiliateDisclosure,
  };
}

export function getAffiliateProgramById(id: string): AffiliateProgram | undefined {
  return defaultAffiliatePrograms.find((program) => program.id === id);
}

export function getMonetizationPlacements() {
  return placements;
}
