document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  const images = document.querySelectorAll(".event-image, .gallery-image");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.dataset.full || img.src;
      lightbox.classList.remove("hidden");
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.add("hidden");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
    }
  });
});
