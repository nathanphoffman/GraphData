import { useEffect } from "react";
import "./styles.css";
import { averageUses, recommended, recommendedCount } from "./logic/calculate";
import { cap, findItemType, DEFAULT_ITEM_TYPE } from "./logic/items";
import RecommendationPanel from "./panels/RecommendationPanel";
import SavingsPanel from "./panels/SavingsPanel";
import GoalCurve from "./graphs/GoalCurve";
import ShareBar from "./panels/ShareBar";
import SharingCurve from "./graphs/SharingCurve";
import Slider from "./panels/Slider";
import { useCalculatorState } from "./state/state";
import { OWNED_STOPS, PER_WEEK_MAX, PER_WEEK_MIN, PER_WEEK_STEP, PER_YEAR_BENCHMARKS, PER_YEAR_STOPS } from "./logic/stops";
import WaitChart from "./graphs/WaitChart";

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
          <div className="mini-dials">
          <Slider
            id="per-week"
            label={`${cap(item.uses)} per week`}
            value={s.perWeek}
            min={PER_WEEK_MIN}
            max={PER_WEEK_MAX}
            step={PER_WEEK_STEP}
            display={`${s.perWeek} / week`}
            low="0.25 (once a month)"
            high={`${PER_WEEK_MAX}`}
            learnMore={`How often ${item.many} get used in total, by anyone who owns one. All your ${item.many} combined, e.g. ${item.weekExample}. This is the demand: the busier the week, the more ${item.many} you need so you rarely have to wait.`}
            onChange={s.setPerWeek}
          />
          <Slider
            id="owned"
            label={`${cap(item.many)} owned`}
            value={OWNED_STOPS.indexOf(s.owned)}
            min={0}
            max={OWNED_STOPS.length - 1}
            display={`${s.owned}`}
            low="1"
            high="1000"
            learnMore={`How many ${item.many} you have today. The calculator compares this with how many you actually need and tells you if you have too many, too few, or about right.`}
            onChange={(i) => s.setOwned(OWNED_STOPS[i])}
          />
          <Slider
            id="per-year"
            label={`${cap(item.uses)} each / year`}
            value={PER_YEAR_STOPS.indexOf(s.perYear)}
            min={0}
            max={PER_YEAR_STOPS.length - 1}
            display={PER_YEAR_BENCHMARKS[s.perYear] ?? `${s.perYear} / year`}
            low="0.1 (decadely)"
            high="365 (daily)"
            learnMore={`How much use you want out of each single ${item.one} per year. A higher number means each one is worked harder (e.g. ${item.yearExample}), so you need fewer of them. A lower number means they sit idle more and you need more.`}
            onChange={(i) => s.setPerYear(PER_YEAR_STOPS[i])}
          />
          <Slider
            id="share"
            label="Your share"
            value={s.sharePct}
            min={1}
            max={100}
            display={`${s.sharePct}% (1 in ${people.toFixed(people % 1 ? 1 : 0)})`}
            low="1% (mostly borrow)"
            high="100% (all mine)"
            learnMore={`If you pool ${item.many} with friends or family, you only need to cover your share of the total use. 100% means everything is yours. 25% means four people chip in equally, so you each need about a quarter as many.`}
            onChange={s.setSharePct}
          />
          </div>
          <GoalCurve yearlyUses={yearlyUses} goal={s.perYear} item={item} onGoal={s.setPerYear} />
        </div>

        <div className="mini-results">
          <h2>Results</h2>
          <RecommendationPanel owned={s.owned} needed={needed} />
          <WaitChart owned={s.owned} avgUses={averageUses(s.perWeek, s.sharePct, s.owned)} goal={s.perYear} item={item} />
          <SharingCurve
            soloNeeded={recommended(s.perWeek, s.perYear, 100)}
            people={people}
            item={item}
            onPeople={(n) => s.setSharePct(Math.min(100, Math.max(1, Math.round(100 / n))))}
          />
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
