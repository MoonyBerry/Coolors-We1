const $btnLanguage = document.querySelector("button.language-button");
const $chooseLanguage = document.querySelector("div.choose-language");
const $selectedLang = document.querySelector("button.language-button p");

$btnLanguage.addEventListener("click", () => {
  const isClosed = $chooseLanguage.classList.toggle("closed");

  isClosed
    ? ($btnLanguage.style.background = "#f7f7f8")
    : ($btnLanguage.style.background = "white");
});

if ($selectedLang.innerHTML === "Italiano") {
  const $optionLang = document.querySelector("div.it p");
  $optionLang.classList.toggle("active");
}
