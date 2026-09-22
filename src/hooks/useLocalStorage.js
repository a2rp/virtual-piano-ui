import { useEffect, useState } from "react";

const getInitialValue = (key, initialValue, validate) => {
    const fallback =
        typeof initialValue === "function" ? initialValue() : initialValue;

    try {
        const storedValue = window.localStorage.getItem(key);

        if (storedValue === null) {
            return fallback;
        }

        const parsedValue = JSON.parse(storedValue);

        if (typeof validate === "function") {
            return validate(parsedValue);
        }

        return parsedValue;
    } catch {
        return fallback;
    }
};

const useLocalStorage = (key, initialValue, validate) => {
    const [value, setValue] = useState(() =>
        getInitialValue(key, initialValue, validate),
    );

    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));

            setError(false);
        } catch {
            setError(true);
        }
    }, [key, value]);

    const removeValue = () => {
        try {
            window.localStorage.removeItem(key);

            const fallback =
                typeof initialValue === "function"
                    ? initialValue()
                    : initialValue;

            setValue(fallback);
            setError(false);
        } catch {
            setError(true);
        }
    };

    return {
        value,
        setValue,
        error,
        removeValue,
    };
};

export default useLocalStorage;
