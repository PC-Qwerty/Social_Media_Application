import Loader from "@/components/Reusable/Loader";
import PostForm from "@/components/forms/PostForm";
import { useGetPostByID } from "@/lib/React-Query/queriesAndMutations";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostByID(id || "");
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/add-post.svg" alt="add" width={36} height={36} />
          <h2 className="h4-bold md:h3-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};
export default EditPost;
