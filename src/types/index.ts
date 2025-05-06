export interface Exchange {
  id: string;
  name: string;
  logo: string;
  isActive: boolean;
  isConnected: boolean;
  apiKeyConfigured: boolean;
  supportedPairs: string[];
}

export interface CryptoPair {
  id: string;
  baseAsset: string;
  quoteAsset: string;
  name: string;
}

export interface PriceData {
  exchange: string;
  price: number;
  volume24h: number;
  lastUpdated: string;
}

export interface ArbitrageOpportunity {
  id: string;
  type: 'cross-exchange' | 'triangular' | 'dex';
  sourceExchange: string;
  targetExchange: string;
  asset: string;
  baseAsset?: string;
  quoteAsset?: string;
  profitPercentage: number;
  estimatedProfit: number;
  volume24h: number;
  timestamp: string;
  difficulty: 'easy' | 'medium' | 'hard';
  path?: string[];
  risk: 'low' | 'medium' | 'high';
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'free' | 'premium' | 'enterprise';
  apiKeys: {
    exchange: string;
    isConfigured: boolean;
  }[];
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    minProfitAlert: number;
  };
}

export interface Alert {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PortfolioAsset {
  asset: string;
  amount: number;
  valueUSD: number;
  allocation: number;
  exchange: string;
}