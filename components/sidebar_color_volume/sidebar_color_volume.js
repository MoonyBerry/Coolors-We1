// --- Sidebar toggle (già presente) ---
const $btnSideColorVolume = document.querySelector(".btn-side-color-volume");
const $containerSidebar = document.querySelector(".container-sidebar");
const $paletteContainer = document.querySelector(".palette-container");
const $library = document.querySelector(".library-menu-sidebar");
const $librarySideBtn = document.querySelector(".tendon-container");
const $tendonRotate = document.querySelectorAll(".tendon");
const $libraryOverlayMobile = document.querySelector(".library-overlay-mobile");
const $daltonico = document.querySelector(".daltonico");

$btnSideColorVolume &&
  $btnSideColorVolume.addEventListener("click", () => {
    $containerSidebar.classList.toggle("sideIsOpen");
    if (
      $library.classList.contains("show") ||
      $daltonico.classList.contains("sideIsOpen")
    ) {
      $library.classList.remove("show");
      $librarySideBtn.classList.remove("rotate");
      $paletteContainer.classList.remove("sideIsOpen");
      $daltonico.classList.remove("sideIsOpen");
      $libraryOverlayMobile.classList.remove("show");
      $tendonRotate.forEach(($tendon) => {
        $tendon.classList.remove("rotate");
      });
    }
  });

// --- LOGICA SLIDER PALETTE ---
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function parseRgbString(rgbString) {
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return [0, 0, 0];
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

function updatePalette(action, value) {
  document
    .querySelectorAll(".palette-container .colorContainer")
    .forEach((div) => {
      // Salta se bloccato
      const lockIcon = div.querySelector(".lock");
      if (lockIcon && lockIcon.classList.contains("fa-lock")) return;
      const rgb = getComputedStyle(div).backgroundColor;
      let [r, g, b] = parseRgbString(rgb);
      let [h, s, l] = rgbToHsl(r, g, b);
      switch (action) {
        case "luminosita":
          l = value; // 0-200 slider, normalizza a 0-100
          if (l > 100) l = 100;
          break;
        case "saturazione":
          s = value; // 0-200 slider, normalizza a 0-100
          if (s > 100) s = 100;
          break;
        case "tonalita":
          h = value;
          break;
        case "temperatura":
          // Temperatura: sposta verso blu/giallo (semplificato)
          h = (h + value) % 360;
          if (h < 0) h += 360;
          break;
      }
      const [nr, ng, nb] = hslToRgb(h, s, l);
      div.style.backgroundColor = `rgb(${nr},${ng},${nb})`;
      // Aggiorna codice HEX
      const h1 = div.querySelector(".description h1");
      if (h1) {
        h1.textContent = ((nr << 16) | (ng << 8) | nb)
          .toString(16)
          .padStart(6, "0")
          .toUpperCase();
      }
    });
}

// Collega slider e input number
document.querySelectorAll(".volume-range").forEach((slider) => {
  slider.addEventListener("input", function () {
    const action = this.dataset.action;
    const value = parseInt(this.value);
    // Aggiorna input number associato
    const numberInput = this.parentElement.querySelector(
      'input[type="number"]'
    );
    if (numberInput) numberInput.value = value;
    updatePalette(action, value);
  });
});
document.querySelectorAll(".input-number").forEach((input) => {
  input.addEventListener("input", function () {
    const action = this.dataset.action;
    const value = parseInt(this.value);
    // Aggiorna slider associato
    const slider = this.parentElement.parentElement.querySelector(
      'input[type="range"]'
    );
    if (slider) slider.value = value;
    updatePalette(action, value);
  });
});
