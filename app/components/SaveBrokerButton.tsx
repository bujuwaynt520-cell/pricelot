'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { userPlatformProvider } from '@/app/lib/services/userPlatform';
import type { SavedBrokerReview } from '@/app/types';

interface SaveBrokerButtonProps {
  brokerId: string;
  brokerName: string;
  summary: string;
}

export default function SaveBrokerButton({
  brokerId,
  brokerName,
  summary,
}: SaveBrokerButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveBroker = async () => {
    setIsSaving(true);
    try {
      const user = await userPlatformProvider.getCurrentUser();
      if (!user) {
        alert('Please log in to save broker reviews.');
        setIsSaving(false);
        return;
      }

      const savedItem: SavedBrokerReview = {
        id: `broker-${brokerId}-${Date.now()}`,
        savedAt: new Date().toISOString(),
        title: `${brokerName} Review`,
        summary,
        source: 'BrokerReview',
        url: `/brokers/${brokerId}`,
        brokerId,
        brokerName,
      };

      await userPlatformProvider.saveContent(user.id, savedItem);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save broker review:', error);
      alert('Failed to save broker review.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleSaveBroker}
      disabled={isSaving}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm transition ${
        isSaved
          ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
      }`}
    >
      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
      {isSaved ? 'Saved' : 'Save Review'}
    </button>
  );
}
