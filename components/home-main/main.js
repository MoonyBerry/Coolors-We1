// Create an event to make the image inside the SVG scroll infinitely
const $svgObject = document.getElementById("animated-screens-svg");

$svgObject.addEventListener("load", () => {
  const svgDoc = $svgObject.contentDocument; //access the SVG content
  const img1 = svgDoc.getElementById("immagine-da-modificare1");
  const img2 = svgDoc.getElementById("immagine-da-modificare2");

  let y1 = 0;
  let y2 = 3344; //extact img height

  const speed = 1; //pixels moved per frame

  function scrollLoop() {
    y1 -= speed;
    y2 -= speed;

    // If an image is completely off screen (above), move it below the other
    if (y1 <= -3344) y1 = y2 + 3344;
    if (y2 <= -3344) y2 = y1 + 3344;

    img1.setAttribute("y", y1);
    img2.setAttribute("y", y2);

    requestAnimationFrame(scrollLoop);
  }

  scrollLoop();
});

//LAPTOP CHANGING PALETTES
// Create functions to make the laptop's palette change color randomly
let $firstLaptopColor = document.querySelector("path.st41");
let $secondLaptopColor = document.querySelector("rect.st31");
let $thirdLaptopColor = document.querySelector("rect.st21");
let $fourthLaptopColor = document.querySelector("rect.st11");
let $fifthLaptopColor = document.querySelector("path.st01");

//FUNCTION THAT GENERATE RANDOM HEXCODES
setInterval(assignHexCode, 700);

function generateRandomHexCode() {
  let hexCode = "#";

  for (let i = 0; i < 6; i++) {
    let randomNumber = Math.floor(Math.random() * 10); //0-9
    let randomLetter = String.fromCharCode(
      97 + Math.floor(Math.random() * 6) //A-F
    ).toUpperCase();
    let character = Math.random() < 0.5 ? randomNumber : randomLetter;
    hexCode += character;
  }
  return hexCode;
}

//FUNCTION TO ASSIGN HEXCODES
function assignHexCode() {
  $firstLaptopColor.style.fill = generateRandomHexCode();
  $secondLaptopColor.style.fill = generateRandomHexCode();
  $thirdLaptopColor.style.fill = generateRandomHexCode();
  $fourthLaptopColor.style.fill = generateRandomHexCode();
  $fifthLaptopColor.style.fill = generateRandomHexCode();

  const svgDoc = $svgObject.contentDocument;
  let $firstLaptopColorDekstop = svgDoc.querySelector("path.st329");
  let $secondLaptopColorDekstop = svgDoc.querySelector("rect.st328");
  let $thirdLaptopColorDekstop = svgDoc.querySelector("rect.st327");
  let $fourthLaptopColorDekstop = svgDoc.querySelector("rect.st326");
  let $fifthLaptopColorDekstop = svgDoc.querySelector("path.st325");
  $firstLaptopColorDekstop.style.fill = generateRandomHexCode();
  $secondLaptopColorDekstop.style.fill = generateRandomHexCode();
  $thirdLaptopColorDekstop.style.fill = generateRandomHexCode();
  $fourthLaptopColorDekstop.style.fill = generateRandomHexCode();
  $fifthLaptopColorDekstop.style.fill = generateRandomHexCode();
}
