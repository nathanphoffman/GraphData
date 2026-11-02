import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChartPage from "./pages/ChartPage";
import Home from "./pages/Home";

// BrowserRouter needs the server to answer every path with index.html (sirv --single does).
export default function Application() {
  return (
    <BrowserRouter>
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ChartPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
