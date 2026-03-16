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
const backArrow = document.getElementById("top-nav-back");
const nextArrow = document.getElementById("top-nav-next");

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
}

// Event Listener für Navigation
backArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderSlide(currentIndex);
    } else {
        // Vom ersten Slide zurück zur Stimmung 2
        window.location.href = "Stimmung 2.html";
    }
});

nextArrow.addEventListener("click", () => {
    if (currentIndex < SLIDES.length - 1) {
        currentIndex++;
        renderSlide(currentIndex);
    } else {
        // Vom letzten Slide weiter zur Aufgabe 3
        window.location.href = "Aufgabe 3.html";
    }
});

// Initiale Slide im Hintergrund (hinter dem Overlay) laden
renderSlide(0);
