//src/data/details/popular.ts


// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type DealSlug = string & { readonly __brand: "DealSlug" };



export type DealCategory =
  | "health"
  | "household"
  | "baby-care"
  | "personal-care";

export interface DealModel {
  readonly id: string;
  readonly slug: DealSlug;
  readonly name: string;
  readonly image: string;
  readonly mrp: number;
  readonly price: number;
  readonly discount: number;
  readonly category: DealCategory;
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
    deal.category &&
    deal.specs &&
    typeof deal.specs === "object"
  );
};


// ============================================================================
// DATA SOURCE - RAW DEALS
// ============================================================================

const RAW_DEALS: readonly DealModel[] = Object.freeze([

  {
    id: "deal-001",
    slug: createSlug("Mylan HIV Self Test Kit (1s)"),
    name: "Mylan HIV Self Test Kit (1s)",
    image: "/assets/products/product1.jpg",
    mrp: 50,
    price: 50,
    discount: 0,
    category: "health",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Reliable and confidential HIV self-testing kit for home use. Meets international quality and safety standards.",
    specs: {
      Certification: "WHO Prequalified",
      Method: "Oral Swab",
      ResultTime: "20 Minutes",
      PackSize: "1 Test",
      Accuracy: "High"
    },
  },
  {
    id: "deal-002",
    slug: createSlug("Cosy Toilet Paper 8 Roll – Unwrap"),
    name: "Cosy Toilet Paper 8 Roll – Unwrap",
    image: "/assets/products/product2.jpg",
    mrp: 440,
    price: 200,
    discount: 54,
    category: "household",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Soft, absorbent toilet paper designed for everyday family use. Superior strength with 10 packs of 8 rolls.",
    specs: {
      Quantity: "8 Rolls",
      Sheets: "200 per roll",
      PackType: "10 x 200 Sheets",
      Texture: "Soft & Durable",
      Absorbency: "High"
    },
  },
  {
    id: "deal-003",
    slug: createSlug("Fay Everyday Baby Wet Wipes"),
    name: "Fay Everyday Baby Wet Wipes (72s + 12s Promo)",
    image: "/assets/products/product3.jpg",
    mrp: 390,
    price: 390,
    discount: 0,
    category: "baby-care",
    isActive: true,
    createdAt: "2025-01-02",
    description: "Gentle baby wipes suitable for sensitive skin. Alcohol-free and enriched with moisturizers.",
    specs: {
      Count: "72 + 12 Promo",
      Formula: "Alcohol-free",
      Testing: "Dermatologically tested",
      SkinType: "Sensitive/Newborn",
      Type: "Wet Wipes"
    },
  },
  {
    id: "deal-004",
    slug: createSlug("Huggies Dry Comfort Jumbo Size 5"),
    name: "Huggies Dry Comfort Jumbo Size 5 (12–22kg)",
    image: "/assets/products/product4.jpg",
    mrp: 1695,
    price: 1695,
    discount: 0,
    category: "baby-care",
    isActive: true,
    createdAt: "2025-01-02",
    description: "High-absorbency diapers for active toddlers providing up to 12 hours of dryness.",
    specs: {
      Size: "5 (Jumbo)",
      WeightRange: "12–22kg",
      Count: "52s",
      Technology: "Leak-lock core",
      Protection: "12 Hours"
    },
  },
  {
    id: "deal-005",
    slug: createSlug("Fay Facial Decor Art Series Tissues"),
    name: "Fay Facial Decor Art Series Tissues (150s)",
    image: "/assets/products/product5.jpg",
    mrp: 205,
    price: 205,
    discount: 0,
    category: "personal-care",
    isActive: true,
    createdAt: "2025-01-03",
    description: "Premium facial tissues with decorative packaging. Combines softness and strength.",
    specs: {
      Count: "150 Sheets",
      Texture: "Ultra-soft",
      Style: "Art Series Box",
      Use: "Daily Facial Care",
      Strength: "High"
    },
  },
  {
    id: "deal-006",
    slug: createSlug("Majeed Ultra Soft Value Pack Tissues"),
    name: "Majeed Ultra Soft Value Pack Tissues (18s)",
    image: "/assets/products/product6.jpg",
    mrp: 227,
    price: 227,
    discount: 0,
    category: "household",
    isActive: true,
    createdAt: "2025-01-03",
    description: "Economical ultra-soft tissue value pack designed for everyday comfort and durability.",
    specs: {
      Count: "18 Rolls",
      Texture: "Ultra Soft",
      Value: "Economical Pack",
      Usage: "Multipurpose",
      Brand: "Majeed"
    },
  },
  {
    id: "deal-007",
    slug: createSlug("Maths Facts Jumbo Size 5 X-Large"),
    name: "Maths Facts Jumbo Size 5 X-Large (15–20kg)",
    image: "/assets/products/product7.jpg",
    mrp: 1799,
    price: 1799,
    discount: 0,
    category: "baby-care",
    isActive: true,
    createdAt: "2025-01-04",
    description: "Extra-large diapers designed for comfort and protection with superior absorbency core.",
    specs: {
      Size: "5 (X-Large)",
      WeightRange: "15–20kg",
      Count: "52s",
      Core: "High Absorbency",
      SkinSafety: "Gentle on skin"
    },
  },
  {
    id: "deal-008",
    slug: createSlug("Dove Baby Lotion Rich Moisture"),
    name: "Dove Baby Lotion Rich Moisture (200ml)",
    image: "/assets/products/product8.jpg",
    mrp: 785,
    price: 785,
    discount: 0,
    category: "baby-care",
    isActive: true,
    createdAt: "2025-01-04",
    description: "Moisturizing baby lotion for soft, healthy skin. Hypoallergenic and dermatologist tested.",
    specs: {
      Volume: "200ml",
      Properties: "Hypoallergenic",
      Testing: "Dermatologist Tested",
      Benefit: "Long-lasting moisture",
      Brand: "Dove Baby"
    },
  },
  {
    id: "deal-009",
    slug: createSlug("Ecrinal Baby Junior Cream"),
    name: "Ecrinal Baby Junior Cream (450g)",
    image: "/assets/products/product9.jpg",
    mrp: 1340,
    price: 1340,
    discount: 0,
    category: "baby-care",
    isActive: true,
    createdAt: "2025-01-05",
    description: "Nourishing cream for baby and junior skin care enriched with essential nutrients.",
    specs: {
      Weight: "450g",
      Formulation: "Gentle",
      Usage: "Daily use",
      Nutrients: "Essential enriched",
      Type: "Junior Cream"
    },
  },
  {
    id: "deal-010",
    slug: createSlug("Murasakit Granules"),
    name: "Murasakit Granules (250g)",
    image: "/assets/products/product10.jpg",
    mrp: 2750,
    price: 2750,
    discount: 0,
    category: "health",
    isActive: true,
    createdAt: "2025-01-05",
    description: "Fast-acting granules for digestive relief formulated for quick and effective results.",
    specs: {
      Weight: "250g",
      Form: "Granules",
      Indication: "Digestive Relief",
      Action: "Fast-acting",
      TrustLevel: "Clinically trusted"
    },
  }
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

  const normalizedSlug = slug.toLowerCase().trim() as DealSlug;

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