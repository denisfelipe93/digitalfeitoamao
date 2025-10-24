<!-- src/components/Testimonials.vue -->
<template>
  <section
    class="relative isolate overflow-x-hidden w-full max-w-[100vw] mx-auto py-20 lg:py-28 bg-[var(--paper)]"
    aria-labelledby="testimonials-title"
    style="--paper:#F8F5F1; --ink:#131313;"
  >
    <!-- pattern sutil de fundo -->
    <div class="absolute inset-0 -z-10 opacity-70 pointer-events-none pattern"></div>

    <div class="container overflow-hidden">
      <!-- header -->
      <header class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
        <h2
          id="testimonials-title"
          class="font-sans font-extrabold text-[var(--ink)] tracking-tight text-[clamp(30px,4.6vw,52px)]"
        >
          {{ title }}
        </h2>

        <!-- subtítulo em ribbon -->
        <div class="mt-6 flex justify-center">
          <span class="ribbon">
            <svg class="h-[18px] w-[18px] opacity-70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M12 2c.6 2.9 2.5 4.7 5.4 5.4C14.5 8 12.7 9.9 12 12c-.6-2.1-2.5-4-5.4-4.6C9.5 6.7 11.4 4.9 12 2Zm7 10c.4 1.7 1.5 2.8 3.1 3.1-1.6.3-2.7 1.4-3.1 3.1-.3-1.6-1.4-2.8-3.1-3.1 1.7-.3 2.8-1.4 3.1-3.1ZM2 14c.4 2 1.9 3.5 3.9 3.9C3.9 18.3 2.4 19.8 2 22c-.3-2.2-1.8-3.7-4-4.1C0.2 17.6 1.7 16.1 2 14Z"
              />
            </svg>
            <span class="leading-snug text-center">{{ subtitle }}</span>
          </span>
        </div>
      </header>

      <!-- grid com bom respiro -->
      <div class="mt-16 lg:mt-32 grid md:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-12 lg:gap-x-16">
        <figure
          v-for="(t, i) in items"
          :key="t.id"
          class="group card relative text-center pt-24 pb-12 px-8 md:px-10 shadow-[0_20px_50px_rgba(0,0,0,.08)] transition-transform motion-safe:hover:-translate-y-1 focus-within:-translate-y-1"
          :class="blobClass(i)"
        >
          <!-- avatar -->
          <div
            class="absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full ring-[6px] ring-white overflow-hidden shadow-md"
          >
            <img :src="t.avatar" alt="" class="h-full w-full object-cover" loading="lazy" />
          </div>

          <!-- aspas -->
          <svg class="mx-auto mb-4 h-6 w-6 text-black/25" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M7.17 6.03C4.9 7.3 3.5 9.6 3.5 12.14c0 3 2.12 5.36 5.24 5.36 2.62 0 4.76-2.14 4.76-4.76 0-2.62-2.14-4.76-4.76-4.76-.28 0-.56.02-.81.05.37-1.1 1.11-2.01 2.2-2.68L7.17 6.03Zm9 0c-2.27 1.27-3.67 3.57-3.67 6.11 0 3 2.14 5.36 5.26 5.36 2.62 0 4.76-2.14 4.76-4.76 0-2.62-2.14-4.76-4.76-4.76-.28 0-.56.02-.81.05.37-1.1 1.11-2.01 2.2-2.68l-2.98-.32Z"
            />
          </svg>

          <!-- quote -->
          <blockquote class="mx-auto max-w-[42ch] font-semibold leading-relaxed text-[var(--ink)] text-xl">
            “{{ t.quote }}”
          </blockquote>

          <!-- corpo -->
          <p class="mx-auto mt-4 max-w-[55ch] text-[15px] text-neutral-700 leading-relaxed">
            {{ t.body }}
          </p>

          <!-- assinatura -->
          <figcaption class="mt-7 text-sm text-neutral-800">
            <div class="font-semibold">{{ t.name }}</div>
            <div class="mt-1 flex items-center justify-center gap-2 text-neutral-500">
              <span>{{ t.role }}</span>
              <span aria-hidden="true">•</span>
              <span class="inline-flex items-center gap-1">
                <component :is="t.icon" class="h-[15px] w-[15px]" />
                <span>{{ t.company }}</span>
              </span>
            </div>
          </figcaption>

          <!-- halo separador -->
          <span class="card-halo" aria-hidden="true"></span>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, withDefaults, defineProps } from 'vue'

/** Props opcionais com defaults (TS feliz) */
withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
  }>(),
  {
    title: 'clientes mais que amigos, friends!',
    subtitle: 'Parcerias que florescem e criam memórias inesquecíveis, contadas por quem as viveu.'
  }
)

/** Ícones inline minúsculos (evita dependências) */
const IconCup = (p:any) =>
  h('svg', { ...p, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true' }, [
    h('path', { d: 'M4 6h13a3 3 0 1 0 0 6h-1.06A7.002 7.002 0 0 1 6.1 18H5a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2Zm15 2v4a2 2 0 1 0 0-4Z' }),
    h('path', { d: 'M6 20.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Z' })
  ])
const IconChip = (p:any) =>
  h('svg', { ...p, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true' }, [
    h('path', { d: 'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm2 5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-4Z' })
  ])
const IconPalette = (p:any) =>
  h('svg', { ...p, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true' }, [
    h('path', { d: 'M12 3a9 9 0 1 0 0 18 3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4h1a3 3 0 0 0 0-6ZM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm4-2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm6 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' })
  ])

/** Conteúdo demo (troque pelos seus dados reais) */
const items = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Fundadora',
    company: 'Café & Prosa',
    icon: IconCup,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    quote: 'Eles transformam minha visão em realidade — pura magia!',
    body: 'Trabalhar com esta equipe foi uma experiência incrível! Eles entendem o que é e entregam além do esperado.'
  },
  {
    id: '2',
    name: 'Rafael Mendes',
    role: 'CEO',
    company: 'Tech Solutions',
    icon: IconChip,
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=300&auto=format&fit=crop',
    quote: 'O engajamento com meu público duplicou!',
    body:
      'O conteúdo e os visuais que criaram para nossas redes elevaram a marca. Profissionalismo e criatividade em cada frame.'
  },
  {
    id: '3',
    name: 'Sofia Costa',
    role: 'Artista',
    company: 'Ateliê da Flor',
    icon: IconPalette,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=300&auto=format&fit=crop',
    quote: 'Fotos que capturaram a ALMA da minha marca!',
    body: 'Cada clique virou obra de arte. A sensibilidade ao olhar e a direção artística são singulares.'
  }
]

/** Variações de blob (cor + forma) */
function blobClass(i: number) {
  const palettes = [
    { bg: '#F7DCCB', text: '#5a3b30', path: 'M0,120 Q0,0 120,0 H280 Q400,0 400,120 V300 Q400,420 280,420 H120 Q0,420 0,300 Z' },
    { bg: '#DDEFE5', text: '#244a3a', path: 'M0,130 Q0,0 130,0 H270 Q400,0 400,140 V290 Q400,420 260,420 H140 Q0,420 0,280 Z' },
    { bg: '#E3DCF6', text: '#2f2a55', path: 'M0,120 Q0,0 120,0 H280 Q400,0 400,120 V320 Q400,420 300,420 H100 Q0,420 0,300 Z' }
  ]
  const { bg, text, path } = palettes[i % palettes.length]
  return ['blob', `text-[${text}]`, `before:[clip-path:path('${path}')]`, `bg-[${bg}]`]
}
</script>

<style scoped>
/* container */
.container { max-width:1240px; margin:0 auto; padding:0 1.5rem; }
@media (min-width:768px){ .container{ padding:0 2.5rem; }}

/* tipografia base */
.font-sans { font-family: var(--font-sans, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial); }

/* ribbon do subtítulo */
.ribbon{
  position:relative;
  display:inline-flex; align-items:center; gap:.55rem;
  padding:.65rem 1.1rem; border-radius:999px;
  background: linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,.65));
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border:1px solid rgba(0,0,0,.08);
  box-shadow:
    0 1px 0 rgba(255,255,255,.7) inset,
    0 6px 18px rgba(0,0,0,.06);
  color:#374151; font-size:15px;
  contain: paint; /* impede os pseudos de expandirem a área pintada */
}
.ribbon::before,
.ribbon::after{
  content:""; position:absolute; top:50%; width:18vw; max-width:240px; height:1px;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,.08), transparent);
  transform: translateY(-50%);
  pointer-events:none;
}
.ribbon::before{ right:100%; margin-right:10px; }
.ribbon::after { left:100%;  margin-left:10px; }
@media (max-width: 768px){
  .ribbon::before, .ribbon::after{ width:14vw; max-width:160px; }
}

/* CARD: halo sutil para separar do fundo */
.card{ border-radius:28px; position:relative; }
.card .card-halo{
  position:absolute; inset:-14px; z-index:-1; border-radius:36px;
  background: radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,.10), transparent 60%);
  filter: blur(14px); opacity:.65;
}
@media (max-width: 640px){
  .card .card-halo{ inset:-8px; filter: blur(12px); }
}

/* Blobs */
.blob{
  background:#eee; color:var(--ink); isolation:isolate;
  transition: transform .25s cubic-bezier(.22,.61,.36,1), box-shadow .25s ease;
  contain: paint; /* evita overflow por sombras/blur do ::before */
}
.blob::before{
  content:""; position:absolute; inset:0; z-index:-1; background:inherit;
  box-shadow: 0 40px 70px rgba(0,0,0,.08);
  border-radius:28px;
}
.blob{ background-image:
  radial-gradient(100% 60% at 50% 0, rgba(255,255,255,.55), rgba(255,255,255,0) 60%);
}

/* pattern de fundo da seção */
.pattern{
  background:
    radial-gradient(120px 120px at 20% 15%, rgba(0,0,0,.03), transparent 70%),
    radial-gradient(160px 160px at 80% 25%, rgba(0,0,0,.03), transparent 70%),
    radial-gradient(100px 100px at 30% 80%, rgba(0,0,0,.03), transparent 70%),
    radial-gradient(140px 140px at 75% 70%, rgba(0,0,0,.03), transparent 70%);
}

/* motion-reduce */
@media (prefers-reduced-motion: reduce){
  .blob{ transition: none !important; }
}
</style>
