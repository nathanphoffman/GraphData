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
    """Print each language's 2025 and 2026 actuals, the backtest projection and flat guess, and their average errors."""
    data = json.loads(build.OUTPUT_PATH.read_text())
    cutoff = build.BACKTEST_CUTOFF
    rows = []

    for lang in data["languages"]:
        language_values = lang[build.VALUES_FIELD]

        if any(language_values.get(backtest_key) is None for backtest_key in build.BACKTEST_KEYS):
            continue

        result_row = [lang[build.NAME_FIELD]]

        for year, backtest_key in zip(build.BACKTEST_YEARS, build.BACKTEST_KEYS):
            result_row += [
                language_values[f"Year {year}"],
                language_values[backtest_key],
                language_values[f"Year {cutoff}"],
            ]

        rows.append(result_row)

    print(f"{'':12}{'2025 actual':>12}{'proj':>8}{'flat':>8}{'2026 actual':>14}{'proj':>8}{'flat':>8}")

    for printed_row in rows:
        print(
            f"{printed_row[LABEL]:12}{printed_row[ACTUAL_2025]:12.1f}{printed_row[PROJECTED_2025]:8.1f}{printed_row[FLAT_2025]:8.1f}{printed_row[ACTUAL_2026]:14.1f}{printed_row[PROJECTED_2026]:8.1f}{printed_row[FLAT_2026]:8.1f}"
        )

    row_count = len(rows)

    for label, column in (("projection", PROJECTED_2025), ("flat (no change from 2024)", FLAT_2025)):
        error_2025 = sum(abs(printed_row[column] - printed_row[ACTUAL_2025]) for printed_row in rows) / row_count
        error_2026 = (
            sum(abs(printed_row[column + YEAR_COLUMN_GAP] - printed_row[ACTUAL_2026]) for printed_row in rows)
            / row_count
        )
        print(f"avg error, {label}: 2025 = {error_2025:.2f}, 2026 = {error_2026:.2f}")


if __name__ == "__main__":
    main()
