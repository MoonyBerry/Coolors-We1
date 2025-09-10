const $btnselectimage = document.querySelector(
  ".btn-modal-select-image-secondary-navbar"
);
const $modalSelectImage = document.querySelector(
  ".container-modal-select-image"
);
const $btnXModalSelctIimage = document.querySelector(".btnX-modal-selct-image");

const $overlay = document.querySelector(".overlay-modal");

/* Aggiunge e rimuove la visibilita al modal-select-image */
$btnselectimage.addEventListener("click", (e) => {
  e.preventDefault();
  $modalSelectImage.classList.add("is-visible");
  $overlay.classList.add("is-visible");
});

$btnXModalSelctIimage.addEventListener("click", () => {
  $modalSelectImage.classList.remove("is-visible");
  $overlay.classList.remove("is-visible");
});

/////alterna la colorazione dei pulsanti del modal seleziona immagine e anche la visualizzazione dei box del modal
const $buttons = document.querySelectorAll(".button-modal-select-image");
const $boxs = document.querySelectorAll(".box-main");
$buttons.forEach(($button) => {
  $button.addEventListener("click", function () {
    $buttons.forEach(($buttonCss) => {
      $buttonCss.classList.remove("active-btn-modal-select-image");
    });
    $boxs.forEach(($box) => {
      $box.style.display = "none";
    });
    document.querySelector(
      "." + this.getAttribute("data-target")
    ).style.display = "flex";
    this.classList.add("active-btn-modal-select-image");
  });
});
