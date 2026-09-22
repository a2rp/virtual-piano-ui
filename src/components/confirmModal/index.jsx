import { useEffect, useRef } from "react";

import { FiAlertTriangle, FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

const ConfirmModal = ({
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    tone = "danger",
    onConfirm,
    onCancel,
}) => {
    const dialogRef = useRef(null);
    const cancelButtonRef = useRef(null);
    const previousFocusRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        previousFocusRef.current = document.activeElement;

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const focusTimer = window.setTimeout(() => {
            cancelButtonRef.current?.focus();
        }, 0);

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onCancel?.();

                return;
            }

            if (event.key !== "Tab" || !dialogRef.current) {
                return;
            }

            const focusableElements = dialogRef.current.querySelectorAll(
                [
                    "button:not([disabled])",
                    "[href]",
                    "input:not([disabled])",
                    "select:not([disabled])",
                    "textarea:not([disabled])",
                    '[tabindex]:not([tabindex="-1"])',
                ].join(","),
            );

            if (focusableElements.length === 0) {
                return;
            }

            const firstElement = focusableElements[0];

            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();

                return;
            }

            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.clearTimeout(focusTimer);

            document.body.style.overflow = previousOverflow;

            document.removeEventListener("keydown", handleKeyDown);

            previousFocusRef.current?.focus?.();
        };
    }, [isOpen, onCancel]);

    if (!isOpen) {
        return null;
    }

    const handleOverlayMouseDown = (event) => {
        if (event.target === event.currentTarget) {
            onCancel?.();
        }
    };

    return (
        <div
            className={styles.overlay}
            onMouseDown={handleOverlayMouseDown}
            role="presentation"
        >
            <div
                ref={dialogRef}
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                aria-describedby={
                    message ? "confirm-modal-description" : undefined
                }
            >
                <div
                    className={`${styles.iconBox} ${
                        tone === "danger"
                            ? styles.dangerIcon
                            : styles.defaultIcon
                    }`}
                >
                    <FiAlertTriangle aria-hidden="true" />
                </div>

                <div className={styles.content}>
                    <h2 id="confirm-modal-title" className={styles.title}>
                        {title}
                    </h2>

                    {message && (
                        <p
                            id="confirm-modal-description"
                            className={styles.message}
                        >
                            {message}
                        </p>
                    )}
                </div>

                <div className={styles.actions}>
                    <button
                        ref={cancelButtonRef}
                        className={styles.cancelButton}
                        type="button"
                        onClick={onCancel}
                    >
                        <FiX aria-hidden="true" />
                        <span>{cancelText}</span>
                    </button>

                    <button
                        className={`${styles.confirmButton} ${
                            tone === "danger" ? styles.dangerButton : ""
                        }`}
                        type="button"
                        onClick={onConfirm}
                    >
                        <FiAlertTriangle aria-hidden="true" />

                        <span>{confirmText}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
