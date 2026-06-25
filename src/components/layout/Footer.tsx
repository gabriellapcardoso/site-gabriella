import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white py-16 border-t border-brand-light/20 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo variant="horizontal" tone="negative" size={48} />
            <p className="text-brand-200 font-medium text-sm text-center md:text-left">
              Estratégia de Comunicação · Tráfego Pago · Inteligência Artificial
            </p>
          </div>
          
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {["Início", "Sobre", "Serviços", "Contato"].map((item) => (
                <li key={item}>
                  <a href={item === "Início" ? "#" : `#${item.toLowerCase()}`} className="text-brand-200 hover:text-white font-semibold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/10">
          <div className="flex gap-6">
            <a href="https://instagram.com/gabriellapcardoso" target="_blank" rel="noopener noreferrer" className="text-brand-200 hover:text-white transition-colors">Instagram</a>
            <a href="https://linkedin.com/in/gabriellapcardoso" target="_blank" rel="noopener noreferrer" className="text-brand-200 hover:text-white transition-colors">LinkedIn</a>
            <a href="https://wa.me/5531994822228" target="_blank" rel="noopener noreferrer" className="text-brand-200 hover:text-white transition-colors">WhatsApp</a>
            <a href="mailto:gcardosomktdigital@gmail.com" className="text-brand-200 hover:text-white transition-colors">E-mail</a>
          </div>

          <a
            href="#contato"
            className="bg-accent-lime text-brand-deep px-6 py-3 rounded-full text-sm font-bold hover:bg-lime-400 transition-colors"
          >
            Falar com Gabriella
          </a>
        </div>
      </div>
    </footer>
  );
}
