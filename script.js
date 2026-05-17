// ======================================================
// script.js — Full page behavior
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  // ====================================================
  // 1. THEME TOGGLE
  // ====================================================
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  function applyTheme(theme) {
    const icon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      if (icon) icon.className = "bi bi-sun";
    } else {
      document.body.classList.remove("dark-mode");
      if (icon) icon.className = "bi bi-moon";
    }
  }

  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem("portfolio-theme", newTheme);
      applyTheme(newTheme);
    });
  }

  // ====================================================
  // 2. NAVBAR LINK HANDLING
  // ====================================================
  const navLinks = document.querySelectorAll(".top-nav-links .nav-links a[href^='#']");
  const sections = document.querySelectorAll(
    "#hero, #summary-section, #experience, #skills, #education, #certifications, #projects, #contact"
  );

  function getSectionIdFromHref(href) {
    if (!href || !href.startsWith("#")) return null;
    return href.slice(1);
  }

  // ====================================================
  // 3. MOBILE HAMBURGER
  // ====================================================
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNavPanel = document.getElementById("mobileNavPanel");

  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener("click", function () {
      const isOpen = mobileNavPanel.classList.toggle("open");
      hamburgerBtn.classList.toggle("active");
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNavPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        mobileNavPanel.classList.remove("open");
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ====================================================
  // 4. ACTIVE LINK HIGHLIGHT ON SCROLL
  // ====================================================
  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              const linkId = getSectionIdFromHref(link.getAttribute("href"));
              link.classList.toggle("active", linkId === id);
            });
          }
        });
      },
      { threshold: 0.45 }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ====================================================
  // 5. SMOOTH SCROLL
  // ====================================================
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const id = getSectionIdFromHref(href);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // ====================================================
  // 6. SUMMARY CARD REVEAL
  // ====================================================
  const summaryCard = document.querySelector(".record-view-form");
  if (summaryCard) {
    const summaryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            summaryCard.classList.add("visible");
            summaryObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    summaryObserver.observe(summaryCard);
  }

  // ====================================================
  // 7. EDUCATION TIMELINE ANIMATION
  // ====================================================
  const eduItems = document.querySelectorAll(".timeline-item");
  if (eduItems.length) {
    const eduObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    eduItems.forEach((item) => eduObserver.observe(item));
  }

  // ====================================================
  // 8. EXPERIENCE TIMELINE ANIMATION + EXPAND
  // ====================================================
  const expItems = document.querySelectorAll(".timeline__item");
  if (expItems.length) {
    const expObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    expItems.forEach((item) => expObserver.observe(item));

    expItems.forEach((item) => {
      const details = item.querySelector(".timeline__details");
      if (details) {
        details.addEventListener("click", () => {
          details.classList.toggle("expanded");
        });
      }
    });
  }

  // ====================================================
  // 9. SKILLS BADGE STAGGER ANIMATION
  // ====================================================
  const badges = document.querySelectorAll(".badge");
  badges.forEach((badge, index) => {
    setTimeout(() => {
      badge.style.opacity = "1";
      badge.style.transform = "translateY(0)";
    }, index * 70);
  });

  // ====================================================
  // 10. CERTIFICATIONS STAGGER ANIMATION
  // ====================================================
  const certBoxes = document.querySelectorAll(".cert-box");
  certBoxes.forEach((box, index) => {
    setTimeout(() => {
      box.style.opacity = "1";
      box.style.transform = "translateY(0)";
    }, index * 120);
  });

  // ====================================================
  // 11. PROJECT FILTER TABS
  // - filters cards by data-category attribute
  // - "all" shows everything
  // ====================================================
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  const projectCards = document.querySelectorAll(".project-home-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ====================================================
  // 12. PROJECT CARDS SCROLL REVEAL
  // - stagger fade-in as cards enter viewport
  // ====================================================
  const projectCards2 = document.querySelectorAll(".project-home-card");
  if (projectCards2.length) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, i * 80);
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    projectCards2.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease, border-color 0.25s ease, box-shadow 0.25s ease";
      cardObserver.observe(card);
    });
  }

});
