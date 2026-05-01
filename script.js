// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== FADE IN ON SCROLL =====
const fadeEls = document.querySelectorAll(
  '.project-card, .about-card, .skill-category, .contact-link, .section-title, .section-tag'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ===== HERO NUMBER COUNTER =====
function animateCount(el, target, suffix = '') {
  let current = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = [17, 4, 3];
      const suffixes = ['+', '+', ''];
      statNums.forEach((el, i) => animateCount(el, nums[i], suffixes[i]));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
if (statNums.length) statsObserver.observe(statNums[0].closest('.hero-stats'));

// ===== PARTICLE TRAIL =====
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.85) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed; pointer-events: none; z-index: 9990;
      width: 4px; height: 4px; border-radius: 50%;
      background: hsl(${Math.random() * 60 + 250}, 80%, 70%);
      left: ${e.clientX}px; top: ${e.clientY}px;
      transform: translate(-50%, -50%);
      animation: particle-fade 0.6s ease-out forwards;
    `;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
  }
});

const style = document.createElement('style');
style.textContent = `
  @keyframes particle-fade {
    from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    to { opacity: 0; transform: translate(-50%, calc(-50% - 20px)) scale(0); }
  }
`;
document.head.appendChild(style);

// ===== TITLE TYPING EFFECT =====
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let i = 0;
  setTimeout(() => {
    const typeInterval = setInterval(() => {
      subtitle.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(typeInterval);
    }, 35);
  }, 500);
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = '#c4b5fd';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

console.log('%c🚀 Portfolio by Sanjeev Krishna', 'color: #7c3aed; font-size: 16px; font-weight: bold;');
console.log('%c🐙 GitHub: https://github.com/Jsanjeevkrishna', 'color: #06b6d4; font-size: 12px;');

