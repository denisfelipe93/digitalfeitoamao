<template>
  <section class="relative isolate bg-black text-white py-24 overflow-hidden">
    <!-- mesh/brush de fundo (bem sutil, orgânico) -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-pink-400/10 blur-3xl"></div>
      <div class="absolute right-[-8%] top-[55%] h-96 w-96 rounded-full bg-lime-400/10 blur-[90px]"></div>
    </div>

    <div class="relative mx-auto w-full max-w-6xl px-6">
      <!-- Título com gradiente + sublinhado “manual” -->
      <h2 class="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
        <span class="block bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
          Nós entregamos valores,
        </span>
        <span class="block">dedicação e qualidade.</span>

        <span class="relative mt-3 inline-block">
          <span class="block text-slate-400 font-semibold">— não quantidade.</span>
          <!-- traço orgânico -->
          <svg class="absolute -bottom-2 left-0 w-[340px] opacity-80"
               viewBox="0 0 340 18" fill="none">
            <path d="M2 14 C100 0, 240 26, 338 10"
                  stroke="#B3F31B" stroke-width="4" stroke-linecap="round"
                  class="hand-stroke"/>
          </svg>
        </span>
      </h2>

      <!-- Conteúdo -->
      <div class="mt-14 grid gap-12 md:grid-cols-12 items-start">
        <!-- LEFT: Stepper “sticker” criativo -->
        <div class="md:col-span-7">
          <ol class="relative pl-10 space-y-3">
            <!-- trilho pontilhado -->
            <span aria-hidden="true"
                  class="absolute left-4 top-2 bottom-2 border-l border-dashed border-white/20"></span>

            <!-- ITEM -->
            <li class="relative">
              <!-- dot gradient -->
              <span class="dot"></span>
              <div class="card">
                <span class="etapa">01</span>
                <p class="item">Briefing</p>
              </div>
            </li>

            <li class="relative">
              <span class="dot"></span>
              <div class="card">
                <span class="etapa">02</span>
                <p class="item">Abordando o escopo e definindo estratégias</p>
              </div>
            </li>

            <li class="relative">
              <span class="dot"></span>
              <div class="card">
                <span class="etapa">03</span>
                <p class="item">Entrega do seu projeto com carinho</p>
              </div>
            </li>
          </ol>
        </div>

        <!-- RIGHT: Depoimento “editorial” + CTA -->
        <div class="md:col-span-5">
          <figure class="quote">
            <div class="quote-bar" aria-hidden="true"></div>
            <blockquote class="text-slate-100/95 text-lg leading-relaxed italic">
              Você viverá cada etapa do processo de nosso trabalho, desde o clique da
              câmera, os risos, até o trabalho final.
            </blockquote>

            <figcaption class="mt-6 flex items-center gap-4">
              <img
                src="/images/thalopes.webp"
                alt="Tha Lopes"
                class="h-12 w-12 rounded-full object-cover ring-2 ring-white/10"
                loading="lazy"
              />
              <div>
                <p class="font-semibold">/ Tha Lopes</p>
                <p class="text-slate-500 text-sm">CEO &amp; Founder @thalopesqueiroz</p>
              </div>
            </figcaption>
          </figure>

          <button class="cta mt-8">
            <span>Agendar conversa</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// componente estático
</script>

<style scoped>
/* ——— micro animações e texturas ——— */
@keyframes shimmer { from {opacity:.65} to {opacity:1} }
.hand-stroke { filter: drop-shadow(0 6px 24px rgba(179,243,27,.25)); }

/* timeline dots */
.dot{
  position:absolute; left:0.875rem; top:1.05rem;
  width:14px; height:14px; border-radius:9999px;
  background: radial-gradient(circle at 35% 35%, #ECFEB0 0%, #B3F31B 55%, #7BD300 100%);
  box-shadow: 0 10px 22px -10px rgba(179,243,27,.55);
}

/* cards: vidro + papel (sem data-uri) */
.card{
  display:flex; align-items:center; gap:1rem;
  padding:1rem 1.25rem;
  background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.03));
  border:1px solid rgba(255,255,255,.08);
  border-radius: .85rem; /* toque mais orgânico */
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
  /* textura leve sem SVG inline */
  background-image:
    repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0, rgba(255,255,255,.03) 1px, transparent 1px, transparent 3px),
    linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.03));
  transition: transform .25s ease, border-color .25s ease, background .25s ease;
}
.card:hover{
  transform: translateY(-2px);
  border-color: rgba(255,255,255,.14);
}

/* tipografia dos itens */
.etapa{ width:2.25rem; color:#8A97A7; font-weight:600; font-size:.9rem; letter-spacing:.02em; }
.item{ font-size:1.125rem; }

/* quote “editorial” */
.quote{
  position:relative;
  padding:1.75rem;
  background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.03));
  border:1px solid rgba(255,255,255,.10);
  border-radius: 1rem;
  box-shadow: 0 20px 60px -20px rgba(0,0,0,.45);
}
.quote-bar{
  position:absolute; left:0; top:0; height:100%; width:4px;
  background: linear-gradient(180deg, #B3F31B, #7BD300);
  border-radius: 9999px;
  animation: shimmer 1.8s ease-in-out infinite alternate;
}

/* CTA com borda gradiente e glow */
.cta{
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.85rem 1.25rem; border-radius:9999px;
  color:#0A0A0A; font-weight:600;
  background: linear-gradient(#C8FF4D, #A9F313);
  box-shadow: 0 14px 38px -16px rgba(179,243,27,.6);
  transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
}
.cta:hover{
  transform: translateY(-1px);
  box-shadow: 0 18px 46px -16px rgba(179,243,27,.75);
  filter: brightness(1.02);
}
</style>
