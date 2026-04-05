#!/usr/bin/env node
/**
 * Auto-Import Workflows to n8n via API
 * Attempts to import workflows programmatically
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const N8N_URL = 'http://localhost:5678';

console.log('🚀 Auto-Importing Workflows to n8n...\n');
console.log('='.repeat(60));

// Read workflow files
const workflow1Path = join(rootDir, 'n8n', 'workflows', 'daily-rss-to-blog.json');
const workflow2Path = join(rootDir, 'n8n', 'workflows', 'daily-ollama-research.json');

// Function to make HTTP request
function httpRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          resolve({ 
            status: res.statusCode, 
            headers: res.headers,
            body: body ? JSON.parse(body) : null 
          });
        } catch (e) {
          resolve({ 
            status: res.statusCode, 
            headers: res.headers,
            body: body 
          });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

// Step 1: Check if n8n is running
async function checkN8n() {
  try {
    const response = await httpRequest({
      hostname: 'localhost',
      port: 5678,
      path: '/healthz',
      method: 'GET'
    });
    return response.status === 200;
  } catch (e) {
    return false;
  }
}

// Step 2: Try to get session/auth
async function getSession() {
  try {
    // Try to create a session (n8n might allow this)
    const response = await httpRequest({
      hostname: 'localhost',
      port: 5678,
      path: '/api/v1/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, {
      email: 'admin@example.com',
      password: 'admin'
    });
    
    if (response.status === 200 && response.body?.data?.token) {
      return response.body.data.token;
    }
  } catch (e) {
    // Ignore
  }
  return null;
}

// Step 3: Import workflow via API
async function importWorkflow(workflowData, token = null) {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (token) {
    headers['X-N8N-API-KEY'] = token;
  }
  
  try {
    const response = await httpRequest({
      hostname: 'localhost',
      port: 5678,
      path: '/api/v1/workflows',
      method: 'POST',
      headers: headers
    }, workflowData);
    
    return response;
  } catch (e) {
    return { status: 0, error: e.message };
  }
}

// Step 4: List existing workflows
async function listWorkflows(token = null) {
  const headers = {};
  if (token) {
    headers['X-N8N-API-KEY'] = token;
  }
  
  try {
    const response = await httpRequest({
      hostname: 'localhost',
      port: 5678,
      path: '/api/v1/workflows',
      method: 'GET',
      headers: headers
    });
    
    return response;
  } catch (e) {
    return { status: 0, error: e.message };
  }
}

// Step 5: Activate workflow
async function activateWorkflow(workflowId, token = null) {
  const headers = {};
  if (token) {
    headers['X-N8N-API-KEY'] = token;
  }
  
  try {
    const response = await httpRequest({
      hostname: 'localhost',
      port: 5678,
      path: `/api/v1/workflows/${workflowId}/activate`,
      method: 'POST',
      headers: headers
    });
    
    return response;
  } catch (e) {
    return { status: 0, error: e.message };
  }
}

// Main function
async function main() {
  // Check n8n is running
  console.log('📋 Step 1: Checking n8n...');
  const n8nRunning = await checkN8n();
  if (!n8nRunning) {
    console.log('❌ n8n is NOT running');
    console.log('   Start it: n8n start\n');
    return;
  }
  console.log('✅ n8n is running\n');
  
  // Try to get token (might not work without auth setup)
  console.log('📋 Step 2: Checking authentication...');
  const token = await getSession();
  if (token) {
    console.log('✅ Got authentication token\n');
  } else {
    console.log('⚠️  No API authentication (this is normal for default n8n)\n');
    console.log('   Will try direct import...\n');
  }
  
  // Read workflow files
  console.log('📋 Step 3: Reading workflow files...');
  let workflow1, workflow2;
  try {
    workflow1 = JSON.parse(readFileSync(workflow1Path, 'utf-8'));
    workflow2 = JSON.parse(readFileSync(workflow2Path, 'utf-8'));
    console.log('✅ Workflow files loaded\n');
  } catch (e) {
    console.log('❌ Error reading workflow files:', e.message);
    return;
  }
  
  // Try to import workflows
  console.log('📋 Step 4: Importing workflows...\n');
  
  // Import workflow 1
  console.log('   Importing: Daily RSS to Blog...');
  const result1 = await importWorkflow(workflow1, token);
  if (result1.status === 200 || result1.status === 201) {
    console.log('   ✅ RSS workflow imported successfully!');
    if (result1.body?.id) {
      console.log(`   Workflow ID: ${result1.body.id}`);
      
      // Try to activate
      console.log('   Activating workflow...');
      const activate1 = await activateWorkflow(result1.body.id, token);
      if (activate1.status === 200) {
        console.log('   ✅ RSS workflow activated!\n');
      } else {
        console.log('   ⚠️  Could not activate (you can do this manually)\n');
      }
    }
  } else {
    console.log(`   ⚠️  Could not import via API (status: ${result1.status})`);
    console.log('   You\'ll need to import manually (see instructions below)\n');
  }
  
  // Import workflow 2
  console.log('   Importing: Daily Ollama Research...');
  const result2 = await importWorkflow(workflow2, token);
  if (result2.status === 200 || result2.status === 201) {
    console.log('   ✅ Research workflow imported successfully!');
    if (result2.body?.id) {
      console.log(`   Workflow ID: ${result2.body.id}`);
      
      // Try to activate
      console.log('   Activating workflow...');
      const activate2 = await activateWorkflow(result2.body.id, token);
      if (activate2.status === 200) {
        console.log('   ✅ Research workflow activated!\n');
      } else {
        console.log('   ⚠️  Could not activate (you can do this manually)\n');
      }
    }
  } else {
    console.log(`   ⚠️  Could not import via API (status: ${result2.status})`);
    console.log('   You\'ll need to import manually (see instructions below)\n');
  }
  
  // Check if workflows exist
  console.log('📋 Step 5: Verifying workflows...');
  const workflows = await listWorkflows(token);
  if (workflows.status === 200 && Array.isArray(workflows.body)) {
    const rssWorkflow = workflows.body.find(w => 
      w.name.includes('RSS') || w.name.includes('rss') || 
      w.name.includes('Daily RSS')
    );
    const researchWorkflow = workflows.body.find(w => 
      w.name.includes('Research') || w.name.includes('research') ||
      w.name.includes('Ollama')
    );
    
    if (rssWorkflow) {
      console.log(`   ✅ Found RSS workflow: "${rssWorkflow.name}" (ID: ${rssWorkflow.id})`);
      if (rssWorkflow.active) {
        console.log('   ✅ RSS workflow is ACTIVE');
      } else {
        console.log('   ⚠️  RSS workflow is NOT active');
      }
    }
    
    if (researchWorkflow) {
      console.log(`   ✅ Found Research workflow: "${researchWorkflow.name}" (ID: ${researchWorkflow.id})`);
      if (researchWorkflow.active) {
        console.log('   ✅ Research workflow is ACTIVE');
      } else {
        console.log('   ⚠️  Research workflow is NOT active');
      }
    }
    
    if (!rssWorkflow || !researchWorkflow) {
      console.log('   ⚠️  Some workflows not found');
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n✅ IMPORT COMPLETE!\n');
  
  // Final instructions
  if (result1.status !== 200 && result1.status !== 201) {
    console.log('📋 MANUAL IMPORT REQUIRED:\n');
    console.log('   1. Open: http://localhost:5678');
    console.log('   2. Click "Workflows" → "Import from File"');
    console.log('   3. Import: n8n/workflows/daily-rss-to-blog.json');
    console.log('   4. Import: n8n/workflows/daily-ollama-research.json');
    console.log('   5. Toggle "Active" ON for both workflows\n');
  } else {
    console.log('🎉 Workflows imported successfully!\n');
    console.log('📋 Next steps:');
    console.log('   1. Open: http://localhost:5678');
    console.log('   2. Verify workflows are there');
    console.log('   3. Test: Click "Execute Workflow" on one');
    console.log('   4. If not active, toggle "Active" ON\n');
  }
  
  console.log('📊 Expected results:');
  console.log('   - 9 AM daily: RSS workflow → 1-2 posts');
  console.log('   - 2 PM daily: Research workflow → 1 post');
  console.log('   - Total: 2-3 posts per day automatically!\n');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  console.log('\n📋 Manual import required. See instructions above.\n');
});
