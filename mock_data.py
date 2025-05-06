from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime, timedelta

@dataclass
class ExchangeInfo:
    uid: str
    label: str
    logo_url: str
    active: bool
    connected: bool
    api_ready: bool
    pairs: List[str]

major_exchanges = [
    ExchangeInfo(
        uid='binance',
        label='Binance',
        logo_url='https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
        active=True,
        connected=True,
        api_ready=True,
        pairs=['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'ADA/USDT']
    ),
    ExchangeInfo(
        uid='coinbase',
        label='Coinbase',
        logo_url='https://cryptologos.cc/logos/coinbase-coin-logo.png',
        active=True,
        connected=True,
        api_ready=True,
        pairs=['BTC/USD', 'ETH/USD', 'SOL/USD', 'XRP/USD', 'ADA/USD']
    ),
    ExchangeInfo(
        uid='kraken',
        label='Kraken',
        logo_url='https://cryptologos.cc/logos/kraken-logo.png',
        active=True,
        connected=False,
        api_ready=False,
        pairs=['BTC/USD', 'ETH/USD', 'SOL/USD', 'XRP/USD', 'ADA/USD']
    ),
    ExchangeInfo(
        uid='kucoin',
        label='KuCoin',
        logo_url='https://cryptologos.cc/logos/kucoin-token-kcs-logo.png',
        active=False,
        connected=False,
        api_ready=False,
        pairs=['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'ADA/USDT']
    ),
    ExchangeInfo(
        uid='uniswap',
        label='Uniswap',
        logo_url='https://cryptologos.cc/logos/uniswap-uni-logo.png',
        active=True,
        connected=True,
        api_ready=True,
        pairs=['ETH/USDC', 'WBTC/ETH', 'UNI/ETH', 'LINK/ETH', 'AAVE/ETH']
    ),
]

crypto_pairs = [
    {"symbol": "BTCUSDT", "base": "BTC", "quote": "USDT", "desc": "Bitcoin/USDT"},
    {"symbol": "ETHUSDT", "base": "ETH", "quote": "USDT", "desc": "Ethereum/USDT"},
    {"symbol": "SOLUSDT", "base": "SOL", "quote": "USDT", "desc": "Solana/USDT"},
    {"symbol": "XRPUSDT", "base": "XRP", "quote": "USDT", "desc": "Ripple/USDT"},
    {"symbol": "ADAUSDT", "base": "ADA", "quote": "USDT", "desc": "Cardano/USDT"},
]

price_snapshots = {
    "BTCUSDT": [
        {"venue": "Binance", "last": 65423.14, "vol": 2134567890, "updated": datetime.utcnow().isoformat()},
        {"venue": "Coinbase", "last": 65455.89, "vol": 1876543210, "updated": datetime.utcnow().isoformat()},
        {"venue": "Kraken", "last": 65418.63, "vol": 987654321, "updated": datetime.utcnow().isoformat()},
        {"venue": "KuCoin", "last": 65471.02, "vol": 765432109, "updated": datetime.utcnow().isoformat()},
    ],
    "ETHUSDT": [
        {"venue": "Binance", "last": 3478.92, "vol": 1234567890, "updated": datetime.utcnow().isoformat()},
        {"venue": "Coinbase", "last": 3480.17, "vol": 987654321, "updated": datetime.utcnow().isoformat()},
        {"venue": "Kraken", "last": 3475.64, "vol": 876543210, "updated": datetime.utcnow().isoformat()},
        {"venue": "KuCoin", "last": 3482.31, "vol": 765432109, "updated": datetime.utcnow().isoformat()},
    ],
    "SOLUSDT": [
        {"venue": "Binance", "last": 178.35, "vol": 876543210, "updated": datetime.utcnow().isoformat()},
        {"venue": "Coinbase", "last": 178.92, "vol": 765432109, "updated": datetime.utcnow().isoformat()},
        {"venue": "Kraken", "last": 178.15, "vol": 654321098, "updated": datetime.utcnow().isoformat()},
        {"venue": "KuCoin", "last": 179.05, "vol": 543210987, "updated": datetime.utcnow().isoformat()},
    ],
}

@dataclass
class ArbitrageSignal:
    ref: str
    category: str
    from_venue: str
    to_venue: str
    instrument: str
    base: Optional[str] = None
    quote: Optional[str] = None
    pct_gain: float = 0.0
    usd_gain: float = 0.0
    liquidity: float = 0.0
    time_found: str = ""
    complexity: str = ""
    route: Optional[List[str]] = None
    risk_level: str = ""
    enabled: bool = True

arbitrage_signals = [
    ArbitrageSignal(
        ref="1",
        category="cross-exchange",
        from_venue="Binance",
        to_venue="Coinbase",
        instrument="BTC/USDT",
        pct_gain=0.58,
        usd_gain=378.52,
        liquidity=4532981,
        time_found=datetime.utcnow().isoformat(),
        complexity="easy",
        risk_level="low",
        enabled=True
    ),
    ArbitrageSignal(
        ref="2",
        category="triangular",
        from_venue="Binance",
        to_venue="Binance",
        instrument="ETH",
        base="ETH",
        quote="USDT",
        pct_gain=0.42,
        usd_gain=216.76,
        liquidity=3219876,
        time_found=datetime.utcnow().isoformat(),
        route=["ETH/USDT", "BTC/USDT", "ETH/BTC"],
        complexity="medium",
        risk_level="medium",
        enabled=True
    ),
    ArbitrageSignal(
        ref="3",
        category="cross-exchange",
        from_venue="KuCoin",
        to_venue="Kraken",
        instrument="SOL/USDT",
        pct_gain=0.89,
        usd_gain=152.63,
        liquidity=1987654,
        time_found=datetime.utcnow().isoformat(),
        complexity="medium",
        risk_level="medium",
        enabled=True
    ),
    ArbitrageSignal(
        ref="4",
        category="dex",
        from_venue="Uniswap",
        to_venue="Binance",
        instrument="ETH/USDC",
        pct_gain=1.32,
        usd_gain=421.87,
        liquidity=2198765,
        time_found=datetime.utcnow().isoformat(),
        complexity="hard",
        risk_level="high",
        enabled=True
    ),
    ArbitrageSignal(
        ref="5",
        category="cross-exchange",
        from_venue="Coinbase",
        to_venue="Binance",
        instrument="BTC/USDT",
        pct_gain=0.27,
        usd_gain=178.43,
        liquidity=3876542,
        time_found=datetime.utcnow().isoformat(),
        complexity="easy",
        risk_level="low",
        enabled=True
    ),
]

@dataclass
class UserProfile:
    user_id: str
    display_name: str
    email_addr: str
    avatar_url: str
    tier: str
    api_status: List[Dict[str, bool]]
    settings: Dict[str, object]

sample_user = UserProfile(
    user_id="1",
    display_name="Alex Trader",
    email_addr="alex@example.com",
    avatar_url="https://i.pravatar.cc/150?img=12",
    tier="premium",
    api_status=[
        {"binance": True},
        {"coinbase": True},
        {"kraken": False},
        {"kucoin": False},
        {"uniswap": True},
    ],
    settings={
        "theme": "dark",
        "notifications": True,
        "min_profit_alert": 0.5
    }
)

@dataclass
class AlertMsg:
    alert_id: str
    level: str
    content: str
    created_at: str
    seen: bool

alert_feed = [
    AlertMsg(
        alert_id="1",
        level="success",
        content="New arbitrage opportunity detected: BTC on Binance -> Coinbase (0.58%)",
        created_at=(datetime.utcnow() - timedelta(minutes=5)).isoformat(),
        seen=False
    ),
    AlertMsg(
        alert_id="2",
        level="info",
        content="Price alert triggered: ETH exceeded $3,500 on multiple exchanges",
        created_at=(datetime.utcnow() - timedelta(minutes=22)).isoformat(),
        seen=True
    ),
    AlertMsg(
        alert_id="3",
        level="warning",
        content="API connection to Kraken interrupted. Check your settings.",
        created_at=(datetime.utcnow() - timedelta(minutes=120)).isoformat(),
        seen=False
    ),
]

@dataclass
class AssetPosition:
    ticker: str
    qty: float
    usd_value: float
    pct_alloc: float
    held_on: str

portfolio_snapshot = [
    AssetPosition(ticker="BTC", qty=0.56, usd_value=36636.95, pct_alloc=45.2, held_on="Binance"),
    AssetPosition(ticker="ETH", qty=5.23, usd_value=18195.48, pct_alloc=22.4, held_on="Coinbase"),
    AssetPosition(ticker="SOL", qty=42.8, usd_value=7633.38, pct_alloc=9.4, held_on="Binance"),
    AssetPosition(ticker="USDT", qty=18500, usd_value=18500, pct_alloc=22.8, held_on="Binance"),
] 