"use client";

import { motion } from "framer-motion";
import { AlertCircle, Wallet, WifiOff } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { PortfolioOverview } from "./PortfolioOverview";
import { ChainBreakdown } from "./ChainBreakdown";
import { PortfolioChart } from "./PortfolioChart";
import { WalletConnect } from "@/components/ui/WalletConnect";
import { Button } from "@/components/ui/button";

export function PortfolioTracker() {
  const { 
    portfolio, 
    loading, 
    error, 
    lastUpdated, 
    refresh, 
    isConnected 
  } = usePortfolio();

  // Loading state
  if (loading && !portfolio) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <motion.div
          className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Wallet size={24} className="text-primary" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Loading Portfolio</h3>
              <p className="text-muted-foreground">Fetching your assets across all chains...</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Not connected state
  if (!isConnected) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <motion.div
          className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center space-y-8">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <WifiOff size={32} className="text-destructive" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Wallet Not Connected</h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Please connect your wallet first to view your portfolio. Your wallet connection is required to fetch your assets across all supported chains.
              </p>
            </div>

            <div className="space-y-6">
              <WalletConnect />
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Supported wallets: MetaMask, WalletConnect, Coinbase Wallet</p>
                <p>Supported chains: Ethereum, Polygon, Base, Arbitrum, Optimism</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-border/20">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <Wallet size={20} className="text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Connect Wallet</h4>
                <p className="text-sm text-muted-foreground">
                  Securely connect your Web3 wallet to get started
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-accent text-xl">🏠</span>
                </div>
                <h4 className="font-semibold text-foreground">
                  <a href="/" className="hover:text-accent transition-colors">
                    Back to Home
                  </a>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Return to the main page to explore other features
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error && !portfolio) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <motion.div
          className="bg-destructive/5 border border-destructive/20 rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={24} className="text-destructive" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Failed to Load Portfolio</h3>
              <p className="text-muted-foreground mb-6">{error.message}</p>
              
              <div className="flex items-center justify-center space-x-4">
                <Button onClick={error.retry} variant="outline">
                  Try Again
                </Button>
                <Button onClick={refresh} variant="secondary">
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // No portfolio data
  if (!portfolio) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <motion.div
          className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
              <WifiOff size={24} className="text-muted-foreground" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Portfolio Data</h3>
              <p className="text-muted-foreground mb-6">
                Unable to fetch portfolio information. Please check your connection and try again.
              </p>
              
              <Button onClick={refresh} variant="outline">
                Retry
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main portfolio display
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-8">
        
        {/* Portfolio Overview */}
        <PortfolioOverview
          portfolio={portfolio}
          loading={loading}
          onRefresh={refresh}
          lastUpdated={lastUpdated}
        />

        {/* Charts and Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Portfolio Chart */}
          <PortfolioChart
            chains={portfolio.chains}
            totalUSD={portfolio.totalUSD}
          />

          {/* Chain Breakdown */}
          <ChainBreakdown
            chains={portfolio.chains}
            totalUSD={portfolio.totalUSD}
          />
          
        </div>

        {/* Error Banner (if error but portfolio exists) */}
        {error && portfolio && (
          <motion.div
            className="bg-destructive/5 border border-destructive/20 rounded-xl p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle size={16} className="text-destructive" />
                <span className="text-sm text-destructive">
                  {error.message}
                </span>
              </div>
              {error.retry && (
                <Button onClick={error.retry} variant="ghost" size="sm">
                  Retry
                </Button>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}