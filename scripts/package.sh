#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

bash scripts/build.sh

for browser in chromium firefox; do
  out="dist/claude-rtl-$browser.zip"
  rm -f "$out"
  (cd "dist/$browser" && zip -qr "../../$out" .)
  echo "Packaged: $out ($(du -h "$out" | cut -f1))"
done
