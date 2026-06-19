import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gabriella Cardoso | Estratégia, Tráfego Pago e IA",
  description: "Estrategista em comunicação, tráfego pago e inteligência artificial aplicada ao crescimento de negócios, lideranças políticas e marcas.",
  keywords: ["Estratégia de Comunicação", "Tráfego Pago", "Inteligência Artificial", "Marketing Político", "Gabriella Cardoso", "Crescimento de Negócios", "Posicionamento Digital"],
  authors: [{ name: "Gabriella Cardoso" }],
  openGraph: {
    title: "Gabriella Cardoso | Estratégia, Tráfego Pago e IA",
    description: "Comunicação, tráfego pago e IA para quem precisa crescer com clareza e método.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriella Cardoso | Estratégia e Crescimento",
    description: "Estrategista em comunicação, tráfego pago e IA.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="font-sans min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
