document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  let index = 0;
  const slides = track.children;
  const total = slides.length;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(() => {
    index = (index + 1) % total;
    updateCarousel();
  }, 4000);
});
