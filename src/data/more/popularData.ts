// src/data/more/newData.ts

/* ============================================================================
 * DOMAIN MODEL LAYER
 * Core business entities and domain logic
 * ========================================================================== */

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  currency: string;
  stock: number;
  image: string;
  gallery: string[];
  category: string;
  badge?: string;
  shortDescription: string;
  description: string;
  features: string[];
  rating: number;
  reviewsCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice?: number;
  discount: number;
  category: string;
  badge?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface DealViewModel {
  id: string;
  name: string;
  slug: string;
  img: string;
  priceKSH: number;
  mrpKSH: number;
  priceFormattedKSH: string;
  mrpFormattedKSH: string;
  discount: number;
}

/* ============================================================================
 * DATA REPOSITORY
 * Single source of truth for product data
 * ========================================================================== */

export const productsRepository: Product[] = [
  {
    id: 1,
    name: "Cosy Toilet Paper Embossed 10 Rolls (200 Sheets)",
    slug: "cosy-toilet-paper-embossed-10-rolls-200-sheets",
    price: 300,
    oldPrice: 545,
    currency: "KES",
    stock: 120,
    image: "/assets/products2/1.jpg",
    gallery: ["/assets/products2/1.jpg", "/assets/products2/1-alt.jpg"],
    category: "household",
    badge: "Best Seller",
    shortDescription: "Premium embossed 10-roll pack for everyday family hygiene.",
    description: "Premium embossed toilet paper offering softness, strength, and hygiene for everyday household use.",
    features: [
      "200 sheets per roll",
      "Soft embossed texture",
      "Strong & absorbent",
      "Suitable for all households"
    ],
    rating: 4.7,
    reviewsCount: 412,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Uncover Aloe Invisible Sunscreen 80ml",
    slug: "uncover-aloe-invisible-sunscreen-80ml",
    price: 2880,
    oldPrice: 3200,
    currency: "KES",
    stock: 45,
    image: "/assets/products2/2.jpg",
    gallery: ["/assets/products2/2.jpg"],
    category: "personal-care",
    badge: "Dermatologist Approved",
    shortDescription: "Broad-spectrum aloe sunscreen with zero white cast.",
    description: "Lightweight, invisible aloe-based sunscreen offering broad-spectrum protection without white cast.",
    features: [
      "SPF protection",
      "Invisible finish",
      "Aloe-infused",
      "Suitable for sensitive skin"
    ],
    rating: 4.6,
    reviewsCount: 198,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Acnes Treatment Set",
    slug: "acnes-treatment-set",
    price: 1456,
    oldPrice: 1819,
    currency: "KES",
    stock: 30,
    image: "/assets/products2/3.jpg",
    gallery: ["/assets/products2/3.jpg"],
    category: "personal-care",
    badge: "Value Pack",
    shortDescription: "Complete 3-step routine to cleanse and treat acne.",
    description: "Complete acne treatment kit designed to cleanse, treat, and prevent breakouts.",
    features: [
      "Complete acne care routine",
      "Targets pimples & blackheads",
      "Dermatologically tested"
    ],
    rating: 4.4,
    reviewsCount: 143,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Acnes C10 15ml",
    slug: "acnes-c10-15ml",
    price: 2338,
    oldPrice: 2700,
    currency: "KES",
    stock: 25,
    image: "/assets/products2/4.jpg",
    gallery: ["/assets/products2/4.jpg"],
    category: "personal-care",
    badge: undefined,
    shortDescription: "Potent Vitamin C serum for clearing stubborn acne marks.",
    description: "Vitamin C serum formulated to reduce acne marks and brighten skin tone.",
    features: [
      "10% Vitamin C",
      "Brightens skin",
      "Reduces acne marks"
    ],
    rating: 4.5,
    reviewsCount: 96,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Melano CC Rich Moisturizing Cream",
    slug: "melano-cc-rich-moisturizing-cream",
    price: 1751,
    oldPrice: 2901,
    currency: "KES",
    stock: 40,
    image: "/assets/products2/5.jpg",
    gallery: ["/assets/products2/5.jpg"],
    category: "personal-care",
    badge: "Top Rated",
    shortDescription: "Hydrating Vitamin C cream for radiant skin texture.",
    description: "Rich moisturizing cream with Vitamin C to improve skin radiance and texture.",
    features: [
      "Vitamin C enriched",
      "Deep hydration",
      "Improves skin tone"
    ],
    rating: 4.8,
    reviewsCount: 322,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 6,
    name: "Melano CC Rich Moisturising Cream 100G",
    slug: "melano-cc-rich-moisturising-cream-100g",
    price: 1775,
    oldPrice: 2536,
    currency: "KES",
    stock: 35,
    image: "/assets/products2/6.jpg",
    gallery: ["/assets/products2/6.jpg"],
    category: "personal-care",
    badge: undefined,
    shortDescription: "Value-sized brightening cream for long-lasting clarity.",
    description: "Large-size Vitamin C moisturizing cream for long-lasting hydration and skin clarity.",
    features: [
      "Large 100g size",
      "Brightening effect",
      "Daily use formula"
    ],
    rating: 4.7,
    reviewsCount: 211,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 7,
    name: "Melano CC Skin Spot Essence 20ml",
    slug: "melano-cc-skin-spot-essence-20ml",
    price: 1302,
    oldPrice: 1860,
    currency: "KES",
    stock: 28,
    image: "/assets/products2/7.jpg",
    gallery: ["/assets/products2/7.jpg"],
    category: "personal-care",
    badge: "Editor's Pick",
    shortDescription: "Targeted essence for fading dark spots and hyperpigmentation.",
    description: "Concentrated Vitamin C essence targeting dark spots and uneven skin tone.",
    features: [
      "Spot correction",
      "High potency Vitamin C",
      "Fast-absorbing"
    ],
    rating: 4.6,
    reviewsCount: 167,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 8,
    name: "Nice & Lovely Baby Range Value Pack",
    slug: "nice-lovely-baby-range-value-pack",
    price: 1820,
    oldPrice: 2600,
    currency: "KES",
    stock: 50,
    image: "/assets/products2/8.jpg",
    gallery: ["/assets/products2/8.jpg"],
    category: "baby-care",
    badge: "Family Favorite",
    shortDescription: "Essential baby care collection for delicate skin.",
    description: "Gentle baby care value pack formulated to protect and nourish delicate skin.",
    features: [
      "Gentle on baby skin",
      "Dermatologically tested",
      "Value pack"
    ],
    rating: 4.9,
    reviewsCount: 402,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 9,
    name: "Garnier Bye Acne & Dark Spots Kit",
    slug: "garnier-bye-acne-dark-spots-kit",
    price: 3042,
    oldPrice: 4345,
    currency: "KES",
    stock: 22,
    image: "/assets/products2/9.jpg",
    gallery: ["/assets/products2/9.jpg"],
    category: "personal-care",
    badge: undefined,
    shortDescription: "Powerful duo kit to eliminate acne and fade scars.",
    description: "Complete Garnier kit formulated to fight acne and fade dark spots effectively.",
    features: [
      "Acne-fighting ingredients",
      "Dark spot correction",
      "Complete routine"
    ],
    rating: 4.5,
    reviewsCount: 188,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 10,
    name: "Garnier Even & Matte Vitamin C Booster Serum 30ml",
    slug: "garnier-even-matte-vitamin-c-booster-serum-30ml",
    price: 1400,
    oldPrice: 1750,
    currency: "KES",
    stock: 60,
    image: "/assets/products2/10.jpg",
    gallery: ["/assets/products2/10.jpg"],
    category: "personal-care",
    badge: "New Arrival",
    shortDescription: "Non-greasy booster serum for a bright, matte complexion.",
    description: "Vitamin C booster serum designed to brighten skin and reduce excess oil.",
    features: [
      "Vitamin C booster",
      "Matte finish",
      "Brightening effect"
    ],
    rating: 4.6,
    reviewsCount: 256,
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

/* ============================================================================
 * BUSINESS LOGIC LAYER (Services)
 * Pure business logic, format-agnostic calculations
 * ========================================================================== */

export class ProductService {
  /**
   * Calculate discount percentage between two prices
   */
  static calculateDiscount(price: number, oldPrice?: number): number {
    if (!oldPrice || oldPrice <= price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  /**
   * Calculate total savings for a quantity
   */
  static calculateTotalSavings(price: number, oldPrice: number, quantity: number): number {
    if (oldPrice <= price) return 0;
    return (oldPrice - price) * quantity;
  }

  /**
   * Check if product is in stock
   */
  static isInStock(product: Product): boolean {
    return product.stock > 0 && product.isActive;
  }

  /**
   * Get stock status message
   */
  static getStockStatus(product: Product): string {
    if (!product.isActive) return "Unavailable";
    if (product.stock === 0) return "Out of Stock";
    if (product.stock < 10) return `Only ${product.stock} left`;
    return "In Stock";
  }

  /**
   * Validate quantity against stock
   */
  static validateQuantity(product: Product, quantity: number): boolean {
    return quantity > 0 && quantity <= product.stock;
  }
}

/* ============================================================================
 * PRESENTATION LAYER (Formatters)
 * Format data for UI display
 * ========================================================================== */

export class PriceFormatter {
  /**
   * Format price as KES currency
   */
  static formatKES(amount: number): string {
    return `KES ${amount.toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  /**
   * Format price with custom currency
   */
  static format(amount: number, currency: string = "KES"): string {
    return amount.toLocaleString("en-KE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  /**
   * Format savings amount
   */
  static formatSavings(price: number, oldPrice: number, quantity: number): string {
    const savings = ProductService.calculateTotalSavings(price, oldPrice, quantity);
    return this.formatKES(savings);
  }
}

export class SlugGenerator {
  /**
   * Generate URL-friendly slug from product name
   */
  static fromName(name: string, id?: number): string {
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    return id ? `${baseSlug}-${id}` : baseSlug;
  }

  /**
   * Extract product ID from slug
   */
  static extractId(slug: string): number {
    const parts = slug.split("-");
    const id = parseInt(parts[parts.length - 1] || "0");
    return isNaN(id) ? 0 : id;
  }
}

/* ============================================================================
 * REPOSITORY PATTERN (Data Access Layer)
 * Centralized data access with query methods
 * ========================================================================== */

export class ProductRepository {
  private static data = productsRepository;

  /**
   * Get all active products
   */
  static getAll(): Product[] {
    return this.data.filter(p => p.isActive);
  }

  /**
   * Get product by ID
   */
  static getById(id: number): Product | undefined {
    return this.data.find(p => p.id === id && p.isActive);
  }

  /**
   * Get product by slug
   */
  static getBySlug(slug: string): Product | undefined {
    const id = SlugGenerator.extractId(slug);
    return this.getById(id);
  }

  /**
   * Get products by category
   */
  static getByCategory(category: string): Product[] {
    return this.data.filter(p => 
      p.category === category && p.isActive
    );
  }

  /**
   * Search products by name
   */
  static search(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.data.filter(p => 
      p.isActive && p.name.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get related products (same category, excluding current)
   */
  static getRelated(productId: number, limit: number = 4): Product[] {
    const product = this.getById(productId);
    if (!product) return [];

    return this.data
      .filter(p => 
        p.id !== productId && 
        p.category === product.category && 
        p.isActive
      )
      .slice(0, limit);
  }

  /**
   * Get products with discounts
   */
  static getDiscounted(): Product[] {
    return this.data.filter(p => 
      p.isActive && 
      p.oldPrice && 
      p.oldPrice > p.price
    );
  }

  /**
   * Get products by price range
   */
  static getByPriceRange(min: number, max: number): Product[] {
    return this.data.filter(p => 
      p.isActive && 
      p.price >= min && 
      p.price <= max
    );
  }
}

/* ============================================================================
 * VIEW MODEL MAPPERS
 * Transform domain models to view-specific structures
 * ========================================================================== */

export class ProductViewModelMapper {
  /**
   * Map Product to DealViewModel (for deals display)
   */
  static toDealViewModel(product: Product): DealViewModel {
    return {
      id: String(product.id),
      name: product.name,
      slug: product.slug || SlugGenerator.fromName(product.name, product.id),
      img: product.image,
      priceKSH: product.price,
      mrpKSH: product.oldPrice || product.price,
      priceFormattedKSH: PriceFormatter.formatKES(product.price),
      mrpFormattedKSH: PriceFormatter.formatKES(product.oldPrice || product.price),
      discount: ProductService.calculateDiscount(product.price, product.oldPrice)
    };
  }

  /**
   * Map Product to CartItem
   */
  static toCartItem(product: Product, quantity: number = 1): CartItem {
    return {
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      originalPrice: product.oldPrice,
      discount: ProductService.calculateDiscount(product.price, product.oldPrice),
      category: product.category,
      badge: product.badge
    };
  }

  /**
   * Map Product to WishlistItem
   */
  static toWishlistItem(product: Product): WishlistItem {
    return {
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    };
  }
}

/* ============================================================================
 * PUBLIC API (Facade Pattern)
 * Simplified interface for external consumers
 * ========================================================================== */

// Legacy compatibility exports
export const products = ProductRepository.getAll();
export const productsData = productsRepository;

// Core query functions
export const getAllProducts = () => ProductRepository.getAll();
export const getProductById = (id: number) => ProductRepository.getById(id);
export const getProductBySlug = (slug: string) => ProductRepository.getBySlug(slug);
export const getRelatedProducts = (id: number, limit?: number) => ProductRepository.getRelated(id, limit);

// View model functions
export const getDealInKSH = (slug: string): DealViewModel | null => {
  const product = ProductRepository.getBySlug(slug);
  return product ? ProductViewModelMapper.toDealViewModel(product) : null;
};

export const getAllDealsInKSH = (): DealViewModel[] => {
  return ProductRepository.getAll().map(ProductViewModelMapper.toDealViewModel);
};

// Cart/Wishlist transformers
export const toCartItem = (product: Product, quantity: number) => 
  ProductViewModelMapper.toCartItem(product, quantity);

export const toWishlistItem = (product: Product) => 
  ProductViewModelMapper.toWishlistItem(product);

// Utility functions
export const calculateSavings = (price: number, oldPrice: number, qty: number): string =>
  PriceFormatter.formatSavings(price, oldPrice, qty);

export const slugify = (text: string): string => 
  SlugGenerator.fromName(text);

/* ============================================================================
 * ADVANCED QUERY BUILDERS (Optional)
 * Chainable query interface for complex filtering
 * ========================================================================== */

export class ProductQueryBuilder {
  private products: Product[] = ProductRepository.getAll();

  category(cat: string): this {
    this.products = this.products.filter(p => p.category === cat);
    return this;
  }

  priceRange(min: number, max: number): this {
    this.products = this.products.filter(p => p.price >= min && p.price <= max);
    return this;
  }

  withDiscount(): this {
    this.products = this.products.filter(p => p.oldPrice && p.oldPrice > p.price);
    return this;
  }

  inStock(): this {
    this.products = this.products.filter(p => ProductService.isInStock(p));
    return this;
  }

  sortByPrice(order: 'asc' | 'desc' = 'asc'): this {
    this.products = [...this.products].sort((a, b) => 
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
    return this;
  }

  sortByRating(order: 'asc' | 'desc' = 'desc'): this {
    this.products = [...this.products].sort((a, b) => 
      order === 'desc' ? b.rating - a.rating : a.rating - b.rating
    );
    return this;
  }

  limit(count: number): this {
    this.products = this.products.slice(0, count);
    return this;
  }

  execute(): Product[] {
    return this.products;
  }

  executeAsViewModels(): DealViewModel[] {
    return this.products.map(ProductViewModelMapper.toDealViewModel);
  }
}

export const createQuery = () => new ProductQueryBuilder();