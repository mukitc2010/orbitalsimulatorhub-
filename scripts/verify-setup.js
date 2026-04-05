#!/usr/bin/env node
/**
 * Verify Setup - Checks if everything is configured correctly
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Verifying Setup...\n');
console.log('='.repeat(60));

let allGood = true;

// Check Ollama
console.log('\n🤖 Checking Ollama...');
try {
  execSync('ollama --version', { stdio: 'pipe' });
  console.log('✅ Ollama is installed');
  
  try {
    const response = execSync('curl http://localhost:11434/api/tags', { encoding: 'utf-8', stdio: 'pipe' });
    if (response.includes('llama2')) {
      console.log('✅ Ollama is running');
      console.log('✅ llama2 model is available');
    } else {
      console.log('⚠️  Ollama is running but llama2 model not found');
      console.log('   Run: ollama pull llama2');
      allGood = false;
    }
  } catch (e) {
    console.log('❌ Ollama is NOT running');
    console.log('   Start it: ollama serve');
    allGood = false;
  }
} catch (e) {
  console.log('❌ Ollama is NOT installed');
  console.log('   Install: https://ollama.ai');
  allGood = false;
}

// Check API Server
console.log('\n🌐 Checking API Server...');
try {
  const response = execSync('curl http://localhost:3003/api/blog/health', { encoding: 'utf-8', stdio: 'pipe' });
  if (response.includes('ok')) {
    console.log('✅ API Server is running');
  } else {
    console.log('⚠️  API Server responded but status unclear');
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
} catch (e) {
  console.log('❌ n8n is NOT running');
  console.log('   Start it: n8n start (or: npx n8n)');
  allGood = false;
}

// Check Workflow Files
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

// Check Blog Posts File
console.log('\n📝 Checking Blog Posts File...');
const blogPosts = join(rootDir, 'client', 'src', 'data', 'blogPosts.ts');
if (existsSync(blogPosts)) {
  console.log('✅ Blog posts file exists');
} else {
  console.log('❌ Blog posts file missing');
  allGood = false;
}

// Final Summary
console.log('\n' + '='.repeat(60));
if (allGood) {
  console.log('✅ ALL CHECKS PASSED!');
  console.log('\n🚀 You\'re ready to go!');
  console.log('   1. Open n8n: http://localhost:5678');
  console.log('   2. Import workflows');
  console.log('   3. Activate them');
  console.log('   4. Done! Posts will generate automatically.\n');
} else {
  console.log('⚠️  SOME CHECKS FAILED');
  console.log('\n📖 Fix the issues above, then run this script again.');
  console.log('   Or see: QUICK-START-READY.md for help.\n');
}
