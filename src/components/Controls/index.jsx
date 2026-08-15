import { FiHash, FiMusic, FiVolume2 } from "react-icons/fi";

import styles from "./styles.module.scss";

const Controls = ({ pressedKey, totalNotes, volume, onVolumeChange }) => {
    return (
        <section className={styles.controls}>
            <div className={styles.card}>
                <div className={styles.icon}>
                    <FiMusic />
                </div>

                <div className={styles.content}>
                    <span className={styles.label}>Last Note</span>

                    <strong className={styles.value}>
                        {pressedKey || "-"}
                    </strong>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.icon}>
                    <FiHash />
                </div>

                <div className={styles.content}>
                    <span className={styles.label}>Total Notes</span>

                    <strong className={styles.value}>{totalNotes}</strong>
                </div>
            </div>

            <div className={styles.volumeCard}>
                <div className={styles.volumeTop}>
                    <div className={styles.icon}>
                        <FiVolume2 />
                    </div>

                    <div className={styles.content}>
                        <span className={styles.label}>Volume</span>

                        <strong className={styles.volumeValue}>
                            {volume}%
                        </strong>
                    </div>
                </div>

                <input
                    id="volume"
                    className={styles.volumeSlider}
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    aria-label="Volume"
                    onChange={(event) =>
                        onVolumeChange(Number(event.target.value))
                    }
                />
            </div>
        </section>
    );
};

export default Controls;
