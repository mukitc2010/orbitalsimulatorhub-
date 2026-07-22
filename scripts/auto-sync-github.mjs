#!/usr/bin/env node
import { execSync } from "node:child_process";

const remote = process.env.SYNC_REMOTE || "origin";
const targetBranch = process.env.SYNC_BRANCH || "main";
const intervalMs = Number(process.env.SYNC_INTERVAL_MS || 60000);
const once = process.argv.includes("--once");

let running = false;

function run(cmd, options = {}) {
  return execSync(cmd, {
    encoding: "utf8",
    stdio: options.stdio || "pipe",
  }).trim();
}

function safeRun(cmd, options = {}) {
  try {
    return { ok: true, out: run(cmd, options) };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return { ok: false, out: msg };
  }
}

function log(msg) {
  const now = new Date().toISOString();
  process.stdout.write(`[auto-sync ${now}] ${msg}\n`);
}

function syncOnce() {
  if (running) return;
  running = true;

  try {
    const status = safeRun("git status --porcelain");
    if (!status.ok) {
      log(`Cannot read git status: ${status.out}`);
      return;
    }

    if (!status.out) {
      log("No changes detected.");
      return;
    }

    const addResult = safeRun("git add -A");
    if (!addResult.ok) {
      log(`git add failed: ${addResult.out}`);
      return;
    }

    const stamp = new Date().toISOString();
    const commitResult = safeRun(`git commit -m \"Auto-sync: ${stamp}\"`);
    if (!commitResult.ok) {
      if (commitResult.out.includes("nothing to commit")) {
        log("No commit created (nothing to commit).");
      } else {
        log(`git commit failed: ${commitResult.out}`);
      }
      return;
    }

    const fetchResult = safeRun(`git fetch ${remote} ${targetBranch}`);
    if (!fetchResult.ok) {
      log(`git fetch failed: ${fetchResult.out}`);
      return;
    }

    const rebaseResult = safeRun(`git rebase ${remote}/${targetBranch}`);
    if (!rebaseResult.ok) {
      safeRun("git rebase --abort");
      log(`git rebase failed. Resolve conflicts manually. Details: ${rebaseResult.out}`);
      return;
    }

    const pushResult = safeRun(`git push ${remote} HEAD:${targetBranch}`);
    if (!pushResult.ok) {
      log(`git push failed: ${pushResult.out}`);
      return;
    }

    const head = safeRun("git rev-parse --short HEAD");
    log(`Pushed commit ${head.ok ? head.out : "(unknown)"} to ${remote}/${targetBranch}.`);
  } finally {
    running = false;
  }
}

log(`Auto-sync started. Target: ${remote}/${targetBranch}. Interval: ${intervalMs}ms.`);
log("Tip: stop this process with Ctrl+C when you do not want auto-push.");

if (once) {
  syncOnce();
  process.exit(0);
}

syncOnce();
setInterval(syncOnce, intervalMs);
