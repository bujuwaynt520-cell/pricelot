'use client';

import { useState } from 'react';
import { BookmarkCheck, CheckCircle } from 'lucide-react';
import { userPlatformProvider } from '@/app/lib/services/userPlatform';
import type { SavedStrategy } from '@/app/types';

interface SaveStrategyButtonProps {
  strategyId: string;
  title: string;
  summary: string;
  category: string;
}

export default function SaveStrategyButton({
  strategyId,
  title,
  summary,
  category,
}: SaveStrategyButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMarking, setIsMarking] = useState(false);

  const handleSaveStrategy = async () => {
    setIsSaving(true);
    try {
      const user = await userPlatformProvider.getCurrentUser();
      if (!user) {
        alert('Please log in to save strategies.');
        setIsSaving(false);
        return;
      }

      const savedItem: SavedStrategy = {
        id: `strategy-${strategyId}-${Date.now()}`,
        savedAt: new Date().toISOString(),
        title,
        summary,
        source: 'Strategy',
        url: `/strategies/${strategyId}`,
        strategyId,
        category,
      };

      await userPlatformProvider.saveContent(user.id, savedItem);
      setIsSaved(true);
    } catch (error) {
      console.error('Failed to save strategy:', error);
      alert('Failed to save strategy.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMarkComplete = async () => {
    setIsMarking(true);
    try {
      const user = await userPlatformProvider.getCurrentUser();
      if (!user) {
        alert('Please log in to track progress.');
        setIsMarking(false);
        return;
      }

      await userPlatformProvider.recordProgress({
        userId: user.id,
        contentType: 'Strategy',
        referenceId: strategyId,
        title,
        category,
        startedAt: new Date().toISOString(),
        progressPercentage: 100,
        isComplete: true,
      });

      alert('Strategy marked as complete!');
    } catch (error) {
      console.error('Failed to mark strategy complete:', error);
      alert('Failed to mark strategy complete.');
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleSaveStrategy}
        disabled={isSaving}
        className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm transition ${
          isSaved
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
        }`}
      >
        <BookmarkCheck className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        {isSaved ? 'Saved' : 'Save Strategy'}
      </button>

      <button
        onClick={handleMarkComplete}
        disabled={isMarking}
        className="flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300 transition"
      >
        <CheckCircle className="w-4 h-4" />
        Mark Complete
      </button>
    </div>
  );
}
