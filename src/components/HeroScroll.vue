<template>
  <section ref="sectionEl" class="relative h-[200svh] bg-white">
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

        <!-- OVERLAY dinâmico: começa escuro e clareia com o scroll -->
        <div class="absolute inset-0" :style="overlayStyle" />
        <!-- Vinheta + gradiente do topo p/ legibilidade do menu -->
        <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_60%,rgba(0,0,0,0.5))]" />
        <div class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
      </div>

      <!-- NAVBAR (gana blur/fundo quando ancora) -->
      <nav class="absolute left-0 right-0 top-0">
        <div
          class="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between transition"
          :class="{'backdrop-blur-md': navSolid}"
          :style="navStyle"
        >
          <div class="font-semibold tracking-wide">
            <span class="inline-flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-white/80"></span>
              Digital Feito à Mão
            </span>
          </div>
          <ul class="hidden md:flex gap-6 text-sm">
            <li><a href="#servicos" class="hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">Serviços</a></li>
            <li><a href="#jornada" class="hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">Como funciona</a></li>
            <li><a href="#depoimentos" class="hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">O que dizem</a></li>
            <li><a href="#contato" class="hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">Contato</a></li>
          </ul>
        </div>
      </nav>

      <!-- CONTEÚDO -->
      <div class="h-full w-full">
        <div class="max-w-7xl mx-auto h-full px-6 md:px-8 lg:px-12 flex items-center">
          <div class="w-full" :class="alinhamento === 'centro' ? 'text-center' : 'text-left'">
            <!-- TÍTULO (movimento suave) -->
            <div class="will-change-transform" :style="titleStyle">
              <h1
                class="font-semibold leading-[0.95] tracking-[-0.01em]"
                :style="{ fontSize: clampRem(2.6, 6.0) }"
              >
                {{ titulo }}
              </h1>
            </div>

            <!-- SUBTÍTULO + CTA (stagger no CTA) -->
            <div class="mt-7 md:mt-9 max-w-2xl" :class="alinhamento === 'centro' ? 'mx-auto' : ''" :style="revealStyle">
              <p v-if="subtitulo" class="text-white/90 text-base md:text-lg">
                {{ subtitulo }}
              </p>
              <div v-if="ctaPrimaria" class="mt-6 flex flex-wrap gap-3">
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

      <!-- indicador opcional -->
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
  // texto
  titulo: string
  subtitulo?: string
  selo?: string
  alinhamento?: 'esquerda' | 'centro'

  // mídia
  imageSrc: string              // URL (string). Use ?url no import do Astro
  imageAlt?: string
  imageSrcset?: Srcset          // opcional: srcset string em webp
  sizes?: string                // opcional: sizes do <img>
  videoSources?: FontesVideo
  poster?: string

  // cta
  ctaPrimaria?: Cta

  // overlay base (0..100). Vai clareando com o scroll.
  overlay?: number
}>(), {
  subtitulo: "Cuidamos do seu digital com o cuidado, planejamento e impacto. Lapidando sua marca na internet delicadamente, como se fosse à mão.",
  selo: undefined,
  alinhamento: 'esquerda',
  imageAlt: '',
  imageSrcset: () => ({}),
  sizes: '(max-width:768px) 100vw, 90vw',
  videoSources: () => ({}),
  poster: '',
  ctaPrimaria: () => ({ rotulo: 'Fale conosco', href: '#contato' }),
  overlay: 82
})

const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  : false
const useVideo = computed(() => !!(props.videoSources?.webm || props.videoSources?.mp4) && !prefersReduced)

// progress bruto e suavizado
const sectionEl = ref<HTMLElement | null>(null)
const progress = ref(0)         // 0..1 real
const smoothProgress = ref(0)   // 0..1 suavizado

// leitura do scroll
const readScroll = () => {
  if (!sectionEl.value) return
  const rect = sectionEl.value.getBoundingClientRect()
  const vh = window.innerHeight
  const total = Math.max(rect.height - vh, 1)
  const passed = Math.min(Math.max(-rect.top, 0), total)
  progress.value = passed / total
}

// loop de suavização (cap por frame)
let raf = 0
const tick = () => {
  const damping = 0.10      // menor = mais aveludado (0.08–0.12)
  const maxStep = 0.035     // impede saltos bruscos por frame
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
const easeInOutCubic = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2
const remapClamped = (from: number, to: number, v: number) => clamp01((v - from) / (to - from))

// UI tuning
const TARGET_GUTTER_VW = 6      // repouso do título
const START_DELAY = 0.08        // 8% de scroll “parado” antes de mover
const END_PHASE   = 0.45        // finaliza ancoragem até aqui

// título: central -> esquerda com zona morta + easing
const titleStyle = computed(() => {
  const phase = remapClamped(START_DELAY, END_PHASE, smoothProgress.value)
  const p = easeInOutCubic(phase)
  const tx = lerp(0, -TARGET_GUTTER_VW, p)
  const sc = lerp(1, 0.975, p)
  const ta = p < 0.02 ? 'center' : 'left'
  return {
    transform: `translate3d(${tx}vw,0,0) scale(${sc})`,
    transition: prefersReduced ? 'none' : 'transform 0.1s linear',
    textAlign: props.alinhamento === 'centro' && p < 0.02 ? 'center' : ta as any
  }
})

// subtítulo/CTA: entram depois e suave (stagger do CTA)
const revealStyle = computed(() => {
  const phase = remapClamped(START_DELAY + 0.10, 0.70, smoothProgress.value)
  const t = easeInOutCubic(phase)
  const ty = lerp(16, 0, t)
  const op = lerp(0, 1, t)
  return {
    transform: `translate3d(0, ${ty}px, 0)`,
    opacity: `${op}`,
    transition: prefersReduced ? 'none' : 'transform 0.14s cubic-bezier(.2,.8,.2,1), opacity 0.14s linear'
  }
})
const ctaDelayStyle = computed(() => ({
  transitionDelay: `${Math.round(120 * clamp01((smoothProgress.value - (START_DELAY + 0.10)) / 0.50))}ms`
}))

// navbar: ganha fundo/blur quando passamos ~35% da seção
const navSolid = computed(() => smoothProgress.value >= 0.35)
const navStyle = computed(() => ({
  opacity: clamp01((smoothProgress.value - 0.20) / 0.25).toFixed(3),
  backgroundColor: navSolid.value ? 'rgba(0,0,0,0.35)' : 'transparent',
  boxShadow: navSolid.value ? '0 2px 20px rgba(0,0,0,0.25)' : 'none'
}))

// overlay: de "overlay" (props.overlay) até ~0.32
const overlayStyle = computed(() => {
  const start = Math.min(100, Math.max(0, props.overlay)) / 100 // 0..1
  const end = 0.32
  const phase = remapClamped(0, 1, smoothProgress.value)
  const alpha = lerp(start, end, easeInOutCubic(phase))
  return { backgroundColor: `rgba(0,0,0,${alpha})` }
})

// util
const clampRem = (minRem: number, maxRem: number) => `clamp(${minRem}rem, 6vw, ${maxRem}rem)`
</script>
