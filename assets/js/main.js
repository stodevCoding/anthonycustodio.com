/* ============================================
   ANTHONY CUSTODIO — MAIN JS
   ============================================ */

(function () {
  'use strict';

  /* ---------- PORTFOLIO CONFIG ----------
     Pour ajouter/supprimer des images : modifier uniquement ce tableau.
     - file : nom du fichier dans assets/img/portfolio/
     - alt  : texte alternatif (optionnel)
  */
  var PORTFOLIO = [
    { file: 'portfolio-01.webp' },
    { file: 'portfolio-02.webp' },
    { file: 'portfolio-03.webp', alt: 'Coiffure éditoriale glamour' },
    { file: 'portfolio-04.webp' },
    { file: 'portfolio-05.webp', alt: 'Shooting éditorial mode' },
    { file: 'portfolio-06.webp' },
    { file: 'portfolio-07.webp' },
    { file: 'portfolio-08.webp', alt: 'Shooting éditorial urbain' },
    { file: 'portfolio-09.webp' },
    { file: 'portfolio-10.webp' },
    { file: 'portfolio-11.webp', alt: 'Coupe carré éditoriale' },
    { file: 'portfolio-12.webp' },
    { file: 'portfolio-13.webp' },
    { file: 'portfolio-14.webp' },
    { file: 'portfolio-15.webp' },
    { file: 'portfolio-16.webp' },
    { file: 'portfolio-17.webp', alt: 'Chignon éditorial soirée' },
    { file: 'portfolio-18.webp', alt: 'Coiffure éditoriale sleek' },
    { file: 'portfolio-19.webp', alt: 'Boucles glamour noir et blanc' },
    { file: 'portfolio-20.webp' },
    { file: 'portfolio-21.webp' },
    { file: 'portfolio-22.webp' },
    { file: 'portfolio-23.webp', alt: 'Coloration homme' },
    { file: 'portfolio-24.webp' },
    { file: 'portfolio-25.webp', alt: 'Dégradé homme' },
    { file: 'portfolio-26.webp' },
    { file: 'portfolio-27.webp' },
    { file: 'portfolio-28.webp' },
    { file: 'portfolio-29.webp', alt: 'Portrait beauté noir et blanc' },
    { file: 'portfolio-30.webp' },
    { file: 'portfolio-31.webp' },
    { file: 'portfolio-32.webp' },
    { file: 'portfolio-34.webp' },
    { file: 'portfolio-35.webp' },
    { file: 'portfolio-36.webp' },
  ];

  var IMG_BASE = 'assets/img/portfolio/';

  /* ---------- BUILD GALLERY ---------- */
  function buildGallery() {
    var gallery = document.getElementById('gallery');
    if (!gallery) return;

    gallery.innerHTML = '';
    PORTFOLIO.forEach(function (item, i) {
      var div = document.createElement('div');
      div.className = 'gallery-item';
      div.setAttribute('data-index', i);

      var img = document.createElement('img');
      img.src = IMG_BASE + item.file;
      img.alt = item.alt || 'Réalisation coiffure';
      img.loading = 'lazy';

      div.appendChild(img);
      gallery.appendChild(div);
    });

    // Update lightbox total
    var totalEl = document.getElementById('lightbox-total');
    if (totalEl) totalEl.textContent = PORTFOLIO.length;
  }

  /* ---------- PRELOADER ---------- */
  function initPreloader() {
    var preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('hidden');
        document.body.classList.add('loaded');
      }, 600);
    });
    setTimeout(function () {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 3000);
  }

  /* ---------- NAVBAR ---------- */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 80);

        var scrollPos = scrollY + 200;
        var activeId = '';
        for (var i = sections.length - 1; i >= 0; i--) {
          if (scrollPos >= sections[i].offsetTop) {
            activeId = sections[i].id;
            break;
          }
        }
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
        });
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- MOBILE MENU ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('mobile-menu');
    var links = menu.querySelectorAll('a');

    function closeMenu() {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }

    toggle.addEventListener('click', function () {
      if (menu.classList.contains('open')) {
        closeMenu();
      } else {
        toggle.classList.add('active');
        menu.classList.add('open');
        document.body.classList.add('no-scroll');
      }
    });

    links.forEach(function (link) { link.addEventListener('click', closeMenu); });
  }

  /* ---------- SMOOTH SCROLL ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          var top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal, .reveal-up');
    var galleryItems = document.querySelectorAll('.gallery-item');

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );
    reveals.forEach(function (el) { revealObserver.observe(el); });

    var galleryQueue = [];
    var galleryTimer = null;

    var galleryObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            galleryQueue.push(entry.target);
            galleryObserver.unobserve(entry.target);
          }
        });
        if (galleryQueue.length && !galleryTimer) {
          galleryTimer = requestAnimationFrame(function () {
            galleryQueue.forEach(function (el, i) {
              el.style.transitionDelay = (i * 0.05) + 's';
              el.classList.add('visible');
            });
            galleryQueue = [];
            galleryTimer = null;
          });
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    galleryItems.forEach(function (el) { galleryObserver.observe(el); });
  }

  /* ---------- LIGHTBOX ---------- */
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCurrent = document.getElementById('lightbox-current');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var galleryItems = document.querySelectorAll('.gallery-item');

    var currentIndex = 0;
    var total = galleryItems.length;

    function showImage(index) {
      currentIndex = index;
      lightboxImg.style.opacity = '0';
      setTimeout(function () {
        var src = galleryItems[index].querySelector('img').src;
        lightboxImg.src = src;
        lightboxImg.onload = function () { lightboxImg.style.opacity = '1'; };
        if (lightboxImg.complete) lightboxImg.style.opacity = '1';
      }, 120);
      lightboxCurrent.textContent = index + 1;
    }

    function openLightbox(index) {
      showImage(index);
      lightbox.classList.add('open');
      document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }

    function nextImage() { showImage((currentIndex + 1) % total); }
    function prevImage() { showImage((currentIndex - 1 + total) % total); }

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        openLightbox(parseInt(item.dataset.index, 10));
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    });

    var touchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextImage() : prevImage();
      }
    }, { passive: true });
  }

  /* ---------- INIT ---------- */
  function init() {
    initPreloader();
    buildGallery();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initReveal();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
