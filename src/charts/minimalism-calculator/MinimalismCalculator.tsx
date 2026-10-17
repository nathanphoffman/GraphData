import "../maintainability-calculator/styles.css";
import "./styles.css";
import { averageUses, recommended } from "./calculate";
import RecommendationPanel from "./RecommendationPanel";
import Slider from "./Slider";
import {
  OWNED_STOPS,
  PER_WEEK_MAX,
  PER_WEEK_MIN,
  PER_WEEK_STEP,
  PER_YEAR_STOPS,
} from "./stops";
import { useStoredNumber } from "./useStoredNumber";
import WaitChart from "./WaitChart";

export default function MinimalismCalculator() {
  const [perWeek, setPerWeek] = useStoredNumber(
    "per-week",
    3,
    (v) => v >= PER_WEEK_MIN && v <= PER_WEEK_MAX && v / PER_WEEK_STEP === Math.round(v / PER_WEEK_STEP),
  );
  const [owned, setOwned] = useStoredNumber("owned", 10, (v) => OWNED_STOPS.includes(v));
  const [perYear, setPerYear] = useStoredNumber("per-year", 52, (v) => PER_YEAR_STOPS.includes(v));
  const [sharePct, setSharePct] = useStoredNumber(
    "share-pct",
    100,
    (v) => Number.isInteger(v) && v >= 1 && v <= 100,
  );

  const needed = recommended(perWeek, perYear, sharePct);
  const people = 100 / sharePct;

  return (
    <div className="calc">
      <div className="mini-layout">
        <div className="mini-inputs">
          <h2>Your numbers</h2>
          <Slider
            id="per-week"
            label="Uses per week (whoever owns it)"
            description="All items in the category combined, e.g. reading 2 books a week."
            value={perWeek}
            min={PER_WEEK_MIN}
            max={PER_WEEK_MAX}
            step={PER_WEEK_STEP}
            display={`${perWeek} / week`}
            low="0.25 (once a month)"
            high={`${PER_WEEK_MAX}`}
            onChange={setPerWeek}
          />
          <Slider
            id="owned"
            label="How many you own"
            value={OWNED_STOPS.indexOf(owned)}
            min={0}
            max={OWNED_STOPS.length - 1}
            display={`${owned}`}
            low="1"
            high="1000"
            onChange={(i) => setOwned(OWNED_STOPS[i])}
          />
          <Slider
            id="per-year"
            label="Uses per year you want from each item"
            description="Per single item, e.g. each board game played 10 times a year."
            value={PER_YEAR_STOPS.indexOf(perYear)}
            min={0}
            max={PER_YEAR_STOPS.length - 1}
            display={`${perYear} / year`}
            low="0.1 (decadely)"
            high="365 (daily)"
            onChange={(i) => setPerYear(PER_YEAR_STOPS[i])}
          />
          <Slider
            id="share"
            label="Your share of the contributing"
            description="Play with 3 people who all chip in equally? You supply 33%."
            value={sharePct}
            min={1}
            max={100}
            display={`${sharePct}% (1 in ${people.toFixed(people % 1 ? 1 : 0)})`}
            low="1% (mostly borrow)"
            high="100% (all mine)"
            onChange={setSharePct}
          />
        </div>

        <div className="mini-results">
          <h2>Results</h2>
          <RecommendationPanel owned={owned} needed={needed} />
          <WaitChart owned={owned} avgUses={averageUses(perWeek, sharePct, owned)} goal={perYear} />
        </div>
      </div>
    </div>
  );
}
