import { useEffect } from "react";
import "./styles.css";
import { PERCENT, WEEKS_PER_YEAR } from "./logic/constants";
import { averageUses, recommended, recommendedCount } from "./logic/calculate";
import { findItemType, DEFAULT_ITEM_TYPE } from "./logic/items";
import type { ItemType } from "./logic/items";
import InputDials from "./panels/InputDials";
import RecommendationPanel from "./panels/RecommendationPanel";
import SavingsPanel from "./panels/SavingsPanel";
import GoalCurve from "./graphs/GoalCurve";
import ShareBar from "./panels/ShareBar";
import SharingCurve from "./graphs/SharingCurve";
import { useCalculatorState } from "./state/state";
import WaitChart from "./graphs/WaitChart";

type Calculator = ReturnType<typeof useCalculatorState>;

/** Once a shared link has been read, drop its values from the address so later changes win on reload. */
function useClearSharedLink() {
  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);
}

/** The charts and recommendation that react to your numbers. */
function Results({ calculator, item, people, needed }: { calculator: Calculator; item: ItemType; people: number; needed: number }) {
  return (
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
  );
}

/** The cost of buying up to the recommendation, with its price and wear settings. */
function Savings({ calculator, item, target, yearlyUses }: { calculator: Calculator; item: ItemType; target: number; yearlyUses: number }) {
  return (
    <SavingsPanel
      owned={calculator.owned}
      target={target}
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
  );
}

/** Minimalism calculator page: how many of an item you need compared with how many you own. */
export default function MinimalismCalculator() {
  const calculator = useCalculatorState();
  const item = findItemType(calculator.typeId) ?? DEFAULT_ITEM_TYPE;
  useClearSharedLink();

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
          <InputDials calculator={calculator} item={item} people={people} />
          <GoalCurve yearlyUses={yearlyUses} goal={calculator.perYear} item={item} onGoal={calculator.setPerYear} />
        </div>
        <Results calculator={calculator} item={item} people={people} needed={needed} />
      </div>

      <Savings calculator={calculator} item={item} target={recommendedCount(needed)} yearlyUses={yearlyUses} />
    </div>
  );
}
