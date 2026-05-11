import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import PlayerBar from './PlayerBar';
import './Layout.css';

const MainLayout = () => {
  return (
    <div className="browse-container">
      <Navbar />
      <div className="b-layout">
        <Sidebar />
        <div className="b-main">
          <Outlet />
        </div>
      </div>
      <PlayerBar />
    </div>
  );
};

export default MainLayout;
