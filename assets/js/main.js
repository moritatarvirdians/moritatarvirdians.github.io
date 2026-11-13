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

  /* ---- Language switcher --------------------------------------------- */
  /* Machine translation through the Google Translate widget. Nothing from Google
     loads until a visitor picks a language; the choice lives in Google's own
     "googtrans" cookie, so it carries across pages. English clears it and reloads. */
  var LANGS = { fa: "rtl", hy: "ltr" };
  var FONTS = {
    fa: "Vazirmatn:wght@400;500;600",
    hy: "Noto+Sans+Armenian:wght@400;500;600&family=Noto+Serif+Armenian:wght@400;500"
  };

  function chosenLang() {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-z-]+)/);
    return m && LANGS[m[1]] ? m[1] : "en";
  }

  function writeLangCookie(value, maxAge) {
    var host = location.hostname.replace(/^www\./, "");
    var tail = "; path=/; max-age=" + maxAge;
    document.cookie = "googtrans=" + value + tail;
    if (host.indexOf(".") > 0) {
      document.cookie = "googtrans=" + value + tail + "; domain=" + host;
      document.cookie = "googtrans=" + value + tail + "; domain=." + host;
    }
  }

  function markLang(lang) {
    root.setAttribute("data-lang", lang);
    root.dir = LANGS[lang] || "ltr";
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
  }

  function loadFonts(lang) {
    if (!FONTS[lang] || document.getElementById("font-" + lang)) return;
    var link = document.createElement("link");
    link.id = "font-" + lang;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=" + FONTS[lang] + "&display=swap";
    document.head.appendChild(link);
  }

  function loadTranslate() {
    if (window.mtTranslateInit) return;
    window.mtTranslateInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "fa,hy", autoDisplay: false }, "gt");
    };
    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=mtTranslateInit";
    document.head.appendChild(s);
  }

  function switchLang(lang) {
    if (!LANGS[lang]) {
      writeLangCookie("", 0);
      location.reload();
      return;
    }
    writeLangCookie("/en/" + lang, 31536000);
    markLang(lang);
    loadFonts(lang);
    var combo = document.querySelector("#gt select.goog-te-combo");
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
    } else {
      loadTranslate();   // the widget reads the cookie and translates on load
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var lang = chosenLang();
    markLang(lang);
    if (lang !== "en") { loadFonts(lang); loadTranslate(); }
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        var next = b.getAttribute("data-lang");
        if (next !== chosenLang()) switchLang(next);
      });
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
