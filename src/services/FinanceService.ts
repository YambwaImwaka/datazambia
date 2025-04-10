
// This file re-exports all finance services for backwards compatibility
// This prevents breaking changes while refactoring

export { 
  fetchExchangeRates,
  type ExchangeRateData 
} from './exchange-rates/ExchangeRateService';

export { 
  type StockData 
} from './stock-market/StockMarketService';

export {
  fetchHistoricalData,
  type HistoricalDataPoint,
  type HistoricalDataSeries
} from './stock-market/StockMarketHistoricalService';

export { 
  fetchEconomicIndicators,
  type EconomicIndicator 
} from './economic/EconomicIndicatorService';

export { 
  fetchCommodityPrices,
  type CommodityPrice 
} from './commodities/CommodityService';

export {
  fetchWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  type WatchlistItem
} from './watchlist/WatchlistService';

export {
  fetchFinanceNews,
  type NewsArticle
} from './news/FinanceNewsService';
