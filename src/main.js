// Variables
const rmCheck = document.getElementById("rememberMe");
const emailInput = document.getElementById("email");
const loginButton = document.getElementById("loginButton");
const buttonLoader = document.getElementById("buttonLoader");
const successModal = document.getElementById("successModal");

// Initialize localStorage check
function initializeRememberMe() {
  if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked", "checked");
    emailInput.value = localStorage.username || "";
  } else {
    rmCheck.removeAttribute("checked");
    emailInput.value = "";
  }
}

// Save to localStorage
function lsRememberMe() {
  if (rmCheck.checked && emailInput.value !== "") {
    localStorage.username = emailInput.value;
    localStorage.checkbox = rmCheck.value;
  } else {
    localStorage.username = "";
    localStorage.checkbox = "";
  }
}

// Particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 150;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 15 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Notification System
function showNotification(message, type = "error") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 400);
  }, 4000);
}

// Login function
const login = () => {
  const email = emailInput.value;
  const password = document.getElementById("password").value;
  const validEmail = "user@gmail.com";
  const validPassword = "12345";

  // Validation with notifications
  if (!email || !password) {
    showNotification("Please enter an email and a password", "warning");
    return;
  }

  if (!email.includes("@")) {
    showNotification("Please enter a valid email", "error");
    return;
  }

  // Save remember me state
  lsRememberMe();

  // Show loading
  loginButton.classList.add("loading");
  loginButton.disabled = true;
  buttonLoader.classList.add("show");

  setTimeout(() => {
    if (email !== validEmail || password !== validPassword) {
      loginButton.classList.remove("loading");
      loginButton.disabled = false;
      buttonLoader.classList.remove("show");
      showNotification("Incorrect credentials. Try again", "error");
      return;
    }

    // Successful Login
    loginButton.classList.remove("loading");
    loginButton.disabled = false;
    buttonLoader.classList.remove("show");
    showNotification("Welcome! Redirecting...", "success");

    setTimeout(() => {
      successModal.classList.add("show");
    }, 850);

    setTimeout(() => {
      window.location.href = "https://tonys-dev.github.io/my-portfolio/";
    }, 3000);
  }, 1000);
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  initializeRememberMe();
});

// Event listeners
loginButton.addEventListener("click", login);

// Enter key support
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    login();
  }
});

// Remember me checkbox change
rmCheck.addEventListener("change", lsRememberMe);
