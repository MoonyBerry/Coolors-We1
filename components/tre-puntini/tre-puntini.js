const $openBtn = document.querySelector(".dots-menu-container");
const $modal = document.querySelector(".general-three-dot-container");
const $dotsMenu = document.querySelectorAll("div.dots-menu");
const $dotMenuContainer = document.querySelector("div.dots-menu-container");

// Apri modal
$openBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  $modal.classList.toggle("active");
  if ($modal.classList.contains("active")) {
    $dotsMenu.forEach((dot) => dot.classList.add("rotate"));
    $dotMenuContainer.classList.add("rotate");
  } else {
    $dotsMenu.forEach((dot) => dot.classList.remove("rotate"));
    $dotMenuContainer.classList.remove("rotate");
  }
});

// Chiudi modal
document.addEventListener("click", (event) => {
  if (
    $modal.classList.contains("active") &&
    !$modal.contains(event.target) &&
    !$openBtn.contains(event.target)
  ) {
    $modal.classList.remove("active");
    $dotsMenu.forEach((dot) => dot.classList.remove("rotate"));
    $dotMenuContainer.classList.remove("rotate");
  }
});
