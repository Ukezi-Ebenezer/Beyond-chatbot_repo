import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onRegisterClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "What You'll Learn", href: "#what-you-will-learn" },
    { name: "Who Should Attend", href: "#who-should-attend" },
    { name: "Why Attend", href: "#why-attend" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-blue-100/80 py-2.5'
          : 'bg-transparent py-4'
      }`}
      id="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
            <BrandLogo size="md" showBadge={false} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-[#2563eb] transition-colors py-1 relative group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2563eb] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-bold shadow-md hover:shadow-lg hover:shadow-blue-500/20 active:scale-98 transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              id="navbar-register-button"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>REGISTER NOW</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-white/90 border border-blue-200 text-slate-800 hover:bg-blue-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer-menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden bg-white/98 backdrop-blur-xl border-b border-blue-200 shadow-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200"
          id="mobile-drawer-menu"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-semibold text-slate-800 hover:bg-blue-50 hover:text-[#2563eb] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onRegisterClick();
              }}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-base font-bold shadow-md shadow-blue-500/25 active:scale-98 transition-all cursor-pointer"
              id="mobile-menu-register-button"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

