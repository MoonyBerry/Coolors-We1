window.addEventListener("DOMContentLoaded", function () {
  const btnXRegistration = document.querySelector(".btnX");
  const overlayRegistration = document.querySelector(
    ".overlay-modal-inscrizione"
  );
  const containerRegistration = document.querySelector(
    ".container-modal-registrazione"
  );
  const btnRegister = document.querySelector(".btn-register");
  const btnLogin = document.querySelector(".log-in");
  const btnLoginMobile = document.querySelector(".btn-log-in-mobile");
  const btnRegisterMobile = document.querySelector(".btn-register-mobile");
  const mobileNav = this.document.querySelector(".mobile-nav");
  const overlayNav = this.document.querySelector(".overlay");

  if (btnRegister) btnRegister.addEventListener("click", apriModal);
  if (btnLogin) btnLogin.addEventListener("click", apriModal);
  if (btnRegisterMobile) btnRegisterMobile.addEventListener("click", apriModal);
  if (btnLoginMobile) btnLoginMobile.addEventListener("click", apriModal);
  if (btnXRegistration) btnXRegistration.addEventListener("click", chiudiModal);

  function apriModal() {
    overlayRegistration.classList.add("is-visible");
    containerRegistration.classList.add("is-visible");
    mobileNav.classList.remove("navOpen");
  }

  function chiudiModal() {
    overlayRegistration.classList.remove("is-visible");
    containerRegistration.classList.remove("is-visible");
    overlayNav.classList.remove("navOpen");
  }
});
