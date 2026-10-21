Build a Python script (matplotlib + numpy only) that renders a publication-quality PNG called `economic_systems_map.png`. Below is everything the chart contains.

## What the chart is
A conceptual 4×3 grid that maps economic systems on two axes, overlaid with a "Line of Stability" band, a U.S. history region, and dots for well-known political figures. It is an interpretive model, not a scientific one. Placements are approximate and meant to provoke discussion.

- **Horizontal axis (economic orientation), left to right:** Communal → Lean-Communal → Lean-Market → Market
- **Vertical axis (size):** Large (top), Medium, Small (bottom). "Size" means total concentration of organized power, state and corporate power combined.
- A third axis, governance (democratic ↔ authoritarian), is deliberately NOT shown. Figures are placed by stated economic views only, so opposites in governance (e.g., FDR and Hitler) can appear near each other.

## Grid cells (name only, centered horizontally near the top of each cell)
| | Communal | Lean-Communal | Lean-Market | Market |
|---|---|---|---|---|
| **Large** | Communism | Social Ownership | New Deal Socialism | Crony Capitalism |
| **Medium** | Guild System | Nordic Model | Social Market | Regulated Capitalism |
| **Small** | Mutualism | Left Libertarianism | Classical Liberalism | Right Libertarianism |

## Coordinate system
Use "cell units" for everything: x from 0 (left edge of Communal) to 4 (right edge of Market), y from 0 (bottom of Small) to 3 (top of Large). Convert to plot coordinates with a cell width of 3.2 and height of 1.8 (so cells are wider than tall). Add a dark header row (column names) and a dark header column (row names, plus "Size" in the corner).

## Layer 1: Line of Stability
- Centerline: a straight line from (0, 0.5) to (4, 2.5), i.e., the midpoint of Mutualism's left edge to the midpoint of Crony Capitalism's right edge (slope 0.5 in cell units).
- Band: ±0.45 cell-rows above and below the centerline, filled light green (`#1e8a4a`, alpha ~0.13), with dashed green edge lines (lw ~2.2, alpha 0.8) and a faint solid centerline.
- Label "Line of Stability" in bold green on a white rounded box, rotated to match the line's angle, placed on the centerline at x ≈ 1.0.
- Meaning: systems inside the band have historically been more durable. Medium-sized systems (Nordic Model, Social Market, Regulated Capitalism) are the most durable; the off-band cells tend to be short-lived.

## Layer 2: U.S. overlay
A dashed red (`#b0182a`) polygon with a translucent red fill (alpha ~0.10), vertices in cell units:
(2.55, 2.50), (3.50, 2.50), (3.50, 1.55), (2.88, 1.55), (2.55, 1.98).
Label it "U.S." (bold) with "(1865–present)" beneath, centered near (2.75, 2.38). Meaning: since the Civil War the U.S. has oscillated among Crony Capitalism (Gilded Age), New Deal Socialism (FDR), and Regulated Capitalism (post-Reagan), and only grazed the Social Market (1950s).

## Layer 3: Famous figures
Place figures as dots (size ~70, white edge) with a small bold label on a white semi-transparent box, colored by group. Coordinates are (x, y) in cell units. Default label goes just below the dot. Nudge labels to avoid overlapping cell names, other labels, and the U.S. label.

**U.S. presidents, navy `#1b2a6b`:**
Jefferson (2.45, 0.35), Lincoln (2.85, 1.25), T. Roosevelt (2.50, 2.02), FDR (2.25, 2.62), Eisenhower (2.90, 1.90), Reagan (3.45, 1.10), Clinton (3.15, 1.45), Obama (2.70, 1.70), Biden (2.55, 2.30), Trump (3.35, 2.20)

**Thinkers, purple `#6a1b9a`:**
AOC (1.30, 2.45), Sanders (1.70, 2.12), Warren (2.30, 1.90), Chomsky (1.30, 0.60), Bookchin (0.75, 0.55), Wendell Berry (1.95, 0.35), Friedman (3.05, 0.60), Ron Paul (3.50, 0.42), Rothbard (3.85, 0.15), Marx (0.15, 2.10), G.D.H. Cole (0.65, 1.50), Pope Leo XIII (0.30, 1.20), Kropotkin (0.15, 0.60), Proudhon (0.90, 0.25), Henry George (1.55, 0.30), Hayek (2.75, 0.65), Adam Smith (2.90, 0.22), Ayn Rand (3.85, 0.62)

**Leaders & politicians, orange `#c25e00`:**
Stalin (0.30, 2.55), Mao (0.80, 2.35), Castro (0.55, 2.05), Xi Jinping (1.80, 2.50), Tito (1.15, 2.10), Hitler (2.05, 2.35), Putin (3.75, 2.55), Mussolini (0.40, 1.72), Olof Palme (1.30, 1.50), Jacinda Ardern (1.60, 1.25), Ludwig Erhard (2.45, 1.20), Romney (3.45, 1.75), Thatcher (3.75, 1.20), Gandhi (0.40, 0.30)

## Styling
- Clean modern look: cell backgrounds alternate between `#eef2f6` and `#dde5ee` with white borders. Headers are dark slate `#2b3a4a` with white bold text.
- Cell names: bold, ~14pt, dark gray, on a soft background box so they stay readable over overlays.
- Draw order, bottom to top: cells → stability band → U.S. overlay → cell names → dots → labels.
- Legend below the grid, horizontal: U.S. presidents, Thinkers, Leaders & politicians.
- Footnote at the bottom-left: "Figures placed by stated economic views (not governance style); placements approximate and contestable."
- Title above the grid: "A Two-Axis Map of Economic Systems".
- Figure size ~15×8 inches, 200 dpi, white background, `bbox_inches='tight'`.

## Optional variant
Add a flag `--examples` that, instead of figures, shows two historical examples per cell under the name, labeled "Auth:" (dark red) and "Dem:" (blue):
Communism: Soviet Union / Paris Commune · Social Ownership: Yugoslavia / DSA Platform* · New Deal Socialism: Perón's Argentina / FDR's U.S. · Crony Capitalism: Putin's Russia / Gilded Age U.S. · Guild System: Mussolini's Italy / Florentine Republic · Nordic Model: Kuwait* / Sweden · Social Market: Singapore / West Germany · Regulated Capitalism: Pinochet's Chile / Canada · Mutualism: Jonestown / Amish · Left Libertarianism: Makhno's Ukraine* / Rojava · Classical Liberalism: Díaz's Mexico / Victorian Britain · Right Libertarianism: British Hong Kong / Frontier America*
(* = theoretical or weak fit; add that footnote in this mode.)

After rendering, open the PNG, check for overlapping text, and adjust label offsets until every label is legible.
