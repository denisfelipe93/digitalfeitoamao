<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'

/* ===== Config ===== */
const MIN_DURATION = 2000;             // tempo mínimo visível (ms)
const WORDS = ['digital', 'feito', 'a', 'mão'];
const D_IN = 0.8, D_HOLD = 0.8, D_OUT = 0.45;
const BLUR_START = 3.5, BLUR_VISIBLE = 0.6, BLUR_GLIDE = 0.2, BLUR_OUT = 5;
/* ===== Suavização do progresso ===== */
const TICK_MS = 50;                    // intervalo do tick
const LERP_ALPHA = 0.18;               // 0.1→mais suave, 0.3→mais rápido
/* =================================== */

const visible = ref(true)
const percent = ref(0)                 // porcentagem exibida
const stage = ref(null)
const reduced = ref(false)
const SEEN = 'introSeen-v1'
let tick, wordsTl

/* preload helpers */
function preloadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(src)
    img.onerror = rej
    // dica: em dev, pode evitar cache: img.src = `${src}?v=${Date.now()}`
    img.src = src
  })
}
function waitVideo(selector = 'video') {
  return new Promise((res) => {
    const v = document.querySelector(selector); if (!v) return res()
    const done = () => { v.removeEventListener('loadeddata', done); v.removeEventListener('canplaythrough', done); res() }
    if (v.readyState >= 2) return res()
    v.addEventListener('loadeddata', done, { once: true })
    v.addEventListener('canplaythrough', done, { once: true })
  })
}

/* animação de uma palavra */
function addWord(tl, text) {
  const el = document.createElement('span')
  el.textContent = text
  el.style.color = '#fff'
  el.className = 'inline-block select-none tracking-tight will-change-[opacity,filter,transform]'
  tl.add(() => { if (stage.value) { stage.value.innerHTML = ''; stage.value.appendChild(el) } })
  tl.fromTo(el, { opacity: 0, filter: `blur(${BLUR_START}px)`, y: 8 },
                { opacity: 1, filter: `blur(${BLUR_VISIBLE}px)`, y: 0, duration: D_IN * 0.65, ease: 'power3.out' })
    .to(el, { filter: `blur(${BLUR_GLIDE}px)`, duration: D_IN * 0.2, ease: 'power1.out' })
    .to(el, { filter: 'blur(0px)',           duration: D_IN * 0.15, ease: 'sine.out' })
    .to({},  { duration: D_HOLD })
    .to(el,  { opacity: 0, filter: `blur(${BLUR_OUT}px)`, duration: D_OUT, ease: 'power3.in' })
}

function finish() {
  if (stage.value) stage.value.innerHTML = ''
  gsap.to('#intro-overlay', { duration: 0.35, opacity: 0, ease: 'power2.inOut', onComplete: () => (visible.value = false) })
  localStorage.setItem(SEEN, '1')
}

onMounted(async () => {
  await nextTick()
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (localStorage.getItem(SEEN) || reduced.value) { visible.value = false; return }

  /* 1) assets críticos (ajuste depois) */
  const tasks = [
    preloadImage('/media/hero/poster.avif'),
    document.fonts?.ready || Promise.resolve(),
    waitVideo('video'),
  ]
  let done = 0
  const total = tasks.length
  tasks.forEach(p => p.then(() => { done++ }))

  /* 2) timeline das palavras (tempo fixo, sem pauses) */
  wordsTl = gsap.timeline()
  WORDS.forEach(w => addWord(wordsTl, w))

  /* 3) progresso híbrido com SUAVIZAÇÃO (sem saltos) */
  const start = performance.now()
  let displayed = 0 // 0..1 mostrado na UI
  tick = setInterval(() => {
    const elapsed = performance.now() - start
    const timeProgress = Math.min(1, elapsed / MIN_DURATION)           // progresso por tempo mínimo
    const realProgress = total ? (done / total) : 1                    // progresso real
    const target = Math.max(timeProgress, realProgress)                // híbrido (alvo)

    // LERP: aproxima exibido do alvo aos poucos
    displayed = displayed + (target - displayed) * LERP_ALPHA
    percent.value = Math.min(99, Math.round(displayed * 100))
  }, TICK_MS)

  /* 4) Espera minTime + assets + palavras, então finaliza */
  const minTime = new Promise(r => setTimeout(r, MIN_DURATION))
  const assets  = Promise.allSettled(tasks)
  const wordsDone = new Promise(r => wordsTl.eventCallback('onComplete', r))

  await Promise.all([minTime, assets, wordsDone])

  clearInterval(tick)
  percent.value = 100
  finish()
})

onBeforeUnmount(() => { wordsTl?.kill(); clearInterval(tick) })
</script>

<template>
  <div v-if="visible" id="intro-overlay"
       class="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center font-sans"
       role="dialog" aria-label="Intro de abertura">
    <button @click="finish"
      class="absolute top-4 right-4 text-sm underline opacity-70 hover:opacity-100 transition-opacity">
      Saltar intro
    </button>

    <div class="relative w-full max-w-2xl flex flex-col items-center justify-center">
      <div ref="stage" class="text-6xl md:text-7xl font-medium leading-none mb-10"></div>
      <div class="flex items-center gap-3">
        <div class="w-64 h-1.5 bg-white/10 rounded overflow-hidden">
          <div class="h-full bg-white transition-[width] duration-150" :style="{ width: percent + '%' }"></div>
        </div>
        <span class="text-sm tabular-nums opacity-80 w-10 text-right">{{ percent }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#intro-overlay { contain: layout paint; }
</style>
