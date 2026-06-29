import { contentLibrary } from "./contentData";

export function getAllContent() {

  return contentLibrary;

}

export function getContent(slug: string) {

  return contentLibrary.find(

    item => item.slug === slug

  );

}

export function getContentByType(type: string) {

  return contentLibrary.filter(

    item => item.type === type

  );

}