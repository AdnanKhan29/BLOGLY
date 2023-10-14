// App.js (Updated)

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Announcements from './pages/Announcements';
import Post from './pages/Post';
import Recommended from './pages/Recommended';
import CardList from './components/CardList';
import CardData from './components/CardData'; // Import the CardData component
import AnnouncementAdd from './pages/AnnouncementAdd';
import LoginTest from './components/LoginTest';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logintest" element={<LoginTest />} />
          <Route path="/search" element={<Search />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/addannouncements" element={<AnnouncementAdd/>} />
          <Route path="/post" element={<Post />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/cardlist" element={<CardList />} />
          <Route path="/carddata/:id" element={<CardData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
