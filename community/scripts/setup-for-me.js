#!/usr/bin/env node
/**
 * Does everything we can for you:
 * 1. Creates .env.local from .env.example
 * 2. Opens Supabase dashboard so you can create project + run SQL + copy keys
 * 3. Prints the exact 3 steps you need to do in the browser
 */

const { copyFileSync, existsSync } = require('fs');
const { join } = require('path');
const root = join(__dirname, '..');
const envExample = join(root, '.env.example');
const envLocal = join(root, '.env.local');

console.log('\n========================================');
console.log('  SETUP FOR YOU (community app)');
console.log('========================================\n');

// 1. Create .env.local if missing
if (!existsSync(envLocal)) {
  copyFileSync(envExample, envLocal);
  console.log('1. Created .env.local from .env.example');
  console.log('   Add your Supabase URL and key there (see steps below).\n');
} else {
  console.log('1. .env.local already exists (skip).\n');
}

// 2. Open Supabase in browser
const supabaseNew = 'https://supabase.com/dashboard/new';
const supabaseLogin = 'https://supabase.com/dashboard';
console.log('2. Opening Supabase in your browser...\n');
try {
  const { execSync } = require('child_process');
  const open = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  execSync(`${open} "${supabaseNew}"`, { stdio: 'ignore' });
} catch (e) {
  console.log('   Open this URL yourself: ' + supabaseNew + '\n');
}

// 3. Print the 3 steps
console.log('========================================');
console.log('  DO THESE 3 STEPS IN THE BROWSER');
console.log('========================================\n');

console.log('STEP A – Create project');
console.log('  • Sign in / sign up at Supabase');
console.log('  • New project → name it (e.g. orbital-community)');
console.log('  • Set a database password (save it)');
console.log('  • Wait for project to be ready.\n');

console.log('STEP B – Run SQL (one shot)');
console.log('  • In the project: SQL Editor → New query');
console.log('  • Open this file and copy ALL of it:');
console.log('    community/supabase/full-setup.sql');
console.log('  • Paste into the SQL Editor → Run');
console.log('  • You should see "Success".\n');

console.log('STEP C – Copy keys into .env.local');
console.log('  • Project Settings (gear) → API');
console.log('  • Copy "Project URL" → put in .env.local as NEXT_PUBLIC_SUPABASE_URL');
console.log('  • Copy "anon public" key → put in .env.local as NEXT_PUBLIC_SUPABASE_ANON_KEY');
console.log('  • Keep NEXT_PUBLIC_WORKSPACE_ID as: a0000000-0000-0000-0000-000000000001');
console.log('  • Save .env.local.\n');

console.log('STEP D – Auth redirect (optional for local dev)');
console.log('  • Authentication → URL Configuration');
console.log('  • Site URL: http://localhost:3001');
console.log('  • Redirect URLs: add http://localhost:3001/auth/callback');
console.log('  • Save.\n');

console.log('========================================');
console.log('  THEN RUN THE APP');
console.log('========================================\n');
console.log('  cd community');
console.log('  npm install');
console.log('  npm run dev');
console.log('\n  Open http://localhost:3001\n');
console.log('========================================\n');
