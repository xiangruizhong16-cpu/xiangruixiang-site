const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

document.querySelector("#year").textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -45% 0px" }
);

sections.forEach((section) => observer.observe(section));

const luyepaiCard = document.querySelector('[data-project="luyepai"]');
const luyepaiModal = document.querySelector('[data-project-modal="luyepai"]');
const reportGallery = document.querySelector("[data-report-gallery]");
const closeModalButtons = [...document.querySelectorAll("[data-modal-close]")];
let activeModalTrigger = null;
let reportPagesLoaded = false;

function loadReportPages() {
  if (reportPagesLoaded || !reportGallery) return;

  const pages = window.luyepaiReportPages || [];
  reportGallery.innerHTML = "";

  if (!pages.length) {
    reportGallery.innerHTML = '<p class="report-loading">报告册图片暂未加载。</p>';
    reportPagesLoaded = true;
    return;
  }

  const fragment = document.createDocumentFragment();

  pages.forEach((page, index) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");

    figure.className = "report-page";
    image.src = page.src;
    image.alt = page.alt || `陆野派项目报告册第 ${index + 1} 页`;
    image.loading = index < 2 ? "eager" : "lazy";
    image.decoding = "async";
    caption.textContent = `第 ${index + 1} / ${pages.length} 页`;

    figure.append(image, caption);
    fragment.append(figure);
  });

  reportGallery.append(fragment);
  reportPagesLoaded = true;
}

function openLuyepaiModal(trigger) {
  if (!luyepaiModal) return;
  activeModalTrigger = trigger;
  loadReportPages();
  luyepaiModal.hidden = false;
  document.body.classList.add("modal-open");
  luyepaiModal.querySelector(".modal-close-button").focus();
}

function closeLuyepaiModal() {
  if (!luyepaiModal || luyepaiModal.hidden) return;
  luyepaiModal.hidden = true;
  document.body.classList.remove("modal-open");
  if (activeModalTrigger) activeModalTrigger.focus();
}

if (luyepaiCard) {
  luyepaiCard.addEventListener("click", () => openLuyepaiModal(luyepaiCard));
  luyepaiCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLuyepaiModal(luyepaiCard);
    }
  });
}

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeLuyepaiModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLuyepaiModal();
});
