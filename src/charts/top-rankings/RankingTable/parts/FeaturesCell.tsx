import type { Item } from "../../score/ranking_types";

interface Props {
  item: Item;
  canEdit: boolean;
  onOpen: (item: Item) => void;
}

/** The number of planned features for an item; when you can edit, it is a button that opens the pop-up to change them. */
export default function FeaturesCell({ item, canEdit, onOpen }: Props) {
  const count = item.features?.length ?? 0;

  return (
    <td>
      {canEdit ? (
        <button
          type="button"
          className="rankings-features"
          title={`Edit ${item.name}'s planned features`}
          onClick={() => onOpen(item)}
        >
          {count}
        </button>
      ) : (
        count
      )}
    </td>
  );
}
