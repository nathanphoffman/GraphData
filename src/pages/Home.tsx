import { Link } from "react-router-dom";
import { charts } from "../charts/registry";

export default function Home() {
  return (
    <section>
      <h1>GraphData</h1>
      <p className="muted">All charts in this project.</p>
      <ul className="chart-list">
        {charts.map((chart) => (
          <li key={chart.id}>
            <Link to={`/chart/${chart.id}`}>{chart.title}</Link>
            <p>{chart.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
