import { AiFillWindows } from "react-icons/ai";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import styles from "./styles.module.scss";

const PianoKey = ({ keyItem, isActive, onPlayNote }) => {
    const isPlayable = Boolean(keyItem.note);

    const renderContent = () => {
        if (keyItem.type === "windows") {
            return <AiFillWindows aria-hidden="true" />;
        }

        if (keyItem.type === "upDown") {
            return (
                <span className={styles.arrowStack}>
                    <FiChevronUp aria-hidden="true" />
                    <FiChevronDown aria-hidden="true" />
                </span>
            );
        }

        return keyItem.label;
    };

    const className = [
        styles.key,
        isPlayable ? styles.playable : styles.disabled,
        isActive ? styles.active : "",
    ]
        .filter(Boolean)
        .join(" ");

    const size = keyItem.size || "regular";

    if (!isPlayable) {
        return (
            <div className={className} data-size={size} aria-hidden="true">
                <span className={styles.content}>{renderContent()}</span>
            </div>
        );
    }

    return (
        <button
            className={className}
            data-size={size}
            type="button"
            onClick={() => onPlayNote(keyItem.note)}
            aria-label={`Play note ${keyItem.note}`}
            aria-pressed={isActive}
            title={`Play note ${keyItem.note}`}
        >
            <span className={styles.content}>{renderContent()}</span>
        </button>
    );
};

export default PianoKey;
