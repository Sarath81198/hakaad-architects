// ================================
// Parallax - Mobile + Desktop
// ================================

function initParallax() {
  const parallaxSections = document.querySelectorAll(".parallax");

  if (!parallaxSections.length) return;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // JS-based parallax for mobile
    window.addEventListener("scroll", () => {
      parallaxSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = (scrolled - section.offsetTop) * 0.3;
        section.style.backgroundPosition = `center ${rate}px`;
      });
    });
  }
  // Desktop uses CSS background-attachment: fixed (already in parallax.css)
}

initParallax();
