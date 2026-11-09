@echo off
REM Double-click to build and open the RevEx website at http://localhost:3000 (Windows).
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 goto :nonode
node -e "const [a,b]=process.versions.node.split('.').map(Number);process.exit(a>20||(a===20&&b>=9)?0:1)"
if errorlevel 1 goto :oldnode

if not exist .env.local copy .env.example .env.local >nul

if not exist node_modules (
  echo Installing dependencies - this takes a minute the first time...
  call npm ci
  if errorlevel 1 goto :failed
)

echo Building the website...
call npm run build
if errorlevel 1 goto :failed

echo.
echo RevEx website running at http://localhost:3000  -  close this window to stop it.
start "" cmd /c "timeout /t 4 >nul & start http://localhost:3000"
call npm start
goto :eof

:nonode
echo Node.js is not installed. Install the LTS version from https://nodejs.org and run this again.
pause
exit /b 1

:oldnode
echo Node.js 20.9 or newer is required. Install the LTS version from https://nodejs.org and run this again.
pause
exit /b 1

:failed
echo Something went wrong - see the messages above.
pause
exit /b 1
