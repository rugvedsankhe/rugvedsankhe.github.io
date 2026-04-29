document.addEventListener("DOMContentLoaded", () => {

  /* ── SMOOTH SCROLL ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── SCROLL REVEAL ───────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { root: null, rootMargin: '0px', threshold: 0.15 });

  document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

  /* ── CERTIFICATE MODAL ───────────────────── */
  const certs = [
    {
      title: "Explore a Career as a Financial Analyst",
      issuer: "LinkedIn Learning",
      date: "Nov 30, 2025",
      skills: ["AI for Business", "Financial Analysis", "Financial Statement Analysis"],
      file: "assets/certificates/cert_financial_analyst.pdf",

    },
    {
      title: "Leveraging Generative AI in Finance and Accounting",
      issuer: "LinkedIn Learning · NASBA CPE",
      date: "Nov 30, 2025",
      skills: ["AI for Business", "Financial Accounting", "Artificial Intelligence (AI)"],
      file: "assets/certificates/cert_genai_finance.pdf",

    },
    {
      title: "Ten Habits of Effective Communicators",
      issuer: "LinkedIn Learning",
      date: "Nov 29, 2025",
      skills: ["Communication"],
      file: "assets/certificates/cert_communication.pdf",

    },
    {
      title: "Excel: Financial Functions in Depth",
      issuer: "LinkedIn Learning",
      date: "Feb 26, 2026",
      skills: ["Financial Analysis", "Microsoft Excel"],
      file: "assets/certificates/cert_excel.pdf",

    },
    {
      title: "Academic Research Foundations: Quantitative",
      issuer: "LinkedIn Learning",
      date: "Mar 26, 2026",
      skills: ["Quantitative Research"],
      file: "assets/certificates/cert_quantitative.pdf",

    },
    {
      title: "Certificate of Appreciation — FINHOUSIE 2.0",
      issuer: "MIT-WPU School of Business · Finance Forum",
      date: "Feb 10, 2026",
      skills: ["Leadership", "Event Management"],
      file: "assets/certificates/cert_poc_appreciation.pdf",
    },
    {
      title: "Foundations of Working Capital Management",
      issuer: "MIT-WPU School of Business · Finance Forum",
      date: "April 19, 2026",
      skills: ["Working Capital Management", "Finance"],
      file: "assets/certificates/cert_working_capital.pdf",
    }
  ];

  /* Build modal HTML */
  const modalHTML = `
    <div id="cert-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div id="cert-modal-backdrop"></div>
      <div id="cert-modal-box">
        <button id="cert-modal-close" aria-label="Close">&times;</button>
        <div id="cert-modal-left">
          <iframe id="cert-iframe" title="Certificate"></iframe>
          <a id="cert-download" href="#" target="_blank" download>
            ⬇ Download PDF
          </a>
        </div>
        <div id="cert-modal-right">
          <div id="cert-modal-badge">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="6" fill="#0A66C2"/>
              <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"
                fill="white" font-size="22" font-weight="900" font-family="sans-serif">in</text>
            </svg>
            <span>LinkedIn Learning</span>
          </div>
          <h2 id="modal-title"></h2>
          <div id="cert-modal-meta">
            <div class="meta-row"><span class="meta-icon">🏢</span><span id="modal-issuer"></span></div>
            <div class="meta-row"><span class="meta-icon">📅</span><span id="modal-date"></span></div>
            <div class="meta-row"><span class="meta-icon"></span><span id="modal-duration"></span></div>
          </div>
          <div id="cert-modal-skills">
            <p class="skills-label">Top Skills Covered</p>
            <div id="modal-skills-list"></div>
          </div>
          <div id="cert-modal-id"></div>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal     = document.getElementById('cert-modal');
  const backdrop  = document.getElementById('cert-modal-backdrop');
  const closeBtn  = document.getElementById('cert-modal-close');
  const iframe    = document.getElementById('cert-iframe');
  const dlLink    = document.getElementById('cert-download');

  function openModal(cert) {
    document.getElementById('modal-title').textContent    = cert.title;
    document.getElementById('modal-issuer').textContent   = cert.issuer;
    document.getElementById('modal-date').textContent     = cert.date;
    document.getElementById('modal-duration').textContent = cert.duration;

    /* Skills */
    const skillsList = document.getElementById('modal-skills-list');
    skillsList.innerHTML = cert.skills.map(s => `<span class="skill-badge">${s}</span>`).join('');

    /* Certificate ID */
    const idEl = document.getElementById('cert-modal-id');
    idEl.innerHTML = cert.id
      ? `<p class="cert-id-label">Certificate ID</p><p class="cert-id-value">${cert.id}</p>`
      : '';

    /* PDF */
    iframe.src  = cert.file + '#toolbar=0&navpanes=0&scrollbar=0';
    dlLink.href = cert.file;

    /* Badge tweak for MIT cert */
    const badge = document.getElementById('cert-modal-badge');
    if (cert.issuer.includes('MIT')) {
      badge.innerHTML = `<span style="font-size:1.6rem">🏛️</span><span>MIT-WPU</span>`;
    } else {
      badge.innerHTML = `
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="6" fill="#0A66C2"/>
          <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"
            fill="white" font-size="22" font-weight="900" font-family="sans-serif">in</text>
        </svg>
        <span>LinkedIn Learning</span>`;
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtn.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    iframe.src = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* Wire up cert cards */
  document.querySelectorAll('.cert-card').forEach((card, i) => {
    if (!certs[i]) return;
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View certificate: ${certs[i].title}`);

    function trigger() { openModal(certs[i]); }
    card.addEventListener('click', trigger);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); } });

    /* View badge */
    const badge = document.createElement('div');
    badge.className = 'cert-view-badge';
    badge.textContent = '🔍 View Certificate';
    card.appendChild(badge);
  });

});