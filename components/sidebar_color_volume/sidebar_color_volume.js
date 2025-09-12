const $btnSideColorVolume = document.querySelector(".btn-side-color-volume");
const $containerSidebar = document.querySelector(".container-sidebar");
const $paletteContainer = document.querySelector(".palette-container");
const $library = document.querySelector(".library-menu-sidebar");
const $librarySideBtn = document.querySelector(".tendon-container");
const $tendonRotate = document.querySelectorAll(".tendon");
const $libraryOverlayMobile = document.querySelector(".library-overlay-mobile");

$btnSideColorVolume.addEventListener("click", () => {
  $containerSidebar.classList.toggle("sideIsOpen");

  if ($library.classList.contains("show")) {
    $library.classList.remove("show");
    $librarySideBtn.classList.remove("rotate");
    $paletteContainer.classList.remove("sideIsOpen");
    $libraryOverlayMobile.classList.remove("show");
    $tendonRotate.forEach(($tendon) => {
      $tendon.classList.remove("rotate");
    });
  }
});
