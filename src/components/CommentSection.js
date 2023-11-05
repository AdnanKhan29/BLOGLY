import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CommentSection = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/blog/fetch/comments?id=${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [id]);

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

    // Send a POST request to the backend API
    axios
      .post(
        `http://localhost:8081/blog/comment`,
        {},
        {
          params: {
            id: id,
            comment: comment,
            username: sessionStorage.getItem("username"),
          },
        }
      )
      .then((response) => {
        // Handle the response if needed
        console.log("Comment posted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Failed to post comment:", error);
      });
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
  {comments.map((commentObj, index) => (
    <div key={index} className="bg-white p-6 rounded-lg shadow-2xl mb-4">
      <p className="text-gray-800 text-lg font-semibold mb-2">{commentObj.username}</p>
      <p className="text-gray-600 text-md">{commentObj.comment}</p>
      <div className="flex items-center mt-4">
        <div className="ml-3">
          <p className="text-gray-800 text-sm">{commentObj.name}</p>
          <p className="text-gray-500 text-xs">{commentObj.date}</p>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default CommentSection;
