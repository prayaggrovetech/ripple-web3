"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThemeShowcase() {
  const features = [
    {
      metric: "0%",
      label: "Trading Fees",
      description: "Zero cost trading",
      accent: "primary"
    },
    {
      metric: "<100ms",
      label: "Execution Speed",
      description: "Lightning fast trades",
      accent: "accent"
    },
    {
      metric: "99.9%",
      label: "Uptime",
      description: "Always available",
      accent: "success"
    },
    {
      metric: "2.4M+",
      label: "Active Users",
      description: "Global community",
      accent: "primary"
    },
    {
      metric: "$2.4B",
      label: "Total Value Locked",
      description: "Trusted platform",
      accent: "success"
    },
    {
      metric: "127%",
      label: "Average APY",
      description: "Proven returns",
      accent: "accent"
    }
  ];

  return (
    <section className="w-full py-32 px-6 md:px-12 relative">

      {/* Ultra-minimal background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/[0.01] to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Minimal header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground mono tracking-widest uppercase">Platform Metrics</span>
          </div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter hero-title">
            BUILT FOR
            <br />
            <span className="text-muted-foreground">PERFORMANCE</span>
          </h2>
        </div>

        {/* Ultra-minimal metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-background p-12 relative overflow-hidden hover:bg-card/30 transition-all duration-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >

              {/* Subtle hover accent */}
              <div className={`absolute inset-0 bg-${feature.accent}/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative z-10 space-y-6">

                {/* Metric */}
                <div className="space-y-2">
                  <div className={`text-4xl md:text-5xl font-black mono tracking-tighter text-${feature.accent}`}>
                    {feature.metric}
                  </div>
                  <div className="text-sm text-muted-foreground mono tracking-wider uppercase">
                    {feature.label}
                  </div>
                </div>

                {/* Description */}
                <div className="text-xs text-muted-foreground/60 font-light">
                  {feature.description}
                </div>

                {/* Minimal indicator */}
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`w-1 h-1 bg-${feature.accent} rounded-full`} />
                  <div className="w-8 h-px bg-border" />
                </div>

              </div>

            </motion.div>
          ))}
        </div>

        {/* Minimal CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center space-y-6">
            <Button
              className="bg-foreground text-background hover:bg-foreground/90 px-12 py-4 text-sm font-medium mono tracking-wider uppercase rounded-none border-0 transition-all duration-300 hover:scale-105"
            >
              Access Platform
            </Button>
            <div className="text-xs text-muted-foreground/40 mono tracking-widest">
              NO SIGNUP REQUIRED
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}