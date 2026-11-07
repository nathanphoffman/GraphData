interface Props {
  views: Record<string, string>;
  categories: string[];
}

/** Views are grouped under their category so a long list stays scannable. */
export default function ViewsList({ views, categories }: Props) {
  return (
    <dl className="views-list">
      {/* One heading per category of views. */}
      {categories.map((category) => (
        <div key={category}>
          <dt>{category}</dt>
          <dd>{views[category]}</dd>
        </div>
      ))}
    </dl>
  );
}
