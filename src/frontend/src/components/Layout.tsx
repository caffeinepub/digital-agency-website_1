import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';
import { SiX, SiLinkedin, SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-charcoal/95 backdrop-blur-sm border-b border-border shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold text-charcoal dark:text-white">
                Code<span className="text-coral">Crafter</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('services')}
                className="text-charcoal dark:text-white hover:text-coral transition-colors duration-200 font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-charcoal dark:text-white hover:text-coral transition-colors duration-200 font-medium"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-charcoal dark:text-white hover:text-coral transition-colors duration-200 font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-charcoal dark:text-white hover:text-coral transition-colors duration-200 font-medium"
              >
                Contact
              </button>
              {isAuthenticated && isAdmin && (
                <Button
                  onClick={() => navigate({ to: '/admin/dashboard' })}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-coral text-coral hover:bg-coral hover:text-white"
                >
                  <Shield className="w-4 h-4" />
                  Dashboard
                </Button>
              )}
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-coral hover:bg-coral-dark text-white font-semibold px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-charcoal dark:text-white hover:text-coral transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-border pt-4">
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left text-charcoal dark:text-white hover:text-coral transition-colors duration-200 font-medium py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="block w-full text-left text-charcoal dark:text-white hover:text-coral transition-colors duration-200 font-medium py-2"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-charcoal dark:text-white hover:text-coral transition-colors duration-200 font-medium py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-charcoal dark:text-white hover:text-coral transition-colors duration-200 font-medium py-2"
              >
                Contact
              </button>
              {isAuthenticated && isAdmin && (
                <Button
                  onClick={() => {
                    navigate({ to: '/admin/dashboard' });
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 border-coral text-coral hover:bg-coral hover:text-white"
                >
                  <Shield className="w-4 h-4" />
                  Dashboard
                </Button>
              )}
              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-coral hover:bg-coral-dark text-white font-semibold rounded-full transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-charcoal dark:bg-charcoal-dark text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <span className="text-xl font-bold">
                  Code<span className="text-coral">Crafter</span>
                </span>
              </div>
              <p className="text-sm text-gray-300">
                Crafting exceptional digital experiences that drive results and captivate audiences.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-coral">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection('services')} className="hover:text-coral transition-colors">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('portfolio')} className="hover:text-coral transition-colors">
                    Portfolio
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-coral transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-coral transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-coral">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>UI/UX Design</li>
                <li>Branding</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-coral">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-coral flex items-center justify-center transition-colors">
                  <SiX className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-coral flex items-center justify-center transition-colors">
                  <SiLinkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-coral flex items-center justify-center transition-colors">
                  <SiInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            <p>© {new Date().getFullYear()} CodeCrafter. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-coral fill-coral" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'codecrafter'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
