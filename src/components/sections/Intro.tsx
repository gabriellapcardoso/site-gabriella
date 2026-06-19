"use client";

import { motion } from "framer-motion";

export function Intro() {
  return (
    <section id="sobre" className="py-24 bg-white text-ink-950 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-black leading-tight text-brand-deep max-w-3xl">
            Antes de anunciar, vender ou aparecer, é preciso entender o contexto.
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-lg text-ink-800 leading-relaxed font-medium">
            <p>
              Minha trajetória começou na política, dentro da rotina real de mandatos, campanhas, assessoria parlamentar, eventos, produção de conteúdo e comunicação pública. Essa vivência formou uma visão prática: comunicação não começa no anúncio. Começa na leitura do público, do território, da reputação, da narrativa e do objetivo.
            </p>
            <p>
              Hoje, conecto estratégia de comunicação, tráfego pago, inteligência de dados, automação e IA para transformar decisões soltas em crescimento com método.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
