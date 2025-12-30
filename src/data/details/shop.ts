// src/data/details/shop.ts

/* =============================================================================
   TYPE DEFINITIONS
============================================================================= */

/**
 * Represents a product in the shop catalog
 */
export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly image: string;
  readonly category: string;
  readonly group: string;
  readonly description: string;
  readonly fullDescription?: string;
  readonly howToUse?: string;
  readonly ingredients?: readonly string[];
  readonly delivery: string;
  readonly pickup: string;
  readonly paymentOptions: readonly string[];
  readonly stock: number;
  readonly availability: string;
  readonly price: number;
  readonly originalPrice: number;
  readonly discountedPrice: number;
  readonly discount: number;
}

/**
 * Product category types for type safety
 */
export type ProductCategory = 
  | "Toothpaste & Oral Care"
  | "Skin and Beauty"
  | "Pain Medications"
  | "Respiratory Drugs"
  | "Discreet / Private Purchase Shelf"
  | "General Wellness & Support"
  | "Skin Treatment"
  | "General Wellness";

/**
 * Product group types for filtering
 */
export type ProductGroup = 
  | "Personal & Lifestyle"
  | "Private Care"
  | "Wellness"
  | "Dermatology"
  | "Supplements"
  | "Hydration";

/* =============================================================================
   PRODUCT CATALOG DATA
============================================================================= */

const PRODUCTS_CATALOG: readonly Product[] = [
  {
    id: "1",
    slug: "oral-care-pack",
    title: "Oral Care Pack",
    image: "/assets/shop2/Personal & Lifestyle Section/2025-1oothpaste & Oral Care.png",
    category: "Toothpaste & Oral Care",
    group: "Personal & Lifestyle",
    description: "A complete oral hygiene kit that promotes healthy gums and fresh breath.",
    fullDescription: "Includes toothpaste, toothbrush, and mouthwash for daily oral care. Recommended by dentists for complete protection.",
    howToUse: "Brush twice daily and rinse with mouthwash after meals.",
    ingredients: ["Fluoride", "Menthol", "Sodium Lauryl Sulfate"],
    delivery: "Same-day delivery available in Nairobi.",
    pickup: "Available at all pharmacy branches.",
    paymentOptions: ["M-Pesa", "Credit/Debit Card", "Cash on Delivery"],
    stock: 12,
    availability: "In Stock",
    price: 1395,
    originalPrice: 1395,
    discountedPrice: 1395,
    discount: 0,
  },
  {
    id: "2",
    slug: "skincare-essentials",
    title: "Skincare Essentials",
    image: "/assets/shop2/Personal & Lifestyle Section/Skincare.png",
    category: "Skin and Beauty",
    group: "Personal & Lifestyle",
    description: "Nourish your skin with this hydrating skincare pack.",
    fullDescription: "Includes a cleanser, moisturizer, and sunscreen for radiant skin. Dermatologist approved.",
    howToUse: "Apply morning and night after cleansing.",
    ingredients: ["Vitamin E", "Aloe Vera", "Niacinamide"],
    delivery: "Available for next-day delivery.",
    pickup: "Collect at selected outlets.",
    paymentOptions: ["M-Pesa", "Card", "Cash on Delivery"],
    stock: 10,
    availability: "In Stock",
    price: 2747,
    originalPrice: 2747,
    discountedPrice: 2747,
    discount: 0,
  },
  {
    id: "3",
    slug: "pain-relievers-first-aid",
    title: "Pain Relievers & First Aid",
    image: "/assets/shop2/Personal & Lifestyle Section/Pain Relievers & First Aid.png",
    category: "Pain Medications",
    group: "Personal & Lifestyle",
    description: "Essential first aid and pain relief products for home and travel.",
    fullDescription: "Includes paracetamol, antiseptic cream, and bandages for quick relief and wound care.",
    ingredients: ["Paracetamol", "Benzalkonium Chloride"],
    delivery: "Delivered within 24 hours.",
    pickup: "In-store pickup available.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 18,
    availability: "In Stock",
    price: 1714,
    originalPrice: 1714,
    discountedPrice: 1714,
    discount: 0,
  },
  {
    id: "4",
    slug: "cold-flu-remedies",
    title: "Cold & Flu Remedies",
    image: "/assets/shop2/Personal & Lifestyle Section/Cold & Flu Remedies.png",
    category: "Respiratory Drugs",
    group: "Personal & Lifestyle",
    description: "Fast-acting cold and flu relief for quick recovery.",
    fullDescription: "Helps relieve congestion, sore throat, and headaches. Suitable for adults and children above 12 years.",
    howToUse: "Take one dose every 6–8 hours as needed.",
    ingredients: ["Paracetamol", "Phenylephrine", "Vitamin C"],
    delivery: "Express delivery available.",
    pickup: "Available in-store.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 22,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "5",
    slug: "pregnancy-test-kits",
    title: "Pregnancy Test Kits",
    image: "/assets/shop2/Personal/Pegnancy test kits.png",
    category: "Discreet / Private Purchase Shelf",
    group: "Private Care",
    description: "Accurate and easy-to-use pregnancy test kits.",
    fullDescription: "Over 99% accurate, results in under 5 minutes. Pack includes two test strips.",
    howToUse: "Dip test in urine sample for 10 seconds and wait for 3 minutes.",
    delivery: "Private and discreet packaging.",
    pickup: "Discreet pickup available.",
    paymentOptions: ["M-Pesa"],
    stock: 20,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "6",
    slug: "vaginal-pessaries",
    title: "Vaginal Pessaries",
    image: "/assets/shop2/Personal/Pessary.png",
    category: "Discreet / Private Purchase Shelf",
    group: "Private Care",
    description: "Effective relief for vaginal infections.",
    howToUse: "Insert one pessary daily at bedtime for 3–7 days.",
    ingredients: ["Clotrimazole"],
    delivery: "Discreet delivery option available.",
    pickup: "Private collection counter.",
    paymentOptions: ["M-Pesa"],
    stock: 15,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "7",
    slug: "emergency-contraceptive-pills",
    title: "Emergency Contraceptive Pills",
    image: "/assets/shop2/Personal/Emergency pills.png",
    category: "Discreet / Private Purchase Shelf",
    group: "Private Care",
    description: "Safe and effective emergency contraception within 72 hours.",
    fullDescription: "Each pack contains one tablet for emergency contraception. Use only as directed by a pharmacist.",
    howToUse: "Take one tablet within 72 hours of unprotected intercourse.",
    delivery: "Private delivery guaranteed.",
    pickup: "Available in private shelf section.",
    paymentOptions: ["M-Pesa"],
    stock: 25,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "8",
    slug: "contraceptives",
    title: "Contraceptives",
    image: "/assets/shop2/General/Contraceptives.png",
    category: "Discreet / Private Purchase Shelf",
    group: "Private Care",
    description: "Trusted contraceptive options for responsible planning.",
    delivery: "Confidential delivery available.",
    pickup: "Private counter collection.",
    paymentOptions: ["M-Pesa"],
    stock: 30,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "9",
    slug: "sleep-stress-relief",
    title: "Sleep/Stress Relief",
    image: "/assets/shop2/General/Calm.png",
    category: "General Wellness & Support",
    group: "Wellness",
    description: "Calming supplements to promote relaxation and better sleep.",
    ingredients: ["Melatonin", "Magnesium", "L-Theanine"],
    delivery: "Home delivery in 24 hours.",
    pickup: "Available in-store.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 17,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "10",
    slug: "antifungal-creams",
    title: "Antifungal Creams",
    image: "/assets/shop2/Personal/Antifungal.png",
    category: "Skin Treatment",
    group: "Dermatology",
    description: "Topical antifungal creams for quick relief from fungal infections.",
    ingredients: ["Clotrimazole", "Ketoconazole"],
    delivery: "Next-day delivery available.",
    pickup: "All branches.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 19,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "11",
    slug: "multivitamins",
    title: "Multivitamins",
    image: "/assets/shop2/General/Multivitamins.png",
    category: "General Wellness",
    group: "Supplements",
    description: "Boost overall health and immunity with daily multivitamins.",
    ingredients: ["Vitamin A", "B Complex", "Zinc"],
    delivery: "Fast delivery available.",
    pickup: "Available nationwide.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 30,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "12",
    slug: "iron-folic-acid-supplements",
    title: "Iron & Folic Acid Supplements",
    image: "/assets/shop2/General/Iron & Folic Acid Supplements.png",
    category: "General Wellness",
    group: "Supplements",
    description: "Essential supplement for anemia and pregnancy support.",
    ingredients: ["Iron", "Folic Acid"],
    delivery: "Same-day delivery available.",
    pickup: "All outlets.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 24,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "13",
    slug: "vitamin-c-zinc",
    title: "Vitamin C & Zinc",
    image: "/assets/shop2/General/Vitamin C & Zinc.png",
    category: "General Wellness",
    group: "Supplements",
    description: "Boost immunity and recovery with Vitamin C and Zinc tablets.",
    ingredients: ["Vitamin C", "Zinc"],
    delivery: "Available for same-day delivery.",
    pickup: "In all branches.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 16,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "14",
    slug: "rehydration-solutions",
    title: "Rehydration Solutions",
    image: "/assets/shop2/General/Rehydration Solutions.png",
    category: "General Wellness",
    group: "Hydration",
    description: "Oral rehydration solutions to restore electrolytes and prevent dehydration.",
    ingredients: ["Glucose", "Sodium Chloride", "Potassium Chloride"],
    delivery: "Fast delivery in urban areas.",
    pickup: "Available in all branches.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 20,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
] as const;

/* =============================================================================
   UTILITY CONSTANTS
============================================================================= */

/**
 * Locale configuration for price formatting
 */
const LOCALE = "en-KE" as const;
const CURRENCY = "KES" as const;

/* =============================================================================
   DATA ACCESS FUNCTIONS
============================================================================= */

/**
 * Returns all products in the catalog
 * @returns Readonly array of all products
 */
export function getAllProducts(): readonly Product[] {
  return PRODUCTS_CATALOG;
}

/**
 * Finds a product by its unique ID
 * @param id - The product ID to search for
 * @returns The product if found, undefined otherwise
 */
export function getProductById(id: string): Product | undefined {
  if (!id?.trim()) return undefined;
  return PRODUCTS_CATALOG.find((product) => product.id === id);
}

/**
 * Finds a product by its URL slug
 * @param slug - The product slug to search for
 * @returns The product if found, undefined otherwise
 */
export function getProductBySlug(slug: string): Product | undefined {
  if (!slug?.trim()) return undefined;
  return PRODUCTS_CATALOG.find((product) => product.slug === slug);
}

/**
 * Gets products from the same category, excluding the specified product
 * @param productId - The ID of the current product to exclude
 * @param limit - Maximum number of similar products to return (default: 4)
 * @returns Array of similar products
 */
export function getSimilarProducts(
  productId: string,
  limit: number = 4
): Product[] {
  if (!productId?.trim() || limit < 0) return [];
  
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];

  return PRODUCTS_CATALOG
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== productId
    )
    .slice(0, Math.max(0, Math.floor(limit)));
}

/**
 * Gets products by category
 * @param category - The category to filter by
 * @returns Array of products in the specified category
 */
export function getProductsByCategory(category: string): Product[] {
  if (!category?.trim()) return [];
  return PRODUCTS_CATALOG.filter((product) => product.category === category);
}

/**
 * Gets products by group
 * @param group - The group to filter by
 * @returns Array of products in the specified group
 */
export function getProductsByGroup(group: string): Product[] {
  if (!group?.trim()) return [];
  return PRODUCTS_CATALOG.filter((product) => product.group === group);
}

/**
 * Gets all unique categories from the catalog
 * @returns Array of unique category names
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(PRODUCTS_CATALOG.map((product) => product.category)));
}

/**
 * Gets all unique groups from the catalog
 * @returns Array of unique group names
 */
export function getAllGroups(): string[] {
  return Array.from(new Set(PRODUCTS_CATALOG.map((product) => product.group)));
}

/**
 * Checks if a product is in stock
 * @param productId - The product ID to check
 * @returns True if in stock, false otherwise
 */
export function isProductInStock(productId: string): boolean {
  const product = getProductById(productId);
  return product ? product.stock > 0 : false;
}

/* =============================================================================
   FORMATTING FUNCTIONS
============================================================================= */

/**
 * Formats a price value as Kenyan Shillings
 * @param price - The price to format
 * @returns Formatted price string (e.g., "KES 1,420.00")
 */
export function formatPrice(price: number): string {
  if (!Number.isFinite(price)) return "KES 0.00";
  
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.max(0, price));
}

/**
 * Calculates the savings amount between original and discounted price
 * @param originalPrice - The original price
 * @param discountedPrice - The discounted price
 * @returns The savings amount (always non-negative)
 */
export function calculateSavings(
  originalPrice: number,
  discountedPrice: number
): number {
  if (!Number.isFinite(originalPrice) || !Number.isFinite(discountedPrice)) {
    return 0;
  }
  return Math.max(0, originalPrice - discountedPrice);
}

/**
 * Calculates the discount percentage
 * @param originalPrice - The original price
 * @param discountedPrice - The discounted price
 * @returns The discount percentage (0-100)
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number
): number {
  if (!Number.isFinite(originalPrice) || originalPrice <= 0) return 0;
  if (!Number.isFinite(discountedPrice)) return 0;
  
  const savings = calculateSavings(originalPrice, discountedPrice);
  return Math.round((savings / originalPrice) * 100);
}

/* =============================================================================
   VALIDATION FUNCTIONS
============================================================================= */

/**
 * Validates if a quantity is valid for a product
 * @param productId - The product ID
 * @param quantity - The quantity to validate
 * @returns True if quantity is valid, false otherwise
 */
export function isValidQuantity(productId: string, quantity: number): boolean {
  const product = getProductById(productId);
  if (!product) return false;
  
  return (
    Number.isInteger(quantity) &&
    quantity > 0 &&
    quantity <= product.stock
  );
}

/**
 * Clamps a quantity value to valid range for a product
 * @param productId - The product ID
 * @param quantity - The quantity to clamp
 * @param min - Minimum allowed quantity (default: 1)
 * @returns Clamped quantity value
 */
export function clampQuantity(
  productId: string,
  quantity: number,
  min: number = 1
): number {
  const product = getProductById(productId);
  if (!product) return min;
  
  const clampedMin = Math.max(1, Math.floor(min));
  const clampedMax = Math.max(clampedMin, product.stock);
  
  return Math.max(clampedMin, Math.min(clampedMax, Math.floor(quantity)));
}