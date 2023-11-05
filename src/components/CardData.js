import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Data from "./Data";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faThumbsUp,
  faShare,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import CommentSection from "./CommentSection";
import axios from 'axios'

const CardData = () => {
  const { id } = useParams();
  const [postData,setPostData] = useState(null);
  const navigate = useNavigate();

  // Initialize state for like count and like status
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // State to manage screen width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // State to manage the visibility of the report form
  const [showReportForm, setShowReportForm] = useState(false);
  // State to manage the visibility of the drop-down message
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/blog/fetch?id=${id}`);
        setPostData(response.data);
        setLikeCount(response.data.likes)
      } catch (error) {
        console.error('Failed to fetch blog data:', error);
      }
    };

    fetchData();

  }, []);





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

  // Function to handle share button click
  const handleShareClick = () => {
    setShowDropDown(!showDropDown);
    const currentURL = window.location.href;

    // Use the Clipboard API to copy the URL to the clipboard
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert("Link copied to clipboard: " + currentURL);
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);
      });
  };
  const openReportForm = () => {
    setShowReportForm(true);
  };

  // Function to close the report form
  const closeReportForm = () => {
    setShowReportForm(false);
  };

  // Function to handle report form submission
  const handleReportSubmit = (event) => {
    event.preventDefault();
    // You can implement the report submission logic here
    // e.g., send a report to the server
    closeReportForm(); // Close the report form after submission
  };

  if (postData==null) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }
  else
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
                  class="inline-block flex-shrink-0 h-10 w-10 rounded-full"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"
                  alt="Image Description"
                />
            <div>
              <a
                href={postData.profileUrl}
                className="text-lg font-semibold text-black dark:text-white hover:underline"
              >
                {postData.username}
              </a>
              <div className="text-gray-600">{postData.date}</div>
            </div>
          </div>

          { postData.image==null? <img src="https://erf.org.eg/app/themes/website2020/resources/assets/images/placeholder.jpg" alt="No image"/>:
          <img src={`data:image/jpeg;base64,${postData.image.toString().replace("dataimage/jpegbase64","")}`} alt="blog" />
            }


          <div className="mb-4 text-md font-normal text-black dark:text-gray-300">
            <span className="text-lg font-semibold">
              {postData.likes} Likes
            </span>
          </div>
          <div className="text-lg font-medium">
            {/* Remove the 'clamp-2' class to display the whole description */}
            <p className="mb-4">{postData.content}</p>
            <div className="text-md font-normal text-gray-600">
              {postData.tags.split(",").map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 inline-flex items-center px-2 py-1 rounded-full bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-lg font-medium flex items-center mt-4">
              <button
                className="mr-4 flex items-center"
                onClick={handleLikeClick}
              >
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className={`mr-2 ${
                    liked ? "text-blue-500" : "text-gray-500"
                  }`}
                />
                {likeCount} Likes
              </button>
              <button
                className="mr-4 flex items-center"
                onClick={handleShareClick}
              >
                <FontAwesomeIcon
                  icon={faShare}
                  className="text-green-500 mr-2"
                />
                Share
              </button>
              <button className="flex items-center" onClick={openReportForm}>
                <FontAwesomeIcon icon={faFlag} className="text-red-500 mr-2" />
                Report
              </button>
            </div>
          </div>
        </div>

        {/* Profile Card (1/4 width, fixed width w-60) */}
        {windowWidth > 768 ? ( // Render the profile card only when the screen width is greater than 768px
          <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-xl mx-auto h-96">
            <div className="relative h-40">
            </div>
            <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
            <img
                  class="inline-block flex-shrink-0  rounded-full"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"
                  alt="Image Description"
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
              {postData.tags.split(",").map((category, index) => (
                <div
                  key={index}
                  className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 py-1 rounded-full bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400 hover:text-gray-800 cursor-default"
                  style={{
                    fontWeight: "bold",
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
      {showReportForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Report Content</h2>
            <form onSubmit={handleReportSubmit}>
              {/* Add fields for reporting (e.g., textarea for comments, radio buttons for reasons) */}
              <textarea
                className="w-full p-2 mb-4 border rounded-lg"
                placeholder="Enter your report here..."
              />
              {/* Add other report form fields here */}
              <button
                type="submit"
                className="bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600"
              >
                Submit Report
              </button>
            </form>
            <button
              onClick={closeReportForm}
              className="mt-4 text-gray-600 hover:underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showDropDown && (
        <div className="fixed top-0 right-0 mt-16 mr-10 p-4 bg-green-400 border rounded-lg shadow-lg w-1/4">
          <p className="font-bold">Share:</p>
          <input type="text" value={window.location.href} readOnly />
          <button onClick={handleShareClick} className="ml-4 font-bold">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CardData;
