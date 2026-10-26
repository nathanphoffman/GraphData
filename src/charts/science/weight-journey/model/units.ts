export type Unit = "lb" | "kg";
export const KG_PER_LB = 0.45359237;

/** Seconds since 1970 for a date, read as UTC so the time zone cannot shift the day. */
export const toDate = (isoDate: string) => new Date(isoDate + "T00:00:00Z");

/** Date in the viewer's own format. */
export const pretty = (isoDate: string) =>
  toDate(isoDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

/** Formatters for the chosen unit; weights are stored in lb and converted on display. */
export function makeFormat(unit: Unit) {
  const unitFactor = unit === "kg" ? KG_PER_LB : 1;

  const width = (pounds: number, digits = 1) => (pounds * unitFactor).toFixed(digits);

  const signed = (pounds: number) => `${pounds > 0 ? "+" : ""}${width(pounds)}`;

  return { k: unitFactor, w: width, signed };
}

export type Format = ReturnType<typeof makeFormat>;
