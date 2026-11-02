/*
  Name: Aryan Zope
  PRN: 26070122053
*/

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero network animation ---------- */

  var canvas = document.getElementById("network");
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var hero = document.getElementById("hero");
    var nodes = [];
    var NODE_COUNT = 46;
    var LINK_DIST = 130;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0;

    function resize() {
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          var dx = nodes[a].x - nodes[b].x;
          var dy = nodes[a].y - nodes[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.strokeStyle = "rgba(237,233,224," + (0.12 * (1 - dist / LINK_DIST)) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.stroke();
          }
        }
      }
      for (var j = 0; j < nodes.length; j++) {
        ctx.fillStyle = "rgba(237,233,224,0.5)";
        ctx.beginPath();
        ctx.arc(nodes[j].x, nodes[j].y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(step);
    }

    resize();
    seed();
    requestAnimationFrame(step);
    window.addEventListener("resize", function () {
      resize();
      seed();
    });
  }

  /* ---------- Scroll-tracking rail ---------- */

  var railLinks = Array.prototype.slice.call(document.querySelectorAll(".rail a"));
  var railLabel = document.getElementById("railLabel");
  var indicator = document.querySelector(".rail-indicator");
  var rail = document.querySelector(".rail");

  var hatNames = {
    blue: "Blue — Process",
    white: "White — Facts",
    red: "Red — Feelings",
    black: "Black — Caution",
    yellow: "Yellow — Benefits",
    green: "Green — Alternatives"
  };

  var hatColorVar = {
    blue: "--blue", white: "--white-hat", red: "--red",
    black: "--black-hat", yellow: "--yellow", green: "--green"
  };

  function setActive(link) {
    railLinks.forEach(function (l) { l.classList.remove("active"); });
    link.classList.add("active");

    var hat = link.getAttribute("data-hat");
    if (railLabel) railLabel.textContent = hatNames[hat] || "";

    if (indicator && rail) {
      var railRect = rail.getBoundingClientRect();
      var linkRect = link.getBoundingClientRect();
      var offset = linkRect.top - railRect.top + linkRect.height / 2 - 14;
      indicator.style.transform = "translateY(" + offset + "px)";
      var colorVar = hatColorVar[hat] || "--blue";
      indicator.style.setProperty("--current", "var(" + colorVar + ")");
    }
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll(".hat-section"));

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            var id = entry.target.id;
            var match = railLinks.filter(function (l) {
              return l.getAttribute("href") === "#" + id;
            })[0];
            if (match) setActive(match);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  if (railLinks.length) setActive(railLinks[0]);
})();
