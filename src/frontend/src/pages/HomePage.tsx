import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
