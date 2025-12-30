/* =============================================================================
   MSK Types
   - Single source of truth for MSK domain models
   - No runtime values (types only)
   - Safe for tree-shaking & reuse across ViewModels and UI
============================================================================= */

/* -------------------------------------------------------------------------- */
/* Core Product Model                                                         */
/* -------------------------------------------------------------------------- */

export interface MskProduct {
  /** Stable unique identifier */
  readonly id: string;

  /** Display name */
  readonly name: string;

  /** Globally unique slug (used for routing) */
  readonly slug: string;

  /** Public image path (from /public) */
  readonly image: string;

  /** Pricing (KES) */
  readonly price: number;
  readonly oldPrice?: number;

  /** Product category (derived from data) */
  readonly category: string;

  /** Short card description */
  readonly description: string;

  /** Details page content */
  readonly fullDescription?: string;
  readonly features?: readonly string[];
  readonly howToUse?: string;

  /** Availability */
  readonly inStock: boolean;
}

/* -------------------------------------------------------------------------- */
/* UI & ViewModel Types                                                       */
/* -------------------------------------------------------------------------- */

/** Tabs used in MSK details pages */
export type MskTabKey = "features" | "description" | "usage";

/** Quantity constraints */
export type Quantity = number;

/* -------------------------------------------------------------------------- */
/* ViewModel Return Shapes (optional but recommended)                          */
/* -------------------------------------------------------------------------- */

export interface UseMskProductDetailsReturn {
  product?: MskProduct;
  similar: readonly MskProduct[];

  qty: Quantity;
  tab: MskTabKey;
  adding: boolean;
  inStock: boolean;

  setTab: (tab: MskTabKey) => void;
  updateQty: (value: number) => void;
  handleAddToCart: () => Promise<void>;

  formatPrice: (price: number) => string;
  normalizeSlug: (value: string) => string;
}
