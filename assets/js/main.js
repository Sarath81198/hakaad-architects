function loadComponent(id, filePath) {
  return fetch(filePath)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${filePath}`);
      return response.text();
    })
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((error) => console.error("Component load error:", error));
}

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hide");
  setTimeout(() => {
    preloader.style.display = "none";

    // Small delay to ensure navbar is in DOM
    setTimeout(() => {
      const navbar = document.querySelector(".navbar");
      console.log("navbar found:", navbar); // debug - check console
      if (navbar) navbar.classList.add("visible");
    }, 100);
  }, 800);
}

// Scroll listener
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

const minDelay = new Promise((resolve) => setTimeout(resolve, 3000));

const componentsLoaded = Promise.all([
  loadComponent("hero-carousel", "components/hero-carousel.html"),
  loadComponent("navbar", "components/navbar.html"),
  loadComponent("clients-section", "components/clients.html"),
  loadComponent("footer", "components/footer.html"),
  loadComponent("testimonials-section", "components/testimonials.html")
]);

Promise.all([minDelay, componentsLoaded]).then(() => {
  const carouselEl = document.getElementById("heroCarousel");
  new bootstrap.Carousel(carouselEl, {
    interval: false,
    ride: false,
    pause: false,
    touch: true,
  });

  carouselEl.style.setProperty("--bs-carousel-transition-duration", "0ms");

  carouselEl.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    { passive: false },
  );

  hidePreloader();
});

const navbar = document.querySelector(".navbar");
const toggler = document.querySelector(".navbar-toggler");
const collapse = document.querySelector(".navbar-collapse");

if (toggler && collapse && navbar) {
  collapse.addEventListener("show.bs.collapse", () => {
    navbar.classList.add("menu-open");
  });

  collapse.addEventListener("hide.bs.collapse", () => {
    navbar.classList.remove("menu-open");
  });
}