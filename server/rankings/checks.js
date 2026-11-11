import { db } from "../db.js";
import { HttpError } from "../http.js";

const MAX_RATING = 5;
const MAX_TEXT = 80;

// a cell of text can be longer than a name (the Tech Lines cell lists every language)
const MAX_VALUE_TEXT = 400;
const MAX_FEATURES = 50;
const MAX_FEATURE_TEXT = 200;

/** An item's name is text of 1 to MAX_TEXT characters. */
export function checkName(name) {
  if (typeof name !== "string" || !name.trim() || name.length > MAX_TEXT)
    throw new HttpError(400, `Name must be 1 to ${MAX_TEXT} characters`);
}

const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);

/** One value against its column: a curve column takes any number, a rated one 0 to MAX_RATING, information a number, short text or empty. */
function checkValue({ label, weight, curve }, value) {
  if (curve !== null && !isFiniteNumber(value)) throw new HttpError(400, `${label} must be a number`);

  if (weight !== null && curve === null && !(typeof value === "number" && value >= 0 && value <= MAX_RATING))
    throw new HttpError(400, `${label} must be a number from 0 to ${MAX_RATING}`);

  const isShortText = typeof value === "string" && value.length <= MAX_VALUE_TEXT;

  if (weight === null && !(value === null || typeof value === "number" || isShortText))
    throw new HttpError(400, `${label} must be a number, short text or empty`);
}

/** Check an item's values against the ranking's columns: ratings are numbers from 0 to 5, information is a number, text or empty. */
export function checkValues(rankingId, name, values) {
  const columns = db
    .prepare("SELECT label, weight, curve FROM ranking_columns WHERE ranking_id = ? ORDER BY position")
    .all(rankingId);

  if (!columns.length) throw new HttpError(404, "No such ranking");
  checkName(name);

  if (!Array.isArray(values) || values.length !== columns.length)
    throw new HttpError(400, `Expected ${columns.length} values`);

  columns.forEach((column, index) => checkValue(column, values[index]));
}

/** Check a list of planned features: an array of short, non-empty text. */
export function checkFeatures(features) {
  if (!Array.isArray(features) || features.length > MAX_FEATURES)
    throw new HttpError(400, `Features must be a list of up to ${MAX_FEATURES}`);

  for (const feature of features) {
    if (typeof feature !== "string" || !feature.trim() || feature.length > MAX_FEATURE_TEXT)
      throw new HttpError(400, `Each feature must be 1 to ${MAX_FEATURE_TEXT} characters`);
  }
}

/** The weight order must list every rated column label exactly once. */
export function checkWeightOrder(order, ratedLabels) {
  const listsEveryLabelOnce =
    Array.isArray(order) &&
    order.length === ratedLabels.length &&
    new Set(order).size === ratedLabels.length &&
    order.every((label) => ratedLabels.includes(label));

  if (!listsEveryLabelOnce) throw new HttpError(400, "Order must list every rated column once");
}
