import React, { useState,useEffect } from "react";
import Data from "./Data";
import Card from "./Card";
import './clockcss.css'

const CardList = () => {
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

  // Digital Clock
  const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const zeroPadding = (num, digit) => {
    return String(num).padStart(digit, '0');
  };

  const updateTime = () => {
    const now = new Date();

    setTime(
      zeroPadding(now.getHours(), 2) + ':' +
      zeroPadding(now.getMinutes(), 2) + ':' +
      zeroPadding(now.getSeconds(), 2)
    );

    setDate(
      now.getFullYear() + '-' +
      zeroPadding(now.getMonth() + 1, 2) + '-' +
      zeroPadding(now.getDate(), 2) + ' ' +
      WEEK[now.getDay()]
    );
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 xl:divide-x-2 xl:divide-y-0">
      <div className="col-span-2 divide-y-2">
        <div className="p-4 shadow-xl">
        <h1>Top Tags </h1>
        {/* Display all tags from the category */}
        <ul>
          <br></br>
          {uniqueTags.map((tag, index) => (
            <li
              key={index}
              className="bg-blue-500 text-white px-2 py-1 rounded-full inline-block mr-2 mb-2"
            >
              {tag}
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

      <div className="col-span-2">
          <div className="clock">
            <p id="date">{date}</p>
            <p id="time">{time}</p>

          </div>
      </div>
    </div>
  );
};

export default CardList;
