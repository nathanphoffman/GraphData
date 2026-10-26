import { MAX_TITLE_LENGTH, PERCENT } from "../logic/constants";
import { DEFAULT_ITEM_TYPE, findItemType } from "../logic/items";
import { OWNED_STOPS, PER_WEEK_MAX, PER_WEEK_MIN, PER_WEEK_STEP, PER_YEAR_STOPS } from "../logic/stops";
import { useStoredNumber, useStoredValue } from "./useStoredValue";

/** What a new visitor starts with. */
const DEFAULTS = { perWeek: 3, owned: 10, perYear: 52, sharePct: 100, buyPerYear: 2, price: 30, minPlays: 20, maxPlays: 100 };

/** True for amounts the calculator can use: finite and not negative. */
const isAmount = (value: number) => Number.isFinite(value) && value >= 0;

/** Every input on the page, remembered in the browser and restorable from a shared link. */
export function useCalculatorState() {
  const [title, setTitle] = useStoredValue("title", "", (rawValue) => rawValue.slice(0, MAX_TITLE_LENGTH));
  const [typeId, setTypeId] = useStoredValue("type", DEFAULT_ITEM_TYPE.id, (rawValue) => (findItemType(rawValue) ? rawValue : null));
  const [perWeek, setPerWeek] = useStoredNumber(
    "per-week",
    DEFAULTS.perWeek,
    (value) => value >= PER_WEEK_MIN && value <= PER_WEEK_MAX && value / PER_WEEK_STEP === Math.round(value / PER_WEEK_STEP),
  );

  const [owned, setOwned] = useStoredNumber("owned", DEFAULTS.owned, (value) => OWNED_STOPS.includes(value));
  const [perYear, setPerYear] = useStoredNumber("per-year", DEFAULTS.perYear, (value) => PER_YEAR_STOPS.includes(value));
  const [sharePct, setSharePct] = useStoredNumber("share-pct", DEFAULTS.sharePct, (value) => Number.isInteger(value) && value >= 1 && value <= PERCENT);
  const [buyPerYear, setBuyPerYear] = useStoredNumber("buy-per-year", DEFAULTS.buyPerYear, isAmount);
  const [price, setPrice] = useStoredNumber("price", DEFAULTS.price, isAmount);
  const [minPlays, setMinPlays] = useStoredNumber("min-plays", DEFAULTS.minPlays, isAmount);
  const [maxPlays, setMaxPlays] = useStoredNumber("max-plays", DEFAULTS.maxPlays, isAmount);

  /** The values a shared link carries, keyed the same way the page reads them back. */
  const shareParams = (): Record<string, string> => ({
    title: title.trim(),
    type: typeId,
    "per-week": String(perWeek),
    owned: String(owned),
    "per-year": String(perYear),
    "share-pct": String(sharePct),
    "buy-per-year": String(buyPerYear),
    price: String(price),
    "min-plays": String(minPlays),
    "max-plays": String(maxPlays),
  });

  return {
    title, setTitle, typeId, setTypeId, perWeek, setPerWeek, owned, setOwned, perYear, setPerYear,
    sharePct, setSharePct, buyPerYear, setBuyPerYear, price, setPrice, minPlays, setMinPlays,
    maxPlays, setMaxPlays, shareParams,
  };
}
