import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClipboard, faHeart, faEdit } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Switcher from '../components/Switcher';

function Profile() {
  const [profile, setProfile] = useState({
    name: 'Maria Wanner',
    email: 'maria@gmail.com',
    bio: 'I love coding!',
    profilePicture:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [newProfilePicture, setNewProfilePicture] = useState(null); // New profile picture state

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    if (newProfilePicture) {
      setProfile({ ...editedProfile, profilePicture: newProfilePicture });
    } else {
      setProfile({ ...editedProfile });
    }
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
  setEditedProfile({ ...profile });
  setIsEditMode(false); // Add a semicolon here
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [activeTab, setActiveTab] = useState('Profile');
  const [isOnline, setIsOnline] = useState(true);

  const narrowCardStyle = {
    width: '150px', // Adjust the width as per your preference
  };

  // Define content for Posts, Blogs, and Likes tabs
  const tabContents = {
    Posts: (
      <div className="bg-white rounded shadow p-4 mt-4 w-full flex justify-center items-center">
        <p>Display Posts data here</p>
      </div>
    ),
    Blogs: (
      <div className="bg-white rounded shadow p-4 mt-4 w-full flex justify-center items-center">
        <p>Display Blogs data here</p>
      </div>
    ),
    Likes: (
      <div className="bg-white rounded shadow p-4 mt-4 w-full flex justify-center items-center">
        <p>Display Likes data here</p>
      </div>
    ),
  };
  
  

  return (
    <div className="min-h-screen flex flex-col dark-bg-gray-900 bg-cover" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1697155200&semt=ais)' }}>
      <NavBar />
      <Switcher />
      
      {/* Add some space under the navbar */}
      <div className="mt-8"></div>
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
         Welcome to your profile page
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded shadow p-4">
              <div className="flex items-center mb-4">
                <img
                  className="inline-block flex-shrink-0 h-10 w-10 rounded-full mr-4"
                  src={profile.profilePicture}
                  alt="Profile"
                />
                <div className="flex items-center">
                  <span
                    className={`mr-2 ${
                      isOnline ? 'bg-green-500' : 'bg-red-500'
                    } h-2 w-2 rounded-full`}
                  ></span>
                  <p className="text-sm font-semibold text-gray-600">
                    {isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2">
                  <strong>Name:</strong> {profile.name}
                </div>
                <div className="mb-2">
                  <strong>Email:</strong> {profile.email}
                </div>
                <div>
                  <strong>Bio:</strong> {profile.bio}
                </div>
              </div>
              {isEditMode ? (
                <div className="w-full">
                  <div className="mb-4">
                    <label className="block text-gray-600">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                      className="border rounded-md p-1 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600">Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="border rounded-md p-1 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600">Bio:</label>
                    <textarea
                      name="bio"
                      value={editedProfile.bio}
                      onChange={handleInputChange}
                      className="border rounded-md p-1 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600">Profile Picture:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="profilePicture"
                      onChange={handleProfilePictureChange}
                      className="border rounded-md p-1 w-full"
                    />
                    {newProfilePicture && (
                      <img
                        src={newProfilePicture}
                        alt="New Profile"
                        className="mt-2 rounded-md h-20 w-20"
                      />
                    )}
                  </div>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={handleSaveClick}
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> Save
                  </button>
                  <button
                    className="bg-gray-400 text-white py-2 px-4 rounded ml-2 hover:bg-gray-500"
                    onClick={handleCancelClick}
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-600 mt-4"
                  onClick={handleEditClick}
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="bg-white rounded shadow p-4 mt-4" style={narrowCardStyle}>
            {/* Buttons for switching tabs */}
            <button
              className={`${
                activeTab === 'Posts'
                  ? 'bg-black text-white'
                  : 'bg-gray-400 text-white'
              } py-2 px-4 rounded hover:bg-black block mb-2`}
              onClick={() => setActiveTab('Posts')}
            >
              <FontAwesomeIcon icon={faClipboard} className="mr-2" /> Posts
            </button>
            <button
              className={`${
                activeTab === 'Blogs'
                  ? 'bg-black text-white'
                  : 'bg-gray-400 text-white'
              } py-2 px-4 rounded hover-bg-blue-600 block mb-2`}
              onClick={() => setActiveTab('Blogs')}
            >
              <FontAwesomeIcon icon={faBook} className="mr-2" /> Blogs
            </button>
            <button
              className={`${
                activeTab === 'Likes'
                  ? 'bg-black text-white'
                  : 'bg-gray-400 text-white'
              } py-2 px-4 rounded hover-bg-blue-600 block mb-2`}
              onClick={() => setActiveTab('Likes')}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" /> Likes
            </button>
          </div>

          {/* Display the content of the active tab */}
          {tabContents[activeTab]}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
