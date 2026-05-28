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

  const educationLink = Array.from(nav.querySelectorAll(".nav-group > a")).find((link) => {
    const href = link.getAttribute("href") || "";
    return link.textContent.trim().toLowerCase() === "education" && href.includes("courses");
  });

  if (educationLink && !educationLink.parentElement.querySelector(".nav-menu")) {
    const group = educationLink.parentElement;
    const menu = document.createElement("div");
    const educationItems = [
      ["Foundations", "intro-fusioneq-ai.html"],
      ["FusionEQ LENS™", "lens-course.html"],
      ["FusionEQ READ™", "read-the-deal.html"],
      ["FusionEQ CLEAR™", "clear-review.html"],
      ["Executive Brief", "brief.html"]
    ];

    group.classList.add("has-dropdown");
    educationLink.setAttribute("aria-haspopup", "true");
    menu.className = "nav-menu";
    menu.setAttribute("aria-label", "Education navigation");

    educationItems.forEach(([label, href]) => {
      const item = document.createElement("a");
      item.href = href;
      item.textContent = label;
      if (window.location.pathname.endsWith(`/${href}`) || window.location.pathname.endsWith(href)) {
        item.setAttribute("aria-current", "page");
      }
      menu.appendChild(item);
    });

    group.appendChild(menu);
  }

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
