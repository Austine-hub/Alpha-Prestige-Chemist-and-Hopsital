// src/data/details/today.ts

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
  readonly category: "Deals" | "today";
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
// CONFIGURATION CONSTANTS
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

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const scaleToKSH = (abstractValue: number): number => {
  if (!Number.isFinite(abstractValue) || abstractValue < 0) {
    return PRICE_CONFIG.MIN_PRICE;
  }
  const scaled = Math.round(abstractValue * PRICE_CONFIG.SCALE_FACTOR);
  return clamp(scaled, PRICE_CONFIG.MIN_PRICE, PRICE_CONFIG.MAX_PRICE);
};

const formatKSH = (kshAmount: number): string => {
  if (!Number.isFinite(kshAmount)) {
    return KES_FORMATTER.format(PRICE_CONFIG.MIN_PRICE);
  }
  return KES_FORMATTER.format(Math.max(0, kshAmount));
};

const createSlug = (text: string): DealSlug => {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid input for slug creation");
  }
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") as DealSlug;
};

// ============================================================================
// DATA VALIDATION
// ============================================================================

const validateDeal = (deal: DealModel): boolean => {
  return Boolean(
    deal.id &&
    deal.slug &&
    deal.name &&
    deal.image &&
    Number.isFinite(deal.mrp) &&
    Number.isFinite(deal.price) &&
    deal.mrp >= 0 &&
    deal.price >= 0 &&
    deal.price <= deal.mrp &&
    deal.discount >= 0 &&
    deal.discount <= 100 &&
    deal.specs &&
    
    typeof deal.specs === "object"
  );
};

// ============================================================================
// DATA SOURCE - RAW DEALS TODAY
// ============================================================================

const RAW_DEALS: readonly DealModel[] = Object.freeze([

  {
    id: "today-001",
    slug: createSlug("Physicians Choice Women's Probiotic 60 Billion CFU Capsules"),
    name: "Physicians Choice Women's Probiotic 60 Billion CFU Capsules",
    image: "/deals/ProbioticCapusules.jpg",
    mrp: 43.46,
    price: 34.77,
    discount: 20,
    category: "today",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Highly rated women's probiotic with 60 Billion CFU. Rating: 4/5 based on 340 reviews.",
    specs: {
      Strength: "60 Billion CFU",
      Form: "Capsules",
      Quantity: "30 Count",
      Manufacturer: "Physicians Choice",
    },
  },
  {
    id: "today-002",
    slug: createSlug("The Ginger People Ginger Rescue Soft Lozenges"),
    name: "The Ginger People Ginger Rescue Soft Lozenges",
    image: "/deals/GingerPeople.jpg",
    mrp: 9.85,
    price: 7.88,
    discount: 20,
    category: "today",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Soothing ginger lozenges for nausea and digestion. Rating: 4.5/5 based on 367 reviews.",
    specs: {
      Flavor: "Ginger",
      Form: "Lozenges",
      Weight: "3oz",
      Manufacturer: "The Ginger People",
    },
  },
  {
    id: "today-003",
    slug: createSlug("Supermedic Basic Medical Nitrile Exam Gloves"),
    name: "Supermedic Basic Medical Nitrile Exam Gloves",
    image: "/deals/NitrileExamGloves.jpg",
    mrp: 18.06,
    price: 14.45,
    discount: 20,
    category: "today",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Medical grade powder-free nitrile gloves for protection. Rating: 4/5 based on 280 reviews.",
    specs: {
      Material: "Nitrile",
      Grade: "Medical Exam",
      PowderFree: "Yes",
      Quantity: "100 Count",
      Manufacturer: "Supermedic",
    },
  },


] as const satisfies readonly DealModel[]);

// ============================================================================
// VIEW MODEL TRANSFORMATION
// ============================================================================

const toViewModel = (deal: DealModel): DealViewModel => {
  const priceKSH = scaleToKSH(deal.price);
  const mrpKSH = scaleToKSH(deal.mrp);
  const savingsKSH = Math.max(0, mrpKSH - priceKSH);

  return {
    ...deal,
    img: deal.image,
    mrpKSH,
    priceKSH,
    mrpFormattedKSH: formatKSH(mrpKSH),
    priceFormattedKSH: formatKSH(priceKSH),
    savingsKSH,
  };
};

// ============================================================================
// PUBLIC API - DATA ACCESS LAYER
// ============================================================================

/**
 * Get all active deals with KSH pricing
 * @returns Array of deal view models ready for presentation
 */
export const getAllDealsInKSH = (): readonly DealViewModel[] => {
  return RAW_DEALS
    .filter((d) => d.isActive && validateDeal(d))
    .map(toViewModel);
};

/**
 * Get a single deal by slug with KSH pricing
 * @param slug - URL-safe deal identifier
 * @returns Deal view model or undefined if not found
 */
export const getDealInKSH = (slug: string): DealViewModel | undefined => {
  if (!slug || typeof slug !== "string") {
    return undefined;
  }

  const normalizedSlug = slug.toLowerCase().trim();
  const deal = RAW_DEALS.find(
    (d) => d.slug === normalizedSlug && d.isActive && validateDeal(d)
  );

  return deal ? toViewModel(deal) : undefined;
};

/**
 * Get all active deal slugs for static generation
 * @returns Array of objects with slug property
 */
export const getDealSlugs = (): ReadonlyArray<{ slug: string }> => {
  return RAW_DEALS
    .filter((d) => d.isActive && validateDeal(d))
    .map((d) => ({ slug: d.slug }));
};

/**
 * Get deal by ID (alternative lookup method)
 * @param id - Unique deal identifier
 * @returns Deal view model or undefined if not found
 */
export const getDealById = (id: string): DealViewModel | undefined => {
  if (!id || typeof id !== "string") {
    return undefined;
  }

  const deal = RAW_DEALS.find((d) => d.id === id && d.isActive && validateDeal(d));
  return deal ? toViewModel(deal) : undefined;
};

/**
 * Get total count of active deals
 * @returns Number of active deals
 */
export const getActiveDealsCount = (): number => {
  return RAW_DEALS.filter((d) => d.isActive && validateDeal(d)).length;
};

// ============================================================================
// EXPORTS
// ============================================================================

export { RAW_DEALS as deals };