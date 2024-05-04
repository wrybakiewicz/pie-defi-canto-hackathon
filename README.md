![PieDeFi](./_assets/logo.png)

_Introducing The Future On-Chain Analytics_

## Info

This project is submission for **Canto Online Hackathon**.

URL: [piedefi.com](https://piedefi.com/) \
Video Presentation: [YouTube](https://youtu.be/X_2Az-COdvI)

Done by **Wojciech Rybakiewicz** and **Tomasz Skiba**

## Project description

PieDeFi revolutionizes the DeFi experience on the Canto network by simplifying the complexity of on-chain data. Our platform enhances transparency and fosters trust, making it easier for newcomers to engage with DeFi protocols. By providing a more intuitive and comprehensive view of data through real-time analytics and interactive visualizations, PieDeFi ensures that users are well-informed for making strategic decisions in the DeFi space.

### Key Features:

- Real-Time Analytics: Continuously updating data to provide the most current insights across various DeFi protocols.
- Interactive Dashboards: Users can explore detailed, protocol-specific dashboards that allow for in-depth analysis and comparison.
- User Behavior Insights: Gain insights into trading behaviors, including volume, frequency, and performance of specific addresses.
- Gamification of DeFi: Engage users by comparing their trading strategies against top traders, fostering a competitive and enjoyable experience.
- Featured Trades: Highlight top performers with rewards and visual cues for high achievers and underperformers on the homepage.
- Multi-Protocol Support: Plans to expand the service to include additional DeFi protocols like Canto Lending and Canto DEX.
- Mobile Optimization: Full functionality on mobile devices to track DeFi activities anytime, anywhere.

## Technical Components

### Indexer

- Retrieves and indexes transaction data from all blocks on the Canto blockchain related to supported DeFi protocols, requiring a connection to a full archive node.
- Monitors specific events such as position increases, decreases, liquidations, and price updates.

### Backend API

- Provides aggregated data for specific addresses involved in the Cadence protocol.
- Supplies detailed trading information including total and daily volumes, and the status of open and closed positions.
- Returns PnLs for all addresses that are calculated by PnL background worker

### PnL background worker

- Processes data for all addresses participating in the Cadence protocol, recalculating and storing PnL information in database for efficient access.

### Frontend

- Utilizes data from the Backend API to display interactive charts and tables that provide dynamic visual analytics.

## Conclusion

Thank you for your interest in PieDeFi. We are excited to develop and expand this platform, and we encourage you to explore it to enhance your DeFi trading strategies and insights.
