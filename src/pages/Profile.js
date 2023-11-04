import React from 'react';
import Card from './Card';

const Profile = () => {
  const blogPosts = [
    {
      id: 1,
      username: 'John Doe',
      profileImg: 'https://via.placeholder.com/50',
      profileUrl: '/profile/johndoe',
      date: 'October 15, 2023',
      title: 'My First Blog Post',
      img: 'https://via.placeholder.com/500x300',
      likedcount: 42,
      category: ['React', 'JavaScript'],
      desc: 'This is my very first blog post. Welcome!',
    },
    {
      id: 2,
      username: 'John Doe',
      profileImg: 'https://via.placeholder.com/50',
      profileUrl: '/profile/johndoe',
      date: 'October 16, 2023',
      title: 'React Tips and Tricks',
      img: 'https://via.placeholder.com/500x300',
      likedcount: 31,
      category: ['React', 'Programming'],
      desc: 'Here are some handy React tips and tricks.',
    },
    // Add more blog posts here
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-center flex-col mt-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h1 className="text-2xl font-semibold text-gray-800">John Doe</h1>
            <p className="text-gray-600">Web Developer</p>
          </div>
          <hr className="my-4 border-t-2 border-gray-300" />

          <h2 className="text-2xl font-semibold">Blog Posts</h2>
          <div className="mt-4 space-y-4">
            { blogPosts.map((post) => (
              <Card key={post.id} item={post} dark={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
