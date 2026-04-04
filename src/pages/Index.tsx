import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FleetSection from "@/components/FleetSection";
import BurialPlans from "@/components/BurialPlans";
import ApplicationForm from "@/components/ApplicationForm";
import CEOSection from "@/components/CEOSection";
import BranchLocator from "@/components/BranchLocator";
import UpdatesSection from "@/components/UpdatesSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />

    {/* Services (includes Fleet below on the page) */}
    <ServicesSection />
    <FleetSection />

    {/* Plans (apply form is part of plans journey) */}
    <BurialPlans />
    <ApplicationForm />

    {/* Updates = Testimonials + Upcoming Funerals */}
    <UpdatesSection />

    {/* Our Team */}
    <CEOSection />

    {/* Contacts */}
    <BranchLocator />

    <Footer />
    <WhatsAppButton />
    <ChatBot />
  </div>
);

export default Index;
