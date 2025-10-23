<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { VNodeRef, ComponentPublicInstance } from 'vue'

type NavItem = { label: string; href: string; external?: boolean };
type SocialItem = { label: string; href: string; srLabel?: string };

const props = withDefaults(defineProps<{
  brandTagline?: string
  hoverText?: string
  whatsappNumber?: string
  whatsappMsg?: string
  navPrimary?: NavItem[]
  infoNav?: NavItem[]
  social?: SocialItem[]
  yearOverride?: number
  playOnVisible?: boolean
}>(), {
  brandTagline: 'digital feito à mão',
  hoverText: 'digital feito à mão',
  whatsappNumber: '+55 11 97699-0921',
  whatsappMsg: 'Olá! Vim pelo site e quero conversar.',
  navPrimary: () => ([
    { label: 'Início', href: '/' },
    { label: 'Projetos', href: '/projetos' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Contato', href: '/contato' },
  ]),
  infoNav: () => ([
    { label: 'Políticas', href: '/politicas' },
    { label: 'Termos', href: '/termos' },
  ]),
  social: () => ([
    { label: 'Instagram', href: 'https://instagram.com/denisc0de', srLabel: 'Instagram de DenisCode' },
    { label: 'X (Twitter)', href: 'https://x.com/DenisCode_', srLabel: 'Perfil no X de DenisCode' },
    { label: 'YouTube', href: 'https://youtube.com/@odeniscode', srLabel: 'Canal no YouTube de DenisCode' },
    { label: 'GitHub', href: 'https://github.com/denisfelipe93', srLabel: 'GitHub de Denis Felipe' },
  ]),
  playOnVisible: true,
});

const year = computed(() => props.yearOverride ?? new Date().getFullYear());

const waLink = computed(() => {
  const base = 'https://wa.me';
  const phone = (props.whatsappNumber || '').replace(/[^\d]/g, '');
  const text = encodeURIComponent(props.whatsappMsg || '');
  return `${base}/${phone}?text=${text}`;
});

const letters = computed(() => props.hoverText.split(''));

/* ---------- animação de entrada (1x por reload) ---------- */
const titleEl = ref<HTMLElement | null>(null);

/* coletar TODOS os <details> para abrir em desktop */
const navDetails = ref<HTMLDetailsElement[]>([]);
const setNavDetail: VNodeRef = (el) => {
  if (!el) return;
  const node: HTMLElement | null =
    (el as ComponentPublicInstance)?.$el
      ? (el as ComponentPublicInstance).$el as HTMLElement
      : (el as unknown as HTMLElement);
  if (node && node.tagName === 'DETAILS') navDetails.value.push(node as HTMLDetailsElement);
};

onMounted(() => {
  if (titleEl.value) {
    const play = () => {
      titleEl.value!.classList.add('entry-play');
      const total = 640 + letters.value.length * 28 + 80;
      setTimeout(() => {
        titleEl.value!.classList.remove('entry-play');
        titleEl.value!.classList.add('entry-done');
      }, total);
    };
    if (props.playOnVisible) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) { play(); io.disconnect(); }
      }, { threshold: 0.2 });
      io.observe(titleEl.value);
    } else {
      play();
    }
  }

  // abrir acordeões automaticamente no desktop
  const mq = window.matchMedia('(min-width: 768px)');
  const openForDesktop = () => { if (mq.matches) navDetails.value.forEach(d => d.open = true); };
  openForDesktop();
  mq.addEventListener?.('change', openForDesktop);
});
</script>

<template>
  <footer class="relative border-t border-zinc-800 bg-black text-zinc-100">
    <div class="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-zinc-700/70 to-transparent"></div>

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- topo -->
      <div class="py-12 lg:py-16">
        <div class="relative mx-auto max-w-4xl text-center">
          <div ref="titleEl" class="title-wrap inline-block select-none text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
            <span v-for="(ch, i) in letters" :key="i" class="letter inline-block min-w-[0.5ch]" :style="{ '--i': i }">
              {{ ch }}
              <span aria-hidden="true" class="fall-shadow block h-1 w-full rounded-full bg-zinc-700/70"></span>
            </span>
          </div>
        </div>
      </div>

      <div class="h-px w-full bg-zinc-800"></div>

      <!-- conteúdo principal: 2 áreas com space-between -->
      <div class="py-12 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <!-- ESQUERDA -->
        <div class="max-w-md md:basis-[360px] md:shrink-0">
          <div class="inline-flex items-center gap-3">
            <span class="rounded-xl border border-zinc-700 bg-black/80 px-3 py-1.5 text-sm font-bold tracking-tight text-zinc-100 shadow-md backdrop-blur-sm">dfm</span>
            <span class="text-lg sm:text-xl font-medium leading-none text-white/90">{{ brandTagline }}</span>
          </div>
          <div class="mt-6">
            <a :href="waLink" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center rounded-2xl border border-zinc-700 bg-gradient-to-b from-zinc-900 to-zinc-950 px-5 py-2.5 text-sm font-medium text-zinc-100 shadow-md transition hover:translate-y-[-2px] hover:shadow-lg hover:border-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600">
              Chat via WhatsApp
            </a>
          </div>
        </div>

        <!-- DIREITA: mobile = acordeão | desktop = 3 colunas à direita -->
        <div class="w-full md:max-w-4xl md:ml-8">
          <div class="grid gap-6 grid-cols-1 md:grid-cols-3 md:text-right">
            <!-- Navegar -->
            <details class="footer-acc" role="group" open :ref="setNavDetail">
              <summary class="footer-acc__summary" aria-controls="nav-navegar">Navegar</summary>
              <div id="nav-navegar" class="footer-acc__content">
                <ul class="space-y-2">
                  <li v-for="(item, i) in navPrimary" :key="i">
                    <a :href="item.href" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener noreferrer' : undefined" class="footer-link">
                      {{ item.label }}
                    </a>
                  </li>
                </ul>
              </div>
            </details>

            <!-- Informacional -->
            <details class="footer-acc" role="group" :ref="setNavDetail">
              <summary class="footer-acc__summary" aria-controls="nav-info">Informacional</summary>
              <div id="nav-info" class="footer-acc__content">
                <ul class="space-y-2">
                  <li v-for="(item, i) in infoNav" :key="i">
                    <a :href="item.href" class="footer-link">{{ item.label }}</a>
                  </li>
                </ul>
              </div>
            </details>

            <!-- Social -->
            <details class="footer-acc" role="group" :ref="setNavDetail">
              <summary class="footer-acc__summary" aria-controls="nav-social">Social</summary>
              <div id="nav-social" class="footer-acc__content">
                <ul class="space-y-2">
                  <li v-for="(s, i) in social" :key="i">
                    <a :href="s.href" target="_blank" rel="noopener noreferrer" class="footer-link">
                      <span class="sr-only" v-if="s.srLabel">{{ s.srLabel }}</span>
                      <span aria-hidden="true">{{ s.label }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>

      <div class="h-px w-full bg-zinc-800"></div>

      <!-- final -->
      <div class="flex flex-col gap-3 items-start justify-between py-8 text-xs text-zinc-500 md:flex-row md:items-center">
        <p>© {{ year }} Digital feito à mão — dedicado ao DenisCode</p>
        <p class="opacity-80">Feito com foco em desempenho, acessibilidade e simplicidade.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ===== animação de entrada ===== */
@keyframes fallIn {
  0%   { transform: translateY(-120px) scale(1.02); opacity: 0; }
  60%  { transform: translateY(8px);  opacity: 1; }
  78%  { transform: translateY(-5px) scale(1.01); }
  90%  { transform: translateY(2px)  scale(0.998); }
  100% { transform: translateY(0)     scale(1); }
}
@keyframes shadowPuff {
  0%   { transform: scaleX(0); opacity: 0; }
  60%  { transform: scaleX(1); opacity: .45; }
  100% { transform: scaleX(.35); opacity: .2; }
}
/* letras caindo */
.title-wrap.entry-play .letter {
  animation: fallIn 640ms cubic-bezier(.2,.85,.35,1.2) both;
  animation-delay: calc(var(--i) * 28ms);
}
/* sombra: só durante a entrada */
.fall-shadow { opacity: 0; }
.title-wrap.entry-play .fall-shadow {
  animation: shadowPuff 640ms ease-out both;
  animation-delay: calc(var(--i) * 28ms);
  opacity: 1;
}
.title-wrap.entry-done .fall-shadow { animation: none; opacity: 0; }

/* hover micro-interação */
@keyframes hoverPop {
  0%   { transform: translateY(0) rotate(0) scale(1); }
  40%  { transform: translateY(-3px) rotate(0.6deg) scale(1.06); }
  100% { transform: translateY(0) rotate(0) scale(1); }
}
.title-wrap:hover .letter {
  animation: hoverPop 260ms cubic-bezier(.2,.85,.35,1) both;
  animation-delay: calc(var(--i) * 12ms);
}

/* ===== MOBILE: acordeão com cartão ===== */
.footer-acc {
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 14px;
  background: rgba(255,255,255,.03);
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 2px rgba(0,0,0,.2);
  transition: border-color .2s ease, background .3s ease;
}
.footer-acc:hover { border-color: rgba(255,255,255,.15); background: rgba(255,255,255,.05); }
.footer-acc__summary {
  list-style: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 0.75rem;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: rgb(161 161 170);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  transition: color .2s ease;
}
.footer-acc__summary::-webkit-details-marker { display: none; }
.footer-acc__summary::after {
  content: '';
  width: 10px; height: 10px;
  border-right: 2px solid rgb(161 161 170);
  border-bottom: 2px solid rgb(161 161 170);
  transform: rotate(45deg);
  transition: transform .3s ease, border-color .2s ease;
}
.footer-acc[open] .footer-acc__summary::after { transform: rotate(225deg); border-color: white; }
.footer-acc[open] .footer-acc__summary { color: white; }
.footer-acc__content { padding: 8px 16px 16px; border-top: 1px solid rgba(255,255,255,.08); }
.footer-link { display: inline-block; padding: 6px 2px; color: rgb(212 212 216); transition: color .15s ease, transform .15s ease; }
.footer-link:hover { color: white; transform: translateX(2px); }

/* ===== DESKTOP (≥768px): flat, alinhado à direita ===== */
@media (min-width: 768px) {
  .footer-acc { border: 0; background: transparent; box-shadow: none; }
  .footer-acc__summary { padding: 0; cursor: default; color: rgb(161 161 170); justify-content: flex-end; }
  .footer-acc__summary::after { display: none; }
  .footer-acc__content { padding: 16px 0 0 0; border-top: 0; }
  .footer-link { display: block; text-align: right; }
}

/* EXTRA: desabilita QUALQUER hover de cartão no desktop (só links têm hover) */
@media (min-width: 768px) {
  .footer-acc,
  .footer-acc:hover {
    border: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
}

/* acessibilidade */
@media (prefers-reduced-motion: reduce) {
  .title-wrap .letter,
  .title-wrap .fall-shadow,
  .title-wrap:hover .letter { animation: none !important; }
}
</style>
