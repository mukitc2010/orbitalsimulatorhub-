/**
 * Quantum Space AGI API — POST /api/qsagi/runs, GET /api/qsagi/runs, leaderboard
 */
import express from "express";
import { randomUUID } from "crypto";
import { buildRun, quantumAssistOptimize } from "./qsagi/quantumAssist";
import { fetchQAssist } from "./qsagi/qassistClient";
import { supabaseServer } from "./supabase";
import type { SimParams, SimRun } from "./qsagi/types";

const router = express.Router();

const runsStore = new Map<string, SimRun>();

function saveRun(run: SimRun) {
  runsStore.set(run.id, run);
}

function listRuns(): SimRun[] {
  return Array.from(runsStore.values()).sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt)
  );
}

router.get("/runs", (_req, res) => {
  res.json({ runs: listRuns() });
});

router.post("/runs", async (req, res) => {
  try {
    const { params, mode } = req.body as { params: SimParams; mode?: "classical" | "assisted" };
    if (!params) {
      res.status(400).json({ error: "Missing params" });
      return;
    }
    const runMode = mode ?? "classical";

    const id = randomUUID();
    let effectiveParams: SimParams;

    if (runMode === "assisted") {
      try {
        const qassist = await fetchQAssist(params);
        effectiveParams = { ...params, v0: qassist.best_v0, quantumAssist: true };
      } catch {
        effectiveParams = quantumAssistOptimize(params);
      }
    } else {
      effectiveParams = { ...params, quantumAssist: false };
    }

    const run = buildRun(effectiveParams, id);
    saveRun(run);
    res.json({ run });
  } catch (err) {
    console.error("[qsagi] run error:", err);
    res.status(500).json({ error: "Simulation failed" });
  }
});

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "qsagi" });
});

router.get("/leaderboard", async (req, res) => {
  try {
    const scenario = (req.query.scenario as string) || "SCHWARZSCHILD_FLYBY";
    const supa = supabaseServer();
    const { data, error } = await supa
      .from("qsagi_leaderboard")
      .select("id, created_at, display_name, score, scenario, run_id")
      .eq("scenario", scenario)
      .order("score", { ascending: false })
      .limit(50);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ leaderboard: data });
  } catch (err) {
    console.error("[qsagi] leaderboard get error:", err);
    res.status(500).json({ error: "Leaderboard unavailable" });
  }
});

router.post("/leaderboard", async (req, res) => {
  try {
    const body = req.body as {
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
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    console.error("[qsagi] leaderboard post error:", err);
    res.status(500).json({ error: "Failed to submit score" });
  }
});

export function createQsagiRouter() {
  return router;
}
