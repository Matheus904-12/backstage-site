// ==========================================================================
// BACKSTAGE — script compartilhado
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initCollageText();
  initNavToggle();
  initCarousels();
  initFeedbackForms();
});

// ---------- Texto recortado (collage) ----------
function initCollageText() {
  const palettes = {
    default: ['#8C2F39', '#2E5C4E', '#1F3A5F', '#B5762B', '#5C3A5C', '#3E4A2E', '#7E4A8C', '#C4402E'],
    pastel: ['#E8927C', '#F0C36D', '#A9CBC0', '#E3A8C4', '#C9B8E8', '#F3D896', '#9FD8C9'],
  };
  const fonts = ["'Bungee', cursive", "'Zilla Slab', serif", "'Caveat', cursive"];
  const rotations = [-6, 4, -3, 6, -8, 3, -4, 7, -5, 2, -7, 5];

  document.querySelectorAll('[data-collage]').forEach((el) => {
    const text = el.dataset.text || el.textContent.trim();
    const palette = palettes[el.dataset.variant] || palettes.default;
    el.textContent = '';
    let i = 0;
    for (const ch of text) {
      const span = document.createElement('span');
      if (ch === ' ') {
        span.innerHTML = '&nbsp;';
        span.style.width = '0.32em';
      } else {
        span.textContent = ch;
        span.style.fontFamily = fonts[i % fonts.length];
        span.style.color = palette[i % palette.length];
        span.style.transform = `rotate(${rotations[i % rotations.length]}deg)`;
        i++;
      }
      el.appendChild(span);
    }
  });
}

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
