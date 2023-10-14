// App.js (Updated)

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Announcements from "./pages/Announcements";
import Post from "./pages/Post";
import Recommended from "./pages/Recommended";
import CardList from "./components/CardList";
import CardData from "./components/CardData"; // Import the CardData component
import AnnouncementAdd from "./pages/AnnouncementAdd";
import CheckReport from "./pages/CheckReport";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logintest" element={<LoginTest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/addannouncements" element={<AnnouncementAdd />} />
          <Route path="/post" element={<Post />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/cardlist" element={<CardList />} />
          <Route path="/carddata/:id" element={<CardData />} />
          <Route path="/checkreports" element={<CheckReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
