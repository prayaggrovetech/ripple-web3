import { PriceData, Token, TokenBalance } from '@/types/portfolio';
import { formatUnits } from 'viem';

// CoinGecko API for price data
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Token lists for major chains
export const SUPPORTED_TOKENS: Record<number, Token[]> = {
  // Ethereum Mainnet
  1: [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      chainId: 1,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    },
    {
      address: '0xA0b86a33E6441c8C06DD2b7c94b7E0e8b8b8b8b8',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainId: 1,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png'
    },
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainId: 1,
      logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png'
    }
  ],
  // Polygon
  137: [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'MATIC',
      name: 'Polygon',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png'
    }
  ],
  // Base
  8453: [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      chainId: 8453,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    }
  ],
  // Sepolia Testnet
  11155111: [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      name: 'Sepolia ETH',
      decimals: 18,
      chainId: 11155111,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    }
  ]
};

// CoinGecko ID mapping for price fetching
const COINGECKO_IDS: Record<string, string> = {
  'ETH': 'ethereum',
  'USDC': 'usd-coin',
  'USDT': 'tether',
  'MATIC': 'matic-network',
  'WETH': 'ethereum',
  'DAI': 'dai',
  'LINK': 'chainlink',
  'UNI': 'uniswap'
};

export class PortfolioAPI {
  private static instance: PortfolioAPI;
  private priceCache = new Map<string, { data: PriceData; timestamp: number }>();
  private readonly CACHE_DURATION = 30000; // 30 seconds

  static getInstance(): PortfolioAPI {
    if (!PortfolioAPI.instance) {
      PortfolioAPI.instance = new PortfolioAPI();
    }
    return PortfolioAPI.instance;
  }

  async fetchTokenPrices(symbols: string[]): Promise<PriceData> {
    // Re-enabled real API calls with fallback
    console.log('Fetching real token prices for:', symbols);
    const cacheKey = symbols.sort().join(',');
    const cached = this.priceCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const coinIds = symbols
        .map(symbol => COINGECKO_IDS[symbol.toUpperCase()])
        .filter(Boolean)
        .join(',');

      if (!coinIds) {
        console.warn('No supported tokens found for symbols:', symbols);
        return this.getFallbackPrices(symbols);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(
        `${COINGECKO_API}/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`,
        {
          headers: {
            'Accept': 'application/json',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Price API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transform to our format
      const priceData: PriceData = {};
      Object.entries(data).forEach(([coinId, priceInfo]: [string, any]) => {
        const symbol = Object.entries(COINGECKO_IDS).find(([_, id]) => id === coinId)?.[0];
        if (symbol) {
          priceData[symbol] = {
            usd: priceInfo.usd || 0,
            usd_24h_change: priceInfo.usd_24h_change || 0
          };
        }
      });

      // Cache the result
      this.priceCache.set(cacheKey, {
        data: priceData,
        timestamp: Date.now()
      });

      return priceData;
    } catch (error) {
      console.error('Failed to fetch token prices:', error);
      
      // Return cached data if available
      if (cached?.data) {
        console.log('Using cached price data due to API error');
        return cached.data;
      }
      
      // Return fallback prices as last resort
      console.log('Using fallback price data due to API error');
      return this.getFallbackPrices(symbols);
    }
  }

  private getFallbackPrices(symbols: string[]): PriceData {
    // Fallback prices for common tokens (approximate values)
    const fallbackPrices: Record<string, { usd: number; usd_24h_change: number }> = {
      'ETH': { usd: 2400, usd_24h_change: 2.5 },
      'MATIC': { usd: 0.85, usd_24h_change: 1.2 },
      'USDC': { usd: 1.00, usd_24h_change: 0.1 },
      'USDT': { usd: 1.00, usd_24h_change: 0.0 },
      'DAI': { usd: 1.00, usd_24h_change: 0.0 },
    };

    const priceData: PriceData = {};
    symbols.forEach(symbol => {
      const upperSymbol = symbol.toUpperCase();
      if (fallbackPrices[upperSymbol]) {
        priceData[upperSymbol] = fallbackPrices[upperSymbol];
      }
    });

    return priceData;
  }

  calculateTokenBalance(
    token: Token,
    rawBalance: bigint,
    price: number,
    priceChange24h: number
  ): TokenBalance {
    const balanceFormatted = formatUnits(rawBalance, token.decimals);
    const balanceUSD = parseFloat(balanceFormatted) * price;

    return {
      token,
      balance: rawBalance.toString(),
      balanceFormatted,
      balanceUSD,
      price,
      priceChange24h
    };
  }

  formatCurrency(amount: number): string {
    if (amount === 0) return '$0.00';
    
    if (amount < 0.01) {
      return `$${amount.toFixed(6)}`;
    }
    
    if (amount < 1) {
      return `$${amount.toFixed(4)}`;
    }
    
    if (amount < 1000) {
      return `$${amount.toFixed(2)}`;
    }
    
    if (amount < 1000000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    
    return `$${(amount / 1000000).toFixed(1)}M`;
  }

  formatPercentage(percentage: number): string {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  }

  formatTokenAmount(amount: string, decimals: number = 18): string {
    const num = parseFloat(formatUnits(BigInt(amount), decimals));
    
    if (num === 0) return '0';
    if (num < 0.0001) return '<0.0001';
    if (num < 1) return num.toFixed(4);
    if (num < 1000) return num.toFixed(2);
    if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
    
    return `${(num / 1000000).toFixed(1)}M`;
  }
}

export const portfolioAPI = PortfolioAPI.getInstance();