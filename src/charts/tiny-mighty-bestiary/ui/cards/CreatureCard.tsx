import CreatureArt from "../../art/core/CreatureArt";
import DifficultyDots from "./DifficultyDots";
import { difficultyOf, model, tierFor } from "../../model/data";
import type { Creature, Tier } from "../../model/types";

function sign(n: number) {
  return n >= 0 ? `+${n}` : `${n}`;
}

function StatBlock({ tier }: { tier: Tier }) {
  const stats: [string, string | number][] = [
    ["Health", tier.health],
    ["Defense", tier.defense],
    ["Bonus", sign(tier.bonus)],
    ["Turns", tier.turns],
  ];
  return (
    <dl className="bestiary-stats">
      {stats.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SkillList({ creature }: { creature: Creature }) {
  return (
    <p>
      <strong>Skills:</strong>{" "}
      {creature.skills.map((s, i) => (
        <span key={s.skill}>
          {i > 0 && ", "}
          {s.skill}
          <span className={s.mod === "+" ? "bestiary-adv" : "bestiary-dis"}>{s.mod === "+" ? "+" : "−"}</span>
          {s.note && ` (${s.note})`}
        </span>
      ))}
      {creature.skillNote && `. ${creature.skillNote}`}
    </p>
  );
}

function PowerList({ creature }: { creature: Creature }) {
  return (
    <>
      {creature.powers.map((power) => (
        <p key={power.name} className="bestiary-power">
          <strong>{power.name}</strong> ({model.powerTypes[power.type].label}, {power.uses} use
          {power.uses === 1 ? "" : "s"}): {power.text}
        </p>
      ))}
    </>
  );
}

export default function CreatureCard({ creature }: { creature: Creature }) {
  const tier = tierFor(creature);

  return (
    <article className={`bestiary-card bestiary-type-${creature.type}`}>
      <header className="bestiary-head">
        <h2>{creature.name}</h2>
        <DifficultyDots value={difficultyOf(creature)} />
      </header>
      <CreatureArt id={creature.id} />
      <p className="bestiary-desc">{creature.description}</p>
      <p className="bestiary-tone">
        Tone: <strong>{model.toneScale[creature.tone - 1]}</strong>
      </p>
      <StatBlock tier={tier} />
      <p>
        <strong>Attack:</strong> {creature.attack}
      </p>
      <SkillList creature={creature} />
      {creature.flying && (
        <p>
          <strong>Flying.</strong> Costs 1 extra use if a player summons or becomes this creature.
        </p>
      )}
      <PowerList creature={creature} />
      {tier.extended && <p className="bestiary-extended">Stats extended past the printed combat table.</p>}
      <p className="bestiary-tactics">
        <strong>Tactics:</strong> {creature.tactics}
      </p>
    </article>
  );
}
