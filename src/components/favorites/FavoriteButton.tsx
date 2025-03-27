
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  provinceId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  provinceId,
  variant = 'outline',
  size = 'icon',
  showText = false,
}) => {
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite, loading } = useFavorites();
  const navigate = useNavigate();
  
  const favorite = isFavorite(provinceId);
  
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast('Sign in required', {
        description: 'Please sign in to save favorites',
        action: {
          label: 'Sign In',
          onClick: () => navigate('/auth/signin')
        }
      });
      return;
    }
    
    if (favorite) {
      await removeFavorite(provinceId);
    } else {
      await addFavorite(provinceId);
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      disabled={loading}
      onClick={handleToggleFavorite}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      className={favorite ? 'text-red-500 hover:text-red-600' : ''}
    >
      <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
      {showText && (
        <span className="ml-2">{favorite ? 'Favorited' : 'Favorite'}</span>
      )}
    </Button>
  );
};

export default FavoriteButton;
