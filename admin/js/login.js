import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginButton = document.getElementById("loginButton");
const loginButtonText = document.getElementById("loginButtonText");

const loginError = document.getElementById("loginError");

const togglePassword = document.getElementById("togglePassword");

/* ========================================
   VERIFICAMOS SI YA INICIO SESION
======================================== */

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.replace("./index.html");
  }
});

/* ========================================
   MOSTRAR / OCULTAR CONTRASEÑA
======================================== */

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";

  passwordInput.type = isPassword ? "text" : "password";

  togglePassword.textContent = isPassword ? "Ocultar" : "Mostrar";
});

/* ========================================
   MOSTRAR ERROR
======================================== */

function mostrarError(mensaje) {
  loginError.textContent = mensaje;
  loginError.classList.add("show");
}

/* ========================================
   LOGIN
======================================== */

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  loginError.classList.remove("show");

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    mostrarError("Ingrese su correo electrónico y contraseña.");

    return;
  }

  loginButton.disabled = true;

  loginButtonText.textContent = "Iniciando sesión...";

  try {
    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "./index.html";
  } catch (error) {
    console.error("Error de autenticación:", error);

    switch (error.code) {
      case "auth/invalid-credential":
        mostrarError("El correo electrónico o la contraseña son incorrectos.");
        break;

      case "auth/invalid-email":
        mostrarError("El correo electrónico no es válido.");
        break;

      case "auth/too-many-requests":
        mostrarError(
          "Demasiados intentos. Espere unos minutos e inténtelo nuevamente.",
        );
        break;

      case "auth/user-disabled":
        mostrarError("Esta cuenta ha sido deshabilitada.");
        break;

      default:
        mostrarError("No fue posible iniciar sesión. Inténtelo nuevamente.");
    }

    loginButton.disabled = false;

    loginButtonText.textContent = "Iniciar sesión";
  }
});


