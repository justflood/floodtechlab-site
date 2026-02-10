// Language Data
const langData = {
    tr: {
        nav_home: "Ana Sayfa",
        nav_about: "Hakkımda",
        nav_projects: "Projeler",
        nav_contact: "İletişim",
        hero_subtitle: "Fikirleri Koda Dönüştürüyorum",
        hero_cta: "Projeleri Keşfet",
        about_title: "Hakkımda",
        about_text: "Ben Furkan SEL, bilgisayar mühendisliği 1. sınıf öğrencisiyim. Teknolojiye olan tutkumla, full-stack web geliştirme, gömülü sistemler ve IoT projelerine merak salmış bir geliştirici adayıyım. Kod yazmayı, yeni teknolojileri keşfetmeyi ve problem çözmeyi seviyorum. Öğrenme ve gelişme yolculuğumda, FloodTechLab çatısı altında yaratıcı projeler geliştirmeye odaklanıyorum.",
        projects_title: "Project Pipeline",
        cat_ongoing: "Ongoing (Devam Eden)",
        cat_planned: "Planned (Planlanan)",
        cat_completed: "Completed (Biten)",
        contact_title: "İletişim",
        contact_text: "Projelerim hakkında konuşmak veya iş birliği yapmak için bana ulaşın.",
        contact_btn: "Mail Gönder"
    },
    en: {
        nav_home: "Home",
        nav_about: "About Me",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_subtitle: "Turning Ideas into Code",
        hero_cta: "Discover Projects",
        about_title: "About Me",
        about_text: "I am Furkan SEL, a 1st-year Computer Engineering student. Driven by my passion for technology, I am an aspiring developer interested in full-stack web development, embedded systems and IoT projects. I love coding, exploring new technologies, and solving problems. In my learning and development journey, I focus on developing creative projects under the roof of FloodTechLab.",
        projects_title: "Project Pipeline",
        cat_ongoing: "Ongoing",
        cat_planned: "Planned",
        cat_completed: "Completed",
        contact_title: "Contact",
        contact_text: "Contact me to discuss my projects or for collaboration.",
        contact_btn: "Send Mail"
    }
};

// Current Language State
let currentLang = 'en';
let typed; // Typed.js instance

// DOM Elements
const langSwitchBtn = document.getElementById('lang-switch');
const langElements = document.querySelectorAll('[data-lang]');

// Initialize Particles.js
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#00A8FF"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00A8FF",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 0.5
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Initialize Typed.js
function initTyped(text) {
    if (typed) {
        typed.destroy();
    }

    typed = new Typed('#typed-text', {
        strings: [text],
        typeSpeed: 50,
        backSpeed: 30,
        loop: false,
        showCursor: true,
        cursorChar: '|'
    });
}

// Initial Typed Call
initTyped(langData[currentLang].hero_subtitle);

// Language Switch Function
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'tr' : 'en';
    langSwitchBtn.textContent = currentLang === 'en' ? 'TR' : 'EN';

    langElements.forEach(el => {
        const key = el.getAttribute('data-lang');
        // Skip subtitle as it's handled by Typed.js
        if (key === 'hero_subtitle') return;

        if (langData[currentLang][key]) {
            el.textContent = langData[currentLang][key];
        }
    });

    // Re-init Typed.js with new language
    initTyped(langData[currentLang].hero_subtitle);
}

// Event Listeners
langSwitchBtn.addEventListener('click', toggleLanguage);

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    if (navLinks.style.display === 'flex') {
        navLinks.style.display = '';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.right = '20px';
        navLinks.style.background = '#1e1e1e';
        navLinks.style.padding = '20px';
        navLinks.style.borderRadius = '10px';
        navLinks.style.border = '1px solid #333';
    }
});
