import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import styles from "./styles.module.scss";

import AudioBank from "./components/AudioBank";
import ConfirmModal from "./components/ConfirmModal";
import Controls from "./components/Controls";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import NoteInput from "./components/NoteInput";
import Notifications from "./components/Notifications";
import SavedNotes from "./components/SavedNotes";

import { PLAYABLE_KEYS } from "./data/notes";
import { playAudioNote } from "./utils/audioPlayer";
import {
    createSavedNote,
    getSavedNotes,
    storeSavedNotes,
} from "./utils/savedNotesStorage";

const NOTE_PLAY_DELAY = 360;

function App() {
    const audioRefs = useRef({});

    const highlightTimerRef = useRef(null);
    const textPlaybackTimersRef = useRef([]);

    const savedPlaybackTimerRef = useRef(null);
    const savedPlaybackNotesRef = useRef([]);
    const savedPlaybackIndexRef = useRef(0);
    const playbackPausedRef = useRef(false);
    const playbackMutedRef = useRef(false);

    const [pressedKey, setPressedKey] = useState("");
    const [playedNotes, setPlayedNotes] = useState([]);
    const [noteText, setNoteText] = useState("");
    const [savedNotes, setSavedNotes] = useState(() => getSavedNotes());

    const [volume, setVolume] = useState(75);

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("virtual-piano-theme");

        return savedTheme || "dark";
    });

    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [savedNoteToDelete, setSavedNoteToDelete] = useState(null);

    const [playingPatternId, setPlayingPatternId] = useState(null);
    const [isPlaybackPaused, setIsPlaybackPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const [activeNote, setActiveNote] = useState("");
    const [activeNoteIndex, setActiveNoteIndex] = useState(-1);

    const playedNotesText = useMemo(() => {
        return playedNotes.join(" ");
    }, [playedNotes]);

    const clearTextPlaybackTimers = useCallback(() => {
        textPlaybackTimersRef.current.forEach((timerId) => {
            window.clearTimeout(timerId);
        });

        textPlaybackTimersRef.current = [];
    }, []);

    const clearHighlightTimer = useCallback(() => {
        if (highlightTimerRef.current) {
            window.clearTimeout(highlightTimerRef.current);
            highlightTimerRef.current = null;
        }
    }, []);

    const clearSavedPlaybackTimer = useCallback(() => {
        if (savedPlaybackTimerRef.current) {
            window.clearTimeout(savedPlaybackTimerRef.current);
            savedPlaybackTimerRef.current = null;
        }
    }, []);

    const stopAllAudio = useCallback(() => {
        Object.values(audioRefs.current).forEach((audio) => {
            if (!audio) {
                return;
            }

            audio.pause();
            audio.currentTime = 0;
        });
    }, []);

    const setAudioMuted = useCallback((muted) => {
        Object.values(audioRefs.current).forEach((audio) => {
            if (!audio) {
                return;
            }

            audio.muted = muted;
        });
    }, []);

    const resetSavedPlayback = useCallback(
        (stopAudio = true) => {
            clearSavedPlaybackTimer();

            if (stopAudio) {
                stopAllAudio();
            }

            setAudioMuted(false);

            savedPlaybackNotesRef.current = [];
            savedPlaybackIndexRef.current = 0;

            playbackPausedRef.current = false;
            playbackMutedRef.current = false;

            setPlayingPatternId(null);
            setIsPlaybackPaused(false);
            setIsMuted(false);
            setPressedKey("");

            setActiveNote("");
            setActiveNoteIndex(-1);
        },
        [clearSavedPlaybackTimer, setAudioMuted, stopAllAudio],
    );

    const highlightNote = useCallback(
        (note) => {
            clearHighlightTimer();

            setPressedKey(note);

            highlightTimerRef.current = window.setTimeout(() => {
                setPressedKey("");
                highlightTimerRef.current = null;
            }, 220);
        },
        [clearHighlightTimer],
    );

    const playKeyboardNote = useCallback(
        (note, shouldSaveNote = true) => {
            const safeNote = note.toUpperCase();

            if (!PLAYABLE_KEYS.includes(safeNote)) {
                return;
            }

            const audio = audioRefs.current[safeNote];

            playAudioNote({
                audioElement: audio,
                volume,
            });

            highlightNote(safeNote);

            if (shouldSaveNote) {
                setPlayedNotes((currentNotes) => [...currentNotes, safeNote]);
            }
        },
        [highlightNote, volume],
    );

    const startSavedPlaybackRunner = useCallback(() => {
        const runNextNote = () => {
            if (playbackPausedRef.current) {
                return;
            }

            const notes = savedPlaybackNotesRef.current;
            const currentIndex = savedPlaybackIndexRef.current;

            if (currentIndex >= notes.length) {
                clearSavedPlaybackTimer();

                setAudioMuted(false);

                playbackMutedRef.current = false;
                playbackPausedRef.current = false;

                savedPlaybackIndexRef.current = 0;
                savedPlaybackNotesRef.current = [];

                setPlayingPatternId(null);
                setIsPlaybackPaused(false);
                setIsMuted(false);

                return;
            }

            const note = notes[currentIndex];

            setActiveNote(note);
            setActiveNoteIndex(currentIndex);

            playKeyboardNote(note, false);

            savedPlaybackIndexRef.current = currentIndex + 1;

            savedPlaybackTimerRef.current = window.setTimeout(
                runNextNote,
                NOTE_PLAY_DELAY,
            );
        };

        runNextNote();
    }, [clearSavedPlaybackTimer, playKeyboardNote, setAudioMuted]);

    const playTextSequence = useCallback(
        (notes) => {
            if (!notes.length) {
                return;
            }

            resetSavedPlayback();
            clearTextPlaybackTimers();

            notes.forEach((note, index) => {
                const timerId = window.setTimeout(() => {
                    playKeyboardNote(note, false);
                }, index * NOTE_PLAY_DELAY);

                textPlaybackTimersRef.current.push(timerId);
            });
        },
        [clearTextPlaybackTimers, playKeyboardNote, resetSavedPlayback],
    );

    useEffect(() => {
        const handleKeyDown = (event) => {
            const targetTagName = event.target.tagName;

            if (
                targetTagName === "INPUT" ||
                targetTagName === "TEXTAREA" ||
                targetTagName === "SELECT"
            ) {
                return;
            }

            if (event.repeat) {
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
    }, [playKeyboardNote]);

    useEffect(() => {
        return () => {
            clearTextPlaybackTimers();
            clearSavedPlaybackTimer();
            clearHighlightTimer();

            stopAllAudio();
            setAudioMuted(false);
        };
    }, [
        clearHighlightTimer,
        clearSavedPlaybackTimer,
        clearTextPlaybackTimers,
        setAudioMuted,
        stopAllAudio,
    ]);

    const parseNoteText = (value) => {
        return value
            .toUpperCase()
            .replace(/[^A-Z]/g, "")
            .split("")
            .filter((note) => PLAYABLE_KEYS.includes(note));
    };

    const areNotePatternsEqual = (firstNotes, secondNotes) => {
        if (firstNotes.length !== secondNotes.length) {
            return false;
        }

        return firstNotes.every((note, index) => note === secondNotes[index]);
    };

    const changeNoteText = (value) => {
        setNoteText(value);
    };

    const loadTextNotes = () => {
        const parsedNotes = parseNoteText(noteText);

        if (parsedNotes.length === 0) {
            toast.warning("Enter valid A-Z notes first.");
            return;
        }

        resetSavedPlayback();
        clearTextPlaybackTimers();

        setPressedKey("");
        setPlayedNotes(parsedNotes);

        toast.success(
            `${parsedNotes.length} notes loaded as the current pattern.`,
        );
    };

    const playTextNotes = () => {
        const parsedNotes = parseNoteText(noteText);

        if (parsedNotes.length === 0) {
            toast.warning("Enter valid A-Z notes first.");
            return;
        }

        playTextSequence(parsedNotes);
    };

    const playCurrentNotes = () => {
        if (playedNotes.length === 0) {
            toast.warning("There are no current notes to play.");
            return;
        }

        playTextSequence(playedNotes);
    };

    const saveCurrentNotes = () => {
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

        const updatedSavedNotes = [newSavedNote, ...savedNotes];

        setSavedNotes(updatedSavedNotes);
        storeSavedNotes(updatedSavedNotes);

        toast.success(`${newSavedNote.name} saved successfully.`);
    };

    const startSavedPattern = (savedNote) => {
        if (!savedNote?.notes?.length) {
            return;
        }

        clearTextPlaybackTimers();
        resetSavedPlayback();

        setPlayedNotes([...savedNote.notes]);
        setPressedKey("");

        savedPlaybackNotesRef.current = [...savedNote.notes];
        savedPlaybackIndexRef.current = 0;

        playbackPausedRef.current = false;
        playbackMutedRef.current = false;

        setPlayingPatternId(savedNote.id);
        setIsPlaybackPaused(false);
        setIsMuted(false);

        setActiveNote("");
        setActiveNoteIndex(-1);

        setAudioMuted(false);

        startSavedPlaybackRunner();
    };

    const pauseSavedPattern = () => {
        clearSavedPlaybackTimer();

        playbackPausedRef.current = true;

        setIsPlaybackPaused(true);
        setPressedKey("");

        stopAllAudio();

        setActiveNote("");
    };

    const resumeSavedPattern = () => {
        playbackPausedRef.current = false;

        setIsPlaybackPaused(false);

        startSavedPlaybackRunner();
    };

    const toggleSavedPatternPlayback = (savedNote) => {
        if (playingPatternId !== savedNote.id) {
            startSavedPattern(savedNote);
            return;
        }

        if (isPlaybackPaused) {
            resumeSavedPattern();
            return;
        }

        pauseSavedPattern();
    };

    const restartSavedPattern = (savedNote) => {
        if (!savedNote?.notes?.length) {
            return;
        }

        clearTextPlaybackTimers();
        resetSavedPlayback();

        setPlayedNotes([...savedNote.notes]);
        setPressedKey("");
        setActiveNote("");
        setActiveNoteIndex(-1);

        savedPlaybackNotesRef.current = [...savedNote.notes];
        savedPlaybackIndexRef.current = 0;

        playbackPausedRef.current = false;
        playbackMutedRef.current = false;

        setPlayingPatternId(savedNote.id);
        setIsPlaybackPaused(false);
        setIsMuted(false);

        setAudioMuted(false);

        startSavedPlaybackRunner();
    };

    const toggleSavedPatternMute = (savedNote) => {
        if (playingPatternId !== savedNote.id) {
            return;
        }

        const nextMutedState = !playbackMutedRef.current;

        playbackMutedRef.current = nextMutedState;

        setIsMuted(nextMutedState);
        setAudioMuted(nextMutedState);
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

    const confirmClearPlayedNotes = () => {
        clearTextPlaybackTimers();
        resetSavedPlayback();

        setPlayedNotes([]);
        setPressedKey("");
        setIsClearModalOpen(false);

        toast.success("Current notes cleared.");
    };

    const requestDeleteSavedNotes = (savedNote) => {
        setSavedNoteToDelete(savedNote);
    };

    const closeDeleteSavedNotesModal = () => {
        setSavedNoteToDelete(null);
    };

    const confirmDeleteSavedNotes = () => {
        if (!savedNoteToDelete) {
            return;
        }

        const deletedPatternId = savedNoteToDelete.id;
        const deletedPatternName = savedNoteToDelete.name;

        if (playingPatternId === deletedPatternId) {
            resetSavedPlayback();
        }

        const updatedSavedNotes = savedNotes.filter(
            (savedNote) => savedNote.id !== deletedPatternId,
        );

        setSavedNotes(updatedSavedNotes);
        storeSavedNotes(updatedSavedNotes);
        setSavedNoteToDelete(null);

        toast.success(`${deletedPatternName} deleted.`);
    };

    const changeVolume = (nextVolume) => {
        setVolume(nextVolume);
    };

    const toggleTheme = () => {
        setTheme((currentTheme) => {
            const nextTheme = currentTheme === "dark" ? "light" : "dark";

            localStorage.setItem("virtual-piano-theme", nextTheme);

            return nextTheme;
        });
    };

    return (
        <div className={`${styles.App} ${theme}`}>
            <Header theme={theme} onToggleTheme={toggleTheme} />

            <Controls
                pressedKey={pressedKey}
                totalNotes={playedNotes.length}
                volume={volume}
                onVolumeChange={changeVolume}
                onClearNotes={openClearModal}
            />

            <AudioBank audioRefs={audioRefs} />

            <Keyboard
                pressedKey={pressedKey}
                playedNotesText={playedNotesText}
                totalNotes={playedNotes.length}
                onPlayNote={playKeyboardNote}
                onSaveNotes={saveCurrentNotes}
                onPlayCurrentNotes={playCurrentNotes}
                onClearCurrentNotes={openClearModal}
            />

            <NoteInput
                noteText={noteText}
                onNoteTextChange={changeNoteText}
                onLoad={loadTextNotes}
                onPlay={playTextNotes}
            />

            <SavedNotes
                savedNotes={savedNotes}
                playingPatternId={playingPatternId}
                isPlaybackPaused={isPlaybackPaused}
                isMuted={isMuted}
                activeNote={activeNote}
                activeNoteIndex={activeNoteIndex}
                onTogglePlay={toggleSavedPatternPlayback}
                onRestart={restartSavedPattern}
                onToggleMute={toggleSavedPatternMute}
                onDelete={requestDeleteSavedNotes}
            />

            <Footer />

            <ConfirmModal
                isOpen={isClearModalOpen}
                title="Clear current notes?"
                message="This will clear the current note pattern from the keyboard. Your separately saved patterns will remain available."
                confirmText="Clear Notes"
                cancelText="Keep Notes"
                onConfirm={confirmClearPlayedNotes}
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
                onConfirm={confirmDeleteSavedNotes}
                onCancel={closeDeleteSavedNotesModal}
            />

            <Notifications theme={theme} />
        </div>
    );
}

export default App;
