// Project Data Configuration
// Yeni proje eklemek için bu listeye yeni bir obje ekleyin.
// To add a new project, add a new object to this list.
const projectsData = [
  {
    id: "lurker-jett",
    category: "ongoing", // Seçenekler: 'ongoing', 'planned', 'completed'
    icon: "fas fa-robot",
    title: "Vexorex",
    description: {
      tr: "Discord Bot - Oyuncuların istatistiklerini paylaşan bot.",
      en: "Discord Bot - A bot sharing gamers' game stats."
    },
    tags: ["Node.js", "Discord.js"],
  },

  {
    id: "floodSwitch",
    category: "planned",
    icon: "fa-solid fa-bolt",
    title: "floodSwitch",
    description: {
      tr: "Açık kaynak, maker dostu ve bütçe dostu DIY Wi-Fi röle.",
      en: "Open-source, maker-friendly, and cost-effective DIY Wi-Fi relay."
    },
    tags: ["esp", "Home Assistant"]
  },

  {
    id: "shareyoursets",
    category: "planned",
    icon: "fas fa-share-alt",
    title: "ShareYourSets",
    description: {
      tr: "Sosyal platform - Oyuncuların setup'larını ve oyun ayarlarını paylaştığı platform.",
      en: "Social platform - A platform where gamers share their setups and game settings."
    },
    tags: ["React", "Firebase"]
  },

  {
    id: "smart-file-organizer",
    category: "completed",
    icon: "fa-solid fa-folder-open",
    title: "Smart File Organizer",
    description: {
      tr: "Dosya yönetim arayüzü - Dosyalarınızı otomatik olarak organize eden arayüz.",
      en: "File management interface - An interface that automatically organizes your files."
    },
    tags: ["Python", "CustomTkinter"],
    url: "https://github.com/justflood/smart-file-organizer"
  }
];

// Render Function
function renderProjects(lang) {
  // Clear existing content
  const categories = ['ongoing', 'planned', 'completed',];
  categories.forEach(cat => {
    const grid = document.getElementById(`grid-${cat}`);
    if (grid) grid.innerHTML = '';
  });

  // Render each project
  projectsData.forEach(project => {
    const grid = document.getElementById(`grid-${project.category}`);
    if (!grid) return;

    // Use 'a' tag if url exists, otherwise 'div'
    const card = document.createElement(project.url ? 'a' : 'div');
    card.className = `project-card ${project.category}`;

    if (project.url) {
      card.href = project.url;
      card.target = "_blank"; // Open in new tab
      card.rel = "noopener noreferrer"; // Security best practice
      card.style.display = "block"; // Ensure it behaves like a block
      card.style.textDecoration = "none"; // Remove underline
      card.style.color = "inherit"; // Keep text color
    }

    // Create tags HTML
    const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');

    card.innerHTML = `
            <div class="card-header">
                <i class="${project.icon}"></i>
                <h4>${project.title}</h4>
            </div>
            <p>${project.description[lang]}</p>
            <div class="card-tags">
                ${tagsHtml}
            </div>
        `;

    grid.appendChild(card);
  });
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
  // Check if currentLang is defined globally, otherwise default to 'tr'
  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'tr';
  renderProjects(lang);
});

