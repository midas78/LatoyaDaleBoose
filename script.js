(function () {
  "use strict";

  /* ---------- Gallery photos ----------
     Add, remove, or reorder photos here. Each entry needs a src path
     (relative to this page) and an optional alt/caption. The first entry
     appears first in the grid. */
  var GALLERY = [
    { src: "assets/photo-01.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-02.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-03.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-04.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-05.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-06.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-07.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-08.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-09.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-10.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-11.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-12.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-13.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-14.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-15.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-16.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-17.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-18.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-19.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-20.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-21.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-22.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-23.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-24.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-25.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-26.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-27.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-28.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-29.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-30.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-31.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-32.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-33.webp", alt: "Memory of Latoya Boose" },
    { src: "assets/photo-34.webp", alt: "Memory of Latoya Boose" }
  ];

  var galleryGrid = document.getElementById("galleryGrid");
  if (galleryGrid) {
    GALLERY.forEach(function (photo) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery__item";

      var img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt || "";
      img.loading = "lazy";

      btn.appendChild(img);
      galleryGrid.appendChild(btn);
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeNav() {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    navMenu.classList.remove("is-open");
  }

  navToggle.addEventListener("click", function () {
    var open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  navMenu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeNav();
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(navMenu.querySelectorAll("a"));

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Lightbox (gallery) ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxPrev = document.getElementById("lightboxPrev");
  var lightboxNext = document.getElementById("lightboxNext");

  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery__item img"));
  var current = 0;
  var lastFocused = null;

  function showImage(index) {
    if (!galleryItems.length) return;
    current = (index + galleryItems.length) % galleryItems.length;
    var img = galleryItems[current];
    lightboxImg.src = img.getAttribute("src");
    lightboxImg.alt = img.getAttribute("alt") || "";
  }

  function openLightbox(index) {
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    showImage(index);
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    lightboxImg.src = "";
    if (lastFocused) lastFocused.focus();
  }

  galleryItems.forEach(function (img, i) {
    img.parentElement.addEventListener("click", function () { openLightbox(i); });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", function () { showImage(current - 1); });
  lightboxNext.addEventListener("click", function () { showImage(current + 1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(current - 1);
    if (e.key === "ArrowRight") showImage(current + 1);
  });

  /* ---------- Print program ---------- */
  var printBtn = document.getElementById("printProgram");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  /* ---------- Add to calendar (.ics) ---------- */
  var calBtn = document.getElementById("addCalendar");
  if (calBtn) {
    calBtn.addEventListener("click", function () {
      var lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Latoya Boose Memorial//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:" + Date.now() + "@latoya-boose-memorial",
        "DTSTAMP:20260930T000000Z",
        "DTSTART:20261003T180000Z",
        "DTEND:20261003T200000Z",
        "SUMMARY:Memorial Service for Latoya Boose",
        "LOCATION:Midtown Church of Christ\\, 1930 Union Ave\\, Memphis\\, TN 38104",
        "DESCRIPTION:Memorial service celebrating the life of Latoya Boose (Feb 2\\, 1977 - Sep 20\\, 2026).",
        "END:VEVENT",
        "END:VCALENDAR"
      ];
      var blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "latoya-boose-memorial.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

})();
