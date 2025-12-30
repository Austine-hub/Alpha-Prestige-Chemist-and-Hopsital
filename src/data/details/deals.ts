//src/data/details/popular.ts


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
// DATA SOURCE - RAW DEALS
// ============================================================================

const RAW_DEALS: readonly DealModel[] = Object.freeze([
  {
    id: "deal-001",
    slug: createSlug("Depura Vitamin D3 60k Sugar Free Oral Solution"),
    name: "Depura Vitamin D3 60k Sugar Free Oral Solution",
    image: "/assets/deals/1.png",
    mrp: 167.7,
    price: 84.01,
    discount: 22,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description:
      "High-potency Vitamin D3 supplement for bone, muscle, and immune health. Sugar-free formula suitable for diabetics.",
    specs: {
      Strength: "60,000 IU",
      Form: "Oral Solution",
      SugarFree: "Yes",
      Volume: "1ml",
      Manufacturer: "Depura Healthcare",
    },
  },
  {
    id: "deal-002",
    slug: createSlug("Softovac SF Constipation Powder"),
    name: "Softovac SF Constipation Powder",
    image: "/assets/deals/2.png",
    mrp: 492,
    price: 329.64,
    discount: 33,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-01",
    description:
      "Gentle fiber-based laxative for regular bowel movements. Sugar-free formulation suitable for diabetic patients.",
    specs: {
      Type: "Fiber Laxative",
      SugarFree: "Yes",
      SuitableFor: "Diabetics",
      Form: "Powder",
      Weight: "100g",
    },
  },
  {
    id: "deal-003",
    slug: createSlug("Diataal-D Multivitamin with Vitamin D & ALA"),
    name: "Diataal-D Multivitamin with Vitamin D & ALA",
    image: "/assets/deals/3.png",
    mrp: 328.18,
    price: 200.44,
    discount: 47,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-02",
    description:
      "Specialized multivitamin supplement with Vitamin D and Alpha Lipoic Acid to support metabolic and nerve health.",
    specs: {
      Vitamins: "Multivitamin + Vitamin D",
      KeyIngredient: "Alpha Lipoic Acid (ALA)",
      Form: "Tablets",
      SuitableFor: "Adults",
      PackSize: "Strip",
    },
  },

  {
    id: "deal-004",
    slug: createSlug("Lactacyd Feminine Wash PH 5.2 100ml"),
    name: "Lactacyd Feminine Wash PH 5.2 100ml",
    image: "/assets/deals/4.png",
    mrp: 329.0,
    price: 276.36,
    discount: 16,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-02",
    description:
      "Clinically tested feminine hygiene wash that maintains optimal pH balance and daily intimate care.",
    specs: {
      PH: "5.2",
      Form: "Liquid Wash",
      Volume: "100ml",
      SuitableFor: "Women",
      Usage: "Daily Intimate Care",
    },
  },
  {
    id: "deal-005",
    slug: createSlug("Celevida Diabetes Care Nutrition Drink"),
    name: "Celevida Diabetes Care Nutrition Drink",
    image: "/assets/deals/5.png",
    mrp: 787.0,
    price: 787.0,
    discount: 0,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-03",
    description:
      "Clinically formulated nutrition drink designed to help manage blood glucose levels in diabetic patients.",
    specs: {
      SuitableFor: "Diabetics",
      Form: "Nutrition Powder",
      Flavor: "Unflavored",
      Usage: "Daily Nutritional Support",
      Manufacturer: "Dr. Reddy’s",
    },
  },
  {
    id: "deal-006",
    slug: createSlug("Vantej Long Lasting Protection Mint Flavour"),
    name: "Vantej Long Lasting Protection Mint Flavour",
    image: "/assets/deals/6.png",
    mrp: 200.0,
    price: 200.0,
    discount: 0,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-03",
    description:
      "Long-lasting protection product with refreshing mint flavour for daily oral freshness and hygiene.",
    specs: {
      Flavor: "Mint",
      Protection: "Long Lasting",
      Form: "Oral Care",
      Usage: "Daily",
      SuitableFor: "Adults",
    },
  },
  {
    id: "deal-007",
    slug: createSlug("Enterogermina Probiotic Suspension"),
    name: "Enterogermina Probiotic Suspension",
    image: "/assets/deals/7.png",
    mrp: 748.2,
    price: 559.65,
    discount: 25,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-04",
    description:
      "Probiotic suspension containing Bacillus clausii to restore intestinal flora and improve gut health.",
    specs: {
      Probiotic: "Bacillus clausii",
      Form: "Oral Suspension",
      Usage: "Digestive Health",
      SuitableFor: "All Ages",
      PackSize: "Mini Bottles",
    },
  },
  {
    id: "deal-008",
    slug: createSlug("Shelcal 500 Calcium with Vitamin D3 Tablets"),
    name: "Shelcal 500 Calcium with Vitamin D3 Tablets",
    image: "/assets/deals/8.jpg",
    mrp: 3.2,
    price: 2.1,
    discount: 34,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-04",
    description:
      "Calcium and Vitamin D3 supplement supporting bone strength and joint health.",
    specs: {
      Calcium: "500mg",
      VitaminD3: "Included",
      Form: "Tablets",
      Usage: "Bone Health",
      SuitableFor: "Adults",
    },
  },
  {
    id: "deal-009",
    slug: createSlug("Isabgol Fibre Husk for Digestive Wellness"),
    name: "Isabgol Fibre Husk for Digestive Wellness",
    image: "/assets/deals/9.png",
    mrp: 5.8,
    price: 3.99,
    discount: 31,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-05",
    description:
      "Natural fiber supplement that promotes digestion and relieves constipation.",
    specs: {
      Type: "Dietary Fiber",
      Source: "Psyllium Husk",
      Form: "Powder",
      Usage: "Digestive Wellness",
      SuitableFor: "Adults",
    },
  },
  {
    id: "deal-010",
    slug: createSlug("Revital H Multivitamin for Men 10 Tablets"),
    name: "Revital H Multivitamin for Men (10 Tablets)",
    image: "/assets/deals/10.jpg",
    mrp: 4.2,
    price: 2.7,
    discount: 36,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-05",
    description:
      "Daily multivitamin supplement formulated specifically for men’s energy, stamina, and immunity.",
    specs: {
      TargetGroup: "Men",
      Vitamins: "Multivitamin",
      Form: "Capsules",
      Count: "10 Tablets",
      Usage: "Daily Supplement",
    },
  },
  {
    id: "deal-011",
    slug: createSlug("Himalaya Intimate Wash for Women 100ml"),
    name: "Himalaya Intimate Wash for Women 100ml",
    image: "/assets/deals/11.jpg",
    mrp: 3.9,
    price: 3.2,
    discount: 18,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-06",
    description:
      "Herbal intimate wash that helps maintain hygiene and pH balance for women.",
    specs: {
      Brand: "Himalaya",
      Form: "Liquid Wash",
      Volume: "100ml",
      Herbal: "Yes",
      SuitableFor: "Women",
    },
  },
  {
    id: "deal-012",
    slug: createSlug("Ensure Diabetes Care Vanilla Nutrition Powder"),
    name: "Ensure Diabetes Care Vanilla Nutrition Powder",
    image: "/assets/deals/12.jpg",
    mrp: 9.9,
    price: 9.9,
    discount: 0,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-06",
    description:
      "Balanced nutritional powder with controlled carbohydrates to support diabetes management.",
    specs: {
      Flavor: "Vanilla",
      SuitableFor: "Diabetics",
      Form: "Nutrition Powder",
      Usage: "Meal Supplement",
      Brand: "Ensure",
    },
  },
  {
    id: "deal-013",
    slug: createSlug("Sensodyne Rapid Relief Toothpaste 75g"),
    name: "Sensodyne Rapid Relief Toothpaste 75g",
    image: "/assets/deals/13.jpg",
    mrp: 2.7,
    price: 2.7,
    discount: 0,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-07",
    description:
      "Clinically proven toothpaste for fast relief from tooth sensitivity.",
    specs: {
      Usage: "Sensitive Teeth",
      Form: "Toothpaste",
      Weight: "75g",
      Brand: "Sensodyne",
      Relief: "Rapid",
    },
  },
  {
    id: "deal-014",
    slug: createSlug("ORS Hydration Electrolyte Sachets Pack of 10"),
    name: "ORS Hydration Electrolyte Sachets (Pack of 10)",
    image: "/assets/deals/14.jpg",
    mrp: 6.1,
    price: 4.6,
    discount: 25,
    category: "Deals",
    isActive: true,
    createdAt: "2025-01-07",
    description:
      "WHO-recommended oral rehydration salts for fast and effective hydration.",
    specs: {
      Type: "Electrolyte",
      PackSize: "10 Sachets",
      Usage: "Dehydration",
      Standard: "WHO Formula",
      SuitableFor: "All Ages",
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