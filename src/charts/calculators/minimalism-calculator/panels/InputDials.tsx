import { PERCENT } from "../logic/constants";
import type { ItemType } from "../logic/items";
import { capitalize } from "../logic/items";
import { OWNED_STOPS, PER_WEEK_MAX, PER_WEEK_MIN, PER_WEEK_STEP, PER_YEAR_BENCHMARKS, PER_YEAR_STOPS } from "../logic/stops";
import type { useCalculatorState } from "../state/state";
import Slider from "./Slider";

type Calculator = ReturnType<typeof useCalculatorState>;

interface DialProps {
  calculator: Calculator;
  item: ItemType;
}

/** How often all the items are used in a week. */
function PerWeekDial({ calculator, item }: DialProps) {
  return (
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
  );
}

/** How many items you own. The dial moves along the allowed stops, so its value is a position in the list. */
function OwnedDial({ calculator, item }: DialProps) {
  return (
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
  );
}

/** How much use you want out of each item per year. Like the owned dial, it moves along its stops. */
function PerYearDial({ calculator, item }: DialProps) {
  return (
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
  );
}

/** Your share of the total use, when you pool items with other people. */
function ShareDial({ calculator, item, people }: DialProps & { people: number }) {
  return (
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
  );
}

/** The four dials for your numbers. */
export default function InputDials({ calculator, item, people }: DialProps & { people: number }) {
  return (
    <div className="mini-dials">
      <PerWeekDial calculator={calculator} item={item} />
      <OwnedDial calculator={calculator} item={item} />
      <PerYearDial calculator={calculator} item={item} />
      <ShareDial calculator={calculator} item={item} people={people} />
    </div>
  );
}
