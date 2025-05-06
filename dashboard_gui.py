import streamlit as st
from mock_data import major_exchanges, arbitrage_signals, alert_feed, sample_user, portfolio_snapshot

st.set_page_config(page_title="Arbitrage Monitor Bot", layout="wide")

st.title("Arbitrage Monitor Bot Dashboard")

# Sidebar: User Profile and Settings
with st.sidebar:
    st.image(sample_user.avatar_url, width=80)
    st.markdown(f"**{sample_user.display_name}**")
    st.caption(sample_user.email_addr)
    st.selectbox("Theme", ["dark", "light"], index=0 if sample_user.settings["theme"] == "dark" else 1)
    st.checkbox("Enable Notifications", value=sample_user.settings["notifications"])
    st.slider("Minimum Profit Alert (%)", 0.1, 2.0, float(sample_user.settings["min_profit_alert"]))
    st.markdown("---")
    st.header("API Status")
    for api in sample_user.api_status:
        for ex, status in api.items():
            st.write(f"{ex.capitalize()}: {'✅' if status else '❌'}")
    st.markdown("---")
    st.button("Sign Out")

# Alerts
st.subheader("Recent Alerts")
for alert in alert_feed:
    st.info(f"[{alert.level.upper()}] {alert.content} ({alert.created_at[:16].replace('T',' ')})", icon=None)

# Exchanges Table
st.subheader("Supported Exchanges")
ex_cols = st.columns(len(major_exchanges))
for idx, ex in enumerate(major_exchanges):
    with ex_cols[idx]:
        st.image(ex.logo_url, width=40)
        st.markdown(f"**{ex.label}**")
        st.caption(f"Active: {'Yes' if ex.active else 'No'}")
        st.caption(f"Connected: {'Yes' if ex.connected else 'No'}")
        st.caption(f"API Ready: {'Yes' if ex.api_ready else 'No'}")

# Arbitrage Opportunities Table
st.subheader("Live Arbitrage Opportunities")
import pandas as pd

def signal_to_row(sig):
    return {
        "Type": sig.category.title(),
        "Asset": sig.instrument,
        "Source": sig.from_venue,
        "Target": sig.to_venue,
        "Profit (%)": f"{sig.pct_gain:.2f}",
        "Est. Return ($)": f"{sig.usd_gain:.2f}",
        "Risk": sig.risk_level.title(),
        "Active": "Yes" if sig.enabled else "No"
    }

arb_df = pd.DataFrame([signal_to_row(s) for s in arbitrage_signals])
st.dataframe(arb_df, use_container_width=True)

# Portfolio Overview
st.subheader("Portfolio Snapshot")
port_df = pd.DataFrame([
    {"Asset": p.ticker, "Amount": p.qty, "USD Value": p.usd_value, "Allocation (%)": p.pct_alloc, "Exchange": p.held_on}
    for p in portfolio_snapshot
])
st.dataframe(port_df, use_container_width=True)

# Auto-Trading Toggle
st.markdown("---")
auto_trade = st.toggle("Enable Auto-Trading Bot", value=False)
if auto_trade:
    st.success("Auto-Trading is ENABLED. The bot will execute arbitrage trades automatically.")
else:
    st.warning("Auto-Trading is DISABLED. Opportunities will only be displayed.")

# Estimated Profit Potential
st.markdown("---")
st.header("Estimated Profit Potential")
st.markdown("""
- **Typical profit per trade:** 0.2% – 1.5%
- **Potential daily profit:** $100 – $1,000+ (depends on capital, market, and execution speed)
- **Note:** All profits are estimates. Real results may vary.
""") 