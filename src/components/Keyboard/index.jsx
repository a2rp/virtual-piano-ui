import { KEYBOARD_ROWS } from "../../data/keyboardRows";

import CurrentNotes from "./CurrentNotes";
import KeyboardKey from "./KeyboardKey";

import styles from "./styles.module.scss";

const Keyboard = ({
    pressedKey,
    playedNotesText,
    totalNotes,
    onPlayNote,
    onSaveNotes,
    onPlayCurrentNotes,
    onClearCurrentNotes,
}) => {
    return (
        <section className={styles.keyboardSection}>
            <CurrentNotes
                playedNotesText={playedNotesText}
                totalNotes={totalNotes}
                onSaveNotes={onSaveNotes}
                onPlayCurrentNotes={onPlayCurrentNotes}
                onClearCurrentNotes={onClearCurrentNotes}
            />

            <div className={styles.keyboardWrapper}>
                <div className={styles.keysContainer}>
                    {KEYBOARD_ROWS.map((row) => (
                        <div key={row.id} className={styles[row.className]}>
                            {row.keys.map((keyItem) => (
                                <KeyboardKey
                                    key={`${row.id}-${keyItem.className}`}
                                    keyItem={keyItem}
                                    pressedKey={pressedKey}
                                    onPlayNote={onPlayNote}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Keyboard;
