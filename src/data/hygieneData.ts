import type { StaticImageData } from "next/image";

// Images
import pic1 from "../assets/products/Durex-Fetherlite-Condoms.png";
import pic2 from "../assets/products/Always-Ultra-Thin-Pads-8s.png";
import pic3 from "../assets/products/Swift-Pregnancy-Test-Kit.png";
import pic4 from "../assets/products/Panadol-Extra-10s.png";
import pic5 from "../assets/products/Strepsils-Lozenges-24s.png";
import pic6 from "../assets/products/E45 Moisturizing-Cream-100g.png";
import pic7 from "../assets/products/Dettol-hand-sanitizer-50ml.png";
import pic8 from "../assets/products/Gaviscon-peppermint-liquid-200ml.png";

// ===============================================================
// Types
// ===============================================================

export interface Offer {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  discount: number;
  image: string | StaticImageData;
  gallery?: (string | StaticImageData)[];
  inStock: boolean;
  isTrending?: boolean;
}

// ===============================================================
// Data
// ===============================================================

const OFFERS: Offer[] = [
  {
    id: "1",
    name: "Panadol Extra 10s",
    description: "Fast relief for headaches and fever",
    brand: "GSK",
    category: "Pain Relief",
    price: 250,
    oldPrice: 300,
    discount: 17,
    image: pic4,
    inStock: true,
    isTrending: true,
  },
  {
    id: "2",
    name: "Colgate MaxFresh",
    description: "Refreshing breath & cavity protection",
    brand: "Colgate",
    category: "Oral Care",
    price: 180,
    discount: 0,
    image: pic2,
    inStock: true,
    isTrending: true,
  },
  {
    id: "3",
    name: "Dettol Hand Sanitizer 50ml",
    description: "Kills 99.9% of germs instantly",
    brand: "Dettol",
    category: "Hygiene",
    price: 150,
    discount: 0,
    image: pic7,
    inStock: true,
  },
  {
    id: "4",
    name: "Always Ultra Night 7s",
    description: "Maximum overnight protection",
    brand: "Always",
    category: "Feminine Care",
    price: 320,
    oldPrice: 380,
    discount: 16,
    image: pic2,
    inStock: true,
    isTrending: true,
  },
  {
    id: "5",
    name: "Vaseline Petroleum Jelly 50g",
    description: "Triple-purified for skin protection",
    brand: "Vaseline",
    category: "Skincare",
    price: 130,
    discount: 0,
    image: pic1,
    inStock: true,
  },
  {
    id: "6",
    name: "Johnson's Baby Powder 200g",
    description: "Gentle protection for delicate skin",
    brand: "Johnson's",
    category: "Baby Care",
    price: 280,
    discount: 0,
    image: pic3,
    inStock: true,
  },
  {
    id: "7",
    name: "Nivea Soft Cream 100ml",
    description: "Moisturizing cream for face & body",
    brand: "Nivea",
    category: "Skincare",
    price: 350,
    oldPrice: 400,
    discount: 13,
    image: pic6,
    inStock: true,
    isTrending: true,
  },
  {
    id: "8",
    name: "Oral-B Essential Floss 50m",
    description: "Shred-resistant dental floss",
    brand: "Oral-B",
    category: "Oral Care",
    price: 220,
    discount: 0,
    image: pic8,
    inStock: true,
  },
];

// ===============================================================
// API
// ===============================================================

export const getAllOffers = () => OFFERS;

export const getOfferById = (id: string) => 
  OFFERS.find(o => o.id === id);

export const getTrendingOffers = () => 
  OFFERS.filter(o => o.isTrending);

export const getOffersByCategory = (category: string) =>
  OFFERS.filter(o => o.category === category);

export const calculateDiscountPrice = (price: number, discount: number) =>
  price * (1 - discount / 100);

export const formatPrice = (price: number) => 
  `KES ${price.toFixed(2)}`;

export const getProductURL = (id: string) => 
  `/dropdowns/hygiene/${id}`;

// Legacy compatibility
export const OffersDataUtils = {
  getListingProducts: getAllOffers,
};

// Type alias for backward compatibility
export type ProductListing = Offer;