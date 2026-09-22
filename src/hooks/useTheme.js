import { useCallback, useEffect, useState } from "react";

import { DEFAULT_THEME, STORAGE_KEYS } from "../constants/pianoConstants";

const getInitialTheme = () => {
    try {
        const storedTheme = window.localStorage.getItem(STORAGE_KEYS.THEME);

        if (storedTheme === "dark" || storedTheme === "light") {
            return storedTheme;
        }
    } catch {
        return DEFAULT_THEME;
    }

    return DEFAULT_THEME;
};

const useTheme = () => {
    const [theme, setTheme] = useState(getInitialTheme);

    const [error, setError] = useState(false);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;

        document.documentElement.style.colorScheme = theme;

        try {
            window.localStorage.setItem(STORAGE_KEYS.THEME, theme);

            setError(false);
        } catch {
            setError(true);
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark",
        );
    }, []);

    return {
        theme,
        setTheme,
        toggleTheme,
        error,
    };
};

export default useTheme;
