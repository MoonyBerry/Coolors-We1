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
