import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Profile = () => {
  const [storedUsername, setStoredUsername] = useState("");
  const [storedEmail, setStoredEmail] = useState("");
  const [bio, setBio] = useState("Web Developer");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBio, setUpdatedBio] = useState(bio);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("username");
    const storedEmail = sessionStorage.getItem("email");
    if (storedUser && storedEmail) {
      setStoredUsername(storedUser);
      setStoredEmail(storedEmail);
    }
  }, []);

  // State variable to store the blogs of the logged-in user
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    // Fetch all blogs from your API (replace with your API endpoint)
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8081/blog/fetch/all");
        if (response.ok) {
          const blogs = await response.json();
          // Filter blogs associated with the logged-in user
          const userBlogs = blogs.filter(
            (blog) => blog.username === storedUsername
          );
          setUserBlogs(userBlogs);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [storedUsername]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setBio(updatedBio);
    setIsEditing(false);
  };
  const handleTagChange = (e) => {
    const tagValue = e.target.value;
    if (e.target.checked) {
      setSelectedTags([...selectedTags, tagValue]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagValue));
    }
  };

  const availableTags = [
    "Educational",
    "Travel",
    "Food",
    "Gaming",
    "Music",
    "Free Palestine 🇵🇸",
  ];
  const handleGoBack = () => {
    window.history.back(); // Use the browser's back function
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden">
        <button
          className="text-blue-500 hover:underline bg-transparent border border-blue-500 rounded px-2 py-1 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition duration-300 ml-4 mt-4"
          onClick={handleGoBack}
        >
          Go Back
        </button>

        <div className="p-4">
          <div className="flex items-center justify-center flex-col mt-4">
            <img
              class="inline-block flex-shrink-0 h-25 w-25 rounded-full"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"
              alt="Image Description"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
              {storedUsername}
            </h1>
            <p className="text-gray-600">Number of Blogs: {userBlogs.length}</p>
            {isEditing ? (
              <>
                <textarea
                  value={updatedBio}
                  onChange={(e) => setUpdatedBio(e.target.value)}
                  className="w-full mt-4 border rounded p-2 bg-gray-100"
                />
                <div className="mt-4">
                  <p className="text-gray-700">Select Interests:</p>
                  {availableTags.map((tag) => (
                    <label key={tag} className="block mt-1">
                      <input
                        type="checkbox"
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={handleTagChange}
                        className="mr-2 text-blue-500"
                      />
                      <span className="bg-blue-100 text-blue-800 text-lg font-medium mr-2 px-4 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleSaveClick}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-600">{bio}</p>
                <div className="mt-4">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-lg font-medium mr-2 px-4 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleEditClick}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit Interests
                </button>
              </>
            )}
          </div>
          <hr className="my-4 border-t-2 border-gray-300" />
          <div className="p-4">
            {/* Display user's blogs using the Card component */}
            {userBlogs.map((blog) => (
              <Card key={blog.id} item={blog} dark={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
