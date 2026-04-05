@echo off
echo Starting Orbital Simulator Hub Services...
echo.

echo Starting Ollama...
start "Ollama" cmd /k "ollama serve"
timeout /t 3 /nobreak >nul

echo Starting API Server...
start "API Server" cmd /k "cd /d "C:\\Users\\mukit\\OneDrive\\Desktop\\nasaArchitech\\satellite_simulator_web" && npm run dev:api"
timeout /t 3 /nobreak >nul

echo Starting n8n...
start "n8n" cmd /k "n8n start"
timeout /t 3 /nobreak >nul

echo.
echo ✅ All services starting!
echo.
echo Check:
echo   - Ollama: http://localhost:11434/api/tags
echo   - API: http://localhost:3003/api/blog/health
echo   - n8n: http://localhost:5678
echo.
pause
