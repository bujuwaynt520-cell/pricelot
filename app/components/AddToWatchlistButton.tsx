'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { userPlatformProvider } from '@/app/lib/services/userPlatform';
import type { WatchlistItem } from '@/app/types';

interface AddToWatchlistButtonProps {
  symbol: string;
  displayName: string;
  assetType: 'Forex' | 'Gold' | 'Crypto' | 'Indices' | 'Commodities';
  note?: string;
}

export default function AddToWatchlistButton({
  symbol,
  displayName,
  assetType,
  note,
}: AddToWatchlistButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToWatchlist = async () => {
    setIsAdding(true);
    try {
      const user = await userPlatformProvider.getCurrentUser();
      if (!user) {
        alert('Please log in to add to watchlist.');
        setIsAdding(false);
        return;
      }

      const watchlistItem: WatchlistItem = {
        id: `watchlist-${assetType}-${symbol}-${Date.now()}`,
        assetType,
        symbol,
        displayName,
        addedAt: new Date().toISOString(),
        note,
      };

      await userPlatformProvider.addWatchlistItem(user.id, watchlistItem);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
      alert('Failed to add to watchlist.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToWatchlist}
      disabled={isAdding}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm transition ${
        isAdded
          ? 'bg-amber-100 text-amber-700 border border-amber-300'
          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
      }`}
    >
      <Star className={`w-4 h-4 ${isAdded ? 'fill-current' : ''}`} />
      {isAdded ? 'Watching' : 'Add to Watchlist'}
    </button>
  );
}
