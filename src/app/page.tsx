import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { Intro } from "@/components/sections/Intro";
import { Features } from "@/components/sections/Features";
import { Services } from "@/components/sections/Services";
import { Authority } from "@/components/sections/Authority";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <ClientsSection />
      <Intro />
      <Features />
      <Services />
      <Authority />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
