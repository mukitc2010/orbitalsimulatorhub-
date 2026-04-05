#!/usr/bin/env node
import { execSync } from 'child_process';

console.log('🧪 Testing Setup...\n');

// Test Ollama
console.log('Testing Ollama...');
try {
  execSync('curl http://localhost:11434/api/tags', { stdio: 'pipe' });
  console.log('✅ Ollama is running');
} catch (e) {
  console.log('❌ Ollama is NOT running. Start it with: ollama serve');
}

// Test API
console.log('\nTesting API Server...');
try {
  execSync('curl http://localhost:3003/api/blog/health', { stdio: 'pipe' });
  console.log('✅ API Server is running');
} catch (e) {
  console.log('❌ API Server is NOT running. Start it with: npm run dev:api');
}

// Test n8n
console.log('\nTesting n8n...');
try {
  execSync('curl http://localhost:5678', { stdio: 'pipe' });
  console.log('✅ n8n is running');
} catch (e) {
  console.log('❌ n8n is NOT running. Start it with: n8n start');
}

console.log('\n✅ Testing complete!');
