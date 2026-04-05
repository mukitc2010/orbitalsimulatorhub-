#!/usr/bin/env node
/**
 * Activate Workflows in n8n
 * This script attempts to activate workflows via API
 */

import http from 'http';

const N8N_URL = 'http://localhost:5678';
const N8N_API_KEY = process.env.N8N_API_KEY || '';

console.log('⚙️  Activating Workflows in n8n...\n');

// Function to make HTTP request
function makeRequest(options) {
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
    req.end();
  });
}

// Function to list workflows
async function listWorkflows() {
  try {
    const options = {
      hostname: 'localhost',
      port: 5678,
      path: '/api/v1/workflows',
      method: 'GET',
      headers: N8N_API_KEY ? { 'X-N8N-API-KEY': N8N_API_KEY } : {}
    };
    
    const response = await makeRequest(options);
    if (response.status === 200 && Array.isArray(response.body)) {
      return response.body;
    }
  } catch (error) {
    // API might not be available, that's okay
  }
  return null;
}

// Function to activate workflow
async function activateWorkflow(workflowId) {
  try {
    const options = {
      hostname: 'localhost',
      port: 5678,
      path: `/api/v1/workflows/${workflowId}/activate`,
      method: 'POST',
      headers: N8N_API_KEY ? { 'X-N8N-API-KEY': N8N_API_KEY } : {}
    };
    
    const response = await makeRequest(options);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

// Main function
async function main() {
  console.log('='.repeat(60));
  
  if (!N8N_API_KEY) {
    console.log('⚠️  N8N_API_KEY not set. Manual activation required.\n');
    console.log('📋 MANUAL ACTIVATION:');
    console.log('   1. Open n8n: http://localhost:5678');
    console.log('   2. Go to "Workflows"');
    console.log('   3. Find "Daily RSS to Blog"');
    console.log('   4. Toggle "Active" switch ON');
    console.log('   5. Find "Daily Ollama Research"');
    console.log('   6. Toggle "Active" switch ON\n');
    console.log('💡 To enable API activation, set N8N_API_KEY environment variable\n');
    return;
  }
  
  const workflows = await listWorkflows();
  if (!workflows) {
    console.log('❌ Could not connect to n8n API');
    console.log('   Make sure n8n is running and API key is set\n');
    return;
  }
  
  // Find workflows by name
  const rssWorkflow = workflows.find(w => w.name.includes('RSS') || w.name.includes('rss'));
  const researchWorkflow = workflows.find(w => w.name.includes('Research') || w.name.includes('research'));
  
  if (rssWorkflow) {
    const activated = await activateWorkflow(rssWorkflow.id);
    if (activated) {
      console.log('✅ RSS workflow activated');
    } else {
      console.log('⚠️  Could not activate RSS workflow');
    }
  } else {
    console.log('⚠️  RSS workflow not found');
  }
  
  if (researchWorkflow) {
    const activated = await activateWorkflow(researchWorkflow.id);
    if (activated) {
      console.log('✅ Research workflow activated');
    } else {
      console.log('⚠️  Could not activate research workflow');
    }
  } else {
    console.log('⚠️  Research workflow not found');
  }
  
  console.log('\n✅ Activation complete!\n');
}

main().catch(console.error);
