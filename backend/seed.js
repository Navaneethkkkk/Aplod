import dotenv from "dotenv";
import mongoose from "mongoose";
import Category from "./Models/Category.js";
import Product from "./Models/Product.js";

dotenv.config();

const svgImage = (title, color, accent = "#111827") => {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
    <rect width="640" height="640" rx="48" fill="#f5f5f4"/>
    <rect x="210" y="92" width="220" height="456" rx="52" fill="${color}" stroke="${accent}" stroke-width="12"/>
    <rect x="238" y="122" width="84" height="84" rx="22" fill="${accent}" opacity="0.88"/>
    <circle cx="262" cy="148" r="13" fill="#020617"/>
    <circle cx="262" cy="192" r="13" fill="#020617"/>
    <circle cx="304" cy="170" r="13" fill="#020617"/>
    <circle cx="320" cy="320" r="58" fill="none" stroke="#ffffff" stroke-width="10" opacity="0.55"/>
    <text x="320" y="592" text-anchor="middle" font-family="Arial" font-size="28" font-weight="700" fill="#171717">${title}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const categories = [
  {
    name: "iPhone Cases",
    slug: "iphone-cases",
    description: "Premium protective covers for latest iPhone models.",
    featured: true,
  },
  {
    name: "Screen Protectors",
    slug: "screen-protectors",
    description: "9H tempered glass and privacy screen guards.",
    featured: true,
  },
  {
    name: "Charging Essentials",
    slug: "charging-essentials",
    description: "MagSafe chargers, adapters, and everyday power accessories.",
    featured: true,
  },
];

const products = [
  {
    name: "AeroShield MagSafe Case",
    categorySlug: "iphone-cases",
    sku: "APL-CASE-AERO-16",
    brand: "APLOD",
    description: "Slim MagSafe case with raised camera lip, soft grip sides, and shock absorbing corners.",
    price: 1499,
    compareAtPrice: 2199,
    stock: 42,
    featured: true,
    rating: 4.8,
    reviewsCount: 184,
    tags: ["iphone", "case", "magsafe"],
    images: [svgImage("AeroShield", "#111827", "#374151")],
  },
  {
    name: "Crystal Clear Hybrid Case",
    categorySlug: "iphone-cases",
    sku: "APL-CASE-CLR-16",
    brand: "APLOD",
    description: "Transparent anti-yellow case with reinforced bumpers and wireless charging support.",
    price: 999,
    compareAtPrice: 1599,
    stock: 58,
    featured: true,
    rating: 4.7,
    reviewsCount: 231,
    tags: ["clear", "case", "iphone"],
    images: [svgImage("Crystal Case", "#dbeafe", "#94a3b8")],
  },
  {
    name: "Leather Touch Pro Cover",
    categorySlug: "iphone-cases",
    sku: "APL-CASE-LTR-16P",
    brand: "APLOD",
    description: "Premium leather finish case with microfiber lining and tactile covered buttons.",
    price: 1799,
    compareAtPrice: 2499,
    stock: 24,
    featured: false,
    rating: 4.9,
    reviewsCount: 96,
    tags: ["leather", "premium", "case"],
    images: [svgImage("Leather Pro", "#92400e", "#451a03")],
  },
  {
    name: "9H Edge Tempered Glass",
    categorySlug: "screen-protectors",
    sku: "APL-GLASS-9H",
    brand: "APLOD",
    description: "Edge-to-edge tempered glass with oleophobic coating and touch accurate clarity.",
    price: 499,
    compareAtPrice: 899,
    stock: 120,
    featured: true,
    rating: 4.6,
    reviewsCount: 312,
    tags: ["glass", "screen", "protector"],
    images: [svgImage("9H Glass", "#e0f2fe", "#0284c7")],
  },
  {
    name: "Privacy Shield Screen Guard",
    categorySlug: "screen-protectors",
    sku: "APL-GLASS-PRIV",
    brand: "APLOD",
    description: "Two-way privacy tempered glass for banking, travel, and office use.",
    price: 799,
    compareAtPrice: 1299,
    stock: 76,
    featured: false,
    rating: 4.7,
    reviewsCount: 148,
    tags: ["privacy", "screen", "protector"],
    images: [svgImage("Privacy", "#1f2937", "#020617")],
  },
  {
    name: "MagDock 15W Wireless Charger",
    categorySlug: "charging-essentials",
    sku: "APL-CHG-MAG15",
    brand: "APLOD",
    description: "15W magnetic wireless charger with aluminium base and braided USB-C cable.",
    price: 1999,
    compareAtPrice: 2999,
    stock: 35,
    featured: true,
    rating: 4.8,
    reviewsCount: 204,
    tags: ["magsafe", "charger", "wireless"],
    images: [svgImage("MagDock", "#f8fafc", "#64748b")],
  },
  {
    name: "65W GaN Travel Adapter",
    categorySlug: "charging-essentials",
    sku: "APL-CHG-GAN65",
    brand: "APLOD",
    description: "Compact triple-port fast charger for phone, tablet, earbuds, and laptop charging.",
    price: 2499,
    compareAtPrice: 3499,
    stock: 29,
    featured: false,
    rating: 4.9,
    reviewsCount: 119,
    tags: ["gan", "adapter", "charger"],
    images: [svgImage("65W GaN", "#ffffff", "#0f172a")],
  },
];

async function seed() {
  if (!process.env.MONGOURL) {
    throw new Error("MONGOURL is missing in .env");
  }

  await mongoose.connect(process.env.MONGOURL);
  await Promise.all([Category.deleteMany({}), Product.deleteMany({})]);

  const createdCategories = await Category.insertMany(
    categories.map((category) => ({ ...category, status: "Active" }))
  );
  const categoryBySlug = Object.fromEntries(
    createdCategories.map((category) => [category.slug, category._id])
  );

  await Product.insertMany(
    products.map(({ categorySlug, images, ...product }) => ({
      ...product,
      category: categoryBySlug[categorySlug],
      imageUrl: images[0],
      images,
      status: "Active",
    }))
  );

  console.log(`Seeded ${createdCategories.length} categories and ${products.length} products`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
