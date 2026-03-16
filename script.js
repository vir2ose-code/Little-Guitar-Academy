/**
 * script.js – Little Guitar Academy (Magical Redesign)
 * 
 * Saubere, magische Interaktion für Kinder.
 * Kein Diagnose-Log, keine komplexen Tunings.
 * Hover über die Saiten -> helles Glühen, Vibration und Sound-Playback.
 */

const STRINGS = [
    { note: "E2", wav: "E-82Hz.wav" },
    { note: "A2", wav: "A-110Hz.wav" },
    { note: "D3", wav: "D-146.83Hz.wav" },
    { note: "G3", wav: "G-196.00Hz.wav" },
    { note: "H3", wav: "H-246.94Hz.wav" },
    { note: "E4", wav: "E-329.63Hz.wav" }
];

let audioCtx = null;
// Audio-Elemente für die Strings vorladen
const stringAudios = [];
let isLoaded = false;

// DOM Elemente
const startOverlay = document.getElementById("start-overlay");
const strings = document.querySelectorAll(".guitar-string");
const tuningButtons = document.querySelectorAll(".tuning-btn");
const vibrationTimers = {};
const debounceTimers = {};

// ==========================================
// 1. Initialisierung & Audio Freigabe
// ==========================================

// Browser verlangen einen Klick, bevor Audio gespielt werden darf
startOverlay.addEventListener("click", async () => {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === "suspended") {
            await audioCtx.resume();
        }

        // --- Intro-Sound abspielen ---
        const introAudio = new Audio('GITARREN INTRO HERO PAGE/INTRO Little Guitar Academy.wav');
        introAudio.volume = 0.8;
        introAudio.play().catch(e => console.warn("Intro Audio blockiert:", e));

        // Overlay sanft ausblenden
        startOverlay.classList.add("hidden");
        
        // Weiter-Pfeil einblenden
        const nextArrow = document.getElementById("stimmung2-next-arrow");
        if (nextArrow) nextArrow.classList.remove("hidden");

        // Sounds im Hintergrund laden
        await preloadAllSounds();
        isLoaded = true;

        setupHoverInteractions();
    } catch (e) {
        console.error("Audio-Initialisierung fehlgeschlagen:", e);
    }
});

// ==========================================
// 2. Audio Preloading (HTML5 Audio für file:// Support)
// ==========================================

async function preloadAllSounds() {
    STRINGS.forEach((s, i) => {
        const audio = new Audio(s.wav);
        audio.preload = "auto";
        stringAudios[i] = audio;
    });
    // Kurze Pause, damit die Browser das Preloaden anstoßen
    await new Promise(r => setTimeout(r, 200));
}

    // Der alte fetch-Code wurde entfernt, da file:// keinen fetch erlaubt

// ==========================================
// 3. Hover-Interaktionen (Magie)
// ==========================================

function setupHoverInteractions() {
    // 1. Interaktion für die Saiten
    strings.forEach((stringEl) => {
        const index = parseInt(stringEl.dataset.index, 10);

        stringEl.addEventListener("mouseenter", () => {
            if (!isLoaded) return;
            
            // Verhindern, dass die Saite 10x pro Sekunde triggert,
            // wenn das Kind die Maus am Rand hin und her bewegt
            if (debounceTimers[index]) return;
            
            debounceTimers[index] = setTimeout(() => {
                debounceTimers[index] = null;
            }, 500); // 500ms Abklingzeit pro Saite

            playString(index);
        });

        // Touch-Support für Tablets/Smartphones
        stringEl.addEventListener("touchstart", (e) => {
            e.preventDefault(); // Verhindert Scrollen beim Streichen über die Saite
            if (!isLoaded) return;
            
            if (debounceTimers[index]) return;
            debounceTimers[index] = setTimeout(() => debounceTimers[index] = null, 500);

            playString(index);
        }, { passive: false });
    });

    // 2. Interaktion für die neuen bunten Buttons
    if (tuningButtons) {
        tuningButtons.forEach((btn) => {
            const index = parseInt(btn.dataset.index, 10);

            // Hover über den Button
            btn.addEventListener("mouseenter", () => {
                if (!isLoaded) return;
                if (debounceTimers[index]) return;
                
                debounceTimers[index] = setTimeout(() => {
                    debounceTimers[index] = null;
                }, 500);

                playString(index);
            });

            // Touch auf den Button
            btn.addEventListener("touchstart", (e) => {
                // Erlaubt das Clicken, aber verhindert doppeltes Triggern
                if (!isLoaded) return;
                
                if (debounceTimers[index]) return;
                debounceTimers[index] = setTimeout(() => debounceTimers[index] = null, 500);

                playString(index);
            }, { passive: true });
        });
    }
}

function playString(index) {
    // 1. Audio abspielen (überlappend möglich durch CloneNode)
    if (stringAudios[index]) {
        const audioClone = stringAudios[index].cloneNode();
        audioClone.volume = 1.0;
        audioClone.play().catch(e => console.log("Sound blockiert:", e));
    }

    // 2. Visuelle Vibration starten
    const stringEl = strings[index];
    stringEl.classList.add("vibrate");

    if (vibrationTimers[index]) {
        clearTimeout(vibrationTimers[index]);
    }

    // Die Animation nach 1.5 Sekunden sanft beenden
    vibrationTimers[index] = setTimeout(() => {
        stringEl.classList.remove("vibrate");
        vibrationTimers[index] = null;
    }, 1500);
}
