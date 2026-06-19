"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { GlowCard } from "@/components/ui/spotlight-card";

const plans = [
  {
    title: "Diagnóstico Estratégico",
    bestFor: "quem precisa entender gargalos antes de investir mais.",
    includes: [
      "Análise de posicionamento",
      "Leitura de presença digital",
      "Diagnóstico de comunicação e tráfego",
      "Recomendações práticas de melhoria"
    ],
    cta: "Solicitar diagnóstico",
    accent: "bg-white border-ink-200 text-brand-deep",
    btn: "bg-brand text-white hover:bg-brand-deep",
    glowColor: "purple" as const
  },
  {
    title: "Consultoria Estratégica",
    bestFor: "negócios, lideranças e equipes que precisam de direção contínua.",
    includes: [
      "Planejamento de comunicação",
      "Estratégia de tráfego",
      "IA aplicada à rotina",
      "Acompanhamento de métricas",
      "Priorização de ações"
    ],
    cta: "Conversar sobre consultoria",
    accent: "bg-brand text-white border-brand border-2 shadow-2xl",
    btn: "bg-accent-lime text-brand-deep hover:bg-[#d0f74d]",
    glowColor: "lime" as const
  },
  {
    title: "Projeto Personalizado",
    bestFor: "campanhas, mandatos, marcas e operações que precisam de estrutura completa.",
    includes: [
      "Estratégia integrada",
      "Tráfego pago",
      "Conteúdo e posicionamento",
      "Inteligência de dados",
      "Automações e IA",
      "Plano de execução"
    ],
    cta: "Montar projeto",
    accent: "bg-white border-ink-200 text-brand-deep",
    btn: "bg-brand text-white hover:bg-brand-deep",
    glowColor: "purple" as const
  }
];

export function Pricing() {
  return (
    <section className="py-24 bg-ink-50 text-ink-800 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black text-brand-deep mb-4">Formas de trabalho</h2>
          <p className="text-xl text-ink-600 font-medium">Escolha o modelo ideal para o seu momento.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
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
                glowColor={plan.glowColor}
                className={`p-8 md:p-10 rounded-3xl border ${plan.accent} flex flex-col h-full`}
              >
                <h3 className="text-2xl font-heading font-bold mb-3">{plan.title}</h3>
                <p className="text-sm font-medium mb-8 opacity-90 min-h-[40px]">Para {plan.bestFor}</p>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-pink mt-2 shrink-0" />
                      <span className="font-medium text-sm md:text-base opacity-90">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contato"
                  className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all ${plan.btn}`}
                >
                  {plan.cta}
                  <ArrowRight size={18} />
                </a>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
