#!/usr/bin/env bash
# Double-click (macOS) or run `bash start-local.command` to build and open
# the RevEx website at http://localhost:3000.
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install the LTS version from https://nodejs.org and run this again."
  read -r -p "Press Enter to close." _
  exit 1
fi
if ! node -e "const [a,b]=process.versions.node.split('.').map(Number);process.exit(a>20||(a===20&&b>=9)?0:1)"; then
  echo "Node.js 20.9 or newer is required (found $(node -v)). Install the LTS version from https://nodejs.org."
  read -r -p "Press Enter to close." _
  exit 1
fi

[ -f .env.local ] || cp .env.example .env.local

if [ ! -d node_modules ]; then
  echo "Installing dependencies - this takes a minute the first time..."
  npm ci
fi

echo "Building the website..."
npm run build

echo
echo "RevEx website running at http://localhost:3000 - press Ctrl+C to stop it."
( sleep 4; (open http://localhost:3000 || xdg-open http://localhost:3000) >/dev/null 2>&1 || true ) &
npm start
