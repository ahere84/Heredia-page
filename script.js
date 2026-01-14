const toggleButton = document.getElementById("themeToggle");
const yearEl = document.getElementById("year");
const sections = document.querySelectorAll("[data-section]");
const navLinks = document.querySelectorAll(".nav-links a");

const setTheme = (mode) => {
  document.body.classList.toggle("theme-dark", mode === "dark");
  toggleButton.textContent = mode === "dark" ? "Light mode" : "Dark mode";
  toggleButton.setAttribute("aria-pressed", mode === "dark");
};

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  setTheme(storedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
}

toggleButton.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  setTheme(nextTheme);
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  {
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0.1,
  }
);

sections.forEach((section) => {
  if (section.id) {
    observer.observe(section);
  }
});
