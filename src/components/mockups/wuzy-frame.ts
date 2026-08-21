/* wuzy-frame.ts — behaviour for the phone frame.
 *
 * Ported verbatim from live-mockup-files/wuzy-frame.js. Three things, all
 * optional and all motion-safe:
 *   1. reveal   — breakouts fade up once the frame enters the viewport
 *   2. homing   — breakouts fly back into their slots as the screen is scrolled
 *   3. tilt     — a small pointer-driven rotation on fine pointers only
 *
 * The only change from the original: the "screen too short to scroll" check
 * now waits for the content image. In the demo the screens are data URIs and
 * are already decoded at boot; here they are ~1MB network requests, so the
 * well measured 0 and the check disabled scrolling on every frame.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)');

export function init(root: HTMLElement) {
  if (root.dataset.wzReady) return;
  root.dataset.wzReady = '1';

  const well = root.querySelector<HTMLElement>('.wz-well');
  const outs = Array.from(root.querySelectorAll<HTMLElement>('.wz-out'));
  const stage = root.querySelector<HTMLElement>('.wz-stage');

  // 1. reveal
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { root.classList.add('is-in'); io.disconnect(); }
      });
    }, { threshold: 0.25 });
    io.observe(root);
  } else {
    root.classList.add('is-in');
  }

  // 2. homing — the piece's whole reason for existing
  //
  // At rest every breakout floats over the page. The moment the screen is
  // scrolled they all fly back into the slots they were cut from and the
  // composition becomes an ordinary phone again. Home placement is recomputed
  // every frame because the slot itself is moving with the scroll.
  //
  // Geometry comes from offsetLeft/clientWidth rather than getBoundingClientRect
  // so the pointer tilt (a 3D rotation on an ancestor) can't feed back into it —
  // which is also why GSAP scaling an ancestor slide is harmless here.
  const sw = parseFloat(root.dataset.screenW || '0');
  // Two ways to know where a piece belongs. A DOM screen carries a
  // [data-slot] placeholder that the piece measures directly, so the layout is
  // the single source of truth. The flat SVG exports have no such thing, and
  // fall back to data-hx/hy in screen units.
  const slots = outs.some((o) => o.dataset.home);
  const homing = well && stage && outs.length && (slots || sw > 0);

  // offsetLeft/offsetTop are relative to the nearest positioned ancestor,
  // which is not always the well — sum the chain instead of assuming.
  function offsetIn(el: HTMLElement, stop: HTMLElement) {
    let x = 0, y = 0, n: HTMLElement | null = el;
    while (n && n !== stop) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
    return { x, y };
  }
  let t = 0, target = 0, raf2 = 0;
  // When something outside drives the homing — the Features timeline scrubs it
  // off the page scroll — the well's own scrollTop stops being the trigger.
  let driven = false;
  const hs = outs.map((o) => parseFloat(getComputedStyle(o).getPropertyValue('--hs')) || 1);

  function frame() {
    raf2 = 0;
    if (!well || !stage) return;
    const d = target - t;
    t += reduce.matches ? d : d * 0.14;
    if (Math.abs(target - t) < 0.002) t = target;

    const stageW = stage.offsetWidth, stageH = stage.offsetHeight;
    const unit = well.clientWidth / sw;          // screen units -> px
    const wellTop = well.offsetTop, wellLeft = well.offsetLeft;
    const wellBot = wellTop + well.clientHeight;
    const wellRight = wellLeft + well.clientWidth;
    const radius = parseFloat(getComputedStyle(well).borderTopLeftRadius) || 0;
    const range = well.scrollHeight - well.clientHeight;
    const p = range > 24 ? (well.scrollTop / range) * 2 - 1 : 0;

    for (let i = 0; i < outs.length; i++) {
      const o = outs[i], ds = o.dataset;
      let cx: number, cy: number;
      if (ds.home) {
        const slot = well.querySelector<HTMLElement>(`[data-slot="${ds.home}"]`);
        if (!slot) continue;
        const p = offsetIn(slot, well);
        cx = wellLeft + p.x + slot.offsetWidth / 2;
        cy = wellTop - well.scrollTop + p.y + slot.offsetHeight / 2;
      } else {
        cx = wellLeft + parseFloat(ds.hx!) * unit;
        cy = wellTop - well.scrollTop + parseFloat(ds.hy!) * unit;
      }
      const fx = parseFloat(ds.x!) / 100 * stageW;
      const fy = parseFloat(ds.y!) / 100 * stageH;
      const dx = (cx - fx) * t, dy = (cy - fy) * t;
      o.style.setProperty('--t', t.toFixed(4));
      o.style.setProperty('--dx', dx.toFixed(2) + 'px');
      o.style.setProperty('--dy', dy.toFixed(2) + 'px');

      // A seated piece belongs to the screen, so it has to obey the screen's
      // edges — otherwise a tall card homing near the top spills straight over
      // the bezel. clip-path runs in the element's own pre-transform space, so
      // the insets are measured on the rendered box and then divided back out
      // by the live scale. The clip only makes sense once a piece is basically
      // seated: ramping it from the start slices a piece that is still out
      // over the page the entire way in.
      let c = (t - 0.82) / 0.18;
      c = c < 0 ? 0 : c > 1 ? 1 : c;
      let clipped = false;
      if (c > 0) {
        const st = 1 + (hs[i] - 1) * t;
        const lx = fx + dx, ly = fy + dy;
        const hw = o.offsetWidth * st / 2, hh2 = o.offsetHeight * st / 2;
        const ct = Math.max(0, wellTop - (ly - hh2));
        const cr = Math.max(0, (lx + hw) - wellRight);
        const cb = Math.max(0, (ly + hh2) - wellBot);
        const cl = Math.max(0, wellLeft - (lx - hw));
        // Only clip a piece that actually crosses an edge. inset(0 0 0 0 round R)
        // on one sitting safely inside still rounds its own corners against the
        // well's radius, which deformed the date badges once they settled.
        if (ct + cr + cb + cl > 0.5) {
          const k = c / st;
          o.style.clipPath = 'inset(' + ct * k + 'px ' + cr * k + 'px ' +
            cb * k + 'px ' + cl * k + 'px round ' + (radius * c / st) + 'px)';
          clipped = true;
        }
      }
      if (!clipped && o.style.clipPath) o.style.clipPath = '';

      o.style.setProperty('--fd', (1 - t).toFixed(4));
      const f = parseFloat(ds.parallax || '0');
      if (f) o.style.setProperty('--py', (p * f * (1 - t)).toFixed(2) + 'px');
      o.classList.toggle('is-home', t > 0.6);
    }
    if (t !== target) raf2 = requestAnimationFrame(frame);
  }

  function schedule() {
    // Still requests a frame when driven: --dx/--dy track the slot, and the
    // slot moves with the screen, so every scroll needs a recompute even
    // though the homing progress itself is being set from outside.
    if (!driven) target = well!.scrollTop > 6 ? 1 : 0;
    if (!raf2) raf2 = requestAnimationFrame(frame);
  }

  // Hand the homing to a caller that has a better clock than "has the well
  // been scrolled" — the pinned Features timeline. Setting it snaps rather
  // than eases, because whoever calls this owns the pacing.
  (root as any).wzHome = (v: number) => {
    driven = true;
    target = t = v < 0 ? 0 : v > 1 ? 1 : v;
    if (!raf2) raf2 = requestAnimationFrame(frame);
  };

  if (homing) {
    well!.addEventListener('scroll', schedule, { passive: true });
    // schedule(), not a bare frame() request: a resize can reflow the screen
    // and clamp the well back to the top without firing a scroll event, which
    // left the pieces seated at a scroll offset that no longer existed.
    window.addEventListener('resize', schedule);
    frame();
  }

  // A screen shorter than the viewport has nothing to scroll, so don't
  // advertise a scroll affordance that does nothing. Deferred until the screen
  // has actually loaded — before that the well measures nothing at all.
  const content = root.querySelector<HTMLImageElement>('.wz-content');
  const measure = () => {
    if (!well) return;
    if (well.scrollHeight - well.clientHeight < 8) {
      well.removeAttribute('tabindex');
      well.style.overflowY = 'hidden';
    }
    if (homing && !raf2) raf2 = requestAnimationFrame(frame);
  };
  if (content && !content.complete) content.addEventListener('load', measure, { once: true });
  else measure();

  // 3. tilt
  if (stage && fine.matches && !reduce.matches) {
    let raf = 0;
    const onMove = (ev: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = root.getBoundingClientRect();
        const dx = (ev.clientX - r.left) / r.width - 0.5;
        const dy = (ev.clientY - r.top) / r.height - 0.5;
        stage.style.setProperty('--ry', (dx * 9).toFixed(2) + 'deg');
        stage.style.setProperty('--rx', (-dy * 6).toFixed(2) + 'deg');
      });
    };
    const reset = () => {
      stage.style.setProperty('--ry', '0deg');
      stage.style.setProperty('--rx', '0deg');
    };
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', reset);
  }
}

document.querySelectorAll<HTMLElement>('.wz').forEach(init);
