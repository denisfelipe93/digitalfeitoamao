<template>
  <section ref="sectionEl" class="relative h-[220vh] bg-white">
    <!-- NAV (vidro escuro) -->
    <nav
      ref="navEl"
      class="fixed inset-x-0 top-0 z-40 transition-all duration-500"
      :style="navStyle"
      @keydown.esc="closeMobile"
    >
      <div
        class="absolute inset-0 backdrop-blur-md bg-black/20 border-b border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
        :class="{ 'bg-black/40 backdrop-blur-xl': navSolid }"
      />
      <div
        class="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12
               flex items-center justify-between py-4 md:py-5"
      >
        <a href="#top"
           class="font-sans font-semibold tracking-[0.18em] uppercase text-white
                  text-[1.05rem] md:text-[1.2rem] transition-all duration-300 hover:text-white/90
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
           :style="brandStyle">
          Digital Feito à Mão
        </a>

        <!-- Desktop menu -->
        <ul class="hidden md:flex items-center gap-9 lg:gap-10 font-sans uppercase font-medium text-[0.9rem] tracking-[0.22em]">
          <li v-for="(item, i) in navItems" :key="item.href">
            <a :href="item.href"
               class="inline-flex items-center px-1 text-white/80
                      hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                      transition-all duration-200"
               :style="linkStyle(i)">
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- Botão mobile -->
        <button
          type="button"
          class="md:hidden relative inline-flex items-center justify-center w-10 h-10 rounded-lg
                 border border-white/20 bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-300
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          @click="toggleMobile"
          :aria-expanded="mobileOpen ? 'true' : 'false'"
          aria-controls="mobile-menu"
        >
          <span class="sr-only">Abrir menu</span>
          <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Menu Mobile -->
      <transition name="slide-fade">
        <div
          v-if="mobileOpen"
          id="mobile-menu"
          class="fixed inset-y-0 right-0 w-[84vw] max-w-sm bg-[rgba(8,8,8,0.72)] backdrop-blur-2xl
                 border-l border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)]
                 flex flex-col z-50 rounded-l-2xl overflow-hidden"
        >
          <div class="px-8 pt-8 pb-4 flex items-center justify-between">
            <span class="text-white/70 uppercase tracking-[0.28em] text-xs">Menu</span>
            <button @click="closeMobile"
                    class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 px-8 pb-8 flex flex-col items-center justify-center">
            <ul class="w-full max-w-xs text-center space-y-2 text-base uppercase tracking-[0.22em] font-medium text-white/90">
              <li v-for="item in navItems" :key="item.href">
                <a
                  :href="item.href"
                  class="block py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:text-white"
                  @click="closeMobile"
                >
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>

          <div class="px-8 py-6 border-t border-white/10 bg-white/5">
            <p class="text-center text-[11px] text-white/60">
              © {{ new Date().getFullYear() }} Digital Feito à Mão
            </p>
          </div>
        </div>
      </transition>
    </nav>

    <!-- HERO sticky -->
    <div class="sticky top-0 h-[100vh] overflow-hidden text-white">
      <!-- mídia -->
      <div class="absolute inset-0 -z-10">
        <video
          v-if="useVideo"
          ref="videoEl"
          class="h-full w-full object-cover"
          autoplay
          muted
          playsinline
          loop
          preload="metadata"
          :poster="poster || ''"
          disablepictureinpicture
          controlslist="nodownload noplaybackrate noremoteplayback"
          aria-hidden="true"
        >
          <source v-if="videoSources?.webm" :src="videoSources.webm" type="video/webm" />
          <source v-if="videoSources?.mp4"  :src="videoSources.mp4"  type="video/mp4"  />
        </video>

        <picture v-else>
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

        <!-- overlays -->
        <div class="absolute inset-0" :style="overlayStyle" />
        <div class="absolute inset-0 pointer-events-none" :style="cinematicVignetteStyle" />
        <div class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
      </div>

      <!-- conteúdo -->
      <div class="relative h-full w-full pt-[64px] md:pt-[72px]">
        <div class="absolute inset-0 opacity-[0.16] mix-blend-overlay" :style="grainStyle"></div>

        <div class="max-w-7xl mx-auto h-full px-6 md:px-8 lg:px-12 flex items-center">
          <div class="w-full" :class="alignTextClass">

            <!-- bloco do título com offset e halo -->
            <div class="relative inline-block max-w-[min(92vw,40ch)]" :style="titleBlockStyle">
              <div
                class="absolute -inset-y-6 -left-6 right-0 rounded-[32px] pointer-events-none"
                :style="titleHaloStyle"
                aria-hidden="true"
              />
              <!-- TÍTULO -->
              <h1
                class="font-semibold lowercase tracking-[0.01em] flex flex-wrap"
                :style="[titleShadowStyle, titleGapStyle, { lineHeight: titleLineHeight }]"
              >
                <template v-for="(w, i) in words" :key="i">
                  <span
                    class="inline-block will-change-transform"
                    :style="[revealWordStyle(i), wordSpacerStyle]"
                  >
                    <span :style="{ fontSize: titleFontSize }">{{ w }}</span>
                  </span>
                </template>
              </h1>
            </div>

            <!-- subtítulo + CTA -->
            <div class="mt-7 md:mt-9 max-w-2xl" :class="subBlockClass" :style="revealStyle">
              <p v-if="subtitulo" class="text-white/90 text-base md:text-lg" :style="subtitleShadowStyle">
                {{ subtitulo }}
              </p>
              <div v-if="ctaPrimaria" class="mt-6 flex flex-wrap gap-3" :class="ctaJustifyClass">
                <a :href="ctaPrimaria.href" :style="ctaDelayStyle"
                   class="rounded-2xl px-5 py-3 text-sm md:text-base font-medium bg-white text-black hover:opacity-90 transition">
                  {{ ctaPrimaria.rotulo }}
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- HINT de scroll (PT-BR, em posição mais alta no mobile) -->
        <div
          :class="[
            'absolute left-1/2 -translate-x-1/2 text-[11px] md:text-xs tracking-wide md:tracking-widest lowercase',
            'transition-opacity duration-500 text-white/80 select-none pointer-events-none',
            'md:bottom-6',
            locked ? 'opacity-0 pointer-events-none' : 'opacity-90'
          ]"
          :style="scrollHintStyle"
        >
          role a página
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import type { CSSProperties } from 'vue'

/* Tipos */
type Srcset = { webp?: string }
type FontesVideo = { webm?: string; mp4?: string }
type Cta = { rotulo: string; href: string }
type NavItem = { label: string; href: string }

/* Props */
const props = withDefaults(defineProps<{
  titulo: string
  subtitulo?: string
  alinhamento?: 'esquerda' | 'centro'
  imageSrc?: string
  imageAlt?: string
  imageSrcset?: Srcset
  sizes?: string
  videoSources?: FontesVideo
  poster?: string
  ctaPrimaria?: Cta
  overlay?: number
  forceVideo?: boolean
  titleOffsetVW?: number
}>(), {
  subtitulo: "Cuidamos do seu digital com o cuidado, planejamento e impacto. Lapidando sua marca na internet delicadamente, como se fosse à mão.",
  alinhamento: 'esquerda',
  imageSrc: '',
  imageAlt: '',
  imageSrcset: () => ({}),
  sizes: '(max-width:768px) 100vw, 90vw',
  videoSources: () => ({}),
  poster: '',
  ctaPrimaria: () => ({ rotulo: 'Fale conosco', href: '#contato' }),
  overlay: 82,
  forceVideo: false,
  titleOffsetVW: -6
})

/* Preferência de movimento / vídeo */
const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  : false
const useVideo = computed(() =>
  !!(props.videoSources?.webm || props.videoSources?.mp4) && (!prefersReduced || props.forceVideo)
)

/* Refs / estado */
const sectionEl = ref<HTMLElement | null>(null)
const navEl = ref<HTMLElement | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)

const progress = ref(0)
const smoothProgress = ref(0)
const winY = ref(0)
const locked = ref(false)

/* Menu */
const navItems = ref<NavItem[]>([
  { label: 'Serviços',      href: '#services' },
  { label: 'Como funciona', href: '#jornada' },
  { label: 'O que dizem',   href: '#depoimentos' },
  { label: 'Contato',       href: '#contato' }
])
const mobileOpen = ref(false)
function toggleMobile(){ mobileOpen.value = !mobileOpen.value }
function closeMobile(){ mobileOpen.value = false }

/* Utils */
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
const easeInOutCubic = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2
const remapClamped = (from: number, to: number, v: number) => clamp01((v - from) / (to - from))

/* Responsivo / scroll */
let raf = 0
let io: IntersectionObserver | null = null
const isMobile  = ref(false)
const startTxVW = ref(30)

function computeResponsive() {
  if (typeof window !== 'undefined') {
    const w = window.innerWidth
    if (w < 380)      { startTxVW.value = 12; isMobile.value = true }
    else if (w < 640) { startTxVW.value = 16; isMobile.value = true }
    else if (w < 1024){ startTxVW.value = 24; isMobile.value = false }
    else              { startTxVW.value = 30; isMobile.value = false }
  }
}
function updateNavOffset() {
  const h = (navEl.value?.offsetHeight ?? 72) + 16
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--nav-offset', `${h}px`)
  }
}
const readScroll = () => {
  if (!sectionEl.value || locked.value) return
  const rect = sectionEl.value.getBoundingClientRect()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 0
  const total = Math.max(rect.height - vh, 1)
  const passed = Math.min(Math.max(-rect.top, 0), total)
  progress.value = passed / total
  if (typeof window !== 'undefined') winY.value = window.scrollY || 0
}
const tick = () => {
  const damping = 0.05
  const maxStep = 0.012
  const delta = progress.value - smoothProgress.value
  const step = Math.sign(delta) * Math.min(Math.abs(delta) * damping, maxStep)
  smoothProgress.value += step
  if (!locked.value) raf = requestAnimationFrame(tick)
}

/* Repouso */
const END_PHASE = 0.90
watch(() => smoothProgress.value, (p) => {
  if (!locked.value && p >= END_PHASE) {
    locked.value = true
    smoothProgress.value = 1
    progress.value = 1
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', onResize)
    }
    cancelAnimationFrame(raf)
  }
})
const onResize = () => {
  readScroll()
  computeResponsive()
  updateNavOffset()
}

/* Vídeo – autoplay robusto + economia */
function ensureAutoplay(){
  const v = videoEl.value
  if (!v) return
  v.muted = true
  ;(v as any).playsInline = true
  const tryPlay = () => v.play().catch(() => {})
  if (v.readyState >= 2) tryPlay()
  else v.addEventListener('loadeddata', tryPlay, { once: true })
}
function mountIO(){
  const v = videoEl.value
  if (!v || typeof IntersectionObserver === 'undefined') return
  io = new IntersectionObserver(entries => {
    for (const e of entries) e.isIntersecting ? v.play().catch(() => {}) : v.pause()
  }, { threshold: 0.15 })
  io.observe(v)
}

onMounted(() => {
  computeResponsive()
  updateNavOffset()
  readScroll()
  smoothProgress.value = progress.value
  tick()
  window.addEventListener('scroll', readScroll, { passive: true })
  window.addEventListener('resize', onResize)

  if (videoEl.value && useVideo.value) {
    ensureAutoplay()
    mountIO()
  }

  document.addEventListener('visibilitychange', () => {
    if (videoEl.value) {
      if (document.hidden) videoEl.value.pause()
      else if (useVideo.value) videoEl.value.play().catch(() => {})
    }
    if (document.hidden) cancelAnimationFrame(raf)
    else if (!locked.value) tick()
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', readScroll)
  window.removeEventListener('resize', onResize)
  if (io) { io.disconnect(); io = null }
  cancelAnimationFrame(raf)
})

/* Progresso efetivo */
const pEff = computed(() => locked.value ? 1 : smoothProgress.value)

/* Título responsivo */
const clampRem = (minRem: number, maxRem: number) => `clamp(${minRem}rem, 6vw, ${maxRem}rem)`
const titleFontSize = computed(() => isMobile.value ? clampRem(2.2, 4.2) : clampRem(3.0, 6.0))
const titleLineHeight = computed(() => isMobile.value ? 1.04 : 0.95)

/* Navbar */
const navSolid = computed(() => (pEff.value >= 0.30) || (winY.value > 8))
const navStyle  = computed<CSSProperties>(() => ({
  opacity: clamp01((pEff.value - 0.12) / 0.22),
  backgroundColor: navSolid.value ? 'rgba(0,0,0,0.46)' : 'transparent',
  boxShadow: navSolid.value ? '0 6px 28px rgba(0,0,0,0.32)' : 'none'
}))
const instantReveal = computed(() => prefersReduced && !props.forceVideo)
const brandStyle = computed<CSSProperties>(() => {
  if (instantReveal.value) return { filter: 'none', opacity: 1, transform: 'none' }
  const t0 = remapClamped(0.16, 0.32, pEff.value)
  const t  = easeInOutCubic(t0)
  const blurPx = lerp(10, 0, t)
  const op     = lerp(0, 1, t)
  const ty     = lerp(8, 0, t)
  return { filter: `blur(${blurPx.toFixed(2)}px)`, opacity: op, transform: `translate3d(0, ${ty.toFixed(2)}px, 0)`, transition: 'filter 300ms ease, opacity 240ms linear, transform 300ms ease', willChange: 'filter, opacity, transform' }
})
const LINKS_START = 0.18, LINKS_END = 0.42, LINKS_STAGGER = 0.045
const linkStyle = (i: number): CSSProperties => {
  if (instantReveal.value) return { filter: 'none', opacity: 1, transform: 'none' }
  const s = LINKS_START + i * LINKS_STAGGER
  const e = LINKS_END   + i * LINKS_STAGGER
  const t0 = remapClamped(s, e, pEff.value)
  const t  = easeInOutCubic(t0)
  const blurPx = lerp(8, 0, t)
  const op     = lerp(0, 1, t)
  const ty     = lerp(6, 0, t)
  return { filter: `blur(${blurPx.toFixed(2)}px)`, opacity: op, transform: `translate3d(0, ${ty.toFixed(2)}px, 0)`, transition: 'filter 260ms ease, opacity 240ms linear, transform 260ms ease', willChange: 'filter, opacity, transform' }
}

/* Overlays */
const overlayStyle = computed<CSSProperties>(() => {
  const start = Math.min(100, Math.max(0, props.overlay)) / 100
  const end = 0.16
  const phase = remapClamped(0, 1, pEff.value)
  const alpha = lerp(start, end, easeInOutSine(phase))
  const mix = `linear-gradient(0deg, rgba(255,236,209,${alpha*0.24}), rgba(0,0,0,${alpha*1.05}))`
  return { backgroundImage: mix }
})
const cinematicVignetteStyle = computed<CSSProperties>(() => ({
  background: 'radial-gradient(transparent 60%, rgba(0,0,0,0.25)), radial-gradient(60vw 85vh at 10% 50%, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 60%)'
}))
const grainStyle = computed<CSSProperties>(() => ({
  backgroundImage:
    'url("data:image/svg+xml;utf8,' +
    encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.9'/></svg>`) +
    '")',
  backgroundSize: '160px 160px'
}))

/* Layout helpers */
const alignTextClass = computed(() => props.alinhamento === 'centro' ? 'text-center' : 'text-left')
const subBlockClass  = computed(() => props.alinhamento === 'centro' ? 'mx-auto' : '')
const ctaJustifyClass= computed(() => props.alinhamento === 'centro' ? 'justify-center' : 'justify-start')

/* Título */
const words = computed(() => (props.titulo || '').toLowerCase().trim().split(/\s+/))

/* Espaços do título dinâmicos */
const titleGapStyle = computed<CSSProperties>(() => ({
  columnGap: isMobile.value ? '0.9ch' : '2.0ch',
  rowGap:    isMobile.value ? '0.25ch' : '0.5ch'
}))
const wordSpacerStyle = computed<CSSProperties>(() => ({
  marginRight: isMobile.value ? '0.3ch' : '0.8ch'
}))

/* Reveals */
const START_DELAY = 0.14
const revealWordStyle = (i:number): CSSProperties => {
  const delay = i * 0.08
  const t0 = clamp01((pEff.value - (START_DELAY + delay)) / 0.40)
  const t  = easeInOutCubic(t0)
  const op = lerp(0, 1, t)
  const ty = lerp(14, 0, t)
  const blur = (1 - t) * 8
  return {
    opacity: op,
    transform: `translate3d(0, ${ty}px, 0)`,
    filter: `blur(${blur.toFixed(2)}px)`,
    transition: 'transform 320ms ease, filter 320ms ease, opacity 260ms linear'
  }
}
const revealStyle = computed<CSSProperties>(() => {
  const phase = remapClamped(START_DELAY + 0.16, 0.80, pEff.value)
  const t = easeInOutCubic(phase)
  const ty = lerp(18, 0, t)
  const op = lerp(0, 1, t)
  return { transform: `translate3d(0, ${ty}px, 0)`, opacity: op, transition: 'transform 0.28s ease-out, opacity 0.28s linear' }
})
const ctaDelayStyle = computed<CSSProperties>(() => ({
  transitionDelay: `${Math.round(140 * clamp01((pEff.value - (START_DELAY + 0.16)) / 0.50))}ms`
}))

/* Offset e nitidez do título */
const titleBlockStyle = computed<CSSProperties>(() => ({
  transform: `translate3d(${isMobile.value ? 0 : props.titleOffsetVW}vw, 0, 0)`
}))
const titleHaloStyle = computed<CSSProperties>(() => ({
  background:
    'radial-gradient(120% 120% at 0% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 38%, rgba(0,0,0,0) 70%)',
  filter: 'blur(14px)'
}))
const titleShadowStyle = computed<CSSProperties>(() => ({
  textShadow: '0 2px 24px rgba(0,0,0,0.55), 0 1px 6px rgba(0,0,0,0.45)'
}))
const subtitleShadowStyle = computed<CSSProperties>(() => ({
  textShadow: '0 1px 12px rgba(0,0,0,0.5)'
}))

/* Scroll hint position (mobile sobe + safe-area) */
const scrollHintStyle = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return { bottom: 'calc(env(safe-area-inset-bottom, 0px) + 64px)' }
  }
  return {}
})
</script>

<style scoped>
/* transição do painel mobile (direita) */
.slide-fade-enter-active,
.slide-fade-leave-active { transition: all 0.35s ease; }
.slide-fade-enter-from   { transform: translateX(100%); opacity: 0; }
.slide-fade-enter-to     { transform: translateX(0);    opacity: 1; }
.slide-fade-leave-from   { transform: translateX(0);    opacity: 1; }
.slide-fade-leave-to     { transform: translateX(100%); opacity: 0; }
</style>
