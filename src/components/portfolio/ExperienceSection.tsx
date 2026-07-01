'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/../data.json';

gsap.registerPlugin(ScrollTrigger);

const { experience } = data;

interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
  type: 'work' | 'education';
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

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

      // Timeline line grow
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }

      // Items stagger in
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: 0.1,
          }
        );

        const content = item.querySelector('.exp-content');
        if (content) {
          gsap.fromTo(
            content,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.2,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-40 overflow-hidden"
      id="experience"
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
              {experience.sectionLabel}
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-6xl md:text-7xl font-bold leading-none"
            style={{ color: '#e8e0d4' }}
          >
            {experience.heading.map((line, i) =>
              line === experience.headingHighlight ? (
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 sm:left-8 top-0 bottom-0 w-px origin-top"
            style={{ background: '#2a2824' }}
          />

          <div className="space-y-16 sm:space-y-20">
            {experience.items.map((exp, i) => (
              <div
                key={`${exp.role}-${exp.company}`}
                ref={(el) => { itemsRef.current[i] = el; }}
                className="relative pl-8 sm:pl-24 opacity-0"
              >
                {/* Dot */}
                <div
                  className="absolute left-0 sm:left-8 top-1 -translate-x-1/2 w-3 h-3 rounded-full dot-pulse"
                  style={{
                    background: exp.type === 'work' ? '#c8956c' : '#4a6741',
                  }}
                />

                {/* Year badge */}
                <div className="mb-3">
                  <span
                    className="text-xs tracking-[0.15em] font-mono px-3 py-1.5 rounded-full"
                    style={{
                      background: '#1a1916',
                      color: '#6b6358',
                      border: '1px solid #2a2824',
                    }}
                  >
                    {exp.year}
                  </span>
                </div>

                {/* Content */}
                <div className="exp-content opacity-0">
                  <h3
                    className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold mb-1"
                    style={{ color: '#e8e0d4' }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    className="text-sm font-mono mb-4"
                    style={{ color: exp.type === 'work' ? '#c8956c' : '#4a6741' }}
                  >
                    {exp.company}
                  </p>
                  <p
                    className="text-sm sm:text-base leading-relaxed max-w-2xl"
                    style={{ color: '#8a8078' }}
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}