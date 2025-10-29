<!-- src/components/ContactWhats.vue -->
<template>
  <!-- ❌ removido id="contact" para não conflitar com <section id="contato"> do index.astro -->
  <section class="bg-white">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <!-- Título -->
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-neutral-900">
        Formulários são chatos e a gente sabe!
      </h2>

      <!-- Card -->
      <div
        class="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8
               shadow-[0_1px_0_#0000000d,0_1px_3px_#0000000a]
               transition-transform motion-safe:hover:-translate-y-px"
      >
        <!-- GRID -->
        <div class="grid gap-8 md:grid-cols-[1fr_auto] md:grid-rows-[auto_auto]">
          <!-- Conteúdo (col1,row1) -->
          <div class="space-y-3">
            <p class="text-sm font-semibold text-neutral-700">Prefere outra forma?</p>

            <a
              :href="`mailto:${email}`"
              class="inline-flex items-center gap-3 rounded-lg px-2 py-1.5 text-neutral-900 hover:bg-neutral-50
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 transition"
              aria-label="Enviar um e-mail"
            >
              <span class="opacity-70" v-html="icons.mail" aria-hidden="true" />
              <span class="font-semibold tracking-tight">{{ email }}</span>
            </a>

            <p class="text-sm text-neutral-500">Resposta rápida em horário comercial.</p>
          </div>

          <!-- CTA (col2, row 1-2) -->
          <div class="md:row-span-2 md:self-center md:justify-self-end">
            <a
              :href="whatsLink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat via WhatsApp"
              class="group inline-flex items-center gap-3 rounded-full px-7 py-3.5
                     text-base font-semibold tracking-tight text-white
                     bg-neutral-900 ring-1 ring-black/10
                     shadow-[0_8px_18px_rgba(0,0,0,0.18)]
                     transition
                     hover:bg-neutral-800 motion-safe:hover:-translate-y-0.5
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
            >
              <span>Chat via WhatsApp</span>
              <svg
                viewBox="0 0 24 24" aria-hidden="true"
                class="h-4 w-4 -translate-y-px transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M9 7h8v8" />
              </svg>
            </a>
          </div>

          <!-- Redes (col1,row2) -->
          <div class="mt-2 flex items-center gap-3">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200
                     text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 focus:outline-none
                     focus-visible:ring-2 focus-visible:ring-neutral-900/20 transition"
              :aria-label="s.aria"
              :title="s.name"
            >
              <span v-html="s.icon" aria-hidden="true" class="h-5 w-5"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    whatsappNumber?: string;   // E.164 ex.: +5511976990921
    email?: string;
    instagram?: string;
    x?: string;
    linkedin?: string;
  }>(),
  {
    whatsappNumber: '+5511976990921',
    email: 'contato@digitalfeitoamao.com',
    instagram: 'https://www.instagram.com/denisc0de',
    x: 'https://x.com/DenisCode_',
    linkedin: 'https://www.linkedin.com/in/denisfelipelopes/',
  }
);

const whatsLink = `https://wa.me/${props.whatsappNumber.replace(/\D/g, '')}`;
const email = props.email;

const icons = {
  mail:
    '<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.5A2.5 2.5 0 1 0 12 16a2.5 2.5 0 0 0 0-5.5Zm5.25-2.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"/></svg>',
  x:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h4.6l5 6.7L17.7 3H21l-7.4 9.9L21 21h-4.6l-5.1-6.8L6.3 21H3l7.5-10L3 3Z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.7-2 3.6-2 3.9 0 4.6 2.6 4.6 6v6h-4v-5.3c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H10V9z"/></svg>',
};

const socials = [
  { name: 'Instagram', href: props.instagram, aria: 'Abrir Instagram', icon: icons.instagram },
  { name: 'X', href: props.x, aria: 'Abrir X (Twitter)', icon: icons.x },
  { name: 'LinkedIn', href: props.linkedin, aria: 'Abrir LinkedIn', icon: icons.linkedin },
];
</script>
