// Smooth scrolling for on-page links
document.querySelectorAll('a.nav-link[href^="#"], a.btn[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, "", href);
    }
  });
});

// Scroll-triggered animations
const animatedElements = document.querySelectorAll('.animate-fade, .animate-slide-left, .animate-slide-right, .animate-fade-up');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) el.classList.add('show');
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Active menu highlighting (for index sections)
const sections = document.querySelectorAll('section[id], header#home');
const navLinks = document.querySelectorAll('#navLinks .nav-link');
const setActiveLink = () => {
  let currentId = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) currentId = sec.id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Match anchors on index.html
    if (href && href.startsWith('index.html#')) {
      const id = href.split('#')[1];
      link.classList.toggle('active', id === currentId);
      if (id === currentId) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    }
  });
};
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Back-to-top button
const backBtn = document.getElementById('backToTop');
const toggleBackBtn = () => {
  if (!backBtn) return;
  if (window.scrollY > 300) backBtn.classList.add('show'); else backBtn.classList.remove('show');
};
window.addEventListener('scroll', toggleBackBtn);
if (backBtn) backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Bootstrap form validation
(() => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
