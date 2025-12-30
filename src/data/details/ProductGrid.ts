// src/data/details/ProductGrid.ts

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface DealModel {
  readonly id: string;
  readonly slug: string;
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

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
// DATA SOURCE - RAW DEALS
// ============================================================================

const RAW_DEALS: readonly DealModel[] = Object.freeze([
  {
    id: "deal-001",
    slug: createSlug("Cosy Toilet Paper Embossed 10 Rolls (200 Sheets)"),
    name: "Cosy Toilet Paper Embossed 10 Rolls (200 Sheets)",
    image: "/assets/products2/1.jpg",
    mrp: 545,
    price: 300,
    discount: 45,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Premium embossed toilet paper offering softness, strength, and hygiene for everyday household use.",
    specs: {
      Sheets: "200 per roll",
      Texture: "Soft embossed",
      Quantity: "10 Rolls",
      Feature: "Strong & absorbent",
    },
  },
  {
    id: "deal-002",
    slug: createSlug("Uncover Aloe Invisible Sunscreen 80ml"),
    name: "Uncover Aloe Invisible Sunscreen 80ml",
    image: "/assets/products2/2.jpg",
    mrp: 3200,
    price: 2880,
    discount: 10,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Lightweight, invisible aloe-based sunscreen offering broad-spectrum protection without white cast.",
    specs: {
      Volume: "80ml",
      Type: "Invisible Sunscreen",
      Protection: "SPF Broad Spectrum",
      KeyIngredient: "Aloe Vera",
    },
  },
  {
    id: "deal-003",
    slug: createSlug("Acnes Treatment Set"),
    name: "Acnes Treatment Set",
    image: "/assets/products2/3.jpg",
    mrp: 1819,
    price: 1456,
    discount: 20,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Complete acne treatment kit designed to cleanse, treat, and prevent breakouts.",
    specs: {
      SetType: "Complete Care Routine",
      Target: "Pimples & Blackheads",
      Testing: "Dermatologically tested",
    },
  },
  {
    id: "deal-004",
    slug: createSlug("Acnes C10 15ml"),
    name: "Acnes C10 15ml",
    image: "/assets/products2/4.jpg",
    mrp: 2700,
    price: 2338,
    discount: 13,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Vitamin C serum formulated to reduce acne marks and brighten skin tone.",
    specs: {
      Volume: "15ml",
      Strength: "10% Vitamin C",
      Benefit: "Brightens skin",
    },
  },
  {
    id: "deal-005",
    slug: createSlug("Melano CC Rich Moisturizing Cream"),
    name: "Melano CC Rich Moisturizing Cream",
    image: "/assets/products2/5.jpg",
    mrp: 2901,
    price: 1751,
    discount: 40,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Rich moisturizing cream with Vitamin C to improve skin radiance and texture.",
    specs: {
      Type: "Moisturizing Cream",
      KeyIngredient: "Vitamin C",
      Benefit: "Deep hydration",
    },
  },
  {
    id: "deal-006",
    slug: createSlug("Melano CC Rich Moisturising Cream 100G"),
    name: "Melano CC Rich Moisturising Cream 100G",
    image: "/assets/products2/6.jpg",
    mrp: 2536,
    price: 1775,
    discount: 30,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Large-size Vitamin C moisturizing cream for long-lasting hydration and skin clarity.",
    specs: {
      Weight: "100g",
      Effect: "Brightening",
      Usage: "Daily use formula",
    },
  },
  {
    id: "deal-007",
    slug: createSlug("Melano CC Skin Spot Essence 20ml"),
    name: "Melano CC Skin Spot Essence 20ml",
    image: "/assets/products2/7.jpg",
    mrp: 1860,
    price: 1302,
    discount: 30,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Concentrated Vitamin C essence targeting dark spots and uneven skin tone.",
    specs: {
      Volume: "20ml",
      Target: "Spot correction",
      Potency: "High Vitamin C",
    },
  },
  {
    id: "deal-008",
    slug: createSlug("Nice & Lovely Baby Range Value Pack"),
    name: "Nice & Lovely Baby Range Value Pack",
    image: "/assets/products2/8.jpg",
    mrp: 2600,
    price: 1820,
    discount: 30,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Gentle baby care value pack formulated to protect and nourish delicate skin.",
    specs: {
      PackType: "Value Pack",
      Safety: "Dermatologically tested",
      SkinType: "Delicate/Baby skin",
    },
  },
  {
    id: "deal-009",
    slug: createSlug("Garnier Bye Acne & Dark Spots Kit"),
    name: "Garnier Bye Acne & Dark Spots Kit",
    image: "/assets/products2/9.jpg",
    mrp: 4345,
    price: 3042,
    discount: 30,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Complete Garnier kit formulated to fight acne and fade dark spots effectively.",
    specs: {
      Routine: "Complete kit",
      Action: "Acne-fighting",
      Benefit: "Dark spot correction",
    },
  },
  {
    id: "deal-010",
    slug: createSlug("Garnier Even & Matte Vitamin C Booster Serum 30ml"),
    name: "Garnier Even & Matte Vitamin C Booster Serum 30ml",
    image: "/assets/products2/10.jpg",
    mrp: 1750,
    price: 1400,
    discount: 20,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description: "Vitamin C booster serum designed to brighten skin and reduce excess oil.",
    specs: {
      Volume: "30ml",
      Finish: "Matte",
      Type: "Booster Serum",
    },
  },
] as const);

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
 */
export const getAllDealsInKSH = (): readonly DealViewModel[] => {
  return RAW_DEALS
    .filter((d) => d.isActive && validateDeal(d))
    .map(toViewModel);
};

/**
 * Get a single deal by slug with KSH pricing
 */
export const getDealInKSH = (slug: string): DealViewModel | undefined => {
  if (!slug) return undefined;

  const normalizedSlug = slug.toLowerCase().trim();

  const deal = RAW_DEALS.find(
    (d) => d.slug.toLowerCase() === normalizedSlug && d.isActive && validateDeal(d)
  );

  return deal ? toViewModel(deal) : undefined;
};

/**
 * Get all active deal slugs for static generation
 */
export const getDealSlugs = (): ReadonlyArray<{ slug: string }> => {
  return RAW_DEALS
    .filter((d) => d.isActive && validateDeal(d))
    .map((d) => ({ slug: d.slug }));
};

/**
 * Get deal by ID (alternative lookup method)
 */
export const getDealById = (id: string): DealViewModel | undefined => {
  if (!id || typeof id !== "string") return undefined;

  const deal = RAW_DEALS.find(
    (d) => d.id === id && d.isActive && validateDeal(d)
  );
  
  return deal ? toViewModel(deal) : undefined;
};

/**
 * Get total count of active deals
 */
export const getActiveDealsCount = (): number => {
  return RAW_DEALS.filter((d) => d.isActive && validateDeal(d)).length;
};

// Export raw deals for reference
export { RAW_DEALS as deals };