import { Fragment } from "react";
import { estimateScore, knownScore } from "./calculate";
import type { AllIntelligenceData, ScoredSubject, Settings } from "./types";

export type SortKey = "name" | "overall" | "measured" | string;

interface SortProps {
  sortKey: SortKey;
  ascending: boolean;
  onSort: (key: SortKey) => void;
}

interface TableProps extends SortProps {
  model: AllIntelligenceData;
  rows: ScoredSubject[];
  settings: Settings;
  open: Set<string>;
  onToggle: (name: string) => void;
}

function fmt(value: number | null | undefined): string {
  return value === null || value === undefined ? "—" : value.toFixed(1);
}

function Header({ model, sortKey, ascending, onSort }: SortProps & { model: AllIntelligenceData }) {
  const arrow = (key: SortKey) => (key === sortKey ? (ascending ? " ▲" : " ▼") : "");
  return (
    <thead>
      <tr>
        <th>#</th>
        <th className="sortable" onClick={() => onSort("name")}>Name{arrow("name")}</th>
        <th className="sortable" onClick={() => onSort("overall")}>Score{arrow("overall")}</th>
        {model.groups.map((g) => (
          <th key={g.id} className="sortable allint-group-th" onClick={() => onSort(g.id)}>{g.name.replace("& ", "&\n")}{arrow(g.id)}</th>
        ))}
        <th className="sortable" onClick={() => onSort("measured")}>Measured{arrow("measured")}</th>
      </tr>
    </thead>
  );
}

/** One column's score: the real value, a proxy from price, a guess, or "not measured". */
function ColumnScore({ model, row, settings, column }: { model: AllIntelligenceData; row: ScoredSubject; settings: Settings; column: string }) {
  const real = knownScore(row.subject, column);
  const isProxy = row.subject.scores[column] === undefined && real !== undefined;
  const guess = settings.missingMode === "estimate" ? estimateScore(model, row.subject, column) : null;
  const text = real !== undefined ? `${real.toFixed(0)}${isProxy ? " (from price)" : ""}` : guess !== null ? `~${guess.toFixed(0)} (guess)` : "not measured";
  return (
    <span>
      {model.columns[column]}: <strong>{text}</strong>
    </span>
  );
}

function DetailRow({ model, row, settings }: { model: AllIntelligenceData; row: ScoredSubject; settings: Settings }) {
  return (
    <tr className="allint-detail">
      <td colSpan={4 + model.groups.length}>
        <div className="allint-detail-grid">
          {model.groups.map((g) => (
            <div key={g.id} className="allint-detail-group">
              <h4>{g.name}</h4>
              {g.columns.map((key) => <ColumnScore key={key} model={model} row={row} settings={settings} column={key} />)}
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
}

function SubjectRow({ model, row, index, onToggle }: { model: AllIntelligenceData; row: ScoredSubject; index: number; onToggle: (name: string) => void }) {
  const { name, kind, maker } = row.subject;
  return (
    <tr className={`allint-row allint-${kind}`} onClick={() => onToggle(name)}>
      <td>{index + 1}</td>
      <td className="allint-name">{name} <span className="allint-maker">{maker}</span></td>
      <td className="allint-score">{fmt(row.overall)}</td>
      {model.groups.map((g) => <td key={g.id}>{fmt(row.groups[g.id])}</td>)}
      <td>{row.measured}/{Object.keys(model.columns).length}</td>
    </tr>
  );
}

export function ResultsTable({ model, rows, settings, open, onToggle, ...sort }: TableProps) {
  return (
    <div className="panel calc-table">
      <table>
        <Header model={model} {...sort} />
        <tbody>
          {rows.map((row, i) => (
            <Fragment key={row.subject.name}>
              <SubjectRow model={model} row={row} index={i} onToggle={onToggle} />
              {open.has(row.subject.name) && <DetailRow model={model} row={row} settings={settings} />}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
