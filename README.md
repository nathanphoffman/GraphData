# GraphData

A small React + TypeScript site for the charts built from my data sets.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
```

## Layout

```
data/                  JSON data sets used by the charts
  sources/             Hand-collected inputs (e.g. TIOBE 2019 ratings)
scripts/               Scripts that build the JSON files
src/charts/            Charts grouped by category (calculators, science, tabletop, tech), one folder per chart
tests/                Unit tests, mirroring src/charts
src/charts/registry.ts The list of all charts (home page is built from this)
src/pages/             Home page and the chart page wrapper
```

## Update the language data

Edit `../Programming Languages.ods`, then:

```bash
npm run data       # rewrites data/language-outlook/language-outlook.json (needs LibreOffice)
```

## Add a chart

1. Put the data in `data/<name>.json` (or add a script in `scripts/` that builds it).
2. Create `src/charts/<category>/<name>/<Name>.tsx` with a default-exported React component.
3. Add one entry to `src/charts/registry.ts`.

The chart then shows up on the home page and at `/<id>`.
