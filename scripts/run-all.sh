#!/usr/bin/env bash
# Runs every sync in order: line quality, then prod sync (which pushes the new scores), then Proton Drive.
# Stops at the first failure so a broken step never gets pushed on.
set -euo pipefail

# readlink -f follows the ~/.local/bin symlink back to this real file.
PROJECT_DIR="$(dirname "$(readlink -f "$0")")/.."
PROTON_DRIVE_SYNC_DIR="$HOME/Code/ProtonDriveSync"

echo "== 1/3 line quality =="
just --justfile "$PROJECT_DIR/justfile" refresh-local-line-quality

echo "== 2/3 prod sync =="
just --justfile "$PROJECT_DIR/justfile" sync-prod

echo "== 3/3 Proton Drive sync =="
cd "$PROTON_DRIVE_SYNC_DIR"
npm start -- --once

echo "== all syncs done =="
