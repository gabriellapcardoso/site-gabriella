"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { GlowCard } from "@/components/ui/spotlight-card";

const faqs = [
  {
    q: "Você trabalha apenas com política?",
    a: "Não. Minha trajetória começou e se consolidou na política, mas minha atuação hoje conecta comunicação, tráfego pago, dados e IA para campanhas, mandatos, negócios locais, marcas e lideranças."
  },
  {
    q: "Você faz apenas gestão de tráfego?",
    a: "Não. Tráfego é uma parte da estratégia. Meu trabalho envolve posicionamento, comunicação, leitura de público, planejamento, dados, conteúdo, automação e tomada de decisão."
  },
  {
    q: "IA substitui a estratégia de marketing?",
    a: "Não. IA acelera processos, organiza dados e amplia capacidade operacional. Mas sem estratégia, ela só aumenta a velocidade do improviso."
  },
  {
    q: "Para quem seu trabalho é indicado?",
    a: "Para lideranças, negócios, equipes e marcas que precisam parar de tomar decisões soltas e querem crescer com método, clareza e execução."
  },
  {
    q: "Como começa o processo?",
    a: "O primeiro passo é uma conversa ou diagnóstico para entender objetivo, contexto, estrutura atual, gargalos e oportunidades."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white text-ink-800 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black text-brand-deep mb-4">Perguntas Frequentes</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowCard 
                  customSize 
                  glowColor="purple" 
                  className="border border-ink-200 rounded-2xl overflow-hidden bg-ink-50 p-0"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 py-6 flex items-center justify-between font-bold text-lg text-brand-deep hover:bg-ink-100 transition-colors"
                  >
                    {faq.q}
                    <ChevronDown
                      className={`transform transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-pink" : "text-ink-400"}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-ink-700 font-medium text-base">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
