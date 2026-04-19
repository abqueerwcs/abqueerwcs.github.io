document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".dropdown-toggle");
  const menu = document.querySelector(".dropdown-menu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    menu.classList.remove("open");
  }
});
