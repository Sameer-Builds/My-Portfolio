import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, MessageSquare, Sun, Moon } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' }
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Sameer-Builds', icon: <GitHubIcon size={20} /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sameer-akhtar-601349381/', icon: <LinkedInIcon size={20} /> }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] flex justify-center pt-4 sm:pt-6 pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto relative z-[100] flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
          scrolled 
            ? 'glass-nav mx-4 sm:mx-8 w-full max-w-5xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
            : 'bg-transparent w-full max-w-7xl mx-auto'
        }`}
      >
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-black bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          Sameer.dev
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                activeSection === link.href ? 'text-white' : 'text-zinc-400 hover:bg-gradient-to-r hover:from-primary-500 hover:via-secondary-500 hover:to-accent-500 hover:bg-clip-text hover:text-transparent'
              }`}
            >
              {activeSection === link.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-zinc-400 hover:text-primary-500 transition-colors"
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a 
            href="https://www.linkedin.com/in/sameer-akhtar-601349381/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary scale-90 sm:scale-100"
          >
            <MessageSquare size={18} />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed inset-x-4 top-24 md:hidden glass-card p-6 rounded-2xl z-40 pointer-events-auto"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-lg font-medium text-left px-4 py-2 rounded-xl transition-colors ${
                    activeSection === link.href ? 'bg-primary-500/20 text-primary-500' : 'text-zinc-400'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between items-center px-4">
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a key={social.name} href={social.href} className="text-zinc-400 hover:text-white">
                      {social.icon}
                    </a>
                  ))}
                </div>
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400"
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
              <a 
                href="https://www.linkedin.com/in/sameer-akhtar-601349381/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center mt-2"
              >
                <MessageSquare size={18} />
                <span>Let's talk</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
