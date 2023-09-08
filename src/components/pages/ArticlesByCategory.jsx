import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleContainer } from "../";
import { getNumOfPages } from "../apiCalls";

const ArticlesByCategory = () => {
  const { category } = useParams();
  let [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [errStatus, setErrStatus] = useState("");
  const [categoryState, setCategoryState] = useState(category);

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
    setCategoryState(category);
    setPageNumber(1);
    setErrStatus("");
    getNumOfPages(category).then((num) => {
      setNumOfPages(num);
    });
  }, [category]);

  if (errStatus === "topic does not exist") {
    return (
      <section className="error container">
        <h3>Sorry, this topic does not exist</h3>
      </section>
    );
  }

  return (
    <section className="all-articles container">
      <h2 className="page-heading">{category} news</h2>
      <div className="input-container">
        <button className="page-button" onClick={handlePrevClick}>
          Previous page
        </button>
        <p className="page-number">{`Page ${pageNumber} of ${numOfPages}`}</p>
        <button className="page-button" onClick={handleNextClick}>
          Next page
        </button>
      </div>
      <ArticleContainer
        pageNumber={pageNumber}
        categoryState={categoryState}
        setErrStatus={setErrStatus}
      />

      <div className="back-to-top-container">
        <a href="#top">
          <button className="back-to-top">Back to top</button>
        </a>
      </div>
    </section>
  );
};

export default ArticlesByCategory;
