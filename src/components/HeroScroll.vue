<template>
  <section ref="sectionEl" class="relative h-[220vh] bg-white">
    <!-- NAVBAR FIXA -->
    <nav
      ref="navEl"
      class="fixed inset-x-0 top-0 z-40 transition-all duration-500"
      :style="navStyle"
      @keydown.esc="closeMobile"
    >
      <!-- fundo vidro -->
      <div
        class="absolute inset-0 backdrop-blur-md bg-black/20 border-b border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
        :class="{ 'bg-black/40 backdrop-blur-xl': navSolid }"
      ></div>

      <!-- conteúdo principal -->
      <div
        class="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12
               flex items-center justify-between py-4 md:py-5"
      >
        <a href="#top"
           class="font-sans font-semibold tracking-[0.18em] uppercase text-white
                  text-[1.05rem] md:text-[1.2rem] transition-all duration-300 hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
           :style="brandStyle">
          Digital Feito à Mão
        </a>

        <!-- Desktop menu (sem barra no hover) -->
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

      <!-- Menu Mobile Premium -->
      <transition name="slide-fade">
        <div
          v-if="mobileOpen"
          id="mobile-menu"
          class="fixed inset-y-0 right-0 w-[84vw] max-w-sm bg-[rgba(8,8,8,0.72)] backdrop-blur-2xl
                 border-l border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)]
                 flex flex-col z-50 rounded-l-2xl overflow-hidden"
        >
          <!-- header -->
          <div class="px-8 pt-8 pb-4 flex items-center justify-between">
            <span class="text-white/70 uppercase tracking-[0.28em] text-xs">Menu</span>
            <button @click="closeMobile"
                    class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- nav items centralizados -->
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

          <!-- socials + footer -->
          <div class="px-8 py-6 border-t border-white/10 bg-white/5">
            <div class="flex items-center justify-center gap-3 mb-3">
              <a v-for="s in social" :key="s.href" :href="s.href" target="_blank" rel="noopener"
                 class="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white
                        flex items-center justify-center transition"
                 :aria-label="s.label">
                <component :is="s.icon"></component>
              </a>
            </div>
            <p class="text-center text-[11px] text-white/60">
              © {{ new Date().getFullYear() }} Digital Feito à Mão
            </p>
          </div>
        </div>
      </transition>
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
              <h1 class="font-semibold leading-[0.95] tracking-[-0.01em]" :style="{ fontSize: titleFontSize }">
                {{ titulo }}
              </h1>
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

      <!-- hint de rolagem – some quando travar -->
      <div
        :class="[
          'absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase transition-opacity duration-500',
          locked ? 'opacity-0 pointer-events-none' : 'opacity-80'
        ]"
      >
        scroll down
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch, h } from 'vue'

type Srcset = { webp?: string }
type FontesVideo = { webm?: string; mp4?: string }
type Cta = { rotulo: string; href: string }
type NavItem = { label: string; href: string }
type Social = { label: string; href: string; icon: any }

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
  overlay: 82
})

/* ===== preferências e mídia ===== */
const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  : false
const useVideo = computed(() => !!(props.videoSources?.webm || props.videoSources?.mp4) && !prefersReduced)

/* ===== refs ===== */
const sectionEl = ref<HTMLElement | null>(null)
const navEl = ref<HTMLElement | null>(null)
const progress = ref(0)
const smoothProgress = ref(0)
const winY = ref(0)
const locked = ref(false) // trava pós-repouso

/* ===== navegação ===== */
const navItems = ref<NavItem[]>([
  { label: 'Serviços',      href: '#services' },
  { label: 'Como funciona', href: '#jornada' },
  { label: 'O que dizem',   href: '#depoimentos' },
  { label: 'Contato',       href: '#contato' }
])

/* social icons inline (SVGs mínimos) */
const IconInstagram = () => h('svg', { xmlns:'http://www.w3.org/2000/svg', viewBox:'0 0 24 24', class:'w-5 h-5', fill:'currentColor' }, [
  h('path', { d:'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7z' }),
  h('path', { d:'M12 8a4 4 0 110 8 4 4 0 010-8zm5-1a1 1 0 110 2 1 1 0 010-2z' })
])
const IconX = () => h('svg', { xmlns:'http://www.w3.org/2000/svg', viewBox:'0 0 24 24', class:'w-5 h-5', fill:'currentColor' }, [
  h('path', { d:'M3 3h4.7l5.2 7.1L18.4 3H21l-7.2 9.8L21 21h-4.7l-5.5-7.4L5.6 21H3l7.5-10L3 3z' })
])
const IconYouTube = () => h('svg', { xmlns:'http://www.w3.org/2000/svg', viewBox:'0 0 24 24', class:'w-5 h-5', fill:'currentColor' }, [
  h('path', { d:'M23 8.5a4 4 0 00-2.8-2.8C18.4 5 12 5 12 5s-6.4 0-8.2.7A4 4 0 001 8.5 41.7 41.7 0 000 12a41.7 41.7 0 001 3.5 4 4 0 002.8 2.8C5.6 19 12 19 12 19s6.4 0 8.2-.7A4 4 0 0023 15.5 41.7 41.7 0 0024 12a41.7 41.7 0 00-1-3.5zM10 15V9l5 3-5 3z' })
])
const IconGitHub = () => h('svg', { xmlns:'http://www.w3.org/2000/svg', viewBox:'0 0 24 24', class:'w-5 h-5', fill:'currentColor' }, [
  h('path', { d:'M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-3 .7-3.7-1.4-3.7-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8-.8.8-.8-.7-.1-1.3-.4-1.6-.9 0 0-.7-.5.1-.5 0 0 .8.1 1.7 1 .5-.2 1.2-.4 1.9-.4s1.4.1 1.9.4c.9-.9 1.7-1 1.7-1 .8 0 .1.5.1.5-.3.5-.9.8-1.6.9 0 0 .2.9.8.8 0 0 .6-1 1.7-1.1 0 0 1.1 0 .1.7 0 0-.7.4-1.2 1.7 0 0-.7 2.1-3.7 1.4v1.8c0 .3.2.6.7.5A10 10 0 0012 2z' })
])
const social = ref<Social[]>([
  { label:'Instagram', href:'https://instagram.com/denisc0de', icon: IconInstagram },
  { label:'X (Twitter)', href:'https://x.com/DenisCode_', icon: IconX },
  { label:'YouTube', href:'https://youtube.com/@odeniscode', icon: IconYouTube },
  { label:'GitHub', href:'https://github.com/denisfelipe93', icon: IconGitHub }
])

/* ===== MENU MOBILE ===== */
const mobileOpen = ref(false)
function toggleMobile(){ mobileOpen.value = !mobileOpen.value }
function closeMobile(){ mobileOpen.value = false }

/* ===== leitura do scroll + responsive ===== */
let raf = 0
const startTxVW = ref(30)  // deslocamento inicial dinâmico
const isMobile  = ref(false)

function computeResponsive() {
  if (typeof window === 'undefined') return
  const w = window.innerWidth
  if (w < 380)      { startTxVW.value = 12; isMobile.value = true }
  else if (w < 640) { startTxVW.value = 16; isMobile.value = true }
  else if (w < 1024){ startTxVW.value = 24; isMobile.value = false }
  else              { startTxVW.value = 30; isMobile.value = false }
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

/* trava ao atingir o repouso */
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

onMounted(() => {
  computeResponsive()
  updateNavOffset()
  readScroll()
  smoothProgress.value = progress.value
  tick()
  window.addEventListener('scroll', readScroll, { passive: true })
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', readScroll)
  window.removeEventListener('resize', onResize)
  cancelAnimationFrame(raf)
})

/* ===== utils ===== */
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
const easeInOutCubic = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2
const remapClamped = (from: number, to: number, v: number) => clamp01((v - from) / (to - from))

const TARGET_GUTTER_VW = 5
const START_DELAY     = 0.14

/* progresso efetivo: se travado, fica 1 (estado final) */
const pEff = computed(() => locked.value ? 1 : smoothProgress.value)

/* font-size do título responsivo */
const clampRem = (minRem: number, maxRem: number) => `clamp(${minRem}rem, 6vw, ${maxRem}rem)`
const titleFontSize = computed(() => isMobile.value ? clampRem(2.2, 4.8) : clampRem(2.6, 6.0))

/* ===== efeitos ===== */
const titleStyle = computed(() => {
  const phase = remapClamped(START_DELAY, 0.90, pEff.value)
  const p = easeInOutSine(phase)
  const tx = lerp(startTxVW.value, -TARGET_GUTTER_VW, p)
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
