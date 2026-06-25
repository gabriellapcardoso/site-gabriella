"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "5531994822228";
const EMAIL = "gcardosomktdigital@gmail.com";

export function Contact() {
  return (
    <section id="contato" className="py-24 bg-brand-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand to-brand-deep opacity-80" />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-accent-lime/20 text-accent-lime text-xs font-bold tracking-widest uppercase mb-6 border border-accent-lime/30">
            Vamos conversar
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">
            O primeiro passo é uma{" "}
            <span className="text-accent-lime">conversa.</span>
          </h2>
          <p className="text-xl text-ink-200 font-medium">
            Conta o que você precisa. A gente descobre juntos qual é o caminho.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-lime text-brand-deep px-8 py-5 rounded-full text-base font-bold flex items-center justify-center gap-3 hover:bg-[#d0f74d] transition-all hover:scale-105 shadow-lg shadow-accent-lime/20"
          >
            <MessageCircle size={20} />
            Conversar no WhatsApp
            <ArrowRight size={18} />
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-5 rounded-full text-base font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all hover:scale-105"
          >
            <Mail size={20} />
            Enviar e-mail
          </a>
        </motion.div>
      </div>
    </section>
  );
}
