import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Sidebar = () => (
  <div className="sidebar">
    <Link to="/play">Play</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/about">About</Link>
  </div>
);

export default Sidebar;
