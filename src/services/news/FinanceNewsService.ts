
import { supabase } from "@/integrations/supabase/client";

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  category: 'economy' | 'markets' | 'business' | 'finance' | 'policy';
  tags: string[];
}

// Newsdata.io response interfaces
interface NewsdataArticle {
  title: string;
  link: string;
  keywords?: string[];
  creator?: string[];
  video_url?: string;
  description: string;
  content?: string;
  pubDate: string;
  image_url?: string;
  source_id: string;
  source_priority?: number;
  country?: string[];
  category?: string[];
  language?: string;
}

interface NewsdataResponse {
  status: string;
  totalResults: number;
  results?: NewsdataArticle[];
  nextPage?: string;
}

// API key for Newsdata.io
const NEWS_API_KEY = "pub_7965797176669c8b853f0647662bb7b33232d";

/**
 * Get relevant tags from a news article title and content
 */
const extractTags = (title: string, description: string, keywords?: string[]): string[] => {
  // If article comes with keywords, use them first
  if (keywords && keywords.length > 0) {
    return keywords.slice(0, 3).map(k => k.toLowerCase());
  }

  // Combined text for analysis
  const text = `${title} ${description}`.toLowerCase();
  
  // Financial keyword sets
  const keywordSets = {
    'interest rates': ['interest rate', 'central bank', 'monetary policy', 'inflation', 'lending'],
    'currency': ['exchange rate', 'forex', 'kwacha', 'dollar', 'currency', 'devaluation', 'appreciation'],
    'commodities': ['copper', 'cobalt', 'gold', 'agriculture', 'commodity', 'export', 'mining'],
    'stocks': ['stock market', 'shares', 'equity', 'investor', 'luse', 'lusaka securities'],
    'economic growth': ['gdp', 'economic growth', 'recession', 'recovery', 'forecast'],
    'trade': ['export', 'import', 'trade', 'deficit', 'surplus', 'tariff'],
    'banking': ['bank', 'financial institution', 'loan', 'credit', 'deposit'],
    'fiscal policy': ['tax', 'budget', 'fiscal', 'government spending', 'debt', 'deficit'],
    'investment': ['investment', 'fdi', 'capital', 'funding', 'venture', 'startup'],
    'regulation': ['regulation', 'compliance', 'sec', 'regulator', 'policy', 'rules']
  };
  
  // Extract matching tags
  const tags: string[] = [];
  
  for (const [category, keywords] of Object.entries(keywordSets)) {
    for (const keyword of keywords) {
      if (text.includes(keyword) && !tags.includes(category)) {
        tags.push(category);
        break;
      }
    }
  }
  
  // Limit to 3 tags
  return tags.slice(0, 3);
};

/**
 * Determine the category of a news article based on its content
 */
const determineCategory = (title: string, description: string, apiCategories?: string[]): 'economy' | 'markets' | 'business' | 'finance' | 'policy' => {
  // If the API provides categories, map them to our categories
  if (apiCategories && apiCategories.length > 0) {
    const categoryMap: Record<string, 'economy' | 'markets' | 'business' | 'finance' | 'policy'> = {
      'business': 'business',
      'economy': 'economy',
      'finance': 'finance',
      'markets': 'markets',
      'money': 'finance',
      'politics': 'policy',
      'top': 'economy',
      'world': 'economy'
    };
    
    for (const apiCategory of apiCategories) {
      const mappedCategory = categoryMap[apiCategory.toLowerCase()];
      if (mappedCategory) {
        return mappedCategory;
      }
    }
  }
  
  const text = `${title} ${description}`.toLowerCase();
  
  const categoryKeywords = {
    economy: ['gdp', 'economic', 'growth', 'recession', 'inflation', 'unemployment', 'imf', 'world bank'],
    markets: ['stock', 'bond', 'forex', 'market', 'trader', 'investment', 'securities', 'shares', 'exchange'],
    business: ['company', 'corporate', 'industry', 'firm', 'enterprise', 'startup', 'business', 'merger', 'acquisition'],
    finance: ['bank', 'loan', 'credit', 'deposit', 'fintech', 'financial', 'investment', 'fund', 'asset'],
    policy: ['government', 'regulation', 'policy', 'law', 'legislation', 'minister', 'ministry', 'tax', 'fiscal']
  };
  
  // Count keyword matches for each category
  const scores: Record<string, number> = {
    economy: 0,
    markets: 0,
    business: 0,
    finance: 0,
    policy: 0
  };
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        scores[category]++;
      }
    }
  }
  
  // Find category with highest score
  let maxCategory: 'economy' | 'markets' | 'business' | 'finance' | 'policy' = 'finance'; // Default
  let maxScore = 0;
  
  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxCategory = category as 'economy' | 'markets' | 'business' | 'finance' | 'policy';
    }
  }
  
  return maxCategory;
};

/**
 * Transform Newsdata.io articles to our NewsArticle format
 */
const transformArticles = (articles: NewsdataArticle[]): NewsArticle[] => {
  return articles.map((article, index) => {
    const category = determineCategory(article.title, article.description || '', article.category);
    const tags = extractTags(article.title, article.description || '', article.keywords);
    
    return {
      id: `${index}-${Date.now()}`, // Generate a unique ID
      title: article.title,
      summary: article.description || '',
      url: article.link,
      source: article.source_id || 'News Source',
      publishedAt: article.pubDate,
      imageUrl: article.image_url || undefined,
      category,
      tags
    };
  });
};

/**
 * Fetch finance news articles from Newsdata.io
 * @param limit Number of articles to fetch
 * @param category Optional category filter
 */
export const fetchFinanceNews = async (
  limit: number = 5,
  category?: 'economy' | 'markets' | 'business' | 'finance' | 'policy'
): Promise<NewsArticle[]> => {
  try {
    // Map our categories to Newsdata.io categories
    const categoryMapping: Record<string, string> = {
      economy: 'economy',
      markets: 'business',
      business: 'business',
      finance: 'business',
      policy: 'politics'
    };

    // Construct the query parameters
    let queryParams = new URLSearchParams({
      apikey: NEWS_API_KEY,
      q: 'zambia AND (finance OR economy OR business)',
      language: 'en',
      size: limit.toString(),
      country: 'zm'
    });
    
    if (category) {
      queryParams.append('category', categoryMapping[category] || 'business');
    }
    
    // Fetch news from Newsdata.io
    const response = await fetch(
      `https://newsdata.io/api/1/news?${queryParams.toString()}`
    );
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }
    
    const data: NewsdataResponse = await response.json();
    
    if (data.status !== 'success' || !data.results || data.results.length === 0) {
      throw new Error('Failed to fetch news data or no results found');
    }
    
    // Transform articles to our format
    let articles = transformArticles(data.results);
    
    // Apply manual category filter if needed
    if (category) {
      articles = articles.filter(article => article.category === category);
    }
    
    // Return limited number of articles
    return articles.slice(0, limit);
  } catch (error) {
    console.error('Error fetching finance news:', error);
    // Fallback to mock data if API request fails
    console.warn('Falling back to mock news data due to API error');
    return fetchMockNews(limit, category);
  }
};

/**
 * Fallback function to fetch mock news when API is unavailable
 * @param limit Number of articles to fetch
 * @param category Optional category filter
 */
const fetchMockNews = async (
  limit: number = 5,
  category?: 'economy' | 'markets' | 'business' | 'finance' | 'policy'
): Promise<NewsArticle[]> => {
  // Mock data for fallback
  const mockNews: NewsArticle[] = [
    {
      id: '1',
      title: 'Bank of Zambia Holds Interest Rate at 9.5% Amid Inflation Concerns',
      summary: "The central bank's monetary policy committee decided to maintain the current rate citing a need to balance economic growth with inflation control.",
      url: 'https://example.com/boz-interest-rate',
      source: 'Zambia Financial Times',
      publishedAt: '2025-04-08T14:30:00Z',
      imageUrl: 'https://placehold.co/600x400/png?text=Bank+of+Zambia',
      category: 'policy',
      tags: ['interest rates', 'monetary policy', 'inflation']
    },
    {
      id: '2',
      title: 'Copper Prices Surge as Global Demand Increases',
      summary: "Zambia's main export commodity has seen a price increase of 7% over the past month as manufacturing rebounds in key markets.",
      url: 'https://example.com/copper-prices',
      source: 'Mining Weekly',
      publishedAt: '2025-04-07T09:15:00Z',
      imageUrl: 'https://placehold.co/600x400/png?text=Copper+Mining',
      category: 'markets',
      tags: ['copper', 'commodities', 'exports']
    },
    {
      id: '3',
      title: 'Zambian Kwacha Strengthens Against US Dollar',
      summary: 'The local currency has appreciated by 2.3% against the US dollar in the past week, providing relief for importers.',
      url: 'https://example.com/kwacha-strength',
      source: 'Lusaka Business Review',
      publishedAt: '2025-04-06T16:45:00Z',
      imageUrl: 'https://placehold.co/600x400/png?text=Kwacha+Currency',
      category: 'finance',
      tags: ['currency', 'exchange rates', 'imports']
    },
    {
      id: '4',
      title: 'Government Announces New Tax Incentives for Agricultural Sector',
      summary: 'Finance Minister unveils tax breaks aimed at boosting agricultural productivity and food security.',
      url: 'https://example.com/ag-tax-incentives',
      source: 'Zambia Daily Mail',
      publishedAt: '2025-04-05T11:20:00Z',
      imageUrl: 'https://placehold.co/600x400/png?text=Agriculture',
      category: 'policy',
      tags: ['agriculture', 'tax policy', 'food security']
    },
    {
      id: '5',
      title: "Zambia's GDP Growth Projected to Reach 4.5% in 2025",
      summary: 'International Monetary Fund raises growth forecast citing improved fiscal management and increased foreign investment.',
      url: 'https://example.com/gdp-forecast',
      source: 'African Economic Digest',
      publishedAt: '2025-04-04T08:00:00Z',
      imageUrl: 'https://placehold.co/600x400/png?text=Economic+Growth',
      category: 'economy',
      tags: ['GDP', 'economic growth', 'IMF']
    },
    {
      id: '6',
      title: 'Local Banks Report Strong Q1 Earnings',
      summary: 'Major Zambian financial institutions show resilience with profits up 15% year-over-year despite challenging economic conditions.',
      url: 'https://example.com/bank-earnings',
      source: 'Zambia Financial Times',
      publishedAt: '2025-04-03T14:10:00Z',
      imageUrl: 'https://placehold.co/600x400/png?text=Banking',
      category: 'business',
      tags: ['banking', 'earnings', 'financial sector']
    },
    {
      id: '7',
      title: 'New Investment Rules to Attract Foreign Capital',
      summary: 'Securities and Exchange Commission introduces regulatory changes to ease foreign investment in Zambian markets.',
      url: 'https://example.com/investment-rules',
      source: 'Lusaka Business Review',
      publishedAt: '2025-04-02T10:30:00Z',
      imageUrl: 'https://placehold.co/600x400/png?text=Investment',
      category: 'policy',
      tags: ['investment', 'regulation', 'foreign capital']
    }
  ];
  
  // Filter by category if provided
  let filteredNews = category 
    ? mockNews.filter(article => article.category === category)
    : mockNews;
  
  // Return limited number of articles
  return filteredNews.slice(0, limit);
};
