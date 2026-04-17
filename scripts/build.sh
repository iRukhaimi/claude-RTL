#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

rm -rf dist
for browser in chromium firefox; do
  out="dist/$browser"
  mkdir -p "$out"
  cp -r shared/. "$out/"
  cp "$browser/manifest.json" "$out/manifest.json"
done

echo "Built: dist/chromium dist/firefox"
