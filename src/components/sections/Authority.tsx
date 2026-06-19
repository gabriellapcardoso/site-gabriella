"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";

export function Authority() {
  return (
    <section id="autoridade" className="py-24 bg-white text-ink-800 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-heading font-black text-brand-deep mb-8">
              Experiência construída na operação real
            </h2>
            <ul className="space-y-6">
              {[
                "Atuação em marketing político desde 2015",
                "Experiência com mandatos, campanhas e comunicação pública",
                "Liderança em estratégia de marketing e comunicação",
                "Integração entre tráfego pago, conteúdo, dados e IA",
                "Atuação com políticos, negócios locais, marcas, empreendedores e equipes",
                "Visão estratégica que une execução, análise e decisão"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-ink-800 font-medium text-lg">
                  <span className="w-2 h-2 bg-accent-pink rounded-full mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlowCard 
              customSize 
              glowColor="pink" 
              className="bg-brand text-white p-10 md:p-14 rounded-[40px] relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light blur-[80px] rounded-full opacity-50 -translate-y-1/2 translate-x-1/3" />
              <div className="relative z-10">
                <span aria-hidden="true" className="text-6xl text-accent-lime leading-none block mb-6 font-serif">&quot;</span>
                <p className="text-2xl md:text-3xl font-heading font-bold leading-tight mb-8">
                  Tráfego pago não corrige comunicação fraca. IA não substitui estratégia. Crescimento exige contexto, método e execução.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-pink rounded-full" />
                  <div>
                    <div className="font-bold text-lg">Gabriella Cardoso</div>
                    <div className="text-brand-200 text-sm">Estrategista</div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
