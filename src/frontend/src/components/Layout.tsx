import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';
import { SiX, SiLinkedin, SiInstagram } from 'react-icons/si';

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
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold text-charcoal dark:text-white">
                Digital<span className="text-coral">Agency</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('services')}
                className="text-charcoal dark:text-white hover:text-coral transition-colors duration-300 font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-charcoal dark:text-white hover:text-coral transition-colors duration-300 font-medium"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-charcoal dark:text-white hover:text-coral transition-colors duration-300 font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-charcoal dark:text-white hover:text-coral transition-colors duration-300 font-medium"
              >
                Contact
              </button>
              {isAuthenticated && isAdmin ? (
                <Button
                  onClick={() => navigate({ to: '/admin/dashboard' })}
                  variant="outline"
                  className="gap-2 border-coral text-coral hover:bg-coral hover:text-white transition-all duration-300"
                >
                  <Shield className="w-4 h-4" />
                  Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => navigate({ to: '/admin/login' })}
                  className="bg-coral hover:bg-coral-dark text-white transition-all duration-300"
                >
                  Admin Login
                </Button>
              )}
            </div>

            <button
              className="md:hidden text-charcoal dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-border pt-4">
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left text-charcoal dark:text-white hover:text-coral transition-colors duration-300 font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="block w-full text-left text-charcoal dark:text-white hover:text-coral transition-colors duration-300 font-medium"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-charcoal dark:text-white hover:text-coral transition-colors duration-300 font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-charcoal dark:text-white hover:text-coral transition-colors duration-300 font-medium"
              >
                Contact
              </button>
              {isAuthenticated && isAdmin ? (
                <Button
                  onClick={() => {
                    navigate({ to: '/admin/dashboard' });
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full gap-2 border-coral text-coral hover:bg-coral hover:text-white"
                >
                  <Shield className="w-4 h-4" />
                  Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate({ to: '/admin/login' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-coral hover:bg-coral-dark text-white"
                >
                  Admin Login
                </Button>
              )}
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-charcoal dark:bg-charcoal-darker text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="text-2xl font-bold">
                  Digital<span className="text-coral">Agency</span>
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Crafting digital experiences that inspire and engage. Your vision, our expertise.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-gray-300 hover:text-coral transition-colors duration-300"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('portfolio')}
                    className="text-gray-300 hover:text-coral transition-colors duration-300"
                  >
                    Portfolio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-gray-300 hover:text-coral transition-colors duration-300"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-gray-300 hover:text-coral transition-colors duration-300"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-coral flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <SiX className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-coral flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <SiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-coral flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <SiInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} DigitalAgency. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'digital-agency'
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
