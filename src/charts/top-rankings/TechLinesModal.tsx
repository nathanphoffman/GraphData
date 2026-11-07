import Modal from "../../components/Modal";

const PERCENT = 100;

/** A pop-up listing a project's lines per language with each one's share. */
export function TechLinesModal({
  itemName,
  shares,
  onClose,
}: {
  itemName: string;
  shares: { language: string; lines: number; share: number }[];
  onClose: () => void;
}) {
  return (
    <Modal className="rankings-modal" onClose={onClose}>
      <h3>{itemName} · lines by language</h3>
      <table>
        <tbody>
          {shares.map(({ language, lines, share }) => (
            <tr key={language}>
              <td>{language}</td>
              <td>{lines.toLocaleString("en-US")}</td>
              <td>{(share * PERCENT).toFixed(1)}%</td>
            </tr>
          ))}

        </tbody>
      </table>
      <p className="muted">Counts only the languages rated for the n-Factor, so this can be less than the total.</p>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
}
