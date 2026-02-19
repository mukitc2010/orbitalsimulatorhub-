/**
 * Daily Featured Topics
 * Auto-updated daily with new NASA, Newton, quantum physics, astrophysics topics
 */

export interface DailyTopic {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  icon: string;
  category: "nasa" | "newton" | "quantum-physics" | "astrophysics" | "orbital-mechanics";
  description: string;
  learnMoreUrl: string;
  keywords: string[];
}

export const DAILY_TOPICS: DailyTopic[] = [
  {
    id: "neuro-space-2026-02-19",
    date: "2026-02-19",
    title: "Neuro-Space: Light-Speed & Autonomous AI",
    icon: "🌌",
    category: "orbital-mechanics",
    description: "Light-speed constraints, neuro-space cognition, and aerospace dynamics. Future autonomous spacecraft for Mars and beyond.",
    learnMoreUrl: "/research/neuro-space",
    keywords: ["neuro-space", "light-speed", "autonomous AI", "deep space", "aerospace"],
  },
  {
    id: "newton-laws-2026-02-15",
    date: "2026-02-15",
    title: "Newton's Laws of Motion",
    icon: "⚖️",
    category: "newton",
    description: "Learn how Newton's three laws explain how objects move in space and why satellites stay in orbit.",
    learnMoreUrl: "/learn/newton",
    keywords: ["Newton", "laws of motion", "physics", "gravity"],
  },
  {
    id: "iss-orbit-2026-02-14",
    date: "2026-02-14",
    title: "International Space Station",
    icon: "🛰️",
    category: "nasa",
    description: "Discover how the ISS orbits Earth 16 times per day and what life is like in microgravity.",
    learnMoreUrl: "/satellites",
    keywords: ["ISS", "NASA", "space station", "orbit"],
  },
];

export function getTodayTopic(): DailyTopic | null {
  const today = new Date().toISOString().split("T")[0];
  return DAILY_TOPICS.find((t) => t.date === today) || DAILY_TOPICS[DAILY_TOPICS.length - 1] || null;
}

export function getTopicByDate(date: string): DailyTopic | null {
  return DAILY_TOPICS.find((t) => t.date === date) || null;
}

export function getRecentTopics(limit = 7): DailyTopic[] {
  return [...DAILY_TOPICS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
