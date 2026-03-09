import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username"); // Get the name

  const logout = () => {
    sessionStorage.clear();
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">TodoApp</Link>
      </div>
      <ul className="navbar-links">
        {!isLoggedIn ? (
          <>
            <li><Link to="/">Sign Up</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
          </>
        ) : (
          <div className="d-flex align-items-center">
            {/* Display the Username Greeting */}
            <li className="nav-item text-white me-3">Hello, {username}!</li>
            <li>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;