#!/usr/bin/env node
/**
 * Complete Setup - Verifies everything and provides final steps
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Checking Setup Status...\n');
console.log('='.repeat(60));

let allGood = true;

// Check Ollama
console.log('\n🤖 Checking Ollama...');
try {
  execSync('curl http://localhost:11434/api/tags', { stdio: 'pipe', encoding: 'utf-8' });
  console.log('✅ Ollama is running');
} catch (e) {
  console.log('❌ Ollama is NOT running');
  console.log('   Start it: ollama serve');
  allGood = false;
}

// Check API Server
console.log('\n🌐 Checking API Server...');
try {
  const response = execSync('curl http://localhost:3003/api/blog/health', { stdio: 'pipe', encoding: 'utf-8' });
  if (response.includes('ok')) {
    console.log('✅ API Server is running');
  }
} catch (e) {
  console.log('❌ API Server is NOT running');
  console.log('   Start it: npm run dev:api');
  allGood = false;
}

// Check n8n
console.log('\n⚙️  Checking n8n...');
try {
  execSync('curl http://localhost:5678', { stdio: 'pipe' });
  console.log('✅ n8n is running');
  console.log('   Open: http://localhost:5678');
} catch (e) {
  console.log('❌ n8n is NOT running');
  console.log('   Start it: n8n start');
  allGood = false;
}

// Check workflow files
console.log('\n📋 Checking Workflow Files...');
const workflow1 = join(rootDir, 'n8n', 'workflows', 'daily-rss-to-blog.json');
const workflow2 = join(rootDir, 'n8n', 'workflows', 'daily-ollama-research.json');

if (existsSync(workflow1)) {
  console.log('✅ RSS workflow file exists');
} else {
  console.log('❌ RSS workflow file missing');
  allGood = false;
}

if (existsSync(workflow2)) {
  console.log('✅ Research workflow file exists');
} else {
  console.log('❌ Research workflow file missing');
  allGood = false;
}

console.log('\n' + '='.repeat(60));

if (allGood) {
  console.log('\n✅ ALL SERVICES ARE RUNNING!\n');
  console.log('📋 FINAL STEPS (2 minutes):\n');
  console.log('1. Open n8n in your browser:');
  console.log('   http://localhost:5678\n');
  console.log('2. Import workflows:');
  console.log('   - Click "Workflows" → "Import from File"');
  console.log('   - Import: n8n/workflows/daily-rss-to-blog.json');
  console.log('   - Import: n8n/workflows/daily-ollama-research.json\n');
  console.log('3. Test one workflow:');
  console.log('   - Click on a workflow');
  console.log('   - Click "Execute Workflow"');
  console.log('   - Wait for it to complete\n');
  console.log('4. Activate workflows:');
  console.log('   - Go to "Workflows" page');
  console.log('   - Toggle "Active" ON for both workflows\n');
  console.log('✅ THAT\'S IT! Posts will generate automatically!\n');
  console.log('📊 Expected:');
  console.log('   - 9 AM daily: RSS workflow → 1-2 posts');
  console.log('   - 2 PM daily: Research workflow → 1 post');
  console.log('   - Total: 2-3 posts per day automatically!\n');
} else {
  console.log('\n⚠️  SOME SERVICES ARE NOT RUNNING\n');
  console.log('📋 Start missing services:\n');
  console.log('   Terminal 1: ollama serve');
  console.log('   Terminal 2: npm run dev:api');
  console.log('   Terminal 3: n8n start\n');
  console.log('   Or double-click: start-all-services.bat\n');
}

console.log('💡 Quick commands:');
console.log('   npm run verify  - Check status');
console.log('   npm run setup   - Run setup again\n');
