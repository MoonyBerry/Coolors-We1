//OPENING AND CLOSING ESPORTA MODAL
const $esportaModal = document.querySelector("div.esporta-modal-container");
const $openEsporta = document.querySelector("a.openEsporta");
const $esportaOverlay = document.querySelector("div.esporta-modal-overlay");
const $closeEsporta = document.querySelector("div.close-esporta-modal");

$openEsporta.addEventListener("click", () => {
  $esportaModal.classList.add("show");
  $esportaOverlay.classList.add("show");
});

$closeEsporta.addEventListener("click", () => {
  $esportaModal.classList.remove("show");
  $esportaOverlay.classList.remove("show");
});

//OPENING AND CLOSING WISHLIST MODAL
const $wishlistModal = document.querySelector("div.wishlist-modal-container");
const $openWishlist = document.querySelector("a.openWishlist");
const $wishlistOverlay = document.querySelector("div.wishlist-modal-overlay");
const $closeWishlist = document.querySelector("div.close-wishlist-modal");

$openWishlist.addEventListener("click", () => {
  $wishlistModal.classList.add("show");
  $wishlistOverlay.classList.add("show");
});

$closeWishlist.addEventListener("click", () => {
  $wishlistModal.classList.remove("show");
  $wishlistOverlay.classList.remove("show");
});

const $wishlistSaveButton = document.querySelector(
  "button.wishlist-submit-button"
);
$wishlistSaveButton.addEventListener("click", (event) => {
  event.preventDefault();
});

//MAKING SPACEBAR CHANGING COLOR PALETTE
const $body = document.querySelector("body");
const $divBackground = document.querySelectorAll("div.colorContainer");
const $colorHexCode = document.querySelectorAll("div.description h1");
const $nameColor = document.querySelectorAll("div.description p");
const $generatorButton = document.querySelector("div.button-generator-navbar");

$body.addEventListener("keydown", changingColorPalette);
$generatorButton.addEventListener("click", changingColorPalette);

function changingColorPalette(e) {
  console.log(e.code);
  if ((e.type === "keydown" && e.code === "Space") || e.type === "click") {
    let hexCode = "#";

    //GENERATING RANDOM HEXCODE
    for (let i = 0; i < 6; i++) {
      let randomNumber = Math.floor(Math.random() * 10); //0-9
      let randomLetter = String.fromCharCode(
        97 + Math.floor(Math.random() * 6) //A-F
      ).toUpperCase();
      let character = Math.random() < 0.5 ? randomNumber : randomLetter;
      hexCode += character;
    }

    //CHANGING BACKGROUNDCOLOR
    $divBackground.forEach((div) => {
      div.style.background = hexCode;
    });

    //CHANGING TITLE WITH COLOR HEXCODE
    $colorHexCode.forEach((text) => {
      text.innerHTML = hexCode.slice(1);
    });

    //CHANGING DESCRIPTION WITH COLORNAME
    $nameColor.forEach((name) => {
      name.innerHTML =
        color2name.closest(hexCode).name[0].toUpperCase() +
        color2name.closest(hexCode).name.slice(1);
    });
  }
}
