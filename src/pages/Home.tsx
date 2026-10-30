import { Link, useNavigate } from "react-router-dom";
import { charts } from "../charts/registry";
import sizes from "../charts/pageSizes.json";

const sizeOf = (id: string): number => (sizes as Record<string, number>)[id] ?? 0;

/** Pages with the most code first, since that is roughly the work put into each. */
const pages = charts.filter((chart) => !chart.unlisted).sort((first, second) => sizeOf(second.id) - sizeOf(first.id));

/** Home page: every page in a table, biggest codebase first. */
export default function Home() {
  const navigate = useNavigate();

  return (
    <section>
      <h1>GraphData</h1>
      <p className="muted">All pages, biggest first (by lines of code).</p>
      <table className="page-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Page</th>
            <th>Category</th>
            <th>Lines</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((chart, index) => (
            <tr key={chart.id} onClick={() => navigate(`/${chart.id}`)}>
              <td className="page-rank">{index + 1}</td>
              <td>
                <Link to={`/${chart.id}`}>{chart.title}</Link>
                <p>{chart.description}</p>
              </td>
              <td className="page-category">{chart.category}</td>
              <td className="page-lines">{sizeOf(chart.id).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
