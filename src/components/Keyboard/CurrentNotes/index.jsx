import { FiMusic, FiPlay, FiSave, FiTrash2 } from "react-icons/fi";

import styles from "./styles.module.scss";

const CurrentNotes = ({
    playedNotesText,
    totalNotes,
    onSaveNotes,
    onPlayCurrentNotes,
    onClearCurrentNotes,
}) => {
    const hasNotes = totalNotes > 0;

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.label}>
                    <FiMusic />
                    <span>Current Note Pattern</span>
                </div>

                <div className={styles.notes}>
                    {playedNotesText || "Played notes will appear here..."}
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    className={`${styles.button} ${styles.saveButton}`}
                    type="button"
                    onClick={onSaveNotes}
                    disabled={!hasNotes}
                >
                    <FiSave />
                    <span>Save Notes</span>
                </button>

                <button
                    className={`${styles.button} ${styles.playButton}`}
                    type="button"
                    onClick={onPlayCurrentNotes}
                    disabled={!hasNotes}
                >
                    <FiPlay />
                    <span>Play Notes</span>
                </button>

                <button
                    className={`${styles.button} ${styles.clearButton}`}
                    type="button"
                    onClick={onClearCurrentNotes}
                    disabled={!hasNotes}
                >
                    <FiTrash2 />
                    <span>Clear Notes</span>
                </button>
            </div>
        </div>
    );
};

export default CurrentNotes;
