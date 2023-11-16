import Error from "@/components/Reusable/Error";
import Loader from "@/components/Reusable/Loader";
import Post from "@/components/Reusable/Post";
import { useGetRecentPosts } from "@/lib/React-Query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isErrorPosts && (
            <div className="flex items-center  justify-center">
              <Error errorCode={500} />
            </div>
          )}
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 w-full gap-10">
              {posts?.documents.map((post: Models.Document) => (
                <Post post={post} key={post.$id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
