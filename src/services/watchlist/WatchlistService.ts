
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface WatchlistItem {
  id: string;
  name: string;
  type: 'currency' | 'commodity' | 'indicator';
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

/**
 * Fetch the user's watchlist items
 */
export const fetchWatchlist = async (): Promise<WatchlistItem[]> => {
  try {
    // In a real app, this would fetch from the database
    // For now, return an empty array if not logged in, or some sample data if logged in
    
    const { user } = useAuth();
    
    if (!user) {
      return [];
    }
    
    // Mock data - in a real app, this would pull from the database
    const watchlistItems: WatchlistItem[] = [
      {
        id: 'USD',
        name: 'US Dollar',
        type: 'currency',
        value: '19.82 ZMW',
        change: '+0.2%',
        isPositive: true
      },
      {
        id: 'Copper',
        name: 'Copper',
        type: 'commodity',
        value: '8712.45 USD/tonne',
        change: '+2.3%',
        isPositive: true
      },
      {
        id: 'GDP',
        name: 'GDP Growth Rate',
        type: 'indicator',
        value: '4.2%',
        change: '+1.3%',
        isPositive: true
      }
    ];
    
    return watchlistItems;
    
    // In a real app:
    // const { data, error } = await supabase
    //   .from('user_watchlist')
    //   .select('*')
    //   .eq('user_id', user.id);
    //
    // if (error) throw error;
    // return data;
    
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    throw error;
  }
};

/**
 * Add an item to the user's watchlist
 */
export const addToWatchlist = async (item: Omit<WatchlistItem, 'change' | 'isPositive'>): Promise<WatchlistItem> => {
  try {
    const { user } = useAuth();
    
    if (!user) {
      throw new Error('You must be logged in to add items to your watchlist');
    }
    
    // In a real app, this would add to the database
    // For now, return the item as if it was added
    
    return {
      ...item,
      change: '+0.0%',
      isPositive: true
    };
    
    // In a real app:
    // const { data, error } = await supabase
    //   .from('user_watchlist')
    //   .insert({
    //     user_id: user.id,
    //     item_id: item.id,
    //     item_type: item.type,
    //     item_name: item.name
    //   })
    //   .select()
    //   .single();
    //
    // if (error) throw error;
    // return data;
    
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    throw error;
  }
};

/**
 * Remove an item from the user's watchlist
 */
export const removeFromWatchlist = async (id: string, type: 'currency' | 'commodity' | 'indicator'): Promise<void> => {
  try {
    const { user } = useAuth();
    
    if (!user) {
      throw new Error('You must be logged in to remove items from your watchlist');
    }
    
    // In a real app, this would remove from the database
    // For now, we'll just return as if it was successful
    
    return;
    
    // In a real app:
    // const { error } = await supabase
    //   .from('user_watchlist')
    //   .delete()
    //   .eq('user_id', user.id)
    //   .eq('item_id', id)
    //   .eq('item_type', type);
    //
    // if (error) throw error;
    
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    throw error;
  }
};
