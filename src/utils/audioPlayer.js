export const playAudioNote = ({ audioElement, volume }) => {
    if (!audioElement) {
        return;
    }

    audioElement.currentTime = 0;
    audioElement.volume = volume / 100;

    const playRequest = audioElement.play();

    if (playRequest !== undefined) {
        playRequest.catch(() => {
            // Ignore browser play interruption during very fast repeated key presses.
        });
    }
};
