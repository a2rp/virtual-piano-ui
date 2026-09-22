import noteA from "../mp3/keyA.mp3";
import noteB from "../mp3/keyB.mp3";
import noteC from "../mp3/keyC.mp3";
import noteD from "../mp3/keyD.mp3";
import noteE from "../mp3/keyE.mp3";
import noteF from "../mp3/keyF.mp3";
import noteG from "../mp3/keyG.mp3";
import noteH from "../mp3/keyH.mp3";
import noteI from "../mp3/keyI.mp3";
import noteJ from "../mp3/keyJ.mp3";
import noteK from "../mp3/keyK.mp3";
import noteL from "../mp3/keyL.mp3";
import noteM from "../mp3/keyM.mp3";
import noteN from "../mp3/keyN.mp3";
import noteO from "../mp3/keyO.mp3";
import noteP from "../mp3/keyP.mp3";
import noteQ from "../mp3/keyQ.mp3";
import noteR from "../mp3/keyR.mp3";
import noteS from "../mp3/keyS.mp3";
import noteT from "../mp3/keyT.mp3";
import noteU from "../mp3/keyU.mp3";
import noteV from "../mp3/keyV.mp3";
import noteW from "../mp3/keyW.mp3";
import noteX from "../mp3/keyX.mp3";

export const STORAGE_KEYS = {
    SAVED_NOTES: "virtual-piano-saved-notes",
    THEME: "virtual-piano-theme",
    VOLUME: "virtual-piano-volume",
};

export const DEFAULT_THEME = "dark";

export const DEFAULT_VOLUME = 75;

export const NOTE_PLAY_DELAY = 360;

export const NOTE_HIGHLIGHT_DURATION = 220;

export const MAX_NOTES = 500;

export const AUDIO_SOURCES = {
    A: noteA,
    B: noteB,
    C: noteC,
    D: noteD,
    E: noteE,
    F: noteF,
    G: noteG,
    H: noteH,
    I: noteI,
    J: noteJ,
    K: noteK,
    L: noteL,
    M: noteM,
    N: noteN,
    O: noteO,
    P: noteP,
    Q: noteQ,
    R: noteR,
    S: noteS,
    T: noteT,
    U: noteU,
    V: noteV,
    W: noteW,
    X: noteX,
    Y: noteA,
    Z: noteB,
};

export const PLAYABLE_KEYS = Object.keys(AUDIO_SOURCES);

export const KEYBOARD_ROWS = [
    {
        id: "number-row",
        keys: [
            { label: "`" },
            { label: "1" },
            { label: "2" },
            { label: "3" },
            { label: "4" },
            { label: "5" },
            { label: "6" },
            { label: "7" },
            { label: "8" },
            { label: "9" },
            { label: "0" },
            { label: "-" },
            { label: "=" },
            {
                label: "backspace",
                size: "wide",
            },
        ],
    },
    {
        id: "top-row",
        keys: [
            {
                label: "tab",
                size: "medium",
            },
            { label: "Q", note: "Q" },
            { label: "W", note: "W" },
            { label: "E", note: "E" },
            { label: "R", note: "R" },
            { label: "T", note: "T" },
            { label: "Y", note: "Y" },
            { label: "U", note: "U" },
            { label: "I", note: "I" },
            { label: "O", note: "O" },
            { label: "P", note: "P" },
            { label: "[" },
            { label: "]" },
            {
                label: "\\",
                size: "medium",
            },
        ],
    },
    {
        id: "middle-row",
        keys: [
            {
                label: "caps lock",
                size: "wide",
            },
            { label: "A", note: "A" },
            { label: "S", note: "S" },
            { label: "D", note: "D" },
            { label: "F", note: "F" },
            { label: "G", note: "G" },
            { label: "H", note: "H" },
            { label: "J", note: "J" },
            { label: "K", note: "K" },
            { label: "L", note: "L" },
            { label: ";" },
            { label: "'" },
            {
                label: "enter",
                size: "wide",
            },
        ],
    },
    {
        id: "bottom-row",
        keys: [
            {
                label: "shift",
                size: "extraWide",
            },
            { label: "Z", note: "Z" },
            { label: "X", note: "X" },
            { label: "C", note: "C" },
            { label: "V", note: "V" },
            { label: "B", note: "B" },
            { label: "N", note: "N" },
            { label: "M", note: "M" },
            { label: "," },
            { label: "." },
            { label: "/" },
            {
                label: "shift",
                size: "extraWide",
            },
        ],
    },
    {
        id: "control-row",
        keys: [
            {
                label: "ctrl",
                size: "medium",
            },
            { label: "fn" },
            {
                label: "windows",
                type: "windows",
            },
            {
                label: "alt",
                size: "medium",
            },
            {
                label: "",
                size: "space",
            },
            {
                label: "alt",
                size: "medium",
            },
            {
                label: "ctrl",
                size: "medium",
            },
            { label: "<" },
            {
                label: "up-down",
                type: "upDown",
            },
            { label: ">" },
        ],
    },
];
