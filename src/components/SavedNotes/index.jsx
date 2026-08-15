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

const SavedNotes = ({
    savedNotes,
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
        <section className={styles.section}>
            <div className={styles.header}>
                <div>
                    <div className={styles.label}>
                        <FiMusic />
                        <span>Saved Notes</span>
                    </div>

                    <h2 className={styles.title}>Your Note Patterns</h2>

                    <p className={styles.text}>
                        Play, pause, restart, mute, resume, or remove any saved
                        note pattern.
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
                        <FiMusic />
                    </div>

                    <div>
                        <strong>No saved patterns yet</strong>

                        <p>
                            Play or enter some notes and use the Save Notes
                            button beside your current pattern.
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
                                                <FiMusic />
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
                                                    <FiClock />

                                                    <span>
                                                        {savedNote.createdAt}
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
                                                const isActiveNote =
                                                    isPlaying &&
                                                    !isPlaybackPaused &&
                                                    activeNote === note &&
                                                    activeNoteIndex ===
                                                        noteIndex;

                                                return (
                                                    <span
                                                        key={`${savedNote.id}-${noteIndex}-${note}`}
                                                        className={`${styles.note} ${
                                                            isActiveNote
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
                                        className={`${styles.actionButton} ${styles.playButton}`}
                                        type="button"
                                        onClick={() => onTogglePlay(savedNote)}
                                        title={
                                            showResume
                                                ? "Resume pattern"
                                                : isPlaying
                                                  ? "Pause pattern"
                                                  : "Play pattern"
                                        }
                                    >
                                        {isPlaying && !isPlaybackPaused ? (
                                            <FiPause />
                                        ) : (
                                            <FiPlay />
                                        )}

                                        <span>
                                            {showResume
                                                ? "Resume"
                                                : isPlaying
                                                  ? "Pause"
                                                  : "Play"}
                                        </span>
                                    </button>

                                    <button
                                        className={`${styles.actionButton} ${styles.restartButton}`}
                                        type="button"
                                        onClick={() => onRestart(savedNote)}
                                        title={`Restart ${savedNote.name}`}
                                    >
                                        <FiRotateCcw />
                                        <span>Restart</span>
                                    </button>

                                    <button
                                        className={`${styles.actionButton} ${styles.muteButton}`}
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
                                            <FiVolumeX />
                                        ) : (
                                            <FiVolume2 />
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
                                        <FiTrash2 />
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
