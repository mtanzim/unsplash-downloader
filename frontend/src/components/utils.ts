export interface CleanedCollection {
  id: string;
  thumbnail: string;
  title: string;
  numPhotos: number;
}

export const BASE_API = "https://api.unsplash.com";
export const PER_PAGE = 8;
export const CLIENT_ID = import.meta.env.VITE_ACCESS

export const collectionMapper = (r: any) => ({
  id: r?.id,
  title: r?.title,
  thumbnail: r?.cover_photo?.urls?.thumb,
  numPhotos: r?.total_photos,
});