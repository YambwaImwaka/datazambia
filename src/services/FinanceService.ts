
// This file just re-exports all finance services for backwards compatibility
// This prevents breaking changes while refactoring

export { 
  fetchExchangeRates,
  type ExchangeRateData 
} from './exchange-rates/ExchangeRateService';

export { 
  type StockData 
} from './stock-market/StockMarketService';

export { 
  fetchEconomicIndicators,
  type EconomicIndicator 
} from './economic/EconomicIndicatorService';

export { 
  fetchCommodityPrices,
  type CommodityPrice 
} from './commodities/CommodityService';
