import { useRef } from "react";

export default function Credits() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="bestiary-banner" role="note">
        <strong>Heads up: this bestiary is made with AI.</strong> AI, especially AI art, is controversial in the RPG
        community. The contributors of Tiny Mighty RPG had nothing to do with this project and do not endorse it.
        The original Tiny Mighty RPG was made entirely by humans. This bestiary is an
        adaptation of Tiny Mighty RPG and contains changes to the original: its creature stats and artwork were generated
        with AI. This project is by Nathan Hoffman, the original author
        of Tiny Mighty, who has not profited and will not profit from this bestiary. It is just for fun and free, and is released under{" "}
        <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noreferrer">
          CC0
        </a>{" "}
        (no attribution needed), except for material from Tiny Mighty RPG, which still needs its attribution where
        applicable. For its attribution, click:{" "}
        <button type="button" className="bestiary-credits-link" onClick={() => dialog.current?.showModal()}>
          Tiny Mighty Attribution Credit
        </button>
      </div>
      <dialog
        ref={dialog}
        className="bestiary-credits"
        aria-labelledby="bestiary-credits-title"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <h2 id="bestiary-credits-title">Tiny Mighty Attribution Credit</h2>
        <p>The original Tiny Mighty RPG was made entirely by humans, this bestiary was not, and <strong>the contributors listed below had no part in making it</strong>. This was exclusively a project of Nathan Hoffman, the original author of the game.</p>
        <h3>Original Human Tiny Mighty RPG Attribution:</h3>
        <p>
          Author: Nathan Hoffman
          <br />
          Contributors: Tim McDermott (+ original ideas), Kim Chan (+ art), John Gurski, John Vitale, Sarah O’Brien
        </p>
        <p>
          License:{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
            CC BY 4.0
          </a>{" "}
          (except the art).
        </p>
        <p>
          For the original human product:{" "}
          <a href="https://tinymightyrpg.com" target="_blank" rel="noreferrer">
            tinymightyrpg.com
          </a>
        </p>
        <p>
          The original art, as found there, was made by Kim Chan, who holds the copyright to the art therein. If you want to support human art, support her.
        </p>
        <button type="button" className="bestiary-credits-close" onClick={() => dialog.current?.close()}>
          Close
        </button>
      </dialog>
    </>
  );
}
