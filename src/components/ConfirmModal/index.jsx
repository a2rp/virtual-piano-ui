import { FiAlertTriangle, FiCheckCircle, FiTrash2, FiX } from "react-icons/fi";

import Modal from "../Modal";

import styles from "./styles.module.scss";

const ConfirmModal = ({
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            labelledBy="confirm-modal-title"
        >
            <div className={styles.iconBox}>
                <FiAlertTriangle />
            </div>

            <div className={styles.content}>
                <h2 id="confirm-modal-title">{title}</h2>

                <p>{message}</p>
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.cancelButton}
                    type="button"
                    onClick={onCancel}
                >
                    <FiX />
                    <span>{cancelText}</span>
                </button>

                <button
                    className={styles.confirmButton}
                    type="button"
                    onClick={onConfirm}
                >
                    <FiTrash2 />
                    <span>{confirmText}</span>
                </button>
            </div>

            <div className={styles.hint}>
                <FiCheckCircle />

                <span>
                    Your saved notes will be removed only after confirmation.
                </span>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
