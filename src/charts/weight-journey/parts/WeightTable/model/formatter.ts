import type { Format } from "../../../model/units";
import type { Kind } from "./columns";

/** Decimal places shown for the muscle columns. */
const MUSCLE3_DIGITS = 3;

/** Writes a number the way its column shows it. Blood pressure and Health are not weights, so the unit does not change them. */
export const formatter = (kind: Kind, unitFormat: Format) => {
  if (kind === "change") return unitFormat.signed;

  if (kind === "pressure" || kind === "health") return (value: number) => value.toFixed(1);

  if (kind === "muscle2") return (pounds: number) => unitFormat.w(pounds, 2);

  if (kind === "muscle3") return (pounds: number) => unitFormat.w(pounds, MUSCLE3_DIGITS);

  return unitFormat.w;
};
