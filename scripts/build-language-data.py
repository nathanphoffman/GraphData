#!/usr/bin/env python3
"""Builds data/language-outlook/language-outlook.json from the 'Languages' sheet of Programming Languages.ods.

Usage (from the GraphData folder):
    npm run data
    python3 scripts/build-language-data.py [path/to/Programming\\ Languages.ods]

Needs LibreOffice (soffice) on the PATH to read the .ods file.
TIOBE ratings come from data/sources/tiobe-september.json (September of every year, 2019-2026).
Raw Stack Overflow usage comes from the sheet's "<year> Pop" columns.
Languages missing there (TypeScript, Zig) fall back to the spreadsheet's TIOBE columns and, for 2019,
data/sources/tiobe-2019.json.
"""

import csv
import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_ODS = ROOT.parent / "Programming Languages.ods"
OUTPUT_PATH = ROOT / "data" / "language-outlook" / "language-outlook.json"
TIOBE_2019 = ROOT / "data" / "language-outlook" / "sources" / "tiobe-2019.json"
TIOBE_SEPT = ROOT / "data" / "language-outlook" / "sources" / "tiobe-september.json"

YEARS = list(range(2019, 2027))
RECENT, PRIOR = (2024, 2026), (2021, 2023)  # inclusive windows
OUTLOOK_WEIGHT, TIOBE_WEIGHT = 2 / 3, 1 / 3
POP_WEIGHT, POP_TIOBE_WEIGHT = 1 / 2, 1 / 2  # raw Stack Overflow usage vs TIOBE, opinion removed
PROJECTION_YEARS = 10
WINDOW_YEARS = 3  # each trend window covers this many years
YEARS_PER_WINDOW_GAP = WINDOW_YEARS  # distance between the centres of the two windows
TIOBE_YEARS = range(2020, 2027)
ROUND_DIGITS = 3
EXPORT_TIMEOUT_SECONDS = 120
TREND_WEIGHT = 0.5  # share of the slope taken from the recent trend (rest from the gap between the two windows)
DAMPING = 0.85  # each future year's change is this much of the previous year's
LAST_YEAR = 2026
BACKTEST_CUTOFF = 2024  # backtest: project from 2019-2024 only, with the same math as the real projection
BACKTEST_YEARS = (2025, 2026)
BACKTEST_KEYS = [f"Backtest projection {year}" for year in BACKTEST_YEARS]
HEALTH_BACKTEST_KEYS = [f"Healthiness backtest {year}" for year in BACKTEST_YEARS]
PROJECTION_KEY = f"Projection (next {PROJECTION_YEARS} yrs)"
HEALTH_KEY = "Healthiness (average all metrics)"
HEALTH_PRED_KEY = f"Projection of Healthiness (next {PROJECTION_YEARS} yrs)"
FIX_KEY = f"Projection with Historical Fix (next {PROJECTION_YEARS} yrs)"
FIX_WEIGHT = 0.5  # share of the backtest miss that is added back to the projection
SERIES = [f"Year {year}" for year in YEARS] + [PROJECTION_KEY, FIX_KEY, HEALTH_PRED_KEY]
LINES = [
    "Combined avg 2024-2026",
    "Combined avg 2021-2023",
    "Popularity avg 2024-2026",
    "Popularity avg 2021-2023",
    HEALTH_KEY,
    *BACKTEST_KEYS,
    *HEALTH_BACKTEST_KEYS,
]

NAME_FIELD, VALUES_FIELD, TIOBE_FIELD = "name", "values", "tiobe"
NAME_FIXES = {"Javascript": "JavaScript", "Typescript": "TypeScript"}

def export_csv(spreadsheet: Path, out_dir: Path) -> Path:
    command = [
        "soffice", "--headless", "--convert-to",
        "csv:Text - txt - csv (StarCalc):44,34,76,1,,0,false,true,false,false,false,-1",
        "--outdir", str(out_dir), str(spreadsheet),
    ]

    subprocess.run(command, check=True, timeout=EXPORT_TIMEOUT_SECONDS, capture_output=True)
    found = list(out_dir.glob("*-Languages.csv"))

    if not found:
        sys.exit("Could not find the 'Languages' sheet in the exported CSV files.")

    return found[0]

def parse_number(text: str):
    try:
        return float(text)
    except ValueError:
        # empty and non-numeric cells in the sheet mean "no data", not a mistake
        return None

def average(values):
    vals = [value for value in values if value is not None]

    return sum(vals) / len(vals) if vals else None

def combined_year(language_values, tiobe_ratings, year):
    outlook, tiobe_average = language_values.get(f"Year {year}"), tiobe_ratings.get(str(year))

    if outlook is None or tiobe_average is None:
        return None

    return outlook * OUTLOOK_WEIGHT + tiobe_average * TIOBE_WEIGHT

def slope(points):
    """Least-squares slope of (x, y) points."""
    point_count = len(points)
    mean_x = sum(x_value for x_value, _ in points) / point_count
    mean_y = sum(y_value for _, y_value in points) / point_count
    variance = sum((x_value - mean_x) ** 2 for x_value, _ in points)

    return sum((x_value - mean_x) * (y_value - mean_y) for x_value, y_value in points) / variance

def project(base, per_year, steps):
    """Damped trend: each year's change shrinks by DAMPING. Declines are applied as a
    percentage of the current value, so a falling language approaches zero but never reaches it."""

    value = base

    for year_offset in range(1, steps + 1):
        step = per_year * DAMPING ** year_offset
        value = value * (1 + step / base) if per_year < 0 else value + step

    return value

def window_avgs(language_values, tiobe_ratings, years):
    """(outlook avg, combined avg) over the years; None where data is missing."""
    outlook = average([language_values.get(f"Year {year}") for year in years])
    tiobe_average = average([tiobe_ratings.get(str(year)) for year in years])
    combined = outlook * OUTLOOK_WEIGHT + tiobe_average * TIOBE_WEIGHT if None not in (outlook, tiobe_average) else None

    return outlook, combined

def forecast(language_values, tiobe_ratings, cutoff, steps):
    """Projects each of `steps` (years after `cutoff`) using only data up to `cutoff`: two 3-year
    windows ending at the cutoff give the long-run slope, the last 3 years give the recent slope.
    Returns None when the data is missing."""

    recent, prior = range(cutoff - 2, cutoff + 1), range(cutoff - 2 * WINDOW_YEARS + 1, cutoff - WINDOW_YEARS + 1)
    outlook, recent_avg = window_avgs(language_values, tiobe_ratings, recent)
    _, prior_avg = window_avgs(language_values, tiobe_ratings, prior)
    latest = language_values.get(f"Year {cutoff}")

    if None in (recent_avg, prior_avg, latest):
        return None

    per_year = (recent_avg - prior_avg) / YEARS_PER_WINDOW_GAP
    recent_pts = [(year, combined_year(language_values, tiobe_ratings, year)) for year in recent]

    if all(combined_value is not None for _, combined_value in recent_pts):
        per_year = TREND_WEIGHT * slope(recent_pts) + (1 - TREND_WEIGHT) * per_year

    base = (outlook + latest) / 2  # same scale as the chart dots

    return [project(base, per_year, years_ahead) if base > 0 else base for years_ahead in steps]

def historical_fix(language_values, projected):
    """Nudges `projected` by FIX_WEIGHT of the average backtest miss, as a share of the actual value
    (underestimated by 5% -> raise by 2.5%). Returns `projected` unchanged without backtest data."""

    misses = []

    for year, series_key in zip(BACKTEST_YEARS, BACKTEST_KEYS):
        actual, backtest = language_values.get(f"Year {year}"), language_values.get(series_key)

        if actual and backtest is not None:
            misses.append((actual - backtest) / actual)

    return projected * (1 + FIX_WEIGHT * average(misses)) if misses else projected

def usage_combined(tiobe_ratings, popularity, years):
    """Opinion-free score: raw Stack Overflow usage mixed with TIOBE. None where data is missing."""
    raw_pop, tiobe_average = average([popularity.get(str(year)) for year in years]), average([tiobe_ratings.get(str(year)) for year in years])

    return raw_pop * POP_WEIGHT + tiobe_average * POP_TIOBE_WEIGHT if None not in (raw_pop, tiobe_average) else None

def health_items(language_values, tiobe_ratings, popularity, cutoff):
    """The 5 measured healthiness metrics from the 3 years ending at `cutoff`: the three year dots,
    the 3-year combined (outlook + TIOBE) average and the 3-year usage (no opinion) average."""

    years = range(cutoff - 2, cutoff + 1)
    _, combined = window_avgs(language_values, tiobe_ratings, years)

    return [language_values.get(f"Year {year}") for year in years] + [combined, usage_combined(tiobe_ratings, popularity, years)]

def healthiness_at(language_values, tiobe_ratings, popularity, cutoff, predictions):
    """Healthiness: the plain average of the 5 measured metrics plus two prediction points."""

    return average(health_items(language_values, tiobe_ratings, popularity, cutoff) + list(predictions))

def health_score(language_values, tiobe_ratings, popularity, year):
    """Healthiness without predictions, for the 3 years ending `year`; None if any metric is missing."""
    items = health_items(language_values, tiobe_ratings, popularity, year)

    return None if None in items else sum(items) / len(items)

def health_outlook(scores, last, steps):
    """Same trend math as forecast(), applied to yearly health scores {year: score}."""
    recent = [(year, scores[year]) for year in range(last - 2, last + 1)]
    per_year = TREND_WEIGHT * slope(recent) + (1 - TREND_WEIGHT) * (scores[last] - scores[last - WINDOW_YEARS]) / YEARS_PER_WINDOW_GAP
    base = scores[last]

    return [project(base, per_year, years_ahead) if base > 0 else base for years_ahead in steps]

def predicted_health(language_values, tiobe_ratings, popularity):
    """10-year healthiness: trend of the yearly health score, nudged by half of how far the same
    method missed 2025 and 2026 when it only had data through BACKTEST_CUTOFF. None if data is missing."""

    scores = {year: health_score(language_values, tiobe_ratings, popularity, year) for year in range(YEARS[0] + 2, LAST_YEAR + 1)}

    if any(scores.get(year) is None for year in range(BACKTEST_CUTOFF - WINDOW_YEARS, LAST_YEAR + 1)):
        return None

    raw_prediction = health_outlook(scores, LAST_YEAR, [PROJECTION_YEARS])[0]
    steps = [year - BACKTEST_CUTOFF for year in BACKTEST_YEARS]
    misses = [
        (scores[year] - guess) / scores[year]
        for year, guess in zip(BACKTEST_YEARS, health_outlook(scores, BACKTEST_CUTOFF, steps))
    ]

    return raw_prediction * (1 + FIX_WEIGHT * average(misses))

def round_value(value):
    return None if value is None else round(value, ROUND_DIGITS)

def main() -> None:
    spreadsheet = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else DEFAULT_ODS

    if not spreadsheet.exists():
        sys.exit(f"Spreadsheet not found: {spreadsheet}")

    tiobe_2019 = json.loads(TIOBE_2019.read_text())["ratings"]
    tiobe_sept = json.loads(TIOBE_SEPT.read_text())["ratings"]

    with tempfile.TemporaryDirectory() as temp_dir:
        rows = list(csv.reader(export_csv(spreadsheet, Path(temp_dir)).open(encoding="utf-8")))

    header = rows[0]
    column_index = {name: index for index, name in enumerate(header)}

    languages = []

    for sheet_row in rows[1:]:
        if not sheet_row[0]:
            continue

        name = NAME_FIXES.get(sheet_row[0], sheet_row[0])
        values = {f"Year {year}": round_value(parse_number(sheet_row[column_index[f"Year {year}"]])) for year in YEARS}
        tiobe = {str(year): parse_number(sheet_row[column_index[f"{year} TIndex"]]) for year in TIOBE_YEARS}
        popularity = {str(year): parse_number(sheet_row[column_index[f"{year} Pop"]]) for year in YEARS if f"{year} Pop" in column_index}
        tiobe["2019"] = tiobe_2019.get(name)

        for year, rating in tiobe_sept.get(name, {}).items():
            if rating is not None:
                tiobe[year] = rating

        languages.append({NAME_FIELD: name, VALUES_FIELD: values, TIOBE_FIELD: tiobe, "pop": popularity})

    for lang in languages:
        language_values, tiobe_ratings, popularity = lang[VALUES_FIELD], lang[TIOBE_FIELD], lang["pop"]

        for label, (start, end_year) in (("2024-2026", RECENT), ("2021-2023", PRIOR)):
            years = range(start, end_year + 1)
            outlook = average([language_values[f"Year {year}"] for year in years])
            tiobe_average = average([tiobe_ratings.get(str(year)) for year in years])
            language_values[f"Outlook avg {label}"] = round_value(outlook)
            language_values[f"TIOBE avg {label}"] = round_value(tiobe_average)
            raw_pop = average([popularity.get(str(year)) for year in years])
            language_values[f"Pop avg {label}"] = round_value(raw_pop)
            language_values[f"Popularity avg {label}"] = round_value(usage_combined(tiobe_ratings, popularity, years))  # opinion removed
            both = outlook is not None and tiobe_average is not None
            language_values[f"Combined avg {label}"] = (
                round_value(outlook * OUTLOOK_WEIGHT + tiobe_average * TIOBE_WEIGHT) if both else None
            )

        backtest = forecast(language_values, tiobe_ratings, BACKTEST_CUTOFF, [year - BACKTEST_CUTOFF for year in BACKTEST_YEARS])

        for index, series_key in enumerate(BACKTEST_KEYS):
            language_values[series_key] = round_value(max(0.0, backtest[index])) if backtest else None

        for series_key, bt_key in zip(HEALTH_BACKTEST_KEYS, BACKTEST_KEYS):
            # no historical fix is possible yet at the cutoff, so the projection fills both prediction slots
            predictions = [language_values[bt_key]] * 2 if language_values[bt_key] is not None else [None] * 2
            language_values[series_key] = round_value(healthiness_at(language_values, tiobe_ratings, popularity, BACKTEST_CUTOFF, predictions)) if language_values[bt_key] is not None else None

        projected = forecast(language_values, tiobe_ratings, LAST_YEAR, [PROJECTION_YEARS])
        latest = language_values[f"Year {LAST_YEAR}"]
        language_values[PROJECTION_KEY] = round_value(max(0.0, projected[0])) if projected else None
        language_values["Projection change"] = round_value(language_values[PROJECTION_KEY] - latest) if projected else None  # matches the arrow
        fixed = historical_fix(language_values, language_values[PROJECTION_KEY]) if projected else None
        language_values[FIX_KEY] = round_value(fixed)
        language_values[f"{FIX_KEY} change"] = round_value(fixed - latest) if projected else None

    for lang in languages:
        language_values = lang[VALUES_FIELD]

        if language_values[PROJECTION_KEY] is not None:
            language_values[HEALTH_KEY] = round_value(healthiness_at(language_values, lang[TIOBE_FIELD], lang["pop"], LAST_YEAR, [language_values[PROJECTION_KEY], language_values[FIX_KEY]]))
        else:
            language_values[HEALTH_KEY] = None

        predicted = predicted_health(language_values, lang[TIOBE_FIELD], lang["pop"])
        language_values[HEALTH_PRED_KEY] = round_value(predicted)
        language_values[f"{HEALTH_PRED_KEY} change"] = round_value(predicted - language_values[HEALTH_KEY]) if predicted is not None and language_values[HEALTH_KEY] is not None else None

    languages.sort(key=lambda language: -(language[VALUES_FIELD]["Year 2026"] or 0))
    data = {
        "title": "Language Outlook (Popularity weighted by Opinion)",
        "series": SERIES,
        "lines": LINES,
        "languages": languages,
    }

    OUTPUT_PATH.write_text(json.dumps(data, indent=1) + "\n")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)} ({len(languages)} languages)")

if __name__ == "__main__":
    main()
