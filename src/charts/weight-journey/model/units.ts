export type Unit = "lb" | "kg";
export const KG_PER_LB = 0.45359237;

export const toDate = (iso: string) => new Date(iso + "T00:00:00Z");
export const pretty = (iso: string) =>
  toDate(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

/** Formatters for the chosen unit; weights are stored in lb and converted on display. */
export function makeFormat(unit: Unit) {
  const k = unit === "kg" ? KG_PER_LB : 1;
  const w = (lb: number, digits = 1) => (lb * k).toFixed(digits);
  const signed = (lb: number) => `${lb > 0 ? "+" : ""}${w(lb)}`;
  return { k, w, signed };
}

export type Format = ReturnType<typeof makeFormat>;
