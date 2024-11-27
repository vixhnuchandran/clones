document.addEventListener("DOMContentLoaded", function () {
  const collapseButton = document.getElementById("right-collapse");
  const sidebar = document.getElementById("sidebar");
  const buttonIcon = collapseButton.querySelector("svg");

  if (collapseButton && sidebar && buttonIcon) {
    collapseButton.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar-collapsed");

      buttonIcon.classList.toggle("rotate-180");
    });
  }
});

// carousel
const container = document.getElementById("newsContainer");

container.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    const scrollAmount = e.deltaY * 2.5;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  },
  { passive: false }
);

let touchStartX = 0;
let isScrolling = false;

container.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  isScrolling = true;
});

container.addEventListener("touchmove", (e) => {
  if (!isScrolling) return;

  const touchMoveX = e.touches[0].clientX;
  const deltaX = (touchStartX - touchMoveX) * 5.0;

  container.scrollBy({
    left: deltaX,
    behavior: "smooth",
  });

  touchStartX = touchMoveX;
});

container.addEventListener("touchend", () => {
  isScrolling = false;
});

const scrollInterval = setInterval(() => {
  container.scrollBy({
    left: 200,
    behavior: "smooth",
  });
}, 2000);

// Drop down
function toggleDropdown(event) {
  event.stopPropagation();

  const dropdown = document.getElementById("dropdownMenu");
  dropdown.classList.toggle("hidden");
}

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("dropdownMenu");
  const button = document.querySelector('button[type="button"]');

  if (!button.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.add("hidden");
  }
});

function toggleDropdown2(event) {
  event.stopPropagation();

  const dropdown = document.getElementById("dropdownMenu2");
  dropdown.classList.toggle("hidden");
}

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("dropdownMenu2");
  const button = document.querySelector('button[type="button"]');

  if (!button.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.add("hidden");
  }
});

// Show password
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("apiKeyInput");
  const showButton = document.getElementById("showButton");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showButton.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    showButton.textContent = "Show";
  }
}

// Opacity
function toggleOpacity(button) {
  if (button.style.opacity === "0.15") {
    button.style.opacity = "1";
  } else {
    button.style.opacity = "0.15";
  }
}

// Open Menu
const openMenuBtn = document.getElementById("openMenuBtn");
const popoverMenu = document.getElementById("popoverMenu");
const overlay = document.getElementById("overlay");

openMenuBtn.addEventListener("click", () => {
  popoverMenu.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  document.body.classList.toggle("blurred");
});

overlay.addEventListener("click", () => {
  popoverMenu.classList.add("hidden");
  overlay.classList.add("hidden");
  document.body.classList.remove("blurred");
});

const closeButton = popoverMenu.getElementById("popOverClose");

function closePopover() {
  popoverMenu.classList.add("hidden");
}

closeButton.addEventListener("click", closePopover);

document.addEventListener("click", function (event) {
  if (!popoverMenu.contains(event.target) && event.target !== closeButton) {
    closePopover();
  }
});

popoverMenu.addEventListener("click", function (event) {
  event.stopPropagation();
});