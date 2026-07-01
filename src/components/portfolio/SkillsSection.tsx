'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/../data.json';

gsap.registerPlugin(ScrollTrigger);

const { skills } = data;

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const toolTagsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Skill bars animate in
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const fill = bar.querySelector('.skill-fill') as HTMLElement;
        if (!fill) return;
        const targetWidth = fill.dataset.width || '0%';

        gsap.fromTo(
          fill,
          { width: '0%' },
          {
            width: targetWidth,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: (i % 4) * 0.1,
          }
        );

        gsap.fromTo(
          bar,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: (i % 4) * 0.1,
          }
        );
      });

      // Tools tags stagger
      if (toolTagsRef.current) {
        gsap.fromTo(
          toolTagsRef.current.children,
          { y: 20, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: toolTagsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Marquee parallax
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-40 overflow-hidden"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Heading */}
        <div ref={headingRef} className="opacity-0 mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="section-divider" />
            <span
              className="text-xs tracking-[0.3em] uppercase font-mono"
              style={{ color: '#c8956c' }}
            >
              {skills.sectionLabel}
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-6xl md:text-7xl font-bold leading-none"
            style={{ color: '#e8e0d4' }}
          >
            {skills.heading.map((line, i) =>
              line === skills.headingHighlight ? (
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

        {/* Skill bars */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 mb-24">
          {skills.items.map((skill, i) => (
            <div
              key={skill.name}
              ref={(el) => { barsRef.current[i] = el; }}
              className="opacity-0"
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className="text-sm font-medium"
                  style={{ color: '#e8e0d4' }}
                >
                  {skill.name}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: '#6b6358' }}
                >
                  {skill.level}%
                </span>
              </div>
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: '#1a1916' }}
              >
                <div
                  className="skill-fill h-full rounded-full"
                  data-width={`${skill.level}%`}
                  style={{
                    background:
                      skill.category === 'Creative'
                        ? 'linear-gradient(90deg, #4a6741, #6b9a5e)'
                        : 'linear-gradient(90deg, #c8956c, #e0b48e)',
                    width: '0%',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Marquee divider */}
        <div className="overflow-hidden py-8 mb-16" style={{ borderTop: '1px solid #2a2824', borderBottom: '1px solid #2a2824' }}>
          <div ref={marqueeRef} className="flex whitespace-nowrap marquee-track" style={{ width: 'max-content' }}>
            {[...skills.tools, ...skills.tools, ...skills.tools, ...skills.tools].map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="text-5xl sm:text-7xl md:text-8xl font-[family-name:var(--font-playfair)] font-bold mx-8 sm:mx-12"
                style={{ color: '#1a1916' }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Tool tags */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span
              className="text-xs tracking-[0.2em] uppercase font-mono"
              style={{ color: '#6b6358' }}
            >
              {skills.toolsLabel}
            </span>
          </div>
          <div ref={toolTagsRef} className="flex flex-wrap gap-3">
            {skills.tools.map((tool) => (
              <span
                key={tool}
                className="text-sm px-4 py-2.5 rounded-full font-mono transition-colors duration-300 hover:border-[#c8956c]"
                style={{
                  background: '#121210',
                  color: '#8a8078',
                  border: '1px solid #2a2824',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}