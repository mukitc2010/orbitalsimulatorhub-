/**
 * Learning library: mission topics with readable sections, key stats and fun
 * facts. Content mirrors the themes of the Orbital Simulator Hub website
 * (orbits, spacecraft, solar system, space engineering).
 */
import { colors } from "../theme";

export interface TopicStat {
  value: string;
  label: string;
}

export interface TopicSection {
  heading: string;
  body: string;
}

export interface Topic {
  id: string;
  title: string;
  tagline: string;
  symbol: string;
  color: string;
  stats: TopicStat[];
  sections: TopicSection[];
  funFact: string;
}

export interface TopicCategory {
  id: string;
  name: string;
  topics: Topic[];
}

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    id: "orbits",
    name: "Orbits & Physics",
    topics: [
      {
        id: "why-orbit",
        title: "Why Satellites Stay Up",
        tagline: "Falling forever, missing forever",
        symbol: "🛰",
        color: colors.cyan,
        stats: [
          { value: "7.9 km/s", label: "orbital speed at surface" },
          { value: "0 N", label: "thrust needed to coast" },
          { value: "∞", label: "how long a stable orbit lasts" },
        ],
        sections: [
          {
            heading: "Gravity never switches off",
            body: "At the altitude of the International Space Station, Earth's gravity is still about 90% as strong as on the ground. Astronauts float not because gravity is gone, but because they and their spacecraft are falling together, all the time.",
          },
          {
            heading: "The sideways trick",
            body: "Throw a ball and it lands a few meters away. Throw it faster and it lands farther. Newton realized that if you could throw it fast enough — about 7.9 km/s at the surface — the ground would curve away beneath it exactly as fast as it falls. It would fall around the planet forever. That is an orbit.",
          },
          {
            heading: "No fuel required",
            body: "Once a satellite reaches orbital speed above the atmosphere, it needs no engine to stay there. There is nothing to slow it down, so inertia keeps it moving and gravity keeps bending its path into a closed loop. Very low satellites do skim traces of air and slowly lose energy — the ISS fires thrusters a few times a year to climb back up.",
          },
          {
            heading: "Try it in the simulator",
            body: "Deploy a LEO satellite in the Simulator tab and watch the HUD: the speed stays near 7.7 km/s with the engine off. Raise the orbit with the GEO preset and the speed drops to about 3.1 km/s — higher orbits are slower orbits.",
          },
        ],
        funFact:
          "Newton sketched this exact thought experiment — a cannon on a mountain firing ever faster shots — in 1687, almost 300 years before Sputnik proved him right.",
      },
      {
        id: "orbit-types",
        title: "LEO, MEO & GEO",
        tagline: "The three neighborhoods of Earth orbit",
        symbol: "◎",
        color: colors.violet,
        stats: [
          { value: "400 km", label: "typical LEO altitude" },
          { value: "20,200 km", label: "GPS constellation (MEO)" },
          { value: "35,786 km", label: "geostationary altitude" },
        ],
        sections: [
          {
            heading: "Low Earth Orbit — the busy lane",
            body: "From roughly 200 to 2,000 km up, LEO is home to the ISS, Starlink, Earth-imaging satellites and most of everything humans have ever launched. Orbits take about 90 minutes, and being close to Earth means sharp photos and low-lag communication — but each satellite only sees a small patch of the planet at a time.",
          },
          {
            heading: "Medium Earth Orbit — the navigators",
            body: "Between LEO and GEO lies MEO, ruled by navigation constellations: GPS at 20,200 km, Europe's Galileo at 23,222 km, and others. Each satellite circles Earth about twice a day, and the constellation is arranged so at least four are visible from any point on the ground — the minimum needed for a position fix.",
          },
          {
            heading: "Geostationary orbit — the fixed stars",
            body: "At exactly 35,786 km above the equator, an orbit takes 23 hours 56 minutes — the same time Earth takes to spin once. A satellite there hangs over one spot forever, which is why TV dishes never move and weather satellites can film the same hemisphere around the clock.",
          },
          {
            heading: "Special orbits",
            body: "Polar orbits pass over both poles so the planet rotates underneath, letting one satellite scan the entire globe. Sun-synchronous orbits are polar orbits tuned so the satellite always crosses the equator at the same local time — perfect for comparing photos day after day. Highly-elliptical Molniya orbits dwell for hours over high latitudes that GEO can't see well.",
          },
        ],
        funFact:
          "The geostationary ring is such prized real estate that slots are allocated by international treaty — and retired satellites must boost themselves into a 'graveyard orbit' 300 km higher.",
      },
      {
        id: "newton",
        title: "Newton's Three Laws",
        tagline: "The rules every rocket obeys",
        symbol: "⚖",
        color: colors.cyanBright,
        stats: [
          { value: "1687", label: "published in the Principia" },
          { value: "F = ma", label: "the second law" },
          { value: "3", label: "laws that explain all motion" },
        ],
        sections: [
          {
            heading: "First law — inertia",
            body: "An object keeps moving in a straight line at constant speed unless a force acts on it. A satellite would fly off into deep space in a straight line if gravity didn't constantly bend its path into an orbit — the orbit IS the bending.",
          },
          {
            heading: "Second law — F = ma",
            body: "Force equals mass times acceleration. The same thruster burn accelerates a small CubeSat far more than a 420-tonne space station, and it's why rockets accelerate hardest near burnout, when most of their propellant mass is already gone.",
          },
          {
            heading: "Third law — action and reaction",
            body: "For every action there is an equal and opposite reaction. Rockets throw hot exhaust backwards, and the exhaust pushes the rocket forwards. No air, road or launchpad to push against is needed — which is why rockets are the only engines that work in empty space.",
          },
          {
            heading: "All three at once",
            body: "Watch a satellite in the simulator: inertia carries it forward (first law), gravity accelerates it toward Earth by F = ma (second law), and if you imagine firing its thruster, the exhaust would push it the opposite way (third law). Three sentences from 1687 still run every space mission.",
          },
        ],
        funFact:
          "Newton invented calculus, explained orbits and analyzed light — much of it during 18 months at home while Cambridge was closed for the plague.",
      },
      {
        id: "kepler",
        title: "Kepler's Three Laws",
        tagline: "The 400-year-old rules this app runs on",
        symbol: "∑",
        color: colors.green,
        stats: [
          { value: "1609", label: "first two laws published" },
          { value: "T² ∝ a³", label: "the third law" },
          { value: "0–1", label: "eccentricity range of an ellipse" },
        ],
        sections: [
          {
            heading: "First law: orbits are ellipses",
            body: "Planets and satellites don't move in perfect circles but in ellipses, with the body they orbit at one focus. A circle is just the special case where the ellipse's eccentricity is zero. The point of an orbit closest to Earth is called perigee; the farthest is apogee.",
          },
          {
            heading: "Second law: equal areas in equal times",
            body: "A line from Earth to the satellite sweeps out equal areas in equal times. In practice: satellites speed up as they swing close to Earth and slow down as they climb away. In an eccentric orbit the difference is dramatic — this is the law that makes comets crawl for decades then whip around the Sun in weeks.",
          },
          {
            heading: "Third law: period comes from size",
            body: "The square of the orbital period is proportional to the cube of the orbit's average radius: T² ∝ a³. Double an orbit's size and the period grows by 2√2. This single relationship is why the ISS takes 92 minutes, GPS takes 12 hours and the Moon takes 27 days — no other detail needed.",
          },
          {
            heading: "From Kepler to Newton to your phone",
            body: "Kepler found these rules by studying decades of Mars observations, without knowing why they worked. Newton later showed all three follow from gravity's inverse-square law. The simulator in this app solves Kepler's equation every frame to place its satellites — the same math flying real missions.",
          },
        ],
        funFact:
          "Kepler derived his laws from Tycho Brahe's naked-eye measurements, made before the telescope was invented — accurate to about 1/60th of a degree.",
      },
      {
        id: "escape-velocity",
        title: "Escape Velocity",
        tagline: "How fast is fast enough to leave?",
        symbol: "⤴",
        color: colors.magenta,
        stats: [
          { value: "11.2 km/s", label: "escape Earth" },
          { value: "2.4 km/s", label: "escape the Moon" },
          { value: "617 km/s", label: "escape the Sun's surface" },
        ],
        sections: [
          {
            heading: "The one-way speed",
            body: "Escape velocity is the speed at which an object's kinetic energy exactly cancels the gravitational energy binding it to a planet. Launch straight up at 11.2 km/s from Earth's surface (ignoring air) and you will coast away forever, slowing constantly but never quite stopping.",
          },
          {
            heading: "It's √2 times orbital speed",
            body: "At any altitude, escape velocity is exactly √2 ≈ 1.414 times the circular orbital speed there. A spacecraft in LEO moving at 7.8 km/s needs only about 3.2 km/s more to leave Earth entirely — which is why missions to the Moon and Mars begin with a burn from parking orbit, not a monster launch.",
          },
          {
            heading: "Direction doesn't matter",
            body: "Surprisingly, escape velocity is about speed, not direction — any unobstructed path works because energy is what counts. Real rockets still fly a curved gravity-turn trajectory, but that's to minimize drag and stress, not because physics demands it.",
          },
          {
            heading: "Black holes take it to the limit",
            body: "Squeeze enough mass into a small enough radius and escape velocity exceeds the speed of light — nothing, not even light, can leave. That boundary is a black hole's event horizon, the ultimate expression of the same formula in this app's calculator.",
          },
        ],
        funFact:
          "Voyager 1 left Earth in 1977 and used Jupiter's and Saturn's gravity as free boosters — it is now 24+ billion km away, the farthest human-made object, still doing 17 km/s.",
      },
    ],
  },
  {
    id: "spacecraft",
    name: "Spacecraft & Missions",
    topics: [
      {
        id: "iss",
        title: "The Space Station",
        tagline: "A football-field-sized lab at 7.66 km/s",
        symbol: "⬡",
        color: colors.cyan,
        stats: [
          { value: "~400 km", label: "altitude" },
          { value: "16", label: "sunrises per day" },
          { value: "420 t", label: "mass in orbit" },
        ],
        sections: [
          {
            heading: "Built in orbit, piece by piece",
            body: "The International Space Station was assembled from more than 40 modules and truss segments launched between 1998 and 2011, connected by astronauts on over 250 spacewalks. It has hosted a continuous human presence since November 2000 — the longest in history.",
          },
          {
            heading: "Power and life support",
            body: "Eight huge solar array wings (plus newer roll-out arrays) generate on the order of 100 kW. Machines scrub carbon dioxide, split water into breathable oxygen, and recycle over 90% of all water aboard — including sweat and urine — because launching fresh water costs thousands of dollars per liter.",
          },
          {
            heading: "Staying up there",
            body: "At 400 km there are still wisps of atmosphere, so the station loses about 2 km of altitude per month to drag. Visiting cargo ships periodically fire their engines to 'reboost' it. Mission control also steers it around tracked debris a few times a year.",
          },
          {
            heading: "Science you can't do on Earth",
            body: "Continuous free-fall makes the ISS a unique lab: flames burn as spheres, crystals grow more perfectly, and researchers study how bones, muscles and the human brain adapt to weightlessness — essential knowledge before multi-year trips to Mars.",
          },
        ],
        funFact:
          "The ISS is the third-brightest object in the night sky after the Moon and Venus — you can see it with the naked eye, and NASA's 'Spot the Station' service tells you exactly when to look.",
      },
      {
        id: "gps",
        title: "How GPS Works",
        tagline: "Atomic clocks, geometry and Einstein",
        symbol: "⌖",
        color: colors.violet,
        stats: [
          { value: "31", label: "operational satellites" },
          { value: "4", label: "satellites needed for a fix" },
          { value: "38 μs/day", label: "relativity correction" },
        ],
        sections: [
          {
            heading: "A constellation of clocks",
            body: "Every GPS satellite carries atomic clocks stable to about a nanosecond and continuously broadcasts 'the time is exactly T, and I am exactly here.' Your phone contains no special hardware beyond a radio receiver — all the magic is in the timing.",
          },
          {
            heading: "Trilateration",
            body: "Radio travels at light speed, so the delay in each satellite's message reveals your distance from it: one satellite pins you to a sphere, two to a circle, three to two points. A fourth satellite lets your receiver solve for its own clock error too — which is why you need at least four in view.",
          },
          {
            heading: "Einstein in your pocket",
            body: "Moving fast makes the satellites' clocks run 7 microseconds per day slow (special relativity), while sitting higher in Earth's gravity makes them run 45 microseconds fast (general relativity). Net effect: +38 μs/day. Uncorrected, GPS positions would drift by 10 km every single day.",
          },
          {
            heading: "One-way traffic",
            body: "GPS satellites don't know you exist — they only transmit, never listen. That's why the system serves billions of devices at once, works with your phone in airplane mode, and cannot 'track' you by itself. Rivals and partners exist too: Russia's GLONASS, Europe's Galileo, China's BeiDou.",
          },
        ],
        funFact:
          "GPS time deliberately ignores leap seconds and is now 18 seconds ahead of civil time — receivers quietly correct for it using data in the signal itself.",
      },
      {
        id: "mars-rovers",
        title: "Mars Rovers",
        tagline: "Seven minutes of terror, years of discovery",
        symbol: "⛭",
        color: colors.amber,
        stats: [
          { value: "~7 min", label: "entry, descent & landing" },
          { value: "5–20 min", label: "one-way radio delay" },
          { value: "899 kg", label: "Perseverance's mass" },
        ],
        sections: [
          {
            heading: "The seven minutes of terror",
            body: "A rover arrives at Mars doing about 5.9 km/s and must reach zero in seven minutes — through an atmosphere too thick to ignore but far too thin for parachutes alone. Because radio takes many minutes to reach Earth, the entire landing is over before mission control even knows it began. The spacecraft does everything itself.",
          },
          {
            heading: "The sky crane",
            body: "Curiosity and Perseverance were too heavy for airbag landings, so engineers invented the sky crane: after the heat shield and supersonic parachute do their work, a rocket-powered platform hovers and lowers the rover to the surface on nylon cords, then flies away to crash at a safe distance. It worked flawlessly — twice.",
          },
          {
            heading: "Living on nuclear power",
            body: "Dust storms can blot out the Sun for months, so the newest rovers skip solar panels entirely. A radioisotope thermoelectric generator turns the heat of decaying plutonium-238 into steady electricity, day and night, and keeps the electronics warm through −100 °C nights.",
          },
          {
            heading: "Robot geologists",
            body: "Perseverance drills finger-sized rock cores and seals them in titanium tubes for a future mission to bring home, hunting for traces of ancient microbial life in a dried-up river delta. It also carried Ingenuity — the little helicopter that made the first powered flight on another planet and went on to fly 72 times.",
          },
        ],
        funFact:
          "Commands to a Mars rover can't be 'driven live' — drivers on Earth plan a whole day of moves, send them in one batch, then wait overnight to learn what happened.",
      },
      {
        id: "jwst",
        title: "The Webb Telescope",
        tagline: "A time machine parked a million miles out",
        symbol: "✦",
        color: colors.magenta,
        stats: [
          { value: "6.5 m", label: "gold-coated mirror" },
          { value: "1.5M km", label: "distance from Earth (L2)" },
          { value: "−233 °C", label: "operating temperature" },
        ],
        sections: [
          {
            heading: "Why infrared",
            body: "The universe is expanding, which stretches light from the earliest galaxies out of the visible range into the infrared. To see the first stars ignite, Webb was built as an infrared telescope — which means it must be kept brutally cold, or its own warmth would blind it.",
          },
          {
            heading: "A sunshade the size of a tennis court",
            body: "Five layers of aluminized foil, each thinner than a human hair, separate the telescope from the Sun. The hot side bakes at +85 °C while the mirror side chills to −233 °C passively — a temperature difference of over 300 degrees across a few meters of vacuum.",
          },
          {
            heading: "Origami in space",
            body: "The 6.5-meter mirror — 18 gold-coated beryllium hexagons — was too big for any rocket fairing, so the whole observatory folded up like origami and unfolded over two weeks after launch. The deployment involved 344 single points of failure. Every one worked.",
          },
          {
            heading: "Parked at L2",
            body: "Webb orbits the Sun at Lagrange point 2, 1.5 million km beyond Earth, where the Sun, Earth and Moon all stay conveniently behind its sunshield. Too far away for any repair mission, it was tested on the ground for years — and its launch was so precise that leftover fuel should last 20+ years.",
          },
        ],
        funFact:
          "Webb is sensitive enough to detect the heat of a bumblebee at the distance of the Moon.",
      },
    ],
  },
  {
    id: "solar-system",
    name: "The Solar System",
    topics: [
      {
        id: "sun",
        title: "The Sun",
        tagline: "A fusion reactor with 5 billion years of fuel left",
        symbol: "☀",
        color: colors.amber,
        stats: [
          { value: "99.86%", label: "of the solar system's mass" },
          { value: "15M °C", label: "core temperature" },
          { value: "8 min", label: "light's trip to Earth" },
        ],
        sections: [
          {
            heading: "Gravity-powered fusion",
            body: "The Sun's core is squeezed so hard that hydrogen nuclei fuse into helium, converting about 600 million tonnes of hydrogen every second and releasing the energy difference as light. The outward push of that energy balances gravity's inward crush — a standoff that has held for 4.6 billion years.",
          },
          {
            heading: "The long walk out",
            body: "A photon born in the core is absorbed and re-emitted so many times that its energy takes on the order of 100,000 years to random-walk to the surface. Then it crosses the 150-million-km gap to your eyes in just 8 minutes 20 seconds.",
          },
          {
            heading: "Space weather",
            body: "The Sun's tangled magnetic field snaps and reconnects, hurling flares and billion-tonne clouds of plasma called coronal mass ejections. When one hits Earth, we get auroras — and occasionally fried satellites and power-grid trips. Forecasting this 'space weather' is a real job that protects the orbits you fly in the simulator.",
          },
          {
            heading: "Its future",
            body: "In about 5 billion years the core's hydrogen will run low, and the Sun will swell into a red giant larger than Earth's orbit before shedding its outer layers and settling down as a white dwarf — a slowly cooling ember the size of Earth.",
          },
        ],
        funFact:
          "Every second, the Sun emits more energy than human civilization has used in its entire history.",
      },
      {
        id: "moon",
        title: "The Moon",
        tagline: "Born in a collision, keeper of the tides",
        symbol: "☾",
        color: colors.cyan,
        stats: [
          { value: "384,400 km", label: "average distance" },
          { value: "27.3 days", label: "orbit (and spin) period" },
          { value: "3.8 cm/yr", label: "how fast it's drifting away" },
        ],
        sections: [
          {
            heading: "A violent birth",
            body: "The leading theory says a Mars-sized world nicknamed Theia struck the young Earth 4.5 billion years ago. The debris ring from that impact clumped into the Moon — which explains why Moon rocks brought back by Apollo are chemically near-twins of Earth's mantle.",
          },
          {
            heading: "Why we only see one face",
            body: "The Moon spins exactly once per orbit — a state called tidal locking that Earth's gravity forced on it long ago. The 'dark side' isn't dark at all; it gets just as much sunlight as the near side. It's simply the far side, first photographed by Luna 3 in 1959.",
          },
          {
            heading: "Master of the tides",
            body: "The Moon's gravity pulls hardest on the ocean nearest it and weakest on the far side, stretching Earth's water into two bulges — high tides — that the planet rotates through twice a day. The same tug is slowly stealing Earth's spin: days lengthen by about 2 milliseconds per century.",
          },
          {
            heading: "The return",
            body: "NASA's Artemis program and international partners aim to put humans back on the Moon and eventually keep them there, targeting the south pole where permanently-shadowed craters hold water ice — drinkable, breathable (split into O₂) and convertible to rocket fuel.",
          },
        ],
        funFact:
          "Apollo astronauts left retroreflectors on the surface; observatories still bounce lasers off them to measure the Moon's distance to within millimeters.",
      },
      {
        id: "mars",
        title: "Mars",
        tagline: "The rusty world we may walk on next",
        symbol: "♂",
        color: colors.danger,
        stats: [
          { value: "24.6 h", label: "length of a Martian day" },
          { value: "~1%", label: "of Earth's air pressure" },
          { value: "21.9 km", label: "height of Olympus Mons" },
        ],
        sections: [
          {
            heading: "A familiar stranger",
            body: "Mars has seasons, polar ice caps, dust storms and a day just 39 minutes longer than ours — the most Earth-like clock in the solar system. But its air is 96% carbon dioxide at less than 1% of Earth's pressure, and the average temperature is −63 °C.",
          },
          {
            heading: "The water story",
            body: "Orbiters and rovers have found dry river deltas, lakebeds, minerals that only form in water, and ice everywhere below the surface. Three billion years ago Mars was wetter and warmer; when its core cooled and its magnetic field faded, the solar wind stripped most of the atmosphere away, and the water froze or fled.",
          },
          {
            heading: "Extreme geography",
            body: "Mars hosts the solar system's biggest volcano — Olympus Mons, nearly three times the height of Everest — and Valles Marineris, a canyon system that would stretch from New York to Los Angeles. With no plate tectonics to recycle the crust, giants had billions of years to grow.",
          },
          {
            heading: "Getting humans there",
            body: "Launch windows open only every 26 months, when Earth and Mars align for a 6–9 month cruise. Crews will need to live off the land: making oxygen from CO₂ (Perseverance's MOXIE experiment already did it), mining water ice, and shielding against radiation the thin air can't stop.",
          },
        ],
        funFact:
          "Mars's moon Phobos orbits so low and fast that it rises in the west and sets in the east twice a Martian day — and in ~50 million years it will crash or be shredded into a ring.",
      },
    ],
  },
  {
    id: "engineering",
    name: "Space Engineering",
    topics: [
      {
        id: "rockets",
        title: "Rocket Engines",
        tagline: "Controlled explosions, pointed the right way",
        symbol: "▲",
        color: colors.magenta,
        stats: [
          { value: "~90%", label: "of a rocket's mass is propellant" },
          { value: "3,500 °C", label: "combustion temperature" },
          { value: "Mach 10+", label: "exhaust speed" },
        ],
        sections: [
          {
            heading: "Newton's third law, industrialized",
            body: "A rocket engine throws mass out the back as fast as physically possible; the reaction pushes the vehicle forward. Nothing to push against is needed — which is exactly why rockets are the only engines that work in vacuum.",
          },
          {
            heading: "The tyranny of the rocket equation",
            body: "Tsiolkovsky's equation says the speed you can gain depends on exhaust velocity and the ratio of full-to-empty mass — logarithmically. That brutal math is why rockets are ~90% propellant, why they shed empty stages as they climb, and why every gram of payload is fought over.",
          },
          {
            heading: "Propellant choices",
            body: "Kerosene and liquid oxygen (Falcon 9) is dense and practical. Liquid hydrogen (SLS, Ariane) gives the best performance but boils at −253 °C. Methane (Starship, Vulcan) splits the difference and could be manufactured on Mars. Solid boosters are simple and mighty but can't be throttled or shut down.",
          },
          {
            heading: "Landing them backwards",
            body: "Reusability changed everything: a Falcon 9 booster relights its engines to brake from hypersonic speed and lands on its tail, and boosters now fly 20+ missions. Since the engine can't throttle below the rocket's weight, the landing burn must reach zero speed at exactly zero altitude — a 'hoverslam'.",
          },
        ],
        funFact:
          "The Saturn V's first stage burned 15 tonnes of propellant per second and produced more power than 85 Hoover Dams — for two and a half minutes.",
      },
      {
        id: "spacesuits",
        title: "Spacesuits",
        tagline: "A one-person spacecraft you can wear",
        symbol: "⛑",
        color: colors.green,
        stats: [
          { value: "~120 kg", label: "EVA suit mass (on Earth)" },
          { value: "0.3 atm", label: "internal pressure, pure O₂" },
          { value: "8 h", label: "typical spacewalk endurance" },
        ],
        sections: [
          {
            heading: "Why you need one",
            body: "Unprotected in vacuum, you'd lose consciousness in about 15 seconds as dissolved gases leave your blood; temperatures swing from +120 °C in sunlight to −150 °C in shadow, and micrometeoroids cruise past at kilometers per second. A suit is a wearable spacecraft with its own atmosphere, cooling, power and comms.",
          },
          {
            heading: "Low pressure, pure oxygen",
            body: "Suits run at about a third of sea-level pressure using pure oxygen — full pressure would balloon the suit so stiff astronauts couldn't bend their fingers. Before a spacewalk, crews 'pre-breathe' oxygen for hours to purge nitrogen from their blood, the same reason scuba divers ascend slowly.",
          },
          {
            heading: "Liquid cooling",
            body: "Working hard in an insulated bag generates serious heat, so astronauts wear a mesh undergarment threaded with 90 meters of water tubing. The water carries body heat to a sublimator that vents it as ice vapor into space — sweat, technologically upgraded.",
          },
          {
            heading: "Gloves are the hard part",
            body: "Every joint fights internal pressure, and hands suffer most: hours of gripping tools in pressurized gloves is like squeezing a tennis ball nonstop, and astronauts sometimes lose fingernails. Next-generation suits for Artemis moonwalks focus heavily on mobility and better gloves.",
          },
        ],
        funFact:
          "Aboard the ISS, suits aren't sized — they're assembled. Arms, legs and torsos snap together from a stock of modular parts to fit each astronaut.",
      },
      {
        id: "reentry",
        title: "Reentry & Heat Shields",
        tagline: "Turning 7.8 km/s back into zero",
        symbol: "☄",
        color: colors.amber,
        stats: [
          { value: "~1,650 °C", label: "capsule shield temperature" },
          { value: "25×", label: "speed of sound at entry" },
          { value: "4–6 g", label: "deceleration on a capsule" },
        ],
        sections: [
          {
            heading: "It's compression, not friction",
            body: "A returning spacecraft slams into air faster than the air can get out of the way, compressing it into a glowing shock layer thousands of degrees hot. The heat comes overwhelmingly from that compression — the vehicle surfs behind its own shockwave, which keeps the very hottest gas slightly off the surface.",
          },
          {
            heading: "Blunt is beautiful",
            body: "Intuition says a returning craft should be needle-sharp; physics says the opposite. A blunt, rounded shape pushes the shockwave far ahead of the hull and dumps most of the energy into the passing air instead of the vehicle. Every crewed capsule since 1961 has been a blunt body flying heat-shield-first.",
          },
          {
            heading: "Shields that sacrifice themselves",
            body: "Ablative shields — like the PICA-X on SpaceX's Dragon — char and erode on purpose, carrying heat away with the departing material. The Space Shuttle instead used 24,000 reusable silica tiles so insulating that a glowing-hot tile could be held in bare hands seconds later.",
          },
          {
            heading: "The plasma blackout",
            body: "The shock layer is hot enough to strip electrons from air molecules, wrapping the craft in plasma that blocks radio. For several minutes, mission control hears nothing — a silence every crew and control room simply has to endure until the capsule slows enough for signals to punch through.",
          },
        ],
        funFact:
          "Apollo capsules returning from the Moon hit the atmosphere at 11 km/s — the fastest human reentries ever — and their crews briefly became visible from the ground as artificial meteors.",
      },
    ],
  },
];

/** Total topic count, shown on the Learn library header. */
export const TOPIC_COUNT = TOPIC_CATEGORIES.reduce((n, c) => n + c.topics.length, 0);
