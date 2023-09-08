import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../";

const Header = () => {
  const { user } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <section className="header container">
      <div className="title-container">
        <Link to="/">
          <h1 id="top" className="nav-title">
            MSMI News
          </h1>
        </Link>
        <Link className="logged-in-user" to="/users">
          <div className="img-cropper">
            <img
              src={user.avatar_url}
              alt={`${user.username}'s avatar image`}
              className="logged-in-user-avatar"
            />
          </div>
          <p className="logged-in-user-name">{user.username}</p>
        </Link>
      </div>
      <div className="nav-container">
        <nav className="navbar-container">
          <Link className="nav-item" to="/">
            Home
          </Link>

          <div
            className={`dropdown nav-item ${dropdownOpen ? "open" : ""}`}
            onClick={toggleDropdown}
          >
            <p className="nav-item">Topics</p>
            <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
              <Link className="news nav-item" to="/articles/topic/football">
                Football
              </Link>
              <Link className="news nav-item" to="/articles/topic/coding">
                Coding
              </Link>
              <Link className="news nav-item" to="/articles/topic/cooking">
                Cooking
              </Link>
            </div>
          </div>
          <Link className="news nav-item" to="/articles">
            All Articles
          </Link>
        </nav>
      </div>
    </section>
  );
};

export default Header;
