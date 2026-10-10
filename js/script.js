
// ========================================
// 1. Select page elements
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const currentYear = document.querySelector("#current-year");


// ========================================
// 2. Mobile navigation
// ========================================

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation");
  navLinks.classList.add("is-open");
  document.body.classList.add("menu-open");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded =
      menuToggle.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close the menu after a navigation link is selected.
  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu if the user presses Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Close the mobile menu when returning to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      closeMenu();
    }
  });
}


// ========================================
// 3. Highlight the active navigation link
// ========================================

function updateActiveLink() {
  const scrollPosition = window.scrollY + 150;

  let activeSectionId = "";

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      activeSectionId = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    const targetId = link.getAttribute("href").slice(1);
    const isActive = targetId === activeSectionId;

    if (isActive) {
      link.classList.add("active");
      link.setAttribute("aria-current", "location");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveLink, {
  passive: true
});

window.addEventListener("load", updateActiveLink);


// ========================================
// 4. Update the footer year
// ========================================

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


// ========================================
// 5. Initial setup
// ========================================

closeMenu();

console.log("Portfolio website loaded successfully.");
