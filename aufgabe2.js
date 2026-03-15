// ==========================================
// Aufgabe 2: Akkord-Carousel Logik
// ==========================================

const SLIDES = [
    { img: "PAGE 2/1..png", audio: null },
    { img: "PAGE 2/2..png", audio: null },
    { img: "PAGE 2/C-DUR.png", audio: "PAGE 2/C-DUR.wav" },
    { img: "PAGE 2/G-DUR.png", audio: "PAGE 2/G-DUR.wav" },
    { img: "PAGE 2/D-DUR.png", audio: "PAGE 2/D-DUR.wav" },
    { img: "PAGE 2/A-DUR.png", audio: "PAGE 2/A-DUR.wav" },
    { img: "PAGE 2/E-DUR.png", audio: "PAGE 2/E-DUR.wav" },
    { img: "PAGE 2/A-moll.png", audio: "PAGE 2/A-moll.wav" },
    { img: "PAGE 2/D-moll.png", audio: "PAGE 2/D-moll.wav" },
    { img: "PAGE 2/E-moll.png", audio: "PAGE 2/E-moll.wav" }
];

let currentIndex = 0;
let isAudioEnabled = true; // Audio ist standardmäßig erlaubt, da User explizit auf PLAY klickt

// DOM Elemente
const wrapper = document.getElementById("slides-wrapper");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const finishBtn = document.getElementById("finish-btn");

function renderSlide(index) {
    wrapper.innerHTML = ""; // Container leeren
    const slideData = SLIDES[index];

    // Slide Container erstellen
    const slideEl = document.createElement("div");
    slideEl.className = "carousel-slide active";
    
    // Hintergrundbild
    slideEl.style.backgroundImage = `url('${slideData.img}')`;

    // Wenn ein Audio existiert, PLAY Button hinzufügen
    if (slideData.audio) {
        const playBtn = document.createElement("button");
        playBtn.className = "play-chord-btn";
        playBtn.innerHTML = "▶ PLAY";
        
        // Audio vorladen
        const audioObj = new Audio(slideData.audio);
        audioObj.preload = "auto";

        playBtn.addEventListener("click", () => {
            if (!isAudioEnabled) return;
            // Knopf visuell animieren (drücken)
            playBtn.classList.add("clicked");
            setTimeout(() => playBtn.classList.remove("clicked"), 200);

            // Audio abspielen
            const clone = audioObj.cloneNode();
            clone.volume = 1.0;
            clone.play().catch(e => console.log("Audio blockiert:", e));
        });

        slideEl.appendChild(playBtn);
    }

    wrapper.appendChild(slideEl);

    // Pfeile aktualisieren
    prevBtn.setAttribute("data-i18n", "navPrev");
    prevBtn.style.display = index === 0 ? "none" : "flex";
    
    if (index === SLIDES.length - 1) {
        nextBtn.style.display = "none";
        // 'Weiter zur Aufgabe 3' Button einblenden
        if (finishBtn) finishBtn.classList.remove("hidden");
    } else {
        nextBtn.style.display = "flex";
        if (index >= 2) {
            nextBtn.setAttribute("data-i18n", "navNextChord");
        } else if (index === 1) {
            nextBtn.setAttribute("data-i18n", "navToChords");
        } else {
            nextBtn.setAttribute("data-i18n", "navNextSimple");
        }
        if (finishBtn) {
            finishBtn.classList.add("hidden");
            finishBtn.setAttribute("data-i18n", "navNextSimple");
        }
    }
    
    // Texte sofort übersetzen
    if (typeof applyTranslations === 'function') {
        applyTranslations(currentLang);
    }
}

// Event Listener für Navigation
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderSlide(currentIndex);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < SLIDES.length - 1) {
        currentIndex++;
        renderSlide(currentIndex);
    }
});

// Initiale Slide im Hintergrund (hinter dem Overlay) laden
renderSlide(0);
