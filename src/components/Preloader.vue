<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'

/* ===== Config ===== */
const WORDS = ['digital', 'feito', 'a', 'mão']
// durações podem ser ajustadas; mantive o “feel” do que você tinha
const D_IN = 0.8, D_HOLD = 0.8, D_OUT = 0.45
const BLUR_START = 3.5, BLUR_VISIBLE = 0.6, BLUR_GLIDE = 0.2, BLUR_OUT = 5
const MIN_DURATION_MS = 2000 // garantia de “tempo mínimo” (não move o % sozinho)

/* ===== Estado ===== */
const visible = ref(true)
const percent = ref(1)           // começa em 1% para não piscar 0%
const stage = ref(null)
const reduced = ref(false)

let wordsTl
let minTimer
let assetsPromise

// milestones fixos
const MILESTONES = [20, 40, 60, 80]

// tween de percent controlado por GSAP (sem setInterval)
const pObj = { v: 1 }
function tweenPercent(to, dur = 0.25, ease = 'power1.out') {
  gsap.to(pObj, {
    v: to,
    duration: dur,
    ease,
    onUpdate: () => { percent.value = Math.round(pObj.v) }
  })
}

/* helpers de preload (você pode ajustar os assets conforme sua mídia real) */
function preloadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(src)
    img.onerror = rej
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

/* anima um “bloco-palavra” e seta o milestone correspondente */
function addWord(tl, text, idx) {
  const el = document.createElement('span')
  el.textContent = text
  el.style.color = '#fff'
  el.className = 'inline-block select-none tracking-tight will-change-[opacity,filter,transform]'

  tl.add(() => {
      if (stage.value) { stage.value.innerHTML = ''; stage.value.appendChild(el) }
      // ao entrar a palavra, animamos o % exatamente para o marco
      tweenPercent(MILESTONES[idx], 0.28)
    })
    .fromTo(
      el,
      { opacity: 0, filter: `blur(${BLUR_START}px)`, y: 8 },
      { opacity: 1, filter: `blur(${BLUR_VISIBLE}px)`, y: 0, duration: D_IN * 0.65, ease: 'power3.out' }
    )
    .to(el, { filter: `blur(${BLUR_GLIDE}px)`, duration: D_IN * 0.2, ease: 'power1.out' })
    .to(el, { filter: 'blur(0px)', duration: D_IN * 0.15, ease: 'sine.out' })
    .to({}, { duration: D_HOLD })
    .to(el, { opacity: 0, filter: `blur(${BLUR_OUT}px)`, duration: D_OUT, ease: 'power3.in' })
}

function finish() {
  // anima 100% e some o overlay
  gsap.to(pObj, {
    v: 100,
    duration: 0.25,
    ease: 'power2.out',
    onUpdate: () => (percent.value = Math.round(pObj.v)),
    onComplete: () => {
      gsap.to('#intro-overlay', {
        duration: 0.35,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => (visible.value = false)
      })
    }
  })
}

onMounted(async () => {
  await nextTick()
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced.value) { visible.value = false; return }

  // 1) timeline das palavras (dirige os marcos de %)
  wordsTl = gsap.timeline()
  WORDS.forEach((w, i) => addWord(wordsTl, w, i))

  // 2) assets mínimos + tempo mínimo (SEM dirigir o %)
  const tasks = [
    preloadImage('/media/hero/poster.avif'),
    document.fonts?.ready || Promise.resolve(),
    waitVideo('video'),
  ]
  assetsPromise = Promise.allSettled(tasks)
  const minTime = new Promise(r => (minTimer = setTimeout(r, MIN_DURATION_MS)))

  // 3) espera “palavras + assets + tempo mínimo”, aí finaliza
  await Promise.all([
    new Promise(r => wordsTl.eventCallback('onComplete', r)),
    assetsPromise,
    minTime
  ])

  finish()
})

onBeforeUnmount(() => {
  wordsTl?.kill()
  clearTimeout(minTimer)
})
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
        <span class="text-sm tabular-nums opacity-80 w-12 text-right">{{ percent }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#intro-overlay { contain: layout paint; }
</style>
