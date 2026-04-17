// Load header and footer from separate files
async function loadHeaderFooter() {
  try {
    // Load header
    const headerResponse = await fetch("header.html");
    const headerHTML = await headerResponse.text();
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
      headerPlaceholder.innerHTML = headerHTML;
      setActiveNavLink();
    }

    // Load footer
    const footerResponse = await fetch("footer.html");
    const footerHTML = await footerResponse.text();
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = footerHTML;
      document.getElementById("year").textContent =
        new Date().getFullYear();
    }

    // Initialize nav toggle after header is loaded
    initializeNavToggle();
  } catch (error) {
    console.error("Error loading header/footer:", error);
  }
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initializeNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open");
    });
  }
}

// Load header and footer when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadHeaderFooter);
} else {
  loadHeaderFooter();
}
