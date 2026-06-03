// =============================================
//  NovexAgency — agency.js
//  DecodeLabs Project 1 | Batch 2026
// =============================================


// ── 1. Hamburger / Mobile Nav ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

function closeNav() {
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', false);
}


// ── 2. Sticky Header on Scroll ──
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});


// ── 3. Scroll Reveal ──
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.1}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));


// ── 4. Portfolio Filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active button state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// ── 5. Contact Form Submit ──
function submitForm() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const msgEl   = document.getElementById('form-msg');

  if (!name || !email || !message) {
    msgEl.style.color = '#f87171';
    msgEl.textContent = '⚠ Please fill in all required fields.';
    return;
  }

  if (!email.includes('@')) {
    msgEl.style.color = '#f87171';
    msgEl.textContent = '⚠ Please enter a valid email address.';
    return;
  }

  msgEl.style.color = '#c9a227';
  msgEl.textContent = '✦ Message sent! We\'ll get back to you within 24 hours.';

  // Reset form
  document.getElementById('name').value    = '';
  document.getElementById('email').value   = '';
  document.getElementById('service').value = '';
  document.getElementById('message').value = '';
}


// ── 6. Active Nav Highlight on Scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? '#c9a227'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
