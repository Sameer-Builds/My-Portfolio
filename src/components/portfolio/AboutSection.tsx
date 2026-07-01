'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/../data.json';

gsap.registerPlugin(ScrollTrigger);

const { about } = data;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: -60, scale: 1.1 },
          {
            y: 60,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // Text blocks stagger in
      textBlocksRef.current.forEach((block, i) => {
        if (!block) return;
        gsap.fromTo(
          block,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        gsap.set(block, { delay: i * 0.15 });
      });

      // Stats counter animation
      statRefs.current.forEach((stat) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Image reveal clip path
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.5,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderCodeBlock = () => {
    const { codeBlock } = about;
    return (
      <div className="p-6 sm:p-10 font-mono text-sm leading-relaxed h-full flex flex-col justify-between" style={{ color: '#6b6358' }}>
        <div>
          {codeBlock.lines.map((line, i) => (
            <div key={i} className={line.isArray ? 'ml-4' : 'ml-4'}>
              {line.isArray ? (
                <>
                  <span style={{ color: '#6b9a5e' }}>{line.key}</span>: [<br />
                  <div className="ml-4">
                    {line.value.map((v, vi) => (
                      <span key={vi}>
                        <span style={{ color: '#e0b48e' }}>&quot;{v}&quot;</span>
                        {vi < line.value.length - 1 ? ', ' : ''}
                        {(vi + 1) % 2 === 0 && vi < line.value.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  <div className="ml-4">],</div>
                </>
              ) : (
                <span style={{ color: '#6b9a5e' }}>{line.key}</span>
              )}
              {!line.isArray && (
                <span style={{ color: '#6b9a5e' }}>:</span>
              )}
              {!line.isArray && (
                <span style={{ color: '#e0b48e' }}> &quot;{line.value as string}&quot;</span>
              )}
              {!line.isArray && i < codeBlock.lines.length - 1 && ','}
            </div>
          ))}
          <div>{'}'}</div>
        </div>
        <div className="mt-8">
          {about.codeBlock.comment.split(', ').map((line, i) => (
            <div key={i} style={{ color: '#2a2824' }}>{line}</div>
          ))}
          <div className="mt-2 flex items-center gap-1">
            <span style={{ color: '#c8956c' }}>{'>'}</span>
            <span className="animate-pulse" style={{ color: '#c8956c' }}>_</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-40 overflow-hidden"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="section-divider" />
          <span
            className="text-xs tracking-[0.3em] uppercase font-mono"
            style={{ color: '#c8956c' }}
          >
            {about.sectionLabel}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image column */}
          <div className="relative">
            <div
              ref={imageRef}
              className="aspect-[4/5] overflow-hidden rounded-sm"
              style={{
                background: about.imagePath
                  ? `url(${about.imagePath}) center/cover`
                  : 'linear-gradient(135deg, #1a1916 0%, #2a2824 50%, #1a1916 100%)',
              }}
            >
              {/* Decorative code block to represent the developer */}
              {renderCodeBlock()}
            </div>

            {/* Decorative frame offset */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full border rounded-sm -z-10"
              style={{ borderColor: '#2a2824' }}
            />
          </div>

          {/* Text column */}
          <div className="flex flex-col gap-6">
            <div ref={(el) => { textBlocksRef.current[0] = el; }} className="opacity-0">
              <h2
                className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ color: '#e8e0d4' }}
              >
                {about.heading.map((line, i) =>
                  line === about.headingHighlight ? (
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

            {about.paragraphs.map((paragraph, i) => (
              <div key={i} ref={(el) => { textBlocksRef.current[i + 1] = el; }} className="opacity-0">
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#8a8078' }}>
                  {paragraph}
                </p>
              </div>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 mt-4" style={{ borderTop: '1px solid #2a2824' }}>
              {about.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => { statRefs.current[i] = el; }}
                  className="opacity-0"
                >
                  <div
                    className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold mb-1"
                    style={{ color: '#c8956c' }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-xs tracking-wider uppercase font-mono"
                    style={{ color: '#6b6358' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}