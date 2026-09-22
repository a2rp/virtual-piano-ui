import { FiCommand, FiMusic } from "react-icons/fi";

import { KEYBOARD_ROWS } from "../../constants/pianoConstants";

import PianoKey from "../pianoKey";

import styles from "./styles.module.scss";

const Keyboard = ({ pressedKey, onPlayNote }) => {
    return (
        <section
            id="piano"
            className={styles.section}
            aria-labelledby="piano-title"
        >
            <div className={styles.header}>
                <div>
                    <div className={styles.label}>
                        <FiMusic aria-hidden="true" />
                        <span>Interactive Keyboard</span>
                    </div>

                    <h1 id="piano-title" className={styles.title}>
                        Virtual Piano UI
                    </h1>

                    <p className={styles.text}>
                        Use A to Z on your physical keyboard or select any
                        highlighted key below.
                    </p>
                </div>

                <div className={styles.hint}>
                    <FiCommand aria-hidden="true" />

                    <span>Keyboard and pointer controls</span>
                </div>
            </div>

            <div
                className={styles.scrollArea}
                tabIndex="0"
                aria-label="Virtual computer keyboard"
            >
                <div className={styles.keyboard}>
                    {KEYBOARD_ROWS.map((row) => (
                        <div key={row.id} className={styles.row}>
                            {row.keys.map((keyItem, index) => (
                                <PianoKey
                                    key={`${row.id}-${keyItem.label}-${index}`}
                                    keyItem={keyItem}
                                    isActive={
                                        Boolean(keyItem.note) &&
                                        pressedKey === keyItem.note
                                    }
                                    onPlayNote={onPlayNote}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <p className={styles.mobileHint}>
                On smaller screens, scroll the keyboard horizontally to reach
                every key.
            </p>
        </section>
    );
};

export default Keyboard;
