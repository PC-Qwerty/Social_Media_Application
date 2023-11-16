import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearching: boolean;
  searchedPosts?: Models.Document[];
};

const SearchResults = ({ isSearching, searchedPosts }: SearchResultsProps) => {
  if (isSearching) return <Loader />;
  // @ts-ignore
  if (searchedPosts && searchedPosts?.documents.length > 0)
    // @ts-ignore
    return <GridPostList posts={searchedPosts?.documents} />;
  return (
    <p className="text-light-4 text-center w-full mt-10">No Results Found</p>
  );
};

export default SearchResults;
