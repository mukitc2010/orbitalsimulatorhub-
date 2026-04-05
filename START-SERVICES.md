# 🚀 How to Start Services for n8n Auto-Updates

## ⚠️ Problem: "ERR_CONNECTION_REFUSED"

This means the services aren't running. You need to start **2 services**:

1. **API Server** (port 3001) - Required for workflows
2. **n8n** (port 5678) - Workflow automation tool

---

## 🎯 Quick Start (Easiest Method)

### Option 1: Use the Start Script (Recommended)

**Open PowerShell** in your project folder:

```powershell
cd "C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
.\scripts\start-all.ps1
```

This will start **both** API server and n8n automatically!

---

## 📋 Manual Start (Step by Step)

### Step 1: Start API Server

**Open Terminal/PowerShell #1:**

```powershell
cd "C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
npm run dev:api
```

**Keep this terminal open!** You should see:
```
API server running on http://localhost:3001
```

**Verify it's running:**
- Open browser: http://localhost:3001/api/research/health
- Should see: `{"status":"ok","service":"research-content-api"}`

---

### Step 2: Start n8n

**Open Terminal/PowerShell #2** (new window):

```powershell
cd "C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
npx n8n start
```

**OR use the script:**
```powershell
.\scripts\start-n8n.ps1
```

**Keep this terminal open!** You should see:
```
n8n ready on http://localhost:5678
```

**Open n8n:**
- Browser: http://localhost:5678
- You should see the n8n dashboard!

---

## ✅ Verify Everything is Running

### Check API Server:
- ✅ Visit: http://localhost:3001/api/research/health
- ✅ Should see: `{"status":"ok"}`

### Check n8n:
- ✅ Visit: http://localhost:5678
- ✅ Should see: n8n dashboard

---

## 🔧 Troubleshooting

### Port Already in Use?

**If port 3001 is busy:**
```powershell
# Find what's using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**If port 5678 is busy:**
```powershell
# Find what's using port 5678
netstat -ano | findstr :5678

# Kill the process
taskkill /PID <PID> /F
```

### Can't Find npm/npx?

Make sure Node.js is installed:
```powershell
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

### PowerShell Script Won't Run?

You might need to allow scripts:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📊 What Should Be Running

You need **2 terminals/windows** open:

1. **Terminal 1:** API Server (`npm run dev:api`)
   - Shows: "API server running on http://localhost:3001"
   - Keep this running!

2. **Terminal 2:** n8n (`npx n8n start`)
   - Shows: "n8n ready on http://localhost:5678"
   - Keep this running!

**Both must stay running** for workflows to work!

---

## 🎯 After Starting Services

Once both are running:

1. ✅ **Open n8n:** http://localhost:5678
2. ✅ **Add OpenAI credentials** (if not done)
3. ✅ **Import workflows** (if not done)
4. ✅ **Activate workflows** (toggle ON)
5. ✅ **Test workflows** (optional)

---

## 💡 Pro Tip: Keep Services Running

To keep services running even when you close terminal:

**Option 1: Use Windows Task Scheduler**
- Schedule PowerShell scripts to run on startup

**Option 2: Use PM2** (Process Manager)
```bash
npm install -g pm2
pm2 start "npm run dev:api" --name api-server
pm2 start "npx n8n start" --name n8n
pm2 save
pm2 startup
```

**Option 3: Run as Windows Service**
- Use NSSM (Non-Sucking Service Manager) to run as services

---

## 🆘 Still Having Issues?

**Check:**
- ✅ Node.js is installed (`node --version`)
- ✅ npm is installed (`npm --version`)
- ✅ Ports 3001 and 5678 are not in use
- ✅ Firewall is not blocking ports
- ✅ Antivirus is not blocking Node.js

**Common fixes:**
- Restart your computer
- Run terminals as Administrator
- Check Windows Firewall settings

---

## 📝 Summary

**To fix "ERR_CONNECTION_REFUSED":**

1. ✅ Start API server: `npm run dev:api` (Terminal 1)
2. ✅ Start n8n: `npx n8n start` (Terminal 2)
3. ✅ Verify both are running
4. ✅ Open n8n: http://localhost:5678
5. ✅ Import and activate workflows

**Once both are running, you can use n8n!** 🚀
