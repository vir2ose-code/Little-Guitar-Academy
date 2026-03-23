// main.js - Little Guitar Academy Interactive Elements

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link, .mobile-nav-links .btn');

    function toggleMenu() {
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }

    mobileMenuBtn?.addEventListener('click', toggleMenu);
    closeMenuBtn?.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 2. Sticky Navbar Background
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('appear');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('appear');
                }
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));

    // 4. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Stat Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let counted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                stats.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.innerText = target;
                        }
                    };

                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        statsObserver.observe(statsRow);
    }

    // --- Phase 57: Legal Modal Logic ---
    const modals = {
        safety: {
            trigger: document.getElementById('open-safety'),
            modal: document.getElementById('modal-safety')
        },
        privacy: {
            trigger: document.getElementById('open-privacy'),
            modal: document.getElementById('modal-privacy')
        }
    };

    function openModal(id) {
        if (modals[id] && modals[id].modal) {
            modals[id].modal.style.display = 'flex';
        }
    }

    function closeModal(modalEl) {
        if (modalEl) {
            modalEl.style.display = 'none';
        }
    }

    // Attach open listeners
    Object.keys(modals).forEach(key => {
        modals[key].trigger?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(key);
        });
    });

    // Attach close listeners
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        // Close on X btn
        overlay.querySelector('.modal-close')?.addEventListener('click', () => {
            closeModal(overlay);
        });
        // Close on background click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // --- Phase 65: Web3Forms Contact Form ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn-light');
            const originalText = submitBtn.innerHTML;

            // UI Feedback
            submitBtn.disabled = true;
            submitBtn.innerHTML = "⌛ ...";
            formStatus.innerHTML = "";
            formStatus.style.color = "white";

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: json
                });

                const result = await response.json();

                if (response.status === 200) {
                    formStatus.innerHTML = translations[currentLang]?.msgSuccess || "Gesendet!";
                    formStatus.style.color = "#4cff4c"; // Magisches Grün
                    contactForm.reset();
                } else {
                    console.error("Web3Forms error:", result);
                    formStatus.innerHTML = result.message || translations[currentLang]?.msgError || "Fehler!";
                    formStatus.style.color = "#ff4c4c";
                }
            } catch (error) {
                console.error("Network error:", error);
                formStatus.innerHTML = translations[currentLang]?.msgError || "Fehler!";
                formStatus.style.color = "#ff4c4c";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                // Meldung nach 5 Sekunden ausblenden
                setTimeout(() => {
                    formStatus.innerHTML = "";
                }, 5000);
            }
        });
    }
});
