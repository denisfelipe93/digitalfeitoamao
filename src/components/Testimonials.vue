<!-- src/components/TestimonialsPremium.vue -->
<template>
  <section
    class="relative w-full mx-auto isolate bg-[var(--paper)] text-[var(--ink)]"
    aria-labelledby="testimonials-title"
    style="--paper:#F8F5F1; --ink:#171717; --brand:#3C5A40;"
  >
    <!-- textura/pattern suave de papel -->
    <div class="pointer-events-none absolute inset-0 -z-10 opacity-[.55] mix-blend-multiply">
      <div class="size-full paper-texture" />
    </div>

    <div class="mx-auto max-w-6xl px-6 sm:px-8 py-20 lg:py-28">
      <!-- Header -->
      <header class="text-center max-w-3xl mx-auto">
        <h2
          id="testimonials-title"
          class="font-sans font-extrabold tracking-tight leading-tight
                 text-[clamp(28px,4.2vw,48px)]"
        >
          {{ title || 'O que nossos clientes dizem' }}
        </h2>

        <!-- subtítulo em “ribbon” mais discreta -->
        <div class="mt-6 flex justify-center">
          <span class="ribbon">
            <svg class="h-[18px] w-[18px] opacity-70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M12 2c.6 2.9 2.5 4.7 5.4 5.4C14.5 8 12.7 9.9 12 12c-.6-2.1-2.5-4-5.4-4.6C9.5 6.7 11.4 4.9 12 2Zm7 10c.4 1.7 1.5 2.8 3.1 3.1-1.6.3-2.7 1.4-3.1 3.1-.3-1.6-1.4-2.8-3.1-3.1 1.7-.3 2.8-1.4 3.1-3.1ZM2 14c.4 2 1.9 3.5 3.9 3.9C3.9 18.3 2.4 19.8 2 22c-.3-2.2-1.8-3.7-4-4.1C0.2 17.6 1.7 16.1 2 14Z"
              />
            </svg>
            <span class="leading-snug text-center">{{ subtitle || 'Parcerias reais, resultados de verdade.' }}</span>
          </span>
        </div>
      </header>

      <!-- Navegação mobile (scroll-snap) -->
      <div class="mt-12 sm:mt-16 md:hidden relative">
        <div
          ref="scroller"
          class="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 no-scrollbar"
          aria-label="Depoimentos"
        >
          <article
            v-for="t in normalizedItems"
            :key="t.id"
            class="snap-center shrink-0 basis-[86%] xs:basis-[78%]"
          >
            <TestiCard :t="t" />
          </article>
        </div>

        <!-- setas (opcionais) -->
        <div class="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
          <div class="grad-edge-left" />
          <div class="grad-edge-right" />
        </div>
      </div>

      <!-- Grid desktop -->
      <div class="hidden md:grid mt-16 lg:mt-24 grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        <TestiCard v-for="t in normalizedItems" :key="t.id" :t="t" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, withDefaults, defineProps, computed, shallowRef, defineComponent } from 'vue'

type IconProps = Record<string, any>
const IconCup = (p:IconProps) =>
  h('svg', { ...p, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden':'true' }, [
    h('path', { d:'M4 6h13a3 3 0 1 0 0 6h-1.06A7.002 7.002 0 0 1 6.1 18H5a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2Zm15 2v4a2 2 0 1 0 0-4Z' }),
    h('path', { d:'M6 20.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Z' }),
  ])
const IconChip = (p:IconProps) =>
  h('svg', { ...p, viewBox:'0 0 24 24', fill:'currentColor', 'aria-hidden':'true' }, [
    h('path', { d:'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm2 5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-4Z' })
  ])
const IconPalette = (p:IconProps) =>
  h('svg', { ...p, viewBox:'0 0 24 24', fill:'currentColor', 'aria-hidden':'true' }, [
    h('path', { d:'M12 3a9 9 0 1 0 0 18 3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4h1a3 3 0 0 0 0-6ZM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm4-2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm6 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' })
  ])

interface TestiItem {
  id: string
  name: string
  role: string
  company: string
  icon?: any
  avatar: string
  quote: string
  body?: string
}

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  items?: TestiItem[]
}>(), {
  title: 'clientes mais que amigos, friends!',
  subtitle: 'Parcerias que florescem e criam memórias inesquecíveis, contadas por quem as viveu.',
})

const demo = shallowRef<TestiItem[]>([
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Fundadora',
    company: 'Café & Prosa',
    icon: IconCup,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    quote: 'Transformaram minha visão em realidade — pura magia.',
    body: 'A direção criativa é impecável e a execução vai além do combinado.'
  },
  {
    id: '2',
    name: 'Rafael Mendes',
    role: 'CEO',
    company: 'Tech Solutions',
    icon: IconChip,
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=300&auto=format&fit=crop',
    quote: 'O engajamento com nosso público dobrou.',
    body: 'Conteúdo e visuais elevaram a marca. Profissionalismo raro de ver.'
  },
  {
    id: '3',
    name: 'Sofia Costa',
    role: 'Artista',
    company: 'Ateliê da Flor',
    icon: IconPalette,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=300&auto=format&fit=crop',
    quote: 'Fotos que capturaram a alma da minha marca.',
    body: 'Sensibilidade no olhar e direção artística singular.'
  },
])

const normalizedItems = computed<TestiItem[]>(() => props.items?.length ? props.items : demo.value)

/** Card desacoplado para reuso */
const TestiCard = defineComponent({
  name: 'TestiCard',
  props: { t: { type: Object as () => TestiItem, required: true } },
  setup({ t }) {
    return () => h('figure',
      {
        class: [
          'relative group',
          'rounded-3xl p-6 sm:p-7 pt-24',              // pt reserva espaço pro avatar
          'bg-white/70 backdrop-blur-[6px]',
          'border border-black/5',
          'shadow-[0_20px_50px_rgba(0,0,0,.06)]',
          'transition-transform duration-300 motion-safe:group-hover:-translate-y-1',
          'focus-within:-translate-y-1',
          'paper-elevation',
        ],
        tabindex: -1,
      },
      [
        // Avatar (NUNCA cortado)
        h('div', {
          class: [
            'absolute -top-12 left-1/2 -translate-x-1/2',
            'h-24 w-24 rounded-full ring-[6px] ring-[var(--paper)] overflow-hidden shadow-md',
            'bg-neutral-200',
          ],
          'aria-hidden': 'true'
        }, [
          h('img', { src: t.avatar, alt: '', class: 'h-full w-full object-cover', loading: 'lazy' })
        ]),

        // Aspas
        h('div', { class: 'mx-auto mb-3 flex justify-center text-black/30' }, [
          h('svg', { class: 'h-6 w-6', viewBox:'0 0 24 24', fill:'currentColor', 'aria-hidden':'true' }, [
            h('path', { d:'M7.17 6.03C4.9 7.3 3.5 9.6 3.5 12.14c0 3 2.12 5.36 5.24 5.36 2.62 0 4.76-2.14 4.76-4.76 0-2.62-2.14-4.76-4.76-4.76-.28 0-.56.02-.81.05.37-1.1 1.11-2.01 2.2-2.68L7.17 6.03Zm9 0c-2.27 1.27-3.67 3.57-3.67 6.11 0 3 2.14 5.36 5.26 5.36 2.62 0 4.76-2.14 4.76-4.76 0-2.62-2.14-4.76-4.76-4.76-.28 0-.56.02-.81.05.37-1.1 1.11-2.01 2.2-2.68l-2.98-.32Z' })
          ])
        ]),

        // Quote
        h('blockquote', { class:'mx-auto max-w-[42ch] font-semibold leading-relaxed text-xl text-[var(--ink)] text-center' }, `“${t.quote}”`),

        // Body
        t.body ? h('p', { class:'mx-auto mt-4 max-w-[55ch] text-[15px] text-neutral-700 leading-relaxed text-center' }, t.body) : null,

        // Assinatura
        h('figcaption', { class:'mt-7 text-sm text-neutral-800 text-center' }, [
          h('div', { class:'font-semibold' }, t.name),
          h('div', { class:'mt-1 flex items-center justify-center gap-2 text-neutral-500' }, [
            h('span', t.role),
            h('span', { 'aria-hidden':'true' }, '•'),
            h('span', { class:'inline-flex items-center gap-1' }, [
              t.icon ? h(t.icon, { class:'h-[15px] w-[15px]' }) : null,
              h('span', t.company),
            ])
          ])
        ]),

        // Halo (sutil, não corta conteúdo porque fica atrás e o card tem padding)
        h('span', { class:'absolute inset-0 -z-10 rounded-[26px] shadow-[0_40px_70px_rgba(0,0,0,.08)]' })
      ]
    )
  }
})
</script>

<style scoped>
/* Tipografia base */
.font-sans{ font-family: var(--font-sans, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial); }

/* Textura de papel suave */
.paper-texture{
  background:
    radial-gradient(120px 120px at 20% 15%, rgba(0,0,0,.025), transparent 70%),
    radial-gradient(160px 160px at 80% 25%, rgba(0,0,0,.025), transparent 70%),
    radial-gradient(100px 100px at 30% 80%, rgba(0,0,0,.03), transparent 70%),
    radial-gradient(140px 140px at 75% 70%, rgba(0,0,0,.03), transparent 70%),
    repeating-linear-gradient(0deg, rgba(0,0,0,.012) 0px, rgba(0,0,0,.012) 1px, transparent 2px, transparent 6px);
}

/* Ribbon */
.ribbon{
  position:relative;
  display:inline-flex; align-items:center; gap:.55rem;
  padding:.6rem 1rem; border-radius:999px;
  background: linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,.6));
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  border:1px solid rgba(0,0,0,.08);
  box-shadow: 0 1px 0 rgba(255,255,255,.7) inset, 0 6px 18px rgba(0,0,0,.06);
  color:#374151; font-size:15px;
}
.ribbon::before,.ribbon::after{
  content:""; position:absolute; top:50%; width:18vw; max-width:240px; height:1px;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,.08), transparent);
  transform: translateY(-50%); pointer-events:none;
}
.ribbon::before{ right:100%; margin-right:10px; }
.ribbon::after { left:100%;  margin-left:10px; }
@media (max-width:768px){ .ribbon::before,.ribbon::after{ width:14vw; max-width:160px; } }

/* Elevação “papel” */
.paper-elevation{
  background-image:
    radial-gradient(100% 60% at 50% 0, rgba(255,255,255,.55), rgba(255,255,255,0) 60%),
    linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2));
}

/* Gradientes laterais do carrossel mobile (estética e legibilidade) */
.grad-edge-left, .grad-edge-right{
  pointer-events:none; width:56px; height:100%;
}
.grad-edge-left{
  background: linear-gradient(90deg, var(--paper), transparent);
}
.grad-edge-right{
  background: linear-gradient(270deg, var(--paper), transparent);
}

/* Scrollbar “off” sem quebrar acessibilidade */
.no-scrollbar{ scrollbar-width:none; }
.no-scrollbar::-webkit-scrollbar{ display:none; }

/* Motion reduce */
@media (prefers-reduced-motion: reduce){
  .paper-elevation{ transition: none !important; }
}
</style>
