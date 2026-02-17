export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "nasa-news" | "space-facts" | "satellite-tutorials" | "astronomy-lessons";
  date: string; // YYYY-MM-DD
  tags: string[];
  seoKeywords?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "latest-space-news-nasa-mission-today",
    title: "Latest Space News and NASA Mission Today: Your Daily Guide to What’s Happening Beyond Earth",
    excerpt: "Stay updated with today's space news: NASA missions, Artemis, Mars rovers, James Webb, and the technology shaping the future of space exploration. Written for students and researchers.",
    content: `**Introduction**

What is happening in space right now? From the International Space Station to NASA’s Moon and Mars programs, space agencies and companies are busy every day. This article gives you a clear, accurate summary of the latest space news and today’s NASA missions—written in simple language for students, teachers, and researchers.

---

**Daily space news summary**

**NASA and Artemis:** NASA’s Artemis program aims to return humans to the Moon and prepare for Mars. Recent focus is on the Space Launch System (SLS), the Orion spacecraft, and the lunar Gateway. Uncrewed and crewed test flights are key milestones.

**International Space Station (ISS):** The ISS remains a hub for science in low Earth orbit. Crews conduct experiments in biology, physics, and Earth observation. Commercial crew vehicles (SpaceX Crew Dragon, Boeing Starliner) ferry astronauts to and from the station.

**Mars missions:** NASA’s Perseverance rover continues to explore Jezero Crater, collecting samples for future return to Earth. The Ingenuity helicopter has shown that powered flight is possible on Mars. ESA and other partners are planning the next steps for Mars exploration.

**James Webb Space Telescope:** The James Webb Space Telescope keeps delivering new views of the early universe, exoplanet atmospheres, and star formation. Its infrared observations are changing how we understand galaxies and the origins of planetary systems.

**Commercial space:** Companies like SpaceX, Blue Origin, and others are launching satellites, sending cargo and crew to the ISS, and developing heavy-lift rockets and lunar landers. Starlink and other constellations are expanding global connectivity from space.

---

**Featured NASA mission today**

**Artemis: Return to the Moon**

Artemis is NASA’s flagship program to land the first woman and the first person of color on the Moon and to build a sustainable presence there.

**Main elements:**
- **SLS (Space Launch System):** NASA’s heavy-lift rocket designed to send Orion and payloads to the Moon.
- **Orion:** The crew capsule that will carry astronauts around the Moon and back to Earth.
- **Gateway:** A small space station in lunar orbit that will support crewed landings and science.
- **Human Landing System (HLS):** Spacecraft that will take astronauts from Gateway down to the lunar surface.

**Why it matters:** Artemis is a stepping stone to Mars. Learning to live and work on the Moon will test the technology and operations needed for longer missions to the Red Planet.

**Follow along:** Check [NASA’s Artemis page](https://www.nasa.gov/specials/artemis/) and our [Mission Timeline](/missions/timeline) for updates and history.

---

**Space technology explanation**

**Orbital mechanics:** Satellites and spacecraft follow paths determined by gravity and speed. Low Earth orbit (LEO) is used by the ISS and many satellites; higher orbits are used for GPS and weather (e.g. geostationary orbit). The same physics—Kepler’s laws and Newton’s gravity—apply to the Moon, Mars, and beyond.

**Propulsion and rockets:** Rockets provide the thrust needed to reach orbit and to change orbits. Multi-stage rockets discard empty stages to reduce mass. Reusable boosters (e.g. SpaceX Falcon 9) lower cost and enable more frequent launches.

**Navigation and communication:** Spacecraft use radio links to talk to Earth. Atomic clocks on GPS satellites provide precise time for navigation. Deep-space missions rely on NASA’s Deep Space Network for tracking and data.

**Instruments and sensors:** Cameras, spectrometers, radars, and other instruments on orbiters and rovers collect data. This data is used for science, navigation, and planning the next missions.

You can explore the basics with our [orbit simulator](/simulator), [formulas library](/formulas-library), and [How NASA launches](/learn/how-nasa-launches-satellite).

---

**Future of space exploration**

**Near term (this decade):** More Artemis Moon landings, construction of lunar Gateway, progress on Mars sample return, and continued science from James Webb and other telescopes. Commercial space stations may begin to supplement or follow the ISS.

**Medium term (2030s):** Sustained lunar presence, first human missions to Mars, better space-based solar power and communications, and more capable robotics and landers.

**Long term:** Permanent bases on the Moon and Mars, deeper space exploration, and advances in propulsion (e.g. nuclear or advanced chemical) could make faster trips and more ambitious missions possible.

**Education and careers:** Students and researchers can get involved through NASA internships, university programs, and learning resources like our [Space Careers](/careers) and [Research](/research) pages.

---

**FAQ section**

**1. What is NASA’s main mission right now?**
NASA’s main human spaceflight goal is the Artemis program: returning humans to the Moon and building a sustainable presence there as a step toward Mars. Science missions (e.g. James Webb, Mars rovers, Earth science) continue in parallel.

**2. How can I follow today’s space news?**
You can follow NASA’s website and social media, ESA, SpaceX, and other agencies and companies. Our [Space Blog](/blog) and [Mission Timeline](/missions/timeline) summarize key missions and concepts in one place.

**3. What is the difference between LEO, MEO, and GEO?**
LEO (Low Earth Orbit) is roughly 200–2,000 km altitude—used by the ISS and many satellites. MEO (Medium Earth Orbit) is used by navigation satellites like GPS (~20,200 km). GEO (Geostationary) is about 35,786 km; satellites there appear fixed over one spot and are used for weather and communications.

**4. Why does NASA want to go back to the Moon?**
The Moon is a testbed for technology, operations, and science needed for Mars. It offers resources (e.g. water ice), and learning to work there helps NASA and partners prepare for longer, farther missions.

**5. Where can I learn orbital mechanics and space physics?**
You can start with our [orbital mechanics guide](/learn/orbital-mechanics), [formulas library](/formulas-library), and [3D simulator](/simulator). For deeper study, see our [Aerospace reference](/learn/aerospace) and [Research hub](/research).`,
    category: "nasa-news",
    date: "2026-02-15",
    tags: ["NASA", "space news", "Artemis", "ISS", "Mars", "James Webb", "space exploration"],
    seoKeywords: "latest space news, NASA mission today, space news today, NASA Artemis, daily space news, space exploration 2026, NASA Mars mission, James Webb telescope, space technology, orbital mechanics",
  },
  {
    slug: "how-iss-orbits-earth-16-times-daily",
    title: "How the ISS Orbits Earth 16 Times Every Day",
    excerpt: "The International Space Station completes one orbit every 90 minutes, meaning astronauts see 16 sunrises and sunsets in a single day. Learn why this happens and how orbital mechanics make it possible.",
    content: `The International Space Station (ISS) orbits Earth at an altitude of approximately 408 kilometers (253 miles). At this height, the orbital period—the time it takes to complete one full orbit—is about 92.7 minutes, or roughly 1.5 hours.

This means the ISS circles Earth approximately 15.5 times per day. Astronauts onboard experience:
- 16 sunrises and 16 sunsets every 24 hours
- A complete day-night cycle every 90 minutes
- Views of Earth from space that change constantly

**Why does this happen?**

The ISS is in Low Earth Orbit (LEO), which is defined as orbits between 200 and 2,000 kilometers above Earth's surface. At this altitude, the orbital speed is approximately 7.66 kilometers per second (about 17,100 miles per hour).

The relationship between altitude and orbital period follows Kepler's third law: T = 2π√(a³/μ), where:
- T = orbital period
- a = semi-major axis (distance from Earth's center)
- μ = Earth's gravitational parameter (398,600 km³/s²)

**Real-world impact:**

Astronauts on the ISS adjust their sleep schedules to match mission control on Earth, not the 90-minute day-night cycle they experience. They use window shades to block sunlight during "night" periods.

**Try it yourself:**

Use our [orbit simulator](/simulator) to add a LEO satellite and watch it complete multiple orbits. You'll see the same physics that keeps the ISS circling Earth every 90 minutes.`,
    category: "space-facts",
    date: "2026-02-15",
    tags: ["ISS", "orbital mechanics", "LEO", "astronauts"],
    seoKeywords: "ISS orbit time, how many times ISS orbits earth, ISS orbital period, space station facts",
  },
  {
    slug: "nasa-james-webb-telescope-new-discoveries-2026",
    title: "NASA James Webb Telescope: Latest Discoveries in 2026",
    excerpt: "The James Webb Space Telescope continues to revolutionize astronomy. Latest findings include ancient galaxies, exoplanet atmospheres, and insights into star formation.",
    content: `The James Webb Space Telescope (JWST), launched in December 2021, has been making groundbreaking discoveries since it began operations. Positioned at the Sun-Earth L2 point (about 1.5 million kilometers from Earth), JWST observes the universe in infrared light.

**Recent discoveries (2026):**

1. **Ancient galaxies:** JWST has detected galaxies that formed just 200-400 million years after the Big Bang, earlier than previously thought possible.

2. **Exoplanet atmospheres:** The telescope has analyzed the atmospheres of distant planets, detecting water vapor, carbon dioxide, and other molecules that could indicate habitability.

3. **Star formation:** JWST's infrared capabilities allow it to peer through dust clouds where stars are born, revealing new details about how stars and planetary systems form.

**Why L2?**

JWST orbits the Sun-Earth L2 Lagrange point because:
- It stays in a stable position relative to Earth and the Sun
- Earth blocks much of the Sun's heat and light
- It can observe deep space continuously

**Orbital mechanics:**

The L2 point is not a true orbit around Earth, but rather a gravitational balance point. JWST uses small thruster burns to maintain its position—this is called "station-keeping."

**Learn more:**

- [NASA JWST official site](https://www.jwst.nasa.gov)
- Try our [orbit simulator](/simulator) to understand how satellites maintain their positions
- Read about [orbital mechanics](/learn/orbital-mechanics) to understand Lagrange points`,
    category: "nasa-news",
    date: "2026-02-15",
    tags: ["NASA", "James Webb", "telescope", "astronomy", "space"],
    seoKeywords: "James Webb telescope discoveries, NASA JWST 2026, space telescope news",
  },
  {
    slug: "what-is-geostationary-orbit-explained",
    title: "What is Geostationary Orbit? Explained Simply",
    excerpt: "Geostationary satellites appear to stay fixed in the sky. Learn why they orbit at exactly 35,786 km, how they're used for TV and weather, and the physics behind this special orbit.",
    content: `A geostationary orbit (GEO) is a special type of orbit where a satellite appears to stay fixed in the sky above one spot on Earth. This happens because the satellite's orbital period matches Earth's rotation period: exactly 24 hours (sidereal day).

**Key facts:**

- **Altitude:** Approximately 35,786 kilometers (22,236 miles) above Earth's equator
- **Orbital period:** 24 hours (sidereal)
- **Speed:** About 3.07 kilometers per second
- **Uses:** Weather satellites, TV broadcasting, communications

**Why 35,786 km?**

The altitude is calculated using Kepler's third law. For a 24-hour orbit:
- T = 24 hours = 86,400 seconds
- Using T = 2π√(a³/μ), we solve for a (semi-major axis)
- a ≈ 42,164 km from Earth's center
- Altitude = a - Earth's radius (6,371 km) ≈ 35,786 km

**Real-world examples:**

- **Weather satellites:** GOES (USA), Meteosat (Europe) provide continuous weather monitoring
- **TV satellites:** DirectTV, Dish Network satellites broadcast to fixed ground antennas
- **Communications:** Many internet and phone satellites use GEO

**Advantages:**

- Ground antennas don't need to track the satellite (they stay pointed at one spot)
- Continuous coverage of one region
- Simple ground equipment

**Disadvantages:**

- High latency (signal travels ~72,000 km round trip)
- Limited coverage near the poles
- Crowded orbit (many satellites compete for positions)

**Try it:**

Add a GEO satellite in our [orbit simulator](/simulator) and compare it to LEO and MEO. You'll see why GEO satellites appear stationary while LEO satellites move quickly across the sky.`,
    category: "satellite-tutorials",
    date: "2026-02-14",
    tags: ["GEO", "geostationary", "satellites", "orbital mechanics"],
    seoKeywords: "what is geostationary orbit, GEO satellite altitude, geostationary orbit explained",
  },
  {
    slug: "why-satellites-dont-fall-gravity-explained",
    title: "Why Satellites Don't Fall: Gravity and Velocity Explained",
    excerpt: "Satellites don't fall because they're moving fast enough sideways that they keep missing Earth. Learn the physics behind orbital motion and why speed matters.",
    content: `One of the most common questions about space is: "Why don't satellites fall?" The answer lies in the balance between gravity and velocity.

**The simple answer:**

Satellites are falling—they're just moving sideways so fast that they keep missing Earth. It's like a ball on a string: the string (gravity) pulls the ball toward the center, but the ball's speed keeps it going in a circle.

**The physics:**

1. **Gravity pulls down:** Earth's gravity constantly pulls the satellite toward Earth's center.

2. **Velocity moves sideways:** The satellite has high horizontal velocity (several kilometers per second).

3. **The combination:** Gravity bends the satellite's path into a curve. If the speed is just right, the curve matches Earth's curvature, creating a stable orbit.

**The formula:**

For a circular orbit, the required speed is:
**v = √(μ/r)**

Where:
- v = orbital speed (km/s)
- μ = Earth's gravitational parameter (398,600 km³/s²)
- r = distance from Earth's center (km)

**Examples:**

- **ISS (400 km altitude):** v ≈ 7.66 km/s
- **GPS (20,200 km altitude):** v ≈ 3.87 km/s
- **GEO (35,786 km altitude):** v ≈ 3.07 km/s

**What happens if speed is wrong?**

- **Too slow:** The satellite falls back to Earth (or crashes)
- **Too fast:** The satellite escapes Earth's gravity (becomes a deep space probe)
- **Just right:** Stable circular or elliptical orbit

**Try it:**

Use our [orbit simulator](/simulator) to see this in action. Add a satellite and watch how gravity and velocity work together to create an orbit.`,
    category: "astronomy-lessons",
    date: "2026-02-14",
    tags: ["gravity", "orbital mechanics", "physics", "satellites"],
    seoKeywords: "why satellites don't fall, gravity and orbits, orbital velocity explained",
  },
  {
    slug: "artemis-moon-mission-update-2026-humans-returning-to-moon",
    title: "Artemis Moon Mission Update 2026: Humans Returning to the Moon",
    excerpt: "NASA's Artemis program is preparing to return humans to the Moon for the first time in over 50 years. Learn about Artemis II, Orion, Lunar Gateway, and why it matters for Mars.",
    content: `NASA's Artemis program is preparing to return humans to the Moon for the first time in over 50 years.

**What is Artemis?**

Artemis is NASA's next-generation Moon mission designed to:

- Send astronauts back to the Moon
- Build a lunar base
- Prepare for future Mars missions

**Current progress (2026)**

- Artemis II preparing for crewed lunar flyby
- Orion spacecraft testing complete
- Lunar Gateway station under development
- New lunar spacesuits being tested

**Why it matters**

Artemis will:

- Establish permanent human presence on Moon
- Test deep-space technologies
- Prepare for Mars exploration

For students and researchers, Artemis represents the future of space travel and human exploration. Follow [NASA Artemis](https://www.nasa.gov/specials/artemis/) and our [Mission Timeline](/missions/timeline) for updates.`,
    category: "nasa-news",
    date: "2026-02-17",
    tags: ["Artemis", "NASA", "Moon", "Orion", "Gateway", "space exploration"],
    seoKeywords: "Artemis 2026, NASA Moon mission, humans return to Moon, Artemis II, Orion spacecraft, Lunar Gateway",
  },
  {
    slug: "what-happens-if-you-fall-into-black-hole",
    title: "What Happens If You Fall Into a Black Hole?",
    excerpt: "Black holes are among the most mysterious objects in the universe. Learn what a black hole is, what scientists predict would happen if you fell in, and why NASA studies them.",
    content: `Black holes are among the most mysterious objects in the universe.

**What is a black hole?**

A black hole forms when a massive star collapses. Gravity becomes so strong that nothing — not even light — can escape.

**If you fell into one…**

Scientists predict:

- You would stretch like spaghetti (spaghettification)
- Time would slow down near the event horizon
- Light would bend around you
- You would never escape

**Why NASA studies black holes**

Black holes help us understand:

- Gravity
- Time
- Quantum physics
- Galaxy formation

The James Webb telescope and other observatories are now studying black holes in deep space. Explore more in our [astronomy lessons](/blog/category/astronomy-lessons) and [orbital mechanics](/learn/orbital-mechanics).`,
    category: "space-facts",
    date: "2026-02-17",
    tags: ["black hole", "gravity", "NASA", "James Webb", "astronomy"],
    seoKeywords: "black hole, fall into black hole, spaghettification, event horizon, NASA black hole research",
  },
  {
    slug: "how-satellites-send-internet-around-the-world",
    title: "How Satellites Send Internet Around the World",
    excerpt: "Modern satellites don't just take pictures — they provide global internet. Learn how it works, the types (LEO vs GEO), and why satellite internet matters for remote areas and the future.",
    content: `Modern satellites don't just take pictures — they provide global internet.

**How it works**

1. Ground station sends signal to satellite
2. Satellite receives and amplifies signal
3. Satellite sends signal back to Earth
4. Your phone or dish receives internet

**Types of internet satellites**

**LEO (Low Earth Orbit)**

- Fast internet
- Used by Starlink
- Low latency

**GEO (Geostationary)**

- High altitude
- Used for TV & weather
- Covers large area

**Why important**

Satellite internet:

- Connects remote areas
- Supports aviation & ships
- Enables global communication
- Helps during disasters

Future satellites will use AI and quantum communication for even faster and safer internet. Try our [orbit simulator](/simulator) and read [How GPS works](/learn/how-gps-works) and [Quantum physics in space](/learn/quantum-space).`,
    category: "satellite-tutorials",
    date: "2026-02-17",
    tags: ["satellite internet", "LEO", "GEO", "Starlink", "communications"],
    seoKeywords: "satellite internet, how satellite internet works, LEO GEO satellites, Starlink, global internet",
  },
  {
    slug: "why-mars-looks-red-from-earth",
    title: "Why Mars Looks Red From Earth",
    excerpt: "Mars is called the Red Planet because of its color. Learn why it's red, what NASA rovers found, and why Mars matters for future human colonies and the search for life.",
    content: `Mars is called the Red Planet because of its color.

**Why is Mars red?**

Mars surface contains **iron oxide (rust)**. Just like rust on Earth:

- Iron + oxygen → red color
- Dust storms spread this red dust across the entire planet

**What NASA discovered**

Mars rovers found:

- Ancient rivers
- Ice underground
- Evidence of past water
- Possible past life conditions

**Why Mars matters**

Mars is the top candidate for:

- Future human colony
- Space exploration base
- Search for alien life

NASA and SpaceX plan human missions to Mars within the next decades. Learn more about [orbital mechanics](/learn/orbital-mechanics) and [space careers](/careers).`,
    category: "astronomy-lessons",
    date: "2026-02-17",
    tags: ["Mars", "Red Planet", "NASA", "rovers", "space exploration"],
    seoKeywords: "why is Mars red, Red Planet, Mars surface, NASA Mars rovers, Mars exploration",
  },
  {
    slug: "how-quantum-physics-helps-satellites-navigate-space",
    title: "How Quantum Physics Helps Satellites Navigate Space",
    excerpt: "Modern satellites rely on quantum physics more than most people realize. Atomic clocks, quantum sensors, and the future of deep space navigation and quantum internet.",
    content: `Modern satellites rely on quantum physics more than most people realize.

**Atomic clocks**

GPS satellites use atomic clocks based on quantum vibrations of atoms.

If timing off by **1 microsecond** → GPS error = **300 meters**

**Quantum sensors**

Future satellites use:

- Quantum magnetometers
- Quantum gravimeters
- Atom interferometers

These allow ultra-precise navigation and Earth mapping.

**Future**

Quantum tech will enable:

- Deep space navigation
- Quantum internet
- Ultra-secure communication

Dive deeper in our [Quantum physics & space](/learn/quantum-space) page and [AI in aerospace](/ai-in-aerospace) for how AI and quantum tech shape the future of space.`,
    category: "astronomy-lessons",
    date: "2026-02-17",
    tags: ["quantum physics", "satellites", "atomic clocks", "GPS", "quantum sensors"],
    seoKeywords: "quantum physics satellites, atomic clocks GPS, quantum sensors space, satellite navigation quantum",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogPost["category"]): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getRecentPosts(limit = 10): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
