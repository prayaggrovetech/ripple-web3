"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw, Wallet, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Portfolio } from "@/types/portfolio";
import { portfolioAPI } from "@/lib/portfolio-api";

interface PortfolioOverviewProps {
  portfolio: Portfolio;
  loading: boolean;
  onRefresh: () => void;
  lastUpdated: number;
}

export function PortfolioOverview({ 
  portfolio, 
  loading, 
  onRefresh, 
  lastUpdated 
}: PortfolioOverviewProps) {
  const isPositive = portfolio.totalChangePercent24h >= 0;
  const timeSinceUpdate = Math.floor((Date.now() - lastUpdated) / 1000);
  
  const formatTimeAgo = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <motion.div
      className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Wallet size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Portfolio Overview</h2>
            <p className="text-sm text-muted-foreground">
              {lastUpdated > 0 ? formatTimeAgo(timeSinceUpdate) : 'Never updated'}
            </p>
          </div>
        </div>
        
        <Button
          onClick={onRefresh}
          disabled={loading}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <RefreshCw 
            size={16} 
            className={`${loading ? 'animate-spin' : ''} text-muted-foreground`} 
          />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Value */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center space-x-2">
            <DollarSign size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground mono tracking-wider uppercase">
              Total Value
            </span>
          </div>
          <div className="text-4xl font-bold text-foreground mono tracking-tight">
            {portfolioAPI.formatCurrency(portfolio.totalUSD)}
          </div>
        </motion.div>

        {/* 24h Change */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2">
            {isPositive ? (
              <TrendingUp size={16} className="text-success" />
            ) : (
              <TrendingDown size={16} className="text-destructive" />
            )}
            <span className="text-sm text-muted-foreground mono tracking-wider uppercase">
              24h Change
            </span>
          </div>
          <div className="space-y-1">
            <div className={`text-2xl font-bold mono tracking-tight ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {portfolioAPI.formatPercentage(portfolio.totalChangePercent24h)}
            </div>
            <div className={`text-sm mono ${
              isPositive ? 'text-success/70' : 'text-destructive/70'
            }`}>
              {isPositive ? '+' : ''}{portfolioAPI.formatCurrency(portfolio.totalChange24h)}
            </div>
          </div>
        </motion.div>

        {/* Chain Count */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent/20 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-accent rounded-full" />
            </div>
            <span className="text-sm text-muted-foreground mono tracking-wider uppercase">
              Active Chains
            </span>
          </div>
          <div className="text-2xl font-bold text-foreground mono tracking-tight">
            {portfolio.chains.length}
          </div>
          <div className="flex items-center space-x-2">
            {portfolio.chains.slice(0, 3).map((chain, index) => (
              <div
                key={chain.chainId}
                className="w-6 h-6 bg-muted/20 rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground"
                title={chain.chainName}
              >
                {chain.chainName.charAt(0)}
              </div>
            ))}
            {portfolio.chains.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{portfolio.chains.length - 3}
              </div>
            )}
          </div>
        </motion.div>

      </div>

      {/* Performance Indicator */}
      <motion.div
        className="mt-8 pt-6 border-t border-border/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isPositive ? 'bg-success' : 'bg-destructive'
            }`} />
            <span className="text-sm text-muted-foreground">
              Portfolio is {isPositive ? 'performing well' : 'down'} today
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground/60 mono">
            Last sync: {new Date(portfolio.lastUpdated).toLocaleTimeString()}
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}