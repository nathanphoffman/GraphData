import type { ReactNode } from "react";
import { band, deltaBand, healthBand, type Rgb, rgbCss } from "../../../model/bands";
import type { WeightRow } from "../../../model/rows";
import type { Format } from "../../../model/units";
import type { Column } from "../model/columns";
import { formatter } from "../model/formatter";

type BandOf = (pounds: number | null, adjusted: boolean) => Rgb | null;

/** A value on its band colour (plain text when it has no colour); muted when it is the muscle-adjusted one. */
function Banded({ color, muted = false, children }: { color: Rgb | null; muted?: boolean; children: ReactNode }) {
  const classes = [color ? "band" : "", muted ? "adjusted" : ""].join(" ").trim();

  return (
    <span className={classes} style={color ? { background: rgbCss(color) } : undefined}>
      {children}
    </span>
  );
}

/** Actual value on top, muscle-adjusted value underneath, each highlighted by its target band. */
function ActualAndAdjusted({
  actual,
  adjusted,
  fmt: formatWeight,
  bandOf = band,
}: {
  actual: number | null;
  adjusted: number | null;
  fmt: (pounds: number) => string;
  bandOf?: BandOf;
}) {
  const show = (value: number | null) => (value === null ? "—" : formatWeight(value));

  return (
    <>
      <Banded color={bandOf(actual, false)}>{show(actual)}</Banded>
      <br />
      <Banded color={bandOf(adjusted, true)} muted>
        {show(adjusted)}
      </Banded>
    </>
  );
}

/** A blood pressure or Health value: a dash when there is none, and estimated blood pressure in muted italics. */
function OptionalCell({ column, d: tableRow, fmt }: { column: Column; d: WeightRow; fmt: (value: number) => string }) {
  const value = column.actual(tableRow);

  if (value === null) return <>—</>;

  if (column.kind === "health") return <Banded color={healthBand(value)}>{fmt(value)}</Banded>;

  return <span className={tableRow.pressure?.pressureEstimated ? "estimated-value" : ""}>{fmt(value)}</span>;
}

/** One cell: actual value with the muscle-adjusted one under it when the column has one. */
export function Cell({ column, d: tableRow, f: unitFormat }: { column: Column; d: WeightRow; f: Format }) {
  const formatWeight = formatter(column.kind, unitFormat);

  if (column.kind === "pressure" || column.kind === "health")

    return <OptionalCell column={column} d={tableRow} fmt={formatWeight} />;

  if (column.adjusted)

    return (
      <ActualAndAdjusted
        actual={column.actual(tableRow)}
        adjusted={column.adjusted(tableRow)}
        fmt={formatWeight}
        bandOf={column.kind === "change" ? deltaBand : band}
      />
    );

  if (column.kind === "weight")

    return <Banded color={band(tableRow.weight, false)}>{formatWeight(tableRow.weight)}</Banded>;

  return <>{formatWeight(column.actual(tableRow) ?? 0)}</>;
}
