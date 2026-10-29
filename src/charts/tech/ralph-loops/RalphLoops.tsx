import { useEffect, useState } from "react";
import { callApi } from "../../../api";
import { AuthGate } from "../../../auth/AuthGate";
import { useAuth } from "../../../auth/useAuth";

interface Area { name: string; done: number; open: number; blocked: number }
interface LoopEvent { at: number; kind: string; message: string }
interface Loop { name: string; state: string; round: number; areas: Area[]; updatedAt: number; events: LoopEvent[] }

const time = (ms: number) => new Date(ms).toLocaleString("sv");

/** Shows every loop that has reported in: state, round, items per area and the newest events. */
function Loops() {
  const [loops, setLoops] = useState<Loop[] | null>(null);
  const [error, setError] = useState("");

  // Load when the page opens, then refresh every 30 seconds.
  useEffect(() => {
    const load = () => callApi<{ projects: Loop[] }>("/api/ralph").then((data) => setLoops(data.projects)).catch((problem: Error) => setError(problem.message));
    load();
    const timer = setInterval(load, 30_000);
    return () => clearInterval(timer);
  }, []);

  if (error) return <p>Could not load RalphLoops: {error}</p>;

  if (!loops) return <p>Loading…</p>;

  if (!loops.length) return <p className="muted">No loop has reported yet.</p>;

  return (
    <>
      {loops.map((loop) => (
        <section key={loop.name}>
          <h2>{loop.name}</h2>
          <p>State: <strong>{loop.state}</strong>, round {loop.round}. <span className="muted">Last report {time(loop.updatedAt)}</span></p>
          <table>
            <thead><tr><th>Area</th><th>Done</th><th>Open</th><th>Blocked</th></tr></thead>
            <tbody>
              {loop.areas.map((area) => (
                <tr key={area.name}><td>{area.name}</td><td>{area.done}</td><td>{area.open}</td><td>{area.blocked}</td></tr>
              ))}
            </tbody>
          </table>
          <h3>Recent events</h3>
          <ul>
            {loop.events.map((event) => (
              <li key={`${event.at}-${event.message}`}><span className="muted">{time(event.at)}</span> [{event.kind}] {event.message}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

/** Only visible once logged in; the server refuses the data otherwise too. */
export default function RalphLoops() {
  const auth = useAuth();

  return <AuthGate auth={auth}>{() => <Loops />}</AuthGate>;
}
