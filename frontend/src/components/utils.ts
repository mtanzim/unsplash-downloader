export interface CleanedCollection {
  id: string;
  thumbnail: string;
  title: string;
}

export const BASE_API = "https://api.unsplash.com";
export const PER_PAGE = 8;
export const CLIENT_ID = "xpySlyzhA8K9GRohyq4GWrCWzUxlo5ukMWE8NiFkvyc";

export const collectionMapper = (r: unknown) => ({
  id: r?.id,
  title: r?.title,
  thumbnail: r?.cover_photo?.urls?.thumb,
});