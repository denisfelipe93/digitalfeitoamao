<template>
  <section ref="sectionEl" class="relative h-[220vh] bg-white">
    <!-- NAVBAR FIXA -->
    <nav
      class="fixed inset-x-0 top-0 z-40 transition-colors duration-300"
      :style="navStyle"
      @keydown.esc="closeMobile"
    >
      <div
        class="absolute inset-0 transition-[backdrop-filter,background-color,box-shadow] duration-300"
        :class="{'backdrop-blur-xl backdrop-saturate-150 ring-1 ring-white/10': navSolid}"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12
               flex items-center justify-between py-4 md:py-5"
      >
        <a href="#top"
           class="font-sans font-semibold tracking-[0.18em] uppercase text-white text-[1.05rem] md:text-[1.2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
           :style="brandStyle">
          Digital Feito à Mão
        </a>

        <!-- Desktop -->
        <ul class="hidden md:flex items-center gap-8 lg:gap-10 font-sans uppercase font-medium text-[0.85rem] md:text-[0.9rem] tracking-[0.22em]">
          <li v-for="(item, i) in navItems" :key="item.href">
            <a :href="item.href"
               class="inline-flex items-center rounded-md text-white/85 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition duration-200 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]"
               :style="linkStyle(i)">
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- Mobile trigger -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          @click="toggleMobile"
          :aria-expanded="mobileOpen ? 'true' : 'false'"
          aria-controls="mobile-menu"
        >
          <span class="sr-only">Abrir menu</span>
          <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-width="1.6" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-width="1.6" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Mobile drawer -->
      <div v-show="mobileOpen" id="mobile-menu" class="md:hidden relative">
        <div class="absolute inset-0 bg-black/30" @click="closeMobile" aria-hidden="true"></div>
        <div class="relative bg-black/85 backdrop-blur-xl ring-1 ring-white/10">
          <ul class="px-6 py-4 space-y-3 text-sm uppercase tracking-[0.22em]">
            <li v-for="item in navItems" :key="item.href">
              <a :href="item.href"
                 class="block py-3 text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                 @click="closeMobile">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <div class="sticky top-0 h-[100vh] overflow-hidden text-white">
      <!-- mídia -->
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
        <video v-else class="h-full w-full object-cover" autoplay muted loop playsinline :poster="poster || ''">
          <source v-if="videoSources?.webm" :src="videoSources.webm" type="video/webm" />
          <source v-if="videoSources?.mp4"  :src="videoSources.mp4"  type="video/mp4" />
        </video>

        <!-- overlays -->
        <div class="absolute inset-0" :style="overlayStyle" />
        <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_60%,rgba(0,0,0,0.25))]" />
        <div class="absolute inset-0 pointer-events-none" :style="leftVignetteStyle" />
        <div class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
      </div>

      <!-- conteúdo -->
      <div class="h-full w-full pt-[64px] md:pt-[72px]">
        <div class="max-w-7xl mx-auto h-full px-6 md:px-8 lg:px-12 flex items-center">
          <div class="w-full" :class="alignTextClass">
            <div class="will-change-transform" :style="titleStyle">
              <h1 class="font-semibold leading-[0.95] tracking-[-0.01em]" :style="{ fontSize: clampRem(2.6, 6.0) }">{{ titulo }}</h1>
            </div>

            <div class="mt-7 md:mt-9 max-w-2xl" :class="subBlockClass" :style="revealStyle">
              <p v-if="subtitulo" class="text-white/90 text-base md:text-lg">{{ subtitulo }}</p>
              <div v-if="ctaPrimaria" class="mt-6 flex flex-wrap gap-3" :class="ctaJustifyClass">
                <a :href="ctaPrimaria.href" :style="ctaDelayStyle"
                   class="rounded-2xl px-5 py-3 text-sm md:text-base font-medium bg-white text-black hover:opacity-90 transition">
                  {{ ctaPrimaria.rotulo }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase opacity-80">Role</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'

type Srcset = { webp?: string }
type FontesVideo = { webm?: string; mp4?: string }
type Cta = { rotulo: string; href: string }
type NavItem = { label: string; href: string }

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
  lockOnce?: boolean
}>(), {
  subtitulo: "Cuidamos do seu digital com o cuidado, planejamento e impacto. Lapidando sua marca na internet delicadamente, como se fosse à mão.",
  alinhamento: 'esquerda',
  imageAlt: '',
  imageSrcset: () => ({}),
  sizes: '(max-width:768px) 100vw, 90vw',
  videoSources: () => ({}),
  poster: '',
  ctaPrimaria: () => ({ rotulo: 'Fale conosco', href: '#contato' }),
  overlay: 82,
  lockOnce: true
})

/* ===== preferências e mídia ===== */
const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  : false
const useVideo = computed(() => !!(props.videoSources?.webm || props.videoSources?.mp4) && !prefersReduced)

/* ===== refs ===== */
const sectionEl = ref<HTMLElement | null>(null)
const progress = ref(0)
const smoothProgress = ref(0)
const locked = ref(false)
const HERO_KEY = 'heroPlayed-v1'
const winY = ref(0)

/* ===== navegação ===== */
const navItems = ref<NavItem[]>([
  { label: 'Serviços',      href: '#services' },
  { label: 'Como funciona', href: '#jornada' },
  { label: 'O que dizem',   href: '#depoimentos' },
  { label: 'Contato',       href: '#contato' }
])

/* ===== leitura do scroll (sem auto-scroll) ===== */
let raf = 0

const readScroll = () => {
  if (!sectionEl.value) return

  const rect = sectionEl.value.getBoundingClientRect()
  const vh   = typeof window !== 'undefined' ? window.innerHeight : 0
  const total = Math.max(rect.height - vh, 1)

  const passed = Math.min(Math.max(-rect.top, 0), total)
  progress.value = passed / total

  if (typeof window !== 'undefined') {
    winY.value = window.scrollY || 0
  }
}

const tick = () => {
  const damping = 0.05
  const maxStep = 0.012
  const delta = progress.value - smoothProgress.value
  const step = Math.sign(delta) * Math.min(Math.abs(delta) * damping, maxStep)
  smoothProgress.value += step
  raf = requestAnimationFrame(tick)
}

const onScroll = () => readScroll()
const onResize = () => readScroll()

onMounted(() => {
  if (typeof window !== 'undefined' && sessionStorage.getItem(HERO_KEY) && props.lockOnce) {
    locked.value = true
    progress.value = 1
    smoothProgress.value = 1
    winY.value = window.scrollY || 0
  } else {
    readScroll()
    smoothProgress.value = progress.value
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
  }
})
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
  }
  cancelAnimationFrame(raf)
})

/* ===== utils ===== */
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
const easeInOutCubic = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2
const remapClamped = (from: number, to: number, v: number) => clamp01((v - from) / (to - from))

const TARGET_GUTTER_VW = 5
const START_TX_VW     = 30
const START_DELAY     = 0.14
const END_PHASE       = 0.90

watch(smoothProgress, (p) => {
  if (!props.lockOnce || locked.value) return
  if (p >= END_PHASE) {
    locked.value = true
    if (typeof window !== 'undefined') sessionStorage.setItem(HERO_KEY, '1')
  }
})

const pEff = computed(() => locked.value ? 1 : smoothProgress.value)

/* ===== efeitos ===== */
const titleStyle = computed(() => {
  const phase = remapClamped(START_DELAY, END_PHASE, pEff.value)
  const p = easeInOutSine(phase)
  const tx = lerp(START_TX_VW, -TARGET_GUTTER_VW, p)
  const sc = lerp(1.002, 0.978, p)
  return { transform: `translate3d(${tx}vw,0,0) scale(${sc})`, transition: 'transform 0.30s ease-out' }
})

const revealStyle = computed(() => {
  const phase = remapClamped(START_DELAY + 0.16, 0.80, pEff.value)
  const t = easeInOutCubic(phase)
  const ty = lerp(18, 0, t)
  const op = lerp(0, 1, t)
  return { transform: `translate3d(0, ${ty}px, 0)`, opacity: `${op}`, transition: 'transform 0.28s ease-out, opacity 0.28s linear' }
})
const ctaDelayStyle = computed(() => ({ transitionDelay: `${Math.round(140 * clamp01((pEff.value - (START_DELAY + 0.16)) / 0.50))}ms` }))

/* ===== navbar ===== */
const navSolid = computed(() => (pEff.value >= 0.30) || (winY.value > 8))
const navStyle  = computed(() => ({
  opacity: clamp01((pEff.value - 0.12) / 0.22).toFixed(3),
  backgroundColor: navSolid.value ? 'rgba(0,0,0,0.46)' : 'transparent',
  boxShadow: navSolid.value ? '0 6px 28px rgba(0,0,0,0.32)' : 'none'
}))

/* ===== overlays ===== */
const overlayStyle = computed(() => {
  const start = Math.min(100, Math.max(0, props.overlay)) / 100
  const end = 0.16
  const phase = remapClamped(0, 1, pEff.value)
  const alpha = lerp(start, end, easeInOutSine(phase))
  return { backgroundColor: `rgba(0,0,0,${alpha})` }
})
const leftVignetteStyle = computed(() => {
  const t = remapClamped(0, 0.65, pEff.value)
  const a = lerp(0.38, 0.0, easeInOutSine(t))
  const bg = `radial-gradient(60vw 85vh at 10% 50%, rgba(0,0,0,${a}) 0%, rgba(0,0,0,0) 60%)`
  return { background: bg }
})

/* ===== helpers visuais ===== */
const clampRem = (minRem: number, maxRem: number) => `clamp(${minRem}rem, 6vw, ${maxRem}rem)`
const alignTextClass = computed(() => props.alinhamento === 'centro' ? 'text-center' : 'text-left')
const subBlockClass  = computed(() => props.alinhamento === 'centro' ? 'mx-auto' : '')
const ctaJustifyClass= computed(() => props.alinhamento === 'centro' ? 'justify-center' : 'justify-start')

/* ===== navbar animações ===== */
const LINKS_START = 0.18, LINKS_END = 0.42, LINKS_STAGGER = 0.045
const instantReveal = computed(() => prefersReduced)

const brandStyle = computed(() => {
  if (instantReveal.value) return { filter: 'none', opacity: 1, transform: 'none' }
  const t0 = remapClamped(0.16, 0.32, pEff.value)
  const t  = easeInOutCubic(t0)
  const blurPx = lerp(10, 0, t)
  const op     = lerp(0, 1, t)
  const ty     = lerp(8, 0, t)
  return { filter: `blur(${blurPx.toFixed(2)}px)`, opacity: op.toFixed(3), transform: `translate3d(0, ${ty.toFixed(2)}px, 0)`, transition: 'filter 300ms ease, opacity 240ms linear, transform 300ms ease', willChange: 'filter, opacity, transform' }
})
const linkStyle = (i: number) => {
  if (instantReveal.value) return { filter: 'none', opacity: 1, transform: 'none' }
  const s = LINKS_START + i * LINKS_STAGGER
  const e = LINKS_END   + i * LINKS_STAGGER
  const t0 = remapClamped(s, e, pEff.value)
  const t  = easeInOutCubic(t0)
  const blurPx = lerp(8, 0, t)
  const op     = lerp(0, 1, t)
  const ty     = lerp(6, 0, t)
  return { filter: `blur(${blurPx.toFixed(2)}px)`, opacity: op.toFixed(3), transform: `translate3d(0, ${ty.toFixed(2)}px, 0)`, transition: 'filter 260ms ease, opacity 240ms linear, transform 260ms ease', willChange: 'filter, opacity, transform' }
}

/* ===== navegação mobile ===== */
const mobileOpen = ref(false)
function toggleMobile(){ mobileOpen.value = !mobileOpen.value }
function closeMobile(){ mobileOpen.value = false }
</script>
