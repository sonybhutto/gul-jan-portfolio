
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ---------- DARK / LIGHT MODE ----------

const themeBtn = $("#themeToggle");

if (themeBtn) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeBtn.textContent = "☀️";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeBtn.textContent = "🌙";
  }

  themeBtn.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "light" : "dark"
    );

    themeBtn.textContent = isDark ? "🌙" : "☀️";

    localStorage.setItem("theme", isDark ? "light" : "dark");
  });
}

// ---------- MOBILE MENU ----------

const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    menuBtn.textContent = navLinks.classList.contains("open")
      ? "✕"
      : "☰";
  });

  $$("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.textContent = "☰";
    });
  });
}

// ---------- TYPING ANIMATION ----------

const phrases = [
  "Exploring Artificial Intelligence",
  "Building Machine Learning Projects",
  "Developing Python Applications",
  "Researching AI and Data Science"
];

const typed = $("#typed");

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  if (!typed) return;

  const word = phrases[phraseIndex];

  typed.textContent = deleting
    ? word.slice(0, --charIndex)
    : word.slice(0, ++charIndex);

  let delay = deleting ? 35 : 80;

  if (!deleting && charIndex === word.length) {
    delay = 1600;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

if (typed) {
  type();
}

// ---------- SCROLL PROGRESS, NAVBAR AND ACTIVE LINKS ----------

const nav = $("#nav");
const progress = $("#progress");
const toTop = $("#toTop");

const sections = $$("main section[id]");
const links = $$("#navLinks a");

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  const max =
    document.documentElement.scrollHeight - window.innerHeight;

  const percentage = max > 0 ? (y / max) * 100 : 0;

  if (progress) {
    progress.style.width = percentage + "%";
  }

  if (nav) {
    nav.classList.toggle("scrolled", y > 40);
  }

  if (toTop) {
    toTop.classList.toggle("show", y > 500);
  }

  let current = "";

  sections.forEach((section) => {
    if (y >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  links.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
});

// ---------- BACK TO TOP ----------

if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ---------- REVEAL ON SCROLL + SKILL BARS ----------

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        element.classList.add("visible");

        element.querySelectorAll(".fill").forEach((fill) => {
          fill.style.width = fill.dataset.width + "%";
        });

        observer.unobserve(element);
      });
    },
    {
      threshold: 0.1
    }
  );

  $$(".reveal").forEach((element) => {
    observer.observe(element);
  });
} else {
  $$(".reveal").forEach((element) => {
    element.classList.add("visible");
  });

  $$(".fill").forEach((fill) => {
    fill.style.width = fill.dataset.width + "%";
  });
}

// ---------- SUBTLE 3D PROJECT CARD EFFECT ----------

if (
  window.matchMedia("(hover: hover) and (min-width: 901px)").matches
) {
  $$(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `
        perspective(1200px)
        rotateY(${x * 1.8}deg)
        rotateX(${-y * 1.8}deg)
        translateY(-3px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// ---------- FOOTER YEAR ----------

const yearElement = $("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
