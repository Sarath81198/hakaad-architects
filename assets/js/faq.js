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
// Random image from projects
// ===============================
function getRandomImage() {
  const randomProject = projects[Math.floor(Math.random() * projects.length)];
  return randomProject.image;
}

// ===============================
// Render FAQs
// ===============================
function renderFaqs() {
  const grid = document.getElementById("faq-grid");
  grid.innerHTML = "";

  faqs.forEach((faq) => {
    const image = getRandomImage();
    const card = document.createElement("div");
    card.className = "faq-card";
    card.dataset.id = faq.id;
    card.dataset.image = image;

    card.innerHTML = `
      <div class="faq-bg" style="background-image: url('${image}')"></div>
      <div class="faq-card-inner">
        <button class="faq-expand-btn" aria-label="Expand">
          <i class="bi bi-arrow-up-right"></i>
        </button>
        <div class="faq-question">
          <span class="faq-number">0${faq.id}</span>
          <h3>${faq.question}</h3>
        </div>
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ===============================
// Expand / Collapse
// ===============================
document.addEventListener("click", (e) => {
  const card = e.target.closest(".faq-card");
  if (!card) return;

  const isExpanded = card.classList.contains("expanded");

  // Collapse all
  document.querySelectorAll(".faq-card.expanded").forEach((c) => {
    c.classList.remove("expanded");
  });

  // Expand clicked if not already open
  if (!isExpanded) {
    card.classList.add("expanded");
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
    if (navbar) navbar.classList.add("visible");
    renderFaqs();
  });
});