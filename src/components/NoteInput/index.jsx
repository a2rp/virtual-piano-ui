import { FiEdit3, FiMusic, FiPlay } from "react-icons/fi";

import styles from "./styles.module.scss";

const NoteInput = ({ noteText, onNoteTextChange, onPlay, onLoad }) => {
    const hasText = noteText.trim().length > 0;

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.heading}>
                    <div className={styles.icon}>
                        <FiEdit3 />
                    </div>

                    <div>
                        <span className={styles.label}>Text to Notes</span>

                        <h2 className={styles.title}>
                            Type or Paste Key Notes
                        </h2>
                    </div>
                </div>

                <p className={styles.description}>
                    Enter A to Z keys separated by spaces. You can load the
                    pattern into the keyboard or play it instantly.
                </p>
            </div>

            <textarea
                className={styles.input}
                value={noteText}
                onChange={(event) => onNoteTextChange(event.target.value)}
                placeholder="Example: E E F G G F E D C C D E E D D"
                spellCheck="false"
                rows="4"
            />

            <div className={styles.footer}>
                <div className={styles.hint}>
                    <FiMusic />
                    <span>Only A-Z keys are used as playable notes.</span>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.loadButton}
                        type="button"
                        onClick={onLoad}
                        disabled={!hasText}
                    >
                        <FiMusic />
                        <span>Use as Current Notes</span>
                    </button>

                    <button
                        className={styles.playButton}
                        type="button"
                        onClick={onPlay}
                        disabled={!hasText}
                    >
                        <FiPlay />
                        <span>Play Notes</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NoteInput;
