"use client";

import { Button } from "@/components/ui/button";
import { HyperText } from "@/components/ui/hyper-text";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="w-full relative bg-background flex items-center">
      {/* Ultra-minimal background with subtle depth */}
      <div className="absolute inset-0">
        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/2 via-transparent to-accent/3" />

        {/* Floating geometric elements */}
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-success/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Ultra-subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.008]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.75 0.25 180) 0.5px, transparent 0.5px),
              linear-gradient(90deg, oklch(0.75 0.25 180) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-20">

          {/* Left content - 7 columns */}
          <div className="lg:col-span-7 space-y-12">

            {/* Status indicator */}
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground mono tracking-wider uppercase">
                Network Active • 99.9% Uptime
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-space-grotesk font-bold leading-[0.85] tracking-tighter">
                <HyperText
                  as="h1"
                  className="block text-foreground text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-space-grotesk font-bold leading-[0.85] tracking-tighter py-0"
                  startOnView={false}
                  duration={1000}
                  animateOnHover={true}
                >
                  RIPPLE
                </HyperText>
                <HyperText
                  as="h1"
                  className="block hero-title text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-space-grotesk font-bold leading-[0.85] tracking-tighter py-0"
                  startOnView={false}
                  duration={1000}
                  animateOnHover={true}
                >
                  FINANCE
                </HyperText>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-plus-jakarta-sans font-light">
                Next-generation decentralized finance platform.
                <span className="text-foreground font-medium"> Zero fees</span>,
                <span className="text-foreground font-medium"> infinite possibilities</span>.
              </p>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Instant</div>
                  <div className="text-xs text-muted-foreground">Sub-second trades</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Shield size={16} className="text-success" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Secure</div>
                  <div className="text-xs text-muted-foreground">Multi-sig protected</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Globe size={16} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Global</div>
                  <div className="text-xs text-muted-foreground">Cross-chain ready</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Launch App
                <ArrowRight size={18} className="ml-2" />
              </Button>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>TVL: <span className="text-foreground font-semibold mono">$2.4B</span></span>
                <span>•</span>
                <span>24h Vol: <span className="text-foreground font-semibold mono">$847M</span></span>
              </div>
            </motion.div>

          </div>

          {/* Right content - 5 columns */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >

              {/* Floating data cards */}
              <div className="relative w-80 h-96">

                {/* Main trading card */}
                <div className="absolute top-0 right-0 w-72 h-80 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl">
                  <div className="space-y-6">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary text-sm font-bold">₿</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">Bitcoin</div>
                          <div className="text-xs text-muted-foreground">BTC/USD</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground mono">$67,420</div>
                        <div className="text-xs text-success mono">+4.2%</div>
                      </div>
                    </div>

                    {/* Mini chart */}
                    <div className="h-24 bg-muted/20 rounded-lg flex items-end justify-center p-4">
                      <svg className="w-full h-full" viewBox="0 0 200 60">
                        <path
                          d="M 10 50 Q 30 45 50 40 T 90 35 Q 130 30 150 25 T 190 20"
                          stroke="oklch(0.75 0.25 180)"
                          strokeWidth="2"
                          fill="none"
                          className="drop-shadow-sm"
                        />
                      </svg>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/10 rounded-lg">
                        <div className="text-xs text-muted-foreground">24h High</div>
                        <div className="text-sm font-semibold text-foreground mono">$68,240</div>
                      </div>
                      <div className="text-center p-3 bg-muted/10 rounded-lg">
                        <div className="text-xs text-muted-foreground">24h Low</div>
                        <div className="text-sm font-semibold text-foreground mono">$65,890</div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="rounded-lg">
                        Buy
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        Sell
                      </Button>
                    </div>

                  </div>
                </div>

                {/* Floating yield card */}
                <div className="absolute bottom-0 left-0 w-48 h-32 bg-success/5 backdrop-blur-xl border border-success/20 rounded-xl p-4 shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span className="text-xs text-success font-medium">Yield Farming</span>
                    </div>
                    <div className="text-2xl font-bold text-success mono">12.4%</div>
                    <div className="text-xs text-muted-foreground">APY on ETH-USDC</div>
                  </div>
                </div>

                {/* Floating network status */}
                <div className="absolute top-16 left-0 w-40 h-20 bg-primary/5 backdrop-blur-xl border border-primary/20 rounded-xl p-3 shadow-lg">
                  <div className="space-y-1">
                    <div className="text-xs text-primary font-medium">Network</div>
                    <div className="text-sm font-semibold text-foreground">Ethereum L2</div>
                    <div className="text-xs text-muted-foreground">Gas: 0.001 ETH</div>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="text-xs text-muted-foreground mono tracking-wider">SCROLL</div>
          <div className="w-px h-8 bg-muted-foreground/30" />
        </div>
      </motion.div>

    </section>
  );
}