import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./clockcss.css";
import CardListSkeleton from "./CardListSkeleton";
import axios from 'axios';

const CardList = () => {
   const [Data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState(Data.slice(0, 3)); // Initially display 6 items

  const loadMoreData = () => {
    // Calculate how many more items to display
    const currentLength = displayedData.length;
    const itemsToDisplay = Data.slice(currentLength, currentLength + 3);
    setDisplayedData([...displayedData, ...itemsToDisplay]);
  };

  const hasMoreData = displayedData.length < Data.length;

  // Extract unique tags from the category
  const uniqueTags = Array.from(new Set(Data.map((item) => item.category)));

  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading delay
  useEffect(() => {
    

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/blog/fetch/all');
        setData(response.data);
      } catch (error) {
        console.error('An error occurred while fetching the blogs:', error);
      }
    };

    fetchData();
    console.log(Data);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        // Render the CardSkeleton while loading
        <CardListSkeleton />
      ) : (
        <div className="grid grid-cols-12 gap-4 xl:divide-x-2 xl:divide-y-0">
          <div className="col-span-2 divide-y-2">
            <div className="p-4 shadow-xl">
              <h1>Top Tags</h1>
              {/* Display all unique tags from the category */}
              <ul>
                <br></br>
                {Array.from(
                  new Set(Data.flatMap((item) => item.category)).values()
                ).map((tag, index) => (
                  <li key={index} className="mb-2">
                    {/* Render each unique category element as a separate tag */}
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full inline-block mr-2">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-8">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
              {displayedData.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
            <div className="flex justify-center items-center mt-4">
              {hasMoreData && (
                <button
                  onClick={loadMoreData}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Read More
                </button>
              )}
            </div>
          </div>

          <div className="col-span-2"></div>
        </div>
      )}
    </div>
  );
};

export default CardList;
