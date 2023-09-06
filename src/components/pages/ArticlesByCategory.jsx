import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleContainer } from "../";
import { getNumOfPages } from "../apiCalls";

const ArticlesByCategory = () => {
  const { category } = useParams();
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
    getNumOfPages(category).then((num) => {
      setNumOfPages(num);
    });
  }, []);

  return (
    <section className="all-articles container">
      <h2 className="page-heading">{category} news</h2>
      <button className="page-button" onClick={handlePrevClick}>
        Previous page
      </button>
      <button className="page-button" onClick={handleNextClick}>
        Next page
      </button>
      <ArticleContainer
        pageNumber={pageNumber}
        category={category}
        setPageNumber={setPageNumber}
      />
      <p className="page-number">{`Page ${pageNumber}`}</p>
    </section>
  );
};

export default ArticlesByCategory;
