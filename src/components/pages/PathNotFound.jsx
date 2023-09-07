import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PathNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="404 container">
      <h1>404 - Page not found</h1>
      <h3>Oops! Seems like you are lost</h3>
      <Link
        to={".."}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Go back
      </Link>
      <br />
      <Link to={"/"}>Go to the homepage</Link>
    </section>
  );
};

export default PathNotFound;
