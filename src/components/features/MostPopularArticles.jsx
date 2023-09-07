import React, { useState, useEffect } from "react";
import { getArticles } from "../apiCalls";
import { Link } from "react-router-dom";

const MostPopularArticles = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles("votes")
      .then((articles) => {
        setArticleList(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p className="loading-message">Loading...</p>;
  if (isError)
    return (
      <p className="error-message">Something went wrong - please try again</p>
    );

  return (
    <section className="most-popular-articles">
      <ol className="articles-ol">
        {articleList.map((article) => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              className="pop-article-card"
              key={article.article_id}
            >
              <h3 className="pop-article-title">{article.title}</h3>
              <p className="pop-article-topic">{article.topic}</p>
              <p className="pop-article-votes">Votes: {article.votes}</p>
            </Link>
          );
        })}
      </ol>
    </section>
  );
};

export default MostPopularArticles;
