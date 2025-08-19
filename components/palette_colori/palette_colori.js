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

//COPY HEXCODE BUTTON
const $copyButton = document.querySelectorAll(".icon.clone");
const $copyMessage = document.querySelector("div.success-copy-hexcode");

$copyButton.forEach((copy) => {
  copy.addEventListener("click", () => {
    const container = copy.closest(".colorContainer");
    const hexCode = "#" + container.querySelector(".description h1").innerHTML;
    //TO COPY CODE TO CLIPBOARD
    navigator.clipboard
      .writeText(hexCode)
      .then(() => {
        $copyMessage.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #ffffff"></i> Colore copiato negli appunti!`;
        $copyMessage.classList.add("showMessage");
        //REMOVING SHOWMESSAGE AFTER 3 SECONDS
        setTimeout(() => {
          $copyMessage.classList.remove("showMessage");
        }, 3000);
      })
      .catch(() => {
        $copyMessage.innerHTML = "Errore, codice inesistene";
        $copyMessage.classList.add("showMessage");
        setTimeout(() => {
          $copyMessage.classList.remove("showMessage");
        }, 3000);
      });
  });
});
