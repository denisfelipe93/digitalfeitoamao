<!-- src/components/ContactSection.vue -->
<template>
  <section id="contact" class="bg-white">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <!-- Top: headline + CTA principal -->
      <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-neutral-900">
          Formulários são chatos e a gente sabe!
        </h2>

        <!-- CTA Whats – protagonista e alinhado -->
        <a
          :href="whatsLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-base font-semibold
                 bg-neutral-900 text-white shadow-sm hover:bg-neutral-800 focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-neutral-900/30 transition"
          aria-label="Chamar no WhatsApp"
        >
          <span class="h-5 w-5" v-html="icons.whatsapp" aria-hidden="true" />
          Chamar no Whats
        </a>
      </div>

      <!-- Card -->
      <div
        class="relative mt-10 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8
               shadow-[0_1px_0_#0000000d,0_1px_3px_#0000000a]
               transition-transform motion-safe:hover:-translate-y-px"
      >
        <!-- conteúdo principal -->
        <div class="grid gap-8 md:grid-cols-2">
          <!-- Bloco texto -->
          <div class="space-y-2">
            <p class="text-sm font-semibold text-neutral-700">Prefere outra forma?</p>

            <a
              class="group inline-flex items-center gap-3 rounded-lg px-2 py-1.5 text-neutral-800 hover:bg-neutral-50
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 transition"
              :href="`mailto:${email}`"
              aria-label="Enviar um e-mail"
            >
              <span class="opacity-70" v-html="icons.mail" aria-hidden="true" />
              <span class="font-semibold tracking-tight">{{ email }}</span>
            </a>

            <p class="text-sm text-neutral-500">
              Resposta rápida em horário comercial. Se for urgente, toque no Whats 😉
            </p>
          </div>

          <!-- Espaço de respiro (evita que nada "flutue") -->
          <div class="min-h-[96px] md:min-h-[120px]"></div>
        </div>

        <!-- divisor sutil -->
        <div class="my-6 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>

        <!-- Rodapé do card: redes alinhadas no canto inferior esquerdo -->
        <div class="flex items-center gap-3">
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
            title=""
          >
            <span v-html="s.icon" aria-hidden="true" class="h-5 w-5"></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    whatsappNumber?: string;   // E.164 ex: +5511976990921
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

// ícones inline (sem libs externas)
const icons = {
  whatsapp:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 3.9A10 10 0 0 0 3.9 20L3 23l3-.9A10 10 0 1 0 20 3.9Zm-7.9 3.7c.2 0 .4 0 .6.5.2.5.8 1.7.8 1.8 0 .2.1.4-.1.6s-.3.5-.5.7c-.2.2-.4.4-.2.7.2.2.9 1.5 2.2 2.1 1.6.8 1.6.5 1.9.3.3-.1.9-.4 1.1-.3.3.1.6.3.7.5.1.2.1 1 .2 1.2.1.2 0 .5-.2.7-.2.2-.7.7-1.7.7s-2-.6-2.3-.7c-.3-.1-1.5-.7-2.6-1.8-1-.9-1.8-2.2-2-2.6-.2-.4-.5-1.4-.6-1.9-.1-.5 0-.9.2-1.2.2-.3.5-.7.8-.8.3-.1.5-.1.6-.1Z"/></svg>',
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
