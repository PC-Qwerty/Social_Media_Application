import GridPostList from "@/components/Reusable/GridPostList";
import Loader from "@/components/Reusable/Loader";
import {
  useGetCurrentUser,
  // useGetPostByID,
} from "@/lib/React-Query/queriesAndMutations";
import { Models } from "appwrite";
// import { useEffect, useState } from "react";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  // const {} = useGetPostByID()
  // console.log(currentUser);
  // console.log("sadfwd");
  // console.log(currentUser?.save);
  // const postIds = currentUser?.save.map((saved: Models.Document) => ({
  //   id: saved.post.$id,
  // }));
  // // console.log(postIds);
  // const [savedPostsInfo, setSavedPostsInfo] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchedPosts = await Promise.all(
  //       postIds.map(async (postId:string) => {
  //         const posts = await useGetPostByID(postId.id);
  //         return posts;
  //       })
  //     );

  //     setSavedPostsInfo(fetchedPosts);
  //   };

  //   fetchData();
  // }, [postIds]);
  // console.log(savedPostsInfo)

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      userID: {
        imageURL: currentUser.imageURL,
      },
    }))
    .reverse();
  // console.log(savePosts);

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
