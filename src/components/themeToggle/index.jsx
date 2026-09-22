import { FiMoon, FiSun } from "react-icons/fi";

import styles from "./styles.module.scss";

const ThemeToggle = ({ theme, onToggle }) => {
    const isDark = theme === "dark";

    return (
        <button
            className={styles.button}
            type="button"
            onClick={onToggle}
            aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            title={isDark ? "Light theme" : "Dark theme"}
        >
            {isDark ? (
                <FiSun aria-hidden="true" />
            ) : (
                <FiMoon aria-hidden="true" />
            )}

            <span className={styles.text}>{isDark ? "Light" : "Dark"}</span>
        </button>
    );
};

export default ThemeToggle;
