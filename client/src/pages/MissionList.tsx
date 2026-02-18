import { Link } from "wouter";
import { ALL_MISSIONS } from "../data/missions";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function MissionList() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          Missions
        </h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          Explore historic human spaceflight missions — from Apollo lunar landings to the
          Space Shuttle and beyond.
        </p>
      </div>

      <div className="space-y-4">
        {ALL_MISSIONS.map((mission) => (
          <Link key={mission.id} href={`/missions/${mission.slug}`}>
            <a
              className="block rounded-xl p-5 transition"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {mission.name}
                  </h2>
                  <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                    {mission.program} · {mission.agency} · {mission.destinations.join(", ")}
                  </div>
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {formatDate(mission.launch.date)}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border-color)" }}>
        <Link href="/artifacts">
          <a className="font-medium" style={{ color: "var(--accent-primary)" }}>
            What Humans Brought Back From Space →
          </a>
        </Link>
      </div>
    </div>
  );
}
