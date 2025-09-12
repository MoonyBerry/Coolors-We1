const $openBtn = document.querySelector(".navbar-functionality");
const $closeBtn = document.querySelector(".fa-solid fa-xmark");
const $modal = document.querySelector(".global-container");

/* // Chiudi la modal
$closeBtn.addEventListener("click", () => {
  $closeBtn.classList.remove("show");
}); */

/* // Elementi
const openBtn = document.getElementById("openModal");
const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close"); */

// Apri modal
$openBtn.addEventListener("click", () => {
  global-container = "flex";
});

// Chiudi modal con X
$closeBtn.addEventListener("click", () => {
  global-container = "none";
});


/////////////////////////////////////////////////////////7


class Palette {
  constructor(baseColor) {
    this.baseColor = baseColor; // es: "#3498db"
    this.colors = this.generatePalette();
  }

  // Metodo per convertire HEX → RGB
  hexToRgb(hex) {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  // Metodo per convertire RGB → HEX
  rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  // Metodo per schiarire/scurire un colore
  adjustBrightness(hex, factor) {
    const { r, g, b } = this.hexToRgb(hex);
    const nr = Math.min(255, Math.max(0, r + factor));
    const ng = Math.min(255, Math.max(0, g + factor));
    const nb = Math.min(255, Math.max(0, b + factor));
    return this.rgbToHex(nr, ng, nb);
  }

  // Genera una palette con variazioni di luminosità
  generatePalette() {
    return [
      this.adjustBrightness(this.baseColor, -60),
      this.adjustBrightness(this.baseColor, -30),
      this.baseColor,
      this.adjustBrightness(this.baseColor, 30),
      this.adjustBrightness(this.baseColor, 60),
    ];
  }
}
