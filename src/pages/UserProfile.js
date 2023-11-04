import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Profile = () => {
  // const blogPosts = [
  //   {
  //     id: 1,
  //     username: "John Doe",
  //     profileImg:
  //       "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  //     profileUrl: "/profile/johndoe",
  //     date: "October 15, 2023",
  //     title: "My First Blog Post",
  //     img: "https://c.ndtvimg.com/2019-05/1afu8vt8_weight-loss-friendly-breakfast-paneer-besan-chilla_625x300_25_May_19.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350",
  //     likedcount: 42,
  //     category: ["React", "JavaScript"],
  //     desc: "This is my very first blog post. Welcome!",
  //   },
  //   {
  //     id: 2,
  //     username: "John Doe",
  //     profileImg:
  //       "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  //     profileUrl: "/profile/johndoe",
  //     date: "October 16, 2023",
  //     title: "React Tips and Tricks",
  //     img: "https://c.ndtvimg.com/2019-05/1afu8vt8_weight-loss-friendly-breakfast-paneer-besan-chilla_625x300_25_May_19.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350",
  //     likedcount: 31,
  //     category: ["React", "Programming"],
  //     desc: "Here are some handy React tips and tricks.",
  //   },
  //   // Add more blog posts here
  // ];

  // // Specify the username you want to display
  // const targetUsername = "John Doe";

  // // Filter the blogPosts array to only include posts with the target username
  // const filteredPosts = blogPosts.filter(
  //   (post) => post.username === targetUsername
  // );

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
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
              {storedUsername}
            </h1>
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

          {/* <h2 className="text-2xl font-semibold">Blog Posts</h2>
          <div className="mt-4 space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} item={post} dark={false} />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
