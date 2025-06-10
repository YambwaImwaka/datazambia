
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: string;
  changePercent: string;
}

export interface StockMarketData {
  index: {
    value: number;
    change: string;
    isPositive: boolean;
  };
  stocks: StockData[];
}

// Sample stock data for demonstration
const sampleStockData: StockMarketData = {
  index: {
    value: 4832.45,
    change: "+2.3%",
    isPositive: true
  },
  stocks: [
    {
      symbol: "ZANACO",
      name: "Zambia National Commercial Bank",
      price: 15.50,
      change: "+0.75",
      changePercent: "+5.1%"
    },
    {
      symbol: "ZCCM",
      name: "ZCCM Investment Holdings",
      price: 485.00,
      change: "+12.50",
      changePercent: "+2.6%"
    },
    {
      symbol: "SHOPRITE",
      name: "Shoprite Holdings Zambia",
      price: 28.75,
      change: "-0.25",
      changePercent: "-0.9%"
    },
    {
      symbol: "LAFARGE",
      name: "Lafarge Zambia",
      price: 165.80,
      change: "+3.20",
      changePercent: "+2.0%"
    },
    {
      symbol: "INVESTRUST",
      name: "Investrust Bank",
      price: 42.10,
      change: "+1.10",
      changePercent: "+2.7%"
    },
    {
      symbol: "CAVMONT",
      name: "Cavmont Bank",
      price: 8.95,
      change: "-0.15",
      changePercent: "-1.6%"
    }
  ]
};

export const fetchStockMarketData = async (): Promise<StockMarketData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Add some random variation to simulate real-time data
  const variationFactor = 0.02; // 2% variation
  
  const updatedStocks = sampleStockData.stocks.map(stock => ({
    ...stock,
    price: stock.price * (1 + (Math.random() - 0.5) * variationFactor)
  }));

  return {
    ...sampleStockData,
    stocks: updatedStocks
  };
};
