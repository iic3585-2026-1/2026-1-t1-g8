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

  // === QUIZ ===
  const quizQuestions = [
    {
      title: '1. Flexbox: Centra los elementos',
      description: 'Escribe las propiedades CSS para centrar los hijos horizontal y verticalmente dentro de un contenedor flex.',
      context: '.container {',
      suffix: '}',
      checks: [
        { pattern: /display\s*:\s*flex/, msg: 'display: flex' },
        { pattern: /justify-content\s*:\s*center/, msg: 'justify-content: center' },
        { pattern: /align-items\s*:\s*center/, msg: 'align-items: center' }
      ],
      hint: 'Necesitas 3 propiedades: una para activar flex, otra para el eje principal y otra para el eje cruzado.',
      solution: '  display: flex;\n  justify-content: center;\n  align-items: center;',
      preview: (code) => {
        return `<div style="display:flex;${code};height:100px;background:#eef;border-radius:8px;gap:8px">
          <div style="width:40px;height:40px;background:hsl(220,70%,55%);border-radius:6px"></div>
          <div style="width:40px;height:40px;background:hsl(250,70%,55%);border-radius:6px"></div>
        </div>`;
      }
    },
    {
      title: '2. Grid: Crea un layout de 3 columnas',
      description: 'Define un grid de 3 columnas iguales con un espacio de 1rem entre ellas.',
      context: '.grid {',
      suffix: '}',
      checks: [
        { pattern: /display\s*:\s*grid/, msg: 'display: grid' },
        { pattern: /grid-template-columns\s*:\s*repeat\(\s*3\s*,\s*1fr\s*\)|grid-template-columns\s*:\s*1fr\s+1fr\s+1fr/, msg: 'grid-template-columns con 3 columnas de 1fr' },
        { pattern: /gap\s*:\s*1rem/, msg: 'gap: 1rem' }
      ],
      hint: 'Usa display: grid, grid-template-columns con la unidad fr, y gap.',
      solution: '  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;',
      preview: (code) => {
        return `<div style="display:grid;${code};"><div style="padding:1rem;background:hsl(220,70%,55%);color:white;border-radius:6px;text-align:center">1</div><div style="padding:1rem;background:hsl(250,70%,55%);color:white;border-radius:6px;text-align:center">2</div><div style="padding:1rem;background:hsl(280,70%,55%);color:white;border-radius:6px;text-align:center">3</div></div>`;
      }
    },
    {
      title: '3. Variables CSS: Define y usa una variable de color',
      description: 'Declara una variable --main-color con valor #3a86ff y úsala como background.',
      context: '.element {',
      suffix: '}',
      checks: [
        { pattern: /--main-color\s*:\s*#3a86ff/, msg: '--main-color: #3a86ff' },
        { pattern: /background\s*:\s*var\(\s*--main-color\s*\)/, msg: 'background: var(--main-color)' }
      ],
      hint: 'Declara la variable con --nombre: valor; y úsala con var(--nombre).',
      solution: '  --main-color: #3a86ff;\n  background: var(--main-color);',
      preview: (code) => {
        return `<div style="${code};padding:2rem;border-radius:8px;color:white;text-align:center;font-weight:bold">Elemento con variable</div>`;
      }
    },
    {
      title: '4. calc(): Ancho dinámico',
      description: 'Define un ancho que sea el 100% menos 200px usando calc().',
      context: '.main-content {',
      suffix: '}',
      checks: [
        { pattern: /width\s*:\s*calc\(\s*100%\s*-\s*200px\s*\)/, msg: 'width: calc(100% - 200px)' }
      ],
      hint: 'La sintaxis es: width: calc(valor1 - valor2); Los espacios alrededor del operador son obligatorios.',
      solution: '  width: calc(100% - 200px);',
      preview: (code) => {
        return `<div style="display:flex;gap:0;background:#eef;border-radius:8px;overflow:hidden;height:60px">
          <div style="width:200px;background:hsl(220,70%,55%);color:white;display:flex;align-items:center;justify-content:center;font-size:0.8rem;flex-shrink:0">Sidebar (200px)</div>
          <div style="${code};background:hsl(280,70%,90%);display:flex;align-items:center;justify-content:center;font-size:0.8rem">Main (calc)</div>
        </div>`;
      }
    },
    {
      title: '5. Transform: Rota y escala',
      description: 'Aplica una rotación de 45 grados y un escalado de 1.5 en una sola propiedad transform.',
      context: '.element {',
      suffix: '}',
      checks: [
        { pattern: /transform\s*:.*rotate\(\s*45deg\s*\)/, msg: 'rotate(45deg)' },
        { pattern: /transform\s*:.*scale\(\s*1\.5\s*\)/, msg: 'scale(1.5)' }
      ],
      hint: 'Puedes combinar funciones en una sola línea: transform: funcion1() funcion2();',
      solution: '  transform: rotate(45deg) scale(1.5);',
      preview: (code) => {
        return `<div style="display:flex;justify-content:center;align-items:center;height:120px">
          <div style="${code};width:50px;height:50px;background:hsl(220,70%,55%);border-radius:6px"></div>
        </div>`;
      }
    },
    {
      title: '6. Transition: Anima el color de fondo',
      description: 'Agrega una transición para la propiedad background-color que dure 0.5s con timing ease-in-out.',
      context: '.button {',
      suffix: '}',
      checks: [
        { pattern: /transition\s*:.*background-color\s+0\.5s\s+ease-in-out|transition-property\s*:\s*background-color/, msg: 'transition de background-color' },
        { pattern: /0\.5s/, msg: 'duración de 0.5s' },
        { pattern: /ease-in-out/, msg: 'timing ease-in-out' }
      ],
      hint: 'Usa la propiedad shorthand: transition: propiedad duración timing;',
      solution: '  transition: background-color 0.5s ease-in-out;',
      preview: (code) => {
        return `<div style="${code};background-color:hsl(220,70%,55%);color:white;padding:0.75rem 1.5rem;border-radius:8px;text-align:center;cursor:pointer;font-weight:bold" onmouseover="this.style.backgroundColor='hsl(320,70%,55%)'" onmouseout="this.style.backgroundColor='hsl(220,70%,55%)'">Pasa el cursor aquí</div>`;
      }
    },
    {
      title: '7. Animation: Crea un keyframe de rebote',
      description: 'Escribe una regla @keyframes llamada "rebote" que en 0% tenga translateY(0) y en 50% tenga translateY(-30px).',
      context: '',
      suffix: '',
      checks: [
        { pattern: /@keyframes\s+rebote/, msg: '@keyframes rebote' },
        { pattern: /0%\s*\{[^}]*translateY\(\s*0\s*(px)?\s*\)/, msg: '0% con translateY(0)' },
        { pattern: /50%\s*\{[^}]*translateY\(\s*-30px\s*\)/, msg: '50% con translateY(-30px)' }
      ],
      hint: 'La estructura es: @keyframes nombre { 0% { transform: ...; } 50% { transform: ...; } }',
      solution: '@keyframes rebote {\n  0% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-30px);\n  }\n}',
      preview: () => {
        return `<div style="display:flex;justify-content:center;padding-top:1rem"><div style="width:30px;height:30px;background:hsl(220,70%,55%);border-radius:50%;animation:bounce 0.6s ease-in-out infinite alternate"></div></div>`;
      }
    },
    {
      title: '8. Media Query: Diseño responsivo',
      description: 'Escribe una media query que, cuando el ancho del viewport sea menor a 768px, cambie el grid a 1 columna.',
      context: '',
      suffix: '',
      checks: [
        { pattern: /@media\s*\(\s*max-width\s*:\s*768px\s*\)/, msg: '@media (max-width: 768px)' },
        { pattern: /grid-template-columns\s*:\s*1fr/, msg: 'grid-template-columns: 1fr' }
      ],
      hint: 'Usa @media (max-width: 768px) { selector { propiedad: valor; } }',
      solution: '@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}',
      preview: () => {
        return `<div style="display:grid;grid-template-columns:1fr;gap:0.5rem"><div style="padding:0.75rem;background:hsl(220,70%,55%);color:white;border-radius:6px;text-align:center">1 columna</div><div style="padding:0.75rem;background:hsl(250,70%,55%);color:white;border-radius:6px;text-align:center">(responsivo)</div></div>`;
      }
    }
  ];

  // Quiz state
  let quizIndex = 0;
  let quizCorrectCount = 0;

  const quizSection = document.getElementById('quizSection');
  const quizToggle = document.getElementById('quizToggle');
  const quizContent = document.getElementById('quizContent');
  const quizEditor = document.getElementById('quizEditor');
  const quizTitle = document.getElementById('quizTitle');
  const quizDesc = document.getElementById('quizDescription') || document.querySelector('#quizQuestion > p');
  const quizContext = document.getElementById('quizContext');
  const quizHint = document.getElementById('quizHint');
  const quizHintBtn = document.getElementById('quizHintBtn');
  const quizCheckBtn = document.getElementById('quizCheck');
  const quizNextBtn = document.getElementById('quizNext');
  const quizFeedback = document.getElementById('quizFeedback');
  const quizPreview = document.getElementById('quizPreview');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizCurrentSpan = document.getElementById('quizCurrent');
  const quizTotalSpan = document.getElementById('quizTotal');
  const quizCorrectSpan = document.getElementById('quizCorrect');
  const quizResults = document.getElementById('quizResults');
  const quizQuestion = document.getElementById('quizQuestion');
  const quizFinalScore = document.getElementById('quizFinalScore');
  const quizRestart = document.getElementById('quizRestart');

  if (quizTotalSpan) quizTotalSpan.textContent = quizQuestions.length;

  function loadQuestion() {
    const q = quizQuestions[quizIndex];
    quizTitle.textContent = q.title;
    quizDesc.textContent = q.description;
    quizContext.textContent = q.context;
    quizEditor.value = '';
    quizHint.textContent = q.hint;
    quizHint.classList.remove('visible');
    quizFeedback.className = 'quiz-feedback';
    quizFeedback.innerHTML = '';
    quizNextBtn.disabled = true;
    quizCheckBtn.disabled = false;
    quizCurrentSpan.textContent = quizIndex + 1;
    quizCorrectSpan.textContent = quizCorrectCount;
    quizProgressBar.style.width = ((quizIndex) / quizQuestions.length * 100) + '%';
    quizPreview.innerHTML = q.preview('') ;
    quizQuestion.style.display = '';
    quizResults.style.display = 'none';
  }

  // Toggle quiz open/close
  if (quizToggle) {
    quizToggle.addEventListener('click', () => {
      quizSection.classList.toggle('open');
      if (quizSection.classList.contains('open') && quizIndex === 0) {
        loadQuestion();
      }
    });
  }

  // Live preview
  if (quizEditor) {
    quizEditor.addEventListener('input', () => {
      const q = quizQuestions[quizIndex];
      const code = quizEditor.value.replace(/[\n\r]/g, ';').replace(/;+/g, ';');
      quizPreview.innerHTML = q.preview(code);
    });

    // Tab key inserts spaces instead of changing focus
    quizEditor.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = quizEditor.selectionStart;
        const end = quizEditor.selectionEnd;
        quizEditor.value = quizEditor.value.substring(0, start) + '  ' + quizEditor.value.substring(end);
        quizEditor.selectionStart = quizEditor.selectionEnd = start + 2;
      }
    });
  }

  // Hint button
  if (quizHintBtn) {
    quizHintBtn.addEventListener('click', () => {
      quizHint.classList.toggle('visible');
    });
  }

  // Check answer
  if (quizCheckBtn) {
    quizCheckBtn.addEventListener('click', () => {
      const q = quizQuestions[quizIndex];
      const code = quizEditor.value;
      const passed = [];
      const failed = [];

      q.checks.forEach(check => {
        if (check.pattern.test(code)) {
          passed.push(check.msg);
        } else {
          failed.push(check.msg);
        }
      });

      if (failed.length === 0) {
        quizCorrectCount++;
        quizCorrectSpan.textContent = quizCorrectCount;
        quizFeedback.className = 'quiz-feedback correct';
        quizFeedback.innerHTML = 'Correcto! Todos los requisitos cumplidos.';
        quizNextBtn.disabled = false;
        quizCheckBtn.disabled = true;
      } else {
        quizFeedback.className = 'quiz-feedback incorrect';
        let html = `<div>Faltan ${failed.length} requisito(s):</div><ul style="margin:0.5rem 0 0.5rem 1.5rem;font-weight:400">`;
        failed.forEach(f => { html += `<li>${f}</li>`; });
        html += '</ul>';
        if (passed.length > 0) {
          html += `<div style="margin-top:0.5rem;font-weight:400;color:hsl(140,50%,35%)">Bien: ${passed.join(', ')}</div>`;
        }
        quizFeedback.innerHTML = html;
      }
    });
  }

  // Next question
  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      quizIndex++;
      if (quizIndex >= quizQuestions.length) {
        showResults();
      } else {
        loadQuestion();
      }
    });
  }

  function showResults() {
    quizQuestion.style.display = 'none';
    quizResults.style.display = '';
    quizProgressBar.style.width = '100%';
    const total = quizQuestions.length;
    quizFinalScore.textContent = `${quizCorrectCount} / ${total}`;

    let msg = '';
    const pct = quizCorrectCount / total;
    if (pct === 1) msg = 'Perfecto! Dominas CSS moderno.';
    else if (pct >= 0.75) msg = 'Muy bien! Casi todo correcto.';
    else if (pct >= 0.5) msg = 'Buen intento! Repasa las secciones de arriba.';
    else msg = 'Sigue practicando! Revisa las explicaciones de cada card.';

    quizFinalScore.insertAdjacentHTML('afterend', `<p style="color:var(--color-text-light);margin-bottom:1rem">${msg}</p>`);
  }

  // Restart
  if (quizRestart) {
    quizRestart.addEventListener('click', () => {
      quizIndex = 0;
      quizCorrectCount = 0;
      // Remove the message paragraph if it exists
      const msgP = quizResults.querySelector('p');
      if (msgP) msgP.remove();
      loadQuestion();
    });
  }
});
