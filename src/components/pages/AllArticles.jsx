import React, { useState, useEffect } from "react";
import { ArticleContainer } from "../";
import { getNumOfArticles } from "../apiCalls";

const AllArticles = () => {
  let [pageNumber, setPageNumber] = useState(1);
  const [numOfArticles, setNumOfArticles] = useState(0);

  const handleNextClick = () => {
    setPageNumber((pageNumber += 1));
  };

  useEffect(() => {
    getNumOfArticles().then((num) => {
      setNumOfArticles(num);
    });
  }, []);

  return (
    <div>
      <h2 className="page-heading">All news</h2>
      <ArticleContainer />
      <button className="page-button" onClick={handleNextClick}>
        Next page
      </button>
      <button className="page-button">Previous page</button>
    </div>
  );
};

export default AllArticles;
