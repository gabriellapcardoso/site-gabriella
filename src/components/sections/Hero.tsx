"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart, Network, BrainCircuit } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-accent-pink/20 text-white text-xs font-bold tracking-widest uppercase mb-6 border border-accent-pink/40">
              Autoridade Estratégica
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-[1.05] mb-6 text-white">
              Comunicação, tráfego e IA para transformar presença digital em{" "}
              <span className="text-accent-lime">
                decisão estratégica.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-ink-100 mb-8 leading-relaxed font-medium max-w-xl"
          >
            Eu ajudo negócios, marcas, lideranças públicas e campanhas a saírem do improviso e construírem comunicação com método, dados, posicionamento e execução.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contato"
              className="bg-accent-lime text-brand-deep px-8 py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 hover:bg-[#d0f74d] transition-all hover:scale-105 shadow-lg shadow-accent-lime/20"
            >
              Quero uma análise estratégica
              <ArrowRight size={18} />
            </a>
            <a
              href="#servicos"
              className="bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-full text-base font-bold flex items-center justify-center hover:bg-white/20 transition-all hover:scale-105"
            >
              Conhecer minha atuação
            </a>
          </motion.div>
        </div>

        {/* Right Visual Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          {/* Main geometric container */}
          <div className="relative w-full max-w-md aspect-[4/5] bg-brand-deep/40 border border-brand-light/30 rounded-3xl backdrop-blur-md p-6 flex flex-col gap-4 shadow-[0_0_80px_-20px_rgba(241,0,110,0.3)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0" />
            
            <div className="relative z-10 flex-1 grid grid-rows-3 gap-4">
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="bg-brand/60 border border-brand-light/40 p-5 rounded-2xl flex items-center gap-5 backdrop-blur-sm shadow-lg"
              >
                <div className="p-3 bg-accent-lime/20 text-accent-lime rounded-xl">
                  <BarChart size={28} />
                </div>
                <div>
                  <div className="text-xs font-bold text-accent-lime tracking-widest uppercase mb-1">Performance</div>
                  <div className="text-xl font-bold text-white">Crescimento com Método</div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="bg-brand/60 border border-brand-light/40 p-5 rounded-2xl flex items-center gap-5 ml-6 backdrop-blur-sm shadow-lg"
              >
                <div className="p-3 bg-accent-pink/20 text-accent-pink rounded-xl">
                  <Network size={28} />
                </div>
                <div>
                  <div className="text-xs font-bold text-accent-pink tracking-widest uppercase mb-1">Posicionamento</div>
                  <div className="text-xl font-bold text-white">Leitura de Território</div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="bg-brand/60 border border-brand-light/40 p-5 rounded-2xl flex items-center gap-5 mr-6 backdrop-blur-sm shadow-lg"
              >
                <div className="p-3 bg-white/20 text-white rounded-xl">
                  <BrainCircuit size={28} />
                </div>
                <div>
                  <div className="text-xs font-bold text-ink-200 tracking-widest uppercase mb-1">Automação</div>
                  <div className="text-xl font-bold text-white">Inteligência Artificial</div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
