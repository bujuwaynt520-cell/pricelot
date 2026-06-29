import { learningPaths } from "./pathData";

export function getAllLearningPaths() {

  return learningPaths;

}

export function getLearningPath(

  slug: string

) {

  return learningPaths.find(

    path => path.slug === slug

  );

}