import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from 'emailjs-com';

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_PUBLIC_KEY = 'gqSxXYrwE8fuD6RHg';
const EMAILJS_SERVICE_ID = 'service_qxbqp0t';
const EMAILJS_TEMPLATE_ID = 'template_my14nbg';

/**
 * Boots the entire redesigned page's WebGL scene, scroll choreography, and all the small
 * interactive behaviors (modal, FAQ accordion, contact form, copy-to-clipboard, tilt-on-hover).
 * This is deliberately one big imperative bootstrap — a straight port of the original
 * hand-built prototype — rather than split into many idiomatic React-state-driven pieces,
 * so the exact tested behavior carries over with minimal risk of regression.
 *
 * Call once after the section markup has mounted (e.g. from a top-level useEffect).
 * Returns a cleanup function that tears everything down (important in dev, where
 * React StrictMode / hot reload can mount this twice).
 */
export default function initRedesign() {
  const controller = new AbortController();
  const { signal } = controller;
  const cleanupFns = [];

  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } catch (err) {
    console.error('EmailJS init failed:', err);
  }

  /* ============ THREE.JS SCENE ============ */
  const canvas = document.getElementById('webgl-bg');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 6.4);

  // Halo sprite texture (radial gradient)
  function makeGlowTexture(color) {
    const size = 256;
    const cvs = document.createElement('canvas');
    cvs.width = cvs.height = size;
    const ctx = cvs.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, color + 'ff');
    g.addColorStop(0.35, color + '55');
    g.addColorStop(1, color + '00');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(cvs);
  }

  const glowTex = makeGlowTexture('#4fd8e8');
  const haloMat = new THREE.SpriteMaterial({ map: glowTex, color: 0x4fd8e8, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
  const halo = new THREE.Sprite(haloMat);
  halo.scale.set(6.2, 6.2, 1);
  scene.add(halo);

  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // Wireframe globe
  const globeGeo = new THREE.IcosahedronGeometry(1.5, 3);
  const globeMat = new THREE.MeshBasicMaterial({ color: 0x4fd8e8, wireframe: true, transparent: true, opacity: 0.55 });
  const globe = new THREE.Mesh(globeGeo, globeMat);
  globeGroup.add(globe);

  // inner solid core, subtle
  const coreGeo = new THREE.IcosahedronGeometry(1.42, 1);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x0d1526, transparent: true, opacity: 0.85 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  globeGroup.add(core);

  // port dots + arcs
  const portPositions = [];
  const portCount = 9;
  for (let i = 0; i < portCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / portCount);
    const theta = Math.sqrt(portCount * Math.PI) * phi;
    const r = 1.5;
    const p = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    portPositions.push(p);
  }
  const portGeo = new THREE.BufferGeometry();
  const portArr = new Float32Array(portPositions.flatMap(p => [p.x, p.y, p.z]));
  portGeo.setAttribute('position', new THREE.BufferAttribute(portArr, 3));
  const portMat = new THREE.PointsMaterial({ color: 0xffb454, size: 0.075, transparent: true, opacity: 0.95, sizeAttenuation: true });
  const ports = new THREE.Points(portGeo, portMat);
  globeGroup.add(ports);

  // arcs between some port pairs
  function makeArc(p1, p2, color) {
    const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(1.5 + p1.distanceTo(p2) * 0.35);
    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
    const pts = curve.getPoints(40);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
    return new THREE.Line(geo, mat);
  }
  const arcPairs = [[0, 3], [1, 4], [2, 6], [3, 7], [5, 8], [0, 6], [4, 7]];
  arcPairs.forEach(([a, b], i) => {
    const c = i % 2 === 0 ? 0x4fd8e8 : 0x8b7bff;
    globeGroup.add(makeArc(portPositions[a], portPositions[b], c));
  });

  // orbiting service nodes (4 = the 4 services)
  const nodeGeos = [
    new THREE.BoxGeometry(0.22, 0.22, 0.22),
    new THREE.TorusGeometry(0.15, 0.05, 10, 24),
    new THREE.CylinderGeometry(0.12, 0.12, 0.26, 12),
    new THREE.OctahedronGeometry(0.17, 0)
  ];
  const nodeColors = [0x4fd8e8, 0x8b7bff, 0xffb454, 0x4fd8e8];
  const orbitNodes = [];
  nodeGeos.forEach((geo, i) => {
    const mat = new THREE.MeshBasicMaterial({ color: nodeColors[i], wireframe: false, transparent: true, opacity: 0.9 });
    const mesh = new THREE.Mesh(geo, mat);
    const radius = 2.5 + i * 0.28;
    mesh.userData = { radius, speed: 0.12 + i * 0.05, offset: i * (Math.PI / 2), tilt: 0.3 + i * 0.15 };
    orbitNodes.push(mesh);
    globeGroup.add(mesh);
  });

  // background starfield
  const starGeo = new THREE.BufferGeometry();
  const starCount = 700;
  const starArr = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starArr[i * 3] = (Math.random() - 0.5) * 40;
    starArr[i * 3 + 1] = (Math.random() - 0.5) * 40;
    starArr[i * 3 + 2] = (Math.random() - 0.5) * 40 - 6;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starArr, 3));
  const starMat = new THREE.PointsMaterial({ color: 0x5c6785, size: 0.035, transparent: true, opacity: 0.6 });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* ============ EXPLODED CARGO CRATE (SharpLink-style blueprint object, Process section) ============ */
  const crateGroup = new THREE.Group();
  crateGroup.position.set(2.4, 0, 0);
  crateGroup.scale.setScalar(0.4);
  scene.add(crateGroup);

  const CRATE_CYAN = 0x4fd8e8, CRATE_VIOLET = 0x8b7bff, CRATE_AMBER = 0xffb454;

  function addCratePart(geo, closedPos, explodedRot, color) {
    const solidMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false });
    const wireMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0, depthWrite: false });
    const solid = new THREE.Mesh(geo, solidMat);
    const wire = new THREE.Mesh(geo, wireMat);
    solid.position.copy(closedPos);
    wire.position.copy(closedPos);
    crateGroup.add(solid);
    crateGroup.add(wire);
    return { solid, wire, closedPos: closedPos.clone(), explodedPos: closedPos.clone().multiplyScalar(2.35), rotTarget: explodedRot };
  }

  const CR_S = 0.62;
  const crCapGeo = new THREE.BoxGeometry(CR_S * 2, 0.045, CR_S * 2);
  const crSideGeo = new THREE.BoxGeometry(0.045, CR_S * 2, CR_S * 2);
  const crWallGeo = new THREE.BoxGeometry(CR_S * 2, CR_S * 2, 0.045);

  const crateParts = [
    addCratePart(crCapGeo, new THREE.Vector3(0, CR_S, 0), new THREE.Vector3(0.55, 0, 0.18), CRATE_CYAN),
    addCratePart(crCapGeo, new THREE.Vector3(0, -CR_S, 0), new THREE.Vector3(-0.4, 0, 0.28), CRATE_CYAN),
    addCratePart(crSideGeo, new THREE.Vector3(CR_S, 0, 0), new THREE.Vector3(0.18, 0.5, 0), CRATE_VIOLET),
    addCratePart(crSideGeo, new THREE.Vector3(-CR_S, 0, 0), new THREE.Vector3(-0.18, -0.5, 0), CRATE_VIOLET),
    addCratePart(crWallGeo, new THREE.Vector3(0, 0, CR_S), new THREE.Vector3(0.3, 0.3, 0.4), CRATE_AMBER),
    addCratePart(crWallGeo, new THREE.Vector3(0, 0, -CR_S), new THREE.Vector3(-0.3, -0.3, -0.4), CRATE_AMBER)
  ];

  // central "package" — solid mesh that dissolves into a particle cloud
  const packGeo = new THREE.IcosahedronGeometry(0.32, 2);
  const packSolid = new THREE.Mesh(packGeo, new THREE.MeshBasicMaterial({ color: 0xeef1f8, wireframe: true, transparent: true, opacity: 0, depthWrite: false }));
  crateGroup.add(packSolid);

  const packPosAttr = packGeo.attributes.position;
  const packCount = packPosAttr.count;
  const packBase = new Float32Array(packCount * 3);
  const packDispersed = new Float32Array(packCount * 3);
  const _pv = new THREE.Vector3();
  for (let i = 0; i < packCount; i++) {
    const x = packPosAttr.getX(i), y = packPosAttr.getY(i), z = packPosAttr.getZ(i);
    packBase[i * 3] = x; packBase[i * 3 + 1] = y; packBase[i * 3 + 2] = z;
    _pv.set(x, y, z).normalize();
    const spread = 0.55 + Math.random() * 1.15;
    packDispersed[i * 3] = x + _pv.x * spread;
    packDispersed[i * 3 + 1] = y + _pv.y * spread;
    packDispersed[i * 3 + 2] = z + _pv.z * spread;
  }
  const packParticleGeo = new THREE.BufferGeometry();
  packParticleGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(packBase), 3));
  const packParticleMat = new THREE.PointsMaterial({ color: 0xeef1f8, size: 0.026, transparent: true, opacity: 0, sizeAttenuation: true, depthWrite: false });
  const packParticles = new THREE.Points(packParticleGeo, packParticleMat);
  crateGroup.add(packParticles);

  // leader-line label anchors (local to crateGroup, roughly matching each exploded part)
  const crateLabelDefs = [
    { text: 'Digital Manifest', color: 'cyan', anchor: new THREE.Vector3(0, CR_S * 2.35 + 0.16, 0) },
    { text: 'Customs Sealed', color: 'cyan', anchor: new THREE.Vector3(0, -(CR_S * 2.35 + 0.16), 0) },
    { text: 'GPS Tracked', color: 'violet', anchor: new THREE.Vector3(CR_S * 2.35 + 0.16, 0, 0) },
    { text: 'Live Status', color: 'violet', anchor: new THREE.Vector3(0, 0, CR_S * 2.35 + 0.16) }
  ];
  const crateLeaderSvg = document.getElementById('crateLeaderSvg');
  const crateLabelsEl = document.getElementById('crateLabels');
  if (crateLeaderSvg) {
    crateLeaderSvg.setAttribute('width', window.innerWidth);
    crateLeaderSvg.setAttribute('height', window.innerHeight);
  }
  const crateLabelObjs = crateLabelDefs.map(def => {
    const labelEl = document.createElement('div');
    labelEl.className = 'crate-label' + (def.color === 'violet' ? ' violet' : '');
    labelEl.innerHTML = `<span class="crate-label-dot"></span><span class="crate-label-text">${def.text}</span>`;
    if (crateLabelsEl) crateLabelsEl.appendChild(labelEl);

    const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineEl.setAttribute('class', 'leader-line' + (def.color === 'violet' ? ' leader-violet' : ''));
    if (crateLeaderSvg) crateLeaderSvg.appendChild(lineEl);

    return { anchor: def.anchor, labelEl, lineEl };
  });
  cleanupFns.push(() => {
    crateLabelObjs.forEach(o => {
      o.labelEl.remove();
      o.lineEl.remove();
    });
  });

  let crateLabelsActive = false;
  const _crA = new THREE.Vector3(), _crB = new THREE.Vector3();
  function updateCrateLabels() {
    if (!crateLabelsActive || !crateLabelObjs.length) return;
    camera.updateMatrixWorld();
    crateGroup.updateMatrixWorld(true);
    _crB.set(0, 0, 0);
    crateGroup.localToWorld(_crB);
    _crB.project(camera);
    const cx = (_crB.x * 0.5 + 0.5) * window.innerWidth;
    const cy = (-_crB.y * 0.5 + 0.5) * window.innerHeight;
    if (!isFinite(cx) || !isFinite(cy)) return;
    crateLabelObjs.forEach(o => {
      _crA.copy(o.anchor);
      crateGroup.localToWorld(_crA);
      _crA.project(camera);
      const x = (_crA.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-_crA.y * 0.5 + 0.5) * window.innerHeight;
      if (!isFinite(x) || !isFinite(y)) return;
      o.labelEl.style.left = x + 'px';
      o.labelEl.style.top = y + 'px';
      o.labelEl.style.opacity = '1';
      o.lineEl.setAttribute('x1', cx); o.lineEl.setAttribute('y1', cy);
      o.lineEl.setAttribute('x2', x); o.lineEl.setAttribute('y2', y);
      o.lineEl.style.opacity = '0.7';
    });
  }
  function hideCrateLabels() {
    crateLabelObjs.forEach(o => { o.labelEl.style.opacity = '0'; o.lineEl.style.opacity = '0'; });
  }

  // materials whose opacity is faded down while the crate is active (Process section)
  const globeFadeMaterials = [globeMat, coreMat, portMat, haloMat];
  globeGroup.children.forEach(c => { if (c.type === 'Line') globeFadeMaterials.push(c.material); });
  orbitNodes.forEach(n => globeFadeMaterials.push(n.material));
  globeFadeMaterials.forEach(m => { m.userData.baseOpacity = m.opacity; });

  /* ---- mouse parallax ---- */
  let mouseX = 0, mouseY = 0, targetRotX = 0, targetRotY = 0;
  window.addEventListener('pointermove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }, { signal });

  /* ---- resize ---- */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (crateLeaderSvg) {
      crateLeaderSvg.setAttribute('width', window.innerWidth);
      crateLeaderSvg.setAttribute('height', window.innerHeight);
    }
  }, { signal });

  /* ---- render loop ---- */
  const clock = new THREE.Clock();
  let animationFrameId = null;
  let stopped = false;
  function animate() {
    if (stopped) return;
    const t = clock.getElapsedTime();

    targetRotX += (mouseY * 0.35 - targetRotX) * 0.04;
    targetRotY += (mouseX * 0.45 - targetRotY) * 0.04;

    globe.rotation.y = t * 0.09;
    globe.rotation.x = t * 0.03;
    ports.rotation.copy(globe.rotation);
    core.rotation.copy(globe.rotation);
    globeGroup.children.forEach(c => { if (c.type === 'Line') { c.rotation.copy(globe.rotation); } });

    orbitNodes.forEach(n => {
      const a = t * n.userData.speed + n.userData.offset;
      n.position.set(
        Math.cos(a) * n.userData.radius,
        Math.sin(a * 0.6) * n.userData.radius * n.userData.tilt,
        Math.sin(a) * n.userData.radius
      );
      n.rotation.x += 0.01; n.rotation.y += 0.015;
    });

    globeGroup.rotation.x = targetRotX * 0.5;
    globeGroup.rotation.y += (targetRotY * 0.5 - globeGroup.rotation.y) * 0.02;

    stars.rotation.y = t * 0.005;
    halo.position.copy(globeGroup.position);

    crateGroup.rotation.y = Math.sin(t * 0.15) * 0.12;
    crateGroup.rotation.x = Math.cos(t * 0.11) * 0.05;
    if (crateLabelsActive) { updateCrateLabels(); } else { hideCrateLabels(); }

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(animate);
  }
  animationFrameId = requestAnimationFrame(animate);
  cleanupFns.push(() => {
    stopped = true;
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    renderer.dispose();
  });

  /* ============ SCROLL CHOREOGRAPHY ============ */
  const sceneTL = gsap.timeline({
    scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1.1 }
  });
  sceneTL
    .to(camera.position, { z: 5.6, duration: 1 }, 0)
    .to(globeGroup.position, { x: 0, duration: 1 }, 0)

    .to(camera.position, { z: 8.5, duration: 1 }, 1)
    .to(globeGroup.position, { x: 2.6, y: -0.4, duration: 1 }, 1)
    .to(globeGroup.scale, { x: 0.75, y: 0.75, z: 0.75, duration: 1 }, 1)

    .to(camera.position, { z: 11, duration: 1 }, 2)
    .to(globeGroup.position, { x: 0, y: 0, duration: 1 }, 2)
    .to(globeGroup.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 1 }, 2)

    .to(camera.position, { z: 8, duration: 1 }, 3)
    .to(globeGroup.position, { x: -2.6, y: 0.2, duration: 1 }, 3)
    .to(globeGroup.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 1 }, 3)

    .to(camera.position, { z: 9, duration: 1 }, 4)
    .to(globeGroup.position, { x: 2.4, y: 0, duration: 1 }, 4)

    .to(camera.position, { z: 5.2, duration: 1 }, 5)
    .to(globeGroup.position, { x: 0, y: 0, duration: 1 }, 5)
    .to(globeGroup.scale, { x: 1, y: 1, z: 1, duration: 1 }, 5);

  /* ============ PROCESS-SECTION CRATE CHOREOGRAPHY ============ */
  ScrollTrigger.create({
    trigger: '#process', start: 'top 75%', end: 'bottom 25%', scrub: 1,
    onUpdate(self) {
      const p = self.progress;
      const smooth = (v) => v * v * (3 - 2 * v);

      const scaleIn = smooth(THREE.MathUtils.clamp(p / 0.12, 0, 1));
      crateGroup.scale.setScalar(0.4 + scaleIn * 0.6);

      const explodeEase = smooth(THREE.MathUtils.clamp((p - 0.12) / 0.38, 0, 1));
      const crossfadeT = THREE.MathUtils.clamp((p - 0.55) / 0.3, 0, 1);
      const fadeIn = THREE.MathUtils.clamp(p / 0.08, 0, 1);
      const fadeOut = 1 - THREE.MathUtils.clamp((p - 0.92) / 0.08, 0, 1);
      const partAlpha = Math.min(fadeIn, fadeOut);

      crateParts.forEach(part => {
        part.solid.position.lerpVectors(part.closedPos, part.explodedPos, explodeEase);
        part.wire.position.copy(part.solid.position);
        part.solid.rotation.set(part.rotTarget.x * explodeEase, part.rotTarget.y * explodeEase, part.rotTarget.z * explodeEase);
        part.wire.rotation.copy(part.solid.rotation);
        part.solid.material.opacity = 0.6 * (1 - crossfadeT) * partAlpha;
        part.wire.material.opacity = 0.75 * crossfadeT * partAlpha;
      });

      const dissolveT = explodeEase;
      packSolid.material.opacity = (1 - dissolveT) * 0.7 * partAlpha;
      packParticles.material.opacity = dissolveT * 0.9 * partAlpha;
      const posAttr = packParticles.geometry.attributes.position;
      for (let i = 0; i < packCount; i++) {
        posAttr.array[i * 3] = THREE.MathUtils.lerp(packBase[i * 3], packDispersed[i * 3], dissolveT);
        posAttr.array[i * 3 + 1] = THREE.MathUtils.lerp(packBase[i * 3 + 1], packDispersed[i * 3 + 1], dissolveT);
        posAttr.array[i * 3 + 2] = THREE.MathUtils.lerp(packBase[i * 3 + 2], packDispersed[i * 3 + 2], dissolveT);
      }
      posAttr.needsUpdate = true;

      crateLabelsActive = p > 0.4 && p < 0.92;

      const globeFadeAmt = 1 - THREE.MathUtils.clamp((p - 0.03) / 0.2, 0, 1) * 0.85;
      globeFadeMaterials.forEach(m => { m.opacity = m.userData.baseOpacity * globeFadeAmt; });
    },
    onLeaveBack() {
      globeFadeMaterials.forEach(m => { m.opacity = m.userData.baseOpacity; });
    }
  });

  /* Hero text parallax + fade on scroll */
  gsap.to('.hero .eyebrow, .hero h1, .hero p, .hero .hero-actions', {
    y: -90, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.scroll-cue', {
    opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '30% top', scrub: true }
  });

  /* ============ SPLIT-WORD HEADLINE REVEAL ============ */
  function splitWords(el) {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words.map(w => `<span class="split-word"><span class="split-word-inner">${w}</span></span>`).join(' ');
    return Array.from(el.querySelectorAll('.split-word-inner'));
  }

  let heroWords = [];
  const heroTitleEl = document.getElementById('heroTitle');
  if (heroTitleEl) {
    const firstLine = heroTitleEl.childNodes[0].textContent.trim().split(/\s+/);
    const gradSpan = heroTitleEl.querySelector('.grad');
    const gradText = gradSpan ? gradSpan.textContent : '';
    const wordHtml = firstLine.map(w => `<span class="split-word"><span class="split-word-inner">${w}</span></span>`).join(' ');
    heroTitleEl.innerHTML = wordHtml + '<br><span class="split-word"><span class="split-word-inner grad">' + gradText + '</span></span>';
    heroWords = Array.from(heroTitleEl.querySelectorAll('.split-word-inner'));
    gsap.set(heroWords, { yPercent: 115, opacity: 0 });
  }

  const sectionHeadWords = gsap.utils.toArray('.section-head h2, .contact-panel h2').map(el => {
    const words = splitWords(el);
    gsap.set(words, { yPercent: 110, opacity: 0 });
    return { el, words };
  });
  sectionHeadWords.forEach(({ el, words }) => {
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to(words, { yPercent: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.045 })
    });
  });

  /* ============ LETTER-SCRAMBLE REVEAL ============ */
  const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const scrambleTimeouts = new Set();
  function scrambleReveal(el, opts = {}) {
    const finalText = el.textContent;
    const chars = finalText.split('');
    const stepMs = opts.stepMs || 30;
    const startMs = (opts.cycles || 6) * stepMs;
    const perCharMs = opts.perCharMs || stepMs;
    const totalMs = startMs + chars.length * perCharMs;
    const t0 = (window.performance && performance.now) ? performance.now() : Date.now();
    const render = () => {
      if (stopped) return;
      const now = (window.performance && performance.now) ? performance.now() : Date.now();
      const elapsed = now - t0;
      el.textContent = chars.map((c, i) => {
        if (c === ' ' || c === '·' || c === '/') return c;
        if (elapsed >= startMs + i * perCharMs) return c;
        return SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }).join('');
      if (elapsed < totalMs) {
        const id = setTimeout(render, stepMs);
        scrambleTimeouts.add(id);
      } else {
        el.textContent = finalText;
      }
    };
    render();
  }
  cleanupFns.push(() => { scrambleTimeouts.forEach(id => clearTimeout(id)); });

  const heroEyebrowEl = document.querySelector('.hero .eyebrow');
  if (heroEyebrowEl) {
    const id = setTimeout(() => scrambleReveal(heroEyebrowEl, { stepMs: 32, cycles: 5 }), 260);
    scrambleTimeouts.add(id);
  }

  gsap.utils.toArray('.kicker').forEach(el => {
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => scrambleReveal(el, { stepMs: 28, cycles: 6 })
    });
  });

  /* initial hero entrance */
  gsap.from('[data-reveal]', {
    y: 36, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.14, delay: 0.2
  });
  if (heroWords.length) {
    gsap.to(heroWords, {
      yPercent: 0, opacity: 1, duration: 0.95, ease: 'power3.out', stagger: 0.05, delay: 0.2
    });
  }

  /* generic reveal for cards / blocks */
  function revealBatch(selector, opts = {}) {
    const els = gsap.utils.toArray(selector);
    els.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, rotationX: 0, rotationY: 0, duration: 0.9, ease: 'power3.out',
        transformPerspective: 900, transformOrigin: 'center bottom',
        delay: (opts.stagger || 0.1) * (i % 4),
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });
  }
  revealBatch('.card');
  revealBatch('.about-block');
  revealBatch('.value', { stagger: 0.08 });
  revealBatch('.process-row', { stagger: 0.12 });
  revealBatch('.faq-item', { stagger: 0.08 });

  gsap.to('.contact-panel', {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-panel', start: 'top 85%' }
  });

  /* stats: 3D flip-in reveal + count-up + glow pop on landing */
  gsap.utils.toArray('.stat').forEach((stat, i) => {
    const numEl = stat.querySelector('.num');
    const valueEl = stat.querySelector('.num-value');
    const target = parseFloat(valueEl.dataset.count);
    ScrollTrigger.create({
      trigger: stat, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to(stat, {
          opacity: 1, rotationX: 0, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.08,
          transformPerspective: 700, transformOrigin: 'center bottom'
        });
        gsap.to(valueEl, {
          innerText: target, duration: 1.7, ease: 'power2.out', snap: { innerText: 1 }, delay: i * 0.08 + 0.15,
          onUpdate: function () { valueEl.textContent = Math.round(this.targets()[0].innerText); },
          onComplete: function () {
            numEl.classList.add('pop');
            const id = setTimeout(() => numEl.classList.remove('pop'), 550);
            scrambleTimeouts.add(id);
          }
        });
      }
    });
  });

  /* ============ SERVICE MODAL ("Read More" popups) ============ */
  const serviceDetails = {
    multimodal: "Whichever combination your supply chain needs — ocean for volume, air for speed, road for the final mile — we plan the route, book the capacity, and track it end-to-end. One point of contact across every mode, so nothing falls through the cracks between carriers.",
    warehousing: "Secure, monitored storage with real-time inventory visibility. From short-term consolidation to long-term contract warehousing, our facilities are built to keep stock moving, not just sitting — with flexible space that scales with demand.",
    fleet: "A modern fleet and experienced drivers covering regional and long-haul routes across India. Live tracking and flexible scheduling mean your goods move on your timeline, with full visibility from pickup to final delivery.",
    customs: "Documentation, classification, duty calculation, and compliance — handled by a team that knows the paperwork so your cargo doesn't sit at the border. We manage the process end-to-end, from filing to final release."
  };

  const modalOverlay = document.getElementById('modalOverlay');
  const modalPanel = modalOverlay ? modalOverlay.querySelector('.modal-panel') : null;
  const modalImg = document.getElementById('modalImg');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  let lastFocused = null;

  function openModal(serviceId) {
    const card = document.querySelector('.card[data-service="' + serviceId + '"]');
    if (!card || !modalOverlay) return;
    const img = card.querySelector('.card-media img');
    const tag = card.querySelector('.card-tag');
    const title = card.querySelector('h3');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTag.textContent = tag.textContent;
    modalTitle.textContent = title.textContent;
    modalDesc.textContent = serviceDetails[serviceId] || '';
    lastFocused = document.activeElement;
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalPanel.focus();
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.openModal), { signal });
  });
  const modalCloseBtn = document.getElementById('modalClose');
  const modalCloseBtn2 = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal, { signal });
  if (modalCloseBtn2) modalCloseBtn2.addEventListener('click', closeModal, { signal });
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); }, { signal });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) closeModal();
  }, { signal });

  /* ============ "TALK TO AN EXPERT" -> scroll to contact + highlight ============ */
  document.querySelectorAll('[data-talk-expert]').forEach(el => {
    el.addEventListener('click', () => {
      if (modalOverlay && modalOverlay.classList.contains('open')) closeModal();
      const id = setTimeout(() => {
        const panel = document.querySelector('.contact-panel');
        if (panel) {
          panel.classList.remove('pulse');
          void panel.offsetWidth;
          panel.classList.add('pulse');
        }
      }, 400);
      scrambleTimeouts.add(id);
    }, { signal });
  });

  /* ============ FAQ ACCORDION ============ */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    }, { signal });
  });

  /* ============ CONTACT FORM -> real send via EmailJS (same service/template as the live site) ============ */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const contactSubmitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = (data.get('from_name') || '').trim();
      const email = (data.get('email') || '').trim();
      const message = (data.get('message') || '').trim();

      if (!name || !email || !message) {
        formNote.textContent = 'Please fill in your name, email, and shipment details.';
        formNote.style.color = 'var(--amber)';
        return;
      }

      formNote.textContent = 'Sending…';
      formNote.style.color = 'var(--text-faint)';
      if (contactSubmitBtn) contactSubmitBtn.disabled = true;

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => {
          formNote.textContent = "Message sent — we'll get back to you shortly.";
          formNote.style.color = '#3ddc7c';
          contactForm.reset();
        })
        .catch((err) => {
          console.error('EmailJS error:', err);
          formNote.textContent = "Couldn't send automatically — use the copy icon to grab our email, or reach us on WhatsApp instead.";
          formNote.style.color = 'var(--amber)';
        })
        .finally(() => {
          if (contactSubmitBtn) contactSubmitBtn.disabled = false;
        });
    }, { signal });
  }

  /* ============ COPY TO CLIPBOARD (guaranteed-working fallback for email/phone) ============ */
  function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); cb && cb(true); }
    catch (e) { cb && cb(false); }
    document.body.removeChild(ta);
  }
  function copyText(text, btn) {
    const onDone = (ok) => {
      if (!btn) return;
      const original = btn.innerHTML;
      const prevLabel = btn.getAttribute('aria-label');
      if (ok !== false) {
        btn.classList.add('copied');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        btn.setAttribute('aria-label', 'Copied!');
      }
      const id = setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = original;
        if (prevLabel) btn.setAttribute('aria-label', prevLabel);
      }, 1800);
      scrambleTimeouts.add(id);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => onDone(true)).catch(() => fallbackCopy(text, onDone));
    } else {
      fallbackCopy(text, onDone);
    }
  }
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => copyText(btn.getAttribute('data-copy'), btn), { signal });
  });

  /* ============ 3D TILT-ON-HOVER (mouse-driven perspective, reinforces the WebGL scene) ============ */
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    const tiltEls = Array.from(document.querySelectorAll('.card, .location-card, .contact-form-block')).map(el => {
      const isCard = el.classList.contains('card');
      const qx = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power2.out' });
      const qy = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power2.out' });
      const qz = isCard ? gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power2.out' }) : null;
      gsap.set(el, { transformPerspective: 900, transformOrigin: 'center' });
      return { el, qx, qy, qz, rect: null, hovering: false };
    });
    function resetTiltRects() { tiltEls.forEach(t => { if (!t.hovering) t.rect = null; }); }
    window.addEventListener('resize', resetTiltRects, { signal });
    window.addEventListener('scroll', resetTiltRects, { passive: true, signal });
    window.addEventListener('mousemove', (e) => {
      const mx = e.clientX, my = e.clientY;
      tiltEls.forEach(t => {
        if (!t.hovering) {
          const r = t.el.getBoundingClientRect();
          const inside = mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom;
          if (!inside) return;
          t.hovering = true; t.rect = r; if (t.qz) t.qz(-4);
        }
        const r = t.rect;
        const inside = mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom;
        if (!inside) {
          t.hovering = false; t.rect = null;
          t.qx(0); t.qy(0); if (t.qz) t.qz(0);
          return;
        }
        const px = (mx - r.left) / r.width - 0.5;
        const py = (my - r.top) / r.height - 0.5;
        t.qx(px * 10);
        t.qy(py * -10);
      });
    }, { signal });
  }

  cleanupFns.push(() => {
    ScrollTrigger.getAll().forEach(st => st.kill());
  });

  return function cleanup() {
    controller.abort();
    cleanupFns.forEach(fn => {
      try { fn(); } catch (err) { console.error('initRedesign cleanup error:', err); }
    });
  };
}
