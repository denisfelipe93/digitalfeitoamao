<template>
  <section class="beige-bg py-24 text-[#233037]">
    <div class="mx-auto w-full max-w-6xl px-6">
      <!-- Título responsivo -->
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#233037]">
        <span class="block">Nós entregamos valores,</span>
        <span class="block">dedicação e qualidade.</span>
        <span class="relative mt-3 inline-block">
          <span class="block font-semibold text-[#495059]">— não quantidade.</span>
          <svg class="absolute -bottom-2 left-0 w-[300px] sm:w-[340px] opacity-80" viewBox="0 0 340 18" fill="none">
            <path d="M2 14 C100 0, 240 26, 338 10" stroke="#CC7E6B" stroke-width="6" stroke-linecap="round"/>
          </svg>
        </span>
      </h2>

      <!-- Conteúdo -->
      <div class="mt-12 sm:mt-14 grid gap-8 sm:gap-10 md:grid-cols-12 items-start">
        <div class="md:col-span-7 space-y-4">
          <div class="card-paper">
            <span class="chip bg-[#E3D8CB] text-[#6B5E52]">01</span>
            <p class="item text-[#2F3A40]">Briefing</p>
          </div>

          <div class="card-paper">
            <span class="chip bg-[#D9CED4] text-[#574E53]">02</span>
            <p class="item text-[#2F3A40]">Abordando o escopo e definindo estratégias</p>
          </div>

          <div class="card-paper">
            <span class="chip bg-[#E6CEC5] text-[#5A4942]">03</span>
            <p class="item text-[#2F3A40]">Entrega do seu projeto com carinho</p>
          </div>
        </div>

        <!-- Depoimento + CTA (WhatsApp, acessível) -->
        <div class="md:col-span-5">
          <figure class="quote-paper self-start">
            <blockquote class="quote-text text-[#445059]">
              Você viverá cada etapa do processo de nosso trabalho, desde o clique da
              câmera, os risos, até o trabalho final.
            </blockquote>
            <figcaption class="mt-6 flex items-center gap-4">
              <img
                src="/images/thalopes.webp"
                srcset="/images/thalopes.webp 1x, /images/thalopes.webp 2x"
                sizes="(min-width: 768px) 48px, 40px"
                alt="Tha Lopes"
                class="h-12 w-12 rounded-full object-cover ring-1 ring-white/70"
                loading="lazy"
              />
              <div>
                <p class="font-semibold text-[#2B353B]">/ Tha Lopes</p>
                <p class="text-sm text-[#5C6A72]">CEO &amp; Founder @thalopesqueiroz</p>
              </div>
            </figcaption>
          </figure>

          <!-- CTA WhatsApp -->
          <a
            href="https://wa.me/5511976990921?text=Oi%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20conversa."
            target="_blank" rel="noopener"
            class="btn-terracotta inline-flex items-center gap-2 mt-8"
            aria-label="Agendar conversa com Tha Lopes pelo WhatsApp"
          >
            Agendar conversa
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// estático :)
</script>

<style scoped>
/* === THEME: ROSE === */
.beige-bg{
  background: linear-gradient(180deg,#F8EFEC 0%, #F3E6E1 46%, #ECDAD2 100%);

  --ink:#233037;
  --ink-soft:#4C5056;
  --paper:#FBF6F2;
  --paper-border:#E7D5C9;
  --card-shadow:0 8px 20px -14px rgba(39,40,41,.16), inset 0 1px 0 rgba(255,255,255,.35);
  --accent:#CC7E6B;
  --accent-ring: color-mix(in oklab, var(--accent) 60%, white);

  --rule-gap-cards: 18px;
  --rule-color-cards: rgba(35,48,55,.10);
  --rule-gap-quote: 22px;
  --rule-color-quote: rgba(35,48,55,.075);
}
.beige-bg::before{
  content:""; position:absolute; inset:0; pointer-events:none; opacity:.05;
  background-image:
    repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0,rgba(0,0,0,.05) 1px,transparent 1px,transparent 3px),
    repeating-linear-gradient(90deg,rgba(0,0,0,.035) 0,rgba(0,0,0,.035) 1px,transparent 1px,transparent 4px);
  mix-blend-mode:multiply;
}


/* ====== APLICAÇÃO DOS TOKENS ====== */

/* Fundo + textura */
.beige-bg{
  position: relative;
  background: linear-gradient(180deg,var(--bg0) 0%, var(--bg1) 46%, var(--bg2) 100%);
  color: var(--ink);
}
.beige-bg::before{
  content:""; position:absolute; inset:0; pointer-events:none; opacity:.05;
  background-image:
    repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0,rgba(0,0,0,.05) 1px,transparent 1px,transparent 3px),
    repeating-linear-gradient(90deg,rgba(0,0,0,.035) 0,rgba(0,0,0,.035) 1px,transparent 1px,transparent 4px);
  mix-blend-mode:multiply;
}

/* Título e subtítulo: usa tokens (sobrepõe Tailwind inline) */
.beige-bg h2{ color: var(--ink) !important; }
.beige-bg h2 .font-semibold{ color: var(--ink-soft) !important; }
/* Sublinhado decorativo do título usa o acento do tema */
.beige-bg h2 svg path{ stroke: var(--accent); }

/* ---------- Cards (papel de caderno) ---------- */
.card-paper{
  position:relative; overflow:hidden;
  display:flex; align-items:center; gap:1rem;
  padding:1rem 1.25rem;
  border-radius: 18px;
  background: var(--paper);
  border:1px solid var(--paper-border);
  box-shadow: var(--card-shadow);
}
.card-paper::before{
  content:""; position:absolute; inset:0; z-index:0; pointer-events:none;
  background-image:
    repeating-linear-gradient(0deg, var(--rule-color-cards) 0 1px, transparent 1px var(--rule-gap-cards));
}
.card-paper > *{ position:relative; z-index:1; }
.item{ font-size:1.125rem; color: var(--ink); }

/* Chips (aplicação por tema — mantém suas classes, mas dá fallback unificado) */
.chip{
  display:inline-flex; align-items:center; justify-content:center;
  width:2.5rem; height:2rem; border-radius:.75rem;
  font-weight:700; font-size:.9rem; letter-spacing:.02em;
  background: var(--chip-bg);
  color: var(--chip-fg);
}

/* ---------- Depoimento ---------- */
.quote-paper{
  position:relative; overflow:hidden;
  background: var(--paper);
  border:1px solid var(--paper-border);
  border-radius:18px;
  box-shadow: var(--card-shadow);
  padding:1.5rem;
}
.quote-paper::before{
  content:""; position:absolute; inset:0; z-index:0; pointer-events:none;
  background-image:
    repeating-linear-gradient(0deg, var(--rule-color-quote) 0 1px, transparent 1px var(--rule-gap-quote));
}
.quote-text{ margin:0; color: var(--ink-soft); }

/* Figcaption: nome/cargo usando tokens */
figcaption .font-semibold{ color: var(--ink); }
figcaption .text-sm{ color: color-mix(in oklab, var(--ink) 55%, white); }

/* ---------- CTA ---------- */
.btn-terracotta{
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.9rem 1.25rem; border-radius:9999px;
  background: var(--accent);
  color: var(--accent-contrast);
  font-weight:700; border:1px solid color-mix(in oklab, var(--accent) 20%, black);
  box-shadow: 0 8px 20px -14px rgba(39,40,41,.16);
  transition: transform .15s ease, filter .15s ease, box-shadow .15s ease;
  text-decoration: none;
}
.btn-terracotta:hover{ transform: translateY(-1px); filter: brightness(1.03); }
.btn-terracotta:focus-visible{
  outline: none;
  box-shadow:
    0 0 0 2px var(--accent-ring),
    0 8px 20px -14px rgba(39,40,41,.16);
}

/* ---------- Acessibilidade: reduzir animações ---------- */
@media (prefers-reduced-motion: reduce){
  .btn-terracotta, .card-paper { transition: none; }
}
</style>
