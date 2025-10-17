<script setup lang="ts">
type ServiceItem = {
  id: number
  title: string
  tags?: string[]
  description?: string
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Consultoria em Branding & Positioning",
    tags: ["Identidade", "Posicionamento", "Arquétipos"],
    description:
      "Definição de posicionamento, linguagem e diretrizes visuais para fortalecer a marca."
  },
  {
    id: 2,
    title: "Consultoria em Marketing Digital",
    tags: ["Growth", "Funil", "Mídia Paga"],
    description:
      "Planejamento e operação de canais digitais orientados a metas e métricas."
  },
  {
    id: 3,
    title: "Copyrighting",
    tags: ["Copy", "Storytelling", "Conversão"],
    description:
      "Textos criativos e persuasivos para sites, campanhas e redes sociais."
  },
  {
    id: 4,
    title: "Filmagem & Fotograia",
    tags: ["Vídeo", "Edição", "Tratamento"],
    description:
      "Produção e pós de foto e vídeo para campanhas, produtos e institucionais."
  },
  {
    id: 5,
    title: "Gestão Profissional de Mídias Sociais",
    tags: ["Planejamento", "Calendário", "Relatórios"],
    description:
      "Gestão ponta a ponta: linha editorial, publicação, engajamento e análise."
  },
  {
    id: 6,
    title: "Criação de Conteúdo",
    tags: ["Design", "Motion", "Reels/Shorts"],
    description:
      "Assets estáticos e animados, alinhados à identidade e objetivos de negócio."
  }
]
</script>

<template>
  <section id="services" class="relative bg-white">
    <!-- Headline grande de fundo -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2
        class="select-none font-extrabold tracking-tight text-[16vw] leading-[0.8] -mb-6 text-black/10"
        aria-hidden="true"
      >
        SERVIÇOS
      </h2>
    </div>

    <!-- Lista -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ul class="divide-y divide-zinc-200/80">
        <li
          v-for="item in services"
          :key="item.id"
          class="group relative will-change-transform"
        >
          <article
            class="grid grid-cols-12 items-center gap-4 py-7 md:py-10 transition-all duration-300
                   rounded-2xl md:rounded-3xl
                   bg-white/60 backdrop-blur supports-[backdrop-filter]:backdrop-blur
                   ring-1 ring-zinc-200/80
                   hover:ring-zinc-900/20 hover:shadow-xl hover:shadow-black/5
                   hover:scale-[1.01] hover:card-breathe"
          >
            <!-- Índice -->
            <div class="col-span-2 md:col-span-1 pl-4 md:pl-6">
              <span
                class="inline-flex h-8 w-8 items-center justify-center rounded-full
                       text-xs font-semibold tracking-wider
                       bg-zinc-900 text-white"
                >{{ String(item.id).padStart(2, '0') }}</span
              >
            </div>

            <!-- Título -->
            <h3 class="col-span-10 md:col-span-3 text-3xl md:text-4xl font-serif leading-none px-2">
              {{ item.title }}
            </h3>

            <!-- Tags -->
            <div
              class="col-span-12 md:col-span-3 order-3 md:order-none text-[13px] leading-5 px-2 text-orange-700/90"
              v-if="item.tags?.length"
            >
              <ul class="flex flex-wrap gap-x-3 gap-y-1">
                <li v-for="(t, i) in item.tags" :key="i" class="font-mono uppercase tracking-wide">
                  {{ t }}
                </li>
              </ul>
            </div>

            <!-- Descrição -->
            <p class="col-span-12 md:col-span-4 text-sm md:text-base text-zinc-700 px-2" v-if="item.description">
              {{ item.description }}
            </p>

            <!-- CTA -->
            <div class="col-span-12 md:col-span-1 flex md:justify-end px-2 md:pr-6">
              <button
                class="inline-flex items-center gap-2 rounded-full border border-zinc-300/80
                       px-4 py-2 text-sm transition-colors
                       group-hover:bg-zinc-900 group-hover:text-white"
                aria-label="Saber mais sobre {{ item.title }}"
              >
                Ver
                <svg
                  class="size-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Glow sutil -->
            <span
              class="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-300
                     group-hover:opacity-100"
              aria-hidden="true"
            >
              <span
                class="absolute -inset-x-6 -inset-y-2 blur-2xl rounded-[40px]
                       bg-gradient-to-r from-transparent via-zinc-900/5 to-transparent"
              />
            </span>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
@keyframes breathe {
  0%   { transform: scale(1.01); }
  50%  { transform: scale(1.018); }
  100% { transform: scale(1.01); }
}
.card-breathe {
  animation: breathe 1.8s ease-in-out infinite;
  transform-origin: center;
}
@media (prefers-reduced-motion: reduce) {
  .card-breathe { animation: none !important; }
}
</style>
