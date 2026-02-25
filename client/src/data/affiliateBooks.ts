/**
 * Amazon affiliate books — hubdepot-20
 * Used by Recommended Books page and SupportSection.
 * Keep in sync with scripts/affiliate-books.json for content-agent.
 */
export const AMAZON_TAG = "hubdepot-20";

export type AffiliateBook = { name: string; asin: string; desc?: string };

export const AFFILIATE_BOOKS_BY_CATEGORY: Record<string, AffiliateBook[]> = {
  "nasa-news": [
    { name: "NASA Space Shuttle: 40th Anniversary", asin: "0762499085", desc: "Official NASA history" },
    { name: "The Right Stuff", asin: "0312857043", desc: "Tom Wolfe — Mercury astronauts" },
    { name: "Failure Is Not an Option", asin: "1439148813", desc: "Gene Kranz — Mission Control" },
  ],
  "space-facts": [
    { name: "Astrophysics for People in a Hurry", asin: "0393609391", desc: "Neil deGrasse Tyson" },
    { name: "A Brief History of Time", asin: "0553380168", desc: "Stephen Hawking" },
    { name: "Cosmos", asin: "0345539435", desc: "Carl Sagan" },
  ],
  "satellite-tutorials": [
    { name: "Orbital Mechanics for Engineering Students", asin: "B00B9Y4B8M", desc: "Howard Curtis — university textbook" },
    { name: "Fundamentals of Spacecraft Attitude Determination and Control", asin: "1493903149", desc: "Markley & Crassidis" },
    { name: "Spacecraft Systems Engineering", asin: "1119974665", desc: "Fortescue, Swinerd & Stark" },
  ],
  "astronomy-lessons": [
    { name: "Astrophysics for People in a Hurry", asin: "0393609391", desc: "Neil deGrasse Tyson" },
    { name: "The Elegant Universe", asin: "039333646X", desc: "Brian Greene" },
    { name: "Death by Black Hole", asin: "0393350381", desc: "Neil deGrasse Tyson" },
  ],
  aerodynamics: [
    { name: "Introduction to Flight", asin: "1260226844", desc: "Anderson — aerospace intro" },
    { name: "Fundamentals of Aerodynamics", asin: "1259129918", desc: "Anderson" },
    { name: "Rocket Propulsion Elements", asin: "1118753658", desc: "Sutton & Biblarz" },
  ],
  "quantum-physics": [
    { name: "Quantum Physics for Beginners", asin: "B09B8L1Q11", desc: "Accessible intro" },
    { name: "The Quantum Universe", asin: "0306822712", desc: "Cox & Forshaw" },
    { name: "Six Easy Pieces", asin: "0465025277", desc: "Richard Feynman" },
  ],
  "space-agi": [
    { name: "Artificial Intelligence: A Modern Approach", asin: "0134610997", desc: "AI textbook" },
    { name: "Reinforcement Learning", asin: "0262039249", desc: "Sutton & Barto" },
    { name: "Deep Learning", asin: "0262035619", desc: "Goodfellow, Bengio, Courville" },
  ],
  "space-engineering": [
    { name: "Orbital Mechanics for Engineering Students", asin: "B00B9Y4B8M", desc: "Howard Curtis" },
    { name: "Fundamentals of Astrodynamics", asin: "0486600610", desc: "Bate, Mueller, White" },
    { name: "Spacecraft Systems Engineering", asin: "1119974665", desc: "Fortescue, Swinerd, Stark" },
  ],
};

export const CATEGORY_LABELS: Record<string, string> = {
  "space-agi": "Space AGI & AI Satellites",
  "space-engineering": "Space Engineering & Formulas",
  "nasa-news": "NASA & Space Missions",
  "space-facts": "Space Facts & Astrophysics",
  "satellite-tutorials": "Satellites & Orbital Mechanics",
  "astronomy-lessons": "Astronomy & Cosmology",
  aerodynamics: "Aerodynamics & Flight",
  "quantum-physics": "Quantum Physics & Space",
};
