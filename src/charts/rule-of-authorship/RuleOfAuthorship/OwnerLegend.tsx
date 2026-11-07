import { OWNER_LABELS } from "../style";
import type { Owner } from "../types";
import { Pill } from "./TextPieces";

/** The colour key: one pill for each kind of owner. */
export default function OwnerLegend() {
  return (
    <div className="auth-legend">
      {/* One colour key per kind of owner. */}
      {(Object.keys(OWNER_LABELS) as Owner[]).map((owner) => (
        <Pill key={owner} owner={owner}>
          {OWNER_LABELS[owner]}
        </Pill>
      ))}
    </div>
  );
}
