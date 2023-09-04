import React from "react";
import { ArticleContainer, MostPopularArticles } from "../";

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="page-heading">Welcome to MSMI News</h2>
      <h2>Latest News</h2>
      <ArticleContainer />
      <h2>Most popular articles</h2>
      <MostPopularArticles />
    </div>
  );
};

export default Home;
