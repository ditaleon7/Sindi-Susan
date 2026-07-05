/* =========================================================
   PORTFOLIO SINDI SUSAN — script.js
   Vanilla JavaScript (tanpa library / framework apapun)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------
     1. DATA SKILL
     Ubah / tambah item di array ini untuk mengedit daftar
     skill yang tampil di section "Skill".
     level: angka 1-5, menentukan jumlah titik yang terisi.
  ----------------------------------------------------- */
  var skills = [
    { icon: '🗂️', name: 'Administrasi SDM',            level: 5 },
    { icon: '🧾', name: 'Manajemen Data Karyawan',     level: 4 },
    { icon: '📁', name: 'Dokumentasi & Pengarsipan',   level: 5 },
    { icon: '<svg viewBox="0 0 24 24" width="28" height="28"><rect width="24" height="24" rx="5" fill="#2B579A"/><text x="12" y="16.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="12" fill="#fff">W</text></svg>', name: 'Microsoft Word', level: 5 },
    { icon: '<svg viewBox="0 0 24 24" width="28" height="28"><rect width="24" height="24" rx="5" fill="#217346"/><text x="12" y="16.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="12" fill="#fff">X</text></svg>', name: 'Microsoft Excel', level: 4 },
    { icon: '<svg viewBox="0 0 24 24" width="28" height="28"><rect width="24" height="24" rx="5" fill="#D24726"/><text x="12" y="16.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="12" fill="#fff">P</text></svg>', name: 'Microsoft PowerPoint', level: 4 },
    { icon: '💬', name: 'Komunikasi',                  level: 4 },
    { icon: '🗓️', name: 'Manajemen Waktu',             level: 5 },
    { icon: '👥', name: 'Kerja Sama Tim',              level: 5 },
    { icon: '🔄', name: 'Adaptabilitas',               level: 5 }
  ];

  function renderSkills() {
    var grid = document.getElementById('skillGrid');
    if (!grid) return;

    skills.forEach(function (skill) {
      var card = document.createElement('div');
      card.className = 'skill-card reveal';

      var iconEl = document.createElement('div');
      iconEl.className = 'skill-icon';
      iconEl.innerHTML = skill.icon;

      var nameEl = document.createElement('div');
      nameEl.className = 'skill-name';
      nameEl.textContent = skill.name;

      var dotsEl = document.createElement('div');
      dotsEl.className = 'skill-dots';
      for (var i = 1; i <= 5; i++) {
        var dot = document.createElement('span');
        if (i <= skill.level) dot.className = 'filled';
        dotsEl.appendChild(dot);
      }

      card.appendChild(iconEl);
      card.appendChild(nameEl);
      card.appendChild(dotsEl);
      grid.appendChild(card);
    });
  }

  /* -----------------------------------------------------
     2. MENU MOBILE (hamburger)
  ----------------------------------------------------- */
  function setupMobileMenu() {
    var menuBtn = document.getElementById('menuBtn');
    var navTabs = document.getElementById('navTabs');
    if (!menuBtn || !navTabs) return;

    menuBtn.addEventListener('click', function () {
      var isOpen = navTabs.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navTabs.querySelectorAll('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        navTabs.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -----------------------------------------------------
     3. TAB AKTIF SESUAI SECTION YANG SEDANG DILIHAT
  ----------------------------------------------------- */
  function setupActiveTab() {
    var sections = document.querySelectorAll('.section');
    var tabs = document.querySelectorAll('.tab');
    if (!sections.length || !tabs.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          tabs.forEach(function (tab) {
            tab.classList.toggle('active', tab.dataset.section === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* -----------------------------------------------------
     4. REVEAL ON SCROLL (fade in halus, bukan animasi
        pembuka / korden)
  ----------------------------------------------------- */
  function setupRevealOnScroll() {
    var revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -----------------------------------------------------
     5. FORM KONTAK -> kirim ke Gmail via mailto:
  ----------------------------------------------------- */
  function setupContactForm() {
    var form = document.getElementById('contactForm');
    var note = document.getElementById('formNote');
    if (!form) return;

    var GMAIL_TUJUAN = 'sindisusan01@gmail.com'; // ganti dengan email Anda
    var hideTimer = null;

    function showNote(text, type) {
      if (!note) return;
      note.textContent = text;
      note.className = 'form-note show ' + type;

      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        note.classList.remove('show');
      }, 5000);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('fname').value.trim();
      var email = document.getElementById('femail').value.trim();
      var message = document.getElementById('fmessage').value.trim();

      if (!name || !email || !message) {
        showNote('Mohon lengkapi semua kolom terlebih dahulu.', 'error');
        return;
      }

      var subject = 'Pesan dari Portofolio - ' + name;
      var body =
        'Nama: ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        message;

      var gmailComposeLink =
        'https://mail.google.com/mail/?view=cm&fs=1' +
        '&to=' + encodeURIComponent(GMAIL_TUJUAN) +
        '&su=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.open(gmailComposeLink, '_blank');

      showNote('✅ Pesan berhasil terkirim! Terima kasih sudah menghubungi saya.', 'success');
      form.reset();
    });
  }

  /* -----------------------------------------------------
     6. TOMBOL KEMBALI KE ATAS (muncul saat scroll ke bawah)
  ----------------------------------------------------- */
  function setupBackToTop() {
    var btn = document.getElementById('backToTop');
    var halamanutama = document.getElementById('halamanutama');
    if (!btn || !halamanutama) return;

    function toggleButton() {
      var halamanutamaHeight = halamanutama.offsetHeight;
      if (window.scrollY > halamanutamaHeight * 0.6) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }

    window.addEventListener('scroll', toggleButton);
    toggleButton();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -----------------------------------------------------
     INIT
  ----------------------------------------------------- */
  renderSkills();
  setupMobileMenu();
  setupActiveTab();
  setupRevealOnScroll();
  setupContactForm();
  setupBackToTop();

});