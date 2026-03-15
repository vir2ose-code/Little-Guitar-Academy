const translations = {
    de: {
        langSelectTitle: "SPRACHAUSWAHL",
        welcomeTitle: "HERZLICH WILLKOMMEN",
        welcomeSubtitle: "GIB DEINEN VORNAMEN EIN",
        namePlaceholder: "Dein Name...",
        btnStart: "Ab ins Gitarren-Studio",
        page1Title: "Aufgabe 1. Die Seitenstimmung",
        btnNext: "Weiter zur Aufgabe 2. ➡",
        backBtn: "⬅ Zurück",
        magicTextStart: "Tippe hier, um die Magie zu wecken",
        trustTitle: "ÜBER DIESE APP",
        trustIntro: "Hinter der Little Guitar Academy steht geballte Expertise:",
        trustPoint1: "• Pädagogische Erfahrung: Als ehemaliger Musiklehrer weiß ich genau, wie man komplexe Inhalte für kleine Hände (6–8 Jahre) greifbar macht.",
        trustPoint2: "• Audio-Exzellenz (HOFA): Als zertifizierter Songwriter, Mix- & Mastering-Engineer sowie Musikproduzent sorge ich dafür, dass jedes „Pling“ und jeder Akkord in der App in Studioqualität erklingt.",
        trustPoint3: "• Visuelle Professionalität (IHK): Mein Abschluss als Mediengestalter Bild & Ton garantiert ein modernes, intuitives und technisch sauberes Interface, das Kinder begeistert und Eltern überzeugt.",
        contactTitle: "KONTAKT",
        privacyTitle: "DATENSCHUTZ",
        btnNextToContact: "Weiter zu Kontakt ➡",
        btnBackToStart: "Zurück zum Start 🏠",
        navPrev: "⬅ Zurück",
        navNextSimple: "Weiter ➡",
        navToChords: "Zu den Akkorden ➡",
        navNextChord: "Zum nächsten Akkord ➡"
    },
    en: {
        langSelectTitle: "LANGUAGE",
        welcomeTitle: "WELCOME",
        welcomeSubtitle: "ENTER YOUR FIRST NAME",
        namePlaceholder: "Your Name...",
        btnStart: "To the Guitar Studio",
        page1Title: "Task 1. Guitar Tuning",
        btnNext: "Continue to Task 2. ➡",
        backBtn: "⬅ Back",
        magicTextStart: "Tap here to awaken the magic",
        trustTitle: "ABOUT THIS APP",
        trustIntro: "A team of experts stands behind Little Guitar Academy:",
        trustPoint1: "• Pedagogical Experience: As a former music teacher, I know exactly how to make complex subjects accessible for small hands (6–8 years).",
        trustPoint2: "• Audio Excellence (HOFA): As a certified songwriter, mix & mastering engineer, and music producer, I ensure every 'pling' and chord in the app sounds in studio quality.",
        trustPoint3: "• Visual Professionalism (IHK): My degree as a Media Designer for Image & Sound guarantees a modern, intuitive, and technically clean interface that inspires children and convinces parents.",
        contactTitle: "CONTACT",
        privacyTitle: "PRIVACY POLICY",
        btnNextToContact: "Continue to Contact ➡",
        btnBackToStart: "Back to Start 🏠",
        navPrev: "⬅ Back",
        navNextSimple: "Next ➡",
        navToChords: "To the Chords ➡",
        navNextChord: "To the next chord ➡"
    },
    pl: {
        langSelectTitle: "WYBÓR JĘZYKA",
        welcomeTitle: "WITAJ",
        welcomeSubtitle: "WPISZ SWOJE IMIĘ",
        namePlaceholder: "Twoje Imię...",
        btnStart: "Do Studia Gitarowego",
        page1Title: "Zadanie 1. Strojenie Gitary",
        btnNext: "Przejdź do zadania 2. ➡",
        backBtn: "⬅ Wróć",
        magicTextStart: "Dotknij tutaj, aby obudzić magię",
        trustTitle: "O TEJ APLIKACJI",
        trustIntro: "Za Little Guitar Academy stoi skumulowana wiedza specjalistyczna:",
        trustPoint1: "• Doświadczenie pedagogiczne: Jako były nauczyciel muzyki wiem dokładnie, jak sprawić, by złożone treści były przystępne dla małych rączek (6–8 lat).",
        trustPoint2: "• Doskonałość dźwięku (HOFA): Jako certyfikowany autor piosenek, inżynier miksu i masteringu oraz producent muzyczny dbam o to, by każda nuta i akord w aplikacji brzmiały w jakości studyjnej.",
        trustPoint3: "• Wizualny profesjonalizm (IHK): Mój dyplom projektanta mediów obrazu i dźwięku gwarantuje nowoczesny, intuicyjny i technicznie czysty interfejs, który zachwyca dzieci i przekonuje rodziców.",
        contactTitle: "KONTAKT",
        privacyTitle: "POLITYKA PRYWATNOŚCI",
        btnNextToContact: "Przejdź do kontaktu ➡",
        btnBackToStart: "Wróć do początku 🏠",
        navPrev: "⬅ Wróć",
        navNextSimple: "Dalej ➡",
        navToChords: "Do akordów ➡",
        navNextChord: "Do następnego akordu ➡"
    },
    es: {
        langSelectTitle: "IDIOMA",
        welcomeTitle: "BIENVENIDO",
        welcomeSubtitle: "INTRODUCE TU NOMBRE",
        namePlaceholder: "Tu Nombre...",
        btnStart: "Al Estudio de Guitarra",
        page1Title: "Tarea 1. Afinación",
        btnNext: "Continuar a la Tarea 2. ➡",
        backBtn: "⬅ Volver",
        magicTextStart: "Toca aquí para despertar la magia",
        trustTitle: "SOBRE ESTA APP",
        trustIntro: "Detrás de Little Guitar Academy hay una gran experiencia:",
        trustPoint1: "• Experiencia pedagógica: Como ex profesor de música, sé exactamente cómo hacer que contenidos complejos sean accesibles para manos pequeñas (6–8 años).",
        trustPoint2: "• Excelencia de audio (HOFA): Como compositor certificado, ingeniero de mezcla y masterización y productor musical, me aseguro de que cada 'pling' y cada acorde de la aplicación suene con calidad de estudio.",
        trustPoint3: "• Profesionalidad visual (IHK): Mi título de diseñador de medios de imagen y sonido garantiza una interfaz moderna, intuitiva y técnicamente limpia que entusiasma a los niños y convence a los padres.",
        contactTitle: "CONTACTO",
        privacyTitle: "POLÍTICA DE PRIVACIDAD",
        btnNextToContact: "Continuar a Contacto ➡",
        btnBackToStart: "Volver al Inicio 🏠",
        navPrev: "⬅ Volver",
        navNextSimple: "Continuar ➡",
        navToChords: "A los acordes ➡",
        navNextChord: "Al siguiente acorde ➡"
    }
};

// Aktuelle Sprache aus localStorage laden oder Standard (de)
let currentLang = localStorage.getItem("appLang") || "de";

// Funktion zum Anwenden der Übersetzungen
function applyTranslations(lang) {
    currentLang = lang;
    localStorage.setItem("appLang", lang);

    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            // Spezialfall für Platzhalter in Input-Feldern
            if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) {
                el.placeholder = translations[lang][key];
            } 
            // Spezialfall für unseren bunten Willkommenstext
            else if (el.classList.contains("welcome-title")) {
                const text = translations[lang][key];
                // Jeden Buchstaben in ein Span packen für die CSS nth-child Farben!
                el.innerHTML = text.split("").map(char => {
                    return char === " " ? "&nbsp;" : `<span>${char}</span>`;
                }).join("");
            } 
            // Standard Text-Ersetzung
            else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Aktive Flagge hervorheben
    const flags = document.querySelectorAll(".lang-flag");
    flags.forEach(flag => {
        if (flag.getAttribute("data-lang") === lang) {
            flag.classList.add("active");
        } else {
            flag.classList.remove("active");
        }
    });

    // Wenn wir in Aufgabe 2 sind, Slide neu rendern um Texte in den Buttons zu fixen
    if (typeof renderSlide === 'function' && typeof currentIndex !== 'undefined') {
        // Wir rufen nur applyTranslations für die neu gesetzten data-i18n auf
        // (renderSlide selbst aufzurufen wäre ein Loop, also updaten wir nur die Attribute)
    }
}

// Event Listener für die Sprach-Buttons (Flaggen)
document.addEventListener("DOMContentLoaded", () => {
    // Wenn geladen, wende die gespeicherte Sprache an
    applyTranslations(currentLang);

    const flags = document.querySelectorAll(".lang-flag");
    flags.forEach(flag => {
        flag.addEventListener("click", () => {
            const selectedLang = flag.getAttribute("data-lang");
            applyTranslations(selectedLang);
        });
    });
});
