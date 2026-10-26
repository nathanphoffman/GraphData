import { Fragment } from "react";
import { estimateScore, knownScore } from "./calculate";
import { NAME_KEY } from "../../useSort";
import { MEASURED_KEY, OVERALL_KEY, type AllIntelligenceData, type ScoredSubject, type Settings } from "./types";

/** Columns in the table besides the groups: the expander, name, and so on. */
const FIXED_COLUMNS = 4;

export type SortKey = "name" | "overall" | "measured" | string;

interface SortProps {
  sortKey: SortKey;
  ascending: boolean;
  onSort: (sortKey: SortKey) => void;
}

interface TableProps extends SortProps {
  model: AllIntelligenceData;
  rows: ScoredSubject[];
  settings: Settings;
  open: Set<string>;
  onToggle: (name: string) => void;
}

/** Format a score as a whole number, or a dash when it is missing. */
function formatScore(value: number | null | undefined): string {
  return value === null || value === undefined ? "—" : value.toFixed(1);
}

/** Table header with one sortable column per group of scores. */
function Header({ model, sortKey, ascending, onSort }: SortProps & { model: AllIntelligenceData }) {
  // Show an arrow on the sorted column only: up when ascending, down when descending, nothing on the others.
  const arrow = (columnKey: SortKey) => (columnKey === sortKey ? (ascending ? " ▲" : " ▼") : "");

  return (
    <thead>
      <tr>
        <th>#</th>
        <th className="sortable" onClick={() => onSort(NAME_KEY)}>Name{arrow(NAME_KEY)}</th>
        <th className="sortable" onClick={() => onSort(OVERALL_KEY)}>Score{arrow(OVERALL_KEY)}</th>
        {model.groups.map((group) => ( // One sortable header cell per group of columns.
          <th key={group.id} className="sortable allint-group-th" onClick={() => onSort(group.id)}>{group.name.replace("& ", "&\n")}{arrow(group.id)}</th>
        ))}

        <th className="sortable" onClick={() => onSort(MEASURED_KEY)}>Measured{arrow(MEASURED_KEY)}</th>
      </tr>
    </thead>
  );
}

/** One column's score: the real value, a proxy from price, a guess, or "not measured". */
function ColumnScore({ model, row: subjectRow, settings, column }: { model: AllIntelligenceData; row: ScoredSubject; settings: Settings; column: string }) {
  const real = knownScore(subjectRow.subject, column);
  const isProxy = subjectRow.subject.scores[column] === undefined && real !== undefined;
  const guess = settings.missingMode === "estimate" ? estimateScore(model, subjectRow.subject, column) : null;

  // Show the real score if there is one, else the estimate marked with "~", else "not measured".
  const text = real !== undefined ? `${real.toFixed(0)}${isProxy ? " (from price)" : ""}` : guess !== null ? `~${guess.toFixed(0)} (guess)` : "not measured";

  return (
    <span>
      {model.columns[column]}: <strong>{text}</strong>
    </span>
  );
}

/** Expanded view of a subject showing each underlying score. */
function DetailRow({ model, row: subjectRow, settings }: { model: AllIntelligenceData; row: ScoredSubject; settings: Settings }) {
  return (
    <tr className="allint-detail">
      <td colSpan={FIXED_COLUMNS + model.groups.length}>
        <div className="allint-detail-grid">
          {model.groups.map((group) => ( // One block of detail per group, shown when the row is expanded.
            <div key={group.id} className="allint-detail-group">
              <h4>{group.name}</h4>
              {group.columns.map((columnKey) => <ColumnScore key={columnKey} model={model} row={subjectRow} settings={settings} column={columnKey} />)}
            </div>
          ))}

        </div>
      </td>
    </tr>
  );
}

/** Summary row for one subject; clicking it opens the detail row. */
function SubjectRow({ model, row: subjectRow, index, onToggle }: { model: AllIntelligenceData; row: ScoredSubject; index: number; onToggle: (name: string) => void }) {
  const { name, kind, maker } = subjectRow.subject;

  return (
    <tr className={`allint-row allint-${kind}`} onClick={() => onToggle(name)}>
      <td>{index + 1}</td>
      <td className="allint-name">{name} <span className="allint-maker">{maker}</span></td>
      <td className="allint-score">{formatScore(subjectRow.overall)}</td>
      {model.groups.map((group) => <td key={group.id}>{formatScore(subjectRow.groups[group.id])}</td>)}
      <td>{subjectRow.measured}/{Object.keys(model.columns).length}</td> {/* How many columns were measured out of all of them. */}
    </tr>
  );
}

/** Table of all subjects with sortable columns and expandable detail rows. */
export function ResultsTable({ model, rows, settings, open, onToggle, ...sort }: TableProps) {
  return (
    <div className="panel calc-table">
      <table>
        <Header model={model} {...sort} />
        <tbody>
          {/* One summary row per subject, followed by its detail row when open. */}
          {rows.map((scoredSubject, rowIndex) => (
            <Fragment key={scoredSubject.subject.name}>
              <SubjectRow model={model} row={scoredSubject} index={rowIndex} onToggle={onToggle} />
              {open.has(scoredSubject.subject.name) && <DetailRow model={model} row={scoredSubject} settings={settings} />}
            </Fragment>
          ))}

        </tbody>
      </table>
    </div>
  );
}
