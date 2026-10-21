import { useEffect } from "react";
import { hasPreview } from "./TargetPreview";
import { formatHour, SEASONS, WINDOW_HOURS, type Schedule, type ScheduleItem, type ScheduleLevel } from "../model/calculate";

const LEVELS: { level: ScheduleLevel; label: string; hue: number }[] = [
  { level: "easy", label: "Easy", hue: 140 },
  { level: "moderate", label: "Moderate", hue: 50 },
  { level: "hard", label: "Hard", hue: 0 },
];

type OnHover = (hover: { id: string; x: number; y: number } | null) => void;

function Item({ item, onHover }: { item: ScheduleItem; onHover: OnHover }) {
  const t = item.row.target;
  const preview = hasPreview(t.id);
  return (
    <li
      onMouseMove={preview ? (e) => onHover({ id: t.id, x: e.clientX, y: e.clientY }) : undefined}
      onMouseLeave={preview ? () => onHover(null) : undefined}
    >
      <strong>{t.id}</strong>
      {t.nickname && <span> {t.nickname}</span>}
      <span className="astro-nick"> · {t.type} · score {item.row.score.toFixed(0)} · best {formatHour(item.row.bestHour ?? 0)} · up {formatHour(item.up[0])}–{formatHour(item.up[1])}</span>
    </li>
  );
}

export function ScheduleModal({ schedule, onClose, onHover }: { schedule: Schedule; onClose: () => void; onHover: OnHover }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="astro-modal-backdrop" onClick={onClose}>
      <div className="astro-modal" role="dialog" aria-modal="true" aria-label="Observing schedule" onClick={(e) => e.stopPropagation()}>
        <div className="astro-modal-head">
          <h2>{SEASONS[schedule.season].label.split(" ")[0]} night schedule</h2>
          <button type="button" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <p className="astro-note">Each object is listed in the two-hour window containing the hour it is best placed (local solar time), best score first. Times after "up" are when it is above 25° in the dark.</p>
        {schedule.slots.length === 0 && <p>Nothing scores well enough for this season with your settings.</p>}
        {schedule.slots.map((slot) => (
          <section key={slot.hour} className="astro-slot">
            <h3>{formatHour(slot.hour)} – {formatHour((slot.hour + WINDOW_HOURS) % 24)}</h3>
            {LEVELS.filter((l) => slot.items[l.level].length > 0).map((l) => (
              <div key={l.level}>
                <span className="astro-tag" style={{ "--tag": `hsl(${l.hue} 70% 45%)` } as React.CSSProperties}>{l.label}</span>
                <ul>{slot.items[l.level].map((item) => <Item key={item.row.target.id} item={item} onHover={onHover} />)}</ul>
              </div>
            ))}
            {slot.more > 0 && <small className="astro-nick">+{slot.more} more in this window</small>}
          </section>
        ))}
        {schedule.reach && (
          <section className="astro-slot">
            <h3>Reach</h3>
            <p className="astro-note">One very hard object for the adventurous, picked at random (best around {formatHour(schedule.reach.row.bestHour ?? 0)}).</p>
            <ul><Item item={schedule.reach} onHover={onHover} /></ul>
          </section>
        )}
        {schedule.stars.length > 0 && (
          <section className="astro-slot">
            <h3>Notable stars out</h3>
            <p>
              {schedule.stars.map((r, i) => (
                <span
                  key={r.target.id}
                  onMouseMove={hasPreview(r.target.id) ? (e) => onHover({ id: r.target.id, x: e.clientX, y: e.clientY }) : undefined}
                  onMouseLeave={hasPreview(r.target.id) ? () => onHover(null) : undefined}
                >
                  {r.target.id}{i < schedule.stars.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
