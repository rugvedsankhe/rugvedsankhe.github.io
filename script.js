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
  }, { threshold: 0.15 });

  document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

  /* ── CERTIFICATE DATA ───────────────────── */
  const certs = [
    {
      title: "Explore a Career as a Financial Analyst",
      issuer: "LinkedIn Learning",
      date: "Nov 30, 2025",
      skills: ["AI for Business", "Financial Analysis"],
      file: "assets/certificates/cert_financial_analyst.pdf",
    },
    {
      title: "Leveraging Generative AI in Finance and Accounting",
      issuer: "LinkedIn Learning",
      date: "Nov 30, 2025",
      skills: ["AI", "Finance"],
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
      skills: ["Excel"],
      file: "assets/certificates/cert_excel.pdf",
    },
    {
      title: "Academic Research Foundations: Quantitative",
      issuer: "LinkedIn Learning",
      date: "Mar 26, 2026",
      skills: ["Research"],
      file: "assets/certificates/cert_quantitative.pdf",
    },
    {
      title: "Certificate of Appreciation — FINHOUSIE 2.0",
      issuer: "MIT-WPU",
      date: "Feb 10, 2026",
      skills: ["Leadership"],
      file: "assets/certificates/cert_poc_appreciation.pdf",
    },
    {
      title: "Foundations of Working Capital Management",
      issuer: "MIT-WPU",
      date: "April 19, 2026",
      skills: ["Finance"],
      file: "assets/certificates/cert_working_capital.pdf",
    }
  ];

  /* ── CREATE MODAL ───────────────────── */
  const modalHTML = `
    <div id="cert-modal">
      <div id="cert-modal-backdrop"></div>
      <div id="cert-modal-box">
        <button id="cert-modal-close">&times;</button>

        <div id="cert-modal-left">
          <iframe id="cert-iframe"></iframe>
          <a id="cert-download" target="_blank">⬇ Download PDF</a>
        </div>

        <div id="cert-modal-right">
          <h2 id="modal-title"></h2>
          <p id="modal-issuer"></p>
          <p id="modal-date"></p>
          <div id="modal-skills-list"></div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('cert-modal');
  const iframe = document.getElementById('cert-iframe');
  const closeBtn = document.getElementById('cert-modal-close');
  const backdrop = document.getElementById('cert-modal-backdrop');
  const dlLink = document.getElementById('cert-download');

  /* ── OPEN MODAL FUNCTION ───────────────────── */
  function openModal(data) {
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-issuer').textContent = data.issuer;
    document.getElementById('modal-date').textContent = data.date;

    document.getElementById('modal-skills-list').innerHTML =
      data.skills.map(s => `<span class="skill-badge">${s}</span>`).join('');

    iframe.src = data.file;
    dlLink.href = data.file;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    iframe.src = "";
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ── CERTIFICATE CLICK ───────────────────── */
  document.querySelectorAll('.cert-card').forEach((card, i) => {
    if (!certs[i]) return;

    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      openModal(certs[i]);
    });
  });

  /* ── RESUME POPUP (NEW) ───────────────────── */
  document.querySelectorAll('.resume-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      openModal({
        title: "Rugved Sankhe Resume",
        issuer: "Professional Resume",
        date: "2026",
        skills: [
          "Equity Research",
          "Financial Analysis",
          "Excel",
          "Mutual Funds"
        ],
        file: "assets/resume.pdf"
      });
    });
  });

});
