export interface AstronautEVA {
  date: string;
  durationSeconds: number;
  location: string;
  highlights: string[];
}

export interface AstronautMission {
  missionId: string;
  role: string;
  launchDate: string;
  landingDate: string;
  destinations: string[];
  flightTimeSeconds: number;
  isMoonMission: boolean;
  eva: AstronautEVA[];
}

export interface MoonExperience {
  isMoonwalker: boolean;
  landingSite: string;
  surfaceTimeSeconds: number;
  didCollectSamples: boolean;
  didDeployExperiments: boolean;
  notes: string;
}

export interface Astronaut {
  id: string;
  slug: string;
  name: string;
  givenName: string;
  familyName: string;
  nationality: string;
  agency: string;
  birthDate: string;
  birthPlace: string;
  deathDate: string | null;
  deathPlace: string | null;
  bioShort: string;
  bioLong: string;
  roles: string[];
  missions: AstronautMission[];
  totalSpaceTimeSeconds: number;
  moonExperience: MoonExperience | null;
  firsts: string[];
  awards: string[];
  funFacts: string[];
  kidsExplanation: string;
  researchNotes: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  portrait: string;
  updatedAt: string;
}

// ──── ALL 12 MOONWALKERS ────

const NEIL_ARMSTRONG: Astronaut = {
  id: "astronaut_neil_armstrong",
  slug: "neil-armstrong",
  name: "Neil A. Armstrong",
  givenName: "Neil",
  familyName: "Armstrong",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1930-08-05",
  birthPlace: "Wapakoneta, Ohio, USA",
  deathDate: "2012-08-25",
  deathPlace: "Cincinnati, Ohio, USA",
  bioShort: "American astronaut and aeronautical engineer; first human to walk on the Moon.",
  bioLong: "Neil Alden Armstrong was an American astronaut, aeronautical engineer, and the first person to walk on the Moon. He was also a naval aviator, test pilot, and university professor. Before becoming an astronaut, Armstrong served in the Korean War and later flew the X-15 experimental rocket plane. He joined NASA's astronaut corps in 1962 and commanded the Gemini 8 mission in 1966, performing the first docking of two spacecraft. On July 20, 1969, Armstrong and Buzz Aldrin landed the Apollo 11 lunar module Eagle on the Moon's Sea of Tranquility. Armstrong became the first person to step onto the lunar surface, famously declaring: \"That's one small step for man, one giant leap for mankind.\" After leaving NASA, Armstrong taught aerospace engineering at the University of Cincinnati.",
  roles: ["Astronaut", "Test Pilot", "Aeronautical Engineer", "Professor"],
  missions: [
    {
      missionId: "mission_gemini_8",
      role: "Command Pilot",
      launchDate: "1966-03-16",
      landingDate: "1966-03-17",
      destinations: ["leo"],
      flightTimeSeconds: 38520,
      isMoonMission: false,
      eva: [],
    },
    {
      missionId: "mission_apollo_11",
      role: "Commander",
      launchDate: "1969-07-16",
      landingDate: "1969-07-24",
      destinations: ["moon"],
      flightTimeSeconds: 691200,
      isMoonMission: true,
      eva: [
        {
          date: "1969-07-21",
          durationSeconds: 9180,
          location: "Moon — Sea of Tranquility",
          highlights: ["First human step on the Moon", "Deployed EASEP experiments", "Collected 21.6 kg of lunar samples", "Planted U.S. flag"],
        },
      ],
    },
  ],
  totalSpaceTimeSeconds: 729720,
  moonExperience: {
    isMoonwalker: true,
    landingSite: "Sea of Tranquility",
    surfaceTimeSeconds: 9180,
    didCollectSamples: true,
    didDeployExperiments: true,
    notes: "First human to walk on the Moon. Spent 2 hours 31 minutes on the lunar surface during a single EVA.",
  },
  firsts: ["First human to walk on the Moon"],
  awards: ["Presidential Medal of Freedom", "Congressional Gold Medal", "NASA Distinguished Service Medal"],
  funFacts: [
    "Armstrong's famous quote was intended to be 'one small step for a man' — the 'a' was lost in transmission.",
    "He left his childhood home's porch light on until he returned from the Moon.",
    "After Apollo 11, Armstrong rarely gave interviews and lived a very private life.",
    "He was also an accomplished glider pilot.",
  ],
  kidsExplanation: "Neil Armstrong was a brave explorer who became the very first person to walk on the Moon! On July 20, 1969, he climbed down a ladder from his spaceship and stepped onto the dusty Moon surface. He said the famous words: 'That's one small step for man, one giant leap for mankind.' He picked up Moon rocks and took pictures. After about 2 hours outside, he climbed back in. He was a real-life superhero of space!",
  researchNotes: "Armstrong's Apollo 11 EVA lasted 2h 31m 40s. The crew returned 21.6 kg of lunar material including basalt, breccia, and regolith from Mare Tranquillitatis. The EASEP (Early Apollo Surface Experiments Package) included a passive seismometer and laser ranging retro-reflector. Armstrong piloted the LM manually during the final descent, overflying the planned landing area due to boulder fields, landing with approximately 25 seconds of fuel remaining.",
  seoTitle: "Neil Armstrong: First Moonwalker — Biography, Apollo 11, Lunar Samples",
  seoDescription: "Neil Armstrong was the first human to walk on the Moon during Apollo 11. Explore his biography, missions, moonwalk experience, and what Apollo 11 brought back.",
  seoKeywords: ["Neil Armstrong", "Apollo 11", "first moonwalk", "Moon landing 1969", "astronaut biography"],
  portrait: "/images/astronauts/neil-armstrong.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const BUZZ_ALDRIN: Astronaut = {
  id: "astronaut_buzz_aldrin",
  slug: "buzz-aldrin",
  name: "Buzz Aldrin",
  givenName: "Edwin Eugene",
  familyName: "Aldrin",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1930-01-20",
  birthPlace: "Glen Ridge, New Jersey, USA",
  deathDate: null,
  deathPlace: null,
  bioShort: "American astronaut; second person to walk on the Moon during Apollo 11.",
  bioLong: "Buzz Aldrin (born Edwin Eugene Aldrin Jr.) is a former astronaut, fighter pilot, and engineer. He earned a doctorate in astronautics from MIT with a thesis on orbital rendezvous techniques that proved critical for the Gemini and Apollo programs. On Gemini 12 in 1966 he performed a record 5.5 hours of EVA. As Lunar Module Pilot on Apollo 11, he became the second person to set foot on the Moon on July 20, 1969. After NASA he became a tireless advocate for Mars exploration, authoring several books and promoting the 'Aldrin Cycler' orbital concept for sustainable Earth-Mars transit.",
  roles: ["Astronaut", "Fighter Pilot", "Engineer", "Author"],
  missions: [
    { missionId: "mission_gemini_12", role: "Pilot", launchDate: "1966-11-11", landingDate: "1966-11-15", destinations: ["leo"], flightTimeSeconds: 345600, isMoonMission: false, eva: [{ date: "1966-11-12", durationSeconds: 19800, location: "Low Earth Orbit", highlights: ["Record-breaking 5.5-hour EVA", "Proved humans could work effectively in space"] }] },
    { missionId: "mission_apollo_11", role: "Lunar Module Pilot", launchDate: "1969-07-16", landingDate: "1969-07-24", destinations: ["moon"], flightTimeSeconds: 691200, isMoonMission: true, eva: [{ date: "1969-07-21", durationSeconds: 9180, location: "Moon — Sea of Tranquility", highlights: ["Second human to walk on the Moon", "Deployed experiments", "Described the Moon as 'magnificent desolation'"] }] },
  ],
  totalSpaceTimeSeconds: 1036800,
  moonExperience: { isMoonwalker: true, landingSite: "Sea of Tranquility", surfaceTimeSeconds: 9180, didCollectSamples: true, didDeployExperiments: true, notes: "Second human to walk on the Moon. Described the landscape as 'magnificent desolation.'" },
  firsts: ["Second human to walk on the Moon", "First person with a doctoral degree to fly in space"],
  awards: ["Presidential Medal of Freedom", "NASA Distinguished Service Medal", "Legion of Merit"],
  funFacts: ["Buzz legally changed his name from Edwin — 'Buzz' was his childhood nickname.", "He punched a Moon-landing conspiracy theorist on camera in 2002.", "He proposed the 'Aldrin Cycler' for permanent Earth-Mars transit.", "At age 93 he married his long-time love on his birthday in 2023."],
  kidsExplanation: "Buzz Aldrin was the second person ever to walk on the Moon! He went with Neil Armstrong on the Apollo 11 mission. When he stepped onto the Moon, he called it 'magnificent desolation' — meaning it was beautiful but empty. He helped set up science experiments and collect Moon rocks. After coming home, Buzz spent his life telling everyone we should go to Mars next!",
  researchNotes: "Aldrin's MIT doctoral thesis (1963) on 'Line-of-Sight Guidance Techniques for Manned Orbital Rendezvous' directly influenced Gemini and Apollo rendezvous procedures. The Aldrin Cycler concept proposes a spacecraft in a permanent orbit between Earth and Mars using gravity assists, reducing propellant needs for interplanetary transit.",
  seoTitle: "Buzz Aldrin: Second Moonwalker — Apollo 11, Biography & Mars Advocacy",
  seoDescription: "Buzz Aldrin was the second human to walk on the Moon during Apollo 11. Explore his missions, moonwalk experience, and vision for Mars exploration.",
  seoKeywords: ["Buzz Aldrin", "Apollo 11", "second moonwalker", "Moon landing", "Mars exploration"],
  portrait: "/images/astronauts/buzz-aldrin.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const PETE_CONRAD: Astronaut = {
  id: "astronaut_pete_conrad",
  slug: "pete-conrad",
  name: "Charles 'Pete' Conrad Jr.",
  givenName: "Charles",
  familyName: "Conrad",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1930-06-02",
  birthPlace: "Philadelphia, Pennsylvania, USA",
  deathDate: "1999-07-08",
  deathPlace: "Ojai, California, USA",
  bioShort: "Third person to walk on the Moon during Apollo 12; known for his humor and piloting skill.",
  bioLong: "Charles 'Pete' Conrad Jr. was a NASA astronaut, aeronautical engineer, and naval officer. He flew four space missions: Gemini 5, Gemini 11, Apollo 12, and Skylab 2. On Apollo 12, he became the third person to walk on the Moon, landing within walking distance of the Surveyor 3 probe. Conrad was renowned for his wit — upon stepping onto the Moon he exclaimed: 'Whoopee! Man, that may have been a small one for Neil, but that's a long one for me!' He later commanded the first crewed Skylab mission, spending 28 days in orbit and repairing the damaged station.",
  roles: ["Astronaut", "Naval Aviator", "Test Pilot", "Engineer"],
  missions: [
    { missionId: "mission_gemini_5", role: "Pilot", launchDate: "1965-08-21", landingDate: "1965-08-29", destinations: ["leo"], flightTimeSeconds: 691200, isMoonMission: false, eva: [] },
    { missionId: "mission_gemini_11", role: "Commander", launchDate: "1966-09-12", landingDate: "1966-09-15", destinations: ["leo"], flightTimeSeconds: 259200, isMoonMission: false, eva: [] },
    { missionId: "mission_apollo_12", role: "Commander", launchDate: "1969-11-14", landingDate: "1969-11-24", destinations: ["moon"], flightTimeSeconds: 864000, isMoonMission: true, eva: [{ date: "1969-11-19", durationSeconds: 14400, location: "Moon — Ocean of Storms", highlights: ["Third human to walk on the Moon", "Pinpoint landing near Surveyor 3", "Retrieved parts from Surveyor 3 probe"] }, { date: "1969-11-20", durationSeconds: 14040, location: "Moon — Ocean of Storms", highlights: ["Deployed ALSEP experiments", "Collected 34.3 kg of lunar samples"] }] },
    { missionId: "mission_skylab_2", role: "Commander", launchDate: "1973-05-25", landingDate: "1973-06-22", destinations: ["leo"], flightTimeSeconds: 2419200, isMoonMission: false, eva: [] },
  ],
  totalSpaceTimeSeconds: 4233600,
  moonExperience: { isMoonwalker: true, landingSite: "Ocean of Storms", surfaceTimeSeconds: 28440, didCollectSamples: true, didDeployExperiments: true, notes: "Third moonwalker. Achieved first precision landing on the Moon, within 200 meters of Surveyor 3. Spent 7 hours 54 minutes outside across two EVAs." },
  firsts: ["Third human to walk on the Moon", "First precision lunar landing"],
  awards: ["Congressional Space Medal of Honor", "NASA Distinguished Service Medal"],
  funFacts: ["His first words on the Moon were 'Whoopee!' — reportedly to win a bet.", "He landed Apollo 12 so close to Surveyor 3 they could walk to it and bring back parts.", "Apollo 12 was struck by lightning twice during launch — Conrad calmly reset the systems."],
  kidsExplanation: "Pete Conrad was the third person to walk on the Moon! He was famous for being really funny. When he stepped on the Moon he yelled 'Whoopee!' His spaceship landed so close to an old robot probe that he could walk over and grab pieces of it to bring home. Pretty cool, right? He also helped fix the first American space station, Skylab!",
  researchNotes: "Apollo 12 achieved the first precision lunar landing using enhanced guidance, targeting a site within 200m of Surveyor 3 in Oceanus Procellarum. The mission returned 34.3 kg of samples including the first subsurface core samples. Parts recovered from Surveyor 3 allowed study of long-duration space exposure effects. Conrad later commanded the first crewed Skylab mission (28 days), performing critical station repairs including deploying a parasol sunshade.",
  seoTitle: "Pete Conrad: Third Moonwalker — Apollo 12, Skylab & Precision Landing",
  seoDescription: "Pete Conrad was the third human to walk on the Moon during Apollo 12, achieving the first precision lunar landing near Surveyor 3.",
  seoKeywords: ["Pete Conrad", "Apollo 12", "third moonwalker", "Surveyor 3", "Skylab"],
  portrait: "/images/astronauts/pete-conrad.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const ALAN_BEAN: Astronaut = {
  id: "astronaut_alan_bean",
  slug: "alan-bean",
  name: "Alan L. Bean",
  givenName: "Alan",
  familyName: "Bean",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1932-03-15",
  birthPlace: "Wheeler, Texas, USA",
  deathDate: "2018-05-26",
  deathPlace: "Houston, Texas, USA",
  bioShort: "Fourth person to walk on the Moon (Apollo 12); later became an acclaimed space artist.",
  bioLong: "Alan LaVern Bean was an astronaut, naval aviator, and artist. He flew on Apollo 12 as Lunar Module Pilot, becoming the fourth person to walk on the Moon. He later commanded the Skylab 3 mission, spending 59 days in space. After retiring from NASA, Bean became a painter, creating artworks depicting his lunar experiences. He mixed small amounts of actual Moon dust from his mission patches into his paintings.",
  roles: ["Astronaut", "Naval Aviator", "Test Pilot", "Artist"],
  missions: [
    { missionId: "mission_apollo_12", role: "Lunar Module Pilot", launchDate: "1969-11-14", landingDate: "1969-11-24", destinations: ["moon"], flightTimeSeconds: 864000, isMoonMission: true, eva: [{ date: "1969-11-19", durationSeconds: 14400, location: "Moon — Ocean of Storms", highlights: ["Fourth human to walk on the Moon", "Deployed lunar surface experiments"] }, { date: "1969-11-20", durationSeconds: 14040, location: "Moon — Ocean of Storms", highlights: ["Collected geological samples", "Photographed lunar features"] }] },
    { missionId: "mission_skylab_3", role: "Commander", launchDate: "1973-07-28", landingDate: "1973-09-25", destinations: ["leo"], flightTimeSeconds: 5097600, isMoonMission: false, eva: [] },
  ],
  totalSpaceTimeSeconds: 5961600,
  moonExperience: { isMoonwalker: true, landingSite: "Ocean of Storms", surfaceTimeSeconds: 28440, didCollectSamples: true, didDeployExperiments: true, notes: "Fourth person to walk on the Moon during Apollo 12." },
  firsts: ["Fourth human to walk on the Moon"],
  awards: ["NASA Distinguished Service Medal"],
  funFacts: ["After retiring from NASA he became a full-time artist painting Moon scenes.", "He mixed actual Moon dust into some of his paintings.", "He accidentally pointed the TV camera at the Sun during Apollo 12, destroying it — the mission had no live TV footage."],
  kidsExplanation: "Alan Bean was the fourth person to walk on the Moon! He went on Apollo 12 with Pete Conrad. After he came back from space, he became an artist and painted beautiful pictures of what it was like on the Moon. He even mixed tiny bits of real Moon dust into his paint!",
  researchNotes: "Bean served as LM Pilot on Apollo 12, assisting with ALSEP deployment and sample collection. He commanded Skylab 3 (SL-3), setting an endurance record of 59 days. His paintings provide unique artistic documentation of the Apollo experience, and several contain trace amounts of lunar regolith embedded in the paint medium.",
  seoTitle: "Alan Bean: Fourth Moonwalker — Apollo 12, Skylab & Moon Art",
  seoDescription: "Alan Bean walked on the Moon during Apollo 12 and later painted his lunar experiences with real Moon dust in the paint.",
  seoKeywords: ["Alan Bean", "Apollo 12", "fourth moonwalker", "Moon artist"],
  portrait: "/images/astronauts/alan-bean.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const ALAN_SHEPARD: Astronaut = {
  id: "astronaut_alan_shepard",
  slug: "alan-shepard",
  name: "Alan B. Shepard Jr.",
  givenName: "Alan",
  familyName: "Shepard",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1923-11-18",
  birthPlace: "Derry, New Hampshire, USA",
  deathDate: "1998-07-21",
  deathPlace: "Pebble Beach, California, USA",
  bioShort: "First American in space (1961); walked on the Moon during Apollo 14 and hit a golf ball on the lunar surface.",
  bioLong: "Alan Bartlett Shepard Jr. was a naval aviator, test pilot, and NASA astronaut. On May 5, 1961 he became the first American in space with a 15-minute suborbital flight aboard Freedom 7. Grounded for years by an inner-ear condition, he underwent experimental surgery and returned to flight status, commanding Apollo 14 in 1971. At age 47, he became the oldest person to walk on the Moon and famously hit two golf balls on the lunar surface.",
  roles: ["Astronaut", "Naval Aviator", "Test Pilot", "Rear Admiral"],
  missions: [
    { missionId: "mission_freedom_7", role: "Pilot", launchDate: "1961-05-05", landingDate: "1961-05-05", destinations: ["suborbital"], flightTimeSeconds: 900, isMoonMission: false, eva: [] },
    { missionId: "mission_apollo_14", role: "Commander", launchDate: "1971-01-31", landingDate: "1971-02-09", destinations: ["moon"], flightTimeSeconds: 777600, isMoonMission: true, eva: [{ date: "1971-02-05", durationSeconds: 17280, location: "Moon — Fra Mauro", highlights: ["Fifth human to walk on the Moon", "Deployed ALSEP experiments"] }, { date: "1971-02-06", durationSeconds: 17100, location: "Moon — Fra Mauro", highlights: ["Longest EVA traverse to date", "Hit two golf balls on the Moon", "Collected 42.3 kg of samples"] }] },
  ],
  totalSpaceTimeSeconds: 778500,
  moonExperience: { isMoonwalker: true, landingSite: "Fra Mauro", surfaceTimeSeconds: 34380, didCollectSamples: true, didDeployExperiments: true, notes: "Fifth moonwalker. Oldest person to walk on the Moon at age 47. Famous for hitting golf balls on the lunar surface." },
  firsts: ["First American in space", "Fifth human to walk on the Moon", "Hit a golf ball on the Moon"],
  awards: ["Congressional Space Medal of Honor", "NASA Distinguished Service Medal", "Navy Distinguished Flying Cross"],
  funFacts: ["He smuggled a makeshift 6-iron golf club head to the Moon and hit two balls.", "He was the oldest person to walk on the Moon at 47.", "He was grounded for years due to Ménière's disease but had experimental surgery to fly again.", "He wept upon seeing Earth from the Moon."],
  kidsExplanation: "Alan Shepard was the first American to go to space! He flew up in a tiny rocket in 1961. Then, 10 years later, he walked on the Moon during Apollo 14. He even hit golf balls on the Moon — they flew really far because the Moon has less gravity! He was 47 years old, making him the oldest Moon walker.",
  researchNotes: "Shepard's Freedom 7 suborbital flight reached 187.5 km altitude. Apollo 14 targeted Fra Mauro, the original Apollo 13 landing site. The mission deployed an improved ALSEP, performed the first use of a Mobile Equipment Transporter (MET), and returned 42.3 kg of samples including breccias that helped constrain the age of the Imbrium impact basin to ~3.85 Ga.",
  seoTitle: "Alan Shepard: First American in Space & Apollo 14 Moonwalker",
  seoDescription: "Alan Shepard was the first American in space and later walked on the Moon during Apollo 14, where he famously hit golf balls on the lunar surface.",
  seoKeywords: ["Alan Shepard", "Apollo 14", "first American in space", "Moon golf"],
  portrait: "/images/astronauts/alan-shepard.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const EDGAR_MITCHELL: Astronaut = {
  id: "astronaut_edgar_mitchell",
  slug: "edgar-mitchell",
  name: "Edgar D. Mitchell",
  givenName: "Edgar",
  familyName: "Mitchell",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1930-09-17",
  birthPlace: "Hereford, Texas, USA",
  deathDate: "2016-02-04",
  deathPlace: "West Palm Beach, Florida, USA",
  bioShort: "Sixth person to walk on the Moon (Apollo 14); later studied consciousness and parapsychology.",
  bioLong: "Edgar Dean Mitchell was a naval aviator, aeronautical engineer, and astronaut. As Lunar Module Pilot on Apollo 14, he became the sixth person to walk on the Moon. He and Shepard collected over 42 kg of samples during two EVAs at Fra Mauro. After NASA, Mitchell founded the Institute of Noetic Sciences and became known for his interest in consciousness research and claims of a profound spiritual experience while viewing Earth from space.",
  roles: ["Astronaut", "Naval Aviator", "Engineer"],
  missions: [
    { missionId: "mission_apollo_14", role: "Lunar Module Pilot", launchDate: "1971-01-31", landingDate: "1971-02-09", destinations: ["moon"], flightTimeSeconds: 777600, isMoonMission: true, eva: [{ date: "1971-02-05", durationSeconds: 17280, location: "Moon — Fra Mauro", highlights: ["Sixth human to walk on the Moon"] }, { date: "1971-02-06", durationSeconds: 17100, location: "Moon — Fra Mauro", highlights: ["Hiked to Cone crater rim", "Collected geological samples"] }] },
  ],
  totalSpaceTimeSeconds: 777600,
  moonExperience: { isMoonwalker: true, landingSite: "Fra Mauro", surfaceTimeSeconds: 34380, didCollectSamples: true, didDeployExperiments: true, notes: "Sixth moonwalker. Reported a profound 'overview effect' viewing Earth from the Moon." },
  firsts: ["Sixth human to walk on the Moon"],
  awards: ["Presidential Medal of Freedom", "NASA Distinguished Service Medal"],
  funFacts: ["He secretly conducted ESP experiments during the Apollo 14 mission.", "He described an 'explosion of awareness' seeing Earth from space.", "He founded the Institute of Noetic Sciences to study consciousness."],
  kidsExplanation: "Edgar Mitchell was the sixth person to walk on the Moon! He went with Alan Shepard on Apollo 14. When he looked back at Earth from the Moon, he felt something amazing — like the whole universe was connected. After he came home, he started studying how the mind works!",
  researchNotes: "Mitchell's Apollo 14 EVAs covered approximately 3.3 km traverse distance. The crew came within 20 meters of Cone crater rim but could not confirm visual identification due to terrain. The mission returned breccia samples that constrained the Imbrium basin formation age.",
  seoTitle: "Edgar Mitchell: Sixth Moonwalker — Apollo 14 & Consciousness Research",
  seoDescription: "Edgar Mitchell was the sixth human to walk on the Moon during Apollo 14. Explore his moonwalk, samples collected, and post-NASA consciousness research.",
  seoKeywords: ["Edgar Mitchell", "Apollo 14", "sixth moonwalker"],
  portrait: "/images/astronauts/edgar-mitchell.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const DAVID_SCOTT: Astronaut = {
  id: "astronaut_david_scott",
  slug: "david-scott",
  name: "David R. Scott",
  givenName: "David",
  familyName: "Scott",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1932-06-06",
  birthPlace: "San Antonio, Texas, USA",
  deathDate: null,
  deathPlace: null,
  bioShort: "Seventh person to walk on the Moon (Apollo 15); first to use the Lunar Roving Vehicle.",
  bioLong: "David Randolph Scott is a retired astronaut and engineer who flew three space missions: Gemini 8, Apollo 9, and Apollo 15. On Apollo 15 he became the seventh person to walk on the Moon and the first to drive the Lunar Roving Vehicle. He performed the famous 'hammer and feather' experiment on live television, demonstrating that objects fall at the same rate in vacuum regardless of mass — confirming Galileo's theory on the Moon.",
  roles: ["Astronaut", "Test Pilot", "Engineer", "Colonel USAF"],
  missions: [
    { missionId: "mission_gemini_8", role: "Pilot", launchDate: "1966-03-16", landingDate: "1966-03-17", destinations: ["leo"], flightTimeSeconds: 38520, isMoonMission: false, eva: [] },
    { missionId: "mission_apollo_9", role: "Command Module Pilot", launchDate: "1969-03-03", landingDate: "1969-03-13", destinations: ["leo"], flightTimeSeconds: 864000, isMoonMission: false, eva: [] },
    { missionId: "mission_apollo_15", role: "Commander", launchDate: "1971-07-26", landingDate: "1971-08-07", destinations: ["moon"], flightTimeSeconds: 1036800, isMoonMission: true, eva: [{ date: "1971-07-31", durationSeconds: 23400, location: "Moon — Hadley-Apennine", highlights: ["Seventh human on the Moon", "First use of Lunar Roving Vehicle"] }, { date: "1971-08-01", durationSeconds: 25200, location: "Moon — Hadley-Apennine", highlights: ["Drove LRV to Hadley Rille", "Discovered Genesis Rock"] }, { date: "1971-08-02", durationSeconds: 17640, location: "Moon — Hadley-Apennine", highlights: ["Hammer-and-feather experiment", "Collected 77 kg of samples"] }] },
  ],
  totalSpaceTimeSeconds: 1939320,
  moonExperience: { isMoonwalker: true, landingSite: "Hadley-Apennine", surfaceTimeSeconds: 66240, didCollectSamples: true, didDeployExperiments: true, notes: "Seventh moonwalker. First to drive the Lunar Roving Vehicle. Performed the famous hammer-and-feather experiment. Discovered the Genesis Rock." },
  firsts: ["Seventh human to walk on the Moon", "First to drive the Lunar Roving Vehicle on the Moon", "Performed hammer-and-feather experiment on the Moon"],
  awards: ["NASA Distinguished Service Medal"],
  funFacts: ["He dropped a hammer and feather simultaneously on the Moon to prove Galileo right on live TV.", "The Genesis Rock (sample 15415) he found is ~4.1 billion years old.", "He drove the first car on the Moon — the Lunar Roving Vehicle."],
  kidsExplanation: "David Scott was the seventh person to walk on the Moon, and he got to drive the very first car on the Moon — the Lunar Rover! He did a cool experiment where he dropped a hammer and a feather at the same time. On Earth the hammer falls faster, but on the Moon (with no air) they hit the ground at the same time! He proved what the scientist Galileo said 400 years earlier.",
  researchNotes: "Apollo 15 was the first 'J-mission' with extended surface stays and the Lunar Roving Vehicle. Scott's crew spent 66h 55m on the surface with 18h 35m total EVA time. The LRV enabled traverses up to 5 km from the LM. Sample 15415 ('Genesis Rock') is an anorthosite dated to ~4.1 Ga, providing evidence for the lunar magma ocean hypothesis. The hammer-and-feather demonstration confirmed equivalence of gravitational and inertial mass in vacuum.",
  seoTitle: "David Scott: Seventh Moonwalker — Apollo 15, Lunar Rover & Genesis Rock",
  seoDescription: "David Scott was the seventh person on the Moon and the first to drive the Lunar Roving Vehicle during Apollo 15.",
  seoKeywords: ["David Scott", "Apollo 15", "Lunar Rover", "Genesis Rock", "hammer and feather"],
  portrait: "/images/astronauts/david-scott.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const JAMES_IRWIN: Astronaut = {
  id: "astronaut_james_irwin",
  slug: "james-irwin",
  name: "James B. Irwin",
  givenName: "James",
  familyName: "Irwin",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1930-03-17",
  birthPlace: "Pittsburgh, Pennsylvania, USA",
  deathDate: "1991-08-08",
  deathPlace: "Glenwood Springs, Colorado, USA",
  bioShort: "Eighth person to walk on the Moon (Apollo 15); co-discovered the Genesis Rock.",
  bioLong: "James Benson Irwin was an astronaut, aeronautical engineer, and Air Force test pilot. He served as Lunar Module Pilot on Apollo 15, becoming the eighth person to walk on the Moon. Alongside David Scott, he helped discover the Genesis Rock and explored the Hadley-Apennine region using the Lunar Roving Vehicle. After retiring from NASA, Irwin became a motivational speaker and founded the High Flight Foundation.",
  roles: ["Astronaut", "Test Pilot", "Engineer"],
  missions: [
    { missionId: "mission_apollo_15", role: "Lunar Module Pilot", launchDate: "1971-07-26", landingDate: "1971-08-07", destinations: ["moon"], flightTimeSeconds: 1036800, isMoonMission: true, eva: [{ date: "1971-07-31", durationSeconds: 23400, location: "Moon — Hadley-Apennine", highlights: ["Eighth human on the Moon"] }, { date: "1971-08-01", durationSeconds: 25200, location: "Moon — Hadley-Apennine", highlights: ["Co-discovered Genesis Rock"] }, { date: "1971-08-02", durationSeconds: 17640, location: "Moon — Hadley-Apennine", highlights: ["Final EVA, collected samples"] }] },
  ],
  totalSpaceTimeSeconds: 1036800,
  moonExperience: { isMoonwalker: true, landingSite: "Hadley-Apennine", surfaceTimeSeconds: 66240, didCollectSamples: true, didDeployExperiments: true, notes: "Eighth moonwalker. Experienced cardiac arrhythmia while on the Moon — first recorded heart irregularity in space." },
  firsts: ["Eighth human to walk on the Moon"],
  awards: ["NASA Distinguished Service Medal"],
  funFacts: ["He had a minor heart irregularity while on the Moon — the first cardiac event ever recorded in space.", "He described standing on the Moon as a deeply spiritual experience.", "After NASA he led several expeditions to Mount Ararat."],
  kidsExplanation: "James Irwin was the eighth person to walk on the Moon! He went with David Scott on Apollo 15 and helped find the famous Genesis Rock — one of the oldest Moon rocks ever discovered. He said walking on the Moon felt like a very special, spiritual experience.",
  researchNotes: "Irwin experienced premature ventricular contractions (PVCs) during lunar surface activities — the first documented cardiac arrhythmia during spaceflight. This led to enhanced biomedical monitoring protocols for subsequent missions. He co-discovered sample 15415 and contributed to ALSEP deployment.",
  seoTitle: "James Irwin: Eighth Moonwalker — Apollo 15 & Genesis Rock Discovery",
  seoDescription: "James Irwin was the eighth person on the Moon during Apollo 15, helping discover the 4.1-billion-year-old Genesis Rock.",
  seoKeywords: ["James Irwin", "Apollo 15", "eighth moonwalker", "Genesis Rock"],
  portrait: "/images/astronauts/james-irwin.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const JOHN_YOUNG: Astronaut = {
  id: "astronaut_john_young",
  slug: "john-young",
  name: "John W. Young",
  givenName: "John",
  familyName: "Young",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1930-09-24",
  birthPlace: "San Francisco, California, USA",
  deathDate: "2018-01-05",
  deathPlace: "Houston, Texas, USA",
  bioShort: "Ninth person to walk on the Moon (Apollo 16); flew six space missions across Gemini, Apollo, and Shuttle.",
  bioLong: "John Watts Young had the longest career of any astronaut, spanning Gemini, Apollo, and Space Shuttle programs across 42 years. He flew six missions: Gemini 3, Gemini 10, Apollo 10, Apollo 16, STS-1, and STS-9. On Apollo 16 he became the ninth person to walk on the Moon. He later commanded STS-1, the first Space Shuttle flight, and STS-9/Spacelab 1. Young served as Chief of the Astronaut Office for over a decade.",
  roles: ["Astronaut", "Naval Aviator", "Test Pilot", "Chief of Astronaut Office"],
  missions: [
    { missionId: "mission_gemini_3", role: "Pilot", launchDate: "1965-03-23", landingDate: "1965-03-23", destinations: ["leo"], flightTimeSeconds: 17400, isMoonMission: false, eva: [] },
    { missionId: "mission_gemini_10", role: "Commander", launchDate: "1966-07-18", landingDate: "1966-07-21", destinations: ["leo"], flightTimeSeconds: 259200, isMoonMission: false, eva: [] },
    { missionId: "mission_apollo_10", role: "Command Module Pilot", launchDate: "1969-05-18", landingDate: "1969-05-26", destinations: ["lunar_orbit"], flightTimeSeconds: 691200, isMoonMission: false, eva: [] },
    { missionId: "mission_apollo_16", role: "Commander", launchDate: "1972-04-16", landingDate: "1972-04-27", destinations: ["moon"], flightTimeSeconds: 950400, isMoonMission: true, eva: [{ date: "1972-04-21", durationSeconds: 25560, location: "Moon — Descartes Highlands", highlights: ["Ninth human to walk on the Moon", "Deployed ALSEP"] }, { date: "1972-04-22", durationSeconds: 25560, location: "Moon — Descartes Highlands", highlights: ["Used LRV to explore Stone Mountain area"] }, { date: "1972-04-23", durationSeconds: 20340, location: "Moon — Descartes Highlands", highlights: ["Collected 95.8 kg of samples"] }] },
    { missionId: "mission_sts_1", role: "Commander", launchDate: "1981-04-12", landingDate: "1981-04-14", destinations: ["leo"], flightTimeSeconds: 196200, isMoonMission: false, eva: [] },
    { missionId: "mission_sts_9", role: "Commander", launchDate: "1983-11-28", landingDate: "1983-12-08", destinations: ["leo"], flightTimeSeconds: 864000, isMoonMission: false, eva: [] },
  ],
  totalSpaceTimeSeconds: 2978400,
  moonExperience: { isMoonwalker: true, landingSite: "Descartes Highlands", surfaceTimeSeconds: 71460, didCollectSamples: true, didDeployExperiments: true, notes: "Ninth moonwalker. Drove the Lunar Rover for 26.7 km across the Descartes Highlands." },
  firsts: ["Ninth human to walk on the Moon", "Commander of first Space Shuttle mission (STS-1)", "Only person to fly Gemini, Apollo, and Shuttle"],
  awards: ["Congressional Space Medal of Honor", "NASA Distinguished Service Medal"],
  funFacts: ["He smuggled a corned beef sandwich onto Gemini 3.", "He's the only person to fly spacecraft from three different programs.", "He jumped 3 feet off the Moon doing a 'Big Navy salute' while being photographed.", "He was still working at NASA at age 87."],
  kidsExplanation: "John Young is one of the most experienced astronauts ever! He flew SIX space missions — more than almost anyone. He walked on the Moon during Apollo 16 and later flew the very first Space Shuttle. He once smuggled a sandwich into space on Gemini 3! He worked at NASA for 42 years.",
  researchNotes: "Apollo 16 explored the Descartes Highlands, originally expected to be volcanic. Samples revealed the terrain was actually impact breccias, significantly revising lunar geological models. The crew drove the LRV 26.7 km total and collected 95.8 kg of material. Young's STS-1 flight validated the Shuttle thermal protection system and approach/landing profile.",
  seoTitle: "John Young: Ninth Moonwalker — Apollo 16, STS-1 & Six Space Missions",
  seoDescription: "John Young walked on the Moon during Apollo 16 and commanded the first Space Shuttle flight. The only person to fly Gemini, Apollo, and Shuttle.",
  seoKeywords: ["John Young", "Apollo 16", "STS-1", "ninth moonwalker", "Space Shuttle"],
  portrait: "/images/astronauts/john-young.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const CHARLES_DUKE: Astronaut = {
  id: "astronaut_charles_duke",
  slug: "charles-duke",
  name: "Charles M. Duke Jr.",
  givenName: "Charles",
  familyName: "Duke",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1935-10-03",
  birthPlace: "Charlotte, North Carolina, USA",
  deathDate: null,
  deathPlace: null,
  bioShort: "Tenth person to walk on the Moon (Apollo 16); youngest moonwalker at age 36.",
  bioLong: "Charles Moss Duke Jr. is a retired astronaut, Air Force brigadier general, and test pilot. He served as Lunar Module Pilot on Apollo 16 in 1972, becoming the tenth and youngest person to walk on the Moon at age 36. He was also the CAPCOM during Apollo 11's landing, and his excited voice saying 'Roger, Tranquility, we copy you on the ground' became iconic. On the Moon, Duke left a family photograph on the lunar surface.",
  roles: ["Astronaut", "Test Pilot", "Brigadier General USAF"],
  missions: [
    { missionId: "mission_apollo_16", role: "Lunar Module Pilot", launchDate: "1972-04-16", landingDate: "1972-04-27", destinations: ["moon"], flightTimeSeconds: 950400, isMoonMission: true, eva: [{ date: "1972-04-21", durationSeconds: 25560, location: "Moon — Descartes Highlands", highlights: ["Tenth human to walk on the Moon", "Youngest moonwalker at 36"] }, { date: "1972-04-22", durationSeconds: 25560, location: "Moon — Descartes Highlands", highlights: ["Drove LRV, explored craters"] }, { date: "1972-04-23", durationSeconds: 20340, location: "Moon — Descartes Highlands", highlights: ["Left family photo on the Moon", "Collected samples"] }] },
  ],
  totalSpaceTimeSeconds: 950400,
  moonExperience: { isMoonwalker: true, landingSite: "Descartes Highlands", surfaceTimeSeconds: 71460, didCollectSamples: true, didDeployExperiments: true, notes: "Tenth moonwalker. Youngest person to walk on the Moon at age 36. Left a family photograph on the lunar surface." },
  firsts: ["Tenth human to walk on the Moon", "Youngest moonwalker (age 36)"],
  awards: ["NASA Distinguished Service Medal"],
  funFacts: ["He left a photo of his family on the Moon — it's still there.", "He was CAPCOM for Apollo 11 and his excited voice is in the famous landing audio.", "At 36, he was the youngest person to walk on the Moon.", "He nearly died when he fell while jumping on the Moon and almost cracked his life-support backpack."],
  kidsExplanation: "Charles Duke was the youngest person to walk on the Moon — he was only 36! He went on Apollo 16 and explored the Moon's highlands. He left a special photo of his family on the Moon's surface, and it's still sitting there today! He was also the person on the radio talking to Neil Armstrong when Apollo 11 landed.",
  researchNotes: "Duke served as CAPCOM for Apollo 11 and LM Pilot for Apollo 16. The Descartes mission disproved the volcanic origin hypothesis for the lunar highlands. Duke participated in 20h 14m of EVA across three excursions. He nearly suffered a suit breach after a fall during a high-jump experiment, impacting his PLSS.",
  seoTitle: "Charles Duke: Youngest Moonwalker — Apollo 16, CAPCOM for Apollo 11",
  seoDescription: "Charles Duke was the youngest person to walk on the Moon during Apollo 16 at age 36. He was also CAPCOM for the Apollo 11 Moon landing.",
  seoKeywords: ["Charles Duke", "Apollo 16", "youngest moonwalker", "CAPCOM Apollo 11"],
  portrait: "/images/astronauts/charles-duke.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const GENE_CERNAN: Astronaut = {
  id: "astronaut_gene_cernan",
  slug: "gene-cernan",
  name: "Eugene A. Cernan",
  givenName: "Eugene",
  familyName: "Cernan",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1934-03-14",
  birthPlace: "Chicago, Illinois, USA",
  deathDate: "2017-01-16",
  deathPlace: "Houston, Texas, USA",
  bioShort: "Last person to walk on the Moon (Apollo 17); spent the most time on the lunar surface.",
  bioLong: "Eugene Andrew Cernan was a naval aviator, engineer, and astronaut who flew three space missions. On Gemini 9A he performed a difficult EVA. On Apollo 10 he flew to within 15.6 km of the Moon's surface as a rehearsal for the first landing. On Apollo 17 in December 1972, he commanded the final Apollo lunar mission, becoming the eleventh person — and the last — to walk on the Moon. Before climbing the ladder for the last time, Cernan traced his daughter's initials 'TDC' in the lunar dust.",
  roles: ["Astronaut", "Naval Aviator", "Engineer", "Captain USN"],
  missions: [
    { missionId: "mission_gemini_9a", role: "Pilot", launchDate: "1966-06-03", landingDate: "1966-06-06", destinations: ["leo"], flightTimeSeconds: 259200, isMoonMission: false, eva: [{ date: "1966-06-05", durationSeconds: 7980, location: "Low Earth Orbit", highlights: ["128-minute EVA"] }] },
    { missionId: "mission_apollo_10", role: "Lunar Module Pilot", launchDate: "1969-05-18", landingDate: "1969-05-26", destinations: ["lunar_orbit"], flightTimeSeconds: 691200, isMoonMission: false, eva: [] },
    { missionId: "mission_apollo_17", role: "Commander", launchDate: "1972-12-07", landingDate: "1972-12-19", destinations: ["moon"], flightTimeSeconds: 1036800, isMoonMission: true, eva: [{ date: "1972-12-11", durationSeconds: 25560, location: "Moon — Taurus-Littrow", highlights: ["Eleventh human to walk on the Moon", "Deployed ALSEP, drove LRV"] }, { date: "1972-12-12", durationSeconds: 25200, location: "Moon — Taurus-Littrow", highlights: ["Explored South Massif", "Found orange soil"] }, { date: "1972-12-13", durationSeconds: 25740, location: "Moon — Taurus-Littrow", highlights: ["Last human to walk on the Moon", "Traced daughter's initials in dust", "Collected 110.5 kg of samples"] }] },
  ],
  totalSpaceTimeSeconds: 1987200,
  moonExperience: { isMoonwalker: true, landingSite: "Taurus-Littrow", surfaceTimeSeconds: 76500, didCollectSamples: true, didDeployExperiments: true, notes: "Last person to walk on the Moon. Holds the record for longest total lunar surface EVA time (22h 4m). Traced his daughter's initials 'TDC' in the lunar dust." },
  firsts: ["Eleventh human to walk on the Moon", "Last human to walk on the Moon (as of 2026)"],
  awards: ["NASA Distinguished Service Medal", "Navy Distinguished Service Medal"],
  funFacts: ["Before leaving the Moon, he traced his daughter Tracy's initials 'TDC' in the dust — they're still there.", "His last words on the Moon: 'We leave as we came and, God willing, as we shall return, with peace and hope for all mankind.'", "Apollo 17 discovered orange volcanic soil on the Moon.", "He held the speed record for the Lunar Rover: 18 km/h."],
  kidsExplanation: "Gene Cernan was the LAST person to walk on the Moon! He went on Apollo 17 in December 1972. Before leaving, he wrote his daughter Tracy's initials in the Moon dust — T.D.C. — and they're still there because there's no wind on the Moon! He said he hoped humans would come back someday. He collected the most Moon rocks of any mission — 110.5 kg!",
  researchNotes: "Apollo 17 was the only lunar mission to include a professional geologist (Schmitt). Cernan and Schmitt spent 22h 4m outside across three EVAs and drove the LRV 35.9 km. The discovery of orange soil (sample 74220) at Shorty crater represented pyroclastic volcanic glass beads ~3.7 Ga old, evidence for ancient lunar volcanism. The mission returned 110.5 kg of samples, the largest collection of any Apollo mission.",
  seoTitle: "Gene Cernan: Last Person on the Moon — Apollo 17, Records & Legacy",
  seoDescription: "Gene Cernan was the last human to walk on the Moon during Apollo 17 in 1972. He holds records for longest EVA time and most samples returned.",
  seoKeywords: ["Gene Cernan", "Apollo 17", "last moonwalker", "Taurus-Littrow"],
  portrait: "/images/astronauts/gene-cernan.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const HARRISON_SCHMITT: Astronaut = {
  id: "astronaut_harrison_schmitt",
  slug: "harrison-schmitt",
  name: "Harrison H. Schmitt",
  givenName: "Harrison",
  familyName: "Schmitt",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1935-07-03",
  birthPlace: "Santa Rita, New Mexico, USA",
  deathDate: null,
  deathPlace: null,
  bioShort: "Twelfth and last person to walk on the Moon (Apollo 17); only professional geologist to visit the Moon.",
  bioLong: "Harrison Hagan 'Jack' Schmitt is a geologist, retired astronaut, and former U.S. Senator. He is the only professional scientist (a geologist with a PhD from Harvard) to have walked on the Moon. As Lunar Module Pilot on Apollo 17, he became the twelfth and last person to walk on the lunar surface. He discovered orange volcanic soil at Shorty crater, one of the most significant geological finds of the program. After NASA, he served as a U.S. Senator for New Mexico (1977–1983).",
  roles: ["Astronaut", "Geologist", "U.S. Senator"],
  missions: [
    { missionId: "mission_apollo_17", role: "Lunar Module Pilot", launchDate: "1972-12-07", landingDate: "1972-12-19", destinations: ["moon"], flightTimeSeconds: 1036800, isMoonMission: true, eva: [{ date: "1972-12-11", durationSeconds: 25560, location: "Moon — Taurus-Littrow", highlights: ["Twelfth human to walk on the Moon", "Only geologist on the Moon"] }, { date: "1972-12-12", durationSeconds: 25200, location: "Moon — Taurus-Littrow", highlights: ["Discovered orange soil at Shorty crater"] }, { date: "1972-12-13", durationSeconds: 25740, location: "Moon — Taurus-Littrow", highlights: ["Final lunar EVA in human history"] }] },
  ],
  totalSpaceTimeSeconds: 1036800,
  moonExperience: { isMoonwalker: true, landingSite: "Taurus-Littrow", surfaceTimeSeconds: 76500, didCollectSamples: true, didDeployExperiments: true, notes: "Twelfth and final moonwalker. Only professional geologist to visit the Moon. Discovered orange volcanic soil at Shorty crater." },
  firsts: ["Twelfth and last human to walk on the Moon", "Only professional scientist to walk on the Moon"],
  awards: ["NASA Distinguished Service Medal"],
  funFacts: ["He's the only geologist to study rocks on another world — in person.", "He discovered orange volcanic soil on the Moon that was 3.7 billion years old.", "After NASA he was elected U.S. Senator for New Mexico.", "He had the first reported 'lunar hay fever' — Moon dust irritated his sinuses."],
  kidsExplanation: "Harrison Schmitt was the twelfth and LAST person to walk on the Moon, and he was a real rock scientist — a geologist! He knew exactly what to look for. He found orange dirt on the Moon that turned out to be from ancient volcanoes billions of years ago. He's the only scientist to ever study rocks on another world by actually being there!",
  researchNotes: "Schmitt's geological training enabled real-time field identification of significant samples. His discovery of orange soil (pyroclastic glass beads, sample 74220) at Shorty crater provided key evidence for ancient lunar volcanic fire-fountaining ~3.7 Ga. The glass beads contain volatile elements (zinc, lead, chlorine) indicating a volatile-rich lunar interior, challenging the then-prevailing view of a completely degassed Moon.",
  seoTitle: "Harrison Schmitt: Last Moonwalker & Only Geologist on the Moon — Apollo 17",
  seoDescription: "Harrison Schmitt is the only geologist to walk on the Moon. During Apollo 17 he discovered orange volcanic soil, reshaping lunar science.",
  seoKeywords: ["Harrison Schmitt", "Apollo 17", "twelfth moonwalker", "Moon geologist", "orange soil"],
  portrait: "/images/astronauts/harrison-schmitt.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

// ──── NOTABLE NON-MOONWALKER ASTRONAUTS ────

const MICHAEL_COLLINS: Astronaut = {
  id: "astronaut_michael_collins",
  slug: "michael-collins",
  name: "Michael Collins",
  givenName: "Michael",
  familyName: "Collins",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1930-10-31",
  birthPlace: "Rome, Italy",
  deathDate: "2021-04-28",
  deathPlace: "Naples, Florida, USA",
  bioShort: "Apollo 11 Command Module Pilot; orbited the Moon alone while Armstrong and Aldrin walked on the surface.",
  bioLong: "Michael Collins was an astronaut, test pilot, and major general. He flew on Gemini 10 and Apollo 11. During Apollo 11 he remained in lunar orbit aboard Columbia while Armstrong and Aldrin descended to the surface, making him 'the loneliest person in history' when he orbited behind the Moon, completely cut off from all communication. He later served as director of the National Air and Space Museum and wrote the acclaimed autobiography 'Carrying the Fire.'",
  roles: ["Astronaut", "Test Pilot", "Major General USAF", "Museum Director"],
  missions: [
    { missionId: "mission_gemini_10", role: "Pilot", launchDate: "1966-07-18", landingDate: "1966-07-21", destinations: ["leo"], flightTimeSeconds: 259200, isMoonMission: false, eva: [{ date: "1966-07-19", durationSeconds: 2940, location: "Low Earth Orbit", highlights: ["Spacewalk to retrieve experiment from Agena vehicle"] }] },
    { missionId: "mission_apollo_11", role: "Command Module Pilot", launchDate: "1969-07-16", landingDate: "1969-07-24", destinations: ["lunar_orbit"], flightTimeSeconds: 691200, isMoonMission: false, eva: [] },
  ],
  totalSpaceTimeSeconds: 950400,
  moonExperience: null,
  firsts: ["Orbited the Moon alone during Apollo 11"],
  awards: ["Presidential Medal of Freedom", "Congressional Gold Medal"],
  funFacts: ["He was called 'the loneliest man in history' while orbiting the Moon alone.", "He designed the Apollo 11 mission patch (the eagle with an olive branch).", "He said he did not feel lonely — he felt 'awareness, anticipation, satisfaction, confidence, almost exultation.'", "He wrote one of the best astronaut autobiographies: 'Carrying the Fire.'"],
  kidsExplanation: "Michael Collins was the astronaut who stayed in the spaceship flying around the Moon while Neil and Buzz walked on it. Someone had to keep the ship ready to bring them home! When he flew behind the Moon, he was completely alone — further from any other human than anyone in history. But he wasn't scared — he said he felt excited!",
  researchNotes: "Collins performed solo operations of the Command Module Columbia during 21.5 hours of solo lunar orbit. He conducted landmark tracking, photographed potential future landing sites, and maintained the spacecraft. His autobiography 'Carrying the Fire' (1974) is considered one of the finest firsthand accounts of spaceflight.",
  seoTitle: "Michael Collins: Apollo 11 Command Module Pilot — The Loneliest Man",
  seoDescription: "Michael Collins orbited the Moon alone during Apollo 11 while Armstrong and Aldrin walked on the surface. Explore his story.",
  seoKeywords: ["Michael Collins", "Apollo 11", "Command Module Pilot", "loneliest man"],
  portrait: "/images/astronauts/michael-collins.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const YURI_GAGARIN: Astronaut = {
  id: "astronaut_yuri_gagarin",
  slug: "yuri-gagarin",
  name: "Yuri A. Gagarin",
  givenName: "Yuri",
  familyName: "Gagarin",
  nationality: "Soviet Union",
  agency: "Soviet Space Program",
  birthDate: "1934-03-09",
  birthPlace: "Klushino, Smolensk Oblast, Russia",
  deathDate: "1968-03-27",
  deathPlace: "Kirzhach, Vladimir Oblast, Russia",
  bioShort: "First human in space (April 12, 1961); completed one orbit of Earth aboard Vostok 1.",
  bioLong: "Yuri Alekseyevich Gagarin was a Soviet pilot and cosmonaut who became the first human to journey into outer space. On April 12, 1961, his Vostok 1 spacecraft completed one orbit of Earth in 108 minutes. He became an international hero and symbol of the Space Age. Gagarin died in a training jet crash on March 27, 1968 at age 34. April 12 is now celebrated worldwide as Yuri's Night and the International Day of Human Space Flight.",
  roles: ["Cosmonaut", "Pilot", "Colonel"],
  missions: [
    { missionId: "mission_vostok_1", role: "Pilot", launchDate: "1961-04-12", landingDate: "1961-04-12", destinations: ["leo"], flightTimeSeconds: 6480, isMoonMission: false, eva: [] },
  ],
  totalSpaceTimeSeconds: 6480,
  moonExperience: null,
  firsts: ["First human in space", "First human to orbit Earth"],
  awards: ["Hero of the Soviet Union", "Order of Lenin"],
  funFacts: ["His famous words during launch were 'Poyekhali!' (Let's go!).", "He ejected from his capsule at 7 km altitude and parachuted to the ground separately.", "April 12 is celebrated globally as 'Yuri's Night.'", "He was only 27 years old when he flew."],
  kidsExplanation: "Yuri Gagarin was the first person EVER to go to space! On April 12, 1961, he flew around the whole Earth in a tiny spaceship called Vostok 1. The trip took only 108 minutes. When the rocket launched, he said 'Poyekhali!' which means 'Let's go!' in Russian. He was only 27 years old and became the most famous person in the world!",
  researchNotes: "Vostok 1 achieved an orbit of 169 × 327 km with an inclination of 64.95°. The spacecraft was fully automated; Gagarin had limited manual control capability. Re-entry was nominal but the service module failed to fully separate, causing tumbling before aerodynamic forces stabilized the capsule. Gagarin ejected at ~7 km altitude per the mission plan and landed separately from the capsule near Engels, Saratov Oblast.",
  seoTitle: "Yuri Gagarin: First Human in Space — Vostok 1, Biography & Legacy",
  seoDescription: "Yuri Gagarin became the first human in space on April 12, 1961 aboard Vostok 1. Explore his historic flight, biography, and legacy.",
  seoKeywords: ["Yuri Gagarin", "first human in space", "Vostok 1", "space history"],
  portrait: "/images/astronauts/yuri-gagarin.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const SALLY_RIDE: Astronaut = {
  id: "astronaut_sally_ride",
  slug: "sally-ride",
  name: "Sally K. Ride",
  givenName: "Sally",
  familyName: "Ride",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1951-05-26",
  birthPlace: "Los Angeles, California, USA",
  deathDate: "2012-07-23",
  deathPlace: "La Jolla, California, USA",
  bioShort: "First American woman in space (1983); physicist and champion of STEM education.",
  bioLong: "Sally Kristen Ride was a physicist and astronaut who became the first American woman in space on June 18, 1983 aboard STS-7. She flew again on STS-41-G in 1984. After NASA, she became a physics professor at UC San Diego and founded Sally Ride Science, an organization dedicated to inspiring young people — especially girls — in STEM fields. She remains one of the most admired figures in space exploration history.",
  roles: ["Astronaut", "Physicist", "Professor", "STEM Educator"],
  missions: [
    { missionId: "mission_sts_7", role: "Mission Specialist", launchDate: "1983-06-18", landingDate: "1983-06-24", destinations: ["leo"], flightTimeSeconds: 518400, isMoonMission: false, eva: [] },
    { missionId: "mission_sts_41g", role: "Mission Specialist", launchDate: "1984-10-05", landingDate: "1984-10-13", destinations: ["leo"], flightTimeSeconds: 691200, isMoonMission: false, eva: [] },
  ],
  totalSpaceTimeSeconds: 1209600,
  moonExperience: null,
  firsts: ["First American woman in space"],
  awards: ["NASA Space Flight Medal", "Presidential Medal of Freedom (posthumous)", "National Space Society's von Braun Award"],
  funFacts: ["She was selected from over 8,000 applicants for NASA's astronaut class.", "She operated the Shuttle's robotic arm (Canadarm) to deploy satellites.", "She founded Sally Ride Science to get kids excited about STEM.", "She was also a nationally ranked tennis player."],
  kidsExplanation: "Sally Ride was the first American woman to go to space! She flew on the Space Shuttle in 1983 when she was 32 years old. She was a scientist who studied physics. After being an astronaut, she spent her life helping kids — especially girls — get excited about science and math. She showed everyone that anyone can reach for the stars!",
  researchNotes: "Ride's STS-7 mission deployed two communications satellites and carried the first OSTA-2 payload. She operated the Shuttle Remote Manipulator System to deploy and retrieve the SPAS-01 satellite — the first use of the robotic arm for satellite deployment. She served on the Presidential Commission investigating the Challenger disaster and authored the 'Ride Report' on NASA's future strategic direction.",
  seoTitle: "Sally Ride: First American Woman in Space — STS-7, Biography & Legacy",
  seoDescription: "Sally Ride became the first American woman in space in 1983. Explore her missions, contributions to STEM education, and lasting legacy.",
  seoKeywords: ["Sally Ride", "first American woman in space", "STS-7", "STEM education"],
  portrait: "/images/astronauts/sally-ride.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const CHRIS_HADFIELD: Astronaut = {
  id: "astronaut_chris_hadfield",
  slug: "chris-hadfield",
  name: "Chris A. Hadfield",
  givenName: "Chris",
  familyName: "Hadfield",
  nationality: "Canada",
  agency: "CSA",
  birthDate: "1959-08-29",
  birthPlace: "Sarnia, Ontario, Canada",
  deathDate: null,
  deathPlace: null,
  bioShort: "First Canadian to walk in space; commanded the ISS and famously performed 'Space Oddity' in orbit.",
  bioLong: "Chris Austin Hadfield is a retired Canadian astronaut, engineer, and former fighter pilot. He was the first Canadian to walk in space during STS-100, and became the first Canadian commander of the International Space Station during Expedition 35. He is known worldwide for his social media engagement from space and his viral cover of David Bowie's 'Space Oddity' recorded aboard the ISS. He has since become a bestselling author and science communicator.",
  roles: ["Astronaut", "Fighter Pilot", "Engineer", "Author"],
  missions: [
    { missionId: "mission_sts_74", role: "Mission Specialist", launchDate: "1995-11-12", landingDate: "1995-11-20", destinations: ["leo"], flightTimeSeconds: 691200, isMoonMission: false, eva: [] },
    { missionId: "mission_sts_100", role: "Mission Specialist", launchDate: "2001-04-19", landingDate: "2001-05-01", destinations: ["leo"], flightTimeSeconds: 1036800, isMoonMission: false, eva: [{ date: "2001-04-22", durationSeconds: 25200, location: "ISS", highlights: ["First Canadian spacewalk", "Installed Canadarm2 on ISS"] }] },
    { missionId: "mission_expedition_35", role: "Commander", launchDate: "2012-12-19", landingDate: "2013-05-13", destinations: ["leo"], flightTimeSeconds: 12614400, isMoonMission: false, eva: [] },
  ],
  totalSpaceTimeSeconds: 14342400,
  moonExperience: null,
  firsts: ["First Canadian to walk in space", "First Canadian commander of the ISS"],
  awards: ["Order of Canada", "NASA Exceptional Service Medal", "Meritorious Service Cross"],
  funFacts: ["His cover of 'Space Oddity' filmed on the ISS has over 50 million YouTube views.", "He installed the Canadarm2 robotic arm on the ISS during his spacewalk.", "He wrote the bestseller 'An Astronaut's Guide to Life on Earth.'", "He was temporarily blinded during his first spacewalk when anti-fog solution got into his eyes."],
  kidsExplanation: "Chris Hadfield is a Canadian astronaut who became super famous for singing and playing guitar on the International Space Station! He recorded a song called 'Space Oddity' while floating in space, and millions of people watched it online. He also did the first Canadian spacewalk and was the boss of the whole space station. He shows everyone that space is amazing!",
  researchNotes: "Hadfield's STS-100 mission installed the Space Station Remote Manipulator System (SSRMS/Canadarm2), a critical robotic system for ISS assembly and maintenance. During Expedition 35, he oversaw approximately 130 experiments. His extensive public outreach during Expedition 35 is credited with significantly increasing public engagement with ISS science.",
  seoTitle: "Chris Hadfield: First Canadian Spacewalker & ISS Commander",
  seoDescription: "Chris Hadfield was the first Canadian to walk in space and command the ISS. Famous for his 'Space Oddity' video from orbit.",
  seoKeywords: ["Chris Hadfield", "ISS commander", "Canadian astronaut", "Space Oddity"],
  portrait: "/images/astronauts/chris-hadfield.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const MAE_JEMISON: Astronaut = {
  id: "astronaut_mae_jemison",
  slug: "mae-jemison",
  name: "Mae C. Jemison",
  givenName: "Mae",
  familyName: "Jemison",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1956-10-17",
  birthPlace: "Decatur, Alabama, USA",
  deathDate: null,
  deathPlace: null,
  bioShort: "First African American woman in space (1992); physician, engineer, and STEM advocate.",
  bioLong: "Mae Carol Jemison is an engineer, physician, and former NASA astronaut. On September 12, 1992, she became the first African American woman to travel to space aboard STS-47. Before joining NASA, she served as a Peace Corps medical officer in Sierra Leone and Liberia. After leaving NASA, she founded the Jemison Group to develop advanced technologies and the Dorothy Jemison Foundation for Excellence, promoting science literacy.",
  roles: ["Astronaut", "Physician", "Engineer", "Entrepreneur"],
  missions: [
    { missionId: "mission_sts_47", role: "Mission Specialist", launchDate: "1992-09-12", landingDate: "1992-09-20", destinations: ["leo"], flightTimeSeconds: 691200, isMoonMission: false, eva: [] },
  ],
  totalSpaceTimeSeconds: 691200,
  moonExperience: null,
  firsts: ["First African American woman in space"],
  awards: ["NASA Space Flight Medal", "National Academy of Sciences Public Welfare Medal"],
  funFacts: ["She was inspired by the Star Trek character Lt. Uhura.", "She later appeared on Star Trek: The Next Generation — the first real astronaut to appear on the show.", "She speaks four languages: English, Russian, Japanese, and Swahili.", "She was a Peace Corps doctor in West Africa before becoming an astronaut."],
  kidsExplanation: "Mae Jemison was the first African American woman to go to space! She flew on the Space Shuttle in 1992. But she wasn't just an astronaut — she was also a doctor and an engineer! She loved Star Trek as a kid, and later actually appeared on the show. She now works to help kids all over the world learn about science.",
  researchNotes: "Jemison conducted bone cell research experiments during STS-47 (Spacelab-J), a joint U.S.-Japan mission. She investigated the effects of microgravity on bone tissue, contributing to understanding of spaceflight-induced bone loss. Her 100 Year Starship initiative, awarded a DARPA grant, aims to make interstellar travel feasible within 100 years.",
  seoTitle: "Mae Jemison: First African American Woman in Space — STS-47 & STEM",
  seoDescription: "Mae Jemison became the first African American woman in space in 1992 aboard STS-47. Physician, engineer, astronaut, and STEM advocate.",
  seoKeywords: ["Mae Jemison", "first African American woman in space", "STS-47"],
  portrait: "/images/astronauts/mae-jemison.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

const JOHN_GLENN: Astronaut = {
  id: "astronaut_john_glenn",
  slug: "john-glenn",
  name: "John H. Glenn Jr.",
  givenName: "John",
  familyName: "Glenn",
  nationality: "United States",
  agency: "NASA",
  birthDate: "1921-07-18",
  birthPlace: "Cambridge, Ohio, USA",
  deathDate: "2016-12-08",
  deathPlace: "Columbus, Ohio, USA",
  bioShort: "First American to orbit Earth (1962); returned to space at age 77 on the Space Shuttle.",
  bioLong: "John Herschel Glenn Jr. was a Marine Corps fighter pilot, astronaut, and United States Senator. On February 20, 1962, he became the first American to orbit Earth aboard Friendship 7, completing three orbits. He later served as U.S. Senator for Ohio from 1974 to 1999. In 1998, at age 77, Glenn returned to space aboard STS-95, becoming the oldest person to fly in space. His return flight provided data on aging and spaceflight.",
  roles: ["Astronaut", "Fighter Pilot", "U.S. Senator", "Colonel USMC"],
  missions: [
    { missionId: "mission_friendship_7", role: "Pilot", launchDate: "1962-02-20", landingDate: "1962-02-20", destinations: ["leo"], flightTimeSeconds: 17700, isMoonMission: false, eva: [] },
    { missionId: "mission_sts_95", role: "Payload Specialist", launchDate: "1998-10-29", landingDate: "1998-11-07", destinations: ["leo"], flightTimeSeconds: 777600, isMoonMission: false, eva: [] },
  ],
  totalSpaceTimeSeconds: 795300,
  moonExperience: null,
  firsts: ["First American to orbit Earth", "Oldest person to fly in space (age 77)"],
  awards: ["Congressional Space Medal of Honor", "Presidential Medal of Freedom", "Congressional Gold Medal"],
  funFacts: ["He orbited Earth in 1962, then went back to space 36 years later at 77.", "He served as U.S. Senator for 24 years between his two spaceflights.", "During Friendship 7, a loose heat shield indicator nearly ended the mission.", "His STS-95 flight helped researchers study the effects of spaceflight on aging."],
  kidsExplanation: "John Glenn was the first American to fly around the whole Earth in space! He did it in 1962 in a tiny capsule called Friendship 7. Then, 36 years later when he was 77 years old — a grandpa! — he went back to space on the Space Shuttle. He proved you're never too old to explore!",
  researchNotes: "Glenn's Mercury-Atlas 6 (Friendship 7) flight lasted 4h 55m completing three orbits. A potentially loose heat shield indicator caused Mission Control to leave the retropack attached during re-entry as a precaution. His STS-95 mission at age 77 enabled comparative research on spaceflight effects vs. aging, including protein turnover, balance, and immune response.",
  seoTitle: "John Glenn: First American to Orbit Earth & Oldest Astronaut at 77",
  seoDescription: "John Glenn was the first American to orbit Earth in 1962 and returned to space at age 77 in 1998. Explorer, senator, and American hero.",
  seoKeywords: ["John Glenn", "first American to orbit Earth", "Friendship 7", "STS-95", "oldest astronaut"],
  portrait: "/images/astronauts/john-glenn.jpg",
  updatedAt: "2026-02-18T00:00:00Z",
};

// ──── EXPORT ────

export const MOONWALKERS: Astronaut[] = [
  NEIL_ARMSTRONG,
  BUZZ_ALDRIN,
  PETE_CONRAD,
  ALAN_BEAN,
  ALAN_SHEPARD,
  EDGAR_MITCHELL,
  DAVID_SCOTT,
  JAMES_IRWIN,
  JOHN_YOUNG,
  CHARLES_DUKE,
  GENE_CERNAN,
  HARRISON_SCHMITT,
];

export const ALL_ASTRONAUTS: Astronaut[] = [
  ...MOONWALKERS,
  MICHAEL_COLLINS,
  YURI_GAGARIN,
  JOHN_GLENN,
  SALLY_RIDE,
  MAE_JEMISON,
  CHRIS_HADFIELD,
];

export function getAstronautBySlug(slug: string): Astronaut | undefined {
  return ALL_ASTRONAUTS.find((a) => a.slug === slug);
}

export function getMoonwalkers(): Astronaut[] {
  return ALL_ASTRONAUTS.filter((a) => a.moonExperience?.isMoonwalker);
}

export function getAstronautsByAgency(agency: string): Astronaut[] {
  return ALL_ASTRONAUTS.filter((a) => a.agency === agency);
}

export function formatSpaceTime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  if (days > 0) return `${days}d ${hours}h`;
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${mins}m`;
}
