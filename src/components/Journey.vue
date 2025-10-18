<template>
  <section class="relative bg-black text-white py-24">
    <!-- mesh/glow sutil de fundo (coluna direita) -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute right-[-10%] top-1/3 h-96 w-96 rounded-full bg-lime-400/8 blur-3xl"></div>
      <div class="absolute right-[5%] top-[55%] h-72 w-72 rounded-full bg-cyan-400/6 blur-3xl"></div>
    </div>

    <div class="relative mx-auto w-full max-w-6xl px-6">
      <!-- Título em 3 linhas com “risco” orgânico -->
      <h2 class="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
        <span class="block bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
          Nós entregamos valores,
        </span>
        <span class="block">dedicação e qualidade.</span>

        <span class="relative mt-2 inline-block">
          <span class="block text-slate-400 font-semibold">— não quantidade.</span>
          <svg class="absolute -bottom-2 left-0 w-[320px] opacity-60" viewBox="0 0 320 16" fill="none">
            <path d="M2 12 C80 -6, 240 24, 318 8" stroke="#B3F31B" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </span>
      </h2>

      <!-- Conteúdo: Stepper + Depoimento -->
      <div class="mt-12 grid gap-12 md:grid-cols-12">
        <!-- LEFT: stepper/cards -->
        <div class="md:col-span-7">
          <div class="relative">
            <!-- trilho vertical -->
            <div aria-hidden="true" class="absolute left-6 top-6 bottom-6 w-px bg-white/10"></div>

            <ul class="space-y-0">
              <!-- ITEM 01 -->
              <li class="relative pl-16">
                <!-- ícone (aperture/câmera) -->
                <span aria-hidden="true" class="icon-dot">
                  <svg viewBox="0 0 24 24" class="h-6 w-6">
                    <path fill="currentColor"
                      d="M12 4a8 8 0 100 16 8 8 0 000-16Zm0 2.5c.7 0 1.36.14 1.96.4l-1.96 3.4-1.96-3.4c.6-.26 1.26-.4 1.96-.4Zm-5.1 3.4A5.5 5.5 0 016.5 8.5l3.4 1.96-3.4 1.96a5.5 5.5 0 01.6-2.02Zm5.1 8a5.5 5.5 0 01-1.96-.4l1.96-3.4 1.96 3.4c-.6.26-1.26.4-1.96.4Zm4.5-2.08L13.5 10.5l3.4-1.96a5.5 5.5 0 01.6 2.02 5.5 5.5 0 01-.6 2.02Z" />
                  </svg>
                </span>

                <div
                  class="flex items-center gap-6 px-6 py-6 bg-white/[.045] ring-1 ring-white/10 select-none">
                  <span class="w-10 shrink-0 text-sm font-medium text-slate-400">01</span>
                  <p class="text-lg">Briefing</p>
                </div>
              </li>

              <!-- ITEM 02 -->
              <li class="relative pl-16">
                <!-- ícone (alvo/estratégia) -->
                <span aria-hidden="true" class="icon-dot">
                  <svg viewBox="0 0 24 24" class="h-6 w-6">
                    <path fill="currentColor"
                      d="M12 3a9 9 0 109 9 9 9 0 00-9-9zm0 2a7 7 0 11-7 7 7 7 0 017-7zm0 3a4 4 0 104 4 4 4 0 00-4-4zm0 2a2 2 0 11-2 2 2 2 0 012-2z"/>
                  </svg>
                </span>

                <div
                  class="flex items-center gap-6 px-6 py-6 bg-white/[.045] ring-1 ring-white/10 select-none">
                  <span class="w-10 shrink-0 text-sm font-medium text-slate-400">02</span>
                  <p class="text-lg">Abordando o escopo e definindo estratégias</p>
                </div>
              </li>

              <!-- ITEM 03 -->
              <li class="relative pl-16">
                <!-- ícone (presente/entrega) -->
                <span aria-hidden="true" class="icon-dot">
                  <svg viewBox="0 0 24 24" class="h-6 w-6">
                    <path fill="currentColor"
                      d="M20 7h-3.17A3 3 0 0012 3a3 3 0 00-4.83 4H4a1 1 0 00-1 1v3h18V8a1 1 0 00-1-1zM9 5a1 1 0 11.001 1.999A1 1 0 019 5zm6 0a1 1 0 110 2 1 1 0 010-2zM3 13v6a1 1 0 001 1h7v-7H3zm10 0v7h7a1 1 0 001-1v-6h-8z"/>
                  </svg>
                </span>

                <div
                  class="flex items-center gap-6 px-6 py-6 bg-white/[.045] ring-1 ring-white/10 select-none">
                  <span class="w-10 shrink-0 text-sm font-medium text-slate-400">03</span>
                  <p class="text-lg">Entrega do seu projeto com carinho</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- RIGHT: depoimento + CTA -->
        <div class="md:col-span-5">
          <figure class="relative bg-white/[.045] ring-1 ring-white/10 p-7 noise">
            <div class="absolute left-0 top-0 h-full w-1 bg-lime-400/70"></div>

            <blockquote class="pl-4 text-slate-200/95 text-lg italic leading-relaxed">
              Você viverá cada etapa do processo de nosso trabalho, desde o clique da
              câmera, os risos, até o trabalho final.
            </blockquote>

            <figcaption class="mt-6 flex items-center gap-4">
              <img
                src="/images/thalopes.webp"
                alt="Tha Lopes"
                class="h-12 w-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p class="font-semibold">/ Tha Lopes</p>
                <p class="text-slate-500 text-sm">CEO &amp; Founder @thalopesqueiroz</p>
              </div>
            </figcaption>
          </figure>

          <!-- CTA com energia -->
          <div class="relative mt-8 inline-block">
            <div aria-hidden="true" class="absolute inset-0 rounded-full bg-lime-400/20 blur-xl"></div>
            <button
              class="relative inline-flex items-center gap-2 rounded-full
                     bg-gradient-to-b from-lime-400 to-lime-300 px-6 py-3
                     font-medium text-black shadow-[0_12px_40px_-12px_rgba(179,243,27,.45)]
                     transition hover:from-lime-300 hover:to-lime-200 focus:outline-none
                     focus-visible:ring-2 focus-visible:ring-lime-300">
              Agendar conversa
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// componente estático (sem dependências)
</script>

<style scoped>
/* textura sutil tipo “papel” para o card do depoimento */
.noise::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* Aumentei a presença para ficar perceptível */
  opacity: .12;
  background-image:
    /* granulação fininha */
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.06) 0,
      rgba(255,255,255,0.06) 1px,
      transparent 1px,
      transparent 2px
    ),
    /* granulação cruzada */
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.04) 0,
      rgba(255,255,255,0.04) 1px,
      transparent 1px,
      transparent 3px
    );
  mix-blend-mode: overlay;
}
/* bolinha/ícone do stepper com cor de marca */
.icon-dot{
  position:absolute; left:3rem; top:50%; transform:translateY(-50%);
  display:grid; place-items:center;
  width:1.75rem; height:1.75rem; border-radius:9999px;
  background: rgba(179,243,27,.9); color:#1a1a1a;
  box-shadow: 0 6px 18px -8px rgba(179,243,27,.55);
}

/* --- quer micro-hover nos cards? (descomente) --- */
/*
.card:hover{ background:rgba(255,255,255,.06); box-shadow: inset 0 0 0 1px rgba(255,255,255,.12); }
*/
</style>
