export interface Bookmark {

  id: string;

  title: string;

  type: string;

  slug: string;

}

const STORAGE_KEY = "pricelot-bookmarks";

export function getBookmarks(): Bookmark[] {

  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(STORAGE_KEY);

  return saved ? JSON.parse(saved) : [];

}

export function saveBookmarks(bookmarks: Bookmark[]) {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(bookmarks)

  );

}

export function toggleBookmark(bookmark: Bookmark) {

  const bookmarks = getBookmarks();

  const exists = bookmarks.find(

    b => b.id === bookmark.id

  );

  if (exists) {

    saveBookmarks(

      bookmarks.filter(

        b => b.id !== bookmark.id

      )

    );

    return false;

  }

  saveBookmarks([

    ...bookmarks,

    bookmark

  ]);

  return true;

}