import { useInfiniteQuery } from "@tanstack/react-query";
import photosAPI from "../api/photos";

const QUERY_KEYS = {
  photos: (query) => ["photos", query],
};


export const useGetPhotos = (
  query = ""
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.photos(query),
    queryFn: async ({
      pageParam = 1,
    }) => {
      return photosAPI.getPhotos({
        pageParam,
      });
    },
    getNextPageParam: (
      lastPage,
      pages
    ) => {
      console.log(lastPage, pages);
      const nextPage = pages.length + 1;
      return nextPage; 
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};