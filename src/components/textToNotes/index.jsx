import { FiEdit3, FiMusic, FiPlay } from "react-icons/fi";

import styles from "./styles.module.scss";

const TextToNotes = ({
    noteText,
    onNoteTextChange,
    onLoad,
    onPlay,
    maxNotes = 500,
}) => {
    const validNoteCount = (noteText.toUpperCase().match(/[A-Z]/g) || [])
        .length;

    const hasText = noteText.trim().length > 0;

    return (
        <section
            id="text-notes"
            className={styles.section}
            aria-labelledby="text-notes-title"
        >
            <div className={styles.header}>
                <div>
                    <div className={styles.label}>
                        <FiEdit3 aria-hidden="true" />
                        <span>Text to Notes</span>
                    </div>

                    <h2 id="text-notes-title" className={styles.title}>
                        Type or Paste Key Notes
                    </h2>
                </div>

                <span className={styles.count}>
                    {Math.min(validNoteCount, maxNotes)}/{maxNotes} notes
                </span>
            </div>

            <p className={styles.description}>
                Enter A to Z letters with or without spaces. Load them as your
                current pattern or play the sequence immediately.
            </p>

            <textarea
                className={styles.input}
                value={noteText}
                onChange={(event) => onNoteTextChange(event.target.value)}
                placeholder="Example: E E F G G F E D C C D E E D D"
                spellCheck="false"
                rows="5"
                aria-label="Text note pattern"
            />

            <div className={styles.footer}>
                <div className={styles.hint}>
                    <FiMusic aria-hidden="true" />

                    <span>
                        Only A to Z letters are converted into playable notes.
                    </span>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.button}
                        type="button"
                        onClick={onLoad}
                        disabled={!hasText}
                    >
                        <FiMusic aria-hidden="true" />
                        <span>Use as Current Notes</span>
                    </button>

                    <button
                        className={styles.button}
                        type="button"
                        onClick={onPlay}
                        disabled={!hasText}
                    >
                        <FiPlay aria-hidden="true" />
                        <span>Play Notes</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TextToNotes;
