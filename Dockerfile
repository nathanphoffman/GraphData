FROM node:24-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production
# Put a volume at /data so graphdata.db survives redeploys.
ENV DB_PATH=/data/graphdata.db
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server ./server
COPY data/weight-journey/weight-journey.json ./data/weight-journey/weight-journey.json
COPY data/top-rankings/top-rankings.json ./data/top-rankings/top-rankings.json
CMD ["node", "server/index.js"]
