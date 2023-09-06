import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../";

const Header = () => {
  const { user } = useContext(UserContext);

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

        <Link className="news nav-item" to="/articles/football">
          Football
        </Link>
        <Link className="news nav-item" to="/articles/coding">
          Coding
        </Link>
        <Link className="news nav-item" to="/articles/cooking">
          Cooking
        </Link>
        <Link className="news nav-item" to="/users">
          Users
        </Link>
      </nav>
      <div className="logged-in-user">
        <div className="img-cropper">
          <img
            src={user.avatar_url}
            alt={`${user.username}'s avatar image`}
            className="logged-in-user-avatar"
          />
        </div>
        <p className="logged-in-user-name">{user.username}</p>
      </div>
    </div>
  );
};

export default Header;
