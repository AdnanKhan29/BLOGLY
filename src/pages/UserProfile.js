import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Profile = () => {
  const blogPosts = [
    {
      id: 1,
      username: "John Doe",
      profileImg:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      profileUrl: "/profile/johndoe",
      date: "October 15, 2023",
      title: "My First Blog Post",
      img: "https://c.ndtvimg.com/2019-05/1afu8vt8_weight-loss-friendly-breakfast-paneer-besan-chilla_625x300_25_May_19.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350",
      likedcount: 42,
      category: ["React", "JavaScript"],
      desc: "This is my very first blog post. Welcome!",
    },
    {
      id: 2,
      username: "John Doe",
      profileImg:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      profileUrl: "/profile/johndoe",
      date: "October 16, 2023",
      title: "React Tips and Tricks",
      img: "https://c.ndtvimg.com/2019-05/1afu8vt8_weight-loss-friendly-breakfast-paneer-besan-chilla_625x300_25_May_19.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350",
      likedcount: 31,
      category: ["React", "Programming"],
      desc: "Here are some handy React tips and tricks.",
    },
    // Add more blog posts here
  ];

  // Specify the username you want to display
  const targetUsername = "John Doe";

  // Filter the blogPosts array to only include posts with the target username
  const filteredPosts = blogPosts.filter(
    (post) => post.username === targetUsername
  );

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Add a button to go back at the top */}
        <Link to="/">Go Back</Link>

        <div className="p-4">
          <div className="flex items-center justify-center flex-col mt-4">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
              {targetUsername}
            </h1>
            <p className="text-gray-600">Web Developer</p>
          </div>
          <hr className="my-4 border-t-2 border-gray-300" />

          <h2 className="text-2xl font-semibold">Blog Posts</h2>
          <div className="mt-4 space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} item={post} dark={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
