'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  stagger?: number;
  splitBy?: 'chars' | 'words' | 'lines';
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'h1',
  stagger = 0.03,
  splitBy = 'words',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.reveal-item');

    gsap.set(items, {
      y: '110%',
      opacity: 0,
      rotateX: 40,
    });

    gsap.to(items, {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: 0.9,
      stagger: stagger,
      delay: delay,
      ease: 'power4.out',
    });
  }, [delay, stagger]);

  const parts = splitBy === 'chars'
    ? text.split('')
    : splitBy === 'words'
    ? text.split(' ')
    : text.split('\n');

  return (
    <div ref={containerRef} className="overflow-hidden" style={{ perspective: '600px' }}>
      <Tag className={className}>
        {parts.map((part, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              className="reveal-item inline-block"
              style={{
                transformOrigin: 'bottom center',
              }}
            >
              {part === ' ' ? '\u00A0' : part}
              {splitBy === 'words' && i < parts.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}