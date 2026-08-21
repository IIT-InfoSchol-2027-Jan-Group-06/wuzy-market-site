/* wuzy-frame.js — behaviour for the phone frame.
 *
 * Three things, all optional and all motion-safe:
 *   1. reveal   — breakouts fade up once the frame enters the viewport
 *   2. parallax — breakouts drift as the screen inside the frame is scrolled,
 *                 which is what sells them as sitting in front of the glass
 *   3. tilt     — a small pointer-driven rotation on fine pointers only
 *
 * Everything is opt-out via prefers-reduced-motion, and the frame is fully
 * usable with JS disabled: the well scrolls natively and breakouts are visible
 * because .is-in is also applied as a no-JS fallback in the markup.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');

  function init(root) {
    if (root.dataset.wzReady) return;
    root.dataset.wzReady = '1';

    var well = root.querySelector('.wz-well');
    var outs = [].slice.call(root.querySelectorAll('.wz-out'));
    var stage = root.querySelector('.wz-stage');

    // 1. reveal
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { root.classList.add('is-in'); io.disconnect(); }
        });
      }, { threshold: 0.25 });
      io.observe(root);
    } else {
      root.classList.add('is-in');
    }

    // A screen shorter than the viewport has nothing to scroll, so don't
    // advertise a scroll affordance that does nothing.
    if (well && well.scrollHeight - well.clientHeight < 8) {
      well.removeAttribute('tabindex');
      well.style.overflowY = 'hidden';
    }

    // 2. homing — the piece's whole reason for existing
    //
    // At rest every breakout floats over the page. The moment the screen is
    // scrolled they all fly back into the slots they were cut from and the
    // composition becomes an ordinary phone again. Home placement is recomputed
    // every frame because the slot itself is moving with the scroll.
    //
    // Geometry comes from offsetLeft/clientWidth rather than getBoundingClientRect
    // so the pointer tilt (a 3D rotation on an ancestor) can't feed back into it.
    var sw = parseFloat(root.dataset.screenW || '0');
    var homing = well && sw > 0 && outs.length;
    var t = 0, target = 0, raf2 = 0;
    var hs = outs.map(function (o) {
      return parseFloat(getComputedStyle(o).getPropertyValue('--hs')) || 1;
    });

    function frame() {
      raf2 = 0;
      var d = target - t;
      t += reduce.matches ? d : d * 0.14;
      if (Math.abs(target - t) < 0.002) t = target;

      var stageW = stage.offsetWidth, stageH = stage.offsetHeight;
      var unit = well.clientWidth / sw;          // screen units -> px
      var wellTop = well.offsetTop, wellLeft = well.offsetLeft;
      var wellBot = wellTop + well.clientHeight;
      var wellRight = wellLeft + well.clientWidth;
      var radius = parseFloat(getComputedStyle(well).borderTopLeftRadius) || 0;
      var range = well.scrollHeight - well.clientHeight;
      var p = range > 24 ? (well.scrollTop / range) * 2 - 1 : 0;

      for (var i = 0; i < outs.length; i++) {
        var o = outs[i], ds = o.dataset;
        var cx = well.offsetLeft + parseFloat(ds.hx) * unit;
        var cy = wellTop - well.scrollTop + parseFloat(ds.hy) * unit;
        var fx = parseFloat(o.dataset.x) / 100 * stageW;
        var fy = parseFloat(o.dataset.y) / 100 * stageH;
        var dx = (cx - fx) * t, dy = (cy - fy) * t;
        o.style.setProperty('--t', t.toFixed(4));
        o.style.setProperty('--dx', dx.toFixed(2) + 'px');
        o.style.setProperty('--dy', dy.toFixed(2) + 'px');

        // A seated piece belongs to the screen, so it has to obey the screen's
        // edges — otherwise a tall card homing near the top spills straight
        // over the bezel. clip-path runs in the element's own pre-transform
        // space, so the insets are measured on the rendered box and then
        // divided back out by the live scale. Blending by t means no clip at
        // all while the piece is still floating free.
        // The clip only makes sense once a piece is basically seated. Ramping
        // it from the start meant a piece still out over the page was being
        // sliced against the frame edge the entire way in — that was the
        // "cutting off" during the flight.
        var c = (t - 0.82) / 0.18;
        c = c < 0 ? 0 : c > 1 ? 1 : c;
        var clipped = false;
        if (c > 0) {
          var st = 1 + (hs[i] - 1) * t;
          var lx = fx + dx, ly = fy + dy;
          var hw = o.offsetWidth * st / 2, hh2 = o.offsetHeight * st / 2;
          var ct = Math.max(0, wellTop - (ly - hh2));
          var cr = Math.max(0, (lx + hw) - wellRight);
          var cb = Math.max(0, (ly + hh2) - wellBot);
          var cl = Math.max(0, wellLeft - (lx - hw));
          // Only clip a piece that actually crosses an edge. Applying
          // inset(0 0 0 0 round R) to one sitting safely inside still rounds
          // its own corners against the well's radius, which is what was
          // deforming the date badges once they settled.
          if (ct + cr + cb + cl > 0.5) {
            var k = c / st;
            o.style.clipPath = 'inset(' + ct * k + 'px ' + cr * k + 'px ' +
              cb * k + 'px ' + cl * k + 'px round ' + (radius * c / st) + 'px)';
            clipped = true;
          }
        }
        if (!clipped && o.style.clipPath) o.style.clipPath = '';

        o.style.setProperty('--fd', (1 - t).toFixed(4));
        var f = parseFloat(ds.parallax || '0');
        if (f) o.style.setProperty('--py', (p * f * (1 - t)).toFixed(2) + 'px');
        o.classList.toggle('is-home', t > 0.6);
      }
      if (t !== target) raf2 = requestAnimationFrame(frame);
    }

    function schedule() {
      target = well.scrollTop > 6 ? 1 : 0;
      if (!raf2) raf2 = requestAnimationFrame(frame);
    }

    if (homing) {
      well.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', function () {
        if (!raf2) raf2 = requestAnimationFrame(frame);
      });
      frame();
    }

    // 3. tilt
    if (stage && fine.matches && !reduce.matches) {
      var raf = 0;
      var onMove = function (ev) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          var r = root.getBoundingClientRect();
          var dx = (ev.clientX - r.left) / r.width - 0.5;
          var dy = (ev.clientY - r.top) / r.height - 0.5;
          stage.style.setProperty('--ry', (dx * 9).toFixed(2) + 'deg');
          stage.style.setProperty('--rx', (-dy * 6).toFixed(2) + 'deg');
        });
      };
      var reset = function () {
        stage.style.setProperty('--ry', '0deg');
        stage.style.setProperty('--rx', '0deg');
      };
      root.addEventListener('pointermove', onMove);
      root.addEventListener('pointerleave', reset);
    }
  }

  function boot() {
    [].slice.call(document.querySelectorAll('.wz')).forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.WuzyFrame = { init: init, boot: boot };
})();
