// src/data/BeautyData.ts
// ===============================================================
// 🧠 Centralized Model Layer: Data, Types, and Utility Functions
// Single source of truth for beauty products
// ===============================================================

// 🧩 Type Definitions
export interface Product {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;       // Price in KES
  readonly image: string;       // Public path: /assets/products/xxx.png
  readonly brand: string;
}

// 🛒 Type for Cart Context
interface CartItem {
  id: string;      // string for comparison with cartItems
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// 🧾 Product Catalog
export const beautyProducts: readonly Product[] = [
  {
    id: 1,
    name: "Revitalizing Supreme+ Youth Power Crème",
    description: "Prestige anti-aging cream that firms, smooths, and rejuvenates skin.",
    price: 18900,
    image: "/assets/products/1.jpg",
    brand: "Estée Lauder",
  },
  {
    id: 2,
    name: "True Match Super-Blendable Foundation",
    description: "Lightweight, seamless foundation for natural, flawless coverage.",
    price: 2400,
    image: "/assets/products/2.jpg",
    brand: "L’Oréal Paris",
  },
  {
    id: 3,
    name: "Rouge Volupté Shine Lipstick",
    description: "Luxurious lipstick delivering intense color and moisture.",
    price: 5200,
    image: "/assets/products/3.jpg",
    brand: "Yves Saint Laurent (YSL)",
  },
  {
    id: 4,
    name: "Better Than Sex Mascara",
    description: "Iconic volumizing mascara for dramatic, curled lashes.",
    price: 4200,
    image: "/assets/products/4.jpg",
    brand: "Too Faced",
  },
  {
    id: 5,
    name: "Born This Way Foundation",
    description: "Medium-to-full coverage foundation with natural finish.",
    price: 5600,
    image: "/assets/products/5.jpg",
    brand: "Too Faced",
  },
  {
    id: 6,
    name: "Soft Matte Complete Lipstick",
    description: "Velvety matte finish lipstick with long-lasting comfort.",
    price: 4100,
    image: "/assets/products/6.jpg",
    brand: "NARS",
  },
  {
    id: 7,
    name: "Soft Radiance Pressed Powder",
    description: "Finishing powder that delivers a soft, luminous complexion.",
    price: 5300,
    image: "/assets/products/7.jpg",
    brand: "Laura Mercier",
  },
  {
    id: 8,
    name: "Airbrush Flawless Foundation",
    description: "Full-coverage foundation with a natural matte, airbrushed finish.",
    price: 5900,
    image: "/assets/products/8.jpg",
    brand: "Charlotte Tilbury",
  },
] as const;

// 🔍 Retrieve a single product by ID
export const getProductById = (id: number): Product | undefined =>
  beautyProducts.find((product) => product.id === id);

// 💰 Format price to Kenyan Shilling currency
export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  }).format(amount);

// 🔗 Copy product link to clipboard
export const copyProductLink = async (id: number): Promise<void> => {
  await navigator.clipboard.writeText(`${window.location.origin}/product/${id}`);
};

// 🛒 Prepare cart item for cart context
export const prepareCartItem = (product: Product, quantity: number = 1): CartItem => ({
  id: product.id.toString(),
  name: product.name,
  price: product.price,
  image: product.image,
  quantity,
});
