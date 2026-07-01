'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import data from '@/../data.json';

gsap.registerPlugin(ScrollTrigger);

const { projects } = data;

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  year: string;
  link: string;
  imagePath: string | null;
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || !innerRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    innerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!innerRef.current) return;
    innerRef.current.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className="min-w-[80vw] sm:min-w-[78vw] lg:min-w-[50vw] flex-shrink-0 pr-4 sm:pr-6"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <MagneticButton href={project.link} className="block w-full" containerClassName="w-full" strength={0.05}>
        <div
          ref={innerRef}
          className="tilt-card-inner rounded-sm overflow-hidden transition-all duration-300 w-full"
          style={{
            background: '#121210',
            border: '1px solid #2a2824',
          }}
          data-cursor-hover
        >
          {/* Project visual */}
          {project.imagePath ? (
            <div
              className="relative h-[30vh] sm:h-[36vh] lg:h-[40vh] overflow-hidden"
            >
              <img
                src={project.imagePath}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover ${
                  isHovered ? 'object-bottom' : 'object-top'
                }`}
                style={{ transition: 'object-position 5s ease-in-out' }}
              />
              <div className="project-img-overlay absolute inset-0" />
            </div>
          ) : (
            <div
              className="relative h-[30vh] sm:h-[36vh] lg:h-[40vh] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}08 50%, #121210 100%)`,
              }}
            >
              {/* Decorative elements */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transition: 'opacity 0.5s', opacity: isHovered ? 0.35 : 0.2 }}
              >
                <div
                  className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border rotate-45"
                  style={{ borderColor: project.color }}
                />
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transition: 'opacity 0.5s', opacity: isHovered ? 0.2 : 0.1 }}
              >
                <div
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-full rotate-12"
                  style={{ background: project.color, filter: 'blur(40px)' }}
                />
              </div>
            </div>
          )}

          {/* Project number + year (always visible) */}
          <div className="relative px-5 pt-5 sm:px-6 sm:pt-6">
            <div className="flex justify-between items-center">
              <span
                className="font-mono text-xs sm:text-sm"
                style={{ color: project.color, opacity: 0.6 }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className="font-mono text-xs sm:text-sm"
                style={{ color: '#6b6358' }}
              >
                {project.year}
              </span>
            </div>
          </div>

          {/* Hover arrow (decorative) */}
          {!project.imagePath && (
            <div
              className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 pointer-events-none"
              style={{
                border: `1px solid ${project.color}`,
                opacity: isHovered ? 0.6 : 0,
                transform: isHovered ? 'scale(1)' : 'scale(0.8)',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                style={{ transform: 'rotate(-45deg)', color: project.color }}
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* Project info */}
          <div className="px-5 pb-5 sm:px-6 sm:pb-6 lg:px-7 lg:pb-7 -mt-3">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-mono"
                style={{ color: project.color }}
              >
                {project.category}
              </span>
            </div>
            <h3
              className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl lg:text-3xl font-bold mb-2"
              style={{ color: '#e8e0d4' }}
            >
              {project.title}
            </h3>
            <p
              className="text-xs sm:text-sm leading-relaxed mb-4"
              style={{ color: '#8a8078' }}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-mono"
                  style={{
                    background: '#1a1916',
                    color: '#6b6358',
                    border: '1px solid #2a2824',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </MagneticButton>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
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

      // Horizontal scroll — pin the entire section
      const track = trackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative" id="projects">
      {/* Everything inside the pinned area */}
      <div className="flex flex-col justify-center min-h-screen py-16 sm:py-20">
        {/* Heading — inside the pinned section so it stays visible */}
        <div className="px-6 sm:px-10 lg:px-16 mb-8 sm:mb-10">
          <div ref={headingRef} className="opacity-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="section-divider" />
              <span
                className="text-xs tracking-[0.3em] uppercase font-mono"
                style={{ color: '#c8956c' }}
              >
                {projects.sectionLabel}
              </span>
            </div>
            <h2
              className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl md:text-6xl font-bold leading-none"
              style={{ color: '#e8e0d4' }}
            >
              {projects.heading.split(projects.headingHighlight).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span style={{ color: '#c8956c' }}>{projects.headingHighlight}</span>
                  )}
                </React.Fragment>
              ))}
            </h2>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="horizontal-scroll-section pl-6 sm:pl-10 lg:pl-16 pb-10"
          >
            {projects.items.map((project, i) => (
              <ProjectCard key={project.title} project={project as Project} index={i} />
            ))}

            {/* End spacer */}
            <div className="min-w-[20vw] flex-shrink-0 flex items-center">
              <MagneticButton
                href={projects.endCtaHref}
                className="text-sm tracking-widest uppercase font-mono px-6 py-3 border rounded-full"
                style={{ borderColor: '#c8956c', color: '#c8956c' }}
              >
                {projects.endCtaText}
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}