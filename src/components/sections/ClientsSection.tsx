"use client";

import { motion } from "framer-motion";
import { Cloud, Command, Globe, Shield, Zap, Sparkles } from "lucide-react";

const clients = [
  { name: "Acme Corp", icon: Cloud },
  { name: "Global Tech", icon: Globe },
  { name: "Command Systems", icon: Command },
  { name: "Shield Security", icon: Shield },
  { name: "Zap Energy", icon: Zap },
  { name: "Sparkles AI", icon: Sparkles },
];

export function ClientsSection() {
  return (
    <section className="py-16 bg-white border-y border-ink-200 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-10 text-center relative z-20">
        <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-ink-400">
          Marcas e lideranças que confiam no método
        </h3>
      </div>

      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          className="flex whitespace-nowrap items-center w-max"
        >
          {/* Quadruple the list to ensure the screen is filled and loop is seamless */}
          {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-12 md:px-16 text-ink-500 grayscale hover:grayscale-0 hover:text-brand-deep transition-all duration-300 cursor-pointer"
            >
              <client.icon size={28} />
              <span className="text-2xl font-heading font-bold">{client.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
