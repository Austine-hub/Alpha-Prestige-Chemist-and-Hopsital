// src/data/healthCategories.ts

export type HealthCategory = {
  id: number;
  title: string;
  slug: string;
  imagePath: string;
  alt: string;
};

export const HEALTH_CATEGORIES: HealthCategory[] = [
  {
    id: 1,
    title: "Vitamins",
    slug: "vitamins",
    imagePath: "/images/health/vitamins.jpg",
    alt: "Vitamins - citrus fruits",
  },
  {
    id: 2,
    title: "Diabetes",
    slug: "diabetes",
    imagePath: "/images/health/diabetes.jpg",
    alt: "Diabetes management device",
  },
  {
    id: 3,
    title: "Women Care",
    slug: "women",
    imagePath: "/images/health/women-care.jpg",
    alt: "Women healthcare",
  },
  {
    id: 4,
    title: "Hair & Skin Care",
    slug: "skin",
    imagePath: "/images/health/hair-skin.jpg",
    alt: "Hair and skin care",
  },
  {
    id: 5,
    title: "Thyroid",
    slug: "thyroid",
    imagePath: "/images/health/thyroid.jpg",
    alt: "Thyroid health",
  },
  {
    id: 6,
    title: "Bone Health",
    slug: "bone-health",
    imagePath: "/images/health/bone-health.jpg",
    alt: "Bone health",
  },
  {
    id: 7,
    title: "Heart",
    slug: "heart",
    imagePath: "/images/health/heart.jpg",
    alt: "Heart health",
  },
  {
    id: 8,
    title: "Lifestyle",
    slug: "lifestyle",
    imagePath: "/images/health/lifestyle.jpg",
    alt: "Lifestyle choices",
  },
  {
    id: 9,
    title: "Fever & Infection",
    slug: "fever-infection",
    imagePath: "/images/health/fever-infection.jpg",
    alt: "Fever and infection",
  },
];
