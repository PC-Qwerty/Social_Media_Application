import useDebounce from "@/Hooks/useDebounce";
import GridPostList from "@/components/Reusable/GridPostList";
import Loader from "@/components/Reusable/Loader";
import SearchResults from "@/components/Reusable/SearchResults";
import { Input } from "@/components/ui/input";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/React-Query/queriesAndMutations";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  // const inputRef = useRef<string>() || "";

  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 1000);
  const { data: searchedPosts, isFetching: isSearching } =
    useSearchPosts(debouncedValue); // useSearchPosts(searchValue) fetches every single time when the serachValue changes that means the queries are continuous so this makes application, server drains the proceessing  i.e the input in the search bar changes this is due to the react query abilty of refetching ...
  // to fix this a method called debouncing is used which saves performance of the application... the method uses the logic os a time gap after every query call

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const isShowSearchResults = searchValue !== "";
  const arePostsNotPresent =
    !isShowSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0);
  // arePostsPresent === true , there are no posts

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h3 className="h2-bold md:h3-bold">Search Posts</h3>
        <div className="flex gap-3 w-full p-2 rounded-full bg-dark-4">
          <img src="/assets/search.svg" alt="search" width={24} height={24} />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            // ref={inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl m-8">
        <h4 className="body-bold md:h4-bold">Trending Today</h4>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl cursor-pointer px-3 py-1">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img src="/assets/filter.svg" alt="filter" width={24} height={24} />
        </div>
      </div>
      <div className="flex flex-wrap gap-5 w-full max-w-5xl">
        {isShowSearchResults ? (
          <SearchResults
            isSearching={isSearching}
            searchedPosts={searchedPosts}
          />
        ) : arePostsNotPresent ? (
          <p className="text-light-2 mt-6 text-center w-full">End of Posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
