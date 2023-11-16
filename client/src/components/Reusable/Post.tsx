import { useUserContext } from "@/context/AuthContext";
import { timeConversion } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostProps = {
  post: Models.Document;
};

const Post = ({ post }: PostProps) => {
  const { user } = useUserContext();

  //   console.log(post);
  if (!post.userID) return;
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.userID.$id}`}>
            <img
              src={post?.userID?.imageURL || "/assets/profile_holder.png"}
              alt="user"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/profile/${post.userID.$id}`}>
              <p className="base-medium lg:body-bold text-light-1">
                {post.userID.name}
              </p>
            </Link>
            <div className="flex-center gap-3 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {timeConversion(post.$createdAt)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                &#x1F4CD;{post.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.userID.$id && "hidden"}`}
        >
          <img src="/assets/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>

      <div className="small-medium lg:base-medium py-5">
        <p>{post.description}</p>
        <ul className="flex gap-2 mt-2">
          {post?.tags.map((tag: string, index: string) => (
            <li className="text-light-3" key={`${tag}${index}`}>
              #{tag}
            </li>
          ))}
        </ul>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <img
          src={post?.image || "/assets/profile_holder.png"}
          alt="post"
          className="post-card_img"
        />
      </Link>
      <PostStats post={post} userID={user.id} />
    </div>
  );
};

export default Post;
