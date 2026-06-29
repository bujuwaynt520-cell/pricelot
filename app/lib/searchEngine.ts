import { getContentRegistry } from "./contentRegistry";

export function searchContent(query: string) {
  const q = query.toLowerCase().trim();

  if (!q) return [];

  return getContentRegistry().filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.slug.toLowerCase().includes(q)
    );
  });
}