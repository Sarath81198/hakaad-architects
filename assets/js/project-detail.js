// ===============================
// Component Loader
// ===============================
function loadComponent(id, filePath) {
  return fetch(filePath)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${filePath}`);
      return res.text();
    })
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((err) => console.error(err));
}

// ===============================
// Navbar Scroll
// ===============================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ===============================
// Hero Parallax
// ===============================
function initHeroParallax() {
  const hero = document.querySelector(".detail-hero");
  if (!hero) return;

  const img = hero.querySelector("img");
  if (!img) return;

  const isMobile = window.innerWidth <= 768;
  if (isMobile) return; // skip parallax on mobile entirely

  window.addEventListener("scroll", () => {
    img.style.transform = `translateY(${window.scrollY * 0.35}px)`;
  });
}

// ===============================
// Render Project
// ===============================
function renderProject() {
  const container = document.getElementById("project-detail");

  // Get project from URL
  const params = new URLSearchParams(window.location.search);
  const projectId = parseInt(params.get("id"));

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    container.innerHTML = `
      <div class="container text-center py-5">
        <h3>Project not found</h3>
        <a href="work.html">← Back to Work</a>
      </div>
    `;
    return;
  }

  // Same category prev/next
  const sameCategory = projects.filter((p) => p.category === project.category);
  const currentIndex = sameCategory.findIndex((p) => p.id === projectId);
  const prevProject = sameCategory[currentIndex - 1] || null;
  const nextProject = sameCategory[currentIndex + 1] || null;
  const showNav = sameCategory.length > 1;

  console.log("sameCategory length:", sameCategory.length);
  console.log("showNav:", showNav);
  console.log("prevProject:", prevProject?.title);
  console.log("nextProject:", nextProject?.title);

  container.innerHTML = `

    <!-- Hero Image -->
    <div class="detail-hero">
      <img src="${project.image}" alt="${project.title}" />
    </div>

    <!-- Content -->
    <div class="container detail-content">
      <div class="row">

        <!-- Left: Title + Description -->
        <div class="col-lg-7">
          <span class="detail-category">${project.category}</span>
          <h1 class="detail-title">${project.title}</h1>
          <p class="detail-description">${project.description || "A thoughtfully designed space that blends aesthetics with function, reflecting the values and vision of Haakad Architects."}</p>
        </div>

        <!-- Right: Meta -->
        <div class="col-lg-4 offset-lg-1">
          <div class="detail-meta">
            <div class="meta-row">
              <span class="meta-label">Typology</span>
              <span class="meta-value">${project.category}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Location</span>
              <span class="meta-value">${project.location || "Madurai, Tamil Nadu"}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Year</span>
              <span class="meta-value">${project.year || "—"}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Status</span>
              <span class="meta-value">${project.status || "—"}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Client</span>
              <span class="meta-value">${project.client || "—"}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Architects</span>
              <span class="meta-value">${project.architects || "Haakad Architects"}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Prev / Next Navigation -->
    ${showNav ? `
      <div class="detail-nav">

        ${prevProject ? `
          <div class="detail-nav-item prev" onclick="window.location.href='project-detail.html?id=${prevProject.id}'">
            <img src="${prevProject.image}" alt="${prevProject.title}" />
            <div class="detail-nav-overlay">
              <span>← Previous</span>
              <h4>${prevProject.title}</h4>
            </div>
          </div>
        ` : `<div class="detail-nav-item empty"></div>`}

        ${nextProject ? `
          <div class="detail-nav-item next" onclick="window.location.href='project-detail.html?id=${nextProject.id}'">
            <img src="${nextProject.image}" alt="${nextProject.title}" />
            <div class="detail-nav-overlay">
              <span>Next →</span>
              <h4>${nextProject.title}</h4>
            </div>
          </div>
        ` : `<div class="detail-nav-item empty"></div>`}

      </div>
    ` : ''}
  `;

  initHeroParallax();

    console.log("container HTML length:", container.innerHTML.length);
  console.log("showNav:", showNav);
  console.log("detail-nav exists:", document.querySelector(".detail-nav"));
}

// ===============================
// Init
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    loadComponent("navbar", "components/navbar.html"),
    loadComponent("footer", "components/footer.html"),
  ]).then(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.add("visible");
      navbar.classList.add("scrolled");
    }
    renderProject();
  });
});