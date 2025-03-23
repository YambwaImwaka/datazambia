
// This file just re-exports all finance services for backwards compatibility
// This prevents breaking changes while refactoring

export { 
  useExchangeRateData,
  type ExchangeRateData 
} from './exchange-rates/ExchangeRateService';

export { 
  useStockMarketData,
  type StockData 
} from './stock-market/StockMarketService';

export { 
  useEconomicIndicators,
  type EconomicIndicator 
} from './economic/EconomicIndicatorService';

export { 
  useCommodityPrices,
  type CommodityPrice 
} from './commodities/CommodityService';
