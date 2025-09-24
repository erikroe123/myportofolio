// === Merged bundle ===
// Source files: main.js, main2.js
// Note: duplicates are intentionally kept as requested.

// --- BEGIN: main.js ---
/**
* Template Name: MyPortfolio
* Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * burgerMenu
   */
  const burgerMenu = select('.burger')
  on('click', '.burger', function(e) {
    burgerMenu.classList.toggle('active');
  })

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('#portfolio-grid');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.item',
      });

      let portfolioFilters = select('#filters a', true);

      on('click', '#filters a', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('active');
        });
        this.classList.add('active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const homeLink = document.getElementById('homeLink');
  const burger = document.querySelector('.burger');

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      body.classList.add('dark');
      if (themeToggle) themeToggle.checked = true;
      if (homeLink) homeLink.classList.add('dark'); 
      if (burger) burger.classList.add('burger-dark'); // Tambahkan kelas untuk tema gelap
  }
  else {
    if (burger) burger.classList.remove('burger-dark'); // Tambahkan kelas untuk tema gelap
  }

  // Toggle theme on checkbox change
  if (themeToggle) themeToggle.addEventListener('change', () => {
      if (themeToggle && themeToggle.checked) {
          body.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          if (homeLink) homeLink.classList.add('dark');
          if (burger) burger.classList.add('burger-dark');
      } else {
          body.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          if (homeLink) homeLink.classList.remove('dark');
          if (burger) burger.classList.remove('burger-dark'); // Tambahkan kelas untuk tema gelap
      }
  });
});
function getIP() {
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    document.getElementById("ip-address").textContent = data.ip;
                    // Mengirim alamat IP ke server-side script PHP
                    fetch('save_ip.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ip: data.ip })
                    })
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch(error => console.error('Error sending IP address to server:', error));
                })
                .catch(error => console.error('Error fetching the IP address:', error));
        }
document.getElementById('ip-address').style.display = 'none';





// --- END: main.js ---

// --- BEGIN: main2.js ---
// main.js
// Tema gelap/terang + burger + inisialisasi ringan

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const burger = document.querySelector('.burger');

  // ---------- THEME ----------
  // fungsi bantu
  const applyTheme = (mode) => {
    const isDark = mode === 'dark';
    body.classList.toggle('dark', isDark);
    if (themeToggle) themeToggle.checked = isDark;
    localStorage.setItem('theme', mode);
  };

  // baca preferensi tersimpan / fallback ke OS
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  } else {
    const osDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(osDark ? 'dark' : 'light');
  }

  // toggle via checkbox
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      applyTheme(themeToggle.checked ? 'dark' : 'light');
    });
  }

  // opsional: sinkron ke perubahan OS *hanya jika user belum pernah memilih*
  if (!saved && window.matchMedia) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => applyTheme(e.matches ? 'dark' : 'light');
    try {
      mql.addEventListener('change', onChange);
    } catch {
      // Safari lama
      mql.addListener(onChange);
    }
  }

  // ---------- BURGER ----------
  // Bootstrap sudah urus collapse via data attributes.
  // Kita cuma urus animasi ikon (garis jadi X)
  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
    });
  }

  // ---------- AOS (jika dipakai) ----------
  if (window.AOS && typeof AOS.init === 'function') {
    AOS.init({ once: true, duration: 600, easing: 'ease-out' });
  }
});

// --- END: main2.js ---
