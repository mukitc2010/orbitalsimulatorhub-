import { faultEvents, signalDelaySeconds, type CraftMode } from "./spacecraftPlan";

export type CraftFacts = {
  mode: CraftMode;
  modeName: string;
  system: string;
  delayMinutes: number;
};

export type CraftReview = { score: number; ready: boolean; issues: string[] };

const HYPOTHETICAL = "AGI and ASI are hypothetical. This timing is illustrative.";

export function formatCraftPlan(facts: CraftFacts): string {
  const delay = signalDelaySeconds(facts.delayMinutes);
  const lines = [
    "OPERATIONS PLAN",
    `Mode: ${facts.modeName}`,
    `System: ${facts.system}`,
    `One-way delay: ${delay} s (${facts.delayMinutes} min, compressed)`,
    `Hypothetical: ${facts.mode === 0 ? "no" : "yes"}`,
    ...faultEvents(facts.mode, delay).map((event) => `T+${event.at} s — ${event.label}`),
    HYPOTHETICAL,
  ];
  return lines.join("\n");
}

/** Local reviewer. Numbers must match the shared delay and event list. */
export function reviewCraftPlan(text: string, facts: CraftFacts): CraftReview {
  const issues: string[] = [];
  const delay = signalDelaySeconds(facts.delayMinutes);
  if (!text.startsWith("OPERATIONS PLAN")) issues.push("Missing OPERATIONS PLAN heading.");
  if (!text.includes(`Mode: ${facts.modeName}`)) issues.push("Mode line does not match the selected mode.");
  if (!text.includes(`System: ${facts.system}`)) issues.push("System line does not match the faulted system.");
  if (!text.includes(`One-way delay: ${delay} s (${facts.delayMinutes} min, compressed)`)) issues.push("Delay line does not match the compressed signal delay.");
  if (!text.includes(`Hypothetical: ${facts.mode === 0 ? "no" : "yes"}`)) issues.push("Hypothetical flag is wrong for this mode.");
  if (!text.includes(HYPOTHETICAL)) issues.push("Missing the hypothetical-systems note.");
  for (const event of faultEvents(facts.mode, delay)) {
    if (!text.includes(`T+${event.at} s — ${event.label}`)) issues.push(`Missing event ${event.label} at ${event.at} s.`);
  }
  if (facts.mode === 0 && !text.includes(`T+${delay * 2 + 5} s — Robot deploys`)) issues.push("Ground control must wait for both signal trips.");
  const ready = issues.length === 0;
  return { score: ready ? 5 : 2, ready, issues };
}

export function loopCraftPlan(facts: CraftFacts): { text: string; rounds: number; review: CraftReview } {
  let text = formatCraftPlan(facts);
  let review = reviewCraftPlan(text, facts);
  let rounds = 1;
  for (let attempt = 0; attempt < 2 && !(review.ready && review.score >= 4 && review.issues.length === 0); attempt += 1) {
    text = formatCraftPlan(facts);
    review = reviewCraftPlan(text, facts);
    rounds += 1;
  }
  if (!(review.ready && review.score >= 4 && review.issues.length === 0)) {
    return {
      text: "OPERATIONS PLAN\nStatus: unverified. No repair timeline was released.",
      rounds,
      review,
    };
  }
  return { text: `${text}\nStatus: reviewed, no issues`, rounds, review };
}
