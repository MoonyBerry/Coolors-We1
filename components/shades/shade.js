// shade.js
// Funzioni per generare e applicare le sfumature ai colorContainer

function hexToHSL(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const rNorm = r / 255,
    gNorm = g / 255,
    bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm),
    min = Math.min(rNorm, gNorm, bNorm);
  let h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function generaSfumature(hex, n = 25) {
  const [h, s, l] = hexToHSL(hex);
  const shades = [];
  for (let i = 0; i < n; i++) {
    let light = l + 30 - (60 * i) / (n - 1);
    light = Math.max(0, Math.min(100, light));
    shades.push(`hsl(${h}, ${s}%, ${light}%)`);
  }
  return shades;
}

function applicaSfumatureAlContainer(colorContainer) {
  const hex = colorContainer.querySelector(".description h1").innerText;
  const shades = generaSfumature(hex);
  const shadeDivs = colorContainer.querySelectorAll(
    ".generator-color-content .palette-shades"
  );
  shadeDivs.forEach((div, i) => {
    div.style.background = shades[i] || "";
    // Conversione HSL in HEX
    let hexShade = hslToHex(shades[i]);
    div.setAttribute("data-hex", hexShade);
    // Rimuovi eventuale innerHTML testuale
    div.innerHTML = "";
  });
}

// Conversione HSL (stringa) in HEX
function hslToHex(hsl) {
  // hsl(210, 50%, 60%)
  const res = hsl.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
  if (!res) return "";
  let h = parseInt(res[1], 10);
  let s = parseInt(res[2], 10) / 100;
  let l = parseInt(res[3], 10) / 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r1, g1, b1;
  if (h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else {
    r1 = c;
    g1 = 0;
    b1 = x;
  }
  let r = Math.round((r1 + m) * 255);
  let g = Math.round((g1 + m) * 255);
  let b = Math.round((b1 + m) * 255);
  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

// Funzione di utilità per convertire HSL o RGB in HEX
function rgbToHex(bg) {
  // Supporta solo hsl()
  if (bg.startsWith("hsl")) {
    // Estrai valori H, S, L
    const [h, s, l] = bg.match(/\d+/g).map(Number);
    // Conversione HSL -> RGB
    const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color);
    };
    const r = f(0),
      g = f(8),
      b = f(4);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  }
  // fallback
  return "";
}

// Applica a tutte le palette già presenti
export function aggiornaTutteLeSfumature() {
  document
    .querySelectorAll(".colorContainer")
    .forEach(applicaSfumatureAlContainer);
}

// Applica a un singolo container (da usare quando ne crei uno nuovo)
export { applicaSfumatureAlContainer };

// Funzione per aggiungere il listener .bars a un colorContainer
export function aggiungiListenerBars(container) {
  const barsBtn = container.querySelector(".icon.bars");
  const generatorContent = container.querySelector(".generator-color-content");
  if (barsBtn && generatorContent) {
    barsBtn.addEventListener("click", function (e) {
      generatorContent.style.display = "block";
      generatorContent.querySelectorAll("*").forEach(function (child) {
        child.style.display = "block";
      });
      e.stopPropagation();
    });
  }
}

// Inizializza i listener per tutti i colorContainer già presenti
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".colorContainer").forEach(aggiungiListenerBars);

  // Click fuori da generator-color-content: nascondi solo se almeno uno è visibile
  document.addEventListener("click", function (e) {
    const allGen = document.querySelectorAll(".generator-color-content");
    const atLeastOneVisible = Array.from(allGen).some(
      (gen) => gen.style.display !== "none" && gen.offsetParent !== null
    );
    if (
      atLeastOneVisible &&
      !Array.from(allGen).some((gen) => gen.contains(e.target))
    ) {
      allGen.forEach((gen) => {
        gen.style.display = "none";
      });
    }
  });
});
