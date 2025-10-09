<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const visible = ref(true)
const percent = ref(0)
const stage = ref(null)
const reduced = ref(false) // só definimos no onMounted (lado do cliente)
const SEEN = 'introSeen-v1' // aparece só na 1ª visita
let tl

function showWord(text) {
  const el = document.createElement('span')
  el.textContent = text
  el.style.filter = 'blur(8px)'
  el.style.opacity = '0'
  el.className = 'inline-block'
  stage.value.innerHTML = ''
  stage.value.appendChild(el)

  gsap.to(el, { duration: 0.6, opacity: 1, filter: 'blur(0)', ease: 'power2.out' })
  gsap.to(el, { duration: 0.4, opacity: 0, filter: 'blur(6px)', ease: 'power2.in', delay: 0.9 })
}

function finish() {
  gsap.to('#intro-overlay', { duration: 0.35, opacity: 0, onComplete: () => (visible.value = false) })
  localStorage.setItem(SEEN, '1')
}

function skip() {
  tl?.kill()
  percent.value = 100
  finish()
}

onMounted(() => {
  // Agora estamos no browser: pode usar window/localStorage
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (localStorage.getItem(SEEN) || reduced.value) {
    visible.value = false
    return
  }

  const words = ['digital', 'feito', 'a', 'mão']

  tl = gsap.timeline({
    onUpdate: () => (percent.value = Math.round(tl.progress() * 100)),
    onComplete: finish
  })

  const step = 0.48 // ~2.4s no total
  tl.to({}, { duration: step }).add(() => showWord(words[0]))
    .to({}, { duration: step }).add(() => showWord(words[1]))
    .to({}, { duration: step }).add(() => showWord(words[2]))
    .to({}, { duration: step }).add(() => showWord(words[3]))
    .to({}, { duration: step })

  window.addEventListener('keydown', e => (e.key === 'Escape') && skip(), { once: true })
})

onBeforeUnmount(() => tl?.kill())
</script>

<template>
  <div
    v-if="visible"
    id="intro-overlay"
    class="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center"
    role="dialog"
    aria-label="Intro de abertura"
  >
    <button
      @click="skip"
      class="absolute top-4 right-4 underline opacity-70 hover:opacity-100"
      aria-label="Saltar intro"
    >
      Saltar intro
    </button>

    <div class="relative w-full max-w-2xl h-48 flex items-center justify-center">
      <div ref="stage" class="text-5xl font-semibold tracking-wide will-change-transform"></div>

      <!-- Barra de progresso -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 overflow-hidden rounded">
        <div class="h-full bg-white" :style="{ width: percent + '%' }"></div>
      </div>
      <div class="absolute bottom-3 right-4 text-sm tabular-nums opacity-70">{{ percent }}%</div>
    </div>
  </div>
</template>

<style scoped>
#intro-overlay { contain: layout paint; }
</style>
