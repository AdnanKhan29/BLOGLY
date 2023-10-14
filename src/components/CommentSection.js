import React, { useState } from "react";

const CommentSection = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      return;
    }
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <div className="mb-4">
        <textarea
          className="w-full h-24 p-2 border rounded-md"
          placeholder="Write your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleCommentSubmit}
      >
        Add Comment
      </button>
      <div className="mt-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded mb-2">
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
