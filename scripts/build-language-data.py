#!/usr/bin/env python3
"""Builds data/language-outlook.json from the 'Languages' sheet of Programming Languages.ods.

Usage (from the GraphData folder):
    npm run data
    python3 scripts/build-language-data.py [path/to/Programming\\ Languages.ods]

Needs LibreOffice (soffice) on the PATH to read the .ods file.
The 2019 TIOBE ratings come from data/sources/tiobe-2019.json.
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

YEARS = list(range(2019, 2027))
RECENT, PRIOR = (2023, 2026), (2019, 2022)  # inclusive windows
OUTLOOK_WEIGHT, TIOBE_WEIGHT = 2 / 3, 1 / 3
PROJECTION_YEARS = 10
YEARS_PER_WINDOW_GAP = 4  # distance between the centres of the two 4-year windows
PROJECTION_KEY = f"Projection (next {PROJECTION_YEARS} yrs)"
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


def rnd(value):
    return None if value is None else round(value, 3)


def main() -> None:
    ods = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else DEFAULT_ODS
    if not ods.exists():
        sys.exit(f"Spreadsheet not found: {ods}")
    tiobe_2019 = json.loads(TIOBE_2019.read_text())["ratings"]

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
        tiobe["2019"] = tiobe_2019.get(name)
        languages.append({"name": name, "values": values, "tiobe": tiobe})

    for lang in languages:
        v, t = lang["values"], lang["tiobe"]
        for label, (start, end) in (("2023-2026", RECENT), ("2019-2022", PRIOR)):
            years = range(start, end + 1)
            outlook = avg([v[f"Year {y}"] for y in years])
            tio = avg([t.get(str(y)) for y in years])
            v[f"Outlook avg {label}"] = rnd(outlook)
            v[f"TIOBE avg {label}"] = rnd(tio)
            both = outlook is not None and tio is not None
            v[f"Combined avg {label}"] = (
                rnd(outlook * OUTLOOK_WEIGHT + tio * TIOBE_WEIGHT) if both else None
            )
        recent, prior = v["Combined avg 2023-2026"], v["Combined avg 2019-2022"]
        latest = v["Year 2026"]
        if None in (recent, prior, latest):
            v["Projection change"], v[PROJECTION_KEY] = None, None
        else:
            change = recent - prior
            base = (recent + latest) / 2  # conservative base: 2026 value and recent average
            projected = base + change * PROJECTION_YEARS / YEARS_PER_WINDOW_GAP
            v["Projection change"] = rnd(change)
            v[PROJECTION_KEY] = rnd(max(0.0, projected))

    languages.sort(key=lambda l: -(l["values"]["Year 2026"] or 0))
    data = {
        "title": "Language Outlook (Popularity weighted by Opinion)",
        "series": [f"Year {y}" for y in YEARS] + [PROJECTION_KEY],
        "lines": ["Combined avg 2023-2026", "Combined avg 2019-2022"],
        "languages": languages,
    }
    OUT.write_text(json.dumps(data, indent=1) + "\n")
    print(f"Wrote {OUT.relative_to(ROOT)} ({len(languages)} languages)")


if __name__ == "__main__":
    main()
