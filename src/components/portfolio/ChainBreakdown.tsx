"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";
import { ChainBalance } from "@/types/portfolio";
import { portfolioAPI } from "@/lib/portfolio-api";
import { Button } from "@/components/ui/button";

interface ChainBreakdownProps {
  chains: ChainBalance[];
  totalUSD: number;
}

export function ChainBreakdown({ chains, totalUSD }: ChainBreakdownProps) {
  const [expandedChains, setExpandedChains] = useState<Set<number>>(new Set());

  const toggleChain = (chainId: number) => {
    const newExpanded = new Set(expandedChains);
    if (newExpanded.has(chainId)) {
      newExpanded.delete(chainId);
    } else {
      newExpanded.add(chainId);
    }
    setExpandedChains(newExpanded);
  };

  const getChainPercentage = (chainUSD: number): number => {
    return totalUSD > 0 ? (chainUSD / totalUSD) * 100 : 0;
  };

  return (
    <motion.div
      className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Chain Breakdown</h3>
        <p className="text-sm text-muted-foreground">
          Assets distributed across {chains.length} blockchain{chains.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Chain List */}
      <div className="space-y-4">
        {chains.map((chain, index) => {
          const isExpanded = expandedChains.has(chain.chainId);
          const percentage = getChainPercentage(chain.totalUSD);

          return (
            <motion.div
              key={chain.chainId}
              className="border border-border/30 rounded-xl overflow-hidden bg-background/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Chain Header */}
              <button
                onClick={() => toggleChain(chain.chainId)}
                className="w-full p-6 flex items-center justify-between hover:bg-muted/10 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {/* Chain Icon */}
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    {chain.chainIcon ? (
                      <img 
                        src={chain.chainIcon} 
                        alt={chain.chainName}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <span className="text-primary font-bold text-sm">
                        {chain.chainName.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Chain Info */}
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{chain.chainName}</div>
                    <div className="text-sm text-muted-foreground">
                      {chain.tokens.length} token{chain.tokens.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Value and Percentage */}
                  <div className="text-right">
                    <div className="font-bold text-foreground mono">
                      {portfolioAPI.formatCurrency(chain.totalUSD)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {percentage.toFixed(1)}% of portfolio
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="text-muted-foreground">
                    {isExpanded ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </div>
              </button>

              {/* Progress Bar */}
              <div className="px-6 pb-2">
                <div className="w-full bg-muted/20 rounded-full h-1">
                  <motion.div
                    className="bg-primary h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </div>

              {/* Expanded Token List */}
              {isExpanded && (
                <motion.div
                  className="border-t border-border/20 bg-muted/5"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 space-y-4">
                    {chain.tokens.map((tokenBalance, tokenIndex) => {
                      const tokenPercentage = chain.totalUSD > 0 
                        ? (tokenBalance.balanceUSD / chain.totalUSD) * 100 
                        : 0;
                      const isTokenPositive = tokenBalance.priceChange24h >= 0;

                      return (
                        <motion.div
                          key={`${tokenBalance.token.address}-${tokenBalance.token.chainId}`}
                          className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: tokenIndex * 0.05 }}
                        >
                          {/* Token Info */}
                          <div className="flex items-center space-x-3">
                            {tokenBalance.token.logoURI ? (
                              <img
                                src={tokenBalance.token.logoURI}
                                alt={tokenBalance.token.symbol}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                                <span className="text-accent text-xs font-bold">
                                  {tokenBalance.token.symbol.charAt(0)}
                                </span>
                              </div>
                            )}
                            
                            <div>
                              <div className="font-medium text-foreground">
                                {tokenBalance.token.symbol}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {tokenBalance.token.name}
                              </div>
                            </div>
                          </div>

                          {/* Token Stats */}
                          <div className="text-right space-y-1">
                            <div className="font-semibold text-foreground mono">
                              {portfolioAPI.formatCurrency(tokenBalance.balanceUSD)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {portfolioAPI.formatTokenAmount(
                                tokenBalance.balance, 
                                tokenBalance.token.decimals
                              )} {tokenBalance.token.symbol}
                            </div>
                            <div className={`text-xs mono ${
                              isTokenPositive ? 'text-success' : 'text-destructive'
                            }`}>
                              {portfolioAPI.formatPercentage(tokenBalance.priceChange24h)}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Chain Actions */}
                    <div className="pt-4 border-t border-border/20">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          View on block explorer
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink size={14} className="mr-2" />
                          Explorer
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      {chains.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-muted-foreground text-2xl">💰</span>
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">No Assets Found</h4>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Connect your wallet and make sure you have supported tokens to see your portfolio breakdown.
          </p>
        </div>
      )}
    </motion.div>
  );
}