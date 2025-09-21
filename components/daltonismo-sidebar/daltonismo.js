const $btnGlassOpen = document.querySelector(".btn-side-glass");
const $containerSidebar = document.querySelector(".container-sidebar");
const $containerSidebarDaltonico = document.querySelector(".daltonico");
const $paletteContainer = document.querySelector(".palette-container");
const $library = document.querySelector(".library-menu-sidebar");
const $librarySideBtn = document.querySelector(".tendon-container");
const $tendonRotate = document.querySelectorAll(".tendon");
const $libraryOverlayMobile = document.querySelector(".library-overlay-mobile");

$btnGlassOpen &&
  $btnGlassOpen.addEventListener("click", () => {
    $containerSidebarDaltonico.classList.toggle("sideIsOpen");
    if (
      $containerSidebarDaltonico.classList.contains("sideIsOpen") &&
      ($library.classList.contains("show") ||
        $containerSidebar.classList.contains("sideIsOpen"))
    ) {
      $library.classList.remove("show");
      $librarySideBtn.classList.remove("rotate");
      $paletteContainer.classList.remove("sideIsOpen");
      $libraryOverlayMobile.classList.remove("show");
      $containerSidebar.classList.remove("sideIsOpen");
      $tendonRotate.forEach(($tendon) => {
        $tendon.classList.remove("rotate");
      });
    }
  });
