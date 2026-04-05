#!/usr/bin/env node
/**
 * Import Workflows to n8n via API
 * This script automatically imports both workflows to n8n
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const N8N_URL = 'http://localhost:5678';
const N8N_API_KEY = process.env.N8N_API_KEY || ''; // Optional: set if you have API key

// Read workflow files
const workflow1Path = join(rootDir, 'n8n', 'workflows', 'daily-rss-to-blog.json');
const workflow2Path = join(rootDir, 'n8n', 'workflows', 'daily-ollama-research.json');

console.log('📥 Importing Workflows to n8n...\n');

// Function to make HTTP request
function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Function to import workflow
async function importWorkflow(workflowPath, workflowName) {
  try {
    const workflowData = JSON.parse(readFileSync(workflowPath, 'utf-8'));
    
    // Try to import via API (if API key is set)
    if (N8N_API_KEY) {
      const options = {
        hostname: 'localhost',
        port: 5678,
        path: '/api/v1/workflows',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': N8N_API_KEY
        }
      };
      
      const response = await makeRequest(options, workflowData);
      if (response.status === 200 || response.status === 201) {
        console.log(`✅ ${workflowName} imported via API`);
        return true;
      }
    }
    
    // Fallback: Provide manual instructions
    console.log(`⚠️  ${workflowName} needs manual import`);
    console.log(`   File: ${workflowPath}`);
    return false;
  } catch (error) {
    console.log(`❌ Error importing ${workflowName}:`, error.message);
    return false;
  }
}

// Check if n8n is running
async function checkN8n() {
  try {
    const options = {
      hostname: 'localhost',
      port: 5678,
      path: '/healthz',
      method: 'GET'
    };
    
    const response = await makeRequest(options);
    if (response.status === 200) {
      console.log('✅ n8n is running\n');
      return true;
    }
  } catch (error) {
    console.log('❌ n8n is NOT running');
    console.log('   Start it: n8n start (or: npx n8n)\n');
    return false;
  }
}

// Main function
async function main() {
  console.log('='.repeat(60));
  
  // Check n8n is running
  const n8nRunning = await checkN8n();
  if (!n8nRunning) {
    console.log('\n📋 MANUAL STEPS NEEDED:');
    console.log('   1. Start n8n: n8n start');
    console.log('   2. Open: http://localhost:5678');
    console.log('   3. Import workflows manually (see below)\n');
  }
  
  // Try to import workflows
  console.log('📥 Importing workflows...\n');
  
  const workflow1Imported = await importWorkflow(workflow1Path, 'Daily RSS to Blog');
  const workflow2Imported = await importWorkflow(workflow2Path, 'Daily Ollama Research');
  
  console.log('\n' + '='.repeat(60));
  
  if (workflow1Imported && workflow2Imported) {
    console.log('✅ Both workflows imported successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Open n8n: http://localhost:5678');
    console.log('   2. Find your workflows');
    console.log('   3. Click "Execute Workflow" to test');
    console.log('   4. Toggle "Active" ON for both workflows\n');
  } else {
    console.log('📋 MANUAL IMPORT REQUIRED:\n');
    console.log('   1. Open n8n: http://localhost:5678');
    console.log('   2. Click "Workflows" → "Import from File"');
    console.log('   3. Import: n8n/workflows/daily-rss-to-blog.json');
    console.log('   4. Import: n8n/workflows/daily-ollama-research.json');
    console.log('   5. Test: Click "Execute Workflow" on one');
    console.log('   6. Activate: Toggle "Active" ON for both\n');
  }
  
  console.log('💡 TIP: To enable API import, set N8N_API_KEY environment variable');
  console.log('   (API key can be found in n8n settings)\n');
}

main().catch(console.error);
