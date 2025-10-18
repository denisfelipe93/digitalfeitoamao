<template>
  <section class="bg-black text-white py-24">
    <div class="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <!-- Texto principal -->
      <div>
        <h2 class="text-4xl md:text-5xl font-bold leading-tight">
          Nós entregamos valores, dedicação e qualidade
          <span class="block text-gray-500 font-semibold mt-2">— não quantidade.</span>
        </h2>

        <div class="mt-12 space-y-4">
          <div class="border border-gray-800 rounded-lg p-6 flex items-center gap-4">
            <span class="text-gray-500 font-medium w-10 text-sm">01</span>
            <p class="text-lg">Briefing</p>
          </div>
          <div class="border border-gray-800 rounded-lg p-6 flex items-center gap-4">
            <span class="text-gray-500 font-medium w-10 text-sm">02</span>
            <p class="text-lg">Abordando o escopo e definindo estratégias</p>
          </div>
          <div class="border border-gray-800 rounded-lg p-6 flex items-center gap-4">
            <span class="text-gray-500 font-medium w-10 text-sm">03</span>
            <p class="text-lg">Entrega do seu projeto com carinho</p>
          </div>
        </div>
      </div>

      <!-- Testemunho -->
      <div class="flex flex-col justify-center">
        <blockquote class="text-gray-300 text-lg italic leading-relaxed">
          “Você viverá cada etapa do processo de nosso trabalho, desde o clique da câmera, os risos, até o trabalho final.”
        </blockquote>

        <div class="flex items-center gap-4 mt-6">
          <img
            src="/images/tha-profile.jpg"
            alt="Tha Lopes"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p class="font-semibold">/ Tha Lopes</p>
            <p class="text-gray-500 text-sm">CEO & Founder @thalopesqueiroz</p>
          </div>
        </div>

        <button
          class="mt-8 bg-lime-400 text-black font-medium px-6 py-3 rounded-full flex items-center gap-2 w-fit hover:bg-lime-300 transition"
        >
          Agendar conversa
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// Este componente não precisa de lógica reativa, mas pode ser adaptado futuramente.
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
