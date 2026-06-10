document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const prevBtn = carousel.querySelector(".carousel-prev");
  const nextBtn = carousel.querySelector(".carousel-next");
  const dotsContainer = carousel.querySelector(".carousel-dots");

  const slides = Array.from(track.children);
  const total = slides.length;
  let index = 0;
  let timer;
  let userInteracted = false;

  // Build dots dynamically from slide count
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => { goTo(i); stopAutoAdvance(); });
    dotsContainer.appendChild(dot);
  });

  function updateCarousel() {
    track.style.transform = `translateX(-${index * carousel.offsetWidth}px)`;
    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function goTo(n) {
    index = ((n % total) + total) % total;
    updateCarousel();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startTimer() { timer = setInterval(next, 4000); }

  function stopAutoAdvance() {
    clearInterval(timer);
    userInteracted = true;
  }

  prevBtn.addEventListener("click", () => { prev(); stopAutoAdvance(); });
  nextBtn.addEventListener("click", () => { next(); stopAutoAdvance(); });

  // Touch swipe support
  let touchStartX = 0;
  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  carousel.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      stopAutoAdvance();
    }
  });

  // Pause on hover; only resume if user hasn't manually interacted
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", () => {
    if (!userInteracted) startTimer();
  });

  // Keep position correct after window resize
  window.addEventListener("resize", updateCarousel);

  updateCarousel();
  startTimer();
});
