//OPENING AND CLOSING ESPORTA MODAL
const $esportaModal = document.querySelector("div.esporta-modal-container");
const $openEsporta = document.querySelector("a.openEsporta");
const $esportaOverlay = document.querySelector("div.esporta-modal-overlay");
const $closeEsporta = document.querySelector("div.close-esporta-modal");

$openEsporta.addEventListener("click", () => {
  $esportaModal.classList.toggle("show");
  $esportaOverlay.classList.toggle("show");
});

$closeEsporta.addEventListener("click", () => {
  $esportaModal.classList.toggle("show");
  $esportaOverlay.classList.toggle("show");
});

//MAKING SPACEBAR CHANGING COLOR PALETTE
const $body = document.querySelector("body");
const $divBackground = document.querySelectorAll("div.colorContainer");
const $colorHexCode = document.querySelectorAll("div.description h1");
const $nameColor = document.querySelectorAll("div.description p");

$body.addEventListener("keydown", changingColorPalette);

function changingColorPalette(e) {
  if (e.code === "Space") {
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
