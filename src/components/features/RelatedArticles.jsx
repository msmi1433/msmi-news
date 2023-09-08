import React, { useState, useEffect } from "react";
import { getArticles } from "../apiCalls";
import { Link } from "react-router-dom";

const RelatedArticles = ({ topic }) => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log(topic);
  useEffect(() => {
    setIsLoading(true);
    getArticles(undefined, undefined, topic, undefined)
      .then((articles) => {
        return articles.slice(0, 5);
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

  return (
    <section className="related-articles-container">
      <h2>Related Articles</h2>
      <ol className="articles-ol">
        {relatedArticles.map((article) => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              className="related-article-card"
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
