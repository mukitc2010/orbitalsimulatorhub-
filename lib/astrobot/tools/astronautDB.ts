/**
 * Astronaut Database Tool — Mock data for AstroBot AGI
 */

export interface Astronaut {
  name: string;
  mission: string;
  role: string;
  moonwalker: boolean;
  funFact: string;
}

const ASTRONAUTS: Astronaut[] = [
  { name: "Neil Armstrong", mission: "Apollo 11", role: "Commander", moonwalker: true, funFact: "First human on the Moon. Said: 'That's one small step for man, one giant leap for mankind.'" },
  { name: "Buzz Aldrin", mission: "Apollo 11", role: "Lunar Module Pilot", moonwalker: true, funFact: "Second person on the Moon. MIT PhD in astronautics." },
  { name: "Pete Conrad", mission: "Apollo 12", role: "Commander", moonwalker: true, funFact: "Third person on the Moon. First words: 'Whoopee! Man, that may have been a small one for Neil, but that's a long one for me.'" },
  { name: "Alan Bean", mission: "Apollo 12", role: "Lunar Module Pilot", moonwalker: true, funFact: "Fourth person on the Moon. Later became an artist painting space scenes." },
  { name: "Alan Shepard", mission: "Apollo 14", role: "Commander", moonwalker: true, funFact: "First American in space (1961). Hit golf balls on the Moon!" },
  { name: "Edgar Mitchell", mission: "Apollo 14", role: "Lunar Module Pilot", moonwalker: true, funFact: "Sixth person on the Moon. Conducted ESP experiments during the flight." },
  { name: "David Scott", mission: "Apollo 15", role: "Commander", moonwalker: true, funFact: "Dropped a hammer and feather on the Moon to prove Galileo's theory." },
  { name: "James Irwin", mission: "Apollo 15", role: "Lunar Module Pilot", moonwalker: true, funFact: "Drove the first Lunar Roving Vehicle." },
  { name: "John Young", mission: "Apollo 16", role: "Commander", moonwalker: true, funFact: "Flew Gemini, Apollo, and Space Shuttle — only astronaut to do all three." },
  { name: "Charles Duke", mission: "Apollo 16", role: "Lunar Module Pilot", moonwalker: true, funFact: "Left a family photo on the Moon." },
  { name: "Gene Cernan", mission: "Apollo 17", role: "Commander", moonwalker: true, funFact: "Last person to walk on the Moon (Dec 1972)." },
  { name: "Harrison Schmitt", mission: "Apollo 17", role: "Lunar Module Pilot", moonwalker: true, funFact: "Only geologist to walk on the Moon." },
  { name: "Yuri Gagarin", mission: "Vostok 1", role: "Pilot", moonwalker: false, funFact: "First human in space (April 12, 1961)." },
  { name: "Valentina Tereshkova", mission: "Vostok 6", role: "Pilot", moonwalker: false, funFact: "First woman in space (June 1963)." },
  { name: "Sally Ride", mission: "STS-7", role: "Mission Specialist", moonwalker: false, funFact: "First American woman in space (1983)." },
];

export function getMoonAstronauts(): Astronaut[] {
  return ASTRONAUTS.filter((a) => a.moonwalker);
}

export function getAstronautByName(name: string): Astronaut | undefined {
  const q = name.toLowerCase();
  return ASTRONAUTS.find((a) => a.name.toLowerCase().includes(q));
}

export function getAstronautsByMission(mission: string): Astronaut[] {
  const q = mission.toLowerCase();
  return ASTRONAUTS.filter((a) => a.mission.toLowerCase().includes(q));
}

export function getFunFacts(): string[] {
  return ASTRONAUTS.map((a) => `${a.name} (${a.mission}): ${a.funFact}`);
}

export function runAstronautQuery(query: "moon" | "mission" | "name" | "facts", param?: string): { astronauts?: Astronaut[]; facts?: string[] } {
  if (query === "moon") return { astronauts: getMoonAstronauts() };
  if (query === "mission" && param) return { astronauts: getAstronautsByMission(param) };
  if (query === "name" && param) {
    const a = getAstronautByName(param);
    return { astronauts: a ? [a] : [] };
  }
  if (query === "facts") return { facts: getFunFacts() };
  return {};
}
