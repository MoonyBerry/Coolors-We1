const $mobileNav = document.querySelector(".mobile-nav");
const $navOverlay = document.querySelector(".overlay");
const $body = document.querySelector("body");
const $btnMobile = document.querySelector(".fa-bars");

$btnMobile.addEventListener("click", () => {
  $mobileNav.classList.add("navOpen");
  $navOverlay.classList.add("navOpen");
  $body.style.overflow = "hidden";
});

$navOverlay.addEventListener("click", () => {
  $mobileNav.classList.remove("navOpen");
  $navOverlay.classList.remove("navOpen");
  $body.style.overflow = "auto";
});
