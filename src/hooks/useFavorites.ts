
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface FavoriteItem {
  id: string;
  user_id: string;
  province_id: string;
  created_at: string;
}

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from('user_favorites')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setFavorites(data || []);
      } catch (error: any) {
        console.error('Error fetching favorites:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const addFavorite = async (provinceId: string) => {
    if (!user) {
      toast.error('You must be logged in to add favorites');
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          province_id: provinceId,
        })
        .select()
        .single();

      if (error) {
        // Check if it's a duplicate entry
        if (error.code === '23505') {
          toast.error('This province is already in your favorites');
          return false;
        }
        throw error;
      }

      setFavorites(prev => [...prev, data]);
      toast.success('Added to favorites');
      return true;
    } catch (error: any) {
      console.error('Error adding favorite:', error.message);
      toast.error('Failed to add favorite');
      return false;
    }
  };

  const removeFavorite = async (provinceId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('province_id', provinceId);

      if (error) {
        throw error;
      }

      setFavorites(prev => prev.filter(fav => fav.province_id !== provinceId));
      toast.success('Removed from favorites');
      return true;
    } catch (error: any) {
      console.error('Error removing favorite:', error.message);
      toast.error('Failed to remove favorite');
      return false;
    }
  };

  const isFavorite = (provinceId: string) => {
    return favorites.some(fav => fav.province_id === provinceId);
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
