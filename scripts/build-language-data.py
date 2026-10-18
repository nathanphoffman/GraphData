#!/usr/bin/env python3
"""Builds data/language-outlook.json from the 'Languages' sheet of Programming Languages.ods.

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
OUT = ROOT / "data" / "language-outlook.json"
TIOBE_2019 = ROOT / "data" / "sources" / "tiobe-2019.json"
TIOBE_SEPT = ROOT / "data" / "sources" / "tiobe-september.json"

YEARS = list(range(2019, 2027))
RECENT, PRIOR = (2024, 2026), (2021, 2023)  # inclusive windows
OUTLOOK_WEIGHT, TIOBE_WEIGHT = 2 / 3, 1 / 3
POP_WEIGHT, POP_TIOBE_WEIGHT = 1 / 2, 1 / 2  # raw Stack Overflow usage vs TIOBE, opinion removed
PROJECTION_YEARS = 10
YEARS_PER_WINDOW_GAP = 3  # distance between the centres of the two 3-year windows
TREND_WEIGHT = 0.5  # share of the slope taken from the recent trend (rest from the gap between the two windows)
DAMPING = 0.85  # each future year's change is this much of the previous year's
LAST_YEAR = 2026
BACKTEST_CUTOFF = 2024  # backtest: project from 2019-2024 only, with the same math as the real projection
BACKTEST_YEARS = (2025, 2026)
BACKTEST_KEYS = [f"Backtest projection {y}" for y in BACKTEST_YEARS]
HEALTH_BACKTEST_KEYS = [f"Healthiness backtest {y}" for y in BACKTEST_YEARS]
PROJECTION_KEY = f"Projection (next {PROJECTION_YEARS} yrs)"
HEALTH_KEY = "Healthiness (average all metrics)"
HEALTH_PRED_KEY = f"Projection of Healthiness (next {PROJECTION_YEARS} yrs)"
FIX_KEY = f"Projection with Historical Fix (next {PROJECTION_YEARS} yrs)"
FIX_WEIGHT = 0.5  # share of the backtest miss that is added back to the projection
SERIES = [f"Year {y}" for y in YEARS] + [PROJECTION_KEY, FIX_KEY, HEALTH_PRED_KEY]
LINES = [
    "Combined avg 2024-2026",
    "Combined avg 2021-2023",
    "Popularity avg 2024-2026",
    "Popularity avg 2021-2023",
    HEALTH_KEY,
    *BACKTEST_KEYS,
    *HEALTH_BACKTEST_KEYS,
]
NAME_FIXES = {"Javascript": "JavaScript", "Typescript": "TypeScript"}


def export_csv(ods: Path, out_dir: Path) -> Path:
    cmd = [
        "soffice", "--headless", "--convert-to",
        "csv:Text - txt - csv (StarCalc):44,34,76,1,,0,false,true,false,false,false,-1",
        "--outdir", str(out_dir), str(ods),
    ]
    subprocess.run(cmd, check=True, timeout=120, capture_output=True)
    found = list(out_dir.glob("*-Languages.csv"))
    if not found:
        sys.exit("Could not find the 'Languages' sheet in the exported CSV files.")
    return found[0]


def num(text: str):
    try:
        return float(text)
    except ValueError:
        return None


def avg(values):
    vals = [v for v in values if v is not None]
    return sum(vals) / len(vals) if vals else None


def combined_year(v, t, year):
    outlook, tio = v.get(f"Year {year}"), t.get(str(year))
    if outlook is None or tio is None:
        return None
    return outlook * OUTLOOK_WEIGHT + tio * TIOBE_WEIGHT


def slope(points):
    """Least-squares slope of (x, y) points."""
    n = len(points)
    mx, my = sum(x for x, _ in points) / n, sum(y for _, y in points) / n
    var = sum((x - mx) ** 2 for x, _ in points)
    return sum((x - mx) * (y - my) for x, y in points) / var


def project(base, per_year, steps):
    """Damped trend: each year's change shrinks by DAMPING. Declines are applied as a
    percentage of the current value, so a falling language approaches zero but never reaches it."""
    value = base
    for k in range(1, steps + 1):
        step = per_year * DAMPING ** k
        value = value * (1 + step / base) if per_year < 0 else value + step
    return value


def window_avgs(v, t, years):
    """(outlook avg, combined avg) over the years; None where data is missing."""
    outlook = avg([v.get(f"Year {y}") for y in years])
    tio = avg([t.get(str(y)) for y in years])
    combined = outlook * OUTLOOK_WEIGHT + tio * TIOBE_WEIGHT if None not in (outlook, tio) else None
    return outlook, combined


def forecast(v, t, cutoff, steps):
    """Projects each of `steps` (years after `cutoff`) using only data up to `cutoff`: two 3-year
    windows ending at the cutoff give the long-run slope, the last 3 years give the recent slope.
    Returns None when the data is missing."""
    recent, prior = range(cutoff - 2, cutoff + 1), range(cutoff - 5, cutoff - 2)
    outlook, recent_avg = window_avgs(v, t, recent)
    _, prior_avg = window_avgs(v, t, prior)
    latest = v.get(f"Year {cutoff}")
    if None in (recent_avg, prior_avg, latest):
        return None
    per_year = (recent_avg - prior_avg) / YEARS_PER_WINDOW_GAP
    recent_pts = [(y, combined_year(v, t, y)) for y in recent]
    if all(c is not None for _, c in recent_pts):
        per_year = TREND_WEIGHT * slope(recent_pts) + (1 - TREND_WEIGHT) * per_year
    base = (outlook + latest) / 2  # same scale as the chart dots
    return [project(base, per_year, n) if base > 0 else base for n in steps]


def historical_fix(v, projected):
    """Nudges `projected` by FIX_WEIGHT of the average backtest miss, as a share of the actual value
    (underestimated by 5% -> raise by 2.5%). Returns `projected` unchanged without backtest data."""
    misses = []
    for year, key in zip(BACKTEST_YEARS, BACKTEST_KEYS):
        actual, backtest = v.get(f"Year {year}"), v.get(key)
        if actual and backtest is not None:
            misses.append((actual - backtest) / actual)
    return projected * (1 + FIX_WEIGHT * avg(misses)) if misses else projected


def usage_combined(t, pop, years):
    """Opinion-free score: raw Stack Overflow usage mixed with TIOBE. None where data is missing."""
    raw_pop, tio = avg([pop.get(str(y)) for y in years]), avg([t.get(str(y)) for y in years])
    return raw_pop * POP_WEIGHT + tio * POP_TIOBE_WEIGHT if None not in (raw_pop, tio) else None


def health_items(v, t, pop, cutoff):
    """The 5 measured healthiness metrics from the 3 years ending at `cutoff`: the three year dots,
    the 3-year combined (outlook + TIOBE) average and the 3-year usage (no opinion) average."""
    years = range(cutoff - 2, cutoff + 1)
    _, combined = window_avgs(v, t, years)
    return [v.get(f"Year {y}") for y in years] + [combined, usage_combined(t, pop, years)]


def healthiness_at(v, t, pop, cutoff, predictions):
    """Healthiness: the plain average of the 5 measured metrics plus two prediction points."""
    return avg(health_items(v, t, pop, cutoff) + list(predictions))


def health_score(v, t, pop, year):
    """Healthiness without predictions, for the 3 years ending `year`; None if any metric is missing."""
    items = health_items(v, t, pop, year)
    return None if None in items else sum(items) / len(items)


def health_outlook(scores, last, steps):
    """Same trend math as forecast(), applied to yearly health scores {year: score}."""
    recent = [(y, scores[y]) for y in range(last - 2, last + 1)]
    per_year = TREND_WEIGHT * slope(recent) + (1 - TREND_WEIGHT) * (scores[last] - scores[last - 3]) / YEARS_PER_WINDOW_GAP
    base = scores[last]
    return [project(base, per_year, n) if base > 0 else base for n in steps]


def predicted_health(v, t, pop):
    """10-year healthiness: trend of the yearly health score, nudged by half of how far the same
    method missed 2025 and 2026 when it only had data through BACKTEST_CUTOFF. None if data is missing."""
    scores = {y: health_score(v, t, pop, y) for y in range(YEARS[0] + 2, LAST_YEAR + 1)}
    if any(scores.get(y) is None for y in range(BACKTEST_CUTOFF - 3, LAST_YEAR + 1)):
        return None
    raw = health_outlook(scores, LAST_YEAR, [PROJECTION_YEARS])[0]
    steps = [y - BACKTEST_CUTOFF for y in BACKTEST_YEARS]
    misses = [
        (scores[y] - guess) / scores[y]
        for y, guess in zip(BACKTEST_YEARS, health_outlook(scores, BACKTEST_CUTOFF, steps))
    ]
    return raw * (1 + FIX_WEIGHT * avg(misses))


def rnd(value):
    return None if value is None else round(value, 3)


def main() -> None:
    ods = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else DEFAULT_ODS
    if not ods.exists():
        sys.exit(f"Spreadsheet not found: {ods}")
    tiobe_2019 = json.loads(TIOBE_2019.read_text())["ratings"]
    tiobe_sept = json.loads(TIOBE_SEPT.read_text())["ratings"]

    with tempfile.TemporaryDirectory() as tmp:
        rows = list(csv.reader(export_csv(ods, Path(tmp)).open(encoding="utf-8")))
    header = rows[0]
    col = {name: i for i, name in enumerate(header)}

    languages = []
    for row in rows[1:]:
        if not row[0]:
            continue
        name = NAME_FIXES.get(row[0], row[0])
        values = {f"Year {y}": rnd(num(row[col[f"Year {y}"]])) for y in YEARS}
        tiobe = {str(y): num(row[col[f"{y} TIndex"]]) for y in range(2020, 2027)}
        pop = {str(y): num(row[col[f"{y} Pop"]]) for y in YEARS if f"{y} Pop" in col}
        tiobe["2019"] = tiobe_2019.get(name)
        for year, rating in tiobe_sept.get(name, {}).items():
            if rating is not None:
                tiobe[year] = rating
        languages.append({"name": name, "values": values, "tiobe": tiobe, "pop": pop})

    for lang in languages:
        v, t, pop = lang["values"], lang["tiobe"], lang["pop"]
        for label, (start, end) in (("2024-2026", RECENT), ("2021-2023", PRIOR)):
            years = range(start, end + 1)
            outlook = avg([v[f"Year {y}"] for y in years])
            tio = avg([t.get(str(y)) for y in years])
            v[f"Outlook avg {label}"] = rnd(outlook)
            v[f"TIOBE avg {label}"] = rnd(tio)
            raw_pop = avg([pop.get(str(y)) for y in years])
            v[f"Pop avg {label}"] = rnd(raw_pop)
            v[f"Popularity avg {label}"] = rnd(usage_combined(t, pop, years))  # opinion removed
            both = outlook is not None and tio is not None
            v[f"Combined avg {label}"] = (
                rnd(outlook * OUTLOOK_WEIGHT + tio * TIOBE_WEIGHT) if both else None
            )
        backtest = forecast(v, t, BACKTEST_CUTOFF, [y - BACKTEST_CUTOFF for y in BACKTEST_YEARS])
        for i, key in enumerate(BACKTEST_KEYS):
            v[key] = rnd(max(0.0, backtest[i])) if backtest else None
        for key, bt_key in zip(HEALTH_BACKTEST_KEYS, BACKTEST_KEYS):
            # no historical fix is possible yet at the cutoff, so the projection fills both prediction slots
            predictions = [v[bt_key]] * 2 if v[bt_key] is not None else [None] * 2
            v[key] = rnd(healthiness_at(v, t, pop, BACKTEST_CUTOFF, predictions)) if v[bt_key] is not None else None
        projected = forecast(v, t, LAST_YEAR, [PROJECTION_YEARS])
        latest = v[f"Year {LAST_YEAR}"]
        v[PROJECTION_KEY] = rnd(max(0.0, projected[0])) if projected else None
        v["Projection change"] = rnd(v[PROJECTION_KEY] - latest) if projected else None  # matches the arrow
        fixed = historical_fix(v, v[PROJECTION_KEY]) if projected else None
        v[FIX_KEY] = rnd(fixed)
        v[f"{FIX_KEY} change"] = rnd(fixed - latest) if projected else None

    for lang in languages:
        v = lang["values"]
        if v[PROJECTION_KEY] is not None:
            v[HEALTH_KEY] = rnd(healthiness_at(v, lang["tiobe"], lang["pop"], LAST_YEAR, [v[PROJECTION_KEY], v[FIX_KEY]]))
        else:
            v[HEALTH_KEY] = None
        predicted = predicted_health(v, lang["tiobe"], lang["pop"])
        v[HEALTH_PRED_KEY] = rnd(predicted)
        v[f"{HEALTH_PRED_KEY} change"] = rnd(predicted - v[HEALTH_KEY]) if predicted is not None and v[HEALTH_KEY] is not None else None

    languages.sort(key=lambda l: -(l["values"]["Year 2026"] or 0))
    data = {
        "title": "Language Outlook (Popularity weighted by Opinion)",
        "series": SERIES,
        "lines": LINES,
        "languages": languages,
    }
    OUT.write_text(json.dumps(data, indent=1) + "\n")
    print(f"Wrote {OUT.relative_to(ROOT)} ({len(languages)} languages)")


if __name__ == "__main__":
    main()
