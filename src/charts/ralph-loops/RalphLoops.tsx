import { AuthGate } from "../../auth/AuthGate";
import { useAuth } from "../../auth/useAuth";
import "./styles.css";
import LoopView from "./parts/LoopView";
import { useLoops } from "./state/useLoops";

/** Shows every loop that has reported in: state, round, items per area, and a filterable timeline of log lines and commits. */
function Loops() {
  const { loops, error, stopped } = useLoops();

  if (!loops) return error ? <p>Could not load RalphLoops: {error}</p> : <p>Loading…</p>;

  return (
    <>
      {error && <p>Could not refresh: {error}</p>}
      {stopped && <p className="muted">Live updates stopped after an hour. Refresh the page to start them again.</p>}
      {!loops.length && <p className="muted">No loop has reported yet.</p>}
      {loops.map((loop) => (
        <LoopView key={loop.name} loop={loop} />
      ))}
    </>
  );
}

/** Only visible once logged in; the server refuses the data otherwise too. */
export default function RalphLoops() {
  const auth = useAuth();

  return <AuthGate auth={auth}>{() => <Loops />}</AuthGate>;
}
