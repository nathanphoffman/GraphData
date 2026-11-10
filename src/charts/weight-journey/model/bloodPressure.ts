import { DAY_MS } from "../constants";
import { toDate } from "./units";

/** One day's two readings as the API sends them: [date, first top, first bottom, second top, second bottom], in mmHg. */
export type Pressure_Reading = [string, number, number, number, number];

/** The four numbers of a day's readings. */
export interface Pressure_Values {
  firstTop: number;
  firstBottom: number;
  secondTop: number;
  secondBottom: number;
}

export interface Blood_Pressure extends Pressure_Values {
  /** average of the two top (systolic) readings */
  avgTop: number;

  /** average of the two bottom (diastolic) readings */
  avgBottom: number;

  /** true when no reading was taken that day and the values are interpolated or carried forward */
  pressureEstimated: boolean;
}

export const PRESSURE_KEYS = ["firstTop", "firstBottom", "secondTop", "secondBottom"] as const;

/** The four values of a reading, named. */
export const valuesOf = ([, firstTop, firstBottom, secondTop, secondBottom]: Pressure_Reading): Pressure_Values => ({
  firstTop,
  firstBottom,
  secondTop,
  secondBottom,
});

/** Straight-line blend of each of the four values, `fraction` of the way from `from` to `to`. */
function blendValues(from: Pressure_Values, to: Pressure_Values, fraction: number): Pressure_Values {
  const blended = { ...from };

  for (const key of PRESSURE_KEYS) blended[key] = from[key] + (to[key] - from[key]) * fraction;

  return blended;
}

const withAverages = (values: Pressure_Values, pressureEstimated: boolean): Blood_Pressure => ({
  ...values,
  avgTop: (values.firstTop + values.secondTop) / 2,
  avgBottom: (values.firstBottom + values.secondBottom) / 2,
  pressureEstimated,
});

const daysBetween = (from: string, to: string) => (toDate(to).getTime() - toDate(from).getTime()) / DAY_MS;

/** The blood pressure on one day: null before the first reading, carried forward after the last, blended in a straight line between readings. */
function pressureOn(date: string, readings: Pressure_Reading[]): Blood_Pressure | null {
  const nextIndex = readings.findIndex((reading) => reading[0] >= date);

  if (nextIndex === -1) return readings.length ? withAverages(valuesOf(readings[readings.length - 1]), true) : null;
  const next = readings[nextIndex];

  if (next[0] === date) return withAverages(valuesOf(next), false);

  if (nextIndex === 0) return null;
  const previous = readings[nextIndex - 1];
  const fraction = daysBetween(previous[0], date) / daysBetween(previous[0], next[0]);

  return withAverages(blendValues(valuesOf(previous), valuesOf(next), fraction), true);
}

/** Give every day its blood pressure (null before the first reading). Readings must be sorted oldest first. */
export function addBloodPressure<T extends { date: string }>(days: T[], readings: Pressure_Reading[]) {
  return days.map((dayRecord) => ({ ...dayRecord, pressure: pressureOn(dayRecord.date, readings) }));
}

/** How much of the pulse pressure (top minus bottom) counts toward Health. */
const PULSE_PRESSURE_SHARE = 0.5;

/** Health: the pressure score (half the pulse pressure, plus top, plus bottom) averaged with the weight WMA in lb, minus the muscle gained so far. */
export function healthOf(weightWma: number | null, muscleTotal: number, pressure: Blood_Pressure | null, recentWma: number): number | null {
  if (!pressure || weightWma === null) return null;
  const pressureScore = (pressure.avgTop - pressure.avgBottom) * PULSE_PRESSURE_SHARE + pressure.avgTop + pressure.avgBottom;

  return (pressureScore + weightWma) / 2 - muscleTotal + recentWma;
}