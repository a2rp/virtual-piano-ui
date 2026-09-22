import { DEFAULT_VOLUME, MAX_NOTES } from "../constants/pianoConstants";

import { createId, normalizeNoteArray } from "./noteUtils";

export const normalizeVolume = (value) => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return DEFAULT_VOLUME;
    }

    return Math.min(100, Math.max(0, Math.round(numericValue)));
};

const normalizeDate = (value) => {
    if (typeof value !== "string") {
        return new Date().toISOString();
    }

    const parsedDate = Date.parse(value);

    if (Number.isNaN(parsedDate)) {
        return new Date().toISOString();
    }

    return new Date(parsedDate).toISOString();
};

export const normalizeSavedNote = (savedNote, index = 0) => {
    if (!savedNote || typeof savedNote !== "object") {
        return null;
    }

    const notes = normalizeNoteArray(savedNote.notes, MAX_NOTES);

    if (notes.length === 0) {
        return null;
    }

    const name =
        typeof savedNote.name === "string" && savedNote.name.trim()
            ? savedNote.name.trim()
            : `Pattern ${index + 1}`;

    return {
        id:
            typeof savedNote.id === "string" && savedNote.id.trim()
                ? savedNote.id
                : createId(),

        name,

        notes,

        createdAt: normalizeDate(savedNote.createdAt),
    };
};

export const normalizeSavedNotes = (value) => {
    if (!Array.isArray(value)) {
        return [];
    }

    const usedIds = new Set();

    return value
        .map((savedNote, index) => normalizeSavedNote(savedNote, index))
        .filter(Boolean)
        .map((savedNote) => {
            if (!usedIds.has(savedNote.id)) {
                usedIds.add(savedNote.id);

                return savedNote;
            }

            const nextId = createId();

            usedIds.add(nextId);

            return {
                ...savedNote,
                id: nextId,
            };
        });
};

export const safeJsonParse = (value, fallback) => {
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
};
