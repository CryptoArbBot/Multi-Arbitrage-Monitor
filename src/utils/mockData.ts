import { 
  Exchange, 
  CryptoPair, 
  PriceData, 
  ArbitrageOpportunity,
  User,
  Alert,
  PortfolioAsset
} from '../types';

export const mockExchanges: Exchange[] = [
  {
    id: 'binance',
    name: 'Binance',
    logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    isActive: true,
    isConnected: true,
    apiKeyConfigured: true,
    supportedPairs: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'ADA/USDT']
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    logo: 'https://cryptologos.cc/logos/coinbase-coin-logo.png',
    isActive: true,
    isConnected: true,
    apiKeyConfigured: true,
    supportedPairs: ['BTC/USD', 'ETH/USD', 'SOL/USD', 'XRP/USD', 'ADA/USD']
  },
  {
    id: 'kraken',
    name: 'Kraken',
    logo: 'https://cryptologos.cc/logos/kraken-logo.png',
    isActive: true,
    isConnected: false,
    apiKeyConfigured: false,
    supportedPairs: ['BTC/USD', 'ETH/USD', 'SOL/USD', 'XRP/USD', 'ADA/USD']
  },
  {
    id: 'kucoin',
    name: 'KuCoin',
    logo: 'https://cryptologos.cc/logos/kucoin-token-kcs-logo.png',
    isActive: false,
    isConnected: false,
    apiKeyConfigured: false,
    supportedPairs: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'ADA/USDT']
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
    isActive: true,
    isConnected: true,
    apiKeyConfigured: true,
    supportedPairs: ['ETH/USDC', 'WBTC/ETH', 'UNI/ETH', 'LINK/ETH', 'AAVE/ETH']
  }
];

export const mockCryptoPairs: CryptoPair[] = [
  { id: 'btcusdt', baseAsset: 'BTC', quoteAsset: 'USDT', name: 'Bitcoin/USDT' },
  { id: 'ethusdt', baseAsset: 'ETH', quoteAsset: 'USDT', name: 'Ethereum/USDT' },
  { id: 'solusdt', baseAsset: 'SOL', quoteAsset: 'USDT', name: 'Solana/USDT' },
  { id: 'xrpusdt', baseAsset: 'XRP', quoteAsset: 'USDT', name: 'Ripple/USDT' },
  { id: 'adausdt', baseAsset: 'ADA', quoteAsset: 'USDT', name: 'Cardano/USDT' },
];

export const mockPriceData: Record<string, PriceData[]> = {
  'btcusdt': [
    { exchange: 'Binance', price: 65423.14, volume24h: 2134567890, lastUpdated: new Date().toISOString() },
    { exchange: 'Coinbase', price: 65455.89, volume24h: 1876543210, lastUpdated: new Date().toISOString() },
    { exchange: 'Kraken', price: 65418.63, volume24h: 987654321, lastUpdated: new Date().toISOString() },
    { exchange: 'KuCoin', price: 65471.02, volume24h: 765432109, lastUpdated: new Date().toISOString() },
  ],
  'ethusdt': [
    { exchange: 'Binance', price: 3478.92, volume24h: 1234567890, lastUpdated: new Date().toISOString() },
    { exchange: 'Coinbase', price: 3480.17, volume24h: 987654321, lastUpdated: new Date().toISOString() },
    { exchange: 'Kraken', price: 3475.64, volume24h: 876543210, lastUpdated: new Date().toISOString() },
    { exchange: 'KuCoin', price: 3482.31, volume24h: 765432109, lastUpdated: new Date().toISOString() },
  ],
  'solusdt': [
    { exchange: 'Binance', price: 178.35, volume24h: 876543210, lastUpdated: new Date().toISOString() },
    { exchange: 'Coinbase', price: 178.92, volume24h: 765432109, lastUpdated: new Date().toISOString() },
    { exchange: 'Kraken', price: 178.15, volume24h: 654321098, lastUpdated: new Date().toISOString() },
    { exchange: 'KuCoin', price: 179.05, volume24h: 543210987, lastUpdated: new Date().toISOString() },
  ],
};

export const mockArbitrageOpportunities: ArbitrageOpportunity[] = [
  {
    id: '1',
    type: 'cross-exchange',
    sourceExchange: 'Binance',
    targetExchange: 'Coinbase',
    asset: 'BTC/USDT',
    profitPercentage: 0.58,
    estimatedProfit: 378.52,
    volume24h: 4532981,
    timestamp: new Date().toISOString(),
    difficulty: 'easy',
    risk: 'low',
    isActive: true
  },
  {
    id: '2',
    type: 'triangular',
    sourceExchange: 'Binance',
    targetExchange: 'Binance',
    asset: 'ETH',
    baseAsset: 'ETH',
    quoteAsset: 'USDT',
    profitPercentage: 0.42,
    estimatedProfit: 216.76,
    volume24h: 3219876,
    timestamp: new Date().toISOString(),
    path: ['ETH/USDT', 'BTC/USDT', 'ETH/BTC'],
    difficulty: 'medium',
    risk: 'medium',
    isActive: true
  },
  {
    id: '3',
    type: 'cross-exchange',
    sourceExchange: 'KuCoin',
    targetExchange: 'Kraken',
    asset: 'SOL/USDT',
    profitPercentage: 0.89,
    estimatedProfit: 152.63,
    volume24h: 1987654,
    timestamp: new Date().toISOString(),
    difficulty: 'medium',
    risk: 'medium',
    isActive: true
  },
  {
    id: '4',
    type: 'dex',
    sourceExchange: 'Uniswap',
    targetExchange: 'Binance',
    asset: 'ETH/USDC',
    profitPercentage: 1.32,
    estimatedProfit: 421.87,
    volume24h: 2198765,
    timestamp: new Date().toISOString(),
    difficulty: 'hard',
    risk: 'high',
    isActive: true
  },
  {
    id: '5',
    type: 'cross-exchange',
    sourceExchange: 'Coinbase',
    targetExchange: 'Binance',
    asset: 'BTC/USDT',
    profitPercentage: 0.27,
    estimatedProfit: 178.43,
    volume24h: 3876542,
    timestamp: new Date().toISOString(),
    difficulty: 'easy',
    risk: 'low',
    isActive: true
  },
];

export const mockUser: User = {
  id: '1',
  name: 'Alex Trader',
  email: 'alex@example.com',
  avatar: 'https://i.pravatar.cc/150?img=12',
  role: 'premium',
  apiKeys: [
    { exchange: 'binance', isConfigured: true },
    { exchange: 'coinbase', isConfigured: true },
    { exchange: 'kraken', isConfigured: false },
    { exchange: 'kucoin', isConfigured: false },
    { exchange: 'uniswap', isConfigured: true },
  ],
  preferences: {
    theme: 'dark',
    notifications: true,
    minProfitAlert: 0.5
  }
};

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'success',
    message: 'New arbitrage opportunity detected: BTC on Binance -> Coinbase (0.58%)',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    read: false
  },
  {
    id: '2',
    type: 'info',
    message: 'Price alert triggered: ETH exceeded $3,500 on multiple exchanges',
    timestamp: new Date(Date.now() - 22 * 60000).toISOString(),
    read: true
  },
  {
    id: '3',
    type: 'warning',
    message: 'API connection to Kraken interrupted. Check your settings.',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    read: false
  },
];

export const mockPortfolio: PortfolioAsset[] = [
  { asset: 'BTC', amount: 0.56, valueUSD: 36636.95, allocation: 45.2, exchange: 'Binance' },
  { asset: 'ETH', amount: 5.23, valueUSD: 18195.48, allocation: 22.4, exchange: 'Coinbase' },
  { asset: 'SOL', amount: 42.8, valueUSD: 7633.38, allocation: 9.4, exchange: 'Binance' },
  { asset: 'USDT', amount: 18500, valueUSD: 18500, allocation: 22.8, exchange: 'Binance' },
];