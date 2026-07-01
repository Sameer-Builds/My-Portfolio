'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import data from '@/../data.json';

gsap.registerPlugin(ScrollTrigger);

const { footer, navigation, site } = data;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll('.cta-item'),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative pt-20 pb-8 mt-auto overflow-hidden"
      style={{ borderTop: '1px solid #2a2824' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Big CTA text */}
        <div ref={ctaRef} className="text-center mb-20">
          <div className="cta-item opacity-0">
            <span
              className="text-xs tracking-[0.3em] uppercase font-mono block mb-6"
              style={{ color: '#c8956c' }}
            >
              {footer.ctaLabel}
            </span>
          </div>
          <div className="cta-item opacity-0">
            <h2
              className="font-[family-name:var(--font-playfair)] text-5xl sm:text-7xl md:text-8xl font-bold leading-none mb-8"
              style={{ color: '#e8e0d4' }}
            >
              {footer.heading.map((line, i) =>
                line === footer.headingHighlight ? (
                  <span key={i} style={{ color: '#c8956c' }}>{line}</span>
                ) : (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                )
              )}
            </h2>
          </div>
          <div className="cta-item opacity-0">
            <MagneticButton
              href={footer.ctaHref}
              className="px-10 py-4 border rounded-full text-sm tracking-widest uppercase font-mono"
              style={{ borderColor: '#c8956c', color: '#c8956c' }}
            >
              {footer.ctaText}
            </MagneticButton>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid #1a1916' }}>
          <span
            className="text-xs font-mono"
            style={{ color: '#6b6358' }}
          >
            &copy; {new Date().getFullYear()} {site.copyright}
          </span>
          <div className="flex items-center gap-6">
            {navigation.footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono transition-colors duration-300 hover:text-[#c8956c]"
                style={{ color: '#6b6358' }}
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-mono transition-colors duration-300 hover:text-[#c8956c]"
            style={{ color: '#6b6358' }}
            data-cursor-hover
          >
            {footer.backToTopText}
          </button>
        </div>
      </div>
    </footer>
  );
}