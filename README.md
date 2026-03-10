# Albion Market Tracker

Real-time Albion Online market data tracker with comprehensive price analysis, gold tracking, and item database.

## Features

### 🏪 Market Data
- **Real-time Prices**: Live market prices from all major cities
- **Multi-server Support**: Americas, Asia, and Europe servers
- **Price History**: Historical data with customizable time ranges
- **Quality Levels**: Support for all item qualities (1-5)

### 💰 Gold Tracking
- **Live Gold Prices**: Real-time gold price updates
- **Historical Charts**: Gold price trends over time
- **Multi-region**: Track gold prices across different servers

### 🔍 Item Database
- **6000+ Items**: Complete Albion Online item database
- **Advanced Search**: Filter by tier, category, and name
- **Multi-language**: Support for multiple item name localizations
- **Item Details**: Complete item information including categories and tiers

### 📊 Analytics
- **Price Trends**: Visualize price changes over time
- **Market Overview**: Dashboard with key metrics
- **Comparison Tools**: Compare prices across locations
- **Volume Analysis**: Track market volume and activity

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom Albion-themed design
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for modern iconography
- **API**: Albion Online Data Project API integration
- **Build**: Create React App with modern tooling

## API Integration

This application uses the [Albion Online Data Project](https://www.albion-online-data.com/) API:

- **Market Prices**: `/api/v2/stats/prices/{item_ids}.json`
- **Historical Data**: `/api/v2/stats/history/{item_ids}.json`
- **Gold Prices**: `/api/v2/stats/gold.json`
- **Item Database**: GitHub raw data from ao-bin-dumps

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/albion-market-tracker.git
cd albion-market-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

### Searching Items
1. Navigate to the Market tab
2. Use the search bar to find items by name
3. Apply filters for tier and category
4. Select up to 10 items for comparison

### Viewing Market Data
1. Select items you want to track
2. View real-time prices across major cities
3. Check price history and trends
4. Compare buy/sell orders

### Gold Price Tracking
1. Navigate to the Gold Prices tab
2. View current gold prices
3. Analyze historical trends
4. Track price changes over time

## Features in Detail

### Dashboard
- **Overview Cards**: Total items, selected items, current gold price
- **Market Summary**: Recent market activity and price changes
- **Quick Stats**: Key metrics at a glance

### Market Analysis
- **Price Cards**: Detailed price information for each item
- **Location Comparison**: Prices across different cities
- **Quality Variations**: Different quality levels for items
- **Timestamps**: Last updated information

### Search & Filters
- **Real-time Search**: Instant item search as you type
- **Tier Filter**: Filter items by tier level (T1-T8)
- **Category Filter**: Browse by item categories
- **Multi-selection**: Select multiple items for comparison

## API Rate Limits

The Albion Online Data Project API has the following rate limits:
- **180 requests per 1 minute**
- **300 requests per 5 minutes**

This application implements intelligent caching and request batching to stay within these limits.

## Data Sources

- **Market Data**: Albion Online Data Project API
- **Item Database**: ao-bin-dumps (GitHub)
- **Location Data**: World data from official dumps
- **Gold Prices**: Real-time API feeds

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Albion Online Data Project** for providing the amazing API
- **Sandbox Interactive GmbH** for creating Albion Online
- **Community Contributors** for feedback and suggestions

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/albion-market-tracker/issues) page
2. Create a new issue with detailed information
3. Join our Discord community (link coming soon)

## Roadmap

### Upcoming Features
- [ ] Price alerts and notifications
- [ ] Advanced charting and technical analysis
- [ ] Crafting calculator integration
- [ ] Profit tracking tools
- [ ] Mobile app version
- [ ] Real-time WebSocket connections
- [ ] Portfolio management
- [ ] Export functionality (CSV, JSON)
- [ ] API key management for higher limits

### Improvements
- [ ] Performance optimizations
- [ ] Offline mode support
- [ ] Additional language support
- [ ] Dark/light theme toggle
- [ ] Customizable dashboard

---

**Disclaimer**: This application is not affiliated with Albion Online or Sandbox Interactive GmbH. All game data and assets belong to their respective owners.
