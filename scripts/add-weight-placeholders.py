#!/usr/bin/env python3
"""Adds 0-weight placeholder rows to data/weight-journey/weight-journey.json so you only have to fill in the numbers.

Usage (from the GraphData folder):
    python3 scripts/add-weight-placeholders.py [days]

Makes sure every date from the day after the last entry through today + `days` (default 60) exists.
Existing entries are never changed. The chart ignores weights of 0 and dates in the future.
"""

import json
import sys
from datetime import date, timedelta
from pathlib import Path

DEFAULT_DAYS_AHEAD = 60

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "weight-journey" / "weight-journey.json"

def main():
    """Append a zero-weight row for every missing date up to today plus the requested days."""
    ahead = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_DAYS_AHEAD
    data = json.loads(DATA.read_text())
    weights = data["weights"]
    existing = {date_text for date_text, _ in weights}
    next_day = date.fromisoformat(weights[-1][0]) + timedelta(days=1)
    last_day = date.today() + timedelta(days=ahead)
    added = 0

    while next_day <= last_day:
        if next_day.isoformat() not in existing:
            weights.append([next_day.isoformat(), 0])
            added += 1

        next_day += timedelta(days=1)

    DATA.write_text(json.dumps(data))
    print(f"Added {added} placeholder days (last date: {weights[-1][0]})")

if __name__ == "__main__":
    main()
