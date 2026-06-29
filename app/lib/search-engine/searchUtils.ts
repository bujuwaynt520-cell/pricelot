import { searchIndex } from "./searchData";
import { SearchItem } from "./searchTypes";

export function addToSearch(item: SearchItem) {
  searchIndex.push(item);
}

export function search(query: string): SearchItem[] {
  const text = query.toLowerCase();

  return searchIndex.filter(
    (item) =>
      item.title.toLowerCase().includes(text) ||
      item.description.toLowerCase().includes(text) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(text)
      )
  );
}