export type ContentType =
  | "lesson"
  | "article"
  | "strategy"
  | "guide"
  | "analysis"
  | "news"
  | "broker"
  | "glossary";

export interface ContentAuthor {

  id: string;

  name: string;

}

export interface ContentSection {

  id: string;

  title: string;

  content: string;

}

export interface ContentItem {

  id: string;

  slug: string;

  type: ContentType;

  title: string;

  description: string;

  category: string;

  author: ContentAuthor;

  published: string;

  updated: string;

  tags: string[];

  sections: ContentSection[];

}