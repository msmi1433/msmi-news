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
      <h2 className="page-heading">All Articles</h2>
      <div className="input-container">
        <button
          className="page-button"
          onClick={handlePrevClick}
          disabled={pageNumber === 1 ? true : false}
        >
          Previous page
        </button>
        <p className="page-number">{`Page ${pageNumber} of ${numOfPages}`}</p>
        <button
          className="page-button"
          onClick={handleNextClick}
          disabled={pageNumber === numOfPages ? true : false}
        >
          Next page
        </button>
      </div>

      <ArticleContainer pageNumber={pageNumber} />

      <div className="back-to-top-container">
        <a href="#top">
          <button className="back-to-top">Back to top</button>
        </a>
      </div>
    </section>
  );
};

export default AllArticles;
