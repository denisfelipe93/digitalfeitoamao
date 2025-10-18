import type { ServiceItem } from "@/data/services";

export function buildServicesItemList(services: ServiceItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((s, i) => ({
      "@type": "Service",
      "name": s.title,
      "position": i + 1,
      "description": s.description
    }))
  };
}

// Exemplo para uma página de detalhe de serviço:
export function buildSingleService(s: ServiceItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": s.title,
    "description": s.description
    // você pode adicionar "provider", "areaServed", "offers", etc.
  };
}
