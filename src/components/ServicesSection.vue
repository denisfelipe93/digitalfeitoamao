<script setup lang="ts">
import { computed, ref } from "vue"

type ServiceItem = {
  id: number
  title: string
  tags?: string[]
  description?: string
}

const props = withDefaults(defineProps<{
  contactHref?: string
  initialVisible?: number
  showMoreLabel?: string
  showLessLabel?: string
}>(), {
  contactHref: "#contato",
  initialVisible: 3,
  showMoreLabel: "Ver mais",
  showLessLabel: "Ver menos"
})

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Consultoria em Branding & Positioning",
    tags: ["IDENTIDADE", "POSICIONAMENTO", "ARQUÉTIPOS"],
    description:
      "Definição de posicionamento, linguagem e diretrizes visuais para fortalecer a marca."
  },
  {
    id: 2,
    title: "Consultoria em Marketing Digital",
    tags: ["GROWTH", "FUNIL", "MÍDIA PAGA"],
    description:
      "Planejamento e operação de canais digitais orientados a metas e métricas."
  },
  {
    id: 3,
    title: "Copyrighting",
    tags: ["COPY", "STORYTELLING", "CONVERSÃO"],
    description:
      "Textos criativos e persuasivos para sites, campanhas e redes sociais."
  },
  {
    id: 4,
    title: "Filmagem | Foto edição Studio",
    tags: ["VÍDEO", "EDIÇÃO", "TRATAMENTO"],
    description:
      "Produção e pós de foto e vídeo para campanhas, produtos e institucionais."
  },
  {
    id: 5,
    title: "Gestão Profissional de Mídias Sociais",
    tags: ["PLANEJAMENTO", "CALENDÁRIO", "RELATÓRIOS"],
    description:
      "Gestão ponta a ponta: linha editorial, publicação, engajamento e análise."
  },
  {
    id: 6,
    title: "Criação de Conteúdo",
    tags: ["DESIGN", "MOTION", "REELS/SHORTS"],
    description:
      "Assets estáticos e animados, alinhados à identidade e objetivos de negócio."
  }
]

const expanded = ref(false)
const visibleServices = computed(() =>
  expanded.value ? services : services.slice(0, props.initialVisible)
)
</script>

<template>
  <section id="services" class="relative bg-white scroll-mt-28">
    <!-- Título -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
      <h2 class="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-black">
        SERVIÇOS
      </h2>
    </div>

    <!-- Lista -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 md:mt-14">
      <TransitionGroup name="fade-list" tag="ul" class="space-y-7 md:space-y-9 overflow-visible">
        <li v-for="item in visibleServices" :key="item.id" class="relative isolate will-change-transform">
          <article
            class="group w-full bg-white rounded-3xl md:rounded-[28px]
                   border border-zinc-200/80
                   px-5 sm:px-7 md:px-10 py-7 md:py-10
                   transition-all duration-300 ease-out
                   hover:scale-[1.02] hover:z-10 hover:shadow-xl hover:shadow-black/5
                   hover:card-breathe"
          >
            <div class="grid grid-cols-12 items-start gap-4 md:gap-6">
              <!-- Índice -->
              <div class="col-span-2 md:col-span-1">
                <span
                  class="inline-flex h-8 w-8 items-center justify-center rounded-full
                         text-xs font-semibold tracking-wider bg-zinc-900 text-white"
                >
                  {{ String(item.id).padStart(2, '0') }}
                </span>
              </div>

              <!-- Título -->
              <h3
                class="col-span-10 md:col-span-4 text-2xl sm:text-3xl md:text-4xl font-serif leading-tight"
              >
                {{ item.title }}
              </h3>

              <!-- Tags -->
              <div class="col-span-12 md:col-span-3 order-3 md:order-none">
                <ul
                  class="flex flex-wrap gap-x-3 gap-y-1 text-[12px] sm:text-[13px] tracking-wide text-orange-700/90"
                >
                  <li
                    v-for="(t, i) in item.tags"
                    :key="i"
                    class="font-mono uppercase"
                  >
                    {{ t }}
                  </li>
                </ul>
              </div>

              <!-- Descrição (agora alinhada à direita com padding compensado) -->
              <p
                class="col-span-12 md:col-span-3
                       font-sans md:font-extrabold font-semibold
                       text-base md:text-xl leading-snug text-zinc-900 tracking-tight
                       pl-6 md:pl-10"
              >
                {{ item.description }}
              </p>
            </div>
          </article>
        </li>
      </TransitionGroup>

      <!-- Linha de botões -->
      <div
        class="mt-8 md:mt-10 flex items-center justify-between
               flex-wrap gap-4"
      >
        <!-- Ver mais -->
        <button
          class="inline-flex items-center gap-2 rounded-full border border-zinc-300
                 px-5 py-2.5 text-sm font-medium transition-colors
                 hover:bg-zinc-900 hover:text-white"
          :aria-expanded="expanded"
          @click="expanded = !expanded"
        >
          {{ expanded ? (showLessLabel || 'Ver menos') : (showMoreLabel || 'Ver mais') }}
          <svg
            class="size-4 transition-transform"
            :class="expanded ? 'rotate-180' : ''"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <!-- Entrar em contato -->
        <a
          :href="contactHref"
          class="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white
                 px-6 py-3 text-sm font-semibold tracking-tight
                 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-zinc-900/30"
        >
          Entrar em contato
          <svg
            class="size-4"
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
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes breathe {
  0% { transform: scale(1.02); }
  50% { transform: scale(1.027); }
  100% { transform: scale(1.02); }
}
.card-breathe {
  animation: breathe 1.5s ease-in-out infinite;
  transform-origin: center;
}
@media (prefers-reduced-motion: reduce) {
  .card-breathe {
    animation: none !important;
  }
}

/* animação de entrada */
.fade-list-enter-active, .fade-list-leave-active { transition: all 0.25s ease; }
.fade-list-enter-from { opacity: 0; transform: translateY(8px); }
.fade-list-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
