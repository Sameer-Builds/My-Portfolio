'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/../data.json';

gsap.registerPlugin(ScrollTrigger);

const marqueeWords = data.marquee.words;

export default function MarqueeDivider() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      [lineTopRef.current, lineBotRef.current].forEach((line) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      if (trackRef.current) {
        gsap.to(trackRef.current, {
          x: 300,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 3,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 overflow-hidden">
      <div
        ref={lineTopRef}
        className="glow-line mb-12 sm:mb-16 origin-left"
      />

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex whitespace-nowrap marquee-track"
          style={{ width: 'max-content' }}
        >
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map(
            (word, i) => (
              <span
                key={`${word}-${i}`}
                className="text-6xl sm:text-8xl md:text-9xl font-[family-name:var(--font-playfair)] font-bold mx-6 sm:mx-10 select-none"
                style={{
                  color: i % 2 === 0 ? '#121210' : '#1a1916',
                  WebkitTextStroke: i % 2 === 0 ? '1px #2a2824' : 'none',
                }}
              >
                {word}
              </span>
            )
          )}
        </div>
      </div>

      <div
        ref={lineBotRef}
        className="glow-line mt-12 sm:mt-16 origin-right"
      />
    </section>
  );
}