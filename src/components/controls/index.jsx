import {
    FiHash,
    FiMusic,
    FiVolume1,
    FiVolume2,
    FiVolumeX,
} from "react-icons/fi";

import styles from "./styles.module.scss";

const Controls = ({ pressedKey, totalNotes, volume, onVolumeChange }) => {
    let volumeIcon = <FiVolume2 aria-hidden="true" />;

    if (volume === 0) {
        volumeIcon = <FiVolumeX aria-hidden="true" />;
    } else if (volume < 50) {
        volumeIcon = <FiVolume1 aria-hidden="true" />;
    }

    return (
        <section className={styles.wrapper} aria-label="Piano controls">
            <article className={styles.card}>
                <div className={styles.iconBox}>
                    <FiMusic aria-hidden="true" />
                </div>

                <div className={styles.content}>
                    <span className={styles.label}>Last Note</span>

                    <strong className={styles.value}>
                        {pressedKey || "-"}
                    </strong>
                </div>
            </article>

            <article className={styles.card}>
                <div className={styles.iconBox}>
                    <FiHash aria-hidden="true" />
                </div>

                <div className={styles.content}>
                    <span className={styles.label}>Current Notes</span>

                    <strong className={styles.value}>{totalNotes}</strong>
                </div>
            </article>

            <article className={styles.volumeCard}>
                <div className={styles.volumeHeader}>
                    <div className={styles.iconBox}>{volumeIcon}</div>

                    <div className={styles.content}>
                        <span className={styles.label}>Volume</span>

                        <strong className={styles.volumeValue}>
                            {volume}%
                        </strong>
                    </div>
                </div>

                <label className={styles.sliderLabel} htmlFor="piano-volume">
                    <span className={styles.visuallyHidden}>Piano volume</span>

                    <input
                        id="piano-volume"
                        className={styles.slider}
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={volume}
                        onChange={(event) =>
                            onVolumeChange(Number(event.target.value))
                        }
                    />
                </label>
            </article>
        </section>
    );
};

export default Controls;
