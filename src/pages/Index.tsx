import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { BurialScheme } from "@/components/BurialScheme";
import { TombstoneCatalogue } from "@/components/TombstoneCatalogue";
import { TrustSection } from "@/components/TrustSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { LanguageProvider } from "@/i18n/LanguageContext";

const Index = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <BurialScheme />
        <TombstoneCatalogue />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  </LanguageProvider>
);

export default Index;
