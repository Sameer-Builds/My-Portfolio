'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/../data.json';

gsap.registerPlugin(ScrollTrigger);

const { navigation } = data;

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Progress bar
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    // Show/hide nav on scroll
    ScrollTrigger.create({
      start: 100,
      onUpdate: (self) => {
        setScrolled(self.direction === 1 && self.scroll() > 200);
      },
    });

    // Track active section
    const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.6, ease: 'power4.inOut' }
      );
      const links = menuRef.current.querySelectorAll('.mobile-link');
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
          background: 'rgba(9, 9, 9, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="absolute top-0 left-0 right-0 h-px origin-left"
          style={{
            background: 'linear-gradient(90deg, #c8956c, #4a6741)',
            transform: 'scaleX(0)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href={navigation.logoHref}
            className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl font-bold tracking-tight"
            style={{ color: '#e8e0d4' }}
            data-cursor-hover
          >
            {data.site.logo}<span style={{ color: '#c8956c' }}>.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs tracking-[0.15em] uppercase font-mono transition-colors duration-300"
                style={{
                  color: activeSection === item.href.slice(1) ? '#c8956c' : '#6b6358',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#c8956c';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.href.slice(1)) {
                    (e.target as HTMLElement).style.color = '#6b6358';
                  }
                }}
                data-cursor-hover
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: '#e8e0d4',
                transform: isOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: '#e8e0d4',
                opacity: isOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: '#e8e0d4',
                transform: isOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            background: 'rgba(9, 9, 9, 0.97)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {navigation.items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mobile-link text-3xl font-[family-name:var(--font-playfair)] font-bold transition-colors duration-300"
              style={{ color: '#e8e0d4' }}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}