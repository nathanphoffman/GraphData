/** The kinds of thing you can be minimizing; picking one changes the wording on the page. */
export interface ItemType {
  id: string;
  /** Name in the dropdown. */
  name: string;
  one: string;
  many: string;
  /** What a use is called, plural: plays, reads, ... */
  uses: string;
  weekExample: string;
  yearExample: string;
}

export const ITEM_TYPES: ItemType[] = [
  {
    id: "generic",
    name: "Generic Items",
    one: "item",
    many: "items",
    uses: "uses",
    weekExample: "using any of them 3 times a week",
    yearExample: "each one used 10 times a year",
  },
  {
    id: "board-games",
    name: "Board Games",
    one: "board game",
    many: "board games",
    uses: "plays",
    weekExample: "playing 3 games a week",
    yearExample: "each game played 10 times a year",
  },
  {
    id: "books",
    name: "Books",
    one: "book",
    many: "books",
    uses: "reads",
    weekExample: "reading 2 books a week",
    yearExample: "each book read 2 times a year",
  },
  {
    id: "movies",
    name: "Movies",
    one: "movie",
    many: "movies",
    uses: "watches",
    weekExample: "watching 2 movies a week",
    yearExample: "each movie watched 2 times a year",
  },
  {
    id: "video-games",
    name: "Video Games",
    one: "video game",
    many: "video games",
    uses: "plays",
    weekExample: "playing 4 games a week",
    yearExample: "each game played 5 times a year",
  },
  {
    id: "clothes",
    name: "Clothes",
    one: "garment",
    many: "garments",
    uses: "wears",
    weekExample: "wearing 10 garments a week",
    yearExample: "each garment worn 30 times a year",
  },
  {
    id: "tools",
    name: "Tools",
    one: "tool",
    many: "tools",
    uses: "uses",
    weekExample: "reaching for a tool 5 times a week",
    yearExample: "each tool used 6 times a year",
  },
];

export const DEFAULT_ITEM_TYPE = ITEM_TYPES[0];

export const findItemType = (id: string): ItemType | undefined => ITEM_TYPES.find((t) => t.id === id);

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
