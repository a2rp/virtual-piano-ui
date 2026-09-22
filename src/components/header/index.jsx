import { useEffect, useRef, useState } from "react";

import { FiMenu, FiMusic, FiX } from "react-icons/fi";

import ThemeToggle from "../themeToggle";

import styles from "./styles.module.scss";

const Header = ({ theme, onToggleTheme }) => {
    const lastScrollRef = useRef(0);

    const [isHidden, setIsHidden] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll <= 20) {
                setIsHidden(false);
            } else if (
                currentScroll > lastScrollRef.current &&
                currentScroll > 110
            ) {
                setIsHidden(true);
                setIsMenuOpen(false);
            } else if (currentScroll < lastScrollRef.current) {
                setIsHidden(false);
            }

            lastScrollRef.current = currentScroll;
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsHidden(false);
    };

    return (
        <header className={`${styles.header} ${isHidden ? styles.hidden : ""}`}>
            <div className={styles.container}>
                <a
                    className={styles.brand}
                    href="#piano"
                    onClick={closeMenu}
                    aria-label="Virtual Piano UI home"
                >
                    <img
                        className={styles.logo}
                        src={`${import.meta.env.BASE_URL}logo.png`}
                        alt="Virtual Piano UI logo"
                    />

                    <div className={styles.brandText}>
                        <strong className={styles.brandName}>
                            Virtual Piano UI
                        </strong>

                        <span className={styles.brandLabel}>
                            Interactive Music Keyboard
                        </span>
                    </div>
                </a>

                <nav className={styles.navigation} aria-label="Main navigation">
                    <a href="#piano">Piano</a>

                    <a href="#text-notes">Text Notes</a>

                    <a href="#saved-notes">Saved</a>
                </nav>

                <div className={styles.actions}>
                    <ThemeToggle theme={theme} onToggle={onToggleTheme} />

                    <button
                        className={styles.menuButton}
                        type="button"
                        onClick={() => setIsMenuOpen((current) => !current)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                        aria-label={
                            isMenuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        title={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? (
                            <FiX aria-hidden="true" />
                        ) : (
                            <FiMenu aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <nav
                    id="mobile-navigation"
                    className={styles.mobileNavigation}
                    aria-label="Mobile navigation"
                >
                    <div className={styles.mobileInner}>
                        <a href="#piano" onClick={closeMenu}>
                            <FiMusic aria-hidden="true" />
                            Piano
                        </a>

                        <a href="#text-notes" onClick={closeMenu}>
                            Text Notes
                        </a>

                        <a href="#saved-notes" onClick={closeMenu}>
                            Saved Patterns
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
