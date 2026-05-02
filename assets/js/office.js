// ===============================
// Open Article in Modal (MULTIPLE TRIGGERS)
// ===============================
const articleTriggers = document.querySelectorAll(".openArticle");
const modalEl = document.getElementById("articleModal");
const iframe = document.getElementById("articleFrame");

if (articleTriggers.length > 0) {
  articleTriggers.forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const modal = new bootstrap.Modal(modalEl);

      iframe.src =
        "https://thearchitectsdiary.com/the-interior-of-this-house-in-chennai-is-one-of-a-kind-haakad-architects-designers/";

      modal.show();
    });
  });
}

// ===============================
// Clear iframe when modal closes
// ===============================
if (modalEl) {
  modalEl.addEventListener("hidden.bs.modal", function () {
    iframe.src = "";
  });
}