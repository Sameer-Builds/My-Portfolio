'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  containerClassName = '',
  href,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const Component = href ? 'a' : 'button';
  const scaleX = useTransform(x, [-100, 100], [1.05, 0.95]);
  const scaleY = useTransform(y, [-100, 100], [0.95, 1.05]);

  return (
    <motion.div
      style={{ x, y, scaleX, scaleY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${containerClassName}`}
    >
      <Component
        ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
        href={href}
        onClick={onClick}
        className={`magnetic-btn relative ${className} ${containerClassName.includes('w-full') ? 'w-full !flex' : ''}`}
        data-cursor-hover
      >
        <div className="btn-bg" />
        <span className={`relative z-10 flex items-center gap-2 ${containerClassName.includes('w-full') ? 'w-full h-full' : ''}`}>{children}</span>
      </Component>
    </motion.div>
  );
}