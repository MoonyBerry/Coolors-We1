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
