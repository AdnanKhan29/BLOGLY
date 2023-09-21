import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Announcements from './pages/Announcements';
import Post from './pages/Post';
import Recommended from './pages/Recommended';
import CardList from './components/CardList';


function App() {



  return (
    

    <Router>
      
      <div className='App'>
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/search"  element={<Search/>} />
          <Route path="/announcements"  element={<Announcements/>} />
          <Route path="/post"  element={<Post/>} />
          <Route path="/recommended"  element={<Recommended/>} />
          <Route path="/cardlist"  element={<CardList/>} />

        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
