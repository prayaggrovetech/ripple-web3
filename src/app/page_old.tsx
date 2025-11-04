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
import NavbarHeader from "@/components/ui/resizable-navbar-demo";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Ultra-subtle section animations
  const modernSectionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 4
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  // Fallback for server-side rendering
  if (!isClient) {
    return (
      <div className="w-full bg-background">
        <NavbarHeader />
        <main className="w-full">
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
      className="w-full bg-background relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Ultra-minimal 2025+ Background */}
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

        {/* Interactive Vertical Ruler Lines */}
        <motion.div
          className="absolute inset-y-0 left-8 md:left-16 lg:left-24 w-px bg-border shadow-sm grid-line-vertical"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{ transformOrigin: 'top' }}
        />
        <motion.div
          className="absolute inset-y-0 right-8 md:right-16 lg:right-24 w-px bg-border shadow-sm grid-line-vertical"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          style={{ transformOrigin: 'top' }}
        />



        {/* Animated Ruler Tick Marks - Left */}
        <div className="absolute left-8 md:left-16 lg:left-24 top-0 h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`left-tick-${i}`}
              className="absolute w-4 h-px bg-border grid-tick-left"
              style={{ top: `${(i + 1) * 12.5}%` }}
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
          ))}
        </div>

        {/* Animated Ruler Tick Marks - Right */}
        <div className="absolute right-8 md:right-16 lg:right-24 top-0 h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`right-tick-${i}`}
              className="absolute w-4 h-px bg-border -translate-x-4 grid-tick-right"
              style={{ top: `${(i + 1) * 12.5}%` }}
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
          ))}
        </div>

        {/* Animated Intersection Markers */}
        {[
          { top: '0%', left: true, color: 'primary', delay: 2.2 },
          { top: '0%', left: false, color: 'primary', delay: 2.3 },
          { top: '50%', left: true, color: 'accent', delay: 2.4 },
          { top: '50%', left: false, color: 'accent', delay: 2.5 },
          { top: '100%', left: true, color: 'primary', delay: 2.6 },
          { top: '100%', left: false, color: 'primary', delay: 2.7 }
        ].map((marker, i) => (
          <motion.div
            key={`marker-${i}`}
            className={`absolute w-2 h-2 bg-${marker.color} rounded-full grid-intersection-marker ${marker.left
              ? 'left-8 md:left-16 lg:left-24 -translate-x-1'
              : 'right-8 md:right-16 lg:right-24 translate-x-1'
              } ${marker.top === '100%' ? 'translate-y-1' : '-translate-y-1'}`}
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
        ))}

        {/* Animated Section Labels */}
        {[
          { top: '4%', label: 'HERO', delay: 2.8 },
          { top: '25%', label: 'FEATURES', delay: 2.9 },
          { top: '50%', label: 'CONTENT', delay: 3.0 },
          { top: '75%', label: 'FOOTER', delay: 3.1 }
        ].map((section, i) => (
          <motion.div
            key={`label-${i}`}
            className="absolute left-2 md:left-6 lg:left-10 text-xs mono text-muted-foreground/60 rotate-90 origin-left grid-section-label"
            style={{ top: section.top }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: section.delay
            }}
            whileHover={{
              color: 'oklch(0.75 0.25 180)',
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
          >
            {section.label}
          </motion.div>
        ))}

        {/* Pulse Animation for Active Section */}
        <motion.div
          className="absolute left-8 md:left-16 lg:left-24 right-8 md:right-16 lg:right-24 h-px bg-primary/20"
          style={{ top: '25%' }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleY: [1, 1.5, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Minimal ambient lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.006] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/[0.004] rounded-full blur-3xl" />

        {/* Single floating indicator */}
        <motion.div
          className="absolute top-1/3 right-1/6 w-0.5 h-0.5 bg-primary/30 rounded-full"
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

      {/* Main content with interactive grid integration */}
      <motion.main
        className="w-full relative z-10 px-8 md:px-16 lg:px-24 grid-content"
        variants={containerVariants}
      >
        <motion.div variants={modernSectionVariants}>
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
        >
          <ThemeShowcase />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center relative"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
          <motion.div
            className="absolute -left-8 md:-left-16 lg:-left-24 -right-8 md:-right-16 lg:-right-24 h-px bg-border/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <InvestingSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center relative"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
          <motion.div
            className="absolute -left-8 md:-left-16 lg:-left-24 -right-8 md:-right-16 lg:-right-24 h-px bg-border/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <StepsSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center relative"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
          <motion.div
            className="absolute -left-8 md:-left-16 lg:-left-24 -right-8 md:-right-16 lg:-right-24 h-px bg-border/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <AchievementsSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center relative"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
          <motion.div
            className="absolute -left-8 md:-left-16 lg:-left-24 -right-8 md:-right-16 lg:-right-24 h-px bg-border/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <ChartSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center relative"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
          <motion.div
            className="absolute -left-8 md:-left-16 lg:-left-24 -right-8 md:-right-16 lg:-right-24 h-px bg-border/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <InvestSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center relative"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
          <motion.div
            className="absolute -left-8 md:-left-16 lg:-left-24 -right-8 md:-right-16 lg:-right-24 h-px bg-border/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <BecomeInvestorSection />
        </motion.div>

        <motion.div
          className="py-20 flex justify-center relative"
          variants={modernDividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="w-8 h-px bg-border/15" />
          <motion.div
            className="absolute -left-8 md:-left-16 lg:-left-24 -right-8 md:-right-16 lg:-right-24 h-px bg-border/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div
          variants={modernSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Footer />
        </motion.div>
      </motion.main>

      {/* Minimal progress indicator */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="w-px h-24 bg-border/10 relative">
          <motion.div
            className="absolute top-0 left-0 w-px bg-primary/30"
            animate={{ height: ["0%", "100%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Minimal status indicator */}
      <motion.div
        className="fixed bottom-6 left-6 z-50 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="flex items-center space-x-2 text-xs text-muted-foreground/40">
          <motion.div
            className="w-1 h-1 bg-success/50 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="mono text-[10px]">LIVE</span>
        </div>
      </motion.div>
    </motion.div>
  );
}