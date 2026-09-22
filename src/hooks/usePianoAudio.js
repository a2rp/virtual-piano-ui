import { useCallback, useEffect, useRef } from "react";

import { AUDIO_SOURCES, DEFAULT_VOLUME } from "../constants/pianoConstants";

import { normalizeVolume } from "../utils/storageUtils";

const usePianoAudio = ({ volume = DEFAULT_VOLUME } = {}) => {
    const audioRefs = useRef({});
    const volumeRef = useRef(normalizeVolume(volume));

    useEffect(() => {
        const audioElements = {};

        Object.entries(AUDIO_SOURCES).forEach(([note, source]) => {
            const audio = new Audio(source);

            audio.preload = "auto";

            audio.volume = volumeRef.current / 100;

            audioElements[note] = audio;
        });

        audioRefs.current = audioElements;

        return () => {
            Object.values(audioElements).forEach((audio) => {
                audio.pause();

                audio.currentTime = 0;
            });

            audioRefs.current = {};
        };
    }, []);

    useEffect(() => {
        const safeVolume = normalizeVolume(volume);

        volumeRef.current = safeVolume;

        Object.values(audioRefs.current).forEach((audio) => {
            audio.volume = safeVolume / 100;
        });
    }, [volume]);

    const playNote = useCallback((note, { muted = false } = {}) => {
        const safeNote = typeof note === "string" ? note.toUpperCase() : "";

        const audio = audioRefs.current[safeNote];

        if (!audio) {
            return false;
        }

        try {
            audio.pause();
            audio.currentTime = 0;

            audio.volume = volumeRef.current / 100;

            audio.muted = Boolean(muted);

            const playPromise = audio.play();

            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {});
            }

            return true;
        } catch {
            return false;
        }
    }, []);

    const stopAllAudio = useCallback(() => {
        Object.values(audioRefs.current).forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = false;
        });
    }, []);

    return {
        playNote,
        stopAllAudio,
    };
};

export default usePianoAudio;
