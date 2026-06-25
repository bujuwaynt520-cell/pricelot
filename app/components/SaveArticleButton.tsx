'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { userPlatformProvider } from '@/app/lib/services/userPlatform';
import type { SavedArticle } from '@/app/types';

interface SaveArticleButtonProps {
  articleSlug: string;
  title: string;
  summary: string;
  category: string;
}

export default function SaveArticleButton({
  articleSlug,
  title,
  summary,
  category,
}: SaveArticleButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveArticle = async () => {
    setIsSaving(true);
    try {
      const user = await userPlatformProvider.getCurrentUser();
      if (!user) {
        alert('Please log in to save articles.');
        setIsSaving(false);
        return;
      }

      const savedItem: SavedArticle = {
        id: `article-${articleSlug}-${Date.now()}`,
        savedAt: new Date().toISOString(),
        title,
        summary,
        source: 'Article',
        url: `/articles/${articleSlug}`,
        articleSlug,
        category,
      };

      await userPlatformProvider.saveContent(user.id, savedItem);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save article:', error);
      alert('Failed to save article.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleSaveArticle}
      disabled={isSaving}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm transition ${
        isSaved
          ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
      }`}
    >
      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
      {isSaved ? 'Saved' : 'Save Article'}
    </button>
  );
}
