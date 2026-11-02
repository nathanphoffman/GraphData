import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // `npm run server` serves the API during `npm run dev` and `npm run preview`.
  server: { proxy: { "/api": "http://localhost:3001" } },
  preview: { proxy: { "/api": "http://localhost:3001" } },
});
