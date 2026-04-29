// ===============================
// Open Article in Modal (NO REDIRECT)
// ===============================
const articleTrigger = document.getElementById("openArticle");
const modalEl = document.getElementById("articleModal");
const iframe = document.getElementById("articleFrame");

if (articleTrigger) {
  articleTrigger.addEventListener("click", function (e) {
    e.preventDefault();       // 🚫 stop navigation
    e.stopPropagation();      // 🚫 extra safety

    const modal = new bootstrap.Modal(modalEl);

    // Set iframe URL
    iframe.src =
      "https://thearchitectsdiary.com/the-interior-of-this-house-in-chennai-is-one-of-a-kind-haakad-architects-designers/";

    modal.show();
  });
}

// ===============================
// Clear iframe when modal closes
// ===============================
if (modalEl) {
  modalEl.addEventListener("hidden.bs.modal", function () {
    iframe.src = ""; // stop loading in background
  });
}