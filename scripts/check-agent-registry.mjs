import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(readFileSync(join(root, "agents/registry.json"), "utf8"));
const model = readFileSync(join(root, "agents/OPERATING_MODEL.md"), "utf8");
const errors = [];

function fail(message) {
  errors.push(message);
}

if (registry.version !== 2) fail(`registry version is ${registry.version}, expected 2`);
if (registry.totalAgents !== 10) fail(`totalAgents is ${registry.totalAgents}, expected 10`);
if (!Array.isArray(registry.agents) || registry.agents.length !== registry.totalAgents) {
  fail(`agents length is ${registry.agents?.length}, expected ${registry.totalAgents}`);
}

const groups = Array.isArray(registry.groups) ? registry.groups : [];
const groupSum = groups.reduce((sum, group) => sum + Number(group.count), 0);
if (groupSum !== registry.totalAgents) {
  fail(`group counts sum to ${groupSum}, expected ${registry.totalAgents}`);
}

const ids = new Set();
const seenByGroup = {};
for (const agent of registry.agents ?? []) {
  if (!agent.id || ids.has(agent.id)) fail(`duplicate or empty agent id: ${agent.id}`);
  ids.add(agent.id);
  seenByGroup[agent.group] = (seenByGroup[agent.group] ?? 0) + 1;
  if (!Array.isArray(agent.owns) || agent.owns.length === 0) fail(`${agent.id} has no owned paths`);
  if (!Array.isArray(agent.checks) || agent.checks.length === 0) fail(`${agent.id} has no checks`);
  if (!agent.charter || !existsSync(join(root, agent.charter))) {
    fail(`${agent.id} is missing charter ${agent.charter}`);
  }
}

for (const group of groups) {
  const seen = seenByGroup[group.id] ?? 0;
  if (seen !== group.count) {
    fail(`group ${group.id} declares ${group.count} and lists ${seen}`);
  }
}

if (!model.includes("This registry defines 10 agents.")) {
  fail("OPERATING_MODEL.md must say: This registry defines 10 agents.");
}

for (const doc of ["agents/DAILY_SPACE_NEWS_EDITOR.md", "agents/ORACLE_LOOP_ENGINEER.md"]) {
  if (!existsSync(join(root, doc))) fail(`missing procedure ${doc}`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Agent registry ok: ${registry.totalAgents} agents.`);
