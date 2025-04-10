
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

/**
 * Fetch finance news articles
 * @param limit Number of articles to fetch
 * @param category Optional category filter
 */
export const fetchFinanceNews = async (
  limit: number = 5,
  category?: 'economy' | 'markets' | 'business' | 'finance' | 'policy'
): Promise<NewsArticle[]> => {
  try {
    // In a real app, this would fetch from a news API or database
    // For now, we'll return realistic mock data
    
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
    
    // In a real app:
    // let query = supabase
    //   .from('finance_news')
    //   .select('*')
    //   .order('published_at', { ascending: false })
    //   .limit(limit);
    //
    // if (category) {
    //   query = query.eq('category', category);
    // }
    //
    // const { data, error } = await query;
    //
    // if (error) throw error;
    // return data;
    
  } catch (error) {
    console.error('Error fetching finance news:', error);
    throw error;
  }
};
