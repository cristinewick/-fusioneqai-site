(() => {
  const header = document.querySelector(".site-header");
  const nav = header?.querySelector(".primary-nav");

  if (!header || !nav) {
    return;
  }

  const button = document.createElement("button");
  button.className = "mobile-menu-toggle";
  button.type = "button";
  button.setAttribute("aria-controls", "primary-navigation");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = "<span></span><span></span><span></span><em>Menu</em>";

  nav.id = nav.id || "primary-navigation";
  header.insertBefore(button, nav);
  document.body.classList.add("mobile-menu-ready");

  const closeMenu = () => {
    document.body.classList.remove("mobile-menu-open");
    button.setAttribute("aria-expanded", "false");
  };

  button.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("mobile-menu-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
})();
