import {
  useGetCurrentUser,
  useLikePost,
  useSavePost,
  useUnSavePost,
} from "@/lib/React-Query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";
// import CommentComponent from "./CommentComponent";

type PostStatsProps = {
  post?: Models.Document;
  userID: string;
};

const PostStats = ({ post, userID }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);
  //isPending: isLikingPost
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: unsavePost, isPending: isUnSavingPost } = useUnSavePost();

  const { data: currentUser } = useGetCurrentUser();
  const [isCommentVisible, setCommentVisible] = useState<boolean>(false);
  const handleCommentClick = () => {
    setCommentVisible(!isCommentVisible);
  };

  const savedPostDoc = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    // setIsSaved(savedPostDoc ? true : false);
    setIsSaved(!!savedPostDoc);
  }, [currentUser]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes]; // donot use const because the likes arrays changes every time the like event is done..
    const isLiked = newLikes.includes(userID);
    if (isLiked) {
      // newLikes.filter((id) => id !== userID); // here this doesn't work and doesnot update the newLikes Array with the filtered likes version...
      newLikes = newLikes.filter((id) => id !== userID);
    } else {
      newLikes.push(userID);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostDoc) {
      // if a post is already saved then to unsave that post setIsSaved is set to false and the post is deleted or unsavedpost is done..
      setIsSaved(false);
      return unsavePost({ savedPostId: savedPostDoc.$id });
      // return; // use this to make else block direct using using else statement
    } else {
      savePost({ postId: post?.$id || "", userID: userID });
      setIsSaved(true);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center z-20 mb-5">
        <div className="flex gap-3 mr-5">
          <img
            src={
              checkIsLiked(likes, userID)
                ? "/assets/liked.svg"
                : "/assets/like.svg"
            }
            alt="like"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleLike}
          />
          <p className="small-medium lg:base-medium">{likes.length}</p>
          <img
            src="/assets/comment.svg"
            alt="comment"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleCommentClick}
          />
          <p className="small-medium lg:base-medium">0</p>

          <img
            src="/assets/share.svg"
            alt="share"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => {}}
          />
        </div>
        <div className="flex gap-3">
          {isSavingPost || isUnSavingPost ? (
            <Loader />
          ) : (
            <img
              src={isSaved ? "/assets/saved.svg" : "/assets/save.svg"}
              alt="save"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={handleSave}
            />
          )}
        </div>
      </div>
      {/* {isCommentVisible && <CommentComponent postId={post.$id} />} */}
    </>
  );
};

export default PostStats;
