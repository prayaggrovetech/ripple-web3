export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  chainId: number;
}

export interface TokenBalance {
  token: Token;
  balance: string;
  balanceFormatted: string;
  balanceUSD: number;
  price: number;
  priceChange24h: number;
}

export interface ChainBalance {
  chainId: number;
  chainName: string;
  chainIcon?: string;
  totalUSD: number;
  tokens: TokenBalance[];
}

export interface Portfolio {
  totalUSD: number;
  totalChange24h: number;
  totalChangePercent24h: number;
  chains: ChainBalance[];
  lastUpdated: number;
}

export interface PriceData {
  [tokenAddress: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

export interface PortfolioError {
  message: string;
  code?: string;
  retry?: () => void;
}