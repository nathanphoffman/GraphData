#!/usr/bin/env python3
"""Tests the projection on known data: uses only 2019-2024 to project 2025 and 2026, then compares
with what actually happened (Year 2025 / Year 2026 in data/language-outlook/language-outlook.json).

Usage: python3 scripts/backtest-projection.py
"""
import importlib.util
import json
from pathlib import Path

# The columns of each result row, and how far right a 2026 column sits from the matching 2025 one.
LABEL, ACTUAL_2025, PROJECTED_2025, FLAT_2025, ACTUAL_2026, PROJECTED_2026, FLAT_2026 = range(7)
YEAR_COLUMN_GAP = ACTUAL_2026 - ACTUAL_2025

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("build", ROOT / "scripts" / "build-language-data.py")
build = importlib.util.module_from_spec(spec)
spec.loader.exec_module(build)

def main() -> None:
    data = json.loads(build.OUT.read_text())
    cutoff = build.BACKTEST_CUTOFF
    rows = []
    for lang in data["languages"]:
        v = lang[build.VALUES_FIELD]
        if any(v.get(key) is None for key in build.BACKTEST_KEYS):
            continue
        row = [lang[build.NAME_FIELD]]
        for year, key in zip(build.BACKTEST_YEARS, build.BACKTEST_KEYS):
            row += [v[f"Year {year}"], v[key], v[f"Year {cutoff}"]]
        rows.append(row)

    print(f"{'':12}{'2025 actual':>12}{'proj':>8}{'flat':>8}{'2026 actual':>14}{'proj':>8}{'flat':>8}")
    for r in rows:
        print(f"{r[LABEL]:12}{r[ACTUAL_2025]:12.1f}{r[PROJECTED_2025]:8.1f}{r[FLAT_2025]:8.1f}{r[ACTUAL_2026]:14.1f}{r[PROJECTED_2026]:8.1f}{r[FLAT_2026]:8.1f}")
    n = len(rows)
    for label, idx in (("projection", PROJECTED_2025), ("flat (no change from 2024)", FLAT_2025)):
        e25 = sum(abs(r[idx] - r[ACTUAL_2025]) for r in rows) / n
        e26 = sum(abs(r[idx + YEAR_COLUMN_GAP] - r[ACTUAL_2026]) for r in rows) / n
        print(f"avg error, {label}: 2025 = {e25:.2f}, 2026 = {e26:.2f}")

if __name__ == "__main__":
    main()
