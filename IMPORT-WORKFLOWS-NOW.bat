@echo off
echo ============================================================
echo   IMPORT WORKFLOWS TO N8N - QUICK GUIDE
echo ============================================================
echo.
echo Opening n8n in your browser...
start http://localhost:5678
timeout /t 3 /nobreak >nul
echo.
echo ============================================================
echo   FOLLOW THESE STEPS:
echo ============================================================
echo.
echo 1. In n8n, click "Workflows" ^(left sidebar^)
echo.
echo 2. Click "Import from File" ^(top right button^)
echo.
echo 3. Import this file:
echo    n8n\workflows\daily-rss-to-blog.json
echo.
echo 4. Click "Import from File" again
echo.
echo 5. Import this file:
echo    n8n\workflows\daily-ollama-research.json
echo.
echo 6. Test: Click on one workflow, then "Execute Workflow"
echo.
echo 7. Activate: Go to "Workflows" page, toggle "Active" ON
echo    for both workflows
echo.
echo ============================================================
echo   THAT'S IT!
echo ============================================================
echo.
echo Workflows will run automatically:
echo   - 9 AM daily: RSS workflow ^(1-2 posts^)
echo   - 2 PM daily: Research workflow ^(1 post^)
echo   - Total: 2-3 posts per day!
echo.
pause
