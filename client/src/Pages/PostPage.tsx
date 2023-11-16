import Loader from "@/components/Reusable/Loader";
import PostStats from "@/components/Reusable/PostStats";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostByID,
} from "@/lib/React-Query/queriesAndMutations";
import { timeConversion } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { data: post, isLoading } = useGetPostByID(id || "");
  const { mutate: deletePost, isError, isPending, isSuccess } = useDeletePost();
  const { toast } = useToast();

  const handleDeletePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    deletePost({ postId: id || "", imageID: post?.image });
    if (isError) {
      toast({
        title: "Error deleting",
      });
    }
    if (isSuccess) {
      toast({
        title: "Post Deleted successfully",
      });
    }
    navigate(-1);
  };

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
          <img src={"/assets/back.svg"} alt="back" width={24} height={24} />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.image} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <div className="flex gap-4 items-center justify-center">
                <Link to={`/profile/${post?.userID.$id}`}>
                  <img
                    src={post?.userID?.imageURL || "/assets/profile_holder.png"}
                    alt="user"
                    className="rounded-full h-10 w-10 "
                  />
                </Link>
                <div className="flex flex-col">
                  <Link to={`/profile/${post?.userID.$id}`}>
                    <p className="base-medium lg:body-bold text-light-1">
                      {post?.userID.name}
                    </p>
                  </Link>
                  <div className="flex-center gap-3 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {timeConversion(post?.$createdAt || "")}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      &#x1F4CD;{post?.location}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-center gap-5">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.userID.$id && "hidden"}`}
                >
                  <img
                    src="/assets/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  />
                </Link>

                <Button
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.userID.$id && "hidden"
                  }`}
                  variant="ghost"
                  disabled={isPending}
                  onClick={handleDeletePost}
                >
                  <img
                    src="/assets/delete.svg"
                    alt="delete"
                    width={20}
                    height={20}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-medium">
              <p>{post?.description}</p>
              <ul className="flex gap-2 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li className="text-light-3" key={`${tag}${index}`}>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userID={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
