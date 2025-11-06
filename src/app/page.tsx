"use client";

import { HeroSection } from "@/components/HeroSection";
import { InvestingSection } from "@/components/InvestingSection";
import { StepsSection } from "@/components/StepsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ChartSection } from "@/components/ChartSection";
import { InvestSection } from "@/components/InvestSection";
import { BecomeInvestorSection } from "@/components/BecomeInvestorSection";
import { Footer } from "@/components/Footer";
import { ThemeShowcase } from "@/components/ThemeShowcase";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import NavbarHeader from "@/components/ui/resizable-navbar-demo";
import { motion, Variants } from "framer-motion";
import { useEffect, useState, useRef } from "react";


export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Enhanced scroll tracking for ruler system
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollY / documentHeight, 1);
      setScrollProgress(progress);

      // Determine active section for ruler glow
      const sections = ['hero', 'features', 'portfolio', 'investing', 'steps', 'achievements', 'charts', 'invest', 'community'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      let currentSection = 'hero';
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            currentSection = sections[index];
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  // Background gradient class based on scroll
  const getScrollGradientClass = () => {
    if (!isClient) return 'scroll-0';
    if (scrollProgress < 0.2) return 'scroll-0';
    if (scrollProgress < 0.4) return 'scroll-25';
    if (scrollProgress < 0.6) return 'scroll-50';
    if (scrollProgress < 0.8) return 'scroll-75';
    return 'scroll-100';
  };

  // Modern 2025+ animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05
      }
    }
  };

  // Enhanced section animations with smooth transitions
  const modernSectionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 8,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Minimal divider variants
  const modernDividerVariants: Variants = {
    hidden: { 
      opacity: 0,
      scaleX: 0.9
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Responsive fallback for server-side rendering
  if (!isClient) {
    return (
      <div className="w-full bg-background">
        <NavbarHeader />
        <main className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40">
          <HeroSection />
          <div className="py-16 flex justify-center"><div className="w-8 h-px bg-border/10" /></div>
          <ThemeShowcase />
          <div className="py-16 flex justify-center"><div className="w-8 h-px bg-border/10" /></div>
          <InvestingSection />
          <div className="py-16 flex justify-center"><div className="w-8 h-px bg-border/10" /></div>
          <StepsSection />
          <div className="py-16 flex justify-center"><div className="w-8 h-px bg-border/10" /></div>
          <AchievementsSection />
          <div className="py-16 flex justify-center"><div className="w-8 h-px bg-border/10" /></div>
          <ChartSection />
          <div className="py-16 flex justify-center"><div className="w-8 h-px bg-border/10" /></div>
          <InvestSection />
          <div className="py-16 flex justify-center"><div className="w-8 h-px bg-border/10" /></div>
          <BecomeInvestorSection />
          <div className="py-16 flex justify-center"><div className="w-8 h-px bg-border/10" /></div>
          <Footer />
        </main>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`w-full bg-background relative scroll-gradient ${getScrollGradientClass()}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Ultra-minimal 2025+ Background with Clean Vertical Rulers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Single subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.003]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.75 0.25 180) 0.5px, transparent 0.5px),
              linear-gradient(90deg, oklch(0.75 0.25 180) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '160px 160px'
          }}
        />

        {/* Enhanced Interactive Vertical Ruler Lines - Responsive */}
        <motion.div 
          className={`absolute inset-y-0 left-2 sm:left-4 md:left-8 lg:left-16 xl:left-24 w-px bg-border shadow-sm grid-line-vertical ${
            isClient && ['hero', 'features', 'investing'].includes(activeSection) ? 'active' : ''
          }`}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{ transformOrigin: 'top' }}
        />
        <motion.div 
          className={`absolute inset-y-0 right-2 sm:right-4 md:right-8 lg:right-16 xl:right-24 w-px bg-border shadow-sm grid-line-vertical ${
            isClient && ['charts', 'invest', 'community'].includes(activeSection) ? 'active' : ''
          }`}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          style={{ transformOrigin: 'top' }}
        />

        {/* Enhanced Animated Ruler Tick Marks - Left - Responsive */}
        <div className="absolute left-2 sm:left-4 md:left-8 lg:left-16 xl:left-24 top-0 h-full">
          {Array.from({ length: 8 }).map((_, i) => {
            const tickProgress = isClient ? scrollProgress * 8 : 0;
            const isActive = tickProgress > i;
            const isProgress = tickProgress > i && tickProgress < i + 1;
            
            return (
              <motion.div
                key={`left-tick-${i}`}
                className={`absolute w-2 sm:w-3 md:w-4 h-px bg-border grid-tick-left ${
                  isActive ? 'active' : ''
                } ${isProgress ? 'progress' : ''}`}
                style={{ top: `${10 + (i * 10)}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: 1.8 + (i * 0.1) 
                }}
                whileHover={{ 
                  scaleX: 1.5, 
                  backgroundColor: 'oklch(0.75 0.25 180)',
                  transition: { duration: 0.2 }
                }}
              />
            );
          })}
        </div>

        {/* Enhanced Animated Ruler Tick Marks - Right - Responsive */}
        <div className="absolute right-2 sm:right-4 md:right-8 lg:right-16 xl:right-24 top-0 h-full">
          {Array.from({ length: 8 }).map((_, i) => {
            const tickProgress = isClient ? scrollProgress * 8 : 0;
            const isActive = tickProgress > i;
            const isProgress = tickProgress > i && tickProgress < i + 1;
            
            return (
              <motion.div
                key={`right-tick-${i}`}
                className={`absolute w-2 sm:w-3 md:w-4 h-px bg-border -translate-x-2 sm:-translate-x-3 md:-translate-x-4 grid-tick-right ${
                  isActive ? 'active' : ''
                } ${isProgress ? 'progress' : ''}`}
                style={{ top: `${10 + (i * 10)}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: 1.8 + (i * 0.1) 
                }}
                whileHover={{ 
                  scaleX: 1.5, 
                  backgroundColor: 'oklch(0.75 0.25 180)',
                  transition: { duration: 0.2 }
                }}
              />
            );
          })}
        </div>

        {/* Enhanced Animated Intersection Markers */}
        {[
          { top: '10%', left: true, color: 'primary', delay: 2.2, section: 'hero' },
          { top: '10%', left: false, color: 'primary', delay: 2.3, section: 'hero' },
          { top: '40%', left: true, color: 'accent', delay: 2.4, section: 'steps' },
          { top: '40%', left: false, color: 'accent', delay: 2.5, section: 'steps' },
          { top: '70%', left: true, color: 'success', delay: 2.6, section: 'invest' },
          { top: '70%', left: false, color: 'success', delay: 2.7, section: 'invest' }
        ].map((marker, i) => {
          const isActive = isClient && activeSection === marker.section;
          
          return (
            <motion.div
              key={`marker-${i}`}
              className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-${marker.color} rounded-full grid-intersection-marker ${
                marker.left 
                  ? 'left-2 sm:left-4 md:left-8 lg:left-16 xl:left-24 -translate-x-1' 
                  : 'right-2 sm:right-4 md:right-8 lg:right-16 xl:right-24 translate-x-1'
              } ${marker.top === '70%' ? 'translate-y-1' : '-translate-y-1'} ${
                isActive ? 'active' : ''
              }`}
              style={{ top: marker.top }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1], 
                delay: marker.delay 
              }}
              whileHover={{ 
                scale: 1.5,
                boxShadow: `0 0 20px oklch(0.75 0.25 180 / 0.5)`,
                transition: { duration: 0.2 }
              }}
            />
          );
        })}

        {/* Dynamic Clickable Section Labels */}


        {/* Responsive ambient lighting */}
        <div className="absolute top-0 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-primary/[0.006] rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 bg-accent/[0.004] rounded-full blur-2xl sm:blur-3xl" />
        
        {/* Responsive floating indicator */}
        <motion.div 
          className="absolute top-1/3 right-1/6 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-primary/30 rounded-full hidden sm:block"
          animate={{ 
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <NavbarHeader />
      </motion.div>

      {/* Main content with responsive spacing - symmetric ruler clearance */}
      <motion.main
        className="w-full relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 grid-content"
        variants={containerVariants}
      >
        <motion.div 
          variants={modernSectionVariants} 
          id="hero"
          className="section-transition"
        >
          <HeroSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="features"
        >
          <ThemeShowcase />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="portfolio"
        >
          <PortfolioPreview />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="investing"
        >
          <InvestingSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="steps"
        >
          <StepsSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="achievements"
        >
          <AchievementsSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="charts"
        >
          <ChartSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="invest"
        >
          <InvestSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="community"
        >
          <BecomeInvestorSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="footer"
        >
          <Footer />
        </motion.div>
      </motion.main>

      {/* Responsive progress indicator */}
      <motion.div
        className="fixed right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="w-px h-16 sm:h-20 md:h-24 bg-border/10 relative">
          <motion.div
            className="absolute top-0 left-0 w-px bg-primary/30"
            animate={{ height: ["0%", "100%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Responsive status indicator */}
      <motion.div
        className="fixed bottom-4 sm:bottom-6 left-3 sm:left-4 md:left-6 z-50 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs text-muted-foreground/40">
          <motion.div 
            className="w-1 h-1 bg-success/50 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="mono text-[9px] sm:text-[10px]">LIVE</span>
        </div>
      </motion.div>
    </motion.div>
  );
}