// Language Data
const langData = {
  tr: {
    nav_home: "Ana Sayfa",
    nav_about: "Hakkımda",
    nav_projects: "Projeler",
    nav_contact: "İletişim",
    hero_subtitle: "Fikirleri Koda Dönüştürüyoruz",
    hero_cta: "Projeleri Keşfet",
    about_title: "Hakkımda",
    about_text: "Ben Furkan SEL, bilgisayar mühendisliği 1. sınıf öğrencisiyim. Teknolojiye olan tutkumla, full-stack web geliştirme, gömülü sistemler ve IoT projelerine merak salmış bir geliştirici adayıyım. Kod yazmayı, yeni teknolojileri keşfetmeyi ve problem çözmeyi seviyorum. Öğrenme ve gelişme yolculuğumda, FloodTechLab çatısı altında yaratıcı projeler geliştirmeye odaklanıyorum.",
    projects_title: "Proje Süreci",
    cat_ongoing: "Devam Eden",
    cat_planned: "Planlanan",
    cat_completed: "Tamamlanan",
    contact_title: "İletişim",
    contact_text: "Projelerim hakkında konuşmak veya iş birliği yapmak için bana ulaşın.",
    contact_btn: "Mail Gönder",
    contact_copied: "Mail Kopyalandı!"
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
    contact_btn: "Send Mail",
    contact_copied: "Mail Copied!"
  }
};

// Current Language State
let currentLang = 'tr';
let typed; // Typed.js instance

// DOM Elements
const langSwitchBtn = document.getElementById('lang-switch');
const langElements = document.querySelectorAll('[data-lang]');

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
  currentLang = currentLang === 'tr' ? 'en' : 'tr';
  langSwitchBtn.textContent = currentLang === 'tr' ? 'EN' : 'TR';

  langElements.forEach(el => {
    const key = el.getAttribute('data-lang');
    // Skip subtitle as it's handled by Typed.js
    if (key === 'hero_subtitle') return;

    if (langData[currentLang][key]) {
      el.textContent = langData[currentLang][key];
    }
  });

  // Re-initialize Typed.js with the new language text
  initTyped(langData[currentLang].hero_subtitle);

  // Re-render projects if function exists
  if (typeof renderProjects === 'function') {
    renderProjects(currentLang);
  }
}

// Event Listener for Language Switch
if (langSwitchBtn) {
  langSwitchBtn.addEventListener('click', toggleLanguage);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
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
      navLinks.style.zIndex = '1000';
    }
  });
}

// Contact Button - Copy to Clipboard & Mailto
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
  contactBtn.addEventListener('click', function (e) {
    // We allow the default mailto action to proceed (so it tries to open mail app)
    // BUT we also copy the email to clipboard for users without a mail app.

    const email = "floodtechlab@gmail.com";
    const originalContent = this.innerHTML;

    navigator.clipboard.writeText(email).then(() => {
      // Visual feedback
      this.innerHTML = `<i class="fas fa-check"></i> ${langData[currentLang].contact_copied}`;
      this.style.background = "#2ecc71"; // Green color for success
      this.style.borderColor = "#2ecc71";

      setTimeout(() => {
        this.innerHTML = originalContent;
        this.style.background = ""; // Revert to CSS default
        this.style.borderColor = "";
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  });
}
// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.form-submit-btn');
    const originalBtnText = submitBtn.innerHTML;

    // Change button state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    const formData = new FormData(this);

    fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Success
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // Optional: Reset form
        contactForm.reset();
      } else {
        // Error
        alert("Oops! Bir şeyler ters gitti. Lütfen daha sonra tekrar dene.");
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    }).catch(error => {
      // Network Error
      alert("Oops! Bir şeyler ters gitti. Lütfen daha sonra tekrar dene.");
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    });
  });
}
