import React, { useState, useEffect } from "react";
import { getArticles } from "../apiCalls";
import { Link } from "react-router-dom";

const RelatedArticles = ({ topic, id }) => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles(undefined, undefined, topic, undefined)
      .then((articles) => {
        const filterCurrentArticle = articles.filter(
          (article) => article.article_id !== id
        );
        return filterCurrentArticle.slice(0, 5);
      })
      .then((slicedArticles) => {
        setIsLoading(false);
        setRelatedArticles(slicedArticles);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  console.log(id);

  if (isLoading)
    return (
      <section className="related-articles-container">
        <h2>Related Articles</h2>
        <p className="loading-message">Loading...</p>
      </section>
    );
  if (isError)
    <section className="related-articles-container">
      <h2>Related Articles</h2>
      <p className="error-message">Something went wrong - please try again</p>
    </section>;

  return (
    <section className="related-articles-container">
      <h2>Related Articles</h2>
      <ol className="articles-ol">
        {relatedArticles.map((article) => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              className="pop-article-card"
              key={article.article_id}
            >
              <h3 className="pop-article-title">{article.title}</h3>
              <p className="article-created-at">
                {new Date(article.created_at).toLocaleDateString()}
              </p>
            </Link>
          );
        })}
      </ol>
    </section>
  );
};

export default RelatedArticles;
