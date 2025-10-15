<template>
  <section
    class="relative isolate overflow-hidden bg-white text-neutral-900"
    :class="height === 'screen' ? 'min-h-[80svh] md:min-h-screen' : 'min-h-[60svh]'"
    aria-label="Hero do site"
  >
    <!-- Camada de mídia -->
    <div class="absolute inset-0 -z-10">
      <!-- Vídeo (opcional) -->
      <video
        v-if="useVideo"
        class="h-full w-full object-cover"
        autoplay muted loop playsinline
        :poster="poster || ''"
      >
        <source v-if="videoSources?.webm" :src="videoSources.webm" type="video/webm" />
        <source v-if="videoSources?.mp4"  :src="videoSources.mp4"  type="video/mp4"  />
      </video>

      <!-- Imagem (padrão) -->
      <picture v-else>
        <source v-if="imageSrcset?.webp" :srcset="imageSrcset.webp" type="image/webp" />
        <img
          class="h-full w-full object-cover"
          :src="imageSrc"
          :alt="imageAlt"
          loading="eager"
          decoding="async"
        />
      </picture>

      <!-- Overlay leve para garantir legibilidade sobre o fundo claro -->
      <div class="absolute inset-0 bg-white/20" aria-hidden="true" />
      <!-- vinheta bem discreta -->
      <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_60%,rgba(255,255,255,0.65))]" />
    </div>

    <!-- Conteúdo -->
    <div class="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div :class="['flex flex-col gap-6 md:gap-8', alinhamentoClass, 'max-w-3xl']">
        <span v-if="selo" class="text-xs tracking-[0.2em] uppercase/relaxed text-neutral-700">
          {{ selo }}
        </span>

        <h1 class="text-4xl md:text-6xl font-semibold leading-tight">
          {{ titulo }}
        </h1>

        <p v-if="subtitulo" class="text-base md:text-lg/relaxed text-neutral-700">
          {{ subtitulo }}
        </p>

        <div v-if="ctaPrimaria || ctaSecundaria" class="flex flex-wrap gap-3 md:gap-4" :class="botoesClass">
          <a
            v-if="ctaPrimaria"
            :href="ctaPrimaria.href"
            class="rounded-2xl px-5 py-3 text-sm md:text-base font-medium bg-neutral-900 text-white shadow-lg shadow-black/10 hover:opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-neutral-900/30 transition"
          >
            {{ ctaPrimaria.rotulo }}
          </a>
          <a
            v-if="ctaSecundaria"
            :href="ctaSecundaria.href"
            class="rounded-2xl px-5 py-3 text-sm md:text-base font-medium border border-neutral-300 bg-white/80 backdrop-blur hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-neutral-900/10 transition text-neutral-900"
          >
            {{ ctaSecundaria.rotulo }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Srcset = { webp?: string }
type Cta = { rotulo: string; href: string }
type FontesVideo = { webm?: string; mp4?: string }

const props = withDefaults(defineProps<{
  titulo: string
  subtitulo?: string
  selo?: string
  alinhamento?: 'esquerda' | 'centro'
  height?: 'screen' | 'tall'

  tipoMidia?: 'imagem' | 'video'
  imageSrc: string
  imageAlt?: string
  imageSrcset?: Srcset
  videoSources?: FontesVideo
  poster?: string

  ctaPrimaria?: Cta
  ctaSecundaria?: Cta
}>(), {
  subtitulo: undefined,
  selo: undefined,
  alinhamento: 'esquerda',
  height: 'screen',
  tipoMidia: 'imagem',
  imageAlt: '',
  imageSrcset: () => ({}),
  videoSources: () => ({}),
  poster: '',
  ctaPrimaria: undefined,
  ctaSecundaria: undefined
})

const prefereMenosAnimacao = computed(() =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
)

const useVideo = computed(() =>
  props.tipoMidia === 'video' &&
  !prefereMenosAnimacao.value &&
  (props.videoSources?.webm || props.videoSources?.mp4)
)

const alinhamentoClass = computed(() =>
  props.alinhamento === 'centro' ? 'items-center text-center' : 'items-start text-left'
)
const botoesClass = computed(() =>
  props.alinhamento === 'centro' ? 'justify-center' : 'justify-start'
)
</script>
