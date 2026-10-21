import { DEFAULT_ITEM_TYPE, findItemType } from "../logic/items";
import { OWNED_STOPS, PER_WEEK_MAX, PER_WEEK_MIN, PER_WEEK_STEP, PER_YEAR_STOPS } from "../logic/stops";
import { useStoredNumber, useStoredValue } from "./useStoredValue";

const isAmount = (v: number) => Number.isFinite(v) && v >= 0;

/** Every input on the page, remembered in the browser and restorable from a shared link. */
export function useCalculatorState() {
  const [title, setTitle] = useStoredValue("title", "", (raw) => raw.slice(0, 80));
  const [typeId, setTypeId] = useStoredValue("type", DEFAULT_ITEM_TYPE.id, (raw) => (findItemType(raw) ? raw : null));
  const [perWeek, setPerWeek] = useStoredNumber(
    "per-week",
    3,
    (v) => v >= PER_WEEK_MIN && v <= PER_WEEK_MAX && v / PER_WEEK_STEP === Math.round(v / PER_WEEK_STEP),
  );
  const [owned, setOwned] = useStoredNumber("owned", 10, (v) => OWNED_STOPS.includes(v));
  const [perYear, setPerYear] = useStoredNumber("per-year", 52, (v) => PER_YEAR_STOPS.includes(v));
  const [sharePct, setSharePct] = useStoredNumber("share-pct", 100, (v) => Number.isInteger(v) && v >= 1 && v <= 100);
  const [buyPerYear, setBuyPerYear] = useStoredNumber("buy-per-year", 2, isAmount);
  const [price, setPrice] = useStoredNumber("price", 30, isAmount);
  const [minPlays, setMinPlays] = useStoredNumber("min-plays", 20, isAmount);
  const [maxPlays, setMaxPlays] = useStoredNumber("max-plays", 100, isAmount);

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
