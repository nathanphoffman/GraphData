import { requireUser } from "../auth.js";
import { db } from "../db.js";
import { HttpError, readJson, readStamp, sendJson } from "../http.js";
import { checkFeatures, checkValues, checkWeightOrder } from "./checks.js";
import { getRankings, ratedColumnLabels, renameRankingItem, saveItem, saveWeightOrder } from "./queries.js";

async function putItem(request, response, { id, name }) {
  requireUser(request);
  const { values, updatedAt, features } = await readJson(request);
  checkValues(id, name, values);

  if (features !== undefined) checkFeatures(features);
  const stamp = readStamp(updatedAt);

  // Features are only replaced when sent, so editing values alone keeps an item's planned features.
  saveItem(id, name, values, stamp, features);
  sendJson(response, 200, { name, values, updatedAt: stamp, features });
}

async function putFeatures(request, response, { id, name }) {
  requireUser(request);
  const { features } = await readJson(request);
  checkFeatures(features);

  // Counts as a change to the item, so syncing with the live site sees it as newer.
  const { changes } = db
    .prepare("UPDATE ranking_items SET features_json = ?, updated_at = ? WHERE ranking_id = ? AND name = ?")
    .run(JSON.stringify(features), Date.now(), id, name);

  if (!changes) throw new HttpError(404, "No such item in that ranking");

  sendJson(response, 200, { name, features });
}

async function putName(request, response, { id, name }) {
  requireUser(request);
  const { name: newName, updatedAt } = await readJson(request);
  const renamed = renameRankingItem(id, name, newName, readStamp(updatedAt));
  sendJson(response, 200, { name: renamed });
}

async function putWeights(request, response, { id }) {
  requireUser(request);
  const { order } = await readJson(request);
  const rated = ratedColumnLabels(id);

  if (!rated.length) throw new HttpError(404, "No such ranking");

  checkWeightOrder(order, rated);
  saveWeightOrder(id, order);
  sendJson(response, 200, { order });
}

function deleteItem(request, response, { id, name }) {
  requireUser(request);
  const { changes } = db.prepare("DELETE FROM ranking_items WHERE ranking_id = ? AND name = ?").run(id, name);

  if (!changes) throw new HttpError(404, "No such item in that ranking");

  sendJson(response, 200, { name });
}

export const rankingRoutes = [
  {
    method: "GET",
    path: "/api/rankings",
    handler: (_request, response) => sendJson(response, 200, getRankings()),
  },
  // Adds the item with this name, or changes its values when the ranking already has it.
  { method: "PUT", path: "/api/rankings/:id/items/:name", handler: putItem },

  // Replaces the list of planned features of an item that already exists.
  { method: "PUT", path: "/api/rankings/:id/items/:name/features", handler: putFeatures },

  // Renames an item, keeping its values, planned features and place in the list. Syncing carries the rename to the other side.
  { method: "PUT", path: "/api/rankings/:id/items/:name/name", handler: putName },

  // Sets the weights of the rated columns from their order, heaviest first: the first label gets xN and the last x1.
  { method: "PUT", path: "/api/rankings/:id/weights", handler: putWeights },
  { method: "DELETE", path: "/api/rankings/:id/items/:name", handler: deleteItem },
];
