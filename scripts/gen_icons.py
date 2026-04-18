#!/usr/bin/env python3
"""Render shared/icons/icon{16,48,128}.png from assets/icon-source.svg.

Run after editing the SVG so the bundled icons stay in sync.
Requires: pip install cairosvg
"""
import os
import cairosvg

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "icon-source.svg")
OUT = os.path.join(ROOT, "shared", "icons")
os.makedirs(OUT, exist_ok=True)

for size in (16, 48, 128):
    path = os.path.join(OUT, f"icon{size}.png")
    cairosvg.svg2png(
        url=SRC,
        write_to=path,
        output_width=size,
        output_height=size,
    )
    print(f"{path}  ({os.path.getsize(path)} bytes)")
