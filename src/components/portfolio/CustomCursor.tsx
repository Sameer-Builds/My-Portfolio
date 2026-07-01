'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    const animate = () => {
      dot.current.x += (pos.current.x - dot.current.x) * 0.15;
      dot.current.y += (pos.current.y - dot.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dot.current.x}px, ${dot.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // Hide on mobile/touch
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference hidden md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s, height 0.3s, margin 0.3s',
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
          marginLeft: isHovering ? -20 : -4,
          marginTop: isHovering ? -20 : -4,
          borderRadius: '50%',
          backgroundColor: '#e8e0d4',
        }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10001] hidden md:block"
        style={{
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
          transition: 'opacity 0.3s',
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          borderRadius: '50%',
          backgroundColor: '#c8956c',
        }}
      />
    </>
  );
}