const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

function shuffleGallery() {
  if (!galleryGrid) return;
  const items = Array.from(galleryGrid.children);

  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  items.forEach((item) => galleryGrid.appendChild(item));
}

function openLightbox(src) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

galleryGrid?.addEventListener('click', (event) => {
  const item = event.target.closest('.gallery-item');
  if (!item) return;
  const src = item.dataset.src || item.querySelector('img')?.src;
  if (src) openLightbox(src);
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxBackdrop?.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('open')) {
    closeLightbox();
  }
});


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
