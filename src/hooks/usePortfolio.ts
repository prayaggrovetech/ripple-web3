import { useState, useEffect, useCallback } from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { Portfolio, ChainBalance, TokenBalance, PortfolioError } from '@/types/portfolio';
import { portfolioAPI, SUPPORTED_TOKENS } from '@/lib/portfolio-api';
import { mainnet, polygon, base, sepolia } from 'wagmi/chains';

const SUPPORTED_CHAINS = [mainnet, polygon, base, sepolia];

export function usePortfolio() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PortfolioError | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  // Get native token balance for current chain only
  const { data: nativeBalance, refetch: refetchNativeBalance, error: balanceError } = useBalance({
    address,
    chainId, // Specify the current chain
    query: {
      enabled: !!address && isConnected && !!chainId,
      refetchInterval: 30000, // Refetch every 30 seconds
      retry: 3,
    },
  });

  const fetchPortfolio = useCallback(async () => {
    if (!address || !isConnected) {
      setPortfolio(null);
      return;
    }

    console.log('Fetching portfolio for:', { address, chainId, isConnected });

    setLoading(true);
    setError(null);

    try {
      // Real wallet integration enabled
      const chains: ChainBalance[] = [];
      let totalUSD = 0;
      let totalChange24h = 0;

      // Get all supported token symbols for price fetching
      const allSymbols = new Set<string>();
      SUPPORTED_CHAINS.forEach(chain => {
        const tokens = SUPPORTED_TOKENS[chain.id] || [];
        tokens.forEach(token => allSymbols.add(token.symbol));
      });

      // Fetch prices for all tokens with error handling
      let priceData: any = {};
      try {
        priceData = await portfolioAPI.fetchTokenPrices(Array.from(allSymbols));
      } catch (priceError) {
        console.warn('Price fetch failed, using fallback data:', priceError);
        // Continue with empty price data - will show balances without USD values
      }

      // Process each supported chain
      for (const chain of SUPPORTED_CHAINS) {
        // Only process the currently connected chain to avoid cross-chain balance errors
        if (chain.id !== chainId) {
          console.log(`Skipping chain ${chain.name} (${chain.id}) - not currently connected`);
          continue;
        }
        
        console.log(`Processing chain: ${chain.name} (${chain.id})`);
        const chainTokens = SUPPORTED_TOKENS[chain.id] || [];
        const tokenBalances: TokenBalance[] = [];
        let chainTotalUSD = 0;

        for (const token of chainTokens) {
          let balance = BigInt(0);
          
          try {
            // Only process native tokens for the currently connected chain
            if (token.address === '0x0000000000000000000000000000000000000000' && chain.id === chainId) {
              // Check for balance errors first
              if (balanceError) {
                console.warn(`Balance error for chain ${chain.id}:`, balanceError);
                continue;
              }
              
              balance = nativeBalance?.value || BigInt(0);
              console.log(`Balance for ${token.symbol} on chain ${chain.id}:`, balance.toString());
            }
            
            // Skip if no balance
            if (balance === BigInt(0)) continue;

            const price = priceData[token.symbol]?.usd || 0;
            const priceChange24h = priceData[token.symbol]?.usd_24h_change || 0;

            const tokenBalance = portfolioAPI.calculateTokenBalance(
              token,
              balance,
              price,
              priceChange24h
            );

            // Include all balances, even if price is 0 (will show token amount)
            tokenBalances.push(tokenBalance);
            chainTotalUSD += tokenBalance.balanceUSD;
            totalChange24h += (tokenBalance.balanceUSD * priceChange24h) / 100;
            
            console.log(`Added token balance:`, {
              symbol: token.symbol,
              chain: chain.name,
              balance: tokenBalance.balanceFormatted,
              usd: tokenBalance.balanceUSD
            });
          } catch (tokenError) {
            console.warn(`Error processing token ${token.symbol} on chain ${chain.id}:`, tokenError);
            // Continue with next token
          }
        }

        if (tokenBalances.length > 0) {
          chains.push({
            chainId: chain.id,
            chainName: chain.name,
            chainIcon: undefined, // Chain icons will be handled in the UI
            totalUSD: chainTotalUSD,
            tokens: tokenBalances.sort((a, b) => b.balanceUSD - a.balanceUSD), // Sort by USD value
          });

          totalUSD += chainTotalUSD;
        }
      }

      const totalChangePercent24h = totalUSD > 0 ? (totalChange24h / totalUSD) * 100 : 0;

      const newPortfolio: Portfolio = {
        totalUSD,
        totalChange24h,
        totalChangePercent24h,
        chains: chains.sort((a, b) => b.totalUSD - a.totalUSD), // Sort chains by total value
        lastUpdated: Date.now(),
      };

      setPortfolio(newPortfolio);
      setLastUpdated(Date.now());
    } catch (err) {
      console.error('Portfolio fetch error:', err);
      setError({
        message: err instanceof Error ? err.message : 'Failed to fetch portfolio data. Please try again.',
        retry: fetchPortfolio,
      });
    } finally {
      setLoading(false);
    }
  }, [address, isConnected, chainId, nativeBalance]);

  // Create demo portfolio data based on wallet address
  const createDemoPortfolio = (walletAddress: string): Portfolio => {
    // Use wallet address to generate consistent demo data
    const addressHash = walletAddress.slice(2, 10);
    const seed = parseInt(addressHash, 16);
    
    // Generate consistent but varied demo values
    const baseValue = 25000 + (seed % 50000); // $25k - $75k
    const ethValue = baseValue * 0.6;
    const maticValue = baseValue * 0.25;
    const baseChainValue = baseValue * 0.15;
    
    const change24h = ((seed % 200) - 100) / 10; // -10% to +10%
    
    const demoChains: ChainBalance[] = [
      {
        chainId: 1,
        chainName: 'Ethereum',
        chainIcon: undefined,
        totalUSD: ethValue,
        tokens: [
          {
            token: SUPPORTED_TOKENS[1][0], // ETH
            balance: '15000000000000000000', // 15 ETH
            balanceFormatted: '15.0',
            balanceUSD: ethValue,
            price: 2400,
            priceChange24h: change24h
          }
        ]
      },
      {
        chainId: 137,
        chainName: 'Polygon',
        chainIcon: undefined,
        totalUSD: maticValue,
        tokens: [
          {
            token: SUPPORTED_TOKENS[137][0], // MATIC
            balance: '29411764705882352941176', // ~25k MATIC
            balanceFormatted: '29411.76',
            balanceUSD: maticValue,
            price: 0.85,
            priceChange24h: change24h * 0.8
          }
        ]
      },
      {
        chainId: 8453,
        chainName: 'Base',
        chainIcon: undefined,
        totalUSD: baseChainValue,
        tokens: [
          {
            token: SUPPORTED_TOKENS[8453][0], // ETH on Base
            balance: '2500000000000000000', // 2.5 ETH
            balanceFormatted: '2.5',
            balanceUSD: baseChainValue,
            price: 2400,
            priceChange24h: change24h * 1.2
          }
        ]
      }
    ];

    const totalUSD = ethValue + maticValue + baseChainValue;
    const totalChange24h = (totalUSD * change24h) / 100;
    
    return {
      totalUSD,
      totalChange24h,
      totalChangePercent24h: change24h,
      chains: demoChains,
      lastUpdated: Date.now(),
    };
  };

  // Auto-refresh portfolio data
  useEffect(() => {
    if (!address || !isConnected) return;

    fetchPortfolio();

    // Set up auto-refresh every 60 seconds
    const interval = setInterval(fetchPortfolio, 60000);
    return () => clearInterval(interval);
  }, [fetchPortfolio, address, isConnected]);

  // Refresh when native balance changes
  useEffect(() => {
    if (nativeBalance && address && isConnected) {
      fetchPortfolio();
    }
  }, [nativeBalance, fetchPortfolio, address, isConnected]);

  const refresh = useCallback(() => {
    refetchNativeBalance();
    fetchPortfolio();
  }, [refetchNativeBalance, fetchPortfolio]);

  return {
    portfolio,
    loading,
    error,
    lastUpdated,
    refresh,
    isConnected,
  };
}