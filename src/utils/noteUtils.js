import { MAX_NOTES, PLAYABLE_KEYS } from "../constants/pianoConstants";

export const createId = () => {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    return `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 10)}`;
};

export const isPlayableNote = (note) => {
    if (typeof note !== "string") {
        return false;
    }

    return PLAYABLE_KEYS.includes(note.toUpperCase());
};

export const normalizeNoteArray = (notes, maximum = MAX_NOTES) => {
    if (!Array.isArray(notes)) {
        return [];
    }

    return notes
        .map((note) => (typeof note === "string" ? note.toUpperCase() : ""))
        .filter((note) => PLAYABLE_KEYS.includes(note))
        .slice(0, maximum);
};

export const parseNoteText = (value, maximum = MAX_NOTES) => {
    if (typeof value !== "string") {
        return [];
    }

    return value
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .split("")
        .filter((note) => PLAYABLE_KEYS.includes(note))
        .slice(0, maximum);
};

export const areNotePatternsEqual = (firstNotes, secondNotes) => {
    const first = normalizeNoteArray(firstNotes);

    const second = normalizeNoteArray(secondNotes);

    if (first.length !== second.length) {
        return false;
    }

    return first.every((note, index) => note === second[index]);
};

const getNextPatternNumber = (savedNotes = []) => {
    const existingNumbers = savedNotes
        .map((savedNote) => {
            const match =
                typeof savedNote?.name === "string"
                    ? savedNote.name.match(/^Pattern\s+(\d+)$/i)
                    : null;

            return match ? Number(match[1]) : 0;
        })
        .filter((number) => Number.isFinite(number));

    if (existingNumbers.length === 0) {
        return 1;
    }

    return Math.max(...existingNumbers) + 1;
};

export const createSavedNote = (notes, existingNotes = []) => {
    const normalizedNotes = normalizeNoteArray(notes);

    return {
        id: createId(),

        name: `Pattern ${getNextPatternNumber(existingNotes)}`,

        notes: normalizedNotes,

        createdAt: new Date().toISOString(),
    };
};
