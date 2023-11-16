import React, { useState } from "react";

interface CommentComponentProps {
  postId: string;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ postId }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  //   const [showComments, setShowComments] = useState<boolean>(false);

  // Arrow function type for handleAddComment
  const handleAddComment: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (newComment.trim() !== "") {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment("");
    }
  };

  //   const toggleComments = () => {
  //     setShowComments(!showComments);
  //   };

  return (
    <div className="relative">
      {/* <button
        className="cursor-pointer bg-blue-500 text-white px-4 py-2"
        onClick={toggleComments}
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button> */}

      {/* {showComments && (
        <div className="absolute top-full left-0 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 shadow p-4">
          {comments.map((comment, index) => (
            <div key={index} className="mb-2">
              {comment}
            </div>
          ))}
          <div className="flex mt-2">
            <textarea
              className="w-3/4 px-2 py-1 border border-gray-300 rounded"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button
              className="w-1/4 bg-blue-500 text-white px-4 py-1 ml-2"
              onClick={handleAddComment}
            >
              Add
            </button>
          </div>
        </div>
      )} */}
      <div className="relative">
        <div
          className={`absolute ${
            window.innerWidth > 640 ? "lg:" : "sm:"
          }top-full left-0 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 shadow p-4`}
        >
          {comments.map((comment, index) => (
            <div key={index} className="mb-2">
              {comment}
            </div>
          ))}
          <div className="flex mt-2">
            <textarea
              className="w-3/4 px-2 py-1 border border-gray-300 rounded"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button
              className="w-1/4 bg-blue-500 text-white px-4 py-1 ml-2"
              onClick={handleAddComment}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
