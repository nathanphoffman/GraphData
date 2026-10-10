import { Link, useParams } from "react-router-dom";
import { findChart } from "../charts/registry";

export default function ChartPage() {
  const { id } = useParams();
  const chart = findChart(id);

  if (!chart) {
    return (
      <section>
        <h1>Chart not found</h1>
        <Link to="/">Back to all charts</Link>
      </section>
    );
  }

  const Chart = chart.component;
  return (
    <section>
      <Link to="/">&larr; All charts</Link>
      <h1>{chart.title}</h1>
      <p className="muted">{chart.description}</p>
      <Chart />
    </section>
  );
}
