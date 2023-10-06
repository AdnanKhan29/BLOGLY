import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Data from './Data';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';
import CommentSection from './CommentSection';

const CardData = () => {
  const { id } = useParams();
  const postData = Data.find((item) => item.id === id);
  const navigate = useNavigate();

  // Initialize state for like count and like status
  const [likeCount, setLikeCount] = useState(postData.likedcount);
  const [liked, setLiked] = useState(false);

  // State to manage screen width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update windowWidth when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!postData) {
    return <div className="container mx-auto p-4">Post not found</div>;
  }

  // Function to handle the back button click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  // Function to handle like button click
  const handleLikeClick = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-4 gap-4">
        {/* Main Content Card (3/4 width) */}
        <div className="bg-white rounded-lg shadow-xl p-6 col-span-3 dark:bg-gray-800">
          <div className="text-left">
            <button
              onClick={handleBackClick}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="" />
            </button>
          </div>
          <h1 className="text-3xl font-semibold mb-4">{postData.title}</h1>
          <div className="flex items-center mb-4">
            <img
              src={postData.profileImg}
              alt={postData.username}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <a href={postData.profileUrl} className="text-lg font-semibold text-black dark:text-white hover:underline">
                {postData.username}
              </a>
              <div className="text-gray-600">{postData.date}</div>
            </div>
          </div>
          <img
            className="w-full h-96 object-cover rounded-lg mb-4"
            src={postData.img}
            alt={postData.title}
          />
          <div className="mb-4 text-md font-normal text-black dark:text-gray-300">
            <span className="text-lg font-semibold">{postData.likedcount} Likes</span>
          </div>
          <div className="text-lg font-medium">
            {/* Remove the 'clamp-2' class to display the whole description */}
            <p className="mb-4">{postData.desc}</p>
            <div className="text-md font-normal text-gray-600">
              {postData.category.map((tag, index) => (
                <span key={index} className="mr-2 inline-flex items-center px-2 py-1 rounded-full bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-lg font-medium flex items-center mt-4">
              <button className="mr-4 flex items-center" onClick={handleLikeClick}>
                <FontAwesomeIcon icon={faThumbsUp} className={`mr-2 ${liked ? 'text-blue-500' : 'text-gray-500'}`} />
                {likeCount} Likes
              </button>
              <button className="flex items-center">
                <FontAwesomeIcon icon={faShare} className="text-green-500 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Profile Card (1/4 width, fixed width w-60) */}
        {windowWidth > 768 ? ( // Render the profile card only when the screen width is greater than 768px
          <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-xl mx-auto h-96">
            <div className="relative h-40">
              <img
                className="absolute h-full w-full object-cover"
                src={postData.profileImg}
                alt={postData.username}
              />
            </div>
            <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
              <img
                className="object-cover w-full h-full"
                src={postData.profileImg}
                alt={postData.username}
              />
            </div>
            <div className="mt-16">
              <h1 className="text-lg text-center font-semibold">
                {postData.username}
              </h1>
              <p className="text-sm text-gray-600 text-center">
                {postData.connections} connections in common
              </p>
            </div>
            <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t">
              {postData.category.map((category, index) => (
                <div
                  key={index}
                  className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 py-1 rounded-full bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400 hover:text-gray-800 cursor-default"
                  style={{
                    // Add any additional inline styles here
                    fontWeight: 'bold',
                    // Add more CSS properties as needed
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <CommentSection></CommentSection>
    </div>
  );
};

export default CardData;
