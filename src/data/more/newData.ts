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

const productsRepository: Product[] = [
  {
    id: 1,
    name: "Mylan HIV Self Test Kit",
    slug: "mylan-hiv-self-test-kit",
    price: 50,
    oldPrice: 70,
    currency: "KES",
    stock: 120,
    image: "/assets/products/product1.jpg",
    gallery: ["/assets/products/product1.jpg"],
    category: "health",
    badge: "WHO Approved",
    shortDescription: "Reliable HIV self-testing kit for home use.",
    description: "The Mylan HIV Self Test Kit allows testing for HIV in the privacy of your home. Easy to use with quick results.",
    features: [
      "WHO prequalified",
      "Easy-to-use oral swab",
      "Results in 20 minutes",
      "Confidential and accurate"
    ],
    rating: 4.6,
    reviewsCount: 312,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Cosy Toilet Paper 8 Roll Pack",
    slug: "cosy-toilet-paper-8-roll-pack",
    price: 200,
    oldPrice: 440,
    currency: "KES",
    stock: 45,
    image: "/assets/products/product2.jpg",
    gallery: ["/assets/products/product2.jpg"],
    category: "household",
    badge: "40% OFF",
    shortDescription: "Soft, absorbent toilet paper for everyday use.",
    description: "Cosy Toilet Paper offers superior softness and strength with 8 rolls, each containing 200 sheets.",
    features: [
      "Soft yet durable",
      "High absorbency",
      "Value pack"
    ],
    rating: 4.4,
    reviewsCount: 210,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Fay Everyday Baby Wet Wipes",
    slug: "fay-everyday-baby-wet-wipes",
    price: 390,
    currency: "KES",
    stock: 80,
    image: "/assets/products/product3.jpg",
    gallery: ["/assets/products/product3.jpg"],
    category: "baby-care",
    shortDescription: "Gentle baby wipes suitable for sensitive skin.",
    description: "Fay Everyday Baby Wet Wipes are alcohol-free and enriched with moisturizers to gently cleanse and protect your baby's delicate skin.",
    features: [
      "Alcohol-free",
      "Dermatologically tested",
      "Suitable for newborns"
    ],
    rating: 4.7,
    reviewsCount: 185,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Huggies Dry Comfort Size 5",
    slug: "huggies-dry-comfort-size-5",
    price: 1695,
    currency: "KES",
    stock: 30,
    image: "/assets/products/product4.jpg",
    gallery: ["/assets/products/product4.jpg"],
    category: "baby-care",
    shortDescription: "High-absorbency diapers for active toddlers (12-22kg).",
    description: "Huggies Dry Comfort Size 5 diapers provide up to 12 hours of dryness with leak-lock technology and breathable materials. Perfect for babies weighing 12-22kg.",
    features: [
      "Up to 12 hours dryness",
      "Leak-lock core",
      "Comfort fit waistband"
    ],
    rating: 4.8,
    reviewsCount: 342,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Fay Facial Decor Art Series Tissues",
    slug: "fay-facial-decor-art-series-tissues",
    price: 205,
    currency: "KES",
    stock: 60,
    image: "/assets/products/product5.jpg",
    gallery: ["/assets/products/product5.jpg"],
    category: "personal-care",
    shortDescription: "Premium facial tissues with decorative packaging.",
    description: "Fay Facial Decor tissues combine softness and strength, perfect for daily facial care while adding style to your space. Contains 150 sheets.",
    features: [
      "Ultra-soft texture",
      "Strong and absorbent",
      "Stylish box design"
    ],
    rating: 4.3,
    reviewsCount: 98,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 6,
    name: "Majeed Ultra Soft Value Pack Tissues",
    slug: "majeed-ultra-soft-value-pack-tissues",
    price: 227,
    currency: "KES",
    stock: 75,
    image: "/assets/products/product6.jpg",
    gallery: ["/assets/products/product6.jpg"],
    category: "household",
    shortDescription: "Economical ultra-soft tissue value pack.",
    description: "Majeed Ultra Soft tissues are designed for everyday comfort and durability, offering excellent value for money with 18 packs.",
    features: [
      "Soft touch",
      "Long-lasting value pack",
      "Multipurpose use"
    ],
    rating: 4.2,
    reviewsCount: 76,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 7,
    name: "Maths Facts Jumbo Size 5 X-Large",
    slug: "maths-facts-jumbo-size-5-xl",
    price: 1799,
    currency: "KES",
    stock: 25,
    image: "/assets/products/product7.jpg",
    gallery: ["/assets/products/product7.jpg"],
    category: "baby-care",
    shortDescription: "Extra-large diapers designed for comfort and protection (15-20kg).",
    description: "Maths Facts Jumbo diapers provide superior absorbency and comfort for growing babies, ensuring dryness throughout the day. Contains 52 pieces.",
    features: [
      "Extra-large fit",
      "High absorbency core",
      "Gentle on skin"
    ],
    rating: 4.5,
    reviewsCount: 129,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 8,
    name: "Dove Baby Lotion Rich Moisture",
    slug: "dove-baby-lotion-rich-moisture",
    price: 785,
    currency: "KES",
    stock: 50,
    image: "/assets/products/product8.jpg",
    gallery: ["/assets/products/product8.jpg"],
    category: "baby-care",
    shortDescription: "Moisturizing baby lotion for soft, healthy skin (200ml).",
    description: "Dove Baby Rich Moisture Lotion gently nourishes baby skin, providing long-lasting hydration and protection. Hypoallergenic and dermatologist tested.",
    features: [
      "Hypoallergenic",
      "Dermatologist tested",
      "Long-lasting moisture"
    ],
    rating: 4.9,
    reviewsCount: 410,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 9,
    name: "Ecrinal Baby Junior Cream",
    slug: "ecrinal-baby-junior-cream",
    price: 1340,
    currency: "KES",
    stock: 15,
    image: "/assets/products/product9.jpg",
    gallery: ["/assets/products/product9.jpg"],
    category: "baby-care",
    shortDescription: "Nourishing cream for baby and junior skin care (450g).",
    description: "Ecrinal Baby Junior Cream is enriched with essential nutrients to protect and moisturize sensitive skin. Suitable for daily use on babies and juniors.",
    features: [
      "Deep nourishment",
      "Gentle formulation",
      "Suitable for daily use"
    ],
    rating: 4.6,
    reviewsCount: 67,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 10,
    name: "Murasakit Granules",
    slug: "murasakit-granules",
    price: 2750,
    currency: "KES",
    stock: 10,
    image: "/assets/products/product10.jpg",
    gallery: ["/assets/products/product10.jpg"],
    category: "health",
    shortDescription: "Fast-acting granules for digestive relief (250g).",
    description: "Murasakit Granules are formulated to provide quick and effective relief from digestive discomfort when used as directed. Clinically trusted formula.",
    features: [
      "Fast-acting formula",
      "Clinically trusted",
      "Easy-to-use granules"
    ],
    rating: 4.1,
    reviewsCount: 52,
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