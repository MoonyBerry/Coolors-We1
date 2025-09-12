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
const $generatorButton = document.querySelector("div.button-generator-navbar");
const $divBackground = document.querySelectorAll("div.colorContainer");

$body.addEventListener("keydown", changingColorPalette);
$generatorButton.addEventListener("click", changingColorPalette);

function changingColorPalette(e) {
  console.log(e.code);
  if ((e.type === "keydown" && e.code === "Space") || e.type === "click") {
    $divBackground.forEach((background) => {
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
      background.style.background = hexCode;
      const $colorHexCode = background.querySelector("div.description h1");
      const $nameColor = background.querySelector("div.description p");

      //CHANGING TITLE WITH COLOR HEXCODE
      $colorHexCode.innerHTML = hexCode.slice(1);

      //CHANGING DESCRIPTION WITH COLORNAME
      $nameColor.innerHTML =
        color2name.closest(hexCode).name[0].toUpperCase() +
        color2name.closest(hexCode).name.slice(1);
    });
  }
}

/// OPENING/CLOSING VISUALIZZA MODAL
const $openVisualizza = document.querySelector(".open-visualizza");
const $closeVisualizza = document.querySelector(".fa-solid.fa-xmark");
const $modalVisualizza = document.querySelector(".visualizza-modal-container");
const $overlayVisualizza = document.querySelector(".overlayModalVisualizza");

$openVisualizza.addEventListener("click", () => {
  $modalVisualizza.classList.add("mostra");
  $overlayVisualizza.classList.add("mostra");
});

$closeVisualizza.addEventListener("click", () => {
  $modalVisualizza.classList.remove("mostra");
  $overlayVisualizza.classList.remove("mostra");
});

/////////////////////////////////////////////////////////7

class Palette {
  constructor(baseColor) {
    this.baseColor = baseColor; // es: "#3498db"
    this.colors = this.generatePalette();
  }

  // Metodo per convertire HEX → RGB
  hexToRgb(hex) {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  // Metodo per schiarire/scurire un colore
  adjustBrightness(hex, factor) {
    const { r, g, b } = this.hexToRgb(hex);
    const nr = Math.min(255, Math.max(0, r + factor));
    const ng = Math.min(255, Math.max(0, g + factor));
    const nb = Math.min(255, Math.max(0, b + factor));
    return this.rgbToHex(nr, ng, nb);
  }

  // Genera una palette con variazioni di luminosità
  generatePalette() {
    return [
      this.adjustBrightness(this.baseColor, -60),
      this.adjustBrightness(this.baseColor, -30),
      this.baseColor,
      this.adjustBrightness(this.baseColor, 30),
      this.adjustBrightness(this.baseColor, 60),
    ];
  }
}
