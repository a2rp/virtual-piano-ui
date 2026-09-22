import {
    FiClock,
    FiMusic,
    FiPause,
    FiPlay,
    FiRotateCcw,
    FiTrash2,
    FiVolume2,
    FiVolumeX,
} from "react-icons/fi";

import styles from "./styles.module.scss";

const formatDate = (value) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value || "Unknown date";
    }

    const day = String(date.getDate()).padStart(2, "0");

    const month = date.toLocaleString("en-US", {
        month: "short",
    });

    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");

    const minutes = String(date.getMinutes()).padStart(2, "0");

    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} hrs`;
};

const SavedNotes = ({
    savedNotes = [],
    playingPatternId,
    isPlaybackPaused,
    isMuted,
    activeNote,
    activeNoteIndex,
    onTogglePlay,
    onRestart,
    onToggleMute,
    onDelete,
}) => {
    return (
        <section
            id="saved-notes"
            className={styles.section}
            aria-labelledby="saved-notes-title"
        >
            <div className={styles.header}>
                <div>
                    <div className={styles.label}>
                        <FiMusic aria-hidden="true" />
                        <span>Saved Notes</span>
                    </div>

                    <h2 id="saved-notes-title" className={styles.title}>
                        Your Note Patterns
                    </h2>

                    <p className={styles.text}>
                        Play, pause, resume, restart, mute, or remove any saved
                        pattern.
                    </p>
                </div>

                <div className={styles.count}>
                    {savedNotes.length}{" "}
                    {savedNotes.length === 1 ? "Pattern" : "Patterns"}
                </div>
            </div>

            {savedNotes.length === 0 ? (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>
                        <FiMusic aria-hidden="true" />
                    </div>

                    <div>
                        <strong>No saved patterns yet</strong>

                        <p>
                            Play or load some notes, then save the current
                            pattern.
                        </p>
                    </div>
                </div>
            ) : (
                <div className={styles.list}>
                    {savedNotes.map((savedNote) => {
                        const isPlaying = playingPatternId === savedNote.id;

                        const showResume = isPlaying && isPlaybackPaused;

                        return (
                            <article
                                key={savedNote.id}
                                className={`${styles.item} ${
                                    isPlaying ? styles.playingItem : ""
                                }`}
                            >
                                <div className={styles.patternContent}>
                                    <div className={styles.patternTop}>
                                        <div className={styles.patternInfo}>
                                            <div className={styles.musicIcon}>
                                                <FiMusic aria-hidden="true" />
                                            </div>

                                            <div>
                                                <strong
                                                    className={
                                                        styles.patternName
                                                    }
                                                >
                                                    {savedNote.name}
                                                </strong>

                                                <div className={styles.date}>
                                                    <FiClock aria-hidden="true" />

                                                    <span>
                                                        {formatDate(
                                                            savedNote.createdAt,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <span className={styles.noteCount}>
                                            {savedNote.notes.length} notes
                                        </span>
                                    </div>

                                    <div className={styles.notes}>
                                        {savedNote.notes.map(
                                            (note, noteIndex) => {
                                                const isActive =
                                                    isPlaying &&
                                                    !isPlaybackPaused &&
                                                    activeNote === note &&
                                                    activeNoteIndex ===
                                                        noteIndex;

                                                return (
                                                    <span
                                                        key={`${savedNote.id}-${noteIndex}-${note}`}
                                                        className={`${styles.note} ${
                                                            isActive
                                                                ? styles.activeNote
                                                                : ""
                                                        }`}
                                                    >
                                                        {note}
                                                    </span>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <button
                                        className={styles.actionButton}
                                        type="button"
                                        onClick={() => onTogglePlay(savedNote)}
                                        title={
                                            showResume
                                                ? "Resume pattern"
                                                : isPlaying && !isPlaybackPaused
                                                  ? "Pause pattern"
                                                  : "Play pattern"
                                        }
                                    >
                                        {isPlaying && !isPlaybackPaused ? (
                                            <FiPause aria-hidden="true" />
                                        ) : (
                                            <FiPlay aria-hidden="true" />
                                        )}

                                        <span>
                                            {showResume
                                                ? "Resume"
                                                : isPlaying && !isPlaybackPaused
                                                  ? "Pause"
                                                  : "Play"}
                                        </span>
                                    </button>

                                    <button
                                        className={styles.actionButton}
                                        type="button"
                                        onClick={() => onRestart(savedNote)}
                                        title={`Restart ${savedNote.name}`}
                                    >
                                        <FiRotateCcw aria-hidden="true" />

                                        <span>Restart</span>
                                    </button>

                                    <button
                                        className={styles.actionButton}
                                        type="button"
                                        onClick={() => onToggleMute(savedNote)}
                                        disabled={!isPlaying}
                                        title={
                                            isMuted
                                                ? "Unmute playback"
                                                : "Mute playback"
                                        }
                                    >
                                        {isPlaying && isMuted ? (
                                            <FiVolumeX aria-hidden="true" />
                                        ) : (
                                            <FiVolume2 aria-hidden="true" />
                                        )}

                                        <span>
                                            {isPlaying && isMuted
                                                ? "Unmute"
                                                : "Mute"}
                                        </span>
                                    </button>

                                    <button
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        type="button"
                                        onClick={() => onDelete(savedNote)}
                                        title={`Delete ${savedNote.name}`}
                                    >
                                        <FiTrash2 aria-hidden="true" />

                                        <span>Delete</span>
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default SavedNotes;
