/**
 * NASA & Space merchandise — Amazon affiliate (hubdepot-20)
 * Only products verified available on Amazon.com
 */
export const AMAZON_TAG = "hubdepot-20";

export type AffiliateProduct = { name: string; asin: string; desc?: string; category: string };

export const NASA_MERCHANDISE: AffiliateProduct[] = [
  // Books — verified available
  { name: "Astrophysics for People in a Hurry", asin: "0393609391", desc: "Neil deGrasse Tyson", category: "books" },
  { name: "Orbital Mechanics for Engineering Students", asin: "0080977472", desc: "Howard Curtis", category: "books" },
  { name: "A Brief History of Time", asin: "0553380168", desc: "Stephen Hawking", category: "books" },
  { name: "Cosmos", asin: "0345539435", desc: "Carl Sagan", category: "books" },
  { name: "Quantum Physics for Dummies", asin: "1118460820", desc: "Steven Holzner", category: "books" },
  { name: "The Right Stuff", asin: "0312857043", desc: "Tom Wolfe", category: "books" },
  { name: "Failure Is Not an Option", asin: "1439148813", desc: "Gene Kranz", category: "books" },
  // NASA T-shirts
  { name: "NASA Artemis Insignia Logo T-Shirt", asin: "B0B92VHTVD", desc: "Official-style Artemis", category: "apparel" },
  { name: "NASA Next Giant Leap T-Shirt", asin: "B07SSCVV4G", desc: "Classic NASA design", category: "apparel" },
  { name: "NASA Walking Astronauts T-Shirt", asin: "B07KW5ZV6M", desc: "Spacewalk design", category: "apparel" },
  { name: "NASA Glenn Research Center T-Shirt", asin: "B07PKRBHK7", desc: "NASA center logo", category: "apparel" },
  // NASA Toys & Models
  { name: "LEGO NASA Space Shuttle Discovery", asin: "B08STQBXN5", desc: "2,354 pieces, Hubble included", category: "toys" },
  { name: "LEGO NASA Rocket Launch Building Set", asin: "B09JHZY7JF", desc: "NASA-inspired rocket", category: "toys" },
  { name: "NASA Rocket Launcher Kids STEM Toy", asin: "B0CSNN775Y", desc: "Foam rocket, STEM gift", category: "toys" },
  // NASA Accessories
  { name: "Officially Licensed NASA Logo Tote", asin: "B08P15CLQ5", desc: "NASA tote bag", category: "accessories" },
];

export const MERCHANDISE_CATEGORIES = [
  { id: "books", label: "Books", emoji: "📚" },
  { id: "apparel", label: "NASA T-Shirts", emoji: "👕" },
  { id: "toys", label: "Toys & Models", emoji: "🚀" },
  { id: "accessories", label: "Accessories", emoji: "🛍️" },
];
