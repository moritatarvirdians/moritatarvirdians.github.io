/* Minimal progressive enhancement. The site works fully without this file. */
(function () {
  "use strict";

  /* ---- Theme toggle -------------------------------------------------- */
  var root = document.documentElement;
  var STORAGE_KEY = "mt-theme";

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* private mode */ }
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      btn.textContent = theme === "dark" ? "☼" : "☾";
    }
  }

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  } catch (e) { /* ignore */ }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    applyTheme(currentTheme());
    btn.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  });

  /* ---- Mark the current nav item ------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var here = location.pathname.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
    document.querySelectorAll(".nav a").forEach(function (a) {
      var target = new URL(a.getAttribute("href"), location.href).pathname
        .replace(/index\.html$/, "").replace(/\/$/, "") || "/";
      if (target === here) a.setAttribute("aria-current", "page");
    });
  });
})();
