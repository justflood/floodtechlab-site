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
    tags: ["Node.js", "Discord.js"]
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
  }
];

// Render Function
function renderProjects(lang) {
  // Clear existing content
  const categories = ['ongoing', 'planned', 'completed'];
  categories.forEach(cat => {
    const grid = document.getElementById(`grid-${cat}`);
    if (grid) grid.innerHTML = '';
  });

  // Render each project
  projectsData.forEach(project => {
    const grid = document.getElementById(`grid-${project.category}`);
    if (!grid) return;

    const card = document.createElement('div');
    card.className = `project-card ${project.category}`;

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
