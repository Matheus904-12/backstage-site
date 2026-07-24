// ==========================================================================
// BACKSTAGE — script compartilhado
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initCarousels();
  initFeedbackForms();
});

// ---------- Menu mobile ----------
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.dept-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

// ---------- Carrossel ----------
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('.carousel-track');
    const slides = Array.from(root.querySelectorAll('.carousel-slide'));
    const dotsWrap = root.querySelector('.carousel-dots');
    if (!track || slides.length === 0) return;

    let index = 0;

    // Se só tem uma dinâmica, esconde os controles (regra do briefing)
    if (slides.length === 1) {
      root.querySelectorAll('.carousel-btn, .carousel-dots').forEach(el => el.style.display = 'none');
      return;
    }

    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    const counter = root.querySelector('.carousel-counter');

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      if (dotsWrap) {
        Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === index));
      }
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    root.querySelector('.carousel-btn.prev')?.addEventListener('click', () => goTo(index - 1));
    root.querySelector('.carousel-btn.next')?.addEventListener('click', () => goTo(index + 1));

    // autoplay leve
    let timer = setInterval(() => goTo(index + 1), 5000);
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', () => { timer = setInterval(() => goTo(index + 1), 5000); });
  });
}

// ---------- Formulário de feedback (letterbox) ----------
function initFeedbackForms() {
  document.querySelectorAll('.letterbox form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-note');
      if (note) {
        note.textContent = 'Feedback enviado. Obrigado!';
        note.style.color = '#C4402E';
      }
      form.reset();
    });
  });
}
