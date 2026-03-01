// --- Music ---

const music = new Audio("assets/mainTheme.mp3");
music.loop   = true;
music.volume = 0.5;

export function startMusic() {
    music.currentTime = 0;
    music.play();
}

export function stopMusic() {
    music.pause();
    music.currentTime = 0;
}

// --- Sound effects (Web Audio API) ---

let audioCtx = null;

function getCtx() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    return audioCtx;
}

function playTone(freq, duration, type = "square", volume = 0.15, when = 0) {
    const ctx  = getCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, when);
    gain.gain.exponentialRampToValueAtTime(0.001, when + duration);

    osc.start(when);
    osc.stop(when + duration);
}

export function playButtonSound() {
    const ctx = getCtx();
    const t   = ctx.currentTime;
    playTone(600, 0.04, "square", 0.15, t);
    playTone(900, 0.03, "square", 0.1,  t + 0.03);
}

export function playEatSound() {
    const ctx = getCtx();
    const t   = ctx.currentTime;
    playTone(880,  0.08, "square", 0.2,  t);
    playTone(1100, 0.06, "square", 0.15, t + 0.06);
}

export function playGameOverSound() {
    const ctx = getCtx();
    const t   = ctx.currentTime;
    [440, 370, 311, 262].forEach((freq, i) => {
        playTone(freq, 0.25, "sawtooth", 0.25, t + i * 0.18);
    });
}
