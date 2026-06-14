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
// Floating Nav — stop at footer
// ===============================
function initFloatingNav() {
  const nav = document.querySelector(".detail-nav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const bottomOffset = 30;

    if (footerTop < windowHeight) {
      const overlap = windowHeight - footerTop;
      nav.style.bottom = `${overlap + bottomOffset}px`;
    } else {
      nav.style.bottom = `${bottomOffset}px`;
    }
  });
}

// ===============================
// Hero Carousel
// ===============================
function initHeroCarousel(images) {
  if (!images || images.length === 0) return;

  const track = document.querySelector(".hero-carousel-track");
  const dotsContainer = document.querySelector(".hero-carousel-dots");
  const leftArrow = document.querySelector(".hero-arrow.left");
  const rightArrow = document.querySelector(".hero-arrow.right");

  if (!track) return;

  let currentIndex = 0;
  let isAnimating = false;

  // Build cards and dots
  images.forEach((src, i) => {
    const card = document.createElement("div");
    card.className = "hero-card";
    card.dataset.index = i;
    card.innerHTML = `<img src="${src}" alt="Project image ${i + 1}" />`;
    track.appendChild(card);

    const dot = document.createElement("div");
    dot.className = "hero-dot";
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  });

  const cards = track.querySelectorAll(".hero-card");
  const dots = dotsContainer.querySelectorAll(".hero-dot");

  // Hide arrows if only one image
  if (images.length <= 1) {
    leftArrow && (leftArrow.style.display = "none");
    rightArrow && (rightArrow.style.display = "none");
    dotsContainer.style.display = "none";
  }

  function updateCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cards.length) % cards.length;

    cards.forEach((card, i) => {
      const offset = (i - currentIndex + cards.length) % cards.length;
      card.className = "hero-card";

      if (offset === 0) card.classList.add("center");
      else if (offset === 1) card.classList.add("right-1");
      else if (offset === 2) card.classList.add("right-2");
      else if (offset === cards.length - 1) card.classList.add("left-1");
      else if (offset === cards.length - 2) card.classList.add("left-2");
      else card.classList.add("hidden");
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  // Arrow clicks
  leftArrow?.addEventListener("click", () => updateCarousel(currentIndex - 1));
  rightArrow?.addEventListener("click", () => updateCarousel(currentIndex + 1));

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => updateCarousel(i));
  });

  // Card clicks
  cards.forEach((card, i) => {
    card.addEventListener("click", () => updateCarousel(i));
  });

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
    if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
  });

  // Swipe
  let touchStartX = 0;
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  document.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      updateCarousel(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
  });

  updateCarousel(0);
}

// ===============================
// Render Project
// ===============================
function renderProject() {
  const container = document.getElementById("project-detail");

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

  const sameCategory = projects.filter((p) => p.category === project.category);
  const currentIndex = sameCategory.findIndex((p) => p.id === projectId);
  const prevProject = sameCategory[currentIndex - 1] || null;
  const nextProject = sameCategory[currentIndex + 1] || null;
  const showNav = sameCategory.length > 1;

  const heroImages =
    project.images && project.images.length > 1
      ? project.images
      : [project.image];

  container.innerHTML = `

    <!-- Hero Carousel -->
    <div class="detail-hero">
      <button class="hero-arrow left">‹</button>
      <div class="hero-carousel-track"></div>
      <button class="hero-arrow right">›</button>
      <div class="hero-carousel-dots"></div>
    </div>

    <!-- Content -->
    <div class="container detail-content">
      <div class="row">

        <div class="col-lg-7">
          <span class="detail-category">${project.category}</span>
          <h1 class="detail-title">${project.title}</h1>
          <p class="detail-description">${project.description || "A thoughtfully designed space that blends aesthetics with function, reflecting the values and vision of Haakad Architects."}</p>
        </div>

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
    ${
      showNav
        ? `
      <div class="detail-nav">

        ${
          prevProject
            ? `
          <div class="detail-nav-item prev" onclick="window.location.href='project-detail.html?id=${prevProject.id}'">
            <img class="nav-bg" src="${prevProject.image}" alt="" />
            <img class="nav-thumb" src="${prevProject.image}" alt="${prevProject.title}" />
            <span class="nav-label">← Prev</span>
            <div class="detail-nav-overlay">
              <span>← Previous</span>
              <h4>${prevProject.title}</h4>
            </div>
          </div>
        `
            : `<div class="detail-nav-item empty"></div>`
        }

        ${
          nextProject
            ? `
          <div class="detail-nav-item next" onclick="window.location.href='project-detail.html?id=${nextProject.id}'">
            <img class="nav-bg" src="${nextProject.image}" alt="" />
            <img class="nav-thumb" src="${nextProject.image}" alt="${nextProject.title}" />
            <span class="nav-label">Next →</span>
            <div class="detail-nav-overlay">
              <span>Next →</span>
              <h4>${nextProject.title}</h4>
            </div>
          </div>
        `
            : `<div class="detail-nav-item empty"></div>`
        }

      </div>
    `
        : ""
    }
  `;

  initHeroCarousel(heroImages);
  initFloatingNav();
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
