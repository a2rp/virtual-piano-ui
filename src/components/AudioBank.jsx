import { NOTES } from "../data/notes";

const AudioBank = ({ audioRefs }) => {
    return (
        <>
            {Object.entries(NOTES).map(([key, src]) => (
                <audio
                    key={key}
                    ref={(element) => {
                        audioRefs.current[key] = element;
                    }}
                    src={src}
                    preload="auto"
                />
            ))}
        </>
    );
};

export default AudioBank;
