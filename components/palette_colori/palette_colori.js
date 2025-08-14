const container = document.querySelector(".palette-container");

container.addEventListener("click", (event) => {
  // Trova il bottone cliccato
  const btn = event.target.closest(".divOpen");

  // Trova il lucchetto associato nello stesso .colorContainer
  const colorContainer = btn.closest(".colorContainer");
  const lock = colorContainer.querySelector(".lock");

  // Toggle del singolo lucchetto
  if (lock.classList.contains("fa-lock-open")) {
    lock.classList.remove("fa-lock-open");
    lock.classList.add("fa-lock");
    btn.closest(".optionContainer").classList.add("lockVisible");
  } else {
    lock.classList.remove("fa-lock");
    lock.classList.add("fa-lock-open");
    btn.closest(".optionContainer").classList.remove("lockVisible");
  }
});
