import React, { useEffect, useState } from "react";
import { getArticles } from "../apiCalls";
import { Link } from "react-router-dom";

const ArticleContainer = ({ pageNumber }) => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles(undefined, pageNumber)
      .then((articles) => {
        setArticleList(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [pageNumber]);

  if (isLoading) return <h3 className="loading-message">Loading...</h3>;
  if (isError)
    return (
      <h3 className="error-message">Something went wrong - please try again</h3>
    );

  return (
    <section className="article-container">
      <ol className="articles-ol">
        {articleList.map((article) => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              key={`article-link-${article.article_id}`}
            >
              <li className="article-card" key={article.article_id}>
                <img
                  src={article.article_img_url}
                  alt={`${article.title} image`}
                  className="article-img"
                />
                <h3 className="article-title">{article.title}</h3>
                <p className="article-topic">{article.topic}</p>
              </li>
            </Link>
          );
        })}
      </ol>
    </section>
  );
};

export default ArticleContainer;
