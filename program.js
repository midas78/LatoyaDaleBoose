(function () {
  "use strict";

  /* ---------- Digital program flipbook (full screen) ---------- */
  var PROGRAM_PAGES = [
    "assets/program-01.webp",
    "assets/program-02.webp",
    "assets/program-03.webp",
    "assets/program-04.webp",
    "assets/program-05.webp",
    "assets/program-06.webp",
    "assets/program-07.webp",
    "assets/program-08.webp"
  ];

  var el = document.getElementById("flipbook");
  if (!el || typeof St === "undefined" || !St.PageFlip) return;

  PROGRAM_PAGES.forEach(function (src, i) {
    var page = document.createElement("div");
    page.className = "flipbook__page";
    var img = document.createElement("img");
    img.src = src;
    img.alt = "Program page " + (i + 1);
    page.appendChild(img);
    el.appendChild(page);
  });

  var pageFlip = new St.PageFlip(el, {
    width: 400,
    height: 517,
    size: "stretch",
    minWidth: 240,
    maxWidth: 900,
    minHeight: 310,
    maxHeight: 1300,
    showCover: true,
    maxShadowOpacity: 0.4,
    mobileScrollSupport: true,
    flippingTime: 700
  });
  pageFlip.loadFromHTML(el.querySelectorAll(".flipbook__page"));

  var pageEl = document.getElementById("fbPage");
  var prevBtn = document.getElementById("fbPrev");
  var nextBtn = document.getElementById("fbNext");
  var shell = document.querySelector(".program-page .flipbook-shell");
  var bar = document.querySelector(".prog-bar");
  var controls = document.querySelector(".flipbook__controls");

  function fit() {
    var portrait = pageFlip.getOrientation && pageFlip.getOrientation() === "portrait";
    var ratio = portrait ? 400 / 517 : 800 / 517;
    var availW = window.innerWidth - 24;
    var availH = window.innerHeight - (bar ? bar.offsetHeight : 0) - (controls ? controls.offsetHeight : 0) - 24;
    var w = Math.max(0, Math.min(availW, availH * ratio));
    var h = w / ratio;
    shell.style.width = Math.floor(w) + "px";
    shell.style.height = Math.floor(h) + "px";
    pageFlip.update();
  }

  function update() {
    var cur = pageFlip.getCurrentPageIndex() + 1;
    pageEl.textContent = "Page " + cur + " of " + PROGRAM_PAGES.length;
    prevBtn.disabled = cur <= 1;
    nextBtn.disabled = cur >= PROGRAM_PAGES.length;
  }

  prevBtn.addEventListener("click", function () { pageFlip.flipPrev(); });
  nextBtn.addEventListener("click", function () { pageFlip.flipNext(); });
  pageFlip.on("flip", update);
  update();
  fit();

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fit, 150);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") pageFlip.flipPrev();
    if (e.key === "ArrowRight") pageFlip.flipNext();
  });
})();
