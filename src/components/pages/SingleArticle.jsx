import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getArticleAuthor, getSingleArticle } from "../apiCalls";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getSingleArticle(article_id)
      .then((returnedArticle) => {
        setArticle(returnedArticle);
        return returnedArticle;
      })
      .then((returnedArticle) => {
        return getArticleAuthor(returnedArticle.author);
      })
      .then((author) => {
        setAuthor(author);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return <div>hello</div>;
};

export default SingleArticle;
