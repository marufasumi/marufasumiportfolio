// =======================================
//  script.js  (clean version)
//  - Sidebar toggle (mobile)
//  - Active link highlighting
//  - Smooth scrolling
//  - Summary / Education / Experience animations
//  - Skills & Certifications animations
//  - Projects accordion
// =======================================

  // Toggle Navbar Visibility for Mobile
  function toggleNavbar() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Add animation to the summary component on load
document.addEventListener("DOMContentLoaded", function () {
  const summarySection = document.querySelector(".record-view-form");

  // Add a visible class to trigger fade-in animation
  setTimeout(() => {
      summarySection.style.opacity = 1;
      summarySection.style.transform = "translateY(0)";
  }, 300); // Delay for smoother animation
});

document.addEventListener("DOMContentLoaded", function () {
    const summary = document.getElementById("summary");
    summary.classList.add("visible");
});


document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------
  // 1. SIDEBAR TOGGLE (MOBILE)
  // -----------------------------------
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebarToggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Close sidebar when a nav link is clicked (better mobile UX)
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  });

  // -----------------------------------
  // 2. ACTIVE LINK HIGHLIGHT + SMOOTH SCROLL
  // -----------------------------------
  const sections = document.querySelectorAll(
    "#hero, #summary-section, #experience, #skills, #education, #certifications, #projects"
  );

  const getSectionIdFromHref = href => {
    if (!href || !href.startsWith("#")) return null;
    return href.slice(1);
  };

  // Highlight current section in sidebar
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const linkId = getSectionIdFromHref(link.getAttribute("href"));
            link.classList.toggle("active", linkId === id);
          });
        }
      });
    },
    { threshold: 0.4 } // 40% visible
  );

  sections.forEach(section => sectionObserver.observe(section));

  // Smooth scroll when clicking sidebar links
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      const id = getSectionIdFromHref(href);
      if (!id) return; // external link (e.g., resume) – let it behave normally

      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });

        // Set active immediately on click
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // -----------------------------------
  // 3. SUMMARY CARD FADE-IN ON SCROLL
  // -----------------------------------
  const summaryCard = document.querySelector(".record-view-form");
  if (summaryCard) {
    const summaryObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            summaryCard.classList.add("visible");
            summaryObserver.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    summaryObserver.observe(summaryCard);
  }

  // -----------------------------------
  // 4. EDUCATION TIMELINE ANIMATION
  // -----------------------------------
  const eduItems = document.querySelectorAll(".timeline-item");
  if (eduItems.length) {
    const eduObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    eduItems.forEach(item => eduObserver.observe(item));
  }

  // -----------------------------------
  // 5. EXPERIENCE TIMELINE ANIMATION + EXPAND
  // -----------------------------------
  const expItems = document.querySelectorAll(".timeline__item");
  if (expItems.length) {
    // Fade-in on scroll
    const expObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    expItems.forEach(item => expObserver.observe(item));

    // Hover & mobile expand / collapse
    expItems.forEach(item => {
      const details = item.querySelector(".timeline__details");

      // Hover effect (desktop)
      item.addEventListener("mouseenter", () => {
        item.classList.add("hover");
      });
      item.addEventListener("mouseleave", () => {
        item.classList.remove("hover");
      });

      // Click to expand details (especially useful on mobile)
      if (details) {
        details.addEventListener("click", () => {
          details.classList.toggle("expanded");
        });
      }

      // For narrow screens, tap on entire item to expand
      item.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          item.classList.toggle("expanded");
        }
      });
    });
  }

  // -----------------------------------
  // 6. SKILLS – STAGGERED BADGE ANIMATION
  // -----------------------------------
  const badges = document.querySelectorAll(".badge");
  badges.forEach((badge, index) => {
    setTimeout(() => {
      badge.style.opacity = 1;
      badge.style.transform = "translateY(0)";
    }, index * 100); // 100ms stagger
  });

  // -----------------------------------
  // 7. CERTIFICATIONS – STAGGERED CARD ANIMATION
  // -----------------------------------
  const certBoxes = document.querySelectorAll(".cert-box");
  certBoxes.forEach((box, index) => {
    setTimeout(() => {
      box.style.opacity = "1";
      box.style.transform = "translateY(0)";
    }, index * 200); // 200ms stagger
  });

  // -----------------------------------
  // 8. PROJECTS – CATEGORY ACCORDION + CARD EXPAND
  // -----------------------------------
  // Category open/close
  document.querySelectorAll(".project-category-header").forEach(header => {
    header.addEventListener("click", () => {
      const category = header.parentElement;
      category.classList.toggle("expanded");
    });
  });

  // Each card can expand its body
  document.querySelectorAll(".project-card-header").forEach(header => {
    header.addEventListener("click", () => {
      const card = header.parentElement;
      card.classList.toggle("expanded");
    });
  });
});
