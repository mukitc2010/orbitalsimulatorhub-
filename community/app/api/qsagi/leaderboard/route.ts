import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const scenario = url.searchParams.get("scenario") || "SCHWARZSCHILD_FLYBY";

  const supa = supabaseServer();
  const { data, error } = await supa
    .from("qsagi_leaderboard")
    .select("id, created_at, display_name, score, scenario, run_id")
    .eq("scenario", scenario)
    .order("score", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leaderboard: data });
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    userId?: string | null;
    displayName: string;
    scenario: string;
    score: number;
    runId: string;
  };

  const supa = supabaseServer();
  const { error } = await supa.from("qsagi_leaderboard").insert({
    user_id: body.userId ?? null,
    display_name: body.displayName,
    scenario: body.scenario,
    score: body.score,
    run_id: body.runId,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
