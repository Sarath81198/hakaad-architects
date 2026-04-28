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
  grid.innerHTML = "";

  const filtered =
    currentFilter === "all"
      ? projects
      : projects.filter((p) => p.category === currentFilter);

  const visibleProjects = filtered.slice(0, visibleCount);

  visibleProjects.forEach((project) => {
    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6";

    col.innerHTML = `
      <div class="project-card">
        <div class="project-img">
          <img src="${project.image}" alt="${project.title}" loading="lazy" />
          <div class="project-overlay">
            <a href="project-detail.html?id=${project.id}">
              <i class="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </div>
        <div class="project-info">
          <span>${project.category}</span>
          <h3>${project.title}</h3>
        </div>
      </div>
    `;

    grid.appendChild(col);
  });

  const btn = document.getElementById("load-more-btn");
  btn.style.display = visibleCount >= filtered.length ? "none" : "block";
}

// ===============================
// Filter
// ===============================
function applyFilter(filter) {
  currentFilter = filter;
  visibleCount = ITEMS_PER_PAGE;
  renderProjects();
}

// ===============================
// Load More
// ===============================
function loadMore() {
  visibleCount += ITEMS_PER_PAGE;
  renderProjects();
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
  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");

  renderProjects(); // default = architecture
});
