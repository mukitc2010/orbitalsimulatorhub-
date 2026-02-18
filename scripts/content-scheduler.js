#!/usr/bin/env node
/**
 * Content Scheduler — runs content-agent.js every 24 hours.
 *
 * Usage:
 *   node scripts/content-scheduler.js          (runs agent immediately + every 24h)
 *   node scripts/content-scheduler.js --wait   (waits for first 24h cycle, then repeats)
 *
 * To keep this running permanently:
 *   - Windows: use Task Scheduler to run `node scripts/content-agent.js` daily
 *   - Linux/Mac: use cron: 0 6 * * * cd /path/to/project && node scripts/content-agent.js
 *   - Or keep this script running with pm2: pm2 start scripts/content-scheduler.js
 *   - Or use the existing n8n workflow system
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

const WAIT_FIRST = process.argv.includes('--wait');

function runAgent() {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] Running content agent...`);
  try {
    execSync('node scripts/content-agent.js', { cwd: ROOT, stdio: 'inherit' });
    console.log(`[${timestamp}] Agent completed successfully.`);
  } catch (e) {
    console.error(`[${timestamp}] Agent failed:`, e.message);
  }
}

function scheduleNext() {
  const nextRun = new Date(Date.now() + INTERVAL_MS);
  console.log(`⏰ Next run scheduled for: ${nextRun.toISOString()}`);
  setTimeout(() => {
    runAgent();
    scheduleNext();
  }, INTERVAL_MS);
}

console.log('📅 Content Scheduler started');
console.log(`   Interval: 24 hours (${INTERVAL_MS}ms)`);
console.log(`   Wait for first cycle: ${WAIT_FIRST}`);
console.log('   Press Ctrl+C to stop.\n');

if (!WAIT_FIRST) {
  runAgent();
}

scheduleNext();
