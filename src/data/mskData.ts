// src/data/mskData.ts
// -----------------------------------------------------------------------------
// Musculoskeletal (MSK) Product Data
// - Slugs are globally UNIQUE (routing & React keys)
// - IDs are stable string identifiers
// - Data is readonly & immutable
// - Categories are derived from data (single source of truth)
// -----------------------------------------------------------------------------

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface MskProduct {
  /** Stable unique identifier */
  readonly id: string;

  /** Display name */
  readonly name: string;

  /** Globally unique slug */
  readonly slug: string;

  /** Public image path (from /public) */
  readonly image: string;

  /** Pricing (KES) */
  readonly price: number;
  readonly oldPrice?: number;

  /** Product category */
  readonly category: string;

  /** Card summary */
  readonly description: string;

  /** Details page content */
  readonly fullDescription?: string;
  readonly features?: readonly string[];
  readonly howToUse?: string;

  /** Availability */
  readonly inStock: boolean;
}

/* -------------------------------------------------------------------------- */
/* Product Data                                                               */
/* -------------------------------------------------------------------------- */

export const mskProducts = [
  {
    id: "msk-ibuprofen-200",
    name: "Ibuprofen 200 mg",
    slug: "ibuprofen-200",
    image: "/images/ibuprofen.png",
    price: 450,
    category: "NSAIDs",
    description: "First-line NSAID for mild to moderate musculoskeletal pain.",
    fullDescription:
      "Ibuprofen is widely used for acute and chronic musculoskeletal pain, osteoarthritis, and inflammatory conditions. Recommended as first-line therapy in many guidelines.",
    features: [
      "Reduces pain and inflammation",
      "Fast onset of action",
      "OTC availability",
    ],
    howToUse: "200–400 mg every 6–8 hours after meals. Max 1,200 mg/day OTC.",
    inStock: true,
  },

  {
    id: "msk-naproxen-250",
    name: "Naproxen 250 mg",
    slug: "naproxen-250",
    image: "/images/naproxen.jpg",
    price: 520,
    category: "NSAIDs",
    description: "Long-acting NSAID for joint and muscle pain.",
    fullDescription:
      "Naproxen provides longer pain control and is commonly used for osteoarthritis, rheumatoid arthritis, and back pain.",
    features: [
      "Longer duration of action",
      "Effective for chronic joint pain",
    ],
    howToUse: "250–500 mg twice daily with food.",
    inStock: true,
  },

  {
    id: "msk-diclofenac-50",
    name: "Diclofenac Sodium 50 mg",
    slug: "diclofenac-50",
    image: "/images/diclofenac.jpg",
    price: 610,
    category: "NSAIDs",
    description: "Potent NSAID for inflammatory musculoskeletal disorders.",
    fullDescription:
      "Diclofenac is commonly prescribed for arthritis, tendinitis, and musculoskeletal injuries.",
    features: [
      "Strong anti-inflammatory effect",
      "Effective for joint pain",
    ],
    howToUse: "50 mg 2–3 times daily after meals.",
    inStock: true,
  },

  {
    id: "msk-diclofenac-gel-1",
    name: "Diclofenac Gel 1%",
    slug: "diclofenac-gel-1",
    image: "/images/diclofenac-gel.jpg",
    price: 980,
    category: "Topical NSAIDs",
    description: "Topical NSAID for localized joint and muscle pain.",
    fullDescription:
      "Recommended for osteoarthritis and soft tissue pain with lower systemic risk.",
    features: [
      "Lower GI and cardiovascular risk",
      "Targeted pain relief",
    ],
    howToUse: "Apply to affected area up to 4 times daily.",
    inStock: true,
  },

  {
    id: "msk-acetaminophen-500",
    name: "Acetaminophen 500 mg",
    slug: "acetaminophen-500",
    image: "/images/acetaminophen.jpg",
    price: 400,
    category: "Analgesics",
    description: "Analgesic for mild musculoskeletal pain.",
    fullDescription:
      "Used for pain relief in patients who cannot tolerate NSAIDs. Preferred in elderly and CKD patients when dosed appropriately.",
    features: [
      "No anti-inflammatory effect",
      "Safer for GI tract",
    ],
    howToUse: "500–1,000 mg every 6–8 hours. Max 3,000 mg/day.",
    inStock: true,
  },

  {
    id: "msk-celecoxib-200",
    name: "Celecoxib 200 mg",
    slug: "celecoxib-200",
    image: "/images/celecoxib.jpg",
    price: 1450,
    category: "COX-2 Inhibitors",
    description: "Selective NSAID for arthritis pain.",
    fullDescription:
      "Celecoxib offers effective pain control with reduced GI risk compared to nonselective NSAIDs.",
    features: [
      "Lower GI bleeding risk",
      "Once-daily dosing option",
    ],
    howToUse: "200 mg once or twice daily.",
    inStock: true,
  },

  {
    id: "msk-meloxicam-15",
    name: "Meloxicam 15 mg",
    slug: "meloxicam-15",
    image: "/images/meloxicam.jpg",
    price: 1200,
    category: "NSAIDs",
    description: "Once-daily NSAID for chronic joint pain.",
    fullDescription:
      "Commonly prescribed for osteoarthritis and rheumatoid arthritis due to convenient dosing.",
    features: [
      "Once-daily dosing",
      "Good for chronic conditions",
    ],
    howToUse: "7.5–15 mg once daily.",
    inStock: true,
  },

  {
    id: "msk-cyclobenzaprine-10",
    name: "Cyclobenzaprine 10 mg",
    slug: "cyclobenzaprine-10",
    image: "/images/cyclobenzaprine.jpg",
    price: 890,
    category: "Muscle Relaxants",
    description: "Muscle relaxant for acute muscle spasms.",
    fullDescription:
      "Used short-term for acute musculoskeletal spasm and low back pain.",
    features: [
      "Relieves muscle spasm",
      "Adjunct to rest and NSAIDs",
    ],
    howToUse: "5–10 mg up to 3 times daily (short-term use).",
    inStock: true,
  },

  {
    id: "msk-methocarbamol-750",
    name: "Methocarbamol 750 mg",
    slug: "methocarbamol-750",
    image: "/images/methocarbamol.jpg",
    price: 820,
    category: "Muscle Relaxants",
    description: "Centrally acting muscle relaxant.",
    fullDescription:
      "Commonly used for acute musculoskeletal pain and spasm.",
    features: [
      "Less sedating than some alternatives",
    ],
    howToUse: "750 mg 3–4 times daily.",
    inStock: true,
  },

  {
    id: "msk-prednisone-10",
    name: "Prednisone 10 mg",
    slug: "prednisone-10",
    image: "/images/prednisone.jpg",
    price: 650,
    category: "Corticosteroids",
    description: "Systemic corticosteroid for inflammatory MSK disorders.",
    fullDescription:
      "Used short-term for severe inflammation in conditions such as rheumatoid arthritis flares.",
    features: [
      "Powerful anti-inflammatory",
      "Short-term use recommended",
    ],
    howToUse: "Dose varies; use lowest effective dose for shortest duration.",
    inStock: true,
  },

  {
    id: "msk-tramadol-50",
    name: "Tramadol 50 mg",
    slug: "tramadol-50",
    image: "/images/tramadol.jpg",
    price: 1100,
    category: "Opioid Analgesics",
    description: "Weak opioid for moderate musculoskeletal pain.",
    fullDescription:
      "Reserved for patients not responding to NSAIDs or acetaminophen.",
    features: [
      "Lower potency opioid",
      "Short-term use only",
    ],
    howToUse: "50–100 mg every 6 hours as needed.",
    inStock: true,
  },

  {
    id: "msk-gabapentin-300",
    name: "Gabapentin 300 mg",
    slug: "gabapentin-300",
    image: "/images/gabapentin.jpg",
    price: 900,
    category: "Neuropathic Pain",
    description: "Adjunct for neuropathic and chronic MSK pain.",
    fullDescription:
      "Used for radiculopathy and chronic pain with neuropathic features.",
    features: [
      "Neuropathic pain control",
    ],
    howToUse: "300 mg once daily, titrate as needed.",
    inStock: true,
  },

  {
    id: "msk-lidocaine-patch-5",
    name: "Lidocaine Patch 5%",
    slug: "lidocaine-patch-5",
    image: "/images/lidocaine-patch.jpg",
    price: 1600,
    category: "Topical Analgesics",
    description: "Local anesthetic patch for focal pain.",
    fullDescription:
      "Used for localized musculoskeletal and neuropathic pain.",
    features: [
      "Minimal systemic absorption",
    ],
    howToUse: "Apply to painful area for up to 12 hours/day.",
    inStock: true,
  },
] as const satisfies readonly MskProduct[];


/* -------------------------------------------------------------------------- */
/* Derived Types                                                              */
/* -------------------------------------------------------------------------- */

/** Union of all MSK categories (auto-derived) */
export type MskCategory = (typeof mskProducts)[number]["category"];

/* -------------------------------------------------------------------------- */
/* Helpers (tree-shakable & type-safe)                                        */
/* -------------------------------------------------------------------------- */

/** Fast lookup by slug */
export const mskProductBySlug: Readonly<Record<string, MskProduct>> =
  Object.fromEntries(mskProducts.map(p => [p.slug, p]));

/** Unique categories derived from data */
export const mskCategories: readonly MskCategory[] = [
  ...new Set(mskProducts.map(p => p.category)),
];
