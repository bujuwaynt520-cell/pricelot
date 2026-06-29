import { getStudentProgress } from "./progressEngine";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export function getAchievements(): Achievement[] {

  const progress = getStudentProgress();

  const lessons = progress.completedLessons.length;

  const xp = progress.xp;

  return [

    {
      id: "first",
      title: "First Steps",
      description: "Complete your first lesson.",
      unlocked: lessons >= 1,
    },

    {
      id: "five",
      title: "Momentum Builder",
      description: "Complete 5 lessons.",
      unlocked: lessons >= 5,
    },

    {
      id: "ten",
      title: "Dedicated Student",
      description: "Complete 10 lessons.",
      unlocked: lessons >= 10,
    },

    {
      id: "xp100",
      title: "100 XP",
      description: "Earn your first 100 XP.",
      unlocked: xp >= 100,
    },

    {
      id: "xp500",
      title: "500 XP",
      description: "Reach 500 XP.",
      unlocked: xp >= 500,
    },

  ];

}