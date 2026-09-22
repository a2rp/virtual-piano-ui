import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

import styles from "./styles.module.scss";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 360);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            className={`${styles.button} ${isVisible ? styles.visible : ""}`}
            type="button"
            onClick={handleClick}
            aria-label="Back to top"
            title="Back to top"
        >
            <FiArrowUp aria-hidden="true" />
        </button>
    );
};

export default BackToTop;
