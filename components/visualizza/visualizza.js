const $openBtn = document.querySelector(".navbar-functionality");
const $closeBtn = document.querySelector(".fa-solid.fa-xmark");
const $modal = document.querySelector(".global-container");

// Palette di colori ben distinti
const palette = ["#AFDCEB", "#CAE9F5", "#F0F8FF", "#ADD8E6", "#86C5D8"];

// Applica un colore diverso a ciascun div con classe color-cage
const colorCages = document.querySelectorAll(".color-cage");
colorCages.forEach((div, i) => {
  div.style.backgroundColor = palette[i % palette.length];
});

// Seleziona il div visualizza-main-options
const visualizzaMainOptions = document.querySelector(
  ".visualizza-main-options"
);

function showColorValuesDefault(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const lab = rgbToLab(rgb.r, rgb.g, rgb.b);

  visualizzaMainOptions.innerHTML = `
    <div class="color-values-list">
      <div class="color-value-row">
        <span class="color-value-label">HEX:</span>
        <span class="color-value-data">${hex.toUpperCase()}</span>
      </div>
      <div class="color-value-row">
        <span class="color-value-label">HSB:</span>
        <span class="color-value-data">${hsb.h}, ${hsb.s}%, ${hsb.b}%</span>
      </div>
      <div class="color-value-row">
        <span class="color-value-label">HSL:</span>
        <span class="color-value-data">${hsl.h}, ${hsl.s}%, ${hsl.l}%</span>
      </div>
      <div class="color-value-row">
        <span class="color-value-label">RGB:</span>
        <span class="color-value-data">${rgb.r}, ${rgb.g}, ${rgb.b}</span>
      </div>
      <div class="color-value-row">
        <span class="color-value-label">CMYK:</span>
        <span class="color-value-data">${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${
    cmyk.k
  }%</span>
      </div>
      <div class="color-value-row">
        <span class="color-value-label">LAB:</span>
        <span class="color-value-data">${lab.l}, ${lab.a}, ${lab.b}</span>
      </div>
    </div>
  `;
  visualizzaMainOptions.style.backgroundColor = hex;
}
showColorValuesDefault("#AFDCEB");

// Funzioni di conversione colore
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

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
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToHsb(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
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
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(v * 100),
  };
}

function rgbToCmyk(r, g, b) {
  let c = 1 - r / 255,
    m = 1 - g / 255,
    y = 1 - b / 255;
  let k = Math.min(c, m, y);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

// Conversione RGB -> XYZ -> LAB
function rgbToXyz(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  r *= 100;
  g *= 100;
  b *= 100;
  return {
    x: r * 0.4124 + g * 0.3576 + b * 0.1805,
    y: r * 0.2126 + g * 0.7152 + b * 0.0722,
    z: r * 0.0193 + g * 0.1192 + b * 0.9505,
  };
}

function xyzToLab(x, y, z) {
  const refX = 95.047,
    refY = 100.0,
    refZ = 108.883;
  x /= refX;
  y /= refY;
  z /= refZ;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  return {
    l: Math.round(116 * y - 16),
    a: Math.round(500 * (x - y)),
    b: Math.round(200 * (y - z)),
  };
}

function rgbToLab(r, g, b) {
  const xyz = rgbToXyz(r, g, b);
  return xyzToLab(xyz.x, xyz.y, xyz.z);
}

// Utility per convertire rgb(x, y, z) in HEX
function rgbToHex(rgb) {
  if (rgb.startsWith("#")) return rgb;
  const result = rgb.match(/\d+/g);
  if (!result) return "#000000";
  return (
    "#" +
    result
      .slice(0, 3)
      .map((x) => ("0" + parseInt(x).toString(16)).slice(-2))
      .join("")
  );
}

// Funzione per mostrare i valori colore in stile nome-valore
function showColorValues(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const lab = rgbToLab(rgb.r, rgb.g, rgb.b);

  visualizzaMainOptions.innerHTML = `
    <div class="color-values-list">
      <div class="color-value-row">
        <span class="color-value-label">HEX:</span>
        <span class="color-value-data">${hex.toUpperCase()}</span>
      </div>
      <div class="color-value-row">
        <span class="color-value-label">HSB:</span>
        <span class="color-value-data">${hsb.h}, ${hsb.s}%, ${hsb.b}%</span>
      </div>
      <div class="color-value-row">
        <span class="color-value-label">HSL:</span>
        <span class="color-value-data">${hsl.h}, ${hsl.s}%, ${hsl.l}%</span>
      </div>
      <div class="color-value-row">
        <span class="color-value-label">RGB:</span>
        <span class="color-value-data">${rgb.r}, ${rgb.g}, ${rgb.b}</span>
      </div>
      <div class="color-value-row">
        <span class="color-value-label">CMYK:</span>
        <span class="color-value-data">${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${
    cmyk.k
  }%</span>
      </div>
      <div class="color-value-row">
        <span class="color-value-label">LAB:</span>
        <span class="color-value-data">${lab.l}, ${lab.a}, ${lab.b}</span>
      </div>
    </div>
  `;
  visualizzaMainOptions.style.backgroundColor = hex;
}

// Aggiungi l'evento click a ciascun color-cage
colorCages.forEach((div) => {
  div.addEventListener("click", () => {
    // Rimuovi eventuali pallini neri precedenti
    colorCages.forEach((d) => {
      const dot = d.querySelector(".color-cage-dot");
      if (dot) d.removeChild(dot);
    });

    // Aggiungi il pallino nero centrato al div selezionato
    const dot = document.createElement("span");
    dot.className = "color-cage-dot";
    dot.style.cssText = `
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 2px #fff;
      border: 2px solid #fff;
      z-index: 2;
    `;
    div.style.position = "relative";
    div.appendChild(dot);

    // Mostra i valori colore
    showColorValues(rgbToHex(div.style.backgroundColor));
  });
});

// Apri modal
$openBtn.addEventListener("click", () => {
  $modal.style.display = "flex";
});

// Chiudi modal con X
$closeBtn.addEventListener("click", () => {
  $modal.style.display = "none";
});
