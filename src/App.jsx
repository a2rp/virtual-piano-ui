import { useCallback, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import BackToTop from "./components/backToTop";
import ConfirmModal from "./components/confirmModal";
import Controls from "./components/controls";
import CurrentNotes from "./components/currentNotes";
import Footer from "./components/footer";
import Header from "./components/header";
import Keyboard from "./components/keyboard";
import SavedNotes from "./components/savedNotes";
import TextToNotes from "./components/textToNotes";
import Toast from "./components/toast";

import {
    DEFAULT_VOLUME,
    MAX_NOTES,
    NOTE_HIGHLIGHT_DURATION,
    NOTE_PLAY_DELAY,
    PLAYABLE_KEYS,
    STORAGE_KEYS,
} from "./constants/pianoConstants";

import useLocalStorage from "./hooks/useLocalStorage";
import usePianoAudio from "./hooks/usePianoAudio";
import usePlayback from "./hooks/usePlayback";
import useTheme from "./hooks/useTheme";

import {
    areNotePatternsEqual,
    createSavedNote,
    parseNoteText,
} from "./utils/noteUtils";

import { normalizeSavedNotes, normalizeVolume } from "./utils/storageUtils";

import styles from "./App.module.scss";

const App = () => {
    const highlightTimerRef = useRef(null);

    const [pressedKey, setPressedKey] = useState("");

    const [playedNotes, setPlayedNotes] = useState([]);

    const [noteText, setNoteText] = useState("");

    const [isClearModalOpen, setIsClearModalOpen] = useState(false);

    const [savedNoteToDelete, setSavedNoteToDelete] = useState(null);

    const {
        value: savedNotes,
        setValue: setSavedNotes,
        error: savedNotesStorageError,
    } = useLocalStorage(STORAGE_KEYS.SAVED_NOTES, [], normalizeSavedNotes);

    const {
        value: volume,
        setValue: setVolume,
        error: volumeStorageError,
    } = useLocalStorage(STORAGE_KEYS.VOLUME, DEFAULT_VOLUME, normalizeVolume);

    const { theme, toggleTheme, error: themeStorageError } = useTheme();

    const { playNote: playAudioNote, stopAllAudio } = usePianoAudio({
        volume,
    });

    const clearHighlightTimer = useCallback(() => {
        if (highlightTimerRef.current) {
            window.clearTimeout(highlightTimerRef.current);

            highlightTimerRef.current = null;
        }
    }, []);

    const highlightNote = useCallback(
        (note) => {
            clearHighlightTimer();

            setPressedKey(note);

            highlightTimerRef.current = window.setTimeout(() => {
                setPressedKey("");

                highlightTimerRef.current = null;
            }, NOTE_HIGHLIGHT_DURATION);
        },
        [clearHighlightTimer],
    );

    const playKeyboardNote = useCallback(
        (note, { record = true, muted = false } = {}) => {
            const safeNote = typeof note === "string" ? note.toUpperCase() : "";

            if (!PLAYABLE_KEYS.includes(safeNote)) {
                return false;
            }

            playAudioNote(safeNote, {
                muted,
            });

            highlightNote(safeNote);

            if (record) {
                setPlayedNotes((currentNotes) => {
                    if (currentNotes.length >= MAX_NOTES) {
                        return currentNotes;
                    }

                    return [...currentNotes, safeNote];
                });
            }

            return true;
        },
        [highlightNote, playAudioNote],
    );

    const playbackPlayNote = useCallback(
        (note, { muted = false } = {}) => {
            playKeyboardNote(note, {
                record: false,
                muted,
            });
        },
        [playKeyboardNote],
    );

    const playback = usePlayback({
        playNote: playbackPlayNote,

        stopAudio: stopAllAudio,

        delay: NOTE_PLAY_DELAY,
    });

    const isAnyModalOpen = isClearModalOpen || Boolean(savedNoteToDelete);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (
                isAnyModalOpen ||
                event.repeat ||
                event.ctrlKey ||
                event.metaKey ||
                event.altKey
            ) {
                return;
            }

            const target = event.target;

            const tagName = target?.tagName;

            if (
                tagName === "INPUT" ||
                tagName === "TEXTAREA" ||
                tagName === "SELECT" ||
                target?.isContentEditable
            ) {
                return;
            }

            const note = event.key.toUpperCase();

            if (!PLAYABLE_KEYS.includes(note)) {
                return;
            }

            playKeyboardNote(note);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isAnyModalOpen, playKeyboardNote]);

    useEffect(() => {
        if (savedNotesStorageError || volumeStorageError || themeStorageError) {
            toast.error(
                "Browser storage is unavailable. Some preferences may not remain after refresh.",
            );
        }
    }, [savedNotesStorageError, themeStorageError, volumeStorageError]);

    useEffect(() => {
        return () => {
            clearHighlightTimer();

            stopAllAudio();
        };
    }, [clearHighlightTimer, stopAllAudio]);

    const handleVolumeChange = (nextVolume) => {
        setVolume(normalizeVolume(nextVolume));
    };

    const handleLoadTextNotes = () => {
        const parsedNotes = parseNoteText(noteText);

        if (parsedNotes.length === 0) {
            toast.warning("Enter valid A to Z notes first.");

            return;
        }

        playback.stopPlayback();

        setPressedKey("");

        setPlayedNotes(parsedNotes);

        toast.success(
            `${parsedNotes.length} notes loaded as the current pattern.`,
        );
    };

    const handlePlayTextNotes = () => {
        const parsedNotes = parseNoteText(noteText);

        if (parsedNotes.length === 0) {
            toast.warning("Enter valid A to Z notes first.");

            return;
        }

        playback.startPlayback(parsedNotes);
    };

    const handlePlayCurrentNotes = () => {
        if (playedNotes.length === 0) {
            toast.warning("There are no current notes to play.");

            return;
        }

        playback.startPlayback(playedNotes);
    };

    const handleSaveCurrentNotes = () => {
        if (playedNotes.length === 0) {
            toast.warning("Play or load some notes before saving.");

            return;
        }

        const duplicatePattern = savedNotes.some((savedNote) =>
            areNotePatternsEqual(savedNote.notes, playedNotes),
        );

        if (duplicatePattern) {
            toast.warning("This note pattern is already saved.");

            return;
        }

        const newSavedNote = createSavedNote(playedNotes, savedNotes);

        setSavedNotes((currentNotes) => [newSavedNote, ...currentNotes]);

        toast.success(`${newSavedNote.name} saved successfully.`);
    };

    const openClearModal = () => {
        if (playedNotes.length === 0) {
            return;
        }

        setIsClearModalOpen(true);
    };

    const closeClearModal = () => {
        setIsClearModalOpen(false);
    };

    const confirmClearNotes = () => {
        playback.stopPlayback();

        clearHighlightTimer();

        setPlayedNotes([]);
        setPressedKey("");

        setIsClearModalOpen(false);

        toast.success("Current notes cleared.");
    };

    const handleTogglePattern = (savedNote) => {
        if (playback.playingPatternId !== savedNote.id) {
            setPlayedNotes([...savedNote.notes]);
        }

        playback.togglePatternPlayback(savedNote);
    };

    const handleRestartPattern = (savedNote) => {
        setPlayedNotes([...savedNote.notes]);

        playback.restartPattern(savedNote);
    };

    const handleToggleMute = (savedNote) => {
        playback.toggleMute(savedNote.id);
    };

    const requestDeletePattern = (savedNote) => {
        setSavedNoteToDelete(savedNote);
    };

    const closeDeleteModal = () => {
        setSavedNoteToDelete(null);
    };

    const confirmDeletePattern = () => {
        if (!savedNoteToDelete) {
            return;
        }

        const { id, name } = savedNoteToDelete;

        if (playback.playingPatternId === id) {
            playback.stopPlayback();
        }

        setSavedNotes((currentNotes) =>
            currentNotes.filter((savedNote) => savedNote.id !== id),
        );

        setSavedNoteToDelete(null);

        toast.success(`${name} deleted.`);
    };

    return (
        <div className={styles.app}>
            <Header theme={theme} onToggleTheme={toggleTheme} />

            <main className={styles.main}>
                <div className={styles.intro}>
                    <div className={styles.introInner}>
                        <p className={styles.label}>
                            Interactive Music Keyboard
                        </p>

                        <h1 className={styles.title}>
                            Play music with your keyboard
                        </h1>

                        <p className={styles.description}>
                            Use A to Z, build note patterns, play typed
                            sequences, and save your favorite patterns directly
                            in the browser.
                        </p>
                    </div>
                </div>

                <Controls
                    pressedKey={pressedKey}
                    totalNotes={playedNotes.length}
                    volume={volume}
                    onVolumeChange={handleVolumeChange}
                />

                <Keyboard
                    pressedKey={pressedKey}
                    onPlayNote={(note) => playKeyboardNote(note)}
                />

                <CurrentNotes
                    notes={playedNotes}
                    onSave={handleSaveCurrentNotes}
                    onPlay={handlePlayCurrentNotes}
                    onClear={openClearModal}
                />

                <TextToNotes
                    noteText={noteText}
                    onNoteTextChange={setNoteText}
                    onLoad={handleLoadTextNotes}
                    onPlay={handlePlayTextNotes}
                    maxNotes={MAX_NOTES}
                />

                <SavedNotes
                    savedNotes={savedNotes}
                    playingPatternId={playback.playingPatternId}
                    isPlaybackPaused={playback.isPlaybackPaused}
                    isMuted={playback.isMuted}
                    activeNote={playback.activeNote}
                    activeNoteIndex={playback.activeNoteIndex}
                    onTogglePlay={handleTogglePattern}
                    onRestart={handleRestartPattern}
                    onToggleMute={handleToggleMute}
                    onDelete={requestDeletePattern}
                />
            </main>

            <Footer />

            <BackToTop />

            <ConfirmModal
                isOpen={isClearModalOpen}
                title="Clear current notes?"
                message="This will clear the current note pattern. Your separately saved patterns will remain available."
                confirmText="Clear Notes"
                cancelText="Keep Notes"
                tone="danger"
                onConfirm={confirmClearNotes}
                onCancel={closeClearModal}
            />

            <ConfirmModal
                isOpen={Boolean(savedNoteToDelete)}
                title="Delete saved pattern?"
                message={
                    savedNoteToDelete
                        ? `${savedNoteToDelete.name} will be permanently removed from your saved note patterns.`
                        : ""
                }
                confirmText="Delete Pattern"
                cancelText="Keep Pattern"
                tone="danger"
                onConfirm={confirmDeletePattern}
                onCancel={closeDeleteModal}
            />

            <Toast theme={theme} />
        </div>
    );
};

export default App;
