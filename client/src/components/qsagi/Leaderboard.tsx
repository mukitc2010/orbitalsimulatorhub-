import { useEffect, useState } from "react";

export function Leaderboard({ scenario }: { scenario: string }) {
  const [rows, setRows] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setErr(null);
      const res = await fetch(`/api/qsagi/leaderboard?scenario=${encodeURIComponent(scenario)}`);
      const data = await res.json();
      if (!res.ok) setErr(data.error || "Failed");
      else setRows(data.leaderboard || []);
    })();
  }, [scenario]);

  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <div className="text-lg font-semibold">Q-SAGI Challenge Leaderboard</div>
      <div className="text-xs opacity-70">Scenario: {scenario}</div>

      {err ? <div className="mt-2 text-sm">{err}</div> : null}

      <div className="mt-3 grid gap-2">
        {rows.length === 0 ? (
          <div className="text-sm opacity-70">No entries yet.</div>
        ) : (
          rows.map((r, i) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-white/10 p-2 text-sm">
              <div className="flex gap-3">
                <div className="w-8 opacity-70">#{i + 1}</div>
                <div>{r.display_name}</div>
              </div>
              <div className="font-mono">{Number(r.score).toFixed(2)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
