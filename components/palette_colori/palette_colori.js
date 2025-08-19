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

//SAVE COLOR WITH HEART BUTTON
const $heartOpenButton = document.querySelectorAll("div.icon.heart");
const $heartModal = document.querySelector("div.heart-modal-container");
const $heartCloseButton = document.querySelectorAll("div.close-heart-modal");
const $heartModalOverlay = document.querySelector("div.heart-modal-overlay");
const $heartRemoveColor = document.querySelector("div.heart-error-container");
const $buttonTextSpan = document.querySelector(
  "button.heart-submit-button span"
);
const $saveHeartModal = document.querySelector("button.heart-submit-button");
let heartClicked = null;

//OPENING AND CLOSING HEART MODAL AND ERROR MODAL
$heartOpenButton.forEach((heart) => {
  heart.addEventListener("click", () => {
    heartClicked = heart.querySelector("i.fa-heart");

    if (heartClicked.classList.contains("fa-regular")) {
      //ADDING HEXCODE TO COLOR INPUT VALUE (HEART MODAL)
      const $colorContainerBackground =
        document.querySelector("div.description h1").innerText;
      const $colorInputModalValue = document.querySelector("input#heart-color");
      if ($colorInputModalValue) {
        $colorInputModalValue.value = "#" + $colorContainerBackground;
      }

      $heartModal.classList.add("show");
      $heartModalOverlay.classList.add("show");
    } else {
      $heartRemoveColor.classList.add("show");
      $heartModalOverlay.classList.add("show");
    }
  });
});

//CLOSING
$heartCloseButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    $heartModal.classList.remove("show");
    $heartModalOverlay.classList.remove("show");
    $heartRemoveColor.classList.remove("show");
  });
});

//TO PREVENT BUTTON EVENT DEFAULT
$saveHeartModal.addEventListener("click", (event) => {
  event.preventDefault();

  //CLICK ON SAVE BUTTON
  if (!heartClicked) return;

  if (heartClicked.classList.contains("fa-regular")) {
    heartClicked.classList.remove("fa-regular");
    heartClicked.classList.add("fa-solid");
  }
  const $loadingIcon = $saveHeartModal
    .closest("div.heart-modal-container")
    .querySelector("i.fa-spinner.fa-spin");

  //SIMULATE LOADING
  $buttonTextSpan.style.display = "none";
  $loadingIcon.style.display = "block";

  //CLOSING MODAL AFTER 1 SECOND
  setTimeout(() => {
    $heartModal.classList.remove("show");
    $heartModalOverlay.classList.remove("show");

    $loadingIcon.style.display = "none";
    $buttonTextSpan.style.display = "inline-block";
  }, 1000);

  //ADDING E REMOVING SUCCESS MESSAGE
  setTimeout(() => {
    $copyMessage.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #ffffff"></i> Colore salvato correttamente!`;
    $copyMessage.classList.add("showMessage");

    setTimeout(() => {
      $copyMessage.classList.remove("showMessage");
    }, 3000);
  }, 1000);
});

//ERROR MODAL REMOVE COLOR FROM FAVOURITE
const $deleteColorButton = document.querySelector("button.error-delete-color");
const $deleteButtonText = document.querySelector(
  "button.error-delete-color span"
);

$deleteColorButton.addEventListener("click", () => {
  const $loadingIconModal = $deleteColorButton
    .closest("div.heart-modal-container, div.heart-error-container")
    .querySelector("i.fa-spinner.fa-spin");
  //SIMULATE LOADING
  $deleteButtonText.style.display = "none";
  $loadingIconModal.style.display = "block";

  //CLOSING MODAL AFTER 1 SECOND
  setTimeout(() => {
    $heartRemoveColor.classList.remove("show");
    $heartModalOverlay.classList.remove("show");

    $loadingIconModal.style.display = "none";
    $deleteButtonText.style.display = "inline-block";
  }, 1000);

  //ADDING E REMOVING SUCCESS MESSAGE
  setTimeout(() => {
    $copyMessage.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #ffffff"></i> Colore eliminato correttamente!`;
    $copyMessage.classList.add("showMessage");

    heartClicked.classList.remove("fa-solid");
    heartClicked.classList.add("fa-regular");

    setTimeout(() => {
      $copyMessage.classList.remove("showMessage");
    }, 3000);
  }, 1000);
});

//EVENT ON CANCEL BUTTON
const $cancelErrorModal = document.querySelector("button.error-undo-color");

$cancelErrorModal.addEventListener("click", () => {
  $heartModalOverlay.classList.remove("show");
  $heartRemoveColor.classList.remove("show");
});
