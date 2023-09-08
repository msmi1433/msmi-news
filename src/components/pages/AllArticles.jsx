import React, { useState, useEffect } from "react";
import { ArticleContainer } from "../";
import { getNumOfPages } from "../apiCalls";

const AllArticles = () => {
  let [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);

  const handleNextClick = () => {
    if (pageNumber < numOfPages) {
      setPageNumber((currentPage) => {
        return currentPage + 1;
      });
    }
  };

  const handlePrevClick = () => {
    if (pageNumber > 1) {
      setPageNumber((currentPage) => {
        return currentPage - 1;
      });
    }
  };

  useEffect(() => {
    getNumOfPages().then((num) => {
      setNumOfPages(num);
    });
  }, []);

  return (
    <section className="all-articles container">
      <h2 className="page-heading">All news</h2>
      <button className="page-button" onClick={handlePrevClick}>
        Previous page
      </button>
      <button className="page-button" onClick={handleNextClick}>
        Next page
      </button>
      <ArticleContainer pageNumber={pageNumber} />
      <p className="page-number">{`Page ${pageNumber} of ${numOfPages}`}</p>
    </section>
  );
};

export default AllArticles;
