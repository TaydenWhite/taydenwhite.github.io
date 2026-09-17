// Site interactions: theme toggle, mobile nav, header state, project filters,
// and click-to-load YouTube embeds.
(function () {
  const root = document.documentElement;

  // ---- Theme toggle ----
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.getAttribute("data-theme") || (media.matches ? "dark" : "light");

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const sync = () => button.setAttribute("aria-label", `Switch to ${currentTheme() === "dark" ? "light" : "dark"} mode`);
    sync();
    button.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      sync();
    });
    media.addEventListener("change", sync);
  });

  // ---- Mobile navigation ----
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navList = document.getElementById("nav-list");
  if (navToggle && navList) {
    const setOpen = (open) => {
      navList.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    };
    navToggle.addEventListener("click", () => setOpen(!navList.classList.contains("is-open")));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  // ---- Header border once scrolled ----
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---- Card filters ----
  document.querySelectorAll("[data-filters]").forEach((group) => {
    const grid = document.getElementById(group.dataset.filters);
    if (!grid) return;
    const buttons = group.querySelectorAll("[data-filter]");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const tag = button.dataset.filter;
        buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        grid.querySelectorAll("[data-tags]").forEach((card) => {
          const tags = card.dataset.tags.split("|");
          card.hidden = tag !== "all" && !tags.includes(tag);
        });
      });
    });
  });

  // ---- Click-to-load YouTube ----
  document.querySelectorAll("[data-youtube]").forEach((button) => {
    button.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.youtube}?autoplay=1&rel=0`;
      iframe.title = button.dataset.title || "YouTube video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      button.replaceWith(iframe);
    }, { once: true });
  });
})();
