
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/layout/PageLayout';
import { ResponsiveCard } from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin, Heart } from 'lucide-react';

interface Province {
  id: string;
  name: string;
  capital: string;
  population: number;
  area: number;
  description: string;
  image_url?: string;
}

const UserFavorites = () => {
  const { user } = useAuth();
  const { favorites, loading: favoritesLoading, removeFavorite } = useFavorites();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || favoritesLoading) return;

    // Simulate fetching province data
    // In a real app, this would come from your API or database
    const fetchProvinces = async () => {
      try {
        // This is a placeholder. In a real app, you would fetch actual data from your API
        // based on the province IDs in the favorites array
        const mockProvinces: Province[] = [
          {
            id: "lusaka",
            name: "Lusaka",
            capital: "Lusaka City",
            population: 3000000,
            area: 21896,
            description: "Lusaka is the capital and largest city of Zambia, and one of the fastest-developing cities in southern Africa.",
            image_url: "https://images.unsplash.com/photo-1534801022022-6e319a11f249?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          },
          {
            id: "copperbelt",
            name: "Copperbelt",
            capital: "Ndola",
            population: 2000000,
            area: 31328,
            description: "The Copperbelt Province is Zambia's copper-mining region, and is known for its mining activities and urban centers.",
            image_url: "https://images.unsplash.com/photo-1599707657646-fc3ec8a560c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
          },
          {
            id: "southern",
            name: "Southern",
            capital: "Livingstone",
            population: 1800000,
            area: 85283,
            description: "Southern Province is home to Victoria Falls, one of the Seven Natural Wonders of the World.",
            image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
          },
        ];
        
        const favoriteProvinces = mockProvinces.filter(province => 
          favorites.some(fav => fav.province_id === province.id)
        );
        
        setProvinces(favoriteProvinces);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, [user, favorites, favoritesLoading]);

  const handleRemoveFavorite = async (provinceId: string) => {
    const success = await removeFavorite(provinceId);
    if (success) {
      setProvinces(prev => prev.filter(province => province.id !== provinceId));
    }
  };

  if (!user) {
    return (
      <PageLayout>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Not Authorized</CardTitle>
            <CardContent>
              <p>You need to be logged in to view your favorites.</p>
              <Button asChild className="mt-4">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
            </CardContent>
          </CardHeader>
        </Card>
      </PageLayout>
    );
  }

  if (loading || favoritesLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container max-w-5xl py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Favorites</h1>
          <Button asChild variant="outline">
            <Link to="/provinces">Explore All Provinces</Link>
          </Button>
        </div>

        {provinces.length === 0 ? (
          <Card className="text-center py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Heart className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-semibold">No favorites yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start exploring provinces and add them to your favorites to see them here.
              </p>
              <Button asChild className="mt-4">
                <Link to="/provinces">Explore Provinces</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {provinces.map((province) => (
              <ResponsiveCard
                key={province.id}
                variant="interactive"
                className="overflow-hidden"
              >
                <Link 
                  to={`/province/${province.id}`}
                  className="block h-full"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={province.image_url || "/placeholder.svg"}
                      alt={province.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{province.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{province.capital}</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-100/20"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveFavorite(province.id);
                        }}
                      >
                        <Heart className="h-5 w-5 fill-current" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {province.description}
                    </p>
                  </CardContent>
                </Link>
              </ResponsiveCard>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default UserFavorites;
