// src/data/beautyData.ts
// ============================================================================
// BEAUTY DATA — MODEL + CONTROLLER (Clean MVC, DRY, Type-Safe, Error-Proof)
// ============================================================================

import type { StaticImageData } from "next/image";

/* ============================================================================
   IMAGE IMPORTS (CENTRALIZED ASSET REGISTRY)
============================================================================ */
import pic1 from "../assets/products/cerave-cleanser.png";
import pic2 from "../assets/products/ordinary-serum.png";
import pic3 from "../assets/products/laroche-moisturizer.png";
import pic4 from "../assets/products/neutrogena-sunscreen.png";
import pic5 from "../assets/products/tatcha-cream.png";
import pic6 from "../assets/products/olay-retinol.png";
import pic7 from "../assets/products/paulas-choice.png";
import pic8 from "../assets/products/elf-hydrating.png";
import pic9 from "../assets/products/innisfree-serum.png";
import pic10 from "../assets/products/drunk-elephant.png";
import pic11 from "../assets/products/fenty-cleanser.png";
import pic12 from "../assets/products/aveeno-daily.png";
import pic13 from "../assets/products/glow-recipe.png";
import pic14 from "../assets/products/cosrx-snail.png";
import pic15 from "../assets/products/first-aid-beauty.png";
import pic16 from "../assets/products/kiehl's-cream.png";
import pic17 from "../assets/products/clinique-gel.png";
import pic18 from "../assets/products/laneige-sleeping mask.png";
import pic19 from "../assets/products/skinfix-barrier.png";
import pic20 from "../assets/products/summer-fridays.png";

/* ============================================================================
   STATIC IMAGE LIBRARY — Single Source of Truth
============================================================================ */
export const IMAGE_LIBRARY = {
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6,
  pic7,
  pic8,
  pic9,
  pic10,
  pic11,
  pic12,
  pic13,
  pic14,
  pic15,
  pic16,
  pic17,
  pic18,
  pic19,
  pic20,
} as const;

export type ImageKeys = keyof typeof IMAGE_LIBRARY;

/* ============================================================================
   ENUM-LIKE CONSTANTS
============================================================================ */
export const PRODUCT_CATEGORIES = {
  FOUNDATION: "Foundation",
  MASCARA: "Mascara",
  LIPSTICK: "Lipstick",
  CONCEALER: "Concealer",
  EYESHADOW_PALETTE: "Eyeshadow Palette",
  SETTING_SPRAY: "Setting Spray",
  BLUSH: "Blush",
  HIGHLIGHTER: "Highlighter",
  LIP_LINER: "Lip Liner",
  EYELINER: "Eyeliner",
  PRIMER: "Primer",
  BROW_GEL: "Brow Gel",
  LIP_GLOSS: "Lip Gloss",
  BRONZER: "Bronzer",
  SETTING_POWDER: "Setting Powder",
} as const;

export type ProductCategory =
  (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];

export type SkinType =
  | "All"
  | "Oily"
  | "Combination"
  | "Normal"
  | "Dry"
  | "Sensitive";

export type ProductTag =
  | "Bestseller"
  | "Matte"
  | "Non-Comedogenic"
  | "Cruelty-Free"
  | "Award Winner"
  | "Waterproof"
  | "Dermatologist Tested"
  | "Glowy Finish"
  | "Vegan"
  | "New Arrival"
  | "Hypoallergenic";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  helpful: number;
  date: string;
}

/* ============================================================================
   PRODUCT MODEL
============================================================================ */
export interface Product {
  gallery?: (string | StaticImageData)[];
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;

  image: StaticImageData;
  images: readonly StaticImageData[];

  price: number;
  oldPrice: number;
  discount: number;
  currency: "KSh" | "USD" | (string & {});

  rating: number;
  reviewCount: number;

  shortDescription: string;
  description: string;

  keyIngredients: readonly string[];
  benefits: readonly string[];
  howToUse: readonly string[];
  warnings?: readonly string[];

  skinTypes: readonly SkinType[];
  skinConcerns: readonly string[];

  size: string;
  inStock: boolean;
  stockCount: number;
  lowStockThreshold?: number;

  isFeatured: boolean;
  isNew?: boolean;
  tags: readonly ProductTag[];

  collections?: readonly string[];
  bundleWith?: readonly string[];
  faq?: readonly FAQItem[];

  createdAt: string;
  updatedAt: string;
}

/* ============================================================================
   PRODUCT DATA — SSOT
============================================================================ */
export const productsData: readonly Product[] = [
  {
    id: "prod_001",
    slug: "flawlessfx-stay-all-day-matte-foundation",
    name: "Stay All Day Matte Foundation",
    brand: "Flawless FX",
    category: PRODUCT_CATEGORIES.FOUNDATION,

    image: pic1,
    images: [pic1],

    price: 329900,
    oldPrice: 389900,
    discount: 15,
    currency: "KSh",

    rating: 4.8,
    reviewCount: 2456,

    shortDescription: "24-hour matte finish foundation",
    description:
      "Full-coverage matte foundation designed to control shine for 24 hours.",

    keyIngredients: ["Vitamin E", "Kaolin Clay"],
    benefits: ["Non-comedogenic", "Long wear"],
    howToUse: ["Apply evenly using brush or sponge"],

    skinTypes: ["Oily", "Combination"],
    skinConcerns: ["Oil Control", "Coverage"],

    size: "30ml",
    inStock: true,
    stockCount: 45,
    lowStockThreshold: 8,

    isFeatured: true,
    tags: ["Bestseller", "Matte"],

    collections: ["Foundation Heroes"],
    bundleWith: ["prod_004", "prod_006"],

    faq: [
      {
        id: "faq_001",
        question: "Does this transfer?",
        answer: "Minimal transfer when properly set.",
        helpful: 42,
        date: "2024-09-15",
      },
    ],

    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2024-10-20T00:00:00Z",
  },
  {
    id: "prod_002",
    name: "Lash Amplify Volume Mascara",
    brand: "EyeStyle",
    category: PRODUCT_CATEGORIES.MASCARA,
    slug: "eyestyle-lash-amplify-volume-mascara",
    image: IMAGE_LIBRARY.pic2,
    images: [IMAGE_LIBRARY.pic2],
    price: 159900,
    oldPrice: 179900,
    discount: 11,
    currency: "KSh",
    rating: 4.6,
    reviewCount: 3891,
    description:
      "Intensely black mascara that builds dramatic volume and curl without clumping or flaking.",
    shortDescription: "Dramatic volume and curl mascara",
    keyIngredients: ["Conditioning Polymers", "Pro-Vitamin B5"],
    benefits: ["Maximum volume build-up", "Intense black pigment", "Smudge-resistant wear"],
    howToUse: ["Wiggle the wand at the base of lashes", "Sweep upward from root to tip; apply second coat for extra drama"],
    skinTypes: ["All"],
    skinConcerns: ["Smudging"],
    size: "10ml",
    inStock: true,
    stockCount: 67,
    isFeatured: true,
    tags: ["Bestseller", "Cruelty-Free"],
    warnings: ["Avoid direct contact with eyes."],
    bundleWith: ["prod_005", "prod_011"],
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2024-10-18T00:00:00Z",
  },
  {
    id: "prod_003",
    name: "Velvet Glide Liquid Lipstick - Shade Ruby",
    brand: "Lip Luxe",
    category: PRODUCT_CATEGORIES.LIPSTICK,
    slug: "lipluxe-velvet-glide-liquid-lipstick",
    image: IMAGE_LIBRARY.pic3,
    images: [IMAGE_LIBRARY.pic3],
    price: 189900,
    oldPrice: 229900,
    discount: 17,
    currency: "KSh",
    rating: 4.7,
    reviewCount: 1876,
    description:
      "Ultra-pigmented liquid lipstick that dries down to a comfortable, non-drying velvet matte finish.",
    shortDescription: "Pigmented, long-wear velvet liquid lipstick",
    keyIngredients: ["Shea Butter", "Vitamin C"],
    benefits: ["Extreme color payoff", "All-day wear", "Doesn't feather or bleed"],
    howToUse: ["Apply directly to lips using the wand applicator", "Wait 60 seconds for the matte finish to set"],
    skinTypes: ["All"],
    skinConcerns: ["Dry Patches", "Longevity"],
    size: "6ml",
    inStock: true,
    stockCount: 34,
    lowStockThreshold: 12,
    isFeatured: false,
    tags: ["Award Winner", "Matte"],
    createdAt: "2023-03-20T00:00:00Z",
    updatedAt: "2024-10-15T00:00:00Z",
  },
  {
    id: "prod_004",
    name: "Full Cover Retouch Concealer",
    brand: "Cover Pro",
    category: PRODUCT_CATEGORIES.CONCEALER,
    slug: "coverpro-full-cover-retouch-concealer",
    image: IMAGE_LIBRARY.pic4,
    images: [IMAGE_LIBRARY.pic4],
    price: 199900,
    oldPrice: 219900,
    discount: 9,
    currency: "KSh",
    rating: 4.5,
    reviewCount: 2134,
    description: "Creamy, blendable concealer for dark circles and blemishes. Crease-proof, 16-hour wear.",
    shortDescription: "Crease-proof, high-coverage concealer",
    keyIngredients: ["Caffeine", "Hyaluronic Acid"],
    benefits: ["Brightens undereyes", "Doesn't cake or settle", "Water-resistant"],
    howToUse: ["Apply in a triangle shape under the eyes or directly onto blemishes", "Blend gently with finger or brush"],
    skinTypes: ["All", "Combination", "Normal"],
    skinConcerns: ["Uneven Tone", "Full Coverage"],
    size: "7ml",
    inStock: true,
    stockCount: 56,
    isFeatured: false,
    tags: ["Dermatologist Tested", "Waterproof"],
    createdAt: "2023-04-05T00:00:00Z",
    updatedAt: "2024-10-12T00:00:00Z",
  },
  {
    id: "prod_005",
    name: "Desert Sunset Eyeshadow Palette",
    brand: "ColorPop",
    category: PRODUCT_CATEGORIES.EYESHADOW_PALETTE,
    slug: "colorpop-desert-sunset-eyeshadow-palette",
    image: IMAGE_LIBRARY.pic5,
    images: [IMAGE_LIBRARY.pic5],
    price: 449900,
    oldPrice: 489900,
    discount: 8,
    currency: "KSh",
    rating: 4.9,
    reviewCount: 987,
    description: "A 12-pan palette featuring warm mattes and shimmering metallics inspired by desert tones. Highly blendable and pigmented.",
    shortDescription: "Warm-toned 12-pan eyeshadow palette",
    keyIngredients: ["Talc-Free Formula", "Rich Pigments"],
    benefits: ["Zero fallout", "Easy to blend", "Versatile day-to-night looks"],
    howToUse: ["Apply matte shades to the crease for depth", "Use metallic shades on the lid with a damp brush for intense shine"],
    skinTypes: ["All"],
    skinConcerns: ["Fading"],
    size: "18g",
    inStock: true,
    stockCount: 23,
    lowStockThreshold: 5,
    isFeatured: true,
    tags: ["Award Winner", "Bestseller"],
    collections: ["Eye Art"],
    createdAt: "2023-05-15T00:00:00Z",
    updatedAt: "2024-10-10T00:00:00Z",
  },
  {
    id: "prod_006",
    name: "Hydro-Mist Setting Spray",
    brand: "GlowUp",
    category: PRODUCT_CATEGORIES.SETTING_SPRAY,
    slug: "glowup-hydro-mist-setting-spray",
    image: IMAGE_LIBRARY.pic6,
    images: [IMAGE_LIBRARY.pic6],
    price: 259900,
    oldPrice: 289900,
    discount: 10,
    currency: "KSh",
    rating: 4.6,
    reviewCount: 1654,
    description:
      "A hydrating mist that locks makeup in place, leaving a dewy, non-sticky finish for 12 hours.",
    shortDescription: "12-hour dewy finish setting spray",
    keyIngredients: ["Hyaluronic Acid", "Rose Water"],
    benefits: [
      "Melts makeup into skin",
      "Extends wear time",
      "Adds a healthy glow"
    ],
    howToUse: [
      "Shake well and close eyes",
      "Spray 4-6 times in an 'X' and 'T' formation after makeup application"
    ],
    skinTypes: ["All", "Dry", "Normal"],
    skinConcerns: ["Fading", "Hydration"],
    size: "100ml",
    inStock: true,
    stockCount: 41,
    isFeatured: false,
    tags: ["Glowy Finish", "Vegan"],
    warnings: ["Do not inhale."],
    createdAt: "2023-06-20T00:00:00Z",
    updatedAt: "2024-10-08T00:00:00Z",
  },
  {
    id: "prod_007",
    name: "Cheek Kiss Liquid Blush - Peony",
    brand: "Rouge FX",
    category: PRODUCT_CATEGORIES.BLUSH,
    slug: "rougefx-cheek-kiss-liquid-blush",
    image: IMAGE_LIBRARY.pic7,
    images: [IMAGE_LIBRARY.pic7],
    price: 199900,
    oldPrice: 229900,
    discount: 13,
    currency: "KSh",
    rating: 4.8,
    reviewCount: 4523,
    description:
      "Buildable and blendable liquid blush that gives a natural, second-skin flush. A little goes a long way.",
    shortDescription: "Natural liquid blush",
    keyIngredients: ["Jojoba Oil", "Natural Pigments"],
    benefits: [
      "Seamless blending",
      "Highly pigmented",
      "Long-lasting flush"
    ],
    howToUse: [
      "Dot 1–2 drops onto the apples of your cheeks",
      "Blend out quickly with fingers or a brush"
    ],
    skinTypes: ["All", "Dry", "Normal"],
    skinConcerns: ["Dry Patches", "Longevity"],
    size: "7ml",
    inStock: true,
    stockCount: 38,
    isFeatured: true,
    tags: ["Bestseller", "Cruelty-Free"],
    collections: ["Cheek Pop"],
    createdAt: "2023-07-10T00:00:00Z",
    updatedAt: "2024-10-05T00:00:00Z",
  },
  {
    id: "prod_008",
    name: "Diamond Dust Highlighter",
    brand: "Shine Bright",
    category: PRODUCT_CATEGORIES.HIGHLIGHTER,
    slug: "shinebright-diamond-dust-highlighter",
    image: IMAGE_LIBRARY.pic8,
    images: [IMAGE_LIBRARY.pic8],
    price: 219900,
    oldPrice: 249900,
    discount: 12,
    currency: "KSh",
    rating: 4.4,
    reviewCount: 876,
    description:
      "Finely milled powder highlighter that delivers an intense, non-glittery shimmer for maximum radiance.",
    shortDescription: "Blinding powder highlighter",
    keyIngredients: ["Micro-Fine Pearls"],
    benefits: [
      "Extreme light reflection",
      "Smooth finish (non-texturizing)",
      "Universal shade"
    ],
    howToUse: [
      "Sweep onto the tops of cheekbones, bridge of the nose, and cupid's bow",
      "Build up for desired intensity"
    ],
    skinTypes: ["All", "Normal"],
    skinConcerns: ["Dullness", "Uneven Tone"],
    size: "8g",
    inStock: true,
    stockCount: 89,
    isFeatured: false,
    tags: ["Cruelty-Free", "Glowy Finish"],
    createdAt: "2023-08-15T00:00:00Z",
    updatedAt: "2024-10-03T00:00:00Z",
  },
  {
    id: "prod_009",
    name: "Always Sharp Lip Liner - Nude",
    brand: "Line Art",
    category: PRODUCT_CATEGORIES.LIP_LINER,
    slug: "lineart-always-sharp-lip-liner-nude",
    image: IMAGE_LIBRARY.pic9,
    images: [IMAGE_LIBRARY.pic9],
    price: 109900,
    oldPrice: 129900,
    discount: 15,
    currency: "KSh",
    rating: 4.7,
    reviewCount: 1432,
    description:
      "Creamy, retractable lip liner with a built-in sharpener. Prevents lipstick from bleeding and prolongs wear.",
    shortDescription: "Self-sharpening waterproof lip liner",
    keyIngredients: ["Jojoba Seed Oil"],
    benefits: [
      "Precise application",
      "Waterproof",
      "Extends lipstick wear"
    ],
    howToUse: [
      "Line lips before applying lipstick",
      "Can be used to fill in lips completely for a matte base"
    ],
    skinTypes: ["All"],
    skinConcerns: ["Fading"],
    size: "0.28g",
    inStock: true,
    stockCount: 52,
    isFeatured: false,
    isNew: true,
    tags: ["New Arrival", "Waterproof"],
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-10-01T00:00:00Z",
  },
  {
    id: "prod_010",
    name: "Pure Hydration Serum Foundation",
    brand: "AquaBase",
    category: PRODUCT_CATEGORIES.FOUNDATION,
    slug: "aquabase-pure-hydration-serum-foundation",
    image: IMAGE_LIBRARY.pic10,
    images: [IMAGE_LIBRARY.pic10],
    price: 419900,
    oldPrice: 469900,
    discount: 11,
    currency: "KSh",
    rating: 4.8,
    reviewCount: 2341,
    description:
      "Lightweight serum foundation that provides medium, buildable coverage with a luminous, natural finish.",
    shortDescription: "Hydrating, luminous serum foundation",
    keyIngredients: ["Squalane", "Hyaluronic Acid"],
    benefits: [
      "Feels weightless on skin",
      "Doesn't cling to dry patches",
      "Subtle radiant finish"
    ],
    howToUse: [
      "Shake bottle well",
      "Apply 2-3 drops with fingertips or a brush"
    ],
    skinTypes: ["All", "Dry", "Normal"],
    skinConcerns: ["Dry Patches", "Fine Lines", "Hydration"],
    size: "30ml",
    inStock: true,
    stockCount: 28,
    lowStockThreshold: 6,
    isFeatured: true,
    tags: ["Award Winner", "Glowy Finish"],
    collections: ["Luxury"],
    createdAt: "2023-09-10T00:00:00Z",
    updatedAt: "2024-09-28T00:00:00Z",
  },
  {
    id: "prod_011",
    name: "Epic Ink Waterproof Eyeliner",
    brand: "EyeStyle",
    category: PRODUCT_CATEGORIES.EYELINER,
    slug: "eyestyle-epic-ink-waterproof-eyeliner",
    image: IMAGE_LIBRARY.pic11,
    images: [IMAGE_LIBRARY.pic11],
    price: 149900,
    oldPrice: 169900,
    discount: 12,
    currency: "KSh",
    rating: 4.5,
    reviewCount: 642,
    description:
      "Pen eyeliner with a flexible, precision tip for creating sharp lines. Long-wearing and truly waterproof.",
    shortDescription: "Waterproof, precision-tip liquid eyeliner",
    keyIngredients: ["Carbon Black Pigments"],
    benefits: ["Ultra-pigmented black", "Doesn't budge", "Easy wing application"],
    howToUse: ["Shake before use. Draw along the lash line from inner to outer corner."],
    skinTypes: ["All"],
    skinConcerns: ["Smudging", "Longevity"],
    size: "1ml",
    inStock: true,
    stockCount: 40,
    isFeatured: false,
    tags: ["Waterproof"],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-09-20T00:00:00Z",
  },
  {
    id: "prod_012",
    name: "CC Cream SPF 50 - Medium",
    brand: "DermaGuard",
    category: PRODUCT_CATEGORIES.FOUNDATION,
    slug: "dermaguard-cc-cream-spf50-medium",
    image: IMAGE_LIBRARY.pic12,
    images: [IMAGE_LIBRARY.pic12],
    price: 289900,
    oldPrice: 329900,
    discount: 12,
    currency: "KSh",
    rating: 4.3,
    reviewCount: 512,
    description:
      "Color-correcting cream with high SPF protection. Provides light coverage and a natural, radiant finish.",
    shortDescription: "Light coverage CC cream with SPF 50",
    keyIngredients: ["Titanium Dioxide", "Niacinamide"],
    benefits: ["Color corrects redness", "High UVA/UVB protection", "Lightweight feel"],
    howToUse: ["Apply liberally 15 minutes before sun exposure."],
    skinTypes: ["All", "Sensitive", "Normal"],
    skinConcerns: ["Uneven Tone", "Hydration"],
    size: "30ml",
    inStock: true,
    stockCount: 75,
    isFeatured: false,
    tags: ["Non-Comedogenic", "Dermatologist Tested"],
    createdAt: "2022-11-02T00:00:00Z",
    updatedAt: "2024-08-30T00:00:00Z",
  }, 
  {
    id: "prod_013",
    name: "Pore Minimizing Primer",
    brand: "Smooth Canvas",
    category: PRODUCT_CATEGORIES.PRIMER,
    slug: "smoothcanvas-pore-minimizing-primer",
    image: IMAGE_LIBRARY.pic13,
    images: [IMAGE_LIBRARY.pic13],
    price: 249900,
    oldPrice: 279900,
    discount: 11,
    currency: "KSh",
    rating: 4.7,
    reviewCount: 842,
    description:
      "Silky face primer that instantly blurs pores and fine lines, creating a smooth canvas for makeup.",
    shortDescription: "Instantly blurs pores and lines",
    keyIngredients: ["Silica", "Oil-Free Polymers"],
    benefits: ["Smoother makeup application", "Prolongs makeup wear", "Mattifies T-zone"],
    howToUse: ["Apply a thin layer after skincare, before foundation. Pat onto visible pores."],
    skinTypes: ["All", "Oily", "Combination"],
    skinConcerns: ["Oil Control", "Longevity"],
    size: "30ml",
    inStock: true,
    stockCount: 27,
    lowStockThreshold: 5,
    isFeatured: false,
    tags: ["Matte", "Bestseller"],
    createdAt: "2023-10-12T00:00:00Z",
    updatedAt: "2024-09-12T00:00:00Z",
  },
  {
    id: "prod_014",
    name: "Brow Sculpt Tinted Gel",
    brand: "Arch Expert",
    category: PRODUCT_CATEGORIES.BROW_GEL,
    slug: "archedxpert-brow-sculpt-tinted-gel",
    image: IMAGE_LIBRARY.pic14,
    images: [IMAGE_LIBRARY.pic14],
    price: 129900,
    oldPrice: 149900,
    discount: 13,
    currency: "KSh",
    rating: 4.6,
    reviewCount: 1010,
    description:
      "Fiber-infused brow gel that tints, volumizes, and holds brow hairs in place all day long.",
    shortDescription: "Tinted, fiber-infused brow gel",
    keyIngredients: ["Micro-Fibers", "Jojoba Esters"],
    benefits: ["Fills sparse areas", "Holds shape without stiffness", "Smudge-proof"],
    howToUse: ["Brush through brows in short, upward strokes."],
    skinTypes: ["All"],
    skinConcerns: ["Smudging"],
    size: "3g",
    inStock: true,
    stockCount: 30,
    lowStockThreshold: 5,
    isFeatured: false,
    tags: ["Cruelty-Free"],
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2024-08-05T00:00:00Z",
  },
  {
    id: "prod_015",
    name: "Full Volume Plumping Gloss",
    brand: "Lip Luxe",
    category: PRODUCT_CATEGORIES.LIP_GLOSS,
    slug: "lipluxe-full-volume-plumping-gloss",
    image: IMAGE_LIBRARY.pic15,
    images: [IMAGE_LIBRARY.pic15],
    price: 179900,
    oldPrice: 199900,
    discount: 10,
    currency: "KSh",
    rating: 4.5,
    reviewCount: 410,
    description:
      "High-shine, non-sticky lip gloss with subtle plumping ingredients for a fuller appearance.",
    shortDescription: "Non-sticky, high-shine plumping gloss",
    keyIngredients: ["Peppermint Oil", "Vitamin E"],
    benefits: ["Plumps and hydrates", "Mirror-like shine", "Comfortable feel"],
    howToUse: ["Apply a thick layer over bare lips or lipstick."],
    skinTypes: ["All"],
    skinConcerns: ["Dry Patches"],
    size: "6ml",
    inStock: true,
    stockCount: 21,
    lowStockThreshold: 5,
    isFeatured: false,
    tags: ["Vegan", "Glowy Finish"],
    createdAt: "2022-08-12T00:00:00Z",
    updatedAt: "2024-07-20T00:00:00Z",
  },
  {
    id: "prod_016",
    name: "Sun Kissed Bronzer Powder",
    brand: "Bronzology",
    category: PRODUCT_CATEGORIES.BRONZER,
    slug: "bronzology-sun-kissed-bronzer-powder",
    image: IMAGE_LIBRARY.pic16,
    images: [IMAGE_LIBRARY.pic16],
    price: 369900,
    oldPrice: 409900,
    discount: 10,
    currency: "KSh",
    rating: 4.6,
    reviewCount: 980,
    description:
      "Natural-looking matte bronzer powder for defining and warming up the complexion.",
    shortDescription: "Matte powder bronzer for contour",
    keyIngredients: ["Cocoa Butter"],
    benefits: ["Blendable formula", "Non-orange tone", "Long-lasting color"],
    howToUse: ["Sweep onto cheekbones, temples, and jawline."],
    skinTypes: ["All"],
    skinConcerns: ["Fading"],
    size: "10g",
    inStock: true,
    stockCount: 18,
    lowStockThreshold: 5,
    isFeatured: false,
    tags: ["Matte", "Cruelty-Free"],
    createdAt: "2021-11-01T00:00:00Z",
    updatedAt: "2024-06-16T00:00:00Z",
  },
  {
    id: "prod_017",
    name: "Invisible Set Translucent Powder",
    brand: "Set & Go",
    category: PRODUCT_CATEGORIES.SETTING_POWDER,
    slug: "setgo-invisible-set-translucent-powder",
    image: IMAGE_LIBRARY.pic17,
    images: [IMAGE_LIBRARY.pic17],
    price: 279900,
    oldPrice: 309900,
    discount: 10,
    currency: "KSh",
    rating: 4.4,
    reviewCount: 650,
    description:
      "Finely milled, invisible setting powder that blurs imperfections and absorbs oil without flashback.",
    shortDescription: "Invisible setting powder",
    keyIngredients: ["Talc-Free Formula", "Rice Powder"],
    benefits: ["Zero flashback", "Controls shine", "Blurs pores"],
    howToUse: ["Press a small amount onto T-zone with a puff or brush."],
    skinTypes: ["All", "Oily", "Combination"],
    skinConcerns: ["Oil Control", "Longevity"],
    size: "29g",
    inStock: true,
    stockCount: 36,
    lowStockThreshold: 5,
    isFeatured: false,
    tags: ["Matte"],
    createdAt: "2023-03-05T00:00:00Z",
    updatedAt: "2024-05-11T00:00:00Z",
  },
  {
    id: "prod_018",
    name: "Sheer Tinted Moisturizer",
    brand: "Everyday Base",
    category: PRODUCT_CATEGORIES.FOUNDATION,
    slug: "everydaybase-sheer-tinted-moisturizer",
    image: IMAGE_LIBRARY.pic18,
    images: [IMAGE_LIBRARY.pic18],
    price: 219900,
    oldPrice: 249900,
    discount: 12,
    currency: "KSh",
    rating: 4.7,
    reviewCount: 1210,
    description:
      "A light, hydrating formula that provides a hint of color for an 'I woke up like this' look. Ideal for daily use.",
    shortDescription: "Hydrating sheer base for daily wear",
    keyIngredients: ["Glycerin", "Shea Butter"],
    benefits: ["Evens skin tone subtly", "Moisturizes all day", "Non-heavy feel"],
    howToUse: ["Apply with fingers like a regular moisturizer for a quick finish."],
    skinTypes: ["All", "Dry", "Normal"],
    skinConcerns: ["Dry Patches", "Hydration"],
    size: "50ml",
    inStock: true,
    stockCount: 33,
    isFeatured: false,
    tags: ["Glowy Finish", "Vegan"],
    createdAt: "2023-02-02T00:00:00Z",
    updatedAt: "2024-04-01T00:00:00Z",
  },
  {
    id: "prod_019",
    name: "Longwear Lip Stain - Peach",
    brand: "Stain Lab",
    category: PRODUCT_CATEGORIES.LIPSTICK,
    slug: "stainlab-longwear-lip-stain-peach",
    image: IMAGE_LIBRARY.pic19,
    images: [IMAGE_LIBRARY.pic19],
    price: 169900,
    oldPrice: 199900,
    discount: 15,
    currency: "KSh",
    rating: 4.6,
    reviewCount: 430,
    description:
      "Water-based lip stain that delivers saturated color that lasts through meals and drinks without reapplication.",
    shortDescription: "Transfer-proof, long-lasting lip stain",
    keyIngredients: ["Fruit Extracts", "Water-based formula"],
    benefits: ["True transfer-proof wear", "Lightweight, bare-lip feel", "Builds easily"],
    howToUse: ["Apply a layer to clean lips; blot excess if needed."],
    skinTypes: ["All"],
    skinConcerns: ["Longevity", "Fading"],
    size: "4ml",
    inStock: true,
    stockCount: 26,
    isFeatured: false,
    tags: ["New Arrival", "Bestseller"],
    createdAt: "2022-05-18T00:00:00Z",
    updatedAt: "2024-03-21T00:00:00Z",
  },
  {
    id: "prod_020",
    name: "Kajal Kohl Liner - Intense Black",
    brand: "Deep Line",
    category: PRODUCT_CATEGORIES.EYELINER,
    slug: "deepline-kajal-kohl-liner",
    image: IMAGE_LIBRARY.pic20,
    images: [IMAGE_LIBRARY.pic20],
    price: 99900,
    oldPrice: 119900,
    discount: 17,
    currency: "KSh",
    rating: 4.5,
    reviewCount: 540,
    description:
      "A soft, ultra-pigmented kohl eyeliner ideal for the waterline and smoky looks. Safe for sensitive eyes.",
    shortDescription: "Soft, intense kohl pencil",
    keyIngredients: ["Kohl Pigments", "Beeswax"],
    benefits: ["Safe for waterline", "Easy to smudge", "Intense black color"],
    howToUse: ["Apply to upper and lower lash lines or the waterline."],
    skinTypes: ["All", "Sensitive"],
    skinConcerns: ["Smudging"],
    size: "1.2g",
    inStock: true,
    stockCount: 12,
    lowStockThreshold: 5,
    isFeatured: true,
    tags: ["Hypoallergenic", "Bestseller"],
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
];

/* ============================================================================
   CONTROLLER HELPERS — Clean, Reusable
============================================================================ */

export const BASE_PATH = "/dropdowns/beauty";

export const buildProductDetailUrl = (slug: string) =>
  `${BASE_PATH}/${slug}`;




/** Build safe product detail page URL */
export const getProductURL = (slug: string): string =>
  `${BASE_PATH}/${encodeURIComponent(slug.trim())}`;



/** Find product via slug */
/** Normalize slugs: lowercase, trim spaces */
const normalizeSlug = (slug: string) => slug.trim().toLowerCase();

/** Find product via slug */
export const getProductBySlug = (slug: string): Product | undefined =>
  productsData.find((p) => normalizeSlug(p.slug) === normalizeSlug(slug));
productsData.map(p => ({ ...p, slug: p.slug.toLowerCase().trim() }));



/** Return all products */
export const getAllProducts = (): readonly Product[] => productsData;

/** Safe price formatting */
export const formatPrice = (
  amount: number,
  currency: "KSh" | "USD" | string = "KSh"
) => {
  if (amount === undefined || amount === null) return "N/A";

  try {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: currency === "USD" ? "USD" : "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} ${currency}`;
  }
};

/** Compute discounted price */
export const calculateDiscountPrice = (price: number, discount = 0): number => {
  const safe = Math.min(Math.max(discount, 0), 100);
  return Math.max(0, Math.round(price - (price * safe) / 100));
};

/** Related products (same category, excluding current) */
export const getRelatedProducts = (
  currentId: string,
  category: ProductCategory,
  limit = 4
): Product[] =>
  productsData
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
