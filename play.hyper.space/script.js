// Theme
function updateDots(theme, isMobile = false) {
  const lightDot = document.getElementById(
    isMobile ? "light-dot-mob" : "light-dot"
  );
  const darkDot = document.getElementById(
    isMobile ? "dark-dot-mob" : "dark-dot"
  );
  const systemDot = document.getElementById(
    isMobile ? "system-dot-mob" : "system-dot"
  );

  lightDot.style.opacity = theme === "light" ? "1" : "0";
  darkDot.style.opacity = theme === "dark" ? "1" : "0";
  systemDot.style.opacity = theme === "system" ? "1" : "0";
}

function applySystemTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDark) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }

  updateDots("system");
}

function handleThemeChange(savedTheme, isMobile = false) {
  if (savedTheme === "system") {
    applySystemTheme();
  } else {
    document.body.classList.add(savedTheme);
    updateDots(savedTheme, isMobile);
  }
}

// Desktop Theme Logic
const themeButton = document.getElementById("theme-toggle");
const dropdownMenu = document.getElementById("dropdown-menu-main");

themeButton.addEventListener("click", function (e) {
  e.stopPropagation();
  dropdownMenu.classList.toggle("hidden");
});

window.addEventListener("click", function (e) {
  if (!themeButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add("hidden");
  }
});

const savedTheme = localStorage.getItem("theme") || "system";
handleThemeChange(savedTheme);

document.getElementById("light-btn").addEventListener("click", () => {
  setTheme("light");
});

document.getElementById("dark-btn").addEventListener("click", () => {
  setTheme("dark");
});

document.getElementById("system-btn").addEventListener("click", () => {
  setTheme("system");
});

function setTheme(theme) {
  if (theme === "light") {
    document.body.classList.remove("dark");
  } else if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    applySystemTheme();
  }

  localStorage.setItem("theme", theme);
  updateDots(theme);

  dropdownMenu.classList.add("hidden");
}

// Mobile Theme Logic
const themeMobileToggle = document.getElementById("theme-mobile-toggle");
const themeMobileDropdown = document.getElementById("theme-mobile");

themeMobileToggle.addEventListener("click", () => {
  themeMobileDropdown.classList.toggle("hidden");
});

handleThemeChange(savedTheme, true);

document.getElementById("light-btn-mob").addEventListener("click", () => {
  document.body.classList.remove("dark");
  localStorage.setItem("theme", "light");
  updateDots("light", true);
  themeMobileDropdown.classList.add("hidden");
});

document.getElementById("dark-btn-mob").addEventListener("click", () => {
  document.body.classList.add("dark");
  localStorage.setItem("theme", "dark");
  updateDots("dark", true);
  themeMobileDropdown.classList.add("hidden");
});

document.getElementById("system-btn-mob").addEventListener("click", () => {
  applySystemTheme();
  updateDots("system", true);
  themeMobileDropdown.classList.add("hidden");
});

document.addEventListener("click", (event) => {
  if (
    !themeMobileDropdown.contains(event.target) &&
    !themeMobileToggle.contains(event.target)
  ) {
    themeMobileDropdown.classList.add("hidden");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    themeMobileDropdown.classList.add("hidden");
  }
});

// Right Collapse
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

// News Carousel
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

// Drop down Main
//1
const dropdownMenuMain = document.getElementById("dropdownMenuMain");
const selectedIcon = document.getElementById("selectedIcon");
const selectedText = document.getElementById("selectedText");
const selectedSubText = document.getElementById("selectedSubText");

function toggleDropdownMain(event) {
  dropdownMenuMain.classList.toggle("hidden");
  event.stopPropagation();
}

const dropdownItems = dropdownMenuMain.querySelectorAll(".dropdown-item");

dropdownItems.forEach((item) => {
  item.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const imgSrc = this.getAttribute("data-img");
    const subText = this.getAttribute("data-subtext");

    selectedIcon.src = imgSrc;
    selectedText.textContent = name;
    selectedSubText.textContent = subText;

    dropdownMenuMain.classList.add("hidden");
  });
});

document.addEventListener("click", function (event) {
  if (
    !dropdownMenuMain.contains(event.target) &&
    !openMenuBtn.contains(event.target)
  ) {
    dropdownMenuMain.classList.add("hidden");
  }
});

dropdownMenuMain.addEventListener("click", function (event) {
  event.stopPropagation();
});

function toggleDropdownMain(event) {
  event.stopPropagation();

  const dropdown = document.getElementById("dropdownMenuMain");
  dropdown.classList.toggle("hidden");
}
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("dropdownMenuMain");

  dropdown.classList.add("hidden");
});
document.addEventListener("keydown", function (event) {
  const dropdown = document.getElementById("dropdownMenuMain");
  if (event.key === "Escape") {
    dropdown.classList.add("hidden");
  }
});
//2
const dropdownMenu2Main = document.getElementById("dropdownMenu2Main");
const selectedIcon2 = document.getElementById("selectedIcon2");
const selectedText2 = document.getElementById("selectedText2");

function toggleDropdown2Main(event) {
  dropdownMenu2Main.classList.toggle("hidden");
  event.stopPropagation();
}

const dropdownItems2 = dropdownMenu2Main.querySelectorAll(".dropdown-item");

dropdownItems2.forEach((item) => {
  item.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const imgSrc = this.getAttribute("data-img");

    selectedIcon2.src = imgSrc;
    selectedText2.textContent = name;

    dropdownMenu2Main.classList.add("hidden");
  });
});

document.addEventListener("click", function (event) {
  if (!dropdownMenu2Main.contains(event.target)) {
    dropdownMenuMain.classList.add("hidden");
  }
});

document.addEventListener("keydown", function (event) {
  const dropdown = document.getElementById("dropdownMenu2Main");
  if (event.key === "Escape") {
    dropdown.classList.add("hidden");
  }
});

// Drop down mobile
//1
const dropdownMenuMini = document.getElementById("dropdownMenu");
const selectedIconmini = document.getElementById("selectedIconmini");
const selectedTextmini = document.getElementById("selectedTextmini");

function toggleDropdown(event) {
  dropdownMenuMini.classList.toggle("hidden");
  event.stopPropagation();
}

const dropdownItemsmini = dropdownMenuMini.querySelectorAll(".dropdown-item");

dropdownItemsmini.forEach((item) => {
  item.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const imgSrc = this.getAttribute("data-img");
    const subText = this.getAttribute("data-subtext");

    selectedIconmini.src = imgSrc;
    selectedTextmini.textContent = name;

    dropdownMenuMini.classList.add("hidden");
  });
});

document.addEventListener("click", function (event) {
  if (
    !dropdownMenuMini.contains(event.target) &&
    !openMenuBtn.contains(event.target)
  ) {
    dropdownMenuMini.classList.add("hidden");
  }
});

document.addEventListener("keydown", function (event) {
  const dropdown = document.getElementById("dropdownMenu");
  if (event.key === "Escape") {
    dropdown.classList.add("hidden");
  }
});

//2
const dropdownMenu2 = document.getElementById("dropdownMenu2");
const selectedIcon2mini = document.getElementById("selectedIcon2mini");
const selectedText2mini = document.getElementById("selectedText2mini");

function toggleDropdown2(event) {
  dropdownMenu2.classList.toggle("hidden");
  event.stopPropagation();
}

const dropdownItems2mini = dropdownMenu2.querySelectorAll(".dropdown-item");

dropdownItems2mini.forEach((item) => {
  item.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const imgSrc = this.getAttribute("data-img");

    selectedIcon2mini.src = imgSrc;
    selectedText2mini.textContent = name;

    dropdownMenu2.classList.add("hidden");
  });
});

document.addEventListener("click", function (event) {
  if (
    !dropdownMenu2.contains(event.target) &&
    !openMenuBtn.contains(event.target)
  ) {
    dropdownMenu2.classList.add("hidden");
  }
});

document.addEventListener("keydown", function (event) {
  const dropdown = document.getElementById("dropdownMenu2");
  if (event.key === "Escape") {
    dropdown.classList.add("hidden");
  }
});

// Show password
function togglePasswordVisibilityMain() {
  const passwordInput = document.getElementById("apiKeyInputMain");
  const showButton = document.getElementById("showButtonMain");

  const eyeOpenIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye size-3">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;

  const eyeClosedIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-closed size-3">
      <path d="m15 18-.722-3.25"></path>
      <path d="M2 8a10.645 10.645 0 0 0 20 0"></path>
      <path d="m20 15-1.726-2.05"></path>
      <path d="m4 15 1.726-2.05"></path>
      <path d="m9 18 .722-3.25"></path>
    </svg>
  `;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showButton.innerHTML = eyeClosedIcon;
  } else {
    passwordInput.type = "password";
    showButton.innerHTML = eyeOpenIcon;
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
const mainDiv = document.getElementById("main");
const popoverMenu = document.getElementById("popoverMenu");
const openMenuBtn = document.getElementById("openMenuBtn");
const blurBg = document.getElementById("bgblur");

function openPopover() {
  popoverMenu.classList.toggle("hidden");
  blurBg.classList.toggle("hidden");
}

document.getElementById("popOverClose").addEventListener("click", function () {
  popoverMenu.classList.add("hidden");
  blurBg.classList.add("hidden");
});

document.addEventListener("click", function (event) {
  if (
    !popoverMenu.contains(event.target) &&
    !openMenuBtn.contains(event.target)
  ) {
    popoverMenu.classList.add("hidden");
    blurBg.classList.add("hidden");
  }
});

document
  .getElementById("popoverMenu")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    popoverMenu.classList.add("hidden");
    blurBg.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtonRight = document.getElementById("toggle-sheet-r");
  const slidingSheetRight = document.getElementById("sliding-sheet-r");
  const closeButtonRight = document.getElementById("close-sheet-r");

  const toggleButtonLeft = document.getElementById("toggle-sheet-l");
  const slidingSheetLeft = document.getElementById("sliding-sheet-l");
  const closeButtonLeft = document.getElementById("close-sheet-l");

  const bgBlur2 = document.getElementById("bgblur2");

  function closeAllSheets() {
    slidingSheetRight.classList.remove("open");
    slidingSheetRight.classList.add("hidden");

    slidingSheetLeft.classList.remove("open");
    slidingSheetLeft.classList.add("hidden");

    bgBlur2.classList.add("hidden");
  }

  toggleButtonRight.addEventListener("click", function () {
    slidingSheetRight.classList.toggle("open");
    slidingSheetRight.classList.toggle("hidden");
    bgBlur2.classList.remove("hidden");
  });

  closeButtonRight.addEventListener("click", closeAllSheets);

  toggleButtonLeft.addEventListener("click", function () {
    slidingSheetLeft.classList.toggle("open");
    slidingSheetLeft.classList.toggle("hidden");
    bgBlur2.classList.remove("hidden");
  });

  closeButtonLeft.addEventListener("click", closeAllSheets);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllSheets();
    }
  });
});

//Logo popover
function toggleLogoPopover(e) {
  const popoverLogo = document.getElementById("popoverLogoContent");
  popoverLogo.classList.toggle("hidden");

  const popoverMain = document.getElementById("popoverLogoContentMain");
  popoverMain.classList.add("hidden");

  e.stopPropagation();
}

function popoverLogoContentMain(e) {
  const popoverLogo = document.getElementById("popoverLogoContentMain");
  popoverLogo.classList.toggle("hidden");

  const popover = document.getElementById("popoverLogoContent");
  popover.classList.add("hidden");

  e.stopPropagation();
}

document.addEventListener("click", function (e) {
  const popoverLogo = document.getElementById("popoverLogoContent");
  const popoverMain = document.getElementById("popoverLogoContentMain");
  const button = document.querySelector("button");

  if (
    !popoverLogo.contains(e.target) &&
    !popoverMain.contains(e.target) &&
    !button.contains(e.target)
  ) {
    popoverLogo.classList.add("hidden");
    popoverMain.classList.add("hidden");
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const popoverMenu = document.getElementById("popoverMenu");
    const dropdownMenu = document.getElementById("dropdownMenuMain");
    const slidingSheet = document.getElementById("sliding-sheet-r");
    const slidingSheetLeft = document.getElementById("sliding-sheet-l");
    const blurBg = document.getElementById("bgblur");

    if (
      (popoverMenu && !popoverMenu.classList.contains("hidden")) ||
      (dropdownMenu && !dropdownMenu.classList.contains("hidden")) ||
      (slidingSheet && !slidingSheet.classList.contains("hidden")) ||
      (slidingSheetLeft && !slidingSheetLeft.classList.contains("hidden"))
    ) {
      if (popoverMenu) popoverMenu.classList.add("hidden");
      if (dropdownMenu) dropdownMenu.classList.add("hidden");
      if (slidingSheet) slidingSheet.classList.add("hidden");
      if (slidingSheetLeft) slidingSheetLeft.classList.add("hidden");

      if (blurBg) blurBg.classList.toggle("hidden");
    }
  }
});

const dataSheet = document.getElementById("data-sheet");
const openSheetButton = document.getElementById("open-data-sheet-button");
const openSheetButton2 = document.getElementById("open-data-sheet-button2");
const closeSheetBtn = document.getElementById("close-data-sheet-button");
const blurBg2 = document.getElementById("bgblur3");

openSheetButton.addEventListener("click", () => {
  dataSheet.classList.remove("hidden");
  blurBg2.classList.remove("hidden");
});

openSheetButton2.addEventListener("click", () => {
  dataSheet.classList.remove("hidden");
  blurBg2.classList.remove("hidden");
});

function closeDataSheet() {
  dataSheet.classList.add("hidden");
  blurBg2.classList.add("hidden");
}

closeSheetBtn.addEventListener("click", closeDataSheet);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDataSheet();
  }
});

// Search filter
document.getElementById("searchInput").addEventListener("input", function () {
  const searchQuery = this.value.toLowerCase();
  const sections = document.querySelectorAll(".searchable-section");
  let hasResults = false;

  sections.forEach((section) => {
    const items = section.querySelectorAll(".searchable-item");
    let sectionHasResults = false;

    items.forEach((item) => {
      const itemText = item.getAttribute("data-search-terms").toLowerCase();
      if (itemText.includes(searchQuery)) {
        item.style.display = "flex";
        sectionHasResults = true;
      } else {
        item.style.display = "none";
      }
    });

    if (sectionHasResults) {
      section.style.display = "block";
      hasResults = true;
    } else {
      section.style.display = "none";
    }
  });

  const noResultsMessage = document.getElementById("noResultsFound");
  if (hasResults) {
    noResultsMessage.style.display = "none";
  } else {
    noResultsMessage.style.display = "block";
  }
});

// Tabs
const nodeTab = document.getElementById("node-tab");
const tabTab = document.getElementById("tab-tab");
const nodeViewContent = document.getElementById("node-view-content");
const tabViewContent = document.getElementById("tab-view-content");

function switchTab(activeTab, activeContent) {
  const allTabs = document.querySelectorAll(".tab-content");
  allTabs.forEach((tab) => {
    tab.classList.add("hidden");
  });

  const allButtons = document.querySelectorAll(".tab-button");
  allButtons.forEach((button) => {
    button.classList.remove("bg-gray-800", "text-white", "border-gray-800");
    button.classList.add("bg-gray-200", "text-gray-800", "border-transparent");
  });

  activeContent.classList.remove("hidden");
}

nodeTab.addEventListener("click", () => {
  switchTab(nodeTab, nodeViewContent);
});

tabTab.addEventListener("click", () => {
  switchTab(tabTab, tabViewContent);
});

// Scroll container
const scrollContainer = document.getElementById("scrollContainer");

let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener("wheel", (e) => {
  e.preventDefault();
  scrollContainer.scrollLeft += e.deltaY * 5;
});

scrollContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  scrollContainer.classList.add("cursor-grabbing");
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener("mouseleave", () => {
  isDown = false;
  scrollContainer.classList.remove("cursor-grabbing");
});

scrollContainer.addEventListener("mouseup", () => {
  isDown = false;
  scrollContainer.classList.remove("cursor-grabbing");
});

scrollContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 1.5;
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// Dynamic type area
const buttons = document.querySelectorAll("[data-value]");
const textarea = document.getElementById("dynamicTextarea");
const defaultValue = "Ask anything";

buttons.forEach((button) => {
  button.addEventListener("mouseover", (event) => {
    const newValue = event.target.closest("button").getAttribute("data-value");
    textarea.value = newValue;
  });

  button.addEventListener("mouseleave", () => {
    textarea.value = defaultValue;
  });
});

document.addEventListener("mouseover", (event) => {
  if (![...buttons].some((button) => button.contains(event.target))) {
    textarea.value = defaultValue;
  }
});

// Toggle Functionality
const toggleButton = document.getElementById("toggle-button");
const circle = document.getElementById("circle");

toggleButton.addEventListener("click", () => {
  const isChecked = toggleButton.getAttribute("aria-checked") === "true";

  if (isChecked) {
    toggleButton.setAttribute("aria-checked", "false");
    toggleButton.classList.remove("bg-green-500", "dark:bg-green-400");
    toggleButton.classList.add("bg-neutral-200", "dark:bg-neutral-700");
    circle.classList.remove("translate-x-5");
    circle.classList.add("translate-x-0");
  } else {
    toggleButton.setAttribute("aria-checked", "true");
    toggleButton.classList.remove("bg-neutral-200", "dark:bg-neutral-700");
    toggleButton.classList.add("bg-green-500", "dark:bg-green-400");
    circle.classList.remove("translate-x-0");
    circle.classList.add("translate-x-5");
  }
});
