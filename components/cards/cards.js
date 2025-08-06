const $adobe = document.querySelector("div.yellow");
const $openAdobe = document.querySelector("div.adobe-modal");
const $adobeOverlay = document.querySelector("div.adobe-overlay");
const $closeAdobe = document.querySelector("div.close-adobe-modal");

$adobe.addEventListener("click", () => {
  $openAdobe.classList.add("show");
  $adobeOverlay.classList.add("show");
});

$closeAdobe.addEventListener("click", () => {
  $openAdobe.classList.remove("show");
  $adobeOverlay.classList.remove("show");
});
