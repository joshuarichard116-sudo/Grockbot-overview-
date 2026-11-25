/* Bot pyramid: a 3D neon pyramid drawn on one 2D canvas, with the bot team
   orbiting it and DELTA floating above the apex as the capstone.
   Ported from Joshua's "Bot Pyramid 3D" desktop wallpaper to the web.
   Light on the GPU on purpose: one canvas, no CSS 3D layers, no filters,
   no shadowBlur. Glows are pre-rendered sprites. It pauses when the hero is
   off screen or the tab is hidden, and draws one still frame for reduced motion. */
(function () {
  var box = document.querySelector('.pyr3d'); if (!box) return;
  var cv = box.querySelector('canvas'), ctx = cv.getContext('2d');
  var tip = box.querySelector('.pyr-tip');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- the team (8 bots; DELTA is the capstone) ----
  var MINT = [182, 208, 166], PEACH = [226, 151, 101], WHITE = [240, 242, 238];
  var RINGS = [
    { y: 330, R: 430, speed: 13, off: 20, col: MINT },    // day ops, near the apex
    { y: -300, R: 640, speed: 8, off: 60, col: PEACH }    // enclave and BD, near the base
  ];
  var BOTS = [
    { n: 'DELTA', job: 'Coordinator', ring: -1 },
    { n: 'PATCH', job: 'Help desk tickets', ring: 0 },
    { n: 'NETTY', job: 'Networking', ring: 0 },
    { n: 'CHRONO', job: 'Call time and hours', ring: 0 },
    { n: 'SENTRY', job: 'CMMC pod manager', ring: 1 },
    { n: 'REMY', job: 'GCC High engineer', ring: 1 },
    { n: 'RADAR', job: 'Threat intel', ring: 1 },
    { n: 'PELICAN', job: 'Business development', ring: 1 }
  ];
  var count = [0, 0];
  BOTS.forEach(function (b, i) {
    b.i = i; b.idx = b.ring >= 0 ? count[b.ring]++ : 0;
    b.col = b.ring < 0 ? WHITE : RINGS[b.ring].col;
    b.hov = 0; b.img = new Image(); b.img.src = 'assets/img/bots/' + b.n.toLowerCase() + '.png';
    b.sprite = null; b.img.onload = function () { b.sprite = avatar(b); if (still) draw(); };
  });

  // ---- pyramid geometry (world units) ----
  var HB = 460, HT = 700, FLOOR = -760, DELTA_Y = HT + 300;
  function corner(i, hb, ht) { return [(i === 0 || i === 3) ? -hb : hb, -ht, i < 2 ? -hb : hb]; }

  // ---- sprites ----
  function glowSprite(c, size) {
    var s = document.createElement('canvas'); s.width = s.height = size;
    var g = s.getContext('2d'), r = size / 2, gr = g.createRadialGradient(r, r, 0, r, r, r);
    gr.addColorStop(0, 'rgba(' + c + ',1)'); gr.addColorStop(0.22, 'rgba(' + c + ',.45)');
    gr.addColorStop(0.55, 'rgba(' + c + ',.1)'); gr.addColorStop(1, 'rgba(' + c + ',0)');
    g.fillStyle = gr; g.fillRect(0, 0, size, size); return s;
  }
  var G_MINT = glowSprite(MINT.join(','), 128), G_PEACH = glowSprite(PEACH.join(','), 128),
      G_WHITE = glowSprite(WHITE.join(','), 128), G_CORE = glowSprite('150,175,140', 256);
  function avatar(b) {   // round avatar with a thin rim, drawn once
    var S = 160, s = document.createElement('canvas'); s.width = s.height = S;
    var g = s.getContext('2d'), r = S / 2;
    g.save(); g.beginPath(); g.arc(r, r, r - 5, 0, 6.2832); g.closePath(); g.clip();
    g.fillStyle = '#181a1c'; g.fillRect(0, 0, S, S); g.drawImage(b.img, 0, 0, S, S); g.restore();
    g.beginPath(); g.arc(r, r, r - 4, 0, 6.2832);
    g.strokeStyle = 'rgba(' + b.col.join(',') + ',.95)'; g.lineWidth = 4; g.stroke();
    return s;
  }

  // ---- camera ----
  var W = 0, H = 0, DPR = 1, scale = 1, cx = 0, cy = 0, FOC = 6500;
  var yaw = 0, yawVel = 0, pitch = -0.30, mx = 0, my = 0, tmx = 0, tmy = 0;
  function resize() {
    var r = box.getBoundingClientRect(); W = r.width; H = r.height;
    DPR = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    scale = Math.min(W / 1950, H / 2600); cx = W / 2; cy = H * 0.52;
    if (still) draw();
  }
  // world -> screen. Points are already spun in their own frame; the camera adds yaw and pitch.
  var cyw = 1, syw = 0, cp = 1, sp = 0;
  function setCam() {
    var y = yaw + mx * 0.25, p = pitch - my * 0.10;
    cyw = Math.cos(y); syw = Math.sin(y); cp = Math.cos(p); sp = Math.sin(p);
  }
  function P(x, y, z) {
    var x1 = x * cyw - z * syw, z1 = x * syw + z * cyw;          // yaw
    var y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;              // pitch
    var k = FOC / (FOC + z2);
    return { x: cx + x1 * k * scale, y: cy - y2 * k * scale, z: z2, k: k };
  }
  function spinY(v, a) { var c = Math.cos(a), s = Math.sin(a); return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]; }

  // ---- state ----
  var t = 0, last = 0, beams = [], ripples = [], hover = -1, deltaBump = 0, nextAmbient = 1.2, seed = 4242, focusBot = -1;
  function rnd() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }
  function frac(x) { return x - Math.floor(x); }
  function hash(i, k) { var s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s); }
  function beam(b, amp, col, dur) { beams.push({ b: b, t0: t, dur: dur || 1.3, amp: amp, col: col }); }
  var sats = [];

  function place() {
    sats = BOTS.map(function (b, i) {
      if (b.ring < 0) { var q = P(0, DELTA_Y + 22 * Math.sin(t * 0.55), 0); q.a = 1; q.la = 1; return q; }
      var R = RINGS[b.ring], n = count[b.ring];
      var ang = (R.off + b.idx * 360 / n + t * R.speed) * Math.PI / 180;
      var p = P(R.R * Math.cos(ang), R.y + 24 * Math.sin(t * 0.8 + i), R.R * Math.sin(ang));
      var f = Math.max(0, Math.min(1, (p.k - 0.91) / (1.09 - 0.91)));
      p.a = 0.38 + 0.62 * f; p.la = Math.max(0, Math.min(1, (f - 0.4) / 0.5)); return p;
    });
  }

  // ---- drawing ----
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + Math.max(0, Math.min(1, a)).toFixed(3) + ')'; }
  function sprite(img, x, y, r, a) { if (a <= 0.003) return; ctx.globalAlpha = Math.min(1, a); ctx.drawImage(img, x - r, y - r, r * 2, r * 2); }
  function line(a, b, col, w, alpha) { ctx.globalAlpha = alpha; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }

  function ring3d(y, R, col, alpha, dash) {
    ctx.globalAlpha = alpha; ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.setLineDash(dash || []);
    ctx.beginPath();
    for (var j = 0; j <= 72; j++) { var a = j / 72 * 6.2832, q = P(R * Math.cos(a), y, R * Math.sin(a)); if (j) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); }
    ctx.stroke(); ctx.setLineDash([]);
  }

  // one pyramid body: faces, edges, scanline. full=false for the inner crystal and reflection
  function body(spin, oy, s, fade, full, flip) {
    var hb = HB * s, ht = HT * s, i;
    function w(v) { var r = spinY(v, spin); return P(r[0], (flip ? -r[1] : r[1]) + oy, r[2]); }
    var C = [], apex = w([0, ht, 0]);
    for (i = 0; i < 4; i++) C.push(w(corner(i, hb, ht)));
    // faces, far to near
    var faces = [];
    for (i = 0; i < 4; i++) { var a = C[i], b = C[(i + 1) % 4]; faces.push({ a: a, b: b, z: (a.z + b.z + apex.z) / 3 }); }
    faces.sort(function (p, q) { return q.z - p.z; });
    faces.forEach(function (f, n) {
      var front = n >= 2;
      var gr = ctx.createLinearGradient(apex.x, apex.y, (f.a.x + f.b.x) / 2, (f.a.y + f.b.y) / 2);
      gr.addColorStop(0, 'rgba(182,208,166,' + (0.22 * fade).toFixed(3) + ')');
      gr.addColorStop(1, 'rgba(84,104,78,' + ((front ? 0.20 : 0.10) * fade).toFixed(3) + ')');
      ctx.globalAlpha = 1; ctx.fillStyle = gr;
      ctx.beginPath(); ctx.moveTo(apex.x, apex.y); ctx.lineTo(f.a.x, f.a.y); ctx.lineTo(f.b.x, f.b.y); ctx.closePath(); ctx.fill();
      if (full && front) {   // holographic scanlines crawling up the near faces
        for (var k = 0; k < 2; k++) {
          var u = frac(t * 0.09 + k * 0.5), l1 = lerp(f.a, apex, u), l2 = lerp(f.b, apex, u);
          line(l1, l2, '#e4eedd', 1, 0.28 * fade * Math.sin(Math.PI * u));
        }
      }
    });
    // edges: a faint wide stroke under a crisp thin one
    var E = [];
    for (i = 0; i < 4; i++) { E.push([C[i], apex]); E.push([C[i], C[(i + 1) % 4]]); }
    ctx.lineCap = 'round';
    E.forEach(function (e) { line(e[0], e[1], '#b6d0a6', 5 * Math.max(0.6, scale * 2.2), 0.09 * fade); });
    E.forEach(function (e) {
      var back = (e[0].z + e[1].z) / 2 > (apex.z + C[0].z + C[2].z) / 3 + 1;
      line(e[0], e[1], '#e9f0e4', 1.15, (back ? 0.35 : 0.9) * fade);
    });
    return { C: C, apex: apex };
  }
  function lerp(a, b, u) { return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u }; }

  function curve(S, D, side, u) {
    var mxp = (S.x + D.x) / 2, myp = (S.y + D.y) / 2, d = Math.hypot(S.x - D.x, S.y - D.y);
    var qx = mxp + side * d * 0.28, qy = myp - d * 0.08, v = 1 - u;
    return { x: v * v * S.x + 2 * v * u * qx + u * u * D.x, y: v * v * S.y + 2 * v * u * qy + u * u * D.y };
  }

  function drawBot(b, p) {
    var isD = b.ring < 0, U = scale * p.k;
    var r = (isD ? 150 : 110) * U * (1 + 0.16 * b.hov + (focusBot === b.i ? 0.1 : 0));
    var breathe = 0.5 + 0.5 * Math.sin(t * 1.9 + b.i);
    var halo = isD ? G_WHITE : (b.ring === 0 ? G_MINT : G_PEACH);
    sprite(halo, p.x, p.y, r * (isD ? 2.3 : 1.9), p.a * ((isD ? 0.30 + 0.12 * breathe + deltaBump * 0.35 : 0.16 + 0.08 * breathe) + b.hov * 0.3));
    // thin orbit ring around the avatar
    ctx.globalAlpha = p.a * (0.35 + 0.4 * b.hov); ctx.strokeStyle = rgba(b.col, 1); ctx.lineWidth = 1;
    ctx.setLineDash([3, 5]); ctx.lineDashOffset = -t * (isD ? 6 : 10) * (b.i % 2 ? 1 : -1);
    ctx.beginPath(); ctx.arc(p.x, p.y, r * 1.22, 0, 6.2832); ctx.stroke(); ctx.setLineDash([]);
    if (b.sprite) { ctx.globalAlpha = p.a; ctx.drawImage(b.sprite, p.x - r, p.y - r, r * 2, r * 2); }
    var la = isD ? 1 : Math.max(p.la, b.hov, focusBot === b.i ? 1 : 0);
    if (la > 0.02) {
      var fs = Math.max(10, Math.round((isD ? 14 : 11.5) * Math.min(1.25, p.k)));
      ctx.globalAlpha = p.a * la; ctx.fillStyle = '#f4f5f2'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.font = '750 ' + fs + 'px "Segoe UI", system-ui, sans-serif';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0.08em';
      ctx.fillText(b.n, p.x, p.y + r * 1.32);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    }
  }

  function draw() {
    if (!W) return;
    setCam(); place();
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
    var spin = t * 0.12 + 0.5, bob = 22 * Math.sin(t * 0.55), i;

    // floor: soft rings and the orbit shadows, plus a faint reflection
    ctx.lineWidth = 1;
    for (i = 1; i <= 4; i++) ring3d(FLOOR, 230 * i, '#b6d0a6', 0.10 - i * 0.015);
    ring3d(FLOOR, RINGS[1].R, '#e29765', 0.10, [2, 7]);
    body(spin, 2 * FLOOR - bob, 1, 0.10, false, true);
    // orbit paths
    ring3d(RINGS[0].y, RINGS[0].R, '#b6d0a6', 0.28, [3, 7]);
    ring3d(RINGS[1].y, RINGS[1].R, '#e29765', 0.24, [3, 7]);

    // bots behind the pyramid first
    var order = BOTS.slice(1).sort(function (a, b) { return sats[b.i].z - sats[a.i].z; });
    order.forEach(function (b) { if (sats[b.i].z > 0) drawBot(b, sats[b.i]); });

    // core glow, then the pyramid and its counter-rotating inner crystal
    var core = P(0, -80 + bob, 0), br = 0.5 + 0.5 * Math.sin(t * 1.3);
    ctx.globalCompositeOperation = 'lighter';
    sprite(G_CORE, core.x, core.y, (300 + 60 * br) * scale * core.k, 0.45 + 0.15 * br);
    ctx.globalCompositeOperation = 'source-over';
    var pb = body(spin, bob, 1, 1, true, false);
    body(-spin * 2.4, -90 + bob, 0.36, 0.7, false, false);

    ctx.globalCompositeOperation = 'lighter';
    // particles rising through the pyramid
    for (i = 0; i < 36; i++) {
      var u = frac(t * (0.035 + 0.04 * hash(i, 1)) + hash(i, 2));
      var rr = (1 - u) * HB * 0.8 * hash(i, 3), an = hash(i, 4) * 6.2832 + t * 0.15;
      var q = P(rr * Math.cos(an), -HT + u * 2 * HT + bob, rr * Math.sin(an));
      sprite(G_MINT, q.x, q.y, (8 + 10 * hash(i, 5)) * scale * 4 * q.k, 0.55 * Math.sin(Math.PI * u));
    }
    // pulses racing up the slant edges
    for (i = 0; i < 8; i++) {
      var e = i % 4, uu = frac(t / 7 + i * 0.173), a = pb.C[e], ap = pb.apex;
      var pp = lerp(a, ap, uu);
      sprite(G_WHITE, pp.x, pp.y, 26 * scale * 4 * Math.sin(Math.PI * uu) + 1, 0.8);
    }
    sprite(G_WHITE, pb.apex.x, pb.apex.y, (40 + 8 * Math.sin(t * 2.1)) * scale * 4, 0.7);

    // beams from bots up to DELTA, and click ripples
    var D = sats[0];
    beams.forEach(function (be) {
      var S = sats[be.b.i], u = (t - be.t0) / be.dur; if (u < 0 || u > 1) return;
      var side = S.x < D.x ? -1 : 1, ee = u * u * (3 - 2 * u), env = 0.4 + 0.6 * Math.sin(Math.PI * u);
      var spr = be.col === PEACH ? G_PEACH : (be.col === WHITE ? G_WHITE : G_MINT);
      for (var j = 12; j >= 0; j--) {
        var v = ee - j * 0.02; if (v < 0) continue;
        var q = curve(S, D, side, v);
        sprite(spr, q.x, q.y, (j === 0 ? 30 : 18 - j) * Math.max(0.5, scale * 2.6), (1 - j / 13) * be.amp * env * (j === 0 ? 1 : 0.6));
      }
    });
    ctx.globalCompositeOperation = 'source-over';
    ripples.forEach(function (rp) {
      var k = (t - rp.t0) / 1.2, s = sats[rp.b.i];
      for (var j = 0; j < 2; j++) {
        var kk = k - j * 0.16; if (kk <= 0 || kk >= 1) continue;
        ctx.globalAlpha = (1 - kk) * 0.7; ctx.strokeStyle = '#e6f7f3'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(s.x, s.y, (rp.b.ring < 0 ? 150 : 110) * scale * s.k * (1 + kk * 1.2), 0, 6.2832); ctx.stroke();
      }
    });

    // bots in front, then DELTA on top
    order.forEach(function (b) { if (sats[b.i].z <= 0) drawBot(b, sats[b.i]); });
    drawBot(BOTS[0], sats[0]);
    ctx.globalAlpha = 1;
  }

  // ---- simulation ----
  function update(dt) {
    t += dt;
    BOTS.forEach(function (b) { b.hov += ((hover === b.i ? 1 : 0) - b.hov) * Math.min(1, dt * 9); });
    if (t > nextAmbient) { nextAmbient = t + 2.0 + rnd() * 2.2; beam(BOTS[1 + Math.floor(rnd() * 7)], 0.45, MINT, 1.6); }
    beams = beams.filter(function (be) { if (t - be.t0 >= be.dur) { deltaBump = Math.min(1.2, deltaBump + (be.amp > 0.9 ? 0.7 : 0.15)); return false; } return true; });
    ripples = ripples.filter(function (r) { return t - r.t0 < 1.4; });
    deltaBump *= Math.exp(-dt / 0.9);
    mx += (tmx - mx) * Math.min(1, dt * 3); my += (tmy - my) * Math.min(1, dt * 3);
    if (!drag) { yawVel *= Math.exp(-dt / 1.2); yaw += yawVel * dt; }
  }

  var running = false, visible = true, still = reduce, raf = 0;
  function frame(now) {
    raf = 0; if (!running) return;
    var dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now;
    update(dt); draw(); raf = requestAnimationFrame(frame);
  }
  function setRunning() {
    var go = visible && !document.hidden && !reduce;
    if (go && !running) { running = true; last = 0; raf = requestAnimationFrame(frame); }
    if (!go && running) { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; setRunning(); }).observe(box);
  document.addEventListener('visibilitychange', setRunning);

  // ---- input: hover, click to send a beam to DELTA, drag or flick to spin ----
  function hitAt(e) {
    var r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, best = -1, bz = Infinity;
    sats.forEach(function (p, i) {
      var rad = (i === 0 ? 150 : 110) * scale * p.k * 1.25;
      if (Math.hypot(x - p.x, y - p.y) < rad && p.z < bz) { bz = p.z; best = i; }
    });
    return best;
  }
  function showTip(i) {
    if (i < 0) { tip.hidden = true; return; }
    var b = BOTS[i], p = sats[i];
    tip.innerHTML = '<b>' + b.n + '</b><span>' + b.job + '</span>'; tip.hidden = false;
    var tw = tip.offsetWidth, r = (i === 0 ? 150 : 110) * scale * p.k;
    tip.style.left = Math.max(4, Math.min(W - tw - 4, p.x - tw / 2)) + 'px';
    var top = p.y - r * 1.3 - tip.offsetHeight - 6;
    if (top < H * 0.12) top = p.y + r * 1.3 + 26;   // near the top edge: show it below the bot instead
    tip.style.top = top + 'px';
  }
  function call(i) {
    var b = BOTS[i]; ripples.push({ b: b, t0: t });
    if (b.ring >= 0) beam(b, 1, PEACH, 1.0);
    else BOTS.slice(1).forEach(function (o, k) { beams.push({ b: o, t0: t + k * 0.06, dur: 1.1, amp: 0.7, col: MINT }); });
    if (still) { t += 0.001; draw(); }
  }
  function openCard(i) {
    var name = BOTS[i].n;
    document.querySelectorAll('.bot').forEach(function (c) {
      var bt = c.querySelector('b');
      if (bt && bt.textContent === name) { c.click(); c.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }
    });
  }
  var drag = null;
  cv.addEventListener('pointermove', function (e) {
    var r = cv.getBoundingClientRect();
    if (e.pointerType === 'mouse') { tmx = (e.clientX - r.left) / r.width - 0.5; tmy = (e.clientY - r.top) / r.height - 0.5; }
    if (drag && e.pointerId === drag.id) {
      var dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) + Math.abs(e.clientY - drag.y) < 5) return;
      if (!drag.moved) { drag.moved = true; box.classList.add('dragging'); try { cv.setPointerCapture(e.pointerId); } catch (err) {} }
      var d = dx / Math.max(200, W) * 3.2, now = performance.now();
      yaw += d; drag.x = e.clientX; drag.y = e.clientY;
      drag.samples.push({ d: d, t: now }); while (drag.samples.length && now - drag.samples[0].t > 90) drag.samples.shift();
      if (still) draw();
      return;
    }
    var h = hitAt(e); if (h !== hover) { hover = h; cv.style.cursor = h >= 0 ? 'pointer' : ''; showTip(h); if (still) { BOTS.forEach(function (b) { b.hov = b.i === h ? 1 : 0; }); draw(); } }
    else if (h >= 0) showTip(h);
  });
  cv.addEventListener('pointerleave', function () { tmx = 0; tmy = 0; hover = -1; tip.hidden = true; cv.style.cursor = ''; });
  cv.addEventListener('pointerdown', function (e) { if (e.button !== 0) return; drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false, samples: [] }; });
  function end(e) {
    if (!drag) return;
    if (drag.moved) {
      var s = drag.samples, sum = 0, span = s.length ? Math.max(16, performance.now() - s[0].t) : 1;
      s.forEach(function (p) { sum += p.d; });
      yawVel = Math.max(-6, Math.min(6, s.length ? sum / span * 1000 : 0));
    } else if (e.type === 'pointerup') {
      var h = hitAt(e);
      if (h >= 0) { call(h); if (h > 0) setTimeout(function () { openCard(h); }, reduce ? 0 : 650); }
    }
    drag = null; box.classList.remove('dragging');
  }
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);

  // keyboard: the hidden buttons mirror the bots for focus and screen readers
  box.querySelectorAll('.pyr-keys button').forEach(function (btn) {
    var i = +btn.getAttribute('data-i');
    btn.addEventListener('focus', function () { focusBot = i; showTip(i); if (still) draw(); });
    btn.addEventListener('blur', function () { focusBot = -1; tip.hidden = true; if (still) draw(); });
    btn.addEventListener('click', function () { call(i); if (i > 0) openCard(i); });
  });
  box.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); yaw += (e.key === 'ArrowRight' ? 1 : -1) * 0.5; if (still) draw(); }
  });

  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(box); else window.addEventListener('resize', resize);
  resize(); t = 3; draw(); setRunning();
})();
