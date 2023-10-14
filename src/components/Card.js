import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CardSkeleton from "./CardSkeleton";

const Card = ({ item, dark }) => {
  // Check if item.category is an array
  const isCategoryArray = Array.isArray(item.category);

  // Define a class name based on the dark prop
  const cardClassName = `max-w-4xl rounded overflow-hidden shadow-2xl mx-2 my-2 ${
    dark
      ? "shadow-slate-500 border-gray-900 dark:bg-gray-850 dark:border-gray-900 dark:shadow-2xl dark:shadow-slate-700"
      : "shadow-gray-500 border-gray-300"
  } p-2`;

  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        // Render the CardSkeleton while loading
        <CardSkeleton />
      ) : (
        <div className={cardClassName}>
          <div
            className={`flex items-center justify-between mt-2 ${
              dark ? "text-white" : "text-black"
            }`}
          >
            <div className="flex items-center">
              <img
                src={item.profileImg}
                alt={item.username}
                className="w-10 h-10 rounded-full mr-2"
              />
              <a
                href={item.profileUrl}
                className={`text-lg font-semibold ${
                  dark
                    ? "text-gray-300 hover:underline"
                    : "text-black hover:underline"
                }`}
              >
                {item.username}
              </a>
            </div>
            <div
              className={`px-2 py-1 rounded-lg ${
                dark ? "bg-gray-900" : "bg-white"
              } text-black`}
            >
              <h3>Posted on: {item.date}</h3>
            </div>
          </div>
          <hr
            className={`my-3 border-t-2 ${
              dark ? "border-gray-700" : "border-gray-300"
            }`}
          />
          <h2
            className={`text-2xl font-bold text-center my-2 ${
              dark ? "text-white" : "text-black"
            }`}
          >
            {item.title}
          </h2>
          <img
            className="w-full h-96 object-cover rounded-lg"
            src={item.img}
            alt={item.title}
          />
          <hr
            className={`my-3 border-t-2 ${
              dark ? "border-gray-700" : "border-gray-300"
            }`}
          />
          <div
            className={`mb-4 text-md font-normal ${
              dark ? "text-gray-300" : "text-black"
            } flex justify-between`}
          >
            <span
              className={`text-lg font-semibold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              {item.likedcount} Likes
            </span>
            {isCategoryArray && (
              <div className="text-md font-normal text-gray-600">
                {item.category.map((tag, index) => (
                  <span
                    key={index}
                    className={`mr-2 inline-flex items-center px-2 py-1 rounded-full ${
                      dark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div
            className={`text-lg font-medium ${
              dark ? "text-gray-300" : "text-black"
            }`}
          >
            <p className="line-clamp-3">{item.desc} . . . </p>
          </div>
          <div className="text-center">
            <Link to={`/carddata/${item.id}`}>
              <button
                className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-2 hover:bg-blue-600 ${
                  dark ? "dark:bg-gray-700 dark:hover:bg-blue-700" : ""
                }`}
              >
                Open Post{" "}
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
