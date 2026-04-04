import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FleetSection from "@/components/FleetSection";
import BurialPlans from "@/components/BurialPlans";
import ApplicationForm from "@/components/ApplicationForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import CEOSection from "@/components/CEOSection";
import BranchLocator from "@/components/BranchLocator";
import UpcomingFunerals from "@/components/UpcomingFunerals";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <FleetSection />
    <BurialPlans />
    <ApplicationForm />
    <TestimonialsSection />
    <CEOSection />
    <BranchLocator />
    <UpcomingFunerals />
    <Footer />
    <WhatsAppButton />
    <ChatBot />
  </div>
);

export default Index;
