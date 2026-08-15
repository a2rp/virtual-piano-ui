import { AiFillWindows } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import styles from "./styles.module.scss";

const KeyboardKey = ({ keyItem, pressedKey, onPlayNote }) => {
    const isPlayable = Boolean(keyItem.note);
    const isActive = pressedKey === keyItem.note;

    const className = [
        styles.key,
        styles[keyItem.className],
        isPlayable ? styles.playableKey : styles.disabledKey,
        isActive ? styles.activeKey : "",
    ]
        .filter(Boolean)
        .join(" ");

    const renderContent = () => {
        if (keyItem.type === "windows") {
            return <AiFillWindows />;
        }

        if (keyItem.type === "upDown") {
            return (
                <span className={styles.arrowStack}>
                    <FiChevronUp />
                    <FiChevronDown />
                </span>
            );
        }

        return keyItem.label;
    };

    if (isPlayable) {
        return (
            <button
                className={className}
                type="button"
                onClick={() => onPlayNote(keyItem.note)}
                aria-label={`Play note ${keyItem.note}`}
                title={`Play note ${keyItem.note}`}
            >
                <span className={styles.keyContent}>{renderContent()}</span>

                <span className={styles.keyGlow} />
            </button>
        );
    }

    return (
        <div className={className} aria-disabled="true">
            <span className={styles.keyContent}>{renderContent()}</span>
        </div>
    );
};

export default KeyboardKey;
