import {
  aggiornaTutteLeSfumature,
  applicaSfumatureAlContainer,
} from "../shades/shade.js";
const container = document.querySelector(".palette-container");

container.addEventListener("click", (event) => {
  // Trova il bottone cliccato
  const btn = event.target.closest(".divOpen");
  if (!btn) return; // se non è stato cliccato un .divOpen, esci

  // Trova il contenitore colore
  const colorContainer = btn.closest(".colorContainer");
  if (!colorContainer) return;

  // Trova il lucchetto
  const lock = colorContainer.querySelector(".lock");
  if (!lock) return;

  // Toggle del singolo lucchetto
  const optionContainer = btn.closest(".optionContainer");
  if (!optionContainer) return;

  if (lock.classList.contains("fa-lock-open")) {
    lock.classList.remove("fa-lock-open");
    lock.classList.add("fa-lock");
    optionContainer.classList.add("lockVisible");
    colorContainer.classList.add("lockVisible");
  } else {
    lock.classList.remove("fa-lock");
    lock.classList.add("fa-lock-open");
    optionContainer.classList.remove("lockVisible");
    colorContainer.classList.remove("lockVisible");
  }
});

//COPY HEXCODE BUTTON (sempre con event delegation)
const $copyMessage = document.querySelector("div.success-copy-hexcode");

container.addEventListener("click", (event) => {
  const copy = event.target.closest(".icon.clone"); // TROVA IL BOTTONE CLONE CLICCATO
  if (!copy) return; // se non è un clone, esci

  const containerDiv = copy.closest(".colorContainer"); // TROVA IL CONTAINER DEL COLORE
  if (!containerDiv) return;
  const hexCode = "#" + containerDiv.querySelector(".description h1").innerHTML;
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

//SAVE COLOR WITH HEART BUTTON (event delegation per le colonne di colore create dinamicamente con il plus button)
const $heartModal = document.querySelector("div.heart-modal-container");
const $heartCloseButton = document.querySelectorAll("div.close-heart-modal");
const $heartModalOverlay = document.querySelector("div.heart-modal-overlay");
const $heartRemoveColor = document.querySelector("div.heart-error-container");
const $buttonTextSpan = document.querySelector(
  "button.heart-submit-button span"
);
const $saveHeartModal = document.querySelector("button.heart-submit-button");
let heartClicked = null;

//LOCAL STORAGE
function getFavoriteColors() {
  const colors = localStorage.getItem("favoriteColors");
  return colors ? JSON.parse(colors) : [];
}

function saveFavoriteColors(colors) {
  localStorage.setItem("favoriteColors", JSON.stringify(colors));
}

//OPENING AND CLOSING HEART MODAL AND ERROR MODAL
container.addEventListener("click", (event) => {
  const heart = event.target.closest("div.icon.heart");
  if (!heart) return;
  heartClicked = heart.querySelector("i.fa-heart");

  if (heartClicked.classList.contains("fa-regular")) {
    //ADDING HEXCODE TO COLOR INPUT VALUE (HEART MODAL)
    const $colorContainerBackground = heart
      .closest(".colorContainer") // salgo fino al contenitore della card
      .querySelector("div.description h1").innerText;

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

  const $colorInputModalValue = document.querySelector("input#heart-color");

  if (heartClicked.classList.contains("fa-regular")) {
    heartClicked.classList.remove("fa-regular");
    heartClicked.classList.add("fa-solid");
  }

  //LOCAL STORAGE ADD FAVOURITE
  const color = $colorInputModalValue.value;
  const favorites = getFavoriteColors();
  if (!favorites.includes(color)) {
    favorites.push(color);
    saveFavoriteColors(favorites);
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

    //LOCAL STORAGE REMOVE FAVOURITE COLOR
    const color = heartClicked
      .closest(".colorContainer")
      .querySelector("div.description h1").innerText;
    let favorites = getFavoriteColors();
    favorites = favorites.filter((c) => c !== "#" + color);
    saveFavoriteColors(favorites);

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

//LOCAL STORAGE COLOR HEARTS ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  const favorites = getFavoriteColors();

  document.querySelectorAll("div.colorContainer").forEach((container) => {
    const color = "#" + container.querySelector("div.description h1").innerText;
    if (favorites.includes(color)) {
      const heart = container.querySelector("div.icon.heart i.fa-heart");
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid");
    }
  });
});

//////////////////////////////////////////////////////////////////////

//LIBRARY SIDEBAR MENU - SAVING FAVOURITE COLORS PALETTES
//OPENING AND CLOSING SIDEBAR
const $containerSidebar = document.querySelector(".container-sidebar");
const $containerSidebarDaltonico = document.querySelector(".daltonico");
const $librarySidebar = document.querySelector("aside.library-menu-sidebar");
const $librarySidebarOpenButton = document.querySelector(
  "div.tendon-container"
);
const $navbarTendons = document.querySelectorAll("div.tendon");
const $libraryOverlay = document.querySelector("div.library-overlay-mobile");

$librarySidebarOpenButton.addEventListener("click", () => {
  $librarySidebar.classList.toggle("show");
  container.classList.toggle("sideIsOpen");
  $libraryOverlay.classList.toggle("show");
  $librarySidebarOpenButton.classList.toggle("rotate");
  $navbarTendons.forEach((tendon) => {
    tendon.classList.toggle("rotate");
  });
  if ($containerSidebar.classList.contains("sideIsOpen")) {
    $containerSidebar.classList.remove("sideIsOpen");
  }
  if ($containerSidebarDaltonico.classList.contains("sideIsOpen")) {
    $containerSidebarDaltonico.classList.remove("sideIsOpen");
  }
});

//OPENING WISHLIST MODAL FROM ADD BUTTON
const $libraryAddPaletteButton = document.querySelector(
  "div.library-header-add-button"
);
const $wishlistModal = document.querySelector("div.wishlist-modal-container");
const $wishlistOverlay = document.querySelector("div.wishlist-modal-overlay");

document.addEventListener("DOMContentLoaded", () => {
  $libraryAddPaletteButton.addEventListener("click", () => {
    $wishlistModal.classList.add("show");
    $wishlistOverlay.classList.add("show");
  });
});

//CLOSING SIDE MOBILE
const $closeLibrary = document.querySelector("div.library-header-close-button");

document.addEventListener("DOMContentLoaded", () => {
  $closeLibrary.addEventListener("click", () => {
    $librarySidebar.classList.remove("show");
    $libraryOverlay.classList.remove("show");
    container.classList.remove("sideIsOpen");
    $librarySidebarOpenButton.classList.remove("rotate");
    $navbarTendons.forEach((tendon) => {
      tendon.classList.remove("rotate");
    });
  });

  $libraryOverlay.addEventListener("click", () => {
    if ($librarySidebar.classList.contains("show")) {
      $librarySidebar.classList.remove("show");
      $libraryOverlay.classList.remove("show");
      container.classList.remove("sideIsOpen");
      $librarySidebarOpenButton.classList.remove("rotate");
      $navbarTendons.forEach((tendon) => {
        tendon.classList.remove("rotate");
      });
    }
  });
});

//CONVERT RGB INTO HEXCODE
const rgbToHex = function rgbToHex(rgb) {
  //match pick numbers from rgb code string
  const result = rgb.match(/\d+/g).map(Number);
  //convert every hex number into 2 digit nummber
  return (
    "#" +
    result
      .map((val) => val.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
};

//RENDERING FAVOURITE PALETTES
const $favouritePaletteContainer = document.querySelector(
  "div.favourite-color-palette-wrapper"
);

function renderFavouritePalettes() {
  $favouritePaletteContainer.innerHTML = "";

  const favoritesSavedPalettes = getFavoritePalettes();

  favoritesSavedPalettes.forEach((palette) => {
    //create a main container for each palette
    const $paletteContainer = document.createElement("div");
    $paletteContainer.classList.add("favourite-color-palette-container");

    //create container colors
    const $colorsContainer = document.createElement("div");
    $colorsContainer.classList.add("favourite-color-palette");

    palette.colors.forEach((color) => {
      const $colorContainer = document.createElement("div");
      $colorContainer.classList.add("favourite-color-palette-background");
      $colorContainer.style.backgroundColor = color;
      $colorsContainer.appendChild($colorContainer);
    });

    //name palette
    const $paletteName = document.createElement("h1");
    $paletteName.textContent = palette.name;

    //ading colors and name to main container
    $paletteContainer.appendChild($colorsContainer);
    $paletteContainer.appendChild($paletteName);

    //adding to sidebar
    $favouritePaletteContainer.appendChild($paletteContainer);

    $paletteContainer.addEventListener("click", () => {
      const $colorStrip = document.querySelectorAll("div.colorContainer");
      for (let i = 0; i < palette.colors.length; i++) {
        $colorStrip[i].style.backgroundColor = palette.colors[i];
      }

      $colorStrip.forEach((strip) => {
        const $stripCode = strip.querySelector("div.description h1");
        const $stripName = strip.querySelector("div.description p");

        const stripBackground = getComputedStyle(strip).backgroundColor;
        const hexCode = rgbToHex(stripBackground);
        $stripCode.innerHTML = hexCode.slice(1);

        //CHANGING DESCRIPTION WITH COLORNAME
        const colorName = color2name.closest(hexCode).name;
        $stripName.innerHTML = colorName[0].toUpperCase() + colorName.slice(1);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFavouritePalettes();
});

//SAVING FAVOURITE PALETTES
const $savePaletteButton = document.querySelector(
  "button.wishlist-submit-button"
);
const $myPaletteNameInput = document.querySelector("input#wishlist-nome");
const $paletteColors = document.querySelectorAll("div.colorContainer");

//LOCAL STORAGE
function getFavoritePalettes() {
  const palettes = localStorage.getItem("favoritePalettes");
  const parsedPalettes = palettes ? JSON.parse(palettes) : [];
  return Array.isArray(parsedPalettes) ? parsedPalettes : [parsedPalettes];
}

function saveFavoritePalettes(palettes) {
  localStorage.setItem("favoritePalettes", JSON.stringify(palettes));
}

//EVENT ON SAVE BUTTON CLICK
$savePaletteButton.addEventListener("click", () => {
  const $savePaletteButtonSpan = $savePaletteButton.querySelector("span");
  const $loadingIcon = $savePaletteButton.querySelector("i.fa-spinner");

  //SIMULATE LOADING
  $savePaletteButtonSpan.style.display = "none";
  $loadingIcon.style.display = "block";

  //CLOSING MODAL AFTER 1 SECOND
  setTimeout(() => {
    $wishlistModal.classList.remove("show");
    $wishlistOverlay.classList.remove("show");

    $loadingIcon.style.display = "none";
    $savePaletteButtonSpan.style.display = "inline-block";
  }, 1000);

  let paletteName = $myPaletteNameInput.value || "My new palette";

  const colorPalette = [];
  document.querySelectorAll(".colorContainer").forEach((div) => {
    const paletteColor = getComputedStyle(div).backgroundColor;
    if (paletteColor) {
      colorPalette.push(paletteColor);
    }
  });

  const favoritesPalettes = getFavoritePalettes();

  const paletteAlreadyExists = favoritesPalettes.some(
    (p) => JSON.stringify(p.colors) === JSON.stringify(colorPalette)
  );

  if (!paletteAlreadyExists) {
    setTimeout(() => {
      favoritesPalettes.push({ name: paletteName, colors: colorPalette });
      saveFavoritePalettes(favoritesPalettes);

      renderFavouritePalettes();

      $copyMessage.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #ffffff"></i> Palette salvata con successo!`;
      $copyMessage.classList.add("showMessage");
      setTimeout(() => {
        $copyMessage.classList.remove("showMessage");
      }, 3000);
    }, 1000);
  } else {
    setTimeout(() => {
      $copyMessage.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #ffffff"></i> Errore, è già stata salvata! `;
      $copyMessage.classList.add("showMessage");
      setTimeout(() => {
        $copyMessage.classList.remove("showMessage");
      }, 3000);
    }, 1000);
  }

  $myPaletteNameInput.value = "";
});
//funzione drag and drop
///////////////////////////////////////////////////////////////
let dragSrc = null;

function addDragAndButtonListeners() {
  // Drag and drop
  document.querySelectorAll(".colorContainer").forEach((colonna) => {
    colonna.setAttribute("draggable", "true");
    colonna.removeEventListener("dragstart", dragStart);
    colonna.removeEventListener("dragend", dragEnd);
    colonna.removeEventListener("dragover", dragOver);
    colonna.removeEventListener("dragenter", dragEnter);
    colonna.removeEventListener("dragleave", dragLeave);
    colonna.removeEventListener("drop", drop);
    colonna.addEventListener("dragstart", dragStart);
    colonna.addEventListener("dragend", dragEnd);
    colonna.addEventListener("dragover", dragOver);
    colonna.addEventListener("dragenter", dragEnter);
    colonna.addEventListener("dragleave", dragLeave);
    colonna.addEventListener("drop", drop);
  });

  // Delete button
  document.querySelectorAll(".deleteX").forEach((btn) => {
    btn.removeEventListener("click", deleteColonna);
    btn.addEventListener("click", deleteColonna);
  });

  // Plus button
  document.querySelectorAll(".containerPlus").forEach((btn) => {
    btn.removeEventListener("click", addColonna);
    btn.addEventListener("click", addColonna);
  });
}

function dragStart(e) {
  dragSrc = this;
  this.classList.add("dragging");
}

function dragEnd(e) {
  this.classList.remove("dragging");
  dragSrc = null;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave(e) {
  this.classList.remove("over");
}

function drop(e) {
  e.preventDefault();
  this.classList.remove("over");
  if (dragSrc && dragSrc !== this) {
    // Scambia le posizioni
    const parent = this.parentNode;
    const srcNext =
      dragSrc.nextSibling === this ? dragSrc : dragSrc.nextSibling;
    parent.insertBefore(dragSrc, this);
    parent.insertBefore(this, srcNext);
    addDragAndButtonListeners(); // Riattacca i listener
  }
}

function deleteColonna() {
  const colonna = this.closest(".colorContainer");
  const colonne = document.querySelectorAll(".colorContainer");
  if (colonne.length > 2 && colonna) {
    colonna.remove();
    addDragAndButtonListeners();
  }
}

function addColonna() {
  const colonna = this.closest(".colorContainer");
  const nuovaColonna = document.createElement("div");
  nuovaColonna.classList.add("colorContainer");
  // Genera colore random
  const randomColor =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase();
  const hexCode = randomColor.slice(1);
  nuovaColonna.style.backgroundColor = randomColor;
  nuovaColonna.innerHTML += `
      <div class="generator-color-content">
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
        <div class="palette-shades"></div>
      </div> 
  <div class="optionContainer">
          <div class="icon deleteX"><i class="fa-solid fa-x"></i></div>
          <div class="icon circle-half">
            <i class="fa-solid fa-circle-half-stroke"></i>
          </div>
          <div class="icon bars"><i class="fa-solid fa-table-list"></i></div>
          <div class="icon heart"><i class="fa-regular fa-heart"></i></div>
          <div class="icon left-right" data-target="firstColorPalette">
            <i class="fa-solid fa-arrows-left-right"></i>
          </div>
          <div class="icon clone"><i class="fa-solid fa-clone"></i></div>
          <div class="icon divOpen">
            <i class="fa-solid fa-lock-open lock"></i>
          </div>
        </div>
        <div class="description">
          <h1>${hexCode}</h1>
          <p>Random</p>
        </div>
        <div class="containerPlus">
          <div class="btnPlus"><i class="fa-solid fa-plus"></i></div>
        </div>
      `;
  const descriptionP = nuovaColonna.querySelector(".description p");
  const colorName = color2name.closest(randomColor).name;
  descriptionP.textContent = colorName[0].toUpperCase() + colorName.slice(1);

  colonna.parentNode.insertBefore(nuovaColonna, colonna.nextSibling);
  addDragAndButtonListeners();
  // Applica le sfumature al nuovo colorContainer
  applicaSfumatureAlContainer(nuovaColonna);
  // Aggiungi listener per mostrare generator-color-content anche ai nuovi
  import("../shades/shade.js").then((mod) =>
    mod.aggiungiListenerBars(nuovaColonna)
  );
}

// Inizializza i listener all'avvio

addDragAndButtonListeners();
// Applica le sfumature a tutte le palette statiche all'avvio
aggiornaTutteLeSfumature();

// Spacebar cambia colore anche per nuovi elementi
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    //OPEN PRO MODAL
    const $proModal = document.querySelector("div.pro-modal-container");
    const $proModalOverlay = document.querySelector("div.pro-modal-overlay");
    const $closeProModal = document.querySelector("div.close-pro-modal");
    const $paletteContainerSize =
      document.querySelectorAll("div.colorContainer");
    if ($paletteContainerSize.length > 5) {
      $proModal.classList.add("show");
      $proModalOverlay.classList.add("show");
      $closeProModal.addEventListener("click", () => {
        $proModal.classList.remove("show");
        $proModalOverlay.classList.remove("show");
      });
    } else {
      document.querySelectorAll(".colorContainer").forEach((div) => {
        // Se la colonna è bloccata (lucchetto chiuso), salta
        const lockIcon = div.querySelector(".lock");
        if (lockIcon && lockIcon.classList.contains("fa-lock")) {
          return; // saltare questa colonna
        }
        // Cambia colore random solo se non bloccata
        const randomColor =
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
            .toUpperCase();
        div.style.backgroundColor = randomColor;
        const h1 = div.querySelector(".description h1");
        if (h1) h1.textContent = randomColor.slice(1);
        const p = div.querySelector(".description p");
        if (p) {
          const colorName = color2name.closest(randomColor).name;
          p.textContent = colorName[0].toUpperCase() + colorName.slice(1);
        }
        // Aggiorna le sfumature per ogni colorContainer
        applicaSfumatureAlContainer(div);
      });
    }
  }
});

// elimina elemento con il btn X
const $btnsDelete = document.querySelectorAll(".deleteX");

$btnsDelete.forEach(($btnDelete) => {
  $btnDelete.addEventListener("click", function () {
    const colonna = this.closest(".colorContainer");

    const colonne = document.querySelectorAll(".colorContainer");

    if (colonne.length > 2 && colonna) {
      colonna.remove();
    }
  });
});

// ...existing code...
