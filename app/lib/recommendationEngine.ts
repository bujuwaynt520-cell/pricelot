export interface Recommendation {
  id: string;
  title: string;
  href: string;
  category: string;
  tags: string[];
}

const recommendations: Recommendation[] = [];

export function registerRecommendation(item: Recommendation) {
  recommendations.push(item);
}

export function getRecommendations(
  tags: string[],
  currentId?: string,
  limit = 6
): Recommendation[] {
  return recommendations
    .filter((item) => item.id !== currentId)
    .map((item) => ({
      item,
      score: item.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);
}

export function getAllRecommendations() {
  return recommendations;
}