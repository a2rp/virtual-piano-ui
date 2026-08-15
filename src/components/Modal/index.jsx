import { useEffect } from "react";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

const Modal = ({ isOpen, children, onClose, labelledBy }) => {
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay} role="presentation" onClick={onClose}>
            <div
                className={styles.box}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className={styles.closeButton}
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <FiX />
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;
