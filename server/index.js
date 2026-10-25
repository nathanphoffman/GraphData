import { createServer } from "node:http";
import sirv from "sirv";
import { getWeights } from "./db.js";

const PORT = process.env.PORT ?? 3000;
const serveSite = sirv("dist", { single: true });

createServer((request, response) => {
  if (request.url === "/api/weights" && request.method === "GET") {
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Cache-Control", "no-store");
    response.end(JSON.stringify(getWeights()));
    return;
  }

  serveSite(request, response);
}).listen(PORT, "0.0.0.0", () => console.log(`Listening on port ${PORT}`));
