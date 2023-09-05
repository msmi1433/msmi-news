import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container container">
      <h1 className="nav-title">MSMI News</h1>
      <nav className="navbar-container">
        <Link className="nav-item" to="/">
          Home
        </Link>
        <Link className="news nav-item" to="/articles">
          All Articles
        </Link>
        {/* <Link className="news nav-item" to="/articles/football">
          Football
        </Link>
        <Link className="news nav-item" to="/articles/coding">
          Coding
        </Link>
        <Link className="news nav-item" to="/articles/cooking">
          Cooking
        </Link> */}
      </nav>
    </div>
  );
};

export default Header;
