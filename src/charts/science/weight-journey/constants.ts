export const DAYS_PER_MONTH = 30;
export const DAYS_PER_YEAR = 365;
export const MONTHS_PER_YEAR = 12;

/** Half a month, used by the recent rate. */
export const HALF_MONTH_DAYS = 15;

/** Weights are rounded to one decimal place: multiply by this, round, divide by it. */
export const TENTH = 10;

/** The length of YYYY-MM-DD. */
export const ISO_DATE_LENGTH = 10;

/** The trend curve is fitted to this many recent days and runs this many days ahead. */
export const FIT_DAYS = 90;
export const FIT_AHEAD_DAYS = 90;

/** Days smoothed by the weighted moving averages. */
export const SMOOTHING_DAYS = 14;

/** How many of the latest rows the spread and general curves use. */
export const SPREAD_ROWS = 7;
