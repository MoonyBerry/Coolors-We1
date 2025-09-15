const btnXRegistration = document.querySelector(".btnX");

const overlayRegistration = document.querySelector(".overlay");
const containerRegistration = document.querySelector(
  ".container-modal-registrazione"
);

const btnRegister = document.querySelector(".btn-register");
const btnLogin = document.querySelector(".log-in");
const btnLoginMobile = document.querySelector(".btn-log-in-mobile");
const btnRegisterMobile = document.querySelector(".btn-register-mobile");

btnRegister.addEventListener("click", apriModal);
btnLogin.addEventListener("click", apriModal);
btnRegisterMobile.addEventListener("click", apriModal);
btnLoginMobile.addEventListener("click", apriModal);

btnXRegistration.addEventListener("click", chiudiModal);

function apriModal() {
  overlayRegistration.classList.add("is-visible");
  containerRegistration.classList.add("is-visible");
}

function chiudiModal() {
  overlayRegistration.classList.remove("is-visible");
  containerRegistration.classList.remove("is-visible");
}
