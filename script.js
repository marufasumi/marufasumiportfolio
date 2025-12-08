
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




//SIDE NAVBAR STYLE 
  
  
  document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(
    "#hero, #summary-section, #experience, #skills, #education, #certifications, #projects"
  );
  const navLinks = document.querySelectorAll(".nav-links a");

  const sectionIdFromHref = href => href.split("#")[1];

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              sectionIdFromHref(link.getAttribute("href")) === id
            );
          });
        }
      });
    },
    {
      threshold: 0.4, // 40% visible
    }
  );

  sections.forEach(section => observer.observe(section));

  // Also make click scroll smooth & set active immediately
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = sectionIdFromHref(link.getAttribute("href"));
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });
});


// To keep the banner always on the top
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");

      // Special case for Home
      if (href === "./index.html" || href === "#hero" || href === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // ... your existing smooth-scroll code for other sections ...
    });
  });
});




// NAVBAR JS END


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


// ANIMATION FOR ABOUT ME SECTION
document.addEventListener("DOMContentLoaded", function () {
  const summaryComponent = document.querySelector(".record-view-form");

  // Check if the element is visible in the viewport
  const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  };

  const handleScroll = () => {
      if (isInViewport(summaryComponent)) {
          summaryComponent.classList.add("visible");
          window.removeEventListener("scroll", handleScroll); // Stop listening after animation triggers
      }
  };

  // Listen for scroll events to trigger the animation
  window.addEventListener("scroll", handleScroll);

  // Initial check in case the component is already in view
  handleScroll();
});


// Optional: Smooth scrolling for links (HOMEPGAE)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
// JavaScript for animating when the section is in view
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("animatedForm");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          form.classList.add("visible"); // Add visible class
        }
      });
    },
    { threshold: 0.2 } // Trigger when 20% of the element is visible
  );

  observer.observe(form);
});
// JavaScript to mimic hover effect on click
document.addEventListener("DOMContentLoaded", function () {
  const clickableSection = document.querySelector(".clickable");

  clickableSection.addEventListener("click", function () {
      this.classList.add("hover-active");

      // Remove the class after a short delay (optional, for visual effect)
      setTimeout(() => {
          this.classList.remove("hover-active");
      }, 300); // 300ms matches the CSS transition duration
  });
});

// JS FOR VIEWPORT DETECTION
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".timeline-item");

  const isInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0;
  };

  const checkVisibility = () => {
      items.forEach((item) => {
          if (isInViewport(item)) {
              item.classList.add("visible");
          } else {
              item.classList.remove("visible");
          }
      });
  };

  window.addEventListener("scroll", checkVisibility);
  checkVisibility(); // Initial check on page load
});






// EDUCATION
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".timeline-item");

  const isInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  };

  const checkVisibility = () => {
      items.forEach((item) => {
          if (isInViewport(item)) {
              item.classList.add("visible");
          } else {
              item.classList.remove("visible");
          }
      });
  };

  window.addEventListener("scroll", checkVisibility);
  checkVisibility(); // Initial check on page load
});

// SKILL PAGE
document.addEventListener("DOMContentLoaded", function () {
  const badges = document.querySelectorAll(".badge");

  badges.forEach((badge, index) => {
      setTimeout(() => {
          badge.style.opacity = 1;
          badge.style.transform = "translateY(0)";
      }, index * 100); // Stagger each badge by 100ms
  });
});

// JS FOR CERTIFICATION
document.addEventListener("DOMContentLoaded", function () {
  const certBoxes = document.querySelectorAll(".cert-box");

  certBoxes.forEach((box, index) => {
      setTimeout(() => {
          box.style.opacity = "1";
          box.style.transform = "translateY(0)";
      }, index * 200); // Stagger by 200ms
  });
});

// PROFESSIONAL EXPERIENCE COMPONENT
document.addEventListener("DOMContentLoaded", function () {
  const timelineItems = document.querySelectorAll(".timeline__item");

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
          } else {
              entry.target.classList.remove("visible"); // Remove class when out of view for re-triggering
          }
      });
  }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
  });

  timelineItems.forEach(item => {
      observer.observe(item);
  });

  // Add hover effect for larger screens
  timelineItems.forEach(item => {
      item.addEventListener("mouseenter", () => item.classList.add("hover"));
      item.addEventListener("mouseleave", () => item.classList.remove("hover"));
  });

  // Toggle expand/collapse on mobile
  timelineItems.forEach(item => {
      item.addEventListener("click", () => {
          if (window.innerWidth <= 768) { // Only for mobile screens
              item.classList.toggle("expanded");
          }
      });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const timelineDetails = document.querySelectorAll(".timeline__details");

  timelineDetails.forEach((detail) => {
      // Add click event for expanding/collapsing the box
      detail.addEventListener("click", () => {
          // Toggle the expanded state
          detail.classList.toggle("expanded");
      });

      // Add hover effect for better interaction
      detail.addEventListener("mouseenter", () => {
          detail.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      });

      detail.addEventListener("mouseleave", () => {
          detail.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      });
  });
});


