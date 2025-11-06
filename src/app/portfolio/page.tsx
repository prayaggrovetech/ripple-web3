"use client";

import { PortfolioTracker } from "@/components/portfolio/PortfolioTracker";
import NavbarHeader from "@/components/ui/resizable-navbar-demo";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="w-full bg-background relative min-h-screen">
        <NavbarHeader />
        <main className="relative z-10 pt-20">
          <div className="w-full max-w-7xl mx-auto px-6 py-12">
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Loading Portfolio</h3>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <motion.div
      className="w-full bg-background relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ultra-minimal background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-primary/1 via-transparent to-accent/2" />

        {/* Subtle grid */}
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

        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-primary/10 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-success/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <NavbarHeader />

      <main className="relative z-10 pt-20">
        <PortfolioTracker />
      </main>

      <Footer />
    </motion.div>
  );
}