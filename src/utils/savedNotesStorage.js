const STORAGE_KEY = "virtual-piano-saved-notes";

export const getSavedNotes = () => {
    try {
        const savedNotes = localStorage.getItem(STORAGE_KEY);

        if (!savedNotes) {
            return [];
        }

        const parsedNotes = JSON.parse(savedNotes);

        return Array.isArray(parsedNotes) ? parsedNotes : [];
    } catch {
        return [];
    }
};

export const storeSavedNotes = (savedNotes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedNotes));
};

export const createSavedNote = (notes, existingNotes = []) => {
    const nextNumber = existingNotes.length + 1;

    return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: `Pattern ${nextNumber}`,
        notes: [...notes],
        createdAt: new Date().toISOString(),
    };
};
