'use client';

import { useState, useEffect } from 'react';
import { BookmarkCheck, CheckCircle } from 'lucide-react';
import { userPlatformProvider } from '@/app/lib/services/userPlatform';
import type { SavedLesson } from '@/app/types';

interface SaveLessonButtonProps {
  lessonId: string;
  title: string;
  summary: string;
  category: string;
}

export default function SaveLessonButton({
  lessonId,
  title,
  summary,
  category,
}: SaveLessonButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMarking, setIsMarking] = useState(false);

  useEffect(() => {
    const checkIfSaved = async () => {
      const user = await userPlatformProvider.getCurrentUser();
      if (user) {
        const saved = await userPlatformProvider.getSavedContent(user.id);
        const found = saved.some((item) => item.source === 'Lesson' && 'lessonId' in item && item.lessonId === lessonId);
        setIsSaved(found);
      }
    };
    checkIfSaved();
  }, [lessonId]);

  const handleSaveLesson = async () => {
    setIsSaving(true);
    try {
      const user = await userPlatformProvider.getCurrentUser();
      if (!user) {
        alert('Please log in to save lessons.');
        setIsSaving(false);
        return;
      }

      const savedItem: SavedLesson = {
        id: `lesson-${lessonId}-${Date.now()}`,
        savedAt: new Date().toISOString(),
        title,
        summary,
        source: 'Lesson',
        url: `/academy/${lessonId}`,
        lessonId,
        category,
      };

      await userPlatformProvider.saveContent(user.id, savedItem);
      setIsSaved(true);
    } catch (error) {
      console.error('Failed to save lesson:', error);
      alert('Failed to save lesson.');
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
        contentType: 'Lesson',
        referenceId: lessonId,
        title,
        category,
        startedAt: new Date().toISOString(),
        progressPercentage: 100,
        isComplete: true,
      });

      alert('Lesson marked as complete!');
    } catch (error) {
      console.error('Failed to mark lesson complete:', error);
      alert('Failed to mark lesson complete.');
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleSaveLesson}
        disabled={isSaving}
        className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm transition ${
          isSaved
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
        }`}
      >
        <BookmarkCheck className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        {isSaved ? 'Saved' : 'Save Lesson'}
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
