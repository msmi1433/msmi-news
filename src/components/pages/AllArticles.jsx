import React, { useState, useEffect } from "react";
import { ArticleContainer } from "../";
import { getNumOfArticles } from "../apiCalls";

const AllArticles = () => {
  let [pageNumber, setPageNumber] = useState(1);
  const [numOfArticles, setNumOfArticles] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);

  const handleNextClick = () => {
    if (pageNumber < numOfPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  useEffect(() => {
    getNumOfArticles().then((num) => {
      setNumOfArticles(num);
      setNumOfPages(Math.ceil(numOfArticles / 10));
    });
  }, []);

  return (
    <section className="all-articles container">
      <h2 className="page-heading">All news</h2>
      <ArticleContainer pageNumber={pageNumber} />
      <p className="page-number">{`Page ${pageNumber}`}</p>
      <button className="page-button" onClick={handleNextClick}>
        Next page
      </button>
      <button className="page-button" onClick={handlePrevClick}>
        Previous page
      </button>
    </section>
  );
};

export default AllArticles;
