import { Link } from "react-router-dom";
import { categories, charts } from "../charts/registry";

/** Home page: all charts, grouped by category. */
export default function Home() {
  return (
    <section>
      <h1>GraphData</h1>
      <p className="muted">All charts in this project.</p>
      <div className="category-grid">
      {categories.map((category) => ( // One section per category.
        <div key={category} className="category">
          <h2>{category}</h2>
          <ul className="chart-list">
            {charts
              .filter((chart) => chart.category === category && !chart.unlisted)
              // One link per chart in the category.
              .map((chart) => (
                <li key={chart.id}>
                  <Link to={`/${chart.id}`}>{chart.title}</Link>
                  <p>{chart.description}</p>
                </li>
              ))}
          </ul>
        </div>
      ))}
      </div>
    </section>
  );
}
