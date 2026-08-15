import { FiMoon, FiMusic, FiSun } from "react-icons/fi";

import styles from "./styles.module.scss";

const Header = ({ theme, onToggleTheme }) => {
    const isDarkTheme = theme === "dark";

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className={styles.label}>
                    <FiMusic />
                    <span>Interactive Music Keyboard</span>
                </div>

                <h1 className={styles.title}>Virtual Piano UI</h1>

                <p className={styles.text}>
                    Play piano notes with your laptop keyboard or mouse. Try A
                    to Z keys, adjust the volume, switch theme, and replay your
                    saved note pattern anytime.
                </p>
            </div>

            <button
                className={styles.themeButton}
                type="button"
                onClick={onToggleTheme}
            >
                {isDarkTheme ? <FiSun /> : <FiMoon />}
                <span>{isDarkTheme ? "Light Mode" : "Dark Mode"}</span>
            </button>
        </header>
    );
};

export default Header;
