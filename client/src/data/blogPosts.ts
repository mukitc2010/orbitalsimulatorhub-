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
