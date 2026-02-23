/**
 * AstroBot Memory Store — User progress and preferences
 * Uses in-memory fallback when Supabase is not configured
 */

export interface UserMemory {
  userId: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  lastTopic: string;
  weakTopics: string[];
  progress: Record<string, number>;
  preferredStyle: "concise" | "detailed" | "interactive";
  lastUpdated: string;
}

const inMemoryStore = new Map<string, UserMemory>();

const DEFAULT_MEMORY: Omit<UserMemory, "userId" | "lastUpdated"> = {
  skillLevel: "beginner",
  lastTopic: "",
  weakTopics: [],
  progress: {},
  preferredStyle: "interactive",
};

export async function getUserMemory(userId: string): Promise<UserMemory | null> {
  if (inMemoryStore.has(userId)) {
    return inMemoryStore.get(userId) ?? null;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/astrobot_memory?userId=eq.${encodeURIComponent(userId)}&select=*`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0) {
          const row = rows[0];
          const mem: UserMemory = {
            userId: row.userId || userId,
            skillLevel: row.skillLevel || "beginner",
            lastTopic: row.lastTopic || "",
            weakTopics: Array.isArray(row.weakTopics) ? row.weakTopics : [],
            progress: typeof row.progress === "object" ? row.progress : {},
            preferredStyle: row.preferredStyle || "interactive",
            lastUpdated: row.lastUpdated || new Date().toISOString(),
          };
          inMemoryStore.set(userId, mem);
          return mem;
        }
      }
    } catch {
      // Fall through to default
    }
  }

  const defaultMem: UserMemory = {
    userId,
    ...DEFAULT_MEMORY,
    lastUpdated: new Date().toISOString(),
  };
  inMemoryStore.set(userId, defaultMem);
  return defaultMem;
}

export async function updateMemory(userId: string, patch: Partial<Omit<UserMemory, "userId" | "lastUpdated">>): Promise<void> {
  const existing = await getUserMemory(userId);
  const updated: UserMemory = {
    userId,
    skillLevel: patch.skillLevel ?? existing?.skillLevel ?? "beginner",
    lastTopic: patch.lastTopic ?? existing?.lastTopic ?? "",
    weakTopics: patch.weakTopics ?? existing?.weakTopics ?? [],
    progress: patch.progress ?? existing?.progress ?? {},
    preferredStyle: patch.preferredStyle ?? existing?.preferredStyle ?? "interactive",
    lastUpdated: new Date().toISOString(),
  };
  inMemoryStore.set(userId, updated);

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/astrobot_memory`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
          "X-Client-Info": "astrobot-agi",
        },
        body: JSON.stringify({
          userId,
          skillLevel: updated.skillLevel,
          lastTopic: updated.lastTopic,
          weakTopics: updated.weakTopics,
          progress: updated.progress,
          preferredStyle: updated.preferredStyle,
          lastUpdated: updated.lastUpdated,
        }),
      });
    } catch {
      // Ignore Supabase errors; in-memory is updated
    }
  }
}
