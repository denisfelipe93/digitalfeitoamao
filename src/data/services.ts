// Fonte única de dados para serviços (reutilizada no .astro e no .vue)
export type ServiceItem = {
  id: number
  title: string
  description: string
  tags?: string[]
  href?: string
};

export const services: ServiceItem[] = [
  { id: 1, title: "Consultoria em Branding & Positioning",
    description: "Definição de posicionamento, linguagem e diretrizes visuais para fortalecer a marca.",
    tags: ["IDENTIDADE", "POSICIONAMENTO", "ARQUÉTIPOS"]
  },
  { id: 2, title: "Consultoria em Marketing Digital",
    description: "Planejamento e operação de canais digitais orientados a metas e métricas.",
    tags: ["GROWTH", "FUNIL", "MÍDIA PAGA"]
  },
  { id: 3, title: "Copyrighting",
    description: "Textos criativos e persuasivos para sites, campanhas e redes sociais.",
    tags: ["COPY", "STORYTELLING", "CONVERSÃO"]
  },
  { id: 4, title: "Filmagem | Foto edição Studio",
    description: "Produção e pós de foto e vídeo para campanhas, produtos e institucionais.",
    tags: ["VÍDEO", "EDIÇÃO", "TRATAMENTO"]
  },
  { id: 5, title: "Gestão Profissional de Mídias Sociais",
    description: "Gestão ponta a ponta: linha editorial, publicação, engajamento e análise.",
    tags: ["PLANEJAMENTO", "CALENDÁRIO", "RELATÓRIOS"]
  },
  { id: 6, title: "Criação de Conteúdo",
    description: "Assets estáticos e animados, alinhados à identidade e objetivos de negócio.",
    tags: ["DESIGN", "MOTION", "REELS/SHORTS"]
  }
];
