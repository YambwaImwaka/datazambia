
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWatchlist, addToWatchlist, removeFromWatchlist, WatchlistItem } from '@/services/watchlist/WatchlistService';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Loader2, PlusCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface WatchlistSectionProps {
  isVisible: boolean;
}

const WatchlistSection: React.FC<WatchlistSectionProps> = ({ isVisible }) => {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemType, setItemType] = useState<'currency' | 'commodity' | 'indicator'>('currency');
  const [itemId, setItemId] = useState('');
  
  const queryClient = useQueryClient();
  
  // Data options for adding items
  const options = {
    currency: [
      { id: 'USD', name: 'US Dollar (USD)' },
      { id: 'EUR', name: 'Euro (EUR)' },
      { id: 'GBP', name: 'British Pound (GBP)' },
      { id: 'CNY', name: 'Chinese Yuan (CNY)' },
      { id: 'ZAR', name: 'South African Rand (ZAR)' }
    ],
    commodity: [
      { id: 'Copper', name: 'Copper' },
      { id: 'Gold', name: 'Gold' },
      { id: 'Corn', name: 'Corn' },
      { id: 'Cobalt', name: 'Cobalt' },
      { id: 'Cotton', name: 'Cotton' }
    ],
    indicator: [
      { id: 'GDP', name: 'GDP Growth Rate' },
      { id: 'Inflation', name: 'Inflation Rate' },
      { id: 'Unemployment', name: 'Unemployment Rate' },
      { id: 'InterestRate', name: 'Interest Rate' },
      { id: 'ExternalDebt', name: 'External Debt' }
    ]
  };
  
  // Fetch watchlist data
  const { data: watchlist, isLoading } = useQuery({
    queryKey: ['watchlist'],
    queryFn: fetchWatchlist,
    enabled: isVisible && !!user
  });
  
  // Add to watchlist mutation
  const addMutation = useMutation({
    mutationFn: addToWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
      setDialogOpen(false);
      toast.success('Item added to watchlist');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to add item to watchlist');
    }
  });
  
  // Remove from watchlist mutation
  const removeMutation = useMutation({
    mutationFn: ({ id, type }: { id: string, type: 'currency' | 'commodity' | 'indicator' }) => 
      removeFromWatchlist(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
      toast.success('Item removed from watchlist');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to remove item from watchlist');
    }
  });
  
  const handleAddToWatchlist = () => {
    if (!itemId) {
      toast.error('Please select an item to add');
      return;
    }
    
    const selectedOption = options[itemType].find(o => o.id === itemId);
    if (!selectedOption) {
      toast.error('Invalid selection');
      return;
    }
    
    addMutation.mutate({
      id: itemId,
      name: selectedOption.name,
      type: itemType,
      value: 'Loading...'
    });
  };
  
  const handleRemoveFromWatchlist = (id: string, type: 'currency' | 'commodity' | 'indicator') => {
    removeMutation.mutate({ id, type });
  };
  
  if (!user) {
    return (
      <div className="py-6 px-2 text-center space-y-4">
        <p className="text-muted-foreground">Sign in to create your personalized watchlist</p>
        <Button variant="outline" size="sm" asChild>
          <a href="/auth/signin">Sign In</a>
        </Button>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <>
      <div className="space-y-4">
        {watchlist && watchlist.length > 0 ? (
          <>
            {watchlist.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className={`text-sm ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {item.value} {item.change && `(${item.change})`}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFromWatchlist(item.id, item.type)}
                  disabled={removeMutation.isPending}
                >
                  {removeMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </>
        ) : (
          <div className="py-6 text-center">
            <p className="text-muted-foreground mb-2">Your watchlist is empty</p>
            <p className="text-sm text-muted-foreground mb-4">Add items to track them here</p>
          </div>
        )}
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add to Watchlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Watchlist</DialogTitle>
              <DialogDescription>
                Select an item to add to your personalized watchlist
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Item Type</label>
                <Select value={itemType} onValueChange={(value) => {
                  setItemType(value as any);
                  setItemId('');
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="currency">Currency</SelectItem>
                    <SelectItem value="commodity">Commodity</SelectItem>
                    <SelectItem value="indicator">Economic Indicator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Select Item</label>
                <Select value={itemId} onValueChange={setItemId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an item..." />
                  </SelectTrigger>
                  <SelectContent>
                    {options[itemType].map(option => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button 
                onClick={handleAddToWatchlist} 
                disabled={addMutation.isPending || !itemId}
              >
                {addMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Add to Watchlist
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default WatchlistSection;
