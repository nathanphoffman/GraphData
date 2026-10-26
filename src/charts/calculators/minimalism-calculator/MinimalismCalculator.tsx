import { useEffect } from "react";
import "./styles.css";
import { PERCENT, WEEKS_PER_YEAR } from "./logic/constants";
import { averageUses, recommended, recommendedCount } from "./logic/calculate";
import { capitalize, findItemType, DEFAULT_ITEM_TYPE } from "./logic/items";
import RecommendationPanel from "./panels/RecommendationPanel";
import SavingsPanel from "./panels/SavingsPanel";
import GoalCurve from "./graphs/GoalCurve";
import ShareBar from "./panels/ShareBar";
import SharingCurve from "./graphs/SharingCurve";
import Slider from "./panels/Slider";
import { useCalculatorState } from "./state/state";
import { OWNED_STOPS, PER_WEEK_MAX, PER_WEEK_MIN, PER_WEEK_STEP, PER_YEAR_BENCHMARKS, PER_YEAR_STOPS } from "./logic/stops";
import WaitChart from "./graphs/WaitChart";

/** Minimalism calculator page: how many of an item you need compared with how many you own. */
export default function MinimalismCalculator() {
  const calculator = useCalculatorState();
  const item = findItemType(calculator.typeId) ?? DEFAULT_ITEM_TYPE;

  // Once a shared link has been read, drop its values from the address so later changes win on reload.
  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const needed = recommended(calculator.perWeek, calculator.perYear, calculator.sharePct);
  const people = PERCENT / calculator.sharePct;
  const yearlyUses = calculator.perWeek * WEEKS_PER_YEAR * (calculator.sharePct / PERCENT);

  return (
    <div className="mini-calc">
      <ShareBar title={calculator.title} onTitle={calculator.setTitle} typeId={calculator.typeId} onType={calculator.setTypeId} shareParams={calculator.shareParams} />
      {calculator.title.trim() && <h2 className="mini-title">{calculator.title.trim()}</h2>}

      <div className="mini-layout">
        <div className="mini-inputs">
          <h2>Your numbers</h2>
          <div className="mini-dials">
          <Slider
            id="per-week"
            label={`${capitalize(item.uses)} per week`}
            value={calculator.perWeek}
            min={PER_WEEK_MIN}
            max={PER_WEEK_MAX}
            step={PER_WEEK_STEP}
            display={`${calculator.perWeek} / week`}
            low="0.25 (once a month)"
            high={`${PER_WEEK_MAX}`}
            learnMore={`How often ${item.many} get used in total, by anyone who owns one. All your ${item.many} combined, e.g. ${item.weekExample}. This is the demand: the busier the week, the more ${item.many} you need so you rarely have to wait.`}
            onChange={calculator.setPerWeek}
          />
          <Slider
            id="owned"
            label={`${capitalize(item.many)} owned`}
            value={OWNED_STOPS.indexOf(calculator.owned)}
            min={0}
            max={OWNED_STOPS.length - 1}
            display={`${calculator.owned}`}
            low="1"
            high="1000"
            learnMore={`How many ${item.many} you have today. The calculator compares this with how many you actually need and tells you if you have too many, too few, or about right.`}
            onChange={(index) => calculator.setOwned(OWNED_STOPS[index])}
          />
          <Slider
            id="per-year"
            label={`${capitalize(item.uses)} each / year`}
            value={PER_YEAR_STOPS.indexOf(calculator.perYear)}
            min={0}
            max={PER_YEAR_STOPS.length - 1}
            display={PER_YEAR_BENCHMARKS[calculator.perYear] ?? `${calculator.perYear} / year`}
            low="0.1 (decadely)"
            high="365 (daily)"
            learnMore={`How much use you want out of each single ${item.one} per year. A higher number means each one is worked harder (e.g. ${item.yearExample}), so you need fewer of them. A lower number means they sit idle more and you need more.`}
            onChange={(index) => calculator.setPerYear(PER_YEAR_STOPS[index])}
          />
          <Slider
            id="share"
            label="Your share"
            value={calculator.sharePct}
            min={1}
            max={PERCENT}
            display={`${calculator.sharePct}% (1 in ${people.toFixed(people % 1 ? 1 : 0)})`}
            low="1% (mostly borrow)"
            high="100% (all mine)"
            learnMore={`If you pool ${item.many} with friends or family, you only need to cover your share of the total use. 100% means everything is yours. 25% means four people chip in equally, so you each need about a quarter as many.`}
            onChange={calculator.setSharePct}
          />
          </div>
          <GoalCurve yearlyUses={yearlyUses} goal={calculator.perYear} item={item} onGoal={calculator.setPerYear} />
        </div>

        <div className="mini-results">
          <h2>Results</h2>
          <RecommendationPanel owned={calculator.owned} needed={needed} />
          <WaitChart owned={calculator.owned} avgUses={averageUses(calculator.perWeek, calculator.sharePct, calculator.owned)} goal={calculator.perYear} item={item} />
          <SharingCurve
            soloNeeded={recommended(calculator.perWeek, calculator.perYear, PERCENT)}
            people={people}
            item={item}
            onPeople={(peopleCount) => calculator.setSharePct(Math.min(PERCENT, Math.max(1, Math.round(PERCENT / peopleCount))))}
          />
        </div>
      </div>

      <SavingsPanel
        owned={calculator.owned}
        target={recommendedCount(needed)}
        yearlyUses={yearlyUses}
        item={item}
        buyPerYear={calculator.buyPerYear}
        onBuyPerYear={calculator.setBuyPerYear}
        price={calculator.price}
        onPrice={calculator.setPrice}
        minPlays={calculator.minPlays}
        onMinPlays={calculator.setMinPlays}
        maxPlays={calculator.maxPlays}
        onMaxPlays={calculator.setMaxPlays}
      />
    </div>
  );
}
