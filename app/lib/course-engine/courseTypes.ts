export interface CourseModule {

  id: string;

  title: string;

  description: string;

  lessonIds: string[];

}

export interface Course {

  id: string;

  slug: string;

  title: string;

  description: string;

  category: string;

  difficulty:
    | "Beginner"
    | "Intermediate"
    | "Advanced";

  estimatedHours: number;

  modules: CourseModule[];

  prerequisites: string[];

  certificate: boolean;

}