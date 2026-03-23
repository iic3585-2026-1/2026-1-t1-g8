document.addEventListener('DOMContentLoaded', () => {

  // === Card expand/collapse (accordion) ===
  document.querySelectorAll('.card').forEach(card => {
    card.querySelector('.card-header').addEventListener('click', () => {
      const wasExpanded = card.classList.contains('expanded');

      // Close all cards
      document.querySelectorAll('.card.expanded').forEach(c => c.classList.remove('expanded'));

      // Toggle clicked card
      if (!wasExpanded) {
        card.classList.add('expanded');
        setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    });
  });

  // === Flexbox Demo ===
  const flexDemo = document.getElementById('flexDemo');
  document.querySelectorAll('.flex-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const prop = btn.dataset.prop;
      const val = btn.dataset.val;

      // Update active state within same group
      btn.closest('.control-group').querySelectorAll('.flex-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      flexDemo.style[prop] = val;
    });
  });

  // === Grid Demo ===
  const gridDemo = document.getElementById('gridDemo');
  gridDemo.classList.add('layout-equal');

  document.querySelectorAll('.grid-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      document.querySelectorAll('.grid-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      gridDemo.className = 'grid-demo-container layout-' + btn.dataset.layout;
    });
  });

  // === Variables & calc() Demo ===
  const varsDemo = document.getElementById('varsDemo');
  const calcLayout = document.querySelector('.calc-layout');

  const hueSlider = document.getElementById('hueSlider');
  const satSlider = document.getElementById('satSlider');
  const radiusSlider = document.getElementById('radiusSlider');
  const sidebarSlider = document.getElementById('sidebarSlider');

  function updateVarsDemo() {
    if (!varsDemo) return;
    varsDemo.style.setProperty('--demo-hue', hueSlider.value);
    varsDemo.style.setProperty('--demo-sat', satSlider.value + '%');
    varsDemo.style.setProperty('--demo-radius', radiusSlider.value + 'px');
    document.getElementById('hueValue').textContent = hueSlider.value;
    document.getElementById('satValue').textContent = satSlider.value;
    document.getElementById('radiusValue').textContent = radiusSlider.value;
  }

  [hueSlider, satSlider, radiusSlider].forEach(s => {
    if (s) s.addEventListener('input', updateVarsDemo);
  });

  if (sidebarSlider && calcLayout) {
    sidebarSlider.addEventListener('input', () => {
      calcLayout.style.setProperty('--sidebar-w', sidebarSlider.value + 'px');
      document.getElementById('sidebarValue').textContent = sidebarSlider.value;
    });
  }

  // === Transforms Demo: 3D card follows cursor ===
  const t3dCard = document.getElementById('transform3d');
  if (t3dCard) {
    t3dCard.addEventListener('mousemove', e => {
      const rect = t3dCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      t3dCard.style.setProperty('--ry', (x * 30) + 'deg');
      t3dCard.style.setProperty('--rx', (-y * 30) + 'deg');
    });

    t3dCard.addEventListener('mouseleave', () => {
      t3dCard.style.setProperty('--ry', '0deg');
      t3dCard.style.setProperty('--rx', '0deg');
    });
  }

  // Transform buttons
  const transformTarget = document.getElementById('transformTarget');
  document.querySelectorAll('.transform-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const t = btn.dataset.transform;
      document.querySelectorAll('.transform-btn').forEach(b => b.classList.remove('active'));

      if (t === 'reset') {
        transformTarget.style.transform = 'none';
      } else {
        btn.classList.add('active');
        const transforms = {
          scale: 'scale(1.3)',
          skew: 'skewX(15deg)',
          translate: 'translate(30px, -20px)',
          rotate: 'rotate(45deg)'
        };
        transformTarget.style.transform = transforms[t];
      }
    });
  });

  // === Transitions Demo: Race ===
  const raceBtn = document.getElementById('raceBtn');
  let raceActive = false;

  if (raceBtn) {
    raceBtn.addEventListener('click', e => {
      e.stopPropagation();
      const runners = document.querySelectorAll('.race-runner');
      raceActive = !raceActive;
      runners.forEach(r => r.classList.toggle('moved', raceActive));
      raceBtn.textContent = raceActive ? '↺ Reiniciar' : '▶ Iniciar carrera';
    });
  }

  // === Animations Demo ===
  const animShowcase = document.getElementById('animShowcase');
  const playPauseBtn = document.getElementById('animPlayPause');
  let animPaused = false;

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', e => {
      e.stopPropagation();
      animPaused = !animPaused;
      animShowcase.style.animationPlayState = animPaused ? 'paused' : 'running';
      animShowcase.querySelectorAll('*').forEach(el => {
        el.style.animationPlayState = animPaused ? 'paused' : 'running';
      });
      playPauseBtn.textContent = animPaused ? '▶ Reproducir' : '⏸ Pausar';
    });
  }

  document.querySelectorAll('.anim-btn[data-direction]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      document.querySelectorAll('.anim-btn[data-direction]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      animShowcase.querySelectorAll('.anim-bounce-ball, .anim-pulse-ring, .anim-spinner').forEach(el => {
        el.style.animationDirection = btn.dataset.direction;
      });
    });
  });

  // Prevent clicks inside demo areas from toggling card
  document.querySelectorAll('.card-detail').forEach(detail => {
    detail.addEventListener('click', e => e.stopPropagation());
  });
});
