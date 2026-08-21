/* =========================================================
   PORTFOLIO SINDI SUSAN — script.js
   Vanilla JavaScript (tanpa library / framework apapun)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------
     1. DATA SKILL
     Taruh file ikon (.svg) Anda di folder ./image/icons/
     dengan nama file persis seperti kolom "icon" di bawah.
     Kalau file belum ada, otomatis tampil inisial sementara.
     level: angka 1-5, menentukan panjang bar keahlian.
  ----------------------------------------------------- */
  var ICON_PATH = './icons/';

  var skills = [
    { icon: 'administrasi-sdm.svg',      name: 'Administrasi SDM',        level: 5 },
    { icon: 'manajemen-data.svg',        name: 'Manajemen Data Karyawan', level: 4 },
    { icon: 'dokumentasi-arsip.svg',     name: 'Dokumentasi & Pengarsipan', level: 5 },
    { icon: 'word.svg',                  name: 'Microsoft Word',          level: 5 },
    { icon: 'excel.svg',                 name: 'Microsoft Excel',         level: 4 },
    { icon: 'powerpoint.svg',            name: 'Microsoft PowerPoint',    level: 4 },
    { icon: 'komunikasi.svg',            name: 'Komunikasi',              level: 4 },
    { icon: 'manajemen-waktu.svg',       name: 'Manajemen Waktu',         level: 5 },
    { icon: 'kerja-tim.svg',             name: 'Kerja Sama Tim',          level: 5 },
    { icon: 'adaptabilitas.svg',         name: 'Adaptabilitas',           level: 5 }
  ];

  function renderSkills() {
    var grid = document.getElementById('skillGrid');
    if (!grid) return;

    var radius = 26;
    var circumference = 2 * Math.PI * radius;

    skills.forEach(function (skill) {
      var target = circumference * (1 - skill.level / 5);

      var item = document.createElement('div');
      item.className = 'skill-item reveal';

      var orb = document.createElement('div');
      orb.className = 'skill-orb';

      var svgNS = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 64 64');

      var track = document.createElementNS(svgNS, 'circle');
      track.setAttribute('class', 'skill-orb-track');
      track.setAttribute('cx', '32');
      track.setAttribute('cy', '32');
      track.setAttribute('r', String(radius));

      var fill = document.createElementNS(svgNS, 'circle');
      fill.setAttribute('class', 'skill-orb-fill');
      fill.setAttribute('cx', '32');
      fill.setAttribute('cy', '32');
      fill.setAttribute('r', String(radius));
      fill.style.setProperty('--circ', circumference);
      fill.style.setProperty('--target', target);

      svg.appendChild(track);
      svg.appendChild(fill);

      var iconWrap = document.createElement('div');
      iconWrap.className = 'skill-icon';

      var img = document.createElement('img');
      img.src = ICON_PATH + skill.icon;
      img.alt = skill.name;
      img.onerror = function () {
        // Fallback sementara (inisial) selama file svg belum ditaruh
        iconWrap.innerHTML = '';
        var fallback = document.createElement('span');
        fallback.className = 'skill-icon-fallback';
        fallback.textContent = skill.name.charAt(0);
        iconWrap.appendChild(fallback);
      };
      iconWrap.appendChild(img);

      orb.appendChild(svg);
      orb.appendChild(iconWrap);

      var nameEl = document.createElement('div');
      nameEl.className = 'skill-name';
      nameEl.textContent = skill.name;

      item.appendChild(orb);
      item.appendChild(nameEl);
      grid.appendChild(item);
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
     4. REVEAL ON SCROLL (fade in halus tiap kali konten
        masuk ke layar, dan mengulang lagi tiap kali
        discroll masuk-keluar — kecuali Konten 1/Home)
  ----------------------------------------------------- */
  function setupRevealOnScroll() {
    var revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -----------------------------------------------------
     5. TOMBOL KEMBALI KE ATAS (muncul saat scroll ke bawah)
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
     6. SALJU PINK JATUH DI LATAR WEBSITE
  ----------------------------------------------------- */
  function setupSnow() {
    var container = document.getElementById('snowContainer');
    if (!container) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var total = window.innerWidth < 600 ? 18 : 32;

    for (var i = 0; i < total; i++) {
      var flake = document.createElement('span');
      flake.className = 'snowflake';

      var size = 4 + Math.random() * 6; // 4px - 10px
      var duration = 9 + Math.random() * 12; // 9s - 21s
      var delay = -1 * Math.random() * duration; // biar langsung terlihat jatuh saat load
      var sway = (Math.random() * 80 - 40); // goyangan kiri-kanan saat jatuh

      flake.style.left = Math.random() * 100 + 'vw';
      flake.style.width = size + 'px';
      flake.style.height = size + 'px';
      flake.style.setProperty('--dur', duration + 's');
      flake.style.setProperty('--delay', delay + 's');
      flake.style.setProperty('--sway', sway + 'px');

      container.appendChild(flake);
    }
  }

  /* -----------------------------------------------------
     INIT
  ----------------------------------------------------- */
  renderSkills();
  setupMobileMenu();
  setupActiveTab();
  setupRevealOnScroll();
  setupBackToTop();
  setupSnow();

});