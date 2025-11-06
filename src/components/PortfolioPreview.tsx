"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HyperText } from "@/components/ui/hyper-text";
import { ArrowRight, TrendingUp, Wallet, BarChart3, Zap, WifiOff } from "lucide-react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { usePortfolio } from "@/hooks/usePortfolio";
import { portfolioAPI } from "@/lib/portfolio-api";
import { WalletConnect } from "@/components/ui/WalletConnect";
import { useEffect, useState } from "react";

export function PortfolioPreview() {
  const { isConnected } = useAccount();
  const { portfolio, loading } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Wallet size={20} />,
      title: "Multi-Chain Tracking",
      description: "Monitor assets across Ethereum, Polygon, Base, and more"
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Real-Time Prices",
      description: "Live portfolio values with 24h change indicators"
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Advanced Analytics",
      description: "Portfolio allocation charts and performance metrics"
    },
    {
      icon: <Zap size={20} />,
      title: "Auto-Refresh",
      description: "Automatic updates every 30 seconds for latest data"
    }
  ];

  // Mock data for when wallet is not connected
  const mockData = {
    totalUSD: 47892.34,
    totalChange24h: 2847.12,
    totalChangePercent24h: 6.32,
    chains: [
      { name: "Ethereum", symbol: "E", value: 32847, color: "primary" },
      { name: "Polygon", symbol: "P", value: 12045, color: "success" },
      { name: "Base", symbol: "B", value: 3000, color: "accent" }
    ]
  };

  return (
    <section className="w-full py-32 relative">
      
      {/* Ultra-minimal background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent/1 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-accent/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground mono tracking-widest uppercase">Portfolio Management</span>
          </div>
          
          <div className="text-6xl md:text-7xl lg:text-8xl font-space-grotesk font-bold leading-[0.85] tracking-tighter mb-8">
            <HyperText
              as="h2"
              className="text-6xl md:text-7xl lg:text-8xl font-space-grotesk font-bold leading-[0.85] tracking-tighter py-0"
              startOnView={false}
              duration={700}
              animateOnHover={true}
            >
              TRACK YOUR
            </HyperText>
            <HyperText
              as="span"
              className="hero-title text-6xl md:text-7xl lg:text-8xl font-space-grotesk font-bold leading-[0.85] tracking-tighter py-0 block"
              startOnView={false}
              duration={900}
              animateOnHover={true}
            >
              WEB3 WEALTH
            </HyperText>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-plus-jakarta-sans font-light">
            Professional portfolio tracking with 
            <span className="text-foreground font-medium"> real-time analytics</span>,
            <span className="text-foreground font-medium"> multi-chain support</span>, and
            <span className="text-foreground font-medium"> advanced insights</span>.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:bg-card/50 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <div className="text-accent">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Portfolio Preview */}
        <motion.div
          className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {!mounted ? (
            // Loading state during hydration
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                <div className="h-4 bg-muted/20 rounded animate-pulse" />
                <div className="h-12 bg-muted/20 rounded animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-16 bg-muted/20 rounded animate-pulse" />
                  <div className="h-16 bg-muted/20 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-muted/20 rounded animate-pulse" />
                <div className="space-y-3">
                  <div className="h-12 bg-muted/20 rounded animate-pulse" />
                  <div className="h-12 bg-muted/20 rounded animate-pulse" />
                  <div className="h-12 bg-muted/20 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-muted/20 rounded animate-pulse" />
                <div className="h-32 bg-muted/20 rounded animate-pulse" />
              </div>
            </div>
          ) : !isConnected ? (
            // Not connected state - show connect wallet
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <WifiOff size={32} className="text-muted-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Connect your wallet to see your real portfolio data with live prices and multi-chain tracking.
              </p>
              
              <div className="space-y-6">
                <WalletConnect />
                
                <div className="text-sm text-muted-foreground/60">
                  <p>Preview with sample data:</p>
                </div>
                
                {/* Sample data preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-border/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-muted-foreground mono">$47,892</div>
                    <div className="text-sm text-muted-foreground">Total Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success mono">+6.32%</div>
                    <div className="text-sm text-muted-foreground">24h Change</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-muted-foreground mono">3</div>
                    <div className="text-sm text-muted-foreground">Active Chains</div>
                  </div>
                </div>
              </div>
            </div>
          ) : loading ? (
            // Loading real data
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Loading Your Portfolio</h3>
              <p className="text-muted-foreground">Fetching your assets across all chains...</p>
            </div>
          ) : portfolio && portfolio.totalUSD > 0 ? (
            // Real portfolio data with actual values
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Real Portfolio Stats */}
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mono tracking-wider uppercase mb-2">
                    Your Portfolio Value
                  </div>
                  <div className="text-4xl font-bold text-foreground mono tracking-tight">
                    {portfolioAPI.formatCurrency(portfolio.totalUSD)}
                  </div>
                  <div className={`text-sm mono ${
                    portfolio.totalChangePercent24h >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {portfolio.totalChangePercent24h >= 0 ? '+' : ''}
                    {portfolioAPI.formatCurrency(portfolio.totalChange24h)} ({portfolioAPI.formatPercentage(portfolio.totalChangePercent24h)})
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="text-xs text-muted-foreground mb-1">24h Change</div>
                    <div className={`text-lg font-semibold mono ${
                      portfolio.totalChangePercent24h >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {portfolioAPI.formatPercentage(portfolio.totalChangePercent24h)}
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <div className="text-xs text-muted-foreground mb-1">Active Chains</div>
                    <div className="text-lg font-semibold text-foreground mono">{portfolio.chains.length}</div>
                  </div>
                </div>
              </div>

              {/* Real Chain Breakdown */}
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground mono tracking-wider uppercase">
                  Chain Distribution
                </div>
                
                <div className="space-y-3">
                  {portfolio.chains.slice(0, 3).map((chain, index) => {
                    const colors = ['primary', 'success', 'accent'];
                    const color = colors[index] || 'muted';
                    
                    return (
                      <div key={chain.chainId} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 bg-${color}/20 rounded-full flex items-center justify-center`}>
                            <span className={`text-${color} text-xs font-bold`}>
                              {chain.chainName.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium">{chain.chainName}</span>
                        </div>
                        <div className="text-sm font-semibold mono">
                          {portfolioAPI.formatCurrency(chain.totalUSD)}
                        </div>
                      </div>
                    );
                  })}
                  
                  {portfolio.chains.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No assets found. Make sure you have supported tokens.
                    </div>
                  )}
                </div>
              </div>

              {/* Real Chart Area */}
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground mono tracking-wider uppercase">
                  Portfolio Allocation
                </div>
                
                <div className="h-32 bg-background/30 rounded-lg flex items-center justify-center">
                  {portfolio.chains.length > 0 ? (
                    <div className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  ) : (
                    <div className="text-muted-foreground text-sm">No data to display</div>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {portfolio.chains.slice(0, 3).map((chain, index) => {
                    const colors = ['primary', 'success', 'accent'];
                    const color = colors[index] || 'muted';
                    const percentage = portfolio.totalUSD > 0 ? (chain.totalUSD / portfolio.totalUSD) * 100 : 0;
                    
                    return (
                      <div key={chain.chainId} className="text-center">
                        <div className={`w-3 h-3 bg-${color} rounded-full mx-auto mb-1`} />
                        <div className="text-muted-foreground">
                          {chain.chainName.slice(0, 3).toUpperCase()} {percentage.toFixed(0)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : portfolio ? (
            // Connected but no meaningful portfolio data - show demo with note
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Portfolio Connected</h3>
              <p className="text-muted-foreground mb-6">
                Your wallet is connected! We're still loading your asset data or you may not have supported tokens yet.
              </p>
              
              {/* Show demo data with disclaimer */}
              <div className="bg-muted/10 rounded-lg p-6 mb-6">
                <div className="text-sm text-muted-foreground mb-4">Demo Portfolio Preview:</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-muted-foreground mono">$0.00</div>
                    <div className="text-sm text-muted-foreground">Current Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-muted-foreground mono">0.00%</div>
                    <div className="text-sm text-muted-foreground">24h Change</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-muted-foreground mono">{portfolio.chains.length}</div>
                    <div className="text-sm text-muted-foreground">Active Chains</div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground/60">
                Supported chains: Ethereum, Polygon, Base<br/>
                Add some ETH, MATIC, or other supported tokens to see your portfolio!
              </div>
            </div>
          ) : (
            // No portfolio data but connected
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Loading Portfolio...</h3>
              <p className="text-muted-foreground mb-6">
                We're fetching your portfolio data. This may take a moment.
              </p>
              <div className="text-sm text-muted-foreground/60">
                Supported: Ethereum, Polygon, Base
              </div>
            </div>
          )}
        </motion.div>

        {/* Dynamic CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-6">
            <Link href="/portfolio">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 px-12 py-4 text-base font-semibold rounded-xl btn-glow focus-enhanced"
              >
                {mounted && isConnected && portfolio ? 'View Full Portfolio' : 'View Portfolio Tracker'}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <div className="text-xs text-muted-foreground/40 mono tracking-widest">
              {mounted && isConnected && portfolio 
                ? `LAST UPDATED: ${new Date(portfolio.lastUpdated).toLocaleTimeString()}`
                : 'CONNECT WALLET TO START TRACKING'
              }
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}