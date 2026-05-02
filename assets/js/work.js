// ===============================
// Component Loader
// ===============================
function loadComponent(id, filePath) {
  return fetch(filePath)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    });
}

// ===============================
// Navbar Scroll Effect
// ===============================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ===============================
// Config
// ===============================
const ITEMS_PER_PAGE = 6;
let currentFilter = "architecture";
let visibleCount = ITEMS_PER_PAGE;

const grid = document.getElementById("projects-grid");

// ===============================
// Render Projects
// ===============================
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  projects.forEach((project) => {
    const col = document.createElement("div");
    col.className = `col-lg-4 col-md-6 project-item ${project.category}`;

    col.innerHTML = `
      <div class="project-card">
        <div class="project-img">
          <img src="${project.image}" alt="${project.title}" />
          <div class="project-overlay">
            <a href="project-detail.html?id=${project.id}" class="project-link">
              <i class="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </div>
        <div class="project-info">
          <span class="project-category">${project.category}</span>
          <h3 class="project-title">${project.title}</h3>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

// ===============================
// Filter
// ===============================
function applyFilter(filter) {
  const items = document.querySelectorAll(".project-item");

  items.forEach((item) => {
    if (filter === "all" || item.classList.contains(filter)) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

// ===============================
// Events
// ===============================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-btn")) {
    document
      .querySelectorAll(".filter-btn")
      .forEach((btn) => btn.classList.remove("active"));

    e.target.classList.add("active");
    applyFilter(e.target.dataset.filter);
  }

  if (e.target.id === "load-more-btn") {
    loadMore();
  }
});

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
      // navbar.classList.add("scrolled"); // force white
    }
    renderProjects();
  });
});
