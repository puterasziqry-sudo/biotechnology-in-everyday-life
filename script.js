document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const menu = document.querySelector('.menu');
      if (menu) menu.classList.toggle('open');
    });
  });

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
  }

  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const fallback = img.dataset.fallback;
      if (fallback && img.src !== new URL(fallback, location.href).href) img.src = fallback;
    }, { once: true });
  });

  initLiveCounter();
});

async function initLiveCounter() {
  const counters = document.querySelectorAll('#visitNumber');
  if (!counters.length) return;

  const setCount = value => {
    const formatted = Number(value).toLocaleString();
    counters.forEach(el => el.textContent = formatted);
  };

  // Count once per browser session, not every page refresh.
  let countedThisSession = false;
  try {
    countedThisSession = sessionStorage.getItem('bio_live_visit_counted') === '1';
  } catch (_) {}

  try {
    if (typeof window.Counter !== 'function') throw new Error('CounterAPI library not loaded');

    const counter = new window.Counter({
      workspace: 'biotechnology-for-everyday-life',
      timeout: 8000
    });

    let result;
    if (!countedThisSession) {
      result = await counter.up('site-visits');
      try { sessionStorage.setItem('bio_live_visit_counted', '1'); } catch (_) {}
    } else {
      result = await counter.get('site-visits');
    }

    const value = result?.value ?? result?.data?.value ?? result?.data;
    if (Number.isFinite(Number(value))) setCount(value);
    else throw new Error('Unexpected counter response');
  } catch (error) {
    // Offline/local fallback so the counter never stays blank.
    let local = 0;
    try {
      local = Number(localStorage.getItem('bio_local_visits') || 0);
      if (!countedThisSession) {
        local += 1;
        localStorage.setItem('bio_local_visits', String(local));
      }
    } catch (_) {
      local = 1;
    }
    setCount(local);
    console.warn('Live counter unavailable; using local fallback.', error);
  }
}

function gradeQuiz() {
  const answers = ['b', 'c', 'a', 'b', 'c'];
  let score = 0;
  answers.forEach((answer, index) => {
    const selected = document.querySelector(`input[name=q${index + 1}]:checked`);
    if (selected && selected.value === answer) score++;
  });
  const result = document.getElementById('quizResult');
  if (result) result.textContent = `You scored ${score}/${answers.length}. ${score === answers.length ? 'Excellent!' : 'Review the topic pages and try again.'}`;
}
window.gradeQuiz = gradeQuiz;
