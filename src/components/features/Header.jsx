import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="nav-title">MSMI News</h1>
      <nav className="navbar-container">
        <Link className="nav-item" to="/">
          Home
        </Link>
        {/* <Link className="news nav-item" to="/articles">
          All Articles
        </Link>
        <Link className="news nav-item" to="/articles?topic=football">
          Football
        </Link>
        <Link className="news nav-item" to="/articles?topic=coding">
          Coding
        </Link>
        <Link className="news nav-item" to="/articles?topic=cooking">
          Cooking
        </Link> */}
      </nav>
    </div>
  );
};

export default Header;
