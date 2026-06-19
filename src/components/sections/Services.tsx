"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { GlowCard } from "@/components/ui/spotlight-card";

const services = [
  {
    title: "Estratégia para lideranças públicas e campanhas",
    audience: "Políticos, mandatos, pré-candidatos, equipes de campanha e lideranças públicas.",
    points: [
      "Posicionamento digital",
      "Comunicação de mandato",
      "Tráfego político-eleitoral",
      "Distribuição estratégica de mensagens",
      "Leitura de território e público",
      "Planejamento de conteúdo",
      "Dados para decisão"
    ],
    accent: "bg-brand text-white",
    glowColor: "purple" as const
  },
  {
    title: "Tráfego pago para negócios e marcas locais",
    audience: "Negócios locais, prestadores de serviços e empresas.",
    points: [
      "Campanhas para WhatsApp",
      "Geração de leads",
      "Captação de clientes",
      "Reconhecimento de marca",
      "Anúncios com estratégia",
      "Análise de métricas e otimização"
    ],
    accent: "bg-accent-pink text-white",
    glowColor: "pink" as const
  },
  {
    title: "Inteligência artificial para marketing e operação",
    audience: "Equipes, agências, empreendedores e lideranças.",
    points: [
      "Automação de processos",
      "IA para conteúdo",
      "IA para análise de dados",
      "Agentes e assistentes personalizados",
      "Fluxos de trabalho com IA",
      "Estratégia prática, sem hype"
    ],
    accent: "bg-accent-lime text-brand-deep",
    glowColor: "lime" as const
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-24 bg-brand-deep text-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-deep to-brand opacity-50" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-white">Como posso ajudar</h2>
          <p className="text-xl text-ink-200 font-medium">Soluções estratégicas desenhadas para cada contexto.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="h-full"
            >
              <GlowCard
                customSize
                glowColor={service.glowColor}
                className="bg-brand-deep/80 backdrop-blur-md border border-white/5 !p-0 h-full flex flex-col overflow-hidden rounded-3xl"
              >
                <div className={`p-8 ${service.accent}`}>
                  <h3 className="text-2xl font-heading font-bold leading-tight mb-2">{service.title}</h3>
                  <p className="text-sm font-medium opacity-90">{service.audience}</p>
                </div>
                <div className="p-8 flex-1">
                  <ul className="space-y-4">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent-lime shrink-0 mt-0.5" />
                        <span className="text-ink-100 font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
