'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import data from '@/../data.json';

gsap.registerPlugin(ScrollTrigger);

const { contact, site } = data;

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(
          formElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (socialsRef.current) {
        gsap.fromTo(
          socialsRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: socialsRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-40 overflow-hidden"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: CTA */}
          <div>
            <div ref={headingRef} className="opacity-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="section-divider" />
                <span
                  className="text-xs tracking-[0.3em] uppercase font-mono"
                  style={{ color: '#c8956c' }}
                >
                  {contact.sectionLabel}
                </span>
              </div>
              <h2
                className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
                style={{ color: '#e8e0d4' }}
              >
                {contact.heading.map((line, i) =>
                  line === contact.headingHighlight ? (
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

            <p
              className="text-base sm:text-lg leading-relaxed mb-10 opacity-0"
              style={{ color: '#8a8078' }}
              ref={(el) => {
                if (el) {
                  gsap.fromTo(
                    el,
                    { y: 30, opacity: 0 },
                    {
                      y: 0,
                      opacity: 1,
                      duration: 0.8,
                      delay: 0.4,
                      ease: 'power3.out',
                      scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                      },
                    }
                  );
                }
              }}
            >
              {contact.description}
            </p>

            {/* Email */}
            <div
              className="mb-10 opacity-0"
              ref={(el) => {
                if (el) {
                  gsap.fromTo(
                    el,
                    { y: 30, opacity: 0 },
                    {
                      y: 0,
                      opacity: 1,
                      duration: 0.8,
                      delay: 0.6,
                      ease: 'power3.out',
                      scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                      },
                    }
                  );
                }
              }}
            >
              <span
                className="text-xs tracking-[0.2em] uppercase font-mono block mb-2"
                style={{ color: '#6b6358' }}
              >
                {contact.emailLabel}
              </span>
              <a
                href={`mailto:${site.email}`}
                className="text-xl sm:text-2xl font-medium transition-colors duration-300 hover:text-[#c8956c]"
                style={{ color: '#e8e0d4' }}
                data-cursor-hover
              >
                {site.email}
              </a>
            </div>

            {/* Socials */}
            <div ref={socialsRef}>
              <span
                className="text-xs tracking-[0.2em] uppercase font-mono block mb-4"
                style={{ color: '#6b6358' }}
              >
                {contact.findMeLabel}
              </span>
              <div className="flex flex-col gap-3">
                {contact.socials.map((social) => (
                  <MagneticButton
                    key={social.name}
                    href={social.href}
                    className="flex items-center justify-between py-2 px-0 group"
                    strength={0.08}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="text-sm font-medium transition-colors duration-300 group-hover:text-[#c8956c]"
                        style={{ color: '#e8e0d4' }}
                      >
                        {social.name}
                      </span>
                      <span
                        className="text-xs font-mono transition-colors duration-300 group-hover:text-[#6b6358]"
                        style={{ color: '#6b6358' }}
                      >
                        {social.handle}
                      </span>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ color: '#6b6358' }}
                    >
                      <path
                        d="M1 13L13 1M13 1H3M13 1v10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="form-field opacity-0">
                <label
                  className="text-xs tracking-[0.15em] uppercase font-mono block mb-2"
                  style={{ color: '#6b6358' }}
                >
                  {contact.formLabels.name}
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full px-0 py-3 bg-transparent text-base border-b-2 transition-colors duration-300 focus:outline-none"
                  style={{
                    borderColor: '#2a2824',
                    color: '#e8e0d4',
                  }}
                  placeholder={contact.formLabels.namePlaceholder}
                />
              </div>

              <div className="form-field opacity-0">
                <label
                  className="text-xs tracking-[0.15em] uppercase font-mono block mb-2"
                  style={{ color: '#6b6358' }}
                >
                  {contact.formLabels.email}
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full px-0 py-3 bg-transparent text-base border-b-2 transition-colors duration-300 focus:outline-none"
                  style={{
                    borderColor: '#2a2824',
                    color: '#e8e0d4',
                  }}
                  placeholder={contact.formLabels.emailPlaceholder}
                />
              </div>

              <div className="form-field opacity-0">
                <label
                  className="text-xs tracking-[0.15em] uppercase font-mono block mb-2"
                  style={{ color: '#6b6358' }}
                >
                  {contact.formLabels.message}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-0 py-3 bg-transparent text-base border-b-2 transition-colors duration-300 focus:outline-none resize-none"
                  style={{
                    borderColor: '#2a2824',
                    color: '#e8e0d4',
                  }}
                  placeholder={contact.formLabels.messagePlaceholder}
                />
              </div>

              <div className="form-field opacity-0 pt-4">
                <MagneticButton
                  className="px-10 py-4 border rounded-full text-sm tracking-widest uppercase font-mono transition-all duration-500"
                  style={{ borderColor: '#c8956c', color: '#c8956c' }}
                  onClick={() => {}}
                >
                  {submitted ? (
                    <span className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8l4 4L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {contact.successText}
                    </span>
                  ) : (
                    contact.submitText
                  )}
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}