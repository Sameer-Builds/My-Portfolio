'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/portfolio/Navigation';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import MarqueeDivider from '@/components/portfolio/MarqueeDivider';

const SmoothScroll = dynamic(() => import('@/components/portfolio/SmoothScroll'), {
  ssr: false,
});
const CustomCursor = dynamic(() => import('@/components/portfolio/CustomCursor'), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <MarqueeDivider />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}