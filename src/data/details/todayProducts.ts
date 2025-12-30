// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type DealSlug = string & { readonly __brand: "DealSlug" };

export interface DealModel {
  readonly id: string;
  readonly slug: DealSlug;
  readonly name: string;
  readonly image: string;
  readonly mrp: number;
  readonly price: number;
  readonly discount: number;
  readonly category: "Deals";
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly description: string;
  readonly specs: Record<string, string>;
}

export interface DealViewModel extends DealModel {
  readonly img: string;
  readonly mrpKSH: number;
  readonly priceKSH: number;
  readonly mrpFormattedKSH: string;
  readonly priceFormattedKSH: string;
  readonly savingsKSH: number;
}

// ============================================================================
// CONFIGURATION & UTILITIES
// ============================================================================

const PRICE_CONFIG = {
  SCALE_FACTOR: 120,
  MIN_PRICE: 150,
  MAX_PRICE: 2500,
} as const;

const KES_FORMATTER = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const scaleToKSH = (abstractValue: number): number => {
  if (!Number.isFinite(abstractValue) || abstractValue < 0) return PRICE_CONFIG.MIN_PRICE;
  const scaled = Math.round(abstractValue * PRICE_CONFIG.SCALE_FACTOR);
  return clamp(scaled, PRICE_CONFIG.MIN_PRICE, PRICE_CONFIG.MAX_PRICE);
};

const formatKSH = (kshAmount: number): string => 
  KES_FORMATTER.format(Math.max(0, kshAmount));

const createSlug = (text: string): DealSlug => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") as DealSlug;
};

// ============================================================================
// DATA VALIDATION (Type Guard)
// ============================================================================

/**
 * Validates object shape and acts as a TypeScript Type Guard
 */
const isDealModel = (deal: any): deal is DealModel => {
  return (
    deal &&
    typeof deal.id === "string" &&
    typeof deal.name === "string" &&
    typeof deal.image === "string" &&
    typeof deal.specs === "object" &&
    deal.specs !== null &&
    Number.isFinite(deal.mrp) &&
    Number.isFinite(deal.price)
  );
};

// ============================================================================
// DATA SOURCE
// ============================================================================

const RAW_DEALS: readonly DealModel[] = [
  {
    id: "deal-001",
    slug: createSlug("The Ginger People Ginger Rescue Soft Lozenges"),
    name: "The Ginger People Ginger Rescue Soft Lozenges",
    image: "/products/pic1.jpg",
    mrp: 7.88,
    price: 7.88,
    discount: 0,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Soothing soft lozenges made with drug-free ginger to help with nausea.",
    specs: { Form: "Lozenges", Flavor: "Ginger", Type: "Drug-Free" },
  },
  {
    id: "deal-002",
    slug: createSlug("First Honey Manuka Ointment Medical Grade Liquid Wound Support"),
    name: "First Honey Manuka Ointment Medical Grade Liquid Wound Support",
    image: "/products/pic2.jpg",
    mrp: 14.9,
    price: 8.17,
    discount: 45,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Medical grade Manuka honey ointment for natural wound care.",
    specs: { Grade: "Medical Grade", Source: "Manuka Honey", Application: "Wound Care" },
  },
  {
    id: "deal-003",
    slug: createSlug("Upset Stomach & Nausea Support Dietary Supplement Ginger Berry"),
    name: "Upset Stomach & Nausea Support Dietary Supplement Ginger Berry",
    image: "/products/pic3.jpg",
    mrp: 18.47,
    price: 10.16,
    discount: 45,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Dietary supplement specifically formulated with ginger and berry.",
    specs: { Flavor: "Ginger Berry", Benefit: "Nausea Support", Form: "Supplement" },
  },
  {
    id: "deal-004",
    slug: createSlug("Equate No Drip Nasal Spray, Pump Mist 12 Hour"),
    name: "Equate No Drip Nasal Spray, Pump Mist 12 Hour",
    image: "/products/pic4.jpg",
    mrp: 10.5,
    price: 5.9,
    discount: 44,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Fast-acting nasal spray providing up to 12 hours of congestion relief.",
    specs: { Duration: "12 Hour", Format: "Pump Mist", Feature: "No Drip" },
  },
  {
    id: "deal-005",
    slug: createSlug("MaryRuth's Kids Probiotic Gummies Strawberry Flavor"),
    name: "MaryRuth's Kids Probiotic Gummies Strawberry Flavor",
    image: "/products/pic5.jpg",
    mrp: 41.9,
    price: 33.8,
    discount: 19,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Delicious strawberry-flavored probiotic gummies for kids.",
    specs: { Flavor: "Strawberry", Target: "Kids", Type: "Probiotic" },
  },
  {
    id: "deal-006",
    slug: createSlug("Metamucil Fiber Supplement No Sugar Added Fiber Gummies"),
    name: "Metamucil Fiber Supplement No Sugar Added Fiber Gummies",
    image: "/products/pic6.jpg",
    mrp: 28.22,
    price: 16.55,
    discount: 41,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Easy-to-take fiber gummies with no sugar added.",
    specs: { SugarFree: "Yes", Form: "Gummies", Type: "Fiber Supplement" },
  },
];

// ============================================================================
// TRANSFORMATION LOGIC
// ============================================================================

const toViewModel = (deal: DealModel): DealViewModel => {
  const priceKSH = scaleToKSH(deal.price);
  const mrpKSH = scaleToKSH(deal.mrp);

  return {
    ...deal,
    img: deal.image,
    mrpKSH,
    priceKSH,
    mrpFormattedKSH: formatKSH(mrpKSH),
    priceFormattedKSH: formatKSH(priceKSH),
    savingsKSH: Math.max(0, mrpKSH - priceKSH),
  };
};

/**
 * Internal helper to get filtered, valid, active deals
 */
const getValidDeals = () => RAW_DEALS.filter((d): d is DealModel => d.isActive && isDealModel(d));

// ============================================================================
// PUBLIC API
// ============================================================================

export const getAllDealsInKSH = (): readonly DealViewModel[] => {
  return getValidDeals().map(toViewModel);
};

export const getDealInKSH = (slug: string): DealViewModel | undefined => {
  const deal = getValidDeals().find((d) => d.slug === slug.toLowerCase().trim());
  return deal ? toViewModel(deal) : undefined;
};

export const getDealSlugs = (): ReadonlyArray<{ slug: string }> => {
  return getValidDeals().map((d) => ({ slug: d.slug }));
};

export const getDealById = (id: string): DealViewModel | undefined => {
  const deal = getValidDeals().find((d) => d.id === id);
  return deal ? toViewModel(deal) : undefined;
};

export const getActiveDealsCount = (): number => getValidDeals().length;

export { RAW_DEALS as deals };