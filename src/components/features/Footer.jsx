import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-container container">
        <div className="logo-and-map">
          <img src="" alt="" />
          <ol className="site-map">
            <Link to={"/"}>Home</Link>
            <Link to={"/articles"}>All articles</Link>
            <Link to={"/articles/topic/football"}>Football</Link>
            <Link to={"/articles/topic/coding"}>Coding</Link>
            <Link to={"/articles/topic/cooking"}>Cooking</Link>
            <Link to={"/users"}>Users</Link>
          </ol>
        </div>
        <div className="contacts">
          <a className="contact-link" href="">
            GitHub
          </a>
          <a className="contact-link" href="">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
