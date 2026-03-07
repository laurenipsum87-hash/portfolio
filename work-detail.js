// ── Custom cursor ──
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = -100, my = -100, rx = -100, ry = -100;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function tick() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(tick);
})();

// ── Parallax hero bg ──
const heroBg = document.getElementById('wdHeroBg');
window.addEventListener('scroll', () => {
  if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.35}px) scale(1.05)`;
}, { passive: true });

// ── Adaptive nav ──
(function() {
  const nav = document.querySelector('.top-nav');
  if (!nav) return;
  function update() {
    const heroH = document.querySelector('.wd-hero')?.offsetHeight || window.innerHeight;
    const checkY = window.scrollY + nav.offsetHeight * 0.5;
    nav.classList.toggle('light', checkY >= heroH);
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.08 });
reveals.forEach(el => ro.observe(el));

// ── Lightbox (static images only) ──
(function() {
  const lb = document.createElement('div');
  lb.id = 'wd-lightbox';
  const lbImg = document.createElement('img');
  lb.appendChild(lbImg);
  document.body.appendChild(lb);

  document.querySelectorAll('.wd-img-block img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lb.classList.add('open');
    });
  });

  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lb.classList.remove('open');
  });
})();
