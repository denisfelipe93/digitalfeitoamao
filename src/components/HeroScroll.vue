<!-- Hero.vue -->
<template>
  <!-- mais runway para o scroll ficar bem lento -->
  <section ref="sectionEl" class="relative h-[220svh] bg-white">
    <div class="sticky top-0 h-[100svh] overflow-hidden text-white">
      <!-- MÍDIA -->
      <div class="absolute inset-0 -z-10">
        <picture v-if="!useVideo">
          <source v-if="imageSrcset?.webp" :srcset="imageSrcset.webp" type="image/webp" />
          <img
            class="h-full w-full object-cover"
            :src="imageSrc"
            :alt="imageAlt"
            :srcset="imageSrcset?.webp"
            :sizes="sizes || '(max-width:768px) 100vw, 90vw'"
            loading="eager"
            decoding="async"
          />
        </picture>
        <video
          v-else
          class="h-full w-full object-cover"
          autoplay muted loop playsinline :poster="poster || ''"
        >
          <source v-if="videoSources?.webm" :src="videoSources.webm" type="video/webm" />
          <source v-if="videoSources?.mp4"  :src="videoSources.mp4"  type="video/mp4" />
        </video>

        <!-- OVERLAYS -->
        <div class="absolute inset-0" :style="overlayStyle" />
        <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_60%,rgba(0,0,0,0.5))]" />
        <div class="absolute inset-0 pointer-events-none" :style="leftVignetteStyle" />
        <div class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
      </div>

      <!-- NAVBAR -->
      <nav
        class="absolute inset-x-0 top-0 z-20 transition-colors duration-300"
        :style="navStyle"
      >
        <!-- vidro ocupa 100% da largura -->
        <div
          class="absolute inset-0 transition-[backdrop-filter,background-color,box-shadow] duration-300"
          :class="{'backdrop-blur-xl backdrop-saturate-150 ring-1 ring-white/10': navSolid}"
        ></div>

        <!-- conteúdo centralizado -->
        <div
          class="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12
                flex items-center justify-between py-5 md:py-6"
        >
          <!-- Marca com blur->nítido -->
          <div
            class="font-sans font-semibold tracking-[0.18em] uppercase
                  text-white text-[1.05rem] md:text-[1.2rem]"
            :style="brandRevealStyle"
          >
            Digital Feito à Mão
          </div>

          <!-- Links com blur->nítido (stagger) -->
          <ul
            class="hidden md:flex items-center
                  gap-9 lg:gap-10
                  font-sans uppercase font-medium
                  text-[0.85rem] md:text-[0.9rem] tracking-[0.22em]"
          >
            <li v-for="(item, i) in navItems" :key="item.href">
              <a
                :href="item.href"
                class="inline-flex items-center rounded-md
                      text-white/85 hover:text-white
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                      transition duration-200
                      hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]"
                :style="linkRevealStyle(i)"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </nav>


      <!-- CONTEÚDO -->
      <div class="h-full w-full">
        <div class="max-w-7xl mx-auto h-full px-6 md:px-8 lg:px-12 flex items-center">
          <div class="w-full" :class="alignTextClass">
            <div class="will-change-transform" :style="titleStyle">
              <h1 class="font-semibold leading-[0.95] tracking-[-0.01em]" :style="{ fontSize: clampRem(2.6, 6.0) }">
                {{ titulo }}
              </h1>
            </div>

            <!-- subtítulo e CTA seguem o alinhamento -->
            <div class="mt-7 md:mt-9 max-w-2xl" :class="subBlockClass" :style="revealStyle">
              <p v-if="subtitulo" class="text-white/90 text-base md:text-lg">
                {{ subtitulo }}
              </p>
              <div v-if="ctaPrimaria" class="mt-6 flex flex-wrap gap-3" :class="ctaJustifyClass">
                <a :href="ctaPrimaria.href"
                   :style="ctaDelayStyle"
                   class="rounded-2xl px-5 py-3 text-sm md:text-base font-medium bg-white text-black hover:opacity-90 transition">
                  {{ ctaPrimaria.rotulo }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase opacity-80">
        Role
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

type Srcset = { webp?: string }
type FontesVideo = { webm?: string; mp4?: string }
type Cta = { rotulo: string; href: string }

const props = withDefaults(defineProps<{
  titulo: string
  subtitulo?: string
  alinhamento?: 'esquerda' | 'centro'
  imageSrc: string
  imageAlt?: string
  imageSrcset?: Srcset
  sizes?: string
  videoSources?: FontesVideo
  poster?: string
  ctaPrimaria?: Cta
  overlay?: number
}>(), {
  subtitulo: "Cuidamos do seu digital com o cuidado, planejamento e impacto. Lapidando sua marca na internet delicadamente, como se fosse à mão.",
  alinhamento: 'esquerda',
  imageAlt: '',
  imageSrcset: () => ({}),
  sizes: '(max-width:768px) 100vw, 90vw',
  videoSources: () => ({}),
  poster: '',
  ctaPrimaria: () => ({ rotulo: 'Fale conosco', href: '#contato' }),
  overlay: 98
})

const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  : false
const useVideo = computed(() => !!(props.videoSources?.webm || props.videoSources?.mp4) && !prefersReduced)

const sectionEl = ref<HTMLElement | null>(null)
const progress = ref(0)
const smoothProgress = ref(0)

// leitura do scroll
const readScroll = () => {
  if (!sectionEl.value) return
  const rect = sectionEl.value.getBoundingClientRect()
  const vh = window.innerHeight
  const total = Math.max(rect.height - vh, 1)
  const passed = Math.min(Math.max(-rect.top, 0), total)
  progress.value = passed / total
}

// loop de suavização — super cinematográfico
let raf = 0
const tick = () => {
  const damping = 0.05
  const maxStep = 0.012
  const delta = progress.value - smoothProgress.value
  const step = Math.sign(delta) * Math.min(Math.abs(delta) * damping, maxStep)
  smoothProgress.value += step
  raf = requestAnimationFrame(tick)
}

const onScroll = () => readScroll()

onMounted(() => {
  readScroll()
  tick()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(raf)
})

// helpers
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
const easeInOutCubic = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2
const remapClamped = (from: number, to: number, v: number) => clamp01((v - from) / (to - from))

// UI tuning
const TARGET_GUTTER_VW = 5
const START_TX_VW     = 30
const START_DELAY     = 0.14
const END_PHASE       = 0.90

// título
const titleStyle = computed(() => {
  const phase = remapClamped(START_DELAY, END_PHASE, smoothProgress.value)
  const p = easeInOutSine(phase)
  const tx = lerp(START_TX_VW, -TARGET_GUTTER_VW, p)
  const sc = lerp(1.002, 0.978, p)
  return {
    transform: `translate3d(${tx}vw,0,0) scale(${sc})`,
    transition: prefersReduced ? 'none' : 'transform 0.30s ease-out'
  }
})

// subtítulo/CTA
const revealStyle = computed(() => {
  const phase = remapClamped(START_DELAY + 0.16, 0.80, smoothProgress.value)
  const t = easeInOutCubic(phase)
  const ty = lerp(18, 0, t)
  const op = lerp(0, 1, t)
  return {
    transform: `translate3d(0, ${ty}px, 0)`,
    opacity: `${op}`,
    transition: prefersReduced ? 'none' : 'transform 0.28s ease-out, opacity 0.28s linear'
  }
})
const ctaDelayStyle = computed(() => ({
  transitionDelay: `${Math.round(140 * clamp01((smoothProgress.value - (START_DELAY + 0.16)) / 0.50))}ms`
}))

// navbar (timing + vidro sólido)
const navSolid = computed(() => smoothProgress.value >= 0.30)
const navStyle = computed(() => ({
  opacity: clamp01((smoothProgress.value - 0.12) / 0.22).toFixed(3),
  backgroundColor: navSolid.value ? 'rgba(0,0,0,0.46)' : 'transparent',
  boxShadow: navSolid.value ? '0 6px 28px rgba(0,0,0,0.32)' : 'none'
}))

// overlay base
const overlayStyle = computed(() => {
  const start = Math.min(100, Math.max(0, props.overlay)) / 100
  const end = 0.32
  const phase = remapClamped(0, 1, smoothProgress.value)
  const alpha = lerp(start, end, easeInOutSine(phase))
  return { backgroundColor: `rgba(0,0,0,${alpha})` }
})

/** vinheta inversa dinâmica */
const leftVignetteStyle = computed(() => {
  const t = remapClamped(0, 0.65, smoothProgress.value)
  const a = lerp(0.58, 0.0, easeInOutSine(t))
  const bg = `radial-gradient(60vw 85vh at 10% 50%, rgba(0,0,0,${a}) 0%, rgba(0,0,0,0) 60%)`
  return { background: bg }
})

// util
const clampRem = (minRem: number, maxRem: number) => `clamp(${minRem}rem, 6vw, ${maxRem}rem)`

// ===== NAV ITEMS + REVEAL BLUR->NÍTIDO (STAGGER) =====
const navItems = [
  { label: 'Serviços',      href: '#servicos' },
  { label: 'Como funciona', href: '#jornada' },
  { label: 'O que dizem',   href: '#depoimentos' },
  { label: 'Contato',       href: '#contato' }
]

// janela de transição dos links
const LINKS_START = 0.18
const LINKS_END   = 0.42
const LINKS_STAGGER = 0.045

const linkRevealStyle = (i: number) => {
  if (prefersReduced) return { opacity: '1' }
  const s = LINKS_START + i * LINKS_STAGGER
  const e = LINKS_END   + i * LINKS_STAGGER
  const t0 = remapClamped(s, e, smoothProgress.value)
  const t  = easeInOutCubic(t0)
  const blurPx = lerp(8, 0, t)
  const op     = lerp(0, 1, t)
  const ty     = lerp(6, 0, t)
  return {
    filter: `blur(${blurPx.toFixed(2)}px)`,
    opacity: op.toFixed(3),
    transform: `translate3d(0, ${ty.toFixed(2)}px, 0)`,
    transition: 'filter 260ms ease, opacity 240ms linear, transform 260ms ease',
    willChange: 'filter, opacity, transform'
  }
}

// Marca (logo) também sai do blur
const BRAND_START = 0.16
const BRAND_END   = 0.32
const brandRevealStyle = computed(() => {
  if (prefersReduced) return {}
  const t0 = remapClamped(BRAND_START, BRAND_END, smoothProgress.value)
  const t  = easeInOutCubic(t0)
  const blurPx = lerp(10, 0, t)
  const op     = lerp(0, 1, t)
  const ty     = lerp(8, 0, t)
  return {
    filter: `blur(${blurPx.toFixed(2)}px)`,
    opacity: op.toFixed(3),
    transform: `translate3d(0, ${ty.toFixed(2)}px, 0)`,
    transition: 'filter 300ms ease, opacity 240ms linear, transform 300ms ease',
    willChange: 'filter, opacity, transform'
  }
})

/* ===== ALINHAMENTO CORRIGIDO ===== */
const alignTextClass = computed(() =>
  props.alinhamento === 'centro' ? 'text-center' : 'text-left'
)
const subBlockClass = computed(() =>
  props.alinhamento === 'centro' ? 'mx-auto' : ''
)
const ctaJustifyClass = computed(() =>
  props.alinhamento === 'centro' ? 'justify-center' : 'justify-start'
)
</script>
