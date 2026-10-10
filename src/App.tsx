import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ChartPage from "./pages/ChartPage";

// HashRouter keeps routing working on any static host (no server rewrites needed).
export default function App() {
  return (
    <HashRouter>
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart/:id" element={<ChartPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </HashRouter>
  );
}
