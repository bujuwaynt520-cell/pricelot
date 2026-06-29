export interface LearningPathStep {

  id: string;

  title: string;

  courseSlug: string;

}

export interface LearningPath {

  id: string;

  slug: string;

  title: string;

  description: string;

  steps: LearningPathStep[];

}