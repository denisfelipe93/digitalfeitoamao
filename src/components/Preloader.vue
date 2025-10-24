<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'

/* ===== Config ===== */
const WORDS = ['digital', 'feito', 'a', 'mão']
const D_IN = 0.8, D_HOLD = 0.8, D_OUT = 0.45
const BLUR_START = 3.5, BLUR_VISIBLE = 0.6, BLUR_GLIDE = 0.2, BLUR_OUT = 5
const MIN_DURATION_MS = 2000

/* ===== Estado ===== */
const visible = ref(true)
const percent = ref(1)
const stage = ref(null)
const reduced = ref(false)

let tl, minTimer, assetsPromise
const p = { v: 1 } // objeto animável para o % (0..100)

/* assets mínimos (ajuste se quiser) */
const preloadImage = src => new Promise((res, rej) => {
  const i = new Image(); i.onload = () => res(src); i.onerror = rej; i.src = src
})
const waitVideo = (selector='video') => new Promise(res => {
  const v = document.querySelector(selector); if (!v) return res()
  const done = () => { v.removeEventListener('loadeddata', done); v.removeEventListener('canplaythrough', done); res() }
  if (v.readyState >= 2) return res()
  v.addEventListener('loadeddata', done, { once:true })
  v.addEventListener('canplaythrough', done, { once:true })
})

function wordBlock(text) {
  const el = document.createElement('span')
  el.textContent = text
  el.style.color = '#fff'
  el.className = 'inline-block select-none tracking-tight will-change-[opacity,filter,transform]'
  return el
}

function finish() {
  // 80 -> 100 contínuo
  gsap.to(p, {
    v: 100, duration: 0.45, ease: 'power2.out',
    onUpdate: () => (percent.value = Math.round(p.v)),
    onComplete: () => {
      gsap.to('#intro-overlay', {
        opacity: 0, duration: 0.35, ease: 'power2.inOut',
        onComplete: () => (visible.value = false),
      })
    }
  })
}

onMounted(async () => {
  await nextTick()
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced.value) { visible.value = false; return }

  // timeline MESTRA: controla palavras E % contínuo
  tl = gsap.timeline({ defaults: { ease: 'none' } })

  // duração de cada “bloco” de palavra (entrada + hold + saída)
  const segDur = (D_IN * 0.65) + (D_IN * 0.2) + (D_IN * 0.15) + D_HOLD + D_OUT
  const totalWordsDur = segDur * WORDS.length

  // 0 -> 80% sobe de forma CONTÍNUA ao longo de TODAS as palavras
  tl.to(p, {
    v: 80,
    duration: totalWordsDur,
    ease: 'power1.inOut',
    onUpdate: () => (percent.value = Math.round(p.v)),
  }, 0)

  // Blocos de palavras sincronizados com a mesma timeline
  WORDS.forEach((w, idx) => {
    const startAt = idx * segDur
    const el = wordBlock(w)

    tl.add(() => { if (stage.value) { stage.value.innerHTML = ''; stage.value.appendChild(el) } }, startAt)

    tl.fromTo(el,
      { opacity: 0, filter: `blur(${BLUR_START}px)`, y: 8 },
      { opacity: 1, filter: `blur(${BLUR_VISIBLE}px)`, y: 0, duration: D_IN * 0.65, ease: 'power3.out' },
      startAt
    )
    .to(el, { filter: `blur(${BLUR_GLIDE}px)`, duration: D_IN * 0.2, ease: 'power1.out' }, startAt + (D_IN * 0.65))
    .to(el, { filter: 'blur(0px)', duration: D_IN * 0.15, ease: 'sine.out' }, startAt + (D_IN * 0.85))
    .to({}, { duration: D_HOLD }, startAt + D_IN)
    .to(el, { opacity: 0, filter: `blur(${BLUR_OUT}px)`, duration: D_OUT, ease: 'power3.in' }, startAt + D_IN + D_HOLD)
  })

  // assets + minTime em paralelo à timeline
  const tasks = [
    preloadImage('/media/hero/poster.avif'),
    document.fonts?.ready || Promise.resolve(),
    waitVideo('video'),
  ]
  assetsPromise = Promise.allSettled(tasks)
  const minTime = new Promise(r => (minTimer = setTimeout(r, MIN_DURATION_MS)))

  // espera palavras + assets + tempo mínimo
  await Promise.all([
    new Promise(r => tl.eventCallback('onComplete', r)),
    assetsPromise,
    minTime
  ])

  finish()
})

onBeforeUnmount(() => {
  tl?.kill()
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
