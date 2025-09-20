const $openBtn = document.querySelector(".dots-menu-container");
const $modal = document.querySelector(".general-three-dot-container");

// Apri modal
$openBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  $modal.classList.add("active");
});

// Chiudi modal
document.addEventListener("click", (event) => {
  if (
    $modal.classList.contains("active") &&
    !$modal.contains(event.target) &&
    !$openBtn.contains(event.target)
  ) {
    $modal.classList.remove("active");
  }
});
