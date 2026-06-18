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

  const navLinks = Array.from(nav.querySelectorAll(".nav-group > a"));
  const normalizePath = (href) => href.split("#")[0];

  const addDropdown = ({ label, hrefIncludes, ariaLabel, items }) => {
    const trigger = navLinks.find((link) => {
      const href = link.getAttribute("href") || "";
      return link.textContent.trim().toLowerCase() === label.toLowerCase() && href.includes(hrefIncludes);
    });

    if (!trigger || trigger.parentElement.querySelector(".nav-menu")) {
      return;
    }

    const group = trigger.parentElement;
    const menu = document.createElement("div");

    group.classList.add("has-dropdown");
    trigger.setAttribute("aria-haspopup", "true");
    menu.className = "nav-menu";
    menu.setAttribute("aria-label", ariaLabel);

    items.forEach(([itemLabel, itemHref]) => {
      const item = document.createElement("a");
      const itemPath = normalizePath(itemHref);
      const itemHash = itemHref.includes("#") ? `#${itemHref.split("#")[1]}` : "";
      const currentPath = window.location.pathname;
      const currentHash = window.location.hash;
      item.href = itemHref;
      item.textContent = itemLabel;
      const pathMatches = currentPath.endsWith(`/${itemPath}`) || currentPath.endsWith(itemPath);
      const hashMatches = itemHash ? currentHash === itemHash : currentHash === "";
      if (pathMatches && hashMatches) {
        item.setAttribute("aria-current", "page");
      }
      menu.appendChild(item);
    });

    group.appendChild(menu);
  };

  addDropdown({
    label: "About",
    hrefIncludes: "about",
    ariaLabel: "About navigation",
    items: [
      ["About FusionEQ AI", "about.html"],
      ["Why FusionEQ Exists", "about.html#story"],
      ["Operating Shift", "about.html#shift"],
      ["Meet the Team", "about.html#team"],
      ["Founder", "about.html#founder"],
      ["Course Facilitator", "about.html#facilitator"]
    ]
  });

  addDropdown({
    label: "Education",
    hrefIncludes: "courses",
    ariaLabel: "Education navigation",
    items: [
      ["Education Overview", "courses.html"],
      ["Foundations", "intro-fusioneq-ai.html"],
      ["FusionEQ LENS™", "lens-course.html"],
      ["FusionEQ READ™", "read-the-deal.html"],
      ["FusionEQ CLEAR™", "clear-review.html"],
      ["Executive Brief", "brief.html"]
    ]
  });

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
