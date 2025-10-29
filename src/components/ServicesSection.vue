<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue'
import { services } from '@/data/services'

const props = withDefaults(defineProps<{
  contactHref?: string
  eyebrow?: string
  title?: string
  initialVisible?: number
  ctaLabel?: string
}>(), {
  contactHref: '#contato',
  eyebrow: 'Conheça nossos',
  title: 'SERVIÇOS',
  initialVisible: 3,
  ctaLabel: 'Entrar em contato'
})

const expanded = ref(false)
const items = ref(services.slice(0, props.initialVisible))
const listEl = ref<HTMLElement | null>(null)

let io: IntersectionObserver | null = null
function setupObserver() {
  if (io) io.disconnect()
  io = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        (e.target as HTMLElement).classList.add('is-in')
        io?.unobserve(e.target as Element)
      }
    }),
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  )
  listEl.value?.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach(el => io!.observe(el))
}
onMounted(() => setupObserver())

async function toggleMore() {
  if (expanded.value) {
    items.value = services.slice(0, props.initialVisible)
    expanded.value = false
    await nextTick()
    listEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    items.value = services
    expanded.value = true
    await nextTick()
    setupObserver()
  }
}
</script>

<template>
  <section
    class="relative bg-white pt-8 sm:pt-10 md:pt-16 pb-12 md:pb-20"
    style="--ink:#0C0C0C; --hair:#E7E7E7; --chip-bg:#F7F7F7; --cardTop:#FFFFFF; --cardBottom:#FBFBFB;"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        <!-- Sidebar -->
        <aside class="lg:col-span-4 lg:sticky lg:top-[calc(var(--nav-h,88px)+24px)] self-start">
          <p class="mb-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            {{ props.eyebrow }}
          </p>
          <h2 class="text-[40px] sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[var(--ink)]">
            {{ props.title }}
          </h2>
          <p class="mt-4 sm:mt-5 max-w-prose text-[15px] sm:text-base text-zinc-600 leading-relaxed">
            Estratégia, branding e conteúdo sob medida — do diagnóstico ao delivery. Pensado para marcas
            que buscam consistência, estética e resultado.
          </p>
          <a
            :href="props.contactHref"
            class="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-5 py-2.5 sm:px-6 sm:py-3
                   text-sm font-semibold tracking-tight leading-none hover:opacity-90
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
          >
            {{ props.ctaLabel }}
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </aside>

        <!-- Lista -->
        <div class="lg:col-span-8 relative">
          <!-- linha da timeline (somente desktop) -->
          <div class="pointer-events-none absolute left-[22px] top-0 bottom-0 hidden lg:block">
            <div class="h-full w-px bg-gradient-to-b from-transparent via-zinc-200 to-transparent"></div>
          </div>

          <ul ref="listEl" class="space-y-5 sm:space-y-6 md:space-y-8">
            <li v-for="s in items" :key="s.id" data-reveal
                class="reveal translate-y-4 sm:translate-y-6 opacity-0 will-change-[transform,opacity]">
              <article
                class="group relative rounded-xl sm:rounded-2xl md:rounded-3xl
                           bg-[linear-gradient(180deg,var(--cardTop),var(--cardBottom))]
                           border border-[var(--hair)]/90 px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-7
                           shadow-[0_1px_0_rgba(0,0,0,0.04)]
                           md:transition-all md:duration-300 md:hover:-translate-y-0.5 md:hover:shadow-xl md:hover:shadow-black/5"
              >
                <!-- GRID mobile-first -->
                <div class="grid grid-cols-[38px_1fr] md:grid-cols-[52px_1fr_300px] gap-3 sm:gap-4 md:gap-6 items-start">
                  <!-- Badge + conector -->
                  <div class="relative pt-0.5 overflow-hidden">
                    <span class="inline-flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full
                                   bg-zinc-900 text-white text-[11px] sm:text-xs md:text-sm font-semibold select-none
                                   shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
                      {{ String(s.id).padStart(2,'0') }}
                    </span>
                    <!-- CONECTOR (desktop) começa abaixo do círculo — sem “pirulito” -->
                    <span
                      aria-hidden="true"
                      class="hidden md:block pointer-events-none
                             absolute left-[26px] top-14 bottom-[-28px] w-px bg-zinc-200/80">
                    </span>
                  </div>

                  <!-- Título + chips -->
                  <div class="min-w-0">
                    <h3 class="font-serif text-[20px] sm:text-[24px] md:text-[32px] leading-[1.2] md:leading-[1.15]
                               tracking-[-0.01em] text-[var(--ink)] [text-wrap:balance]">
                      {{ s.title }}
                    </h3>
                    <ul class="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                      <li
                        v-for="(t,i) in s.tags" :key="i"
                        class="inline-flex items-center rounded-full border border-[var(--hair)]
                               bg-[var(--chip-bg)] px-2.5 py-1 sm:px-3 text-[10.5px] sm:text-[11px]
                               font-mono uppercase tracking-[0.12em] text-zinc-800/90 shadow-[inset_0_1px_0_#fff]"
                      >
                        {{ t }}
                      </li>
                    </ul>
                  </div>

                  <!-- Descrição: no mobile ocupa as 2 colunas; no desktop vai pra direita e centraliza -->
                  <p class="col-span-2 md:col-span-1 md:justify-self-end md:self-center md:max-w-[36ch]
                            text-[14.5px] sm:text-[15px] text-zinc-800 leading-relaxed md:pl-2 mt-3 md:mt-0">
                    {{ s.description }}
                  </p>
                </div>

                <span class="hidden md:block absolute inset-0 rounded-2xl md:rounded-3xl ring-0 ring-zinc-900/0 transition
                             group-hover:ring-1 group-hover:ring-zinc-900/10
                             group-focus-within:ring-1 group-focus-within:ring-zinc-900/15"></span>
              </article>
            </li>
          </ul>

          <!-- Ações -->
          <div
            class="mt-7 md:mt-10 md:sticky md:bottom-6 md:z-10
                   md:pt-6 md:bg-gradient-to-t md:from-white md:via-white/90 md:to-transparent
                   flex items-center justify-center md:justify-start gap-4"
          >
            <button
              @click="toggleMore"
              class="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium
                     hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
            >
              {{ expanded ? 'Ver menos' : 'Ver mais' }}
              <svg class="size-4 transition-transform" :class="expanded ? 'rotate-180' : ''"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reveal.is-in{
  opacity:1;
  transform:none;
  transition:opacity .45s cubic-bezier(.22,.61,.36,1),transform .45s cubic-bezier(.22,.61,.36,1);
}
@media (prefers-reduced-motion: reduce){
  .reveal{ opacity:1 !important; transform:none !important; }
}
</style>
