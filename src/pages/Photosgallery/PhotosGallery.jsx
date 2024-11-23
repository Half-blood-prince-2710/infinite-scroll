import React, {
  useEffect,
  useState,
} from "react";
import { useGetPhotos } from "../../hooks/usePhotos";
import { useScrollDetection } from "../../hooks/useScrollDetection";
import PhotoCard from "./components/PhotoCard";
import "./styles/PhotosGallery.css";
import Spinner from "../../components/spinner";
import { useDebounce } from "../../hooks/useDebounce";

const PhotosGallery = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPhotos();

  const isNearBottom =
    useScrollDetection();
  const [searchQuery, setSearchQuery] =
    useState("");
  const [sortOption, setSortOption] =
    useState("default"); // Default sort by likes
  const [
    isNextPageError,
    setIsNextPageError,
  ] = useState(false);

  // Debounce the search query
  const debouncedSearchQuery =
    useDebounce(searchQuery, 500); // 500ms debounce

  useEffect(() => {
    if (isNearBottom && hasNextPage)
      fetchNextPage();
  }, [
    isNearBottom,
    hasNextPage,
    fetchNextPage,
  ]);

  useEffect(() => {
    if (isFetchingNextPage && isError) {
      setIsNextPageError(true);
    }
  }, [isFetchingNextPage, isError]);

  if (isLoading)
    return (
      <div className='spinner-first'>
        <Spinner />
      </div>
    );

  if (isError && !data)
    return (
      <div>Error: {error.message}</div>
    );

  if (!data)
    return <div>No data available</div>;

  const filteredImages = data.pages
    .flat()
    .filter(
      (image) =>
        image.alt_description &&
        image.alt_description
          .toLowerCase()
          .includes(
            debouncedSearchQuery.toLowerCase()
          )
    );

  // Sort images based on the selected option
  const sortedImages =
    filteredImages.sort((a, b) => {
      if (sortOption === "likes") {
        return b.likes - a.likes; // Sort by likes
      } else if (
        sortOption === "date"
      ) {
        return (
          new Date(b.created_at) -
          new Date(a.created_at)
        ); // Sort by date
      }
      else if(sortOption==='default')
      return filteredImages; // Default case
    });


  return (
    <div className='main'>
      <div className='main-div'>
        {" "}
        <h1 className='heading'>
          {" "}
          Picture Gallery{" "}
        </h1>{" "}
        <div className='sort-search-div'>
          {" "}
          <input
            type='text'
            placeholder='Search images...'
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }
            className='search'
          />{" "}
          <select
            value={sortOption}
            placeholder='Sort'
            onChange={(e) =>
              setSortOption(
                e.target.value
              )
            }
            className='sort'>
            <option value='default'>
              Sort by Default
            </option>
            <option value='likes'>
              Sort by Likes
            </option>
            <option value='date'>
              Sort by Date
            </option>
          </select>
        </div>
        <div className='imageGrid'>
          {sortedImages.map((image) => (
            <PhotoCard
              key={image.id}
              image={image}
            />
          ))}
        </div>
        {isFetchingNextPage &&
          !isNextPageError && (
            <div className='spinner'>
              <Spinner />
            </div>
          )}
        {isNextPageError && (
          <div className='error-network'>
            Network issue. Unable to
            load more images.
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosGallery;
