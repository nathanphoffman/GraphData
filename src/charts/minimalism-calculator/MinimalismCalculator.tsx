import { useEffect } from "react";
import "./styles.css";
import { averageUses, recommended, recommendedCount } from "./calculate";
import { cap, findItemType, DEFAULT_ITEM_TYPE } from "./items";
import RecommendationPanel from "./RecommendationPanel";
import SavingsPanel from "./SavingsPanel";
import ShareBar from "./ShareBar";
import Slider from "./Slider";
import { useCalculatorState } from "./state";
import { OWNED_STOPS, PER_WEEK_MAX, PER_WEEK_MIN, PER_WEEK_STEP, PER_YEAR_STOPS } from "./stops";
import WaitChart from "./WaitChart";

export default function MinimalismCalculator() {
  const s = useCalculatorState();
  const item = findItemType(s.typeId) ?? DEFAULT_ITEM_TYPE;

  // Once a shared link has been read, drop its values from the address so later changes win on reload.
  useEffect(() => {
    if (window.location.hash.includes("?")) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search + window.location.hash.split("?")[0]);
    }
  }, []);

  const needed = recommended(s.perWeek, s.perYear, s.sharePct);
  const people = 100 / s.sharePct;
  const yearlyUses = s.perWeek * 52 * (s.sharePct / 100);

  return (
    <div className="mini-calc">
      <ShareBar title={s.title} onTitle={s.setTitle} typeId={s.typeId} onType={s.setTypeId} shareParams={s.shareParams} />
      {s.title.trim() && <h2 className="mini-title">{s.title.trim()}</h2>}

      <div className="mini-layout">
        <div className="mini-inputs">
          <h2>Your numbers</h2>
          <Slider
            id="per-week"
            label={`${cap(item.uses)} per week (whoever owns it)`}
            description={`All your ${item.many} combined, e.g. ${item.weekExample}.`}
            value={s.perWeek}
            min={PER_WEEK_MIN}
            max={PER_WEEK_MAX}
            step={PER_WEEK_STEP}
            display={`${s.perWeek} / week`}
            low="0.25 (once a month)"
            high={`${PER_WEEK_MAX}`}
            onChange={s.setPerWeek}
          />
          <Slider
            id="owned"
            label={`How many ${item.many} you own`}
            value={OWNED_STOPS.indexOf(s.owned)}
            min={0}
            max={OWNED_STOPS.length - 1}
            display={`${s.owned}`}
            low="1"
            high="1000"
            onChange={(i) => s.setOwned(OWNED_STOPS[i])}
          />
          <Slider
            id="per-year"
            label={`${cap(item.uses)} per year you want from each ${item.one}`}
            description={`Per single ${item.one}, e.g. ${item.yearExample}.`}
            value={PER_YEAR_STOPS.indexOf(s.perYear)}
            min={0}
            max={PER_YEAR_STOPS.length - 1}
            display={`${s.perYear} / year`}
            low="0.1 (decadely)"
            high="365 (daily)"
            onChange={(i) => s.setPerYear(PER_YEAR_STOPS[i])}
          />
          <Slider
            id="share"
            label="Your share of the contributing"
            description={`Pool your ${item.many} with 3 friends who all chip in equally? You supply 33%.`}
            value={s.sharePct}
            min={1}
            max={100}
            display={`${s.sharePct}% (1 in ${people.toFixed(people % 1 ? 1 : 0)})`}
            low="1% (mostly borrow)"
            high="100% (all mine)"
            onChange={s.setSharePct}
          />
        </div>

        <div className="mini-results">
          <h2>Results</h2>
          <RecommendationPanel owned={s.owned} needed={needed} />
          <WaitChart owned={s.owned} avgUses={averageUses(s.perWeek, s.sharePct, s.owned)} goal={s.perYear} item={item} />
        </div>
      </div>

      <SavingsPanel
        owned={s.owned}
        target={recommendedCount(needed)}
        yearlyUses={yearlyUses}
        item={item}
        buyPerYear={s.buyPerYear}
        onBuyPerYear={s.setBuyPerYear}
        price={s.price}
        onPrice={s.setPrice}
        minPlays={s.minPlays}
        onMinPlays={s.setMinPlays}
        maxPlays={s.maxPlays}
        onMaxPlays={s.setMaxPlays}
      />
    </div>
  );
}
