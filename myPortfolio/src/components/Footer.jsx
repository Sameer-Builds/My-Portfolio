import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, TwitterIcon } from './BrandIcons';

const Footer = () => {
  const socialLinks = [
    { icon: <GitHubIcon size={20} />, href: 'https://github.com/Sameer-Builds', label: 'GitHub' },
    { icon: <LinkedInIcon size={20} />, href: 'https://www.linkedin.com/in/sameer-akhtar-601349381/', label: 'LinkedIn' },
    { icon: <TwitterIcon size={20} />, href: '#', label: 'Twitter' },
    { icon: <MessageCircle size={20} />, href: '#', label: 'Discord' },
  ];

  return (
    <footer className="py-12 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo/Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="text-2xl font-black text-white tracking-tighter">
              Sameer<span className="text-primary-500">.</span>dev
            </span>
          </motion.div>

          {/* Social Links */}
          <div className="flex gap-6 mb-12">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-primary-500/50 transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />

          {/* Bottom Info */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full text-zinc-500 text-sm gap-4">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-1">
              Built with <Heart size={14} className="text-accent-500 fill-accent-500" /> by Ahmad
            </div>

            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
    </footer>
  );
};

export default Footer;
