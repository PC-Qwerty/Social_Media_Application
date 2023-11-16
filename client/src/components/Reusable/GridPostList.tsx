import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();
  //   console.log(posts);
  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.image}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <Link to={`/profile/${post.userID.$id}`}>
                <div className="flex items-center justify-start gap-2 flex-1">
                  <img
                    src={
                      post.userID.imageURL || "/assets/profile-placeholder.svg"
                    }
                    alt="creator"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="line-clamp-1">{post.userID.name}</p>
                </div>
              </Link>
            )}
            {showStats && <PostStats post={post} userID={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;