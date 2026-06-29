import { ContentItem } from "./contentTypes";

export function renderContent(

  item: ContentItem

) {

  return {

    ...item,

    readingTime:

      Math.ceil(

        item.sections

          .map(s => s.content)

          .join(" ")

          .split(" ").length / 220

      )

  };

}