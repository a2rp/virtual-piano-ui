import { useCallback, useEffect, useRef, useState } from "react";

import { NOTE_PLAY_DELAY } from "../constants/pianoConstants";

import { normalizeNoteArray } from "../utils/noteUtils";

const usePlayback = ({ playNote, stopAudio, delay = NOTE_PLAY_DELAY }) => {
    const timerRef = useRef(null);
    const runnerRef = useRef(null);

    const notesRef = useRef([]);
    const indexRef = useRef(0);

    const pausedRef = useRef(false);
    const mutedRef = useRef(false);

    const patternIdRef = useRef(null);

    const [playingPatternId, setPlayingPatternId] = useState(null);

    const [isPlaybackPaused, setIsPlaybackPaused] = useState(false);

    const [isMuted, setIsMuted] = useState(false);

    const [activeNote, setActiveNote] = useState("");

    const [activeNoteIndex, setActiveNoteIndex] = useState(-1);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);

            timerRef.current = null;
        }
    }, []);

    const resetPlaybackState = useCallback(
        (shouldStopAudio = true) => {
            clearTimer();

            if (shouldStopAudio && typeof stopAudio === "function") {
                stopAudio();
            }

            notesRef.current = [];
            indexRef.current = 0;

            pausedRef.current = false;
            mutedRef.current = false;

            patternIdRef.current = null;

            setPlayingPatternId(null);
            setIsPlaybackPaused(false);
            setIsMuted(false);

            setActiveNote("");
            setActiveNoteIndex(-1);
        },
        [clearTimer, stopAudio],
    );

    const runNext = useCallback(() => {
        if (pausedRef.current) {
            return;
        }

        const notes = notesRef.current;

        const currentIndex = indexRef.current;

        if (currentIndex >= notes.length) {
            resetPlaybackState(false);

            return;
        }

        const note = notes[currentIndex];

        setActiveNote(note);

        setActiveNoteIndex(currentIndex);

        if (typeof playNote === "function") {
            playNote(note, {
                muted: mutedRef.current,
            });
        }

        indexRef.current = currentIndex + 1;

        timerRef.current = window.setTimeout(() => {
            runnerRef.current?.();
        }, delay);
    }, [delay, playNote, resetPlaybackState]);

    useEffect(() => {
        runnerRef.current = runNext;
    }, [runNext]);

    const startPlayback = useCallback(
        (notes, patternId = null) => {
            const normalizedNotes = normalizeNoteArray(notes);

            if (normalizedNotes.length === 0) {
                return false;
            }

            resetPlaybackState();

            notesRef.current = normalizedNotes;

            indexRef.current = 0;

            pausedRef.current = false;
            mutedRef.current = false;

            patternIdRef.current = patternId;

            setPlayingPatternId(patternId);

            setIsPlaybackPaused(false);

            setIsMuted(false);

            setActiveNote("");

            setActiveNoteIndex(-1);

            timerRef.current = window.setTimeout(() => {
                runnerRef.current?.();
            }, 0);

            return true;
        },
        [resetPlaybackState],
    );

    const stopPlayback = useCallback(() => {
        resetPlaybackState();
    }, [resetPlaybackState]);

    const pausePlayback = useCallback(() => {
        if (notesRef.current.length === 0) {
            return;
        }

        clearTimer();

        pausedRef.current = true;

        setIsPlaybackPaused(true);

        setActiveNote("");

        if (typeof stopAudio === "function") {
            stopAudio();
        }
    }, [clearTimer, stopAudio]);

    const resumePlayback = useCallback(() => {
        if (notesRef.current.length === 0 || !pausedRef.current) {
            return;
        }

        pausedRef.current = false;

        setIsPlaybackPaused(false);

        timerRef.current = window.setTimeout(() => {
            runnerRef.current?.();
        }, 0);
    }, []);

    const togglePatternPlayback = useCallback(
        (savedNote) => {
            if (
                !savedNote?.id ||
                !Array.isArray(savedNote.notes) ||
                savedNote.notes.length === 0
            ) {
                return;
            }

            if (patternIdRef.current !== savedNote.id) {
                startPlayback(savedNote.notes, savedNote.id);

                return;
            }

            if (pausedRef.current) {
                resumePlayback();

                return;
            }

            pausePlayback();
        },
        [pausePlayback, resumePlayback, startPlayback],
    );

    const restartPattern = useCallback(
        (savedNote) => {
            if (!savedNote?.id || !Array.isArray(savedNote.notes)) {
                return;
            }

            startPlayback(savedNote.notes, savedNote.id);
        },
        [startPlayback],
    );

    const toggleMute = useCallback((patternId) => {
        if (!patternId || patternIdRef.current !== patternId) {
            return;
        }

        const nextMutedState = !mutedRef.current;

        mutedRef.current = nextMutedState;

        setIsMuted(nextMutedState);
    }, []);

    useEffect(() => {
        return () => {
            clearTimer();

            if (typeof stopAudio === "function") {
                stopAudio();
            }
        };
    }, [clearTimer, stopAudio]);

    return {
        playingPatternId,
        isPlaybackPaused,
        isMuted,

        activeNote,
        activeNoteIndex,

        startPlayback,
        stopPlayback,

        pausePlayback,
        resumePlayback,

        togglePatternPlayback,
        restartPattern,
        toggleMute,
    };
};

export default usePlayback;
