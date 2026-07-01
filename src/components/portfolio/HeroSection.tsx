'use client';

import { useRef, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import data from '@/../data.json';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';

const ParticleField = dynamic(() => import('./ParticleField'), {
  ssr: false,
  loading: () => null,
});

const { hero } = data;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollIndicatorRef.current) return;

    gsap.to(scrollIndicatorRef.current, {
      y: 12,
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    if (roleRef.current) {
      gsap.fromTo(
        roleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, delay: 1.5, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      id="hero"
    >
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full">
        {/* Top label */}
        <div ref={roleRef} className="mb-8 opacity-0">
          <span
            className="inline-block text-xs tracking-[0.3em] uppercase font-mono"
            style={{ color: '#c8956c' }}
          >
            {hero.role}
          </span>
        </div>

        {/* Main heading */}
        <div className="mb-6">
          <TextReveal
            text={hero.firstName}
            as="h1"
            className="font-[family-name:var(--font-playfair)] text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight leading-none"
            style={{ color: '#e8e0d4' } as React.CSSProperties}
            delay={0.3}
            stagger={0.05}
          />
        </div>
        <div className="mb-8">
          <TextReveal
            text={hero.lastName}
            as="h1"
            className="font-[family-name:var(--font-playfair)] text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight leading-none text-gradient-copper"
            delay={0.6}
            stagger={0.05}
          />
        </div>

        {/* Subtitle */}
        <div className="max-w-xl mx-auto mb-12">
          <p
            className="text-base sm:text-lg leading-relaxed opacity-0"
            style={{ color: '#6b6358' }}
            ref={(el) => {
              if (el) {
                gsap.fromTo(
                  el,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power3.out' }
                );
              }
            }}
          >
            {hero.subtitle}
          </p>
        </div>

        {/* CTA */}
        <div
          className="opacity-0"
          ref={(el) => {
            if (el) {
              gsap.fromTo(
                el,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: 'power3.out' }
              );
            }
          }}
        >
          <MagneticButton
            href={hero.ctaHref}
            className="px-8 py-4 border rounded-full text-sm tracking-widest uppercase font-mono"
            style={{ borderColor: '#c8956c', color: '#c8956c' }}
          >
            {hero.ctaText}
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span
          className="text-xs tracking-[0.2em] uppercase font-mono"
          style={{ color: '#6b6358' }}
        >
          {hero.scrollLabel}
        </span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #c8956c, transparent)' }} />
      </div>
    </section>
  );
}