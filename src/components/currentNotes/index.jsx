import { FiMusic, FiPlay, FiSave, FiTrash2 } from "react-icons/fi";

import styles from "./styles.module.scss";

const CurrentNotes = ({ notes = [], onSave, onPlay, onClear }) => {
    const hasNotes = notes.length > 0;

    return (
        <section
            className={styles.wrapper}
            aria-labelledby="current-notes-title"
        >
            <div className={styles.header}>
                <div>
                    <div className={styles.label}>
                        <FiMusic aria-hidden="true" />
                        <span>Current Pattern</span>
                    </div>

                    <h2 id="current-notes-title" className={styles.title}>
                        Played Notes
                    </h2>
                </div>

                <span className={styles.count}>
                    {notes.length} {notes.length === 1 ? "note" : "notes"}
                </span>
            </div>

            <div className={styles.notes} aria-live="polite">
                {hasNotes ? (
                    notes.map((note, index) => (
                        <span key={`${note}-${index}`} className={styles.note}>
                            {note}
                        </span>
                    ))
                ) : (
                    <p className={styles.emptyText}>
                        Play A to Z keys or load a text pattern to start
                        building your current notes.
                    </p>
                )}
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.button}
                    type="button"
                    onClick={onSave}
                    disabled={!hasNotes}
                >
                    <FiSave aria-hidden="true" />
                    <span>Save Notes</span>
                </button>

                <button
                    className={styles.button}
                    type="button"
                    onClick={onPlay}
                    disabled={!hasNotes}
                >
                    <FiPlay aria-hidden="true" />
                    <span>Play Notes</span>
                </button>

                <button
                    className={`${styles.button} ${styles.dangerButton}`}
                    type="button"
                    onClick={onClear}
                    disabled={!hasNotes}
                >
                    <FiTrash2 aria-hidden="true" />
                    <span>Clear Notes</span>
                </button>
            </div>
        </section>
    );
};

export default CurrentNotes;
