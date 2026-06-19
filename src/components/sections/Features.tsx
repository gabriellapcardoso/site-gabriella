"use client";

import { motion } from "framer-motion";
import { MessageSquare, Target, Cpu } from "lucide-react";

import { GlowCard } from "@/components/ui/spotlight-card";

const features = [
  {
    title: "Estratégia de comunicação",
    description: "Posicionamento, narrativa, percepção pública, conteúdo e distribuição de mensagem para marcas, lideranças e campanhas que precisam comunicar com clareza.",
    icon: MessageSquare,
    color: "text-brand-light",
    bg: "bg-brand/10",
    glowColor: "purple" as const,
  },
  {
    title: "Tráfego pago com inteligência",
    description: "Planejamento, segmentação, campanhas, métricas e leitura de performance para transformar investimento em alcance, conversas, reconhecimento e oportunidade real.",
    icon: Target,
    color: "text-accent-pink",
    bg: "bg-accent-pink/10",
    glowColor: "pink" as const,
  },
  {
    title: "IA aplicada ao crescimento",
    description: "Automação, análise, conteúdo, fluxos inteligentes e uso prático de inteligência artificial para acelerar decisões e reduzir achismo.",
    icon: Cpu,
    color: "text-accent-lime",
    bg: "bg-accent-lime/10",
    glowColor: "lime" as const,
  }
];

export function Features() {
  return (
    <section id="estrategia" className="py-24 bg-ink-50 text-ink-800 relative border-t border-ink-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="h-full"
            >
              <GlowCard 
                customSize 
                glowColor={feature.glowColor} 
                className="bg-white p-8 rounded-3xl border border-ink-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color}`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-brand-deep mb-4">{feature.title}</h3>
                <p className="text-ink-600 font-medium leading-relaxed">{feature.description}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
